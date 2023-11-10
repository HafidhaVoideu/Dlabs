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

const supabase = createClient(
  "https://alkldwabyaufocdpdpns.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsa2xkd2FieWF1Zm9jZHBkcG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNDIyMzAsImV4cCI6MjAxNDgxODIzMH0.HftPTZvFZi-nvwugLuQX7QLT1wbVRyIbTiwGC0ydwqI"
);

const DashboardLayout = () => {
  const { user } = useGlobalContextUser();
  const navigate = useNavigate();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/");
    } else {
      console.log("error logging out:", error);
    }
  }

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
