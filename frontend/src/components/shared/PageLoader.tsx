import { Loader } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-16 sm:basis-full lg:basis-[50%]">
      <div className="relative w-full max-w-lg">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="m-8 relative space-y-4">
          <div>
            <div className="flex justify-center items-center">
              <Loader className="animate-spin " size={80} color="black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
