import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/images/logo-bg-none.png";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const loginFormSchema = z.object({
  email: z.string().email({ message: "please enter valid email" }).min(1),
  password: z.string().min(1, { message: "Please enter your password" }),
});
const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const handleLogin = async (formData: { email: string; password: string }) => {
    const { data } = await axios.post(
      "http://localhost:5005/api/users/login",
      formData
    );

    if (data?.status) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          fullName: data.fullName,
          access_token: data.token,
          role: data.role,
        })
      );

      toast.success(data.message);

      if (data.role === "student") {
        navigate("/student/browse");
      } else {
        navigate("/instructor/courses");
      }
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center m-auto gap-y-5">
      <h1 className="font-sans text-[50px] font-bold text-[#3b3c45] ">
        Welcome Back
      </h1>

      <div className="w-[80%] h-[500px] bg-white px-10 py-5 rounded-3xl shadow-2xl relative overflow-y-hidden">
        <div className="flex justify-center items-center drop-shadow-2xl">
          <img src={Logo} alt="lernify logo" height={100} width={150} />
        </div>
        <form
          onSubmit={handleSubmit((values) => {
            handleLogin(values);
          })}
        >
          <div className="mb-5">
            <label className="font-bold">Email</label>
            <span className="text-red-600 ml-1">&#42;</span>
            <Input
              type="email"
              id="email"
              {...register("email")}
              className="mt-2"
              placeholder="instructor@gmail.com"
            />
            {errors?.email && (
              <p className="text-red-500">{errors?.email.message}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="font-bold">Password</label>
            <span className="text-red-600 ml-1">&#42;</span>
            <Input
              type="password"
              id="password"
              {...register("password")}
              className="mt-2"
            />
            {errors?.password && (
              <p className="text-red-500">{errors?.password.message}</p>
            )}
          </div>
          <div className="w-full text-right mb-8 text-[16px]">
            <Link to={"/forgot"} className="text-blue-700 hover:text-blue-8 00">
              Forgot password ?
            </Link>
          </div>
          <Button type="submit" className="w-full">
            {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
        </form>

        <div className="w-full mt-3 absolute bottom-0 left-0 bg-[#f7f7f7] rounded-b-2xl">
          <hr />
          <h3 className="text-center  my-2 py-2">
            Haven't registered yet ?{" "}
            <Link to="/sign-up" className="text-blue-700 underline">
              Register
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
