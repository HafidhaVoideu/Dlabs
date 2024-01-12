import React, { useState, useContext, useEffect } from "react";
import { user as defaultUser } from "../data/user";
import { projects as defaultProjects } from "../data/projects";
import { synergies as defaultSynergies } from "../data/synergies";
import { pendingSynergies as defaultPendingSynergies } from "../data/pendingSynergies";
import axios from "../axios/axios";
import { createClient } from "@supabase/supabase-js";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { logout } from "../scenes/Auth/SignOut";

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

  const [token, setToken] = useState(null);

  async function signOut() {
    const success = await logout();

    if (success) {
      localStorage.removeItem("token");
      navigate("/");
    } else {
      console.log("Logout failed");
    }
  }

  useEffect(() => {
    // Function to refresh the token
    const refreshToken = async () => {
      console.log("enter refresh token");
      try {
        // Make a request to the token refresh endpoint
        const response = await axios.post("/api/auth/refresh_token", {
          withCredentials: true,
        });

        // Assuming the new token is returned in the response data
        const newToken = response.data.token;

        // Set the new token in the component state
        setToken(newToken);

        console.log("refresh token");

        // Set the new token in the Axios default headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      } catch (error) {
        // Handle token refresh error (e.g., redirect to login page)
        signOut();
        console.error("Token refresh error:", error);
        clearInterval(tokenRefreshTimer);
      }
    };

    // Function to set up a timer to refresh the token every 14 minutes
    const setupTokenRefreshTimer = () => {
      const tokenRefreshInterval = setInterval(() => {
        refreshToken();
      }, 14 * 60 * 1000); // 14 minutes in milliseconds
      // }, 20000); // 14 minutes in milliseconds

      // Clear the interval when the component is unmounted
      return () => clearInterval(tokenRefreshInterval);
    };

    // Initial token refresh when the component mounts
    refreshToken();

    // Set up the token refresh timer
    const tokenRefreshTimer = setupTokenRefreshTimer();

    // Cleanup function to clear the timer when the component is unmounted
    return () => {
      clearInterval(tokenRefreshTimer);
    };
  }, []);

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

  // let token = localStorage.getItem("token");
  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   const currentRoute = window.location.pathname;

  //   if (!storedToken && currentRoute === "/dashboard") {
  //     navigate("/signin");
  //   }

  //   token = storedToken;

  //   // Fetch user data and set state here (using the token)
  // }, []);

  const getFeaturedProjects = () => {
    axios
      .get("/api/featuredprojects/")
      .then((response) => {
        console.log(" featured projects:", response.data.data);
        setFeaturedProjects(response.data.data);
      })
      .catch((error) => {
        const currentRoute = window.location.pathname;

        if (currentRoute.includes("/dashboard")) {
          navigate("/signin");
        }
        console.log(error);
      });
  };
  const getProjects = () => {
    axios
      .get("/api/projects/", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("projects:", response.data);
        if (response.data.success === 0) {
          // Invalid token, navigate to "/signin"
          // localStorage.removeItem("token");
          const currentRoute = window.location.pathname;

          if (currentRoute.includes("/dashboard")) {
            navigate("/signin");
          }
        } else {
          // Valid response, update projects
          setProjects(response.data.reverse());
        }
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
        axios.get(`/api/users/970795810809868288`),
        axios.get(`/getRoles/970795810809868288`),
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
      .get("/api/userprojects/970795810809868288")
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
