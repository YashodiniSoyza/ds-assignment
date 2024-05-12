import { IconBadge } from "@/components/shared/IconBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/comboBox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  CircleDollarSign,
  LayoutDashboard,
  AlignVerticalJustifyStart,
  Trash2,
  Upload,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import z from "zod";

const courseSchema = z.object({
  title: z.string().min(1, { message: "Please enter course title" }),
  description: z
    .string()
    .min(5, { message: "Description should have at least 5 characters" }),
  enrollment_fee: z.any().refine((value) => parseInt(value) > 1, {
    message: "course fee at least $1.00",
  }),

  course_type: z
    .string()
    .min(1, { message: "please enter valid course category" }),
});
const AddCoursePage = () => {
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [thumbnail, setThumbnail] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      enrollment_fee: 0,
      course_status: "REQUESTED",
      course_type: "",
    },
    resolver: zodResolver(courseSchema),
  });

  const backToCourses = () => {
    navigate("/instructor/courses");
  };

  const handleAddCourse = async (values: any) => {
    const { data } = await axios.post(
      "http://localhost:5000/api/courses/",
      {
        ...values,
        course_status: "REQUESTED",
        thumbnail: thumbnail,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.status) {
      toast.success(data.message);
      reset();
      navigate("/instructor/courses");
    } else {
      toast.error(data.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit((v) => handleAddCourse(v))}>
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">Complete all fields</span>
          </div>
          <div className="flex items-center gap-3">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant={"destructive"} className="flex gap-x-3">
                  <Trash2 size={18} /> Discard
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={backToCourses}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button className="flex gap-x-3">
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Upload size={18} />
              )}
              Publish
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 px-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <div className="mt-6 border bg-slate-100 rounded-md p-4">
              <label htmlFor="title" className="mb-3 block">
                Course Title
              </label>
              <Input type="text" className="mb-2" {...register("title")} />
              <span className=" text-red-500">{errors.title?.message}</span>
            </div>
            <div className="mt-6 border bg-slate-100 rounded-md p-4">
              <label htmlFor="title" className="mb-3 block">
                Course Description
              </label>
              <Textarea
                rows={3}
                className="mb-2"
                {...register("description")}
              />
              <span className=" text-red-500">
                {errors.description?.message}
              </span>
            </div>
            <div className="mt-6 border bg-slate-100 rounded-md p-4">
              <label htmlFor="title" className="mb-3 block">
                Thumbnail
              </label>
              <Input
                type="file"
                className="mb-2"
                onChange={(file: any) => setThumbnail(file?.target?.files[0])}
                accept="*.jpeg"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={AlignVerticalJustifyStart} />
              <h2 className="text-xl">Course Category</h2>
            </div>
            <div className="mt-6 border bg-slate-100 rounded-md p-4">
              <ComboBox
                options={[
                  {
                    label: "Software Engineering",
                    value: "Software Engineering",
                  },
                  { label: "Mathematics", value: "Mathematics" },
                  { label: "English", value: "English" },
                  { label: "Aesthetic", value: "Aesthetic" },
                ]}
                value={category}
                onChange={(value) => {
                  setCategory(value);
                  setValue("course_type", value);
                }}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <div className="mt-6 border bg-slate-100 rounded-md p-4">
              <label htmlFor="title" className="mb-3 block">
                Course Fee
              </label>
              <Input
                type="number"
                step={"0.01"}
                className="mb-2"
                placeholder="Set a price for your course"
                {...register("enrollment_fee")}
              />
              <span className=" text-red-500">
                {errors.enrollment_fee?.message}
              </span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddCoursePage;
