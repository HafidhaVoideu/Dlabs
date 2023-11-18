import React from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
// import profile from "../../../assets/profile.png";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useGlobalContextUser } from "../../../context/context";
import "./sidebar.css";

import { links } from "../../../constants/const";
const Sidebar = () => {
  const [open, cycleOpen] = useCycle(false, true);
  const navigate = useNavigate();
  const { setTab, user, tab } = useGlobalContextUser();

  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };
  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };
  return (
    <main>
      <AnimatePresence>
        {open && (
          <motion.aside
            className="dashboard-aside"
            initial={{ width: 0 }}
            animate={{
              width: 300,
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
          >
            <div
              className="avatar2   dashboard-aside__img glow-effect"
              data-glow-animation="grow"
            >
              <img src={user?.picture} alt={user?.name} className="card__img" />
              <svg className="glow-container">
                <rect
                  pathLength="100"
                  strokeLinecap="round"
                  className="glow-blur"
                ></rect>
                <rect
                  pathLength="100"
                  strokeLinecap="round"
                  className="glow-line"
                ></rect>
              </svg>
            </div>

            <div className="dashboard-aside__user">
              <p>{user?.name}</p>
              <p className="dashboard-aside__role">({user?.role})</p>

              <div className="dashboard-aside__wallet">
                <p>
                  Drkn Wallet: <span> {user?.drkn_wallet} drkn </span>
                </p>
                <p>
                  Idrkn Wallet: <span>{user?.idrkn_wallet} Idrkn </span>
                </p>
              </div>
            </div>

            <button
              className="dashboard-aside__btn dashboard-aside__btn--close "
              onClick={() => cycleOpen()}
            >
              <AiOutlineClose />
            </button>
            <motion.div
              className="dashboard-aside__list"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              {links.map(({ name, to, id }) => {
                if (user?.role === "admin" && name === "My Projects") return;
                if (
                  (user?.role === "user" || user?.role === "validUser") &&
                  name === "Pending Synergies"
                )
                  return;
                if (name === "Auctions" || name === "Ruffles")
                  return (
                    <motion.a
                      key={id}
                      whileHover={{ scale: 1 }}
                      variants={itemVariants}
                      id="inactive-link"
                    >
                      {name}
                    </motion.a>
                  );

                return (
                  <motion.a
                    key={id}
                    whileHover={{ scale: 1.1 }}
                    variants={itemVariants}
                    onClick={() => {
                      setTab(name);
                      navigate(to);
                    }}
                    className={`${tab === name && "active-link"} `}
                  >
                    {name}
                  </motion.a>
                );
              })}
              <div className="dashboard-aside__socials">
                <a href="#">
                  <FaXTwitter />
                </a>
                <a href="#">
                  <BsDiscord />
                </a>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      <button
        className="dashboard-aside__btn dashboard-aside__btn--open   "
        onClick={() => cycleOpen()}
      >
        <FiMenu />
      </button>
    </main>
  );
};

export default Sidebar;
