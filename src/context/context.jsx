import React, { useState, useContext, useEffect } from "react";
import { user as defaultUser } from "../data/user";
import { projects as defaultProjects } from "../data/projects";
import { synergies as defaultSynergies } from "../data/synergies";
import { pendingSynergies as defaultPendingSynergies } from "../data/pendingSynergies";
import axios from "../axios/axios";
import { createClient } from "@supabase/supabase-js";

import myAxios from "axios";

const supabase = createClient(
  "https://alkldwabyaufocdpdpns.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsa2xkd2FieWF1Zm9jZHBkcG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNDIyMzAsImV4cCI6MjAxNDgxODIzMH0.HftPTZvFZi-nvwugLuQX7QLT1wbVRyIbTiwGC0ydwqI"
);

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [projects, setProjects] = useState([]);
  const [synergies, setSynergies] = useState(defaultSynergies);
  const [pendingSynergies, setPendingSynergies] = useState(
    defaultPendingSynergies
  );
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [role, setRole] = useState("");
  const [alert, setAlert] = useState({ isAlert: false, alertMessage: "" });
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("Featured Projects");

  const [session, setSession] = useState();
  useEffect(() => {
    setSearch("");
  }, [tab]);

  const getFeaturedProjects = () => {
    axios
      .get("/api/featuredprojects/")
      .then((response) => {
        console.log(response.data.data);
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
        console.log(response.data.data);

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
        console.log(response.data.data);
        setSynergies(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   if (session) {
  //     console.log("provider Token:", session.provider_token);

  //     myAxios
  //       .get(
  //         `https://discord.com/api/v10/guilds/{guild.id}/members/${user.id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${session.provider_token}`,
  //           },
  //         }
  //       )
  //       .then((response) => console.log("guilds:", response.data))
  //       .catch((error) => console.log("error", error));
  //   }
  // }, [session]);

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          // console.log(value.data.user);

          setUser({
            id: value.data.user?.user_metadata?.provider_id,
            name: value.data.user?.user_metadata?.name,
            picture: value.data.user?.user_metadata?.picture,
            role: value.data.user.role,
            idrkn: "4495",
            drkn: "777",
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
          });
        }
      });
    }

    getUserData();
  }, []);

  useEffect(() => {
    if (session && user) {
      console.log("provider Token:", session.provider_token);
      console.log("userid:", user.id);
      console.log("guild id: 994081626474680361");

      myAxios
        .get(
          `https://discord.com/api/v10/users/@me/guilds/994081626474680361/member`,
          {
            headers: {
              Authorization: `Bearer ${session.provider_token}`,
            },
          }
        )
        .then((response) => console.log("guilds:", response.data))
        .catch((error) => console.log("error", error));
    }
  }, [session, user]);

  useEffect(() => {
    // getFeaturedProjects();
    // getProjects();
    // getSynergies();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        projects,
        setProjects,
        role,
        setRole,
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
