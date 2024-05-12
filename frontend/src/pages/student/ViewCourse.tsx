import { IconBadge } from "@/components/shared/IconBadge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import axios from "axios";
import { BookOpen, Loader2, Plus, ShoppingCart } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useParams, useSearchParams } from "react-router-dom";

type courseT = {
  course_id: string;
  title: string;
  thumbnailUrl: string;
  public_id: string;
  description: string;
  instructor_id: string;
  course_type: string;
  enrollment_fee: number;
  course_status: string;
};
const ViewCourse = () => {
  const [course, setCourse] = useState<courseT>({
    course_id: "",
    course_status: "",
    course_type: "",
    description: "",
    enrollment_fee: 0,
    instructor_id: "",
    public_id: "",
    thumbnailUrl: "",
    title: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // get the data id through params
  const { courseId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const isAdmin = Boolean(searchParams.get("user"));

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/courses/${courseId}`,
        { headers: { Authorization: `Bearer ${user.access_token}` } }
      );

      if (data.status) {
        setIsLoading(false);
        setCourse(data.data[0]);
      } else {
        setIsLoading(false);

        toast.error(data.message);
      }
    };
    fetchCourseDetails();
  }, []);

  console.log(course);
  if (isLoading) {
    return (
      <div className="w-full translate-x-6">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const redirectToStripe = useCallback(async () => {
    const stripe = await loadStripe(
      "pk_test_51PHCSQSByHq1Rm7DA3m95bstm0xl3gFrM7Pa4weMzWBoRsbkoM7tdnC7eoEm2O2xqhl4QUdPblLuQ6ip0DNSsbC4008ycchUAt"
    );

    await axios
      .post(
        "http://localhost:5000/api/payment/pending",
        {
          data: course,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (!res.data.status) {
          toast.error(res.data.message);
        }
        const session = res.data;
        const result = stripe?.redirectToCheckout({
          sessionId: session.id,
        });
      });
  }, [course, loadStripe, user]);

  return (
    <>
      <Link to={`${isAdmin ? "/admin/view-courses" : "/student/browse"}`}>
        <Button className="px-10 my-2 ml-3">Back</Button>
      </Link>

      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3  m-3 h-full">
        <div className="relative w-full  rounded-md overflow-hidden">
          <img
            className="object-cover h-[400px] w-full"
            alt={course.title}
            src={course.thumbnailUrl}
          />
        </div>
        <div className="flex flex-col pt-2 mt-4 px-3">
          <div className="flex justify-between items-center">
            <div className="text-lg md:text-2xl font-medium group-hover:text-purple-700 transition line-clamp-2">
              {course.title}
            </div>

            <div className="flex gap-3">
              <p className="text-md md:text-3xl font-bold text-slate-700">
                {formatPrice(course.enrollment_fee)}
              </p>

              {!isAdmin && (
                <Button
                  className="rounded-3xl flex justify-center items-center gap-2 hover:bg-purple-700"
                  onClick={redirectToStripe}
                >
                  <ShoppingCart size={15} />
                  Buy course
                </Button>
              )}
            </div>
          </div>
        </div>
        <p className="text-lg text-muted-foreground pl-3">
          {course.course_type}
        </p>

        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs pl-3">
          <div className="flex items-center gap-x-1 text-slate-500">
            <IconBadge size="sm" icon={BookOpen} />
            <span>1 Chapter</span>
          </div>
        </div>

        <p className="my-2 text-justify pl-3">{course.description}</p>
      </div>
    </>
  );
};

export default ViewCourse;
