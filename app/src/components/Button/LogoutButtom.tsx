import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { logout } from "../../utils/auth";
function LogoutButtom() {
  const handleLogout = () => {
    logout();
  };
  return <LogoutOutlined onClick={handleLogout} />;
}
export default LogoutButtom;
