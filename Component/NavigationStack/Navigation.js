
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../Home/Home";
import Product from "../Product/Product";
import Signup from "../SignUp";
import Login from "../Login";

export default function NavigationStak() {
  const isLoggedIn = sessionStorage.getItem("user");
  const [user, setUser] = useState(isLoggedIn);

  useEffect(() => {
    setUser(sessionStorage.getItem("user"));
  }, [user]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <Routes>
        {user !== null ? (
          <>
            <Route
              path="/"
              element={<HomePage handleLogout={handleLogout} />}
            />
            <Route path="/Product/:id" element={<Product />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
          </>
        )}
        {/* <Route path="*" element={<h1>Route not found</h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}