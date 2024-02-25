import React, { useState } from "react";
import "./product.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();

    try {

      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();

      const usersFromApi = data.users || [];
      const isUsernameExistsInApi = usersFromApi.some(
        (user) => user.username === username
      );

      if (!isUsernameExistsInApi) {
        setValidationMessage(
          "Username not found in the API. Please sign up with a valid username."
        );
        return;
      }

      if (password !== confirmPassword) {
        setValidationMessage(
          "Passwords do not match. Please enter the same password in both fields."
        );
        return;
      }

      const user = {
        username: username,
        password: password,
      };


      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = [...existingUsers, user];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setValidationMessage("User registered successfully!");
      alert("User registered successfully!")
      navigate("/login");
    } catch (error) {
      console.error(error);
      setValidationMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="form-pages">
      <form onSubmit={handleSignup} className="form">
        <center>
          <h2>REGISTRATION</h2>
          <h3>FOR D3V</h3>
        </center>
        <br />
        <label>Username :</label>
        <br />
        <input
          className="inp"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setValidationMessage("");
          }}
        />
        <br />
        <br />
        <label>Password :</label>
        <br />
        <input
          className="inp"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setValidationMessage("");
          }}
        />
        <br />
        <br />
        <label>Confirm Password :</label>
        <br />
        <input
          className="inp"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setValidationMessage("");
          }}
        />
        <br />
        <br />
        <button
          type="submit"
          style={{
            width: "49%",
            padding: "8px",
            borderRadius: "15px",
            backgroundColor: "white",
            fontSize: "16px",
            marginRight: "4px",
          }}
        >
          Sign Up
        </button>
        <button
          id="login"
          style={{
            width: "49%",
            padding: "8px",
            borderRadius: "10px",
            backgroundColor: "white",
            fontSize: "16px",
            textDecoration: "none",
          }}
        >
          <Link to={"/Login"} className="loginLink">
            Log In
          </Link>
        </button>
        <br />
        {validationMessage && (
          <p style={{ color: "red" }}>{validationMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Signup;