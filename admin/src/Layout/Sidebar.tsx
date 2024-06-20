import React, { useState } from "react";
import {
  UsergroupAddOutlined,
  MessageOutlined,
  LogoutOutlined,
  PicLeftOutlined,
  StepBackwardOutlined,
  PicCenterOutlined,
} from "@ant-design/icons";
import { MenuItem } from "../components/MenuItem";
import { logout } from "../utils/auth";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } bg-dark-purple h-full sm:h-screen p-5 pt-8 relative duration-300`}
    >
      <StepBackwardOutlined
        style={{ color: "white" }}
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          <i className="fas fa-heart" />
          Admin Dashboard
        </h1>
      </div>
      <ul className="pt-6">
        <MenuItem
          open={open}
          icon={<PicLeftOutlined />}
          text="Latest Activity"
          path="/news"
        />
        <MenuItem
          open={open}
          icon={<UsergroupAddOutlined />}
          text="Users"
          path="/users"
        />
        <MenuItem
          open={open}
          icon={<PicCenterOutlined />}
          text="Articles"
          path="/posts"
        />
        <MenuItem
          open={open}
          icon={<MessageOutlined />}
          text="Comments"
          path="/comments"
        />
        <MenuItem
          open={open}
          icon={<LogoutOutlined />}
          text="Logout"
          path="/"
          onClick={handleLogout}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
