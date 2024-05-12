import SearchInput from "@/components/shared/SearchInput";
import Categories from "@/components/shared/student/Categories";
import CoursesList from "@/components/shared/student/CoursesList";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const fetchAllAcceptedCourses = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/courses/accept",
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        }
      );

      if (data.status) {
        setIsLoading(false);
        setCourses(data.data);
      } else {
        setIsLoading(false);
        setCourses([]);
        toast.error(data.message);
      }
    };

    fetchAllAcceptedCourses();
  }, []);

  console.log(courses);
  return (
    <>
      {/* mobile responsive */}
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories
          items={[
            { id: 1, name: "Software engineering" },
            { id: 2, name: "Data Science" },
            { id: 3, name: "Computer Science" },
            { id: 4, name: "Computer Network" },
            { id: 5, name: "Operating Systems" },
            { id: 6, name: "Accounting" },
          ]}
        />
        {isLoading && (
          <div className="flex justify-center items-center w-full">
            <Loader2 className="animate-spin" />
          </div>
        )}
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default BrowseCourses;
