import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import UsersPage from "../views/UsersPage";
import LastActivitiesPage from "../views/LastActivitiesPage";
import CommentsPage from "../views/CommentsPage";
import LoginPage from "../views/LoginPage";
import { PrivateRoute } from "../components/PrivateRoute";
import PostPage from "../views/PostPage";
import { isAdmin, isAuthenticated } from "../utils/auth";

const PageContainer = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {isAuthenticated() && isAdmin() && (
        <div className="w-full md:w-1/4">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 overflow-y-auto bg-gray-100">
        <div className="p-4">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/users"
              element={<PrivateRoute element={UsersPage} />}
            />
            <Route
              path="/news"
              element={<PrivateRoute element={LastActivitiesPage} />}
            />
            <Route
              path="/posts"
              element={<PrivateRoute element={PostPage} />}
            />
            <Route
              path="/comments"
              element={<PrivateRoute element={CommentsPage} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
