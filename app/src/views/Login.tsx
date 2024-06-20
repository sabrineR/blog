import React from "react";
import LoginComponent from "../components/Login/LoginComponent";

export const Login: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">Primaa Blog</h2>
      <div className="md:w-1/2">
        <LoginComponent />
      </div>
    </div>
  );
};

export default Login;
