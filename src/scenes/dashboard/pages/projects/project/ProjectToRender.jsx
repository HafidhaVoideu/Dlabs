import React from "react";
import { useGlobalContextUser } from "../../../../../context/context";
import Projects from "../Projects";
import UserProjects from "../userProjects/UserProjects";

const ProjectToRender = () => {
  const { user } = useGlobalContextUser();
  return <>{user.role === "admin" ? <Projects /> : <UserProjects />}</>;
};

export default ProjectToRender;
