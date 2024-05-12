import { Outlet } from "react-router-dom";
import authImage from "../assets/images/auth_image.jpg";

const AuthLayout = () => {
  return (
    <div className="w-dvw h-dvh flex sm:flex-wrap lg:flex-nowrap">
      <div
        className={`sm:basis-full lg:basis-[50%] h-dvh w-full flex flex-col items-center justify-center lg:rounded-tr-2xl lg:rounded-br-2xl`}
        style={{
          background: `url(${authImage}) no-repeat center center`,
          backgroundSize: "cover",
          opacity: "0.9",
        }}
      >
        {/* <h1 className="text-[80px] font-poppins font-bold text-white">Learn Today</h1> */}
      </div>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-16 sm:basis-full lg:basis-[50%]">
        <div className="relative w-full max-w-lg">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-[0.4s]"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-[0.1s]"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-[0.2s]"></div>

          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
