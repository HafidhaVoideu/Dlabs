// DashboardLayout.js
import React from "react";
import { Outlet } from "react-router";
import DashHeader from "./dashHeader/DashHeader";
import TabTitle from "./title/TabTitle";
import Sidebar from "./sidebar/Sidebar";
import Alert from "../../components/alert/Alert";
import { useNavigate } from "react-router-dom";
import { useGlobalContextUser } from "../../context/context";
// import { logout } from "./path-to-auth/auth"; // Update the path accordingly
import "./dashboard.css";
import { logout } from "../Auth/SignOut";

const DashboardLayout = () => {
  const { user } = useGlobalContextUser();
  const navigate = useNavigate();

  async function signOut() {
    const success = await logout();

    if (success) {
      localStorage.removeItem("token");
      navigate("/");
    } else {
      console.log("Logout failed");
    }
  }

  console.log("user:", user);
  return (
    <>
      {user && (
        <main className="dashboard">
          <Alert />
          <Sidebar />
          <div className="dashboard-main">
            <button className="logout" onClick={signOut}>
              Log out
            </button>
            <DashHeader />
            <TabTitle subtitle="this is an awesome description" />
            <Outlet />
          </div>
        </main>
      )}
    </>
  );
};

export default DashboardLayout;
