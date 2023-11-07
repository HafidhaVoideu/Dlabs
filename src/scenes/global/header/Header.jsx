import React from "react";
import logo from "../../../assets/logo.png";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { TbArrowBigUpFilled } from "react-icons/tb";

import arrow from "../../../assets/frames/arrow.png";

import "./header.css";
const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [tab, setTab] = useState("");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 700) setShowTopButton(true);
    else setShowTopButton(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const List = ({ style, isMenu }) => {
    const menu = [
      { tag: "Home", ref: "#home" },
      { tag: "Services", ref: "#services" },
      { tag: "Members", ref: "#members" },
      { tag: "Partners", ref: "#partners" },
      { tag: "About", ref: "#about" },
    ];
    return menu.map((item) => (
      <li key={item.tag} onClick={() => isMenu(false)} className={``}>
        <a
          href={item.ref}
          onClick={() => setTab(item.tag)}
          className={tab === item.tag ? "active-link" : undefined}
        >
          {item.tag}
        </a>
      </li>
    ));
  };

  return (
    <header className="header">
      <p className="header__logo-title">
        Darknight <span className="text-effect">Labs</span>
      </p>
      {/* <img src={logo} alt="logo" className="header__img" /> */}

      {/* Mobile nav */}

      <button onClick={() => setIsMenu(true)} className="header__btn">
        <HiMenu />
      </button>

      {isMenu && (
        <motion.nav
          initial={{ y: "-100vh" }}
          animate={{ y: "0vh" }}
          transition={{
            ease: "linear",
            duration: 0.2,
          }}
          className=" header__menu "
        >
          <button
            className="header__menu__btn"
            onClick={() => setIsMenu(false)}
          >
            <AiOutlineClose />{" "}
          </button>
          <ul className="header__menu__list ">
            <List isMenu={setIsMenu} />
          </ul>
        </motion.nav>
      )}

      {showTopButton && (
        <img
          src={arrow}
          alt="top-arrow"
          className="header__scroll-img"
          onClick={scrollToTop}
        />
      )}

      {/* Desktop nav */}

      <div className="header__desktop-nav ">
        <nav>
          <ul>
            <List isMenu={setIsMenu} />
          </ul>
        </nav>

        <a href="#footer" className="header__desktop__btn">
          Contact us
        </a>
      </div>
    </header>
  );
};

export default Header;
