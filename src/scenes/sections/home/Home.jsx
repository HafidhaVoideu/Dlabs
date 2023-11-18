import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.png";
import { TypingText } from "../../../components/CustomText";
import { staggerContainer } from "../../../utils/motion";
import { useNavigate } from "react-router-dom";
import frame from "../../../assets/frames/btn.png";
import "./home.css";
import { Auth } from "@supabase/auth-ui-react";

import { createClient } from "@supabase/supabase-js";
import { useGlobalContextUser } from "../../../context/context";

const supabase = createClient(
  "https://alkldwabyaufocdpdpns.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsa2xkd2FieWF1Zm9jZHBkcG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNDIyMzAsImV4cCI6MjAxNDgxODIzMH0.HftPTZvFZi-nvwugLuQX7QLT1wbVRyIbTiwGC0ydwqI"
);

const Home = () => {
  const navigate = useNavigate();

  const [signedIn, setIsSignedIn] = useState(false);

  const { session, setSession } = useGlobalContextUser();

  async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        scopes: "identify guilds connections guilds.members.read ",
      },
    });
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("home sessions data:", session);
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session]);

  return (
    <section id="home" className="home">
      <div className="home__div">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
        >
          <img src={logo} alt="logo" className=" home__img " />
        </motion.div>
        {/* <Auth supabaseClient={supabase} providers={["discord"]} /> */}

        <div className="home__img-div">
          <img src={frame} className="home__frame" alt="button-frame" />
          <a className="home__btn" onClick={signInWithDiscord}>
            Connect To Discord
          </a>
        </div>
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <TypingText title="  The whole is greater than the sum of its parts" />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
