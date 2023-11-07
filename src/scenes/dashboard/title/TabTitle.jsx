import React from "react";
import "./title.css";
import { useGlobalContextUser } from "../../../context/context";

const TabTitle = ({ subtitle }) => {
  const { tab } = useGlobalContextUser();
  return (
    <div className="tab">
      <h1 className="tab__name"> {tab} </h1>
      <p className="tab__subtitle">{subtitle}</p>
    </div>
  );
};

export default TabTitle;
