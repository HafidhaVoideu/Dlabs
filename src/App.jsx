import { useEffect } from "react";
import { setGlowEffectRx } from "./utils/functions";
import Homepage from "./scenes/homepage/Homepage";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./scenes/dashboard/DashboardLayout";
import { useLocation } from "react-router-dom";
import Profile from "./scenes/dashboard/pages/profile/Profile";
import { useGlobalContextUser } from "./context/context";
import { links } from "./constants/const";
import FeaturedProj from "./scenes/dashboard/pages/featuredProjects/FeaturedProj";
import PendingSynergies from "./scenes/dashboard/pages/pendingSynergies/PendingSynergies";
import ProjectToRender from "./scenes/dashboard/pages/projects/project/ProjectToRender";
import SynergyToRender from "./scenes/dashboard/pages/synergies/SynergyToRender";
import axios from "./axios/axios";
import Auth from "./scenes/Auth/SignIn";
import SignUp from "./scenes/Auth/SignUp";

// import { access_token } from "./constants/accesToken";

// axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

function App() {
  const location = useLocation();
  const { setTab } = useGlobalContextUser();

  useEffect(() => {
    setGlowEffectRx();
  });

  useEffect(() => {
    if (location.pathname === "/") setTab("Featured Projects");
    const activeTab = links.find((link) => link.to === location.pathname);
    if (activeTab) setTab(activeTab.name);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<FeaturedProj />} />
          <Route path="featuredprojects" element={<FeaturedProj />} />
          <Route path="myprojects" element={<Profile />} />
          <Route path="projects" element={<ProjectToRender />} />
          <Route path="synergies" element={<SynergyToRender />} />
          <Route path="pendingsynergies" element={<PendingSynergies />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
