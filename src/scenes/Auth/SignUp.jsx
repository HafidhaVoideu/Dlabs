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
  const [verificationModal, setVerificationModal] = useState(false);

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

      // Open the email verification modal
      setVerificationModal(true);

      // console.log(response);

      // navigate("/signin");
    } catch (error) {
      console.error("Sign-up failed", error);

      setError("Error signing up. Please try again.");
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post("/api/auth/verifyEmail", {
        userId: email, // Use the user's email as the userId for verification
        name: email,
      });

      console.log(response);

      // Display a message to the user that they need to check their email for verification
      alert("Please check your email for verification");

      // Optionally, you can automatically navigate to the sign-in page or handle it based on your application flow
      navigate("/signin");
    } catch (error) {
      console.error("Email verification failed", error);

      // Handle the error, for example, by displaying an error message to the user
      alert("Email verification failed. Please try again.");
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
      {/* Email Verification Modal */}
      {verificationModal && (
        <div className="verification-modal">
          <h2>Verify Email</h2>
          <p>A verification link will be send on your email:</p>
          <h3>{email}</h3>
          {/* Add input fields and a button to submit verification code */}
          {/* ... */}
          <button onClick={handleVerifyEmail}>Verify</button>
        </div>
      )}

      <MainFooter />
    </div>
  );
};

export default SignUp;
