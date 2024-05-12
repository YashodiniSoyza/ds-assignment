import { IconBadge } from "@/components/shared/IconBadge";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import TitleForm from "@/components/shared/instructor/createCourse/Title-form";
import DescriptionForm from "@/components/shared/instructor/createCourse/Description-form";
import ImageForm from "@/components/shared/instructor/createCourse/Image-form";
import CategoryForm from "@/components/shared/instructor/createCourse/Category-form";
import PriceForm from "@/components/shared/instructor/createCourse/Price-form";
import AttachmentForm from "@/components/shared/instructor/createCourse/Attachment-form";
import ChapterForm from "@/components/shared/instructor/createCourse/Chapter-form";
import Actions from "@/components/shared/instructor/createCourse/Actions";
import Banner from "@/components/shared/Banner";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { userId } = useAuth();

  //   if (!userId) {
  //     navigate("/sign-in");
  //   }

  //   const { data: course =  } = useQuery({
  //     queryKey: ["course", courseId],
  //     queryFn: () =>
  //       axios.get(`/api/courses/${courseId}/${userId}`).then((res) => res.data),
  //   });

  const course = {
    id: courseId,
    title: "Test title",
    description: "",
    imageUrl: "",
    price: "",
    categoryId: "",
    attachments: [{ id: "1234", name: "test Attachment" }],
    isPublished: false,
    chapters: [{ isPublished: true }],
  };

  //   const { data: categories = [] } = useQuery({
  //     queryKey: ["categories"],
  //     queryFn: () => axios.get(`/api/categories/`).then((res) => res.data),
  //   });

  const categories: any = [];
  if (!course) {
    navigate("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter: any) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={courseId!!}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id!!} />
            <DescriptionForm initialData={course} courseId={course.id!!} />
            <ImageForm initialData={course} courseId={course.id!!} />
            <CategoryForm
              initialData={course}
              courseId={course.id!!}
              options={categories.map((category: any) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChapterForm initialData={course} courseId={course.id!!} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id!!} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id!!} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
