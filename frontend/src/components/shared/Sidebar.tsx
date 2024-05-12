import SidebarRoutes from "./SidebarRoutes";
import logo from "@/assets/images/logo-bg-none.png";

const Sidebar = () => {
  return (
    <div className="h-full boarder-r flex flex-col overflow-y-auto bg-white shadow-sm ">
      <div className="p-6 mx-auto">
        <img src={logo} alt="lernify logo" height={50} width={100} />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
