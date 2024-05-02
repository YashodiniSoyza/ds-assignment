import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Logo from "@/assets/images/logo-bg-none.png";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const loginFormSchema = z.object({
  fullName: z.string().min(1, { message: "Please enter first name" }),
  email: z.string().email({ message: "please enter valid email" }).min(1),
  password: z.string().min(1, { message: "Please enter your password" }),
  userType: z.string().min(1, { message: "Tell us who you are ?" }),
});

const Register = () => {
  const [activeUserType, setActiveUserType] = useState("student");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      userType: "student",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const handleChangeUserType = (userType: string) => {
    if (errors) {
      clearErrors("fullName");
      clearErrors("email");
      clearErrors("password");
    }
    setActiveUserType(userType);
    setValue("userType", userType);
  };

  const handleRegister = async (values: any) => {
    const { data } = await axios.post(
      "http://localhost:5005/api/users/register",
      { ...values, userType: undefined, role: values.userType }
    );

    // navigate to login page
    if (data.status) {
      toast.success(data.message);
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center m-auto gap-y-5">
      <h1 className="font-sans text-[30px] font-bold text-[#3b3c45] ">
        Welcome to <span className="text-purple-600">Lernify</span>
      </h1>

      <div
        className={`w-[80%] ${
          !errors.email?.message &&
          !errors.password?.message &&
          !errors.fullName?.message
            ? "h-[590px]"
            : "h-[660px]"
        } bg-white px-10 py-5 rounded-3xl shadow-2xl relative overflow-y-hidden transition-all duration-500`}
      >
        <div className="flex justify-center items-center drop-shadow-2xl">
          <img src={Logo} alt="lernify logo" height={100} width={150} />
        </div>
        <div className="w-full flex justify-evenly gap-3 mb-4">
          <Button
            className="w-full transition-all duration-200"
            variant={`${activeUserType === "student" ? "default" : "outline"}`}
            onClick={() => handleChangeUserType("student")}
          >
            Student
          </Button>
          <Button
            className="w-full"
            variant={`${
              activeUserType === "instructor" ? "default" : "outline"
            }`}
            onClick={() => handleChangeUserType("instructor")}
          >
            Instructor
          </Button>
        </div>
        <form onSubmit={handleSubmit((values) => handleRegister(values))}>
          <div className="mb-5">
            <label className="font-bold">
              {activeUserType === "student" ? "Student" : "Instructor"} Name
            </label>
            <span className="text-red-600 ml-1">&#42;</span>
            <Input
              type="text"
              id="full name"
              {...register("fullName")}
              className="mt-2"
              placeholder="john cena"
            />
            {errors?.fullName && (
              <p className="text-red-500">{errors?.fullName.message}</p>
            )}
          </div>
          <div className="mb-5">
            <label className="font-bold">Email</label>
            <span className="text-red-600 ml-1">&#42;</span>
            <Input
              type="email"
              id="email"
              {...register("email")}
              className="mt-2"
              placeholder="youremail@gmail.com"
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

          <div className="w-full text-right mb-5 text-[16px]">
            <Link to={"/forgot"} className="text-blue-700 hover:text-blue-800">
              Forgot password ?
            </Link>
          </div>
          <Button type="submit" className="w-full">
            {isLoading ? <Loader2 className="animate-spin" /> : "Register"}
          </Button>
        </form>

        <div className="w-full mt-3 absolute bottom-0 left-0 bg-[#f7f7f7] rounded-b-2xl">
          <hr />
          <h3 className="text-center  my-2 py-2">
            registered already?
            <Link to="/" className="text-blue-700 underline ml-1">
              Sign In
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Register;
