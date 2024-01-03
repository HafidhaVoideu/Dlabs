import React, { useState } from "react";
import Header from "../global/header/Header";
import MainFooter from "../global/footer/MainFooter";
import "./Auth.css";
import axios from "../../axios/axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Check if the passwords match
      if (password !== passwordConfirmation) {
        setError("Passwords do not match.");
        return;
      }

      const response = await axios.post("/api/users", {
        email,
        password,
        birthday,
      });

      console.log(response);

      navigate("/signin");
    } catch (error) {
      console.error("Sign-up failed", error);

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
            <div className="passField">
              <label htmlFor="password">Password:</label>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="passView"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <img src="/eye.png" />
                  ) : (
                    <img src="/hide.png" />
                  )}
                </button>
              </div>
            </div>
            <div className="passField">
              <label htmlFor="passwordConfirmation">Confirm Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
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
            <p className="auth_note">
              Already have an account? <Link to="/signin">SignIn</Link>
            </p>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default SignUp;
