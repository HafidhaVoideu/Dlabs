import React, { useState, useContext, useEffect } from "react";
import { user as defaultUser } from "../data/user";
import { projects as defaultProjects } from "../data/projects";
import { synergies as defaultSynergies } from "../data/synergies";
import { pendingSynergies as defaultPendingSynergies } from "../data/pendingSynergies";
import axios from "../axios/axios";
import { createClient } from "@supabase/supabase-js";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

export const supabase = createClient(
  "https://wzjeiqaguiuwllvemamo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6amVpcWFndWl1d2xsdmVtYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE3ODg1ODAsImV4cCI6MjAxNzM2NDU4MH0.TPp-ns6Vwfc0mpv15K6HlaPuIbsYEkM2Xg4xmJUR8Dk"
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

  const location = useLocation();

  useEffect(() => {
    console.log("Route changed:", location.pathname);
    getUserData();
    getFeaturedProjects();
    getProjects();
    getSynergies();
    getPendingSynergies();
    getUserProjects();
  }, [location.pathname]);

  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      navigate("/signin");
    }

    token = storedToken;

    // Fetch user data and set state here (using the token)
  }, []);

  const getFeaturedProjects = () => {
    axios
      .get("/api/featuredprojects/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(" featured projects:", response.data.data);
        setFeaturedProjects(response.data.data);
      })
      .catch((error) => {
        navigate("/signin");
        console.log(error);
      });
  };
  const getProjects = () => {
    axios
      .get("/api/projects/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
      .get("/api/synergies/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSynergies(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getPendingSynergies = () => {
    axios
      .get("/api/synergyrequests/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

    let userTem = true;

    // await supabase.auth.getUser().then((value) => {
    //   if (value.data?.user) {
    //     userTemp = value.data.user.user_metadata;
    //     console.log("supabase response", userTemp);
    //   }
    // });
    // if (userTemp.provider_id) {
    if (userTem) {
      const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
        axios.get(`/api/users/970795810809868288`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`/getRoles/970795810809868288`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const userInfo = firstResponse.data.data;
      const userRoles = secondResponse.data.roles;

      console.log("userInfo:", firstResponse);
      console.log("userRoles:", secondResponse);

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
        drkn_wallet: userInfo[0]?.drkn_wallet,
        idrkn_wallet: userInfo[0]?.idrkn_wallet,
      });
    }

    setLoading(false);
  }

  const getUserProjects = async () => {
    await axios
      .get("/api/userprojects/970795810809868288", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("userprojects", response.data.data);
        setUserProjects(response.data.data);
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
