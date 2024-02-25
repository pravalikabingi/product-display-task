import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./product.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (!username || !password) {
      setValidationMessage("Please enter both username and password.");
      return;
    }

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Invalid API credentials.");
        }
      })
      .then((response) => {
        alert("Login successful!");
        sessionStorage.setItem("user", true);
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        setValidationMessage(error.message || "Error during login. Please try again later.");
      });
  };

  return (
    <div className="form-page">
      <form onSubmit={handleLogin} className="form">
        <h2>Login</h2>
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
        <center>
          <button
            type="submit"
            style={{
              width: "70%",
              padding: "8px",
              borderRadius: "10px",
              backgroundColor: "white",
              fontSize: "16px",
            }}
          >
            Login
          </button>
        </center>
        <br />
        {validationMessage && (
          <p style={{ color: "red" }}>{validationMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Login;