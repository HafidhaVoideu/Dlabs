import React, { useState } from "react";
import Header from "../global/header/Header";
import MainFooter from "../global/footer/MainFooter";
import "./Auth.css";
import axios from "../../axios/axios";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to /api/signup/ to create a new user
      const response = await axios.post("/api/users", {
        email,
        password,
        birthday,
      });

      console.log(response);

      //   // Assuming the API returns a token, you can save it in local storage or state
      //   const token = response.data.token;
      //   // Save the token in local storage (you may want to use a more secure method)
      //   localStorage.setItem("token", token);

      //   // Now you can use the token in the headers for authenticated requests
      //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/signin");

      // TODO: Redirect to the authenticated user's dashboard or perform other actions
    } catch (error) {
      console.error("Sign-up failed", error);

      // Display error message
      setError("Error signing up. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="auth-body">
        <div className="auth-container">
          <form onSubmit={handleSignUp}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="birthday">Birthday:</label>
              <input
                type="date"
                id="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default SignUp;
