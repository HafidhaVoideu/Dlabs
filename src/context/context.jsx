import React, { useState, useContext, useEffect } from "react";
import { user as defaultUser } from "../data/user";
import { projects as defaultProjects } from "../data/projects";
import { synergies as defaultSynergies } from "../data/synergies";
import { pendingSynergies as defaultPendingSynergies } from "../data/pendingSynergies";
import axios from "../axios/axios";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
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

  const getFeaturedProjects = () => {
    axios
      .get("/api/featuredprojects/")
      .then((response) => {
        // console.log(response.data.data);
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
        // console.log(response.data.data);
        setProjects(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSynergies = () => {
    axios
      .get("/api/synergies/")
      .then((response) => {
        // console.log("Synergies", response.data.data);
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
        console.log("PendingSynergies", response.data.data);
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
      const [firstResponse, secondResponse] = await Promise.all([
        // provider id here

        axios.get(`/api/users/970795810809868288`),
        axios.get(`/getRoles/970795810809868288`),
      ]);

      const userInfo = firstResponse.data.data;
      const userRoles = secondResponse.data.roles;

      console.log("userInfo:", userInfo[0].roles.replace(/['"]+/g, ""));
      console.log("userInfo:", userInfo);
      console.log("userRoles:", userRoles);

      const role = userRoles.includes("mod")
        ? "mod"
        : userRoles.includes("Profile Validated")
        ? "admin"
        : "user";
      setUser({
        duser_id: "970795810809868288",
        name: userTemp.name,
        picture: userTemp.picture,
        role: role,

        projects: [
          {
            id: 1,
            name: "mom's projects",
            des: "The cat is a domesticated species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is commonly referred to as the domestic cat or house cat to distinguish it from the wild members of the family.",
            img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            roles: [
              { id: "role-1", label: "dev" },
              { id: "role-22", label: "dentist" },
              { id: "role-33", label: "president" },
            ],
            twitter: "www.projectTwitter.com",
            discord: "www.DiscorVideu.com",
            website: "www.projectWebsite.com ",

            partnerships: [
              { id: "partnership-0", label: "partnership 1" },
              { id: "partnership-02", label: "partnership 2" },
              { id: "partnership-03", label: "partnership 3" },
            ],
          },
          {
            id: 2,
            name: "dad's project",
            des: "The cat is a domesticated species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is commonly referred to as the domestic cat or house cat to distinguish it from the wild members of the family.",
            img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

            roles: [{ id: "role-2", label: "collab" }],
            twitter: "www.projectTwitter.com",
            discord: "www.DiscorVideu.com",
            website: "www.projectWebsite.com ",
            partnerships: [
              { id: "partnership-1", label: "partnership 1" },
              { id: "partnership-12", label: "partnership 2" },
              { id: "partnership-13", label: "partnership 3" },
            ],
          },
          {
            id: 3,
            name: "Aunt's project",
            des: "The cat is a domesticated species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is commonly referred to as the domestic cat or house cat to distinguish it from the wild members of the family.",
            img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            roles: [{ id: "role-3", label: "team leader" }],

            twitter: "www.projectTwitter.com",
            discord: "www.DiscorVideu.com",
            website: "www.projectWebsite.com ",
            partnerships: [
              { id: "partnership-1", label: "partnership 1" },
              { id: "partnership-12", label: "partnership 2" },
              { id: "partnership-13", label: "partnership 3" },
            ],
          },
          {
            id: 4,
            name: " uncle's projects",
            des: "The cat is a domesticated species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is commonly referred to as the domestic cat or house cat to distinguish it from the wild members of the family.",
            roles: [{ id: "role-4", label: "team leader" }],
            img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            twitter: "www.projectTwitter.com",
            discord: "www.DiscorVideu.com",
            website: "www.projectWebsite.com ",
            partnerships: [
              { id: "partnership-1", label: "partnership 1" },
              { id: "partnership-12", label: "partnership 2" },
              { id: "partnership-13", label: "partnership 3" },
            ],
          },
        ],
        // projects: userInfo,
        drkn_wallet: userInfo[0].drkn_wallet,
        idrkn_wallet: userInfo[0].idrkn_wallet,
      });
    }

    setLoading(false);
  }

  useEffect(() => {
    getUserData();
    getFeaturedProjects();
    getProjects();
    getSynergies();
    getPendingSynergies();
  }, []);

  useEffect(() => {
    setSearch("");
  }, [tab]);

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
