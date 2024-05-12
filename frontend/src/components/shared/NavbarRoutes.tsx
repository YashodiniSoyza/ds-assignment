import { LogOutIcon, Settings, User } from "lucide-react";

import testProfilePic from "@/assets/images/auth_image.jpg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const NavbarRoutes = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="flex gap-x-2 ml-auto">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex gap-2 justify-end items-center focus:outline-none focus:drop-shadow-xl">
            <h3 className="font-bold">
              Hi, <span className="text-purple-500">{user?.fullName}</span>
            </h3>
            <div
              className="h-[40px] w-[40px] bg-purple-600 rounded-full cursor-pointer"
              style={{
                background: `url(${testProfilePic}) no-repeat center center`,
              }}
            ></div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="cursor-pointer">
            <DropdownMenuItem className="flex gap-4 justify-start items-center cursor-pointer">
              <User size={15} />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-4 justify-start items-center cursor-pointer">
              <Settings size={15} />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-4 justify-start items-center cursor-pointer bg-red-100 text-red-500"
              onClick={handleLogout}
            >
              <LogOutIcon size={15} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavbarRoutes;
