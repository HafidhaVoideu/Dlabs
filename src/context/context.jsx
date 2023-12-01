import React, { useState, useContext, useEffect } from "react";
import { user as defaultUser } from "../data/user";
import { projects as defaultProjects } from "../data/projects";
import { synergies as defaultSynergies } from "../data/synergies";
import { pendingSynergies as defaultPendingSynergies } from "../data/pendingSynergies";
import axios from "../axios/axios";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://alkldwabyaufocdpdpns.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsa2xkd2FieWF1Zm9jZHBkcG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNDIyMzAsImV4cCI6MjAxNDgxODIzMH0.HftPTZvFZi-nvwugLuQX7QLT1wbVRyIbTiwGC0ydwqI"
);

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [projects, setProjects] = useState([]);
  const [synergies, setSynergies] = useState();
  const [pendingSynergies, setPendingSynergies] = useState();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [alert, setAlert] = useState({ isAlert: false, alertMessage: "" });
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("Featured Projects");
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(false);

  const [userProjects, setUserProjects] = useState();

  const getFeaturedProjects = () => {
    axios
      .get("/api/featuredprojects/")
      .then((response) => {
        console.log(" featured projects:", response.data.data);
        setFeaturedProjects(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProjects = () => {
    axios
      .get("/api/projects/")
      .then((response) => {
        console.log("projects:", response.data);
        setProjects(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSynergies = () => {
    axios
      .get("/api/synergies/")
      .then((response) => {
        setSynergies(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getPendingSynergies = () => {
    axios
      .get("/api/synergyrequests/")
      .then((response) => {
        setPendingSynergies(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function getUserData() {
    setLoading(true);
    let userTemp = {};

    await supabase.auth.getUser().then((value) => {
      if (value.data?.user) {
        userTemp = value.data.user.user_metadata;
      }
    });

    if (userTemp.provider_id) {
      const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
        // provider id here

        axios.get(`/api/users/970795810809868288`),
        axios.get(`/getRoles/970795810809868288`),
      ]);

      const userInfo = firstResponse.data.data;
      const userRoles = secondResponse.data.roles;

      const role = userRoles.includes("mod")
        ? "mod"
        : userRoles.includes("Profile Validated")
        ? "validated user"
        : "user";
      setUser({
        duser_id: "970795810809868288",
        name: userTemp.name,
        picture: userTemp.picture,
        role: role,

        drkn_wallet: userInfo[0].drkn_wallet,
        idrkn_wallet: userInfo[0].idrkn_wallet,
      });
    }

    setLoading(false);
  }

  const getUserProjects = async () => {
    await axios
      .get("/api/userprojects/970795810809868288")
      .then((response) => {
        console.log("userprojects", response.data.data);

        setUserProjects(response.data.data);

        //   // return { _project_id: 2 };
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserData();
    getFeaturedProjects();
    getProjects();

    getSynergies();
    getPendingSynergies();
    getUserProjects();
  }, []);

  useEffect(() => {
    setSearch("");
  }, [tab]);

  useEffect(() => {
    const temp = projects.filter((p) => p.featured === 1);
    setFeaturedProjects([...temp]);
  }, [projects]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        projects,
        setProjects,
        alert,
        setAlert,
        search,
        setSearch,
        tab,
        setTab,
        synergies,
        setSynergies,
        featuredProjects,
        setFeaturedProjects,
        pendingSynergies,
        setPendingSynergies,
        session,
        setSession,
        userProjects,
        setUserProjects,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useGlobalContextUser = () => {
  return useContext(UserContext);
};
export { UserContextProvider };
