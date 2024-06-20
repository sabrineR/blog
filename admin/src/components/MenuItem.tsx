import { Link } from "react-router-dom";
import { IMenuItemProps } from "../utils/menuInterface";

export const MenuItem: React.FC<IMenuItemProps> = ({
  open,
  icon,
  text,
  path,
  onClick 
}) => {
  return (
    <Link to={path} onClick={onClick}>
      <li
        className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
          "mt-2"  "bg-light-white"} `}
      >
        <span className={`${!open && "hidden"} origin-left duration-200`}>
          {icon} {text}
        </span>
      </li>{" "}
    </Link>
  );
};
