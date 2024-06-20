import React, { useEffect, useState } from "react";
import LoginComponent from "../components/Login/LoginComponent";
import { useNavigate } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../utils/auth";

export const LoginPage: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const authStatus = isAuthenticated();
    const role = isAdmin;
    setAdmin(role);
    setIsAuth(authStatus);
    if (isAuth && !admin) {
      navigate("/news");
    }
  }, [navigate, admin, isAuth]);
  return <LoginComponent />;
};

export default LoginPage;
