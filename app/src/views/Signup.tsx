import React from "react";
import "../styles/login.css";
import SignupComponent from "../components/Signup/SignupComponent";

export const Signup: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">Primaa Blog</h2>
      <div className="md:w-full md:max-w-3xl">
        <SignupComponent />
      </div>
    </div>
  );
};

export default Signup;
