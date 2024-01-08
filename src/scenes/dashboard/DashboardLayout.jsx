import React from "react";
import { Outlet } from "react-router";
import DashHeader from "./dashHeader/DashHeader";
import TabTitle from "./title/TabTitle";
import Sidebar from "./sidebar/Sidebar";
import Alert from "../../components/alert/Alert";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import "./dashboard.css";
import { useGlobalContextUser } from "../../context/context";

import { supabase } from "../../context/context";

const DashboardLayout = () => {
  const { user } = useGlobalContextUser();
  const navigate = useNavigate();

  async function signOut() {
    localStorage.removeItem("token");
    const { error } = await supabase.auth.signOut();
    if (!error) {
      console.log("logged out:", error);

      navigate("/");
    } else {
      console.log("error logging out:", error);
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
