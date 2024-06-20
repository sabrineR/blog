import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import { Signup } from "../views/Signup";
import Accueil from "../views/Accueil";
import { PrivateRoute } from "../components/PrivateRoute";
import PostView from "../views/PostView";
import { isAuthenticated } from "../utils/auth";
import PrivateNavbar from "./PrivateNavbar";
import PublicNavbar from "./PublicNavbar";

const PageContainer = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated() ? <PrivateNavbar /> : <PublicNavbar />}
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/accueil" element={<PrivateRoute element={Accueil} />} />
          <Route
            path="/post/:id"
            element={<PrivateRoute element={PostView} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default PageContainer;
