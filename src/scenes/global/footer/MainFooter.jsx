import React from "react";

import { FaXTwitter } from "react-icons/fa6";
import { BsDiscord } from "react-icons/bs";
import "./footer.css";

const MainFooter = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer__main">
        <a href="https://twitter.com/darknightlabs">
          <FaXTwitter />
        </a>
        <a href="#">
          <BsDiscord />
        </a>
      </div>
      <p> &#169; All rights reserved to Darkknight Labs 2023</p>
    </footer>
  );
};

export default MainFooter;
