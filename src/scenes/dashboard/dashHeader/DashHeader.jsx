import React from "react";
import logo from "../../../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import "./dashHeader.css";
import { useGlobalContextUser } from "../../../context/context";

const DashHeader = () => {
  const { search, setSearch, tab } = useGlobalContextUser();

  let placeholder;

  switch (tab) {
    case "Projects":
    case "Featured Projects":
    case "My Projects":
      placeholder = "search project name";
      break;
    case "Synergies":
    case "Pending Synergies":
      placeholder = "search synergy";
      break;
  }

  return (
    <header className="dashboard-header">
      <div className="deashboard-search">
        <button className="deashboard-search__btn">
          <FiSearch />
        </button>
        <input
          name="search project"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
        />
      </div>

      <div className="deashboard-header__logo">
        <img src={logo} alt="logo" />
      </div>
    </header>
  );
};

export default DashHeader;
