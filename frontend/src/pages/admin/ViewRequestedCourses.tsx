import StatCard from "@/components/shared/admin/StatCard";
import { columns } from "@/components/shared/admin/dashboardTable/column";
import Datatable from "@/components/shared/admin/dashboardTable/data-table";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ViewRequestedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  console.log(user.access_token);
  useEffect(() => {
    const fetchAllData = async () => {
      const { data } = await axios.get("http://localhost:5000/api/courses", {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });

      if (data.status) {
        setCourses(data.data);
        setIsLoading(false);
      } else {
        setCourses([]);
        setIsLoading(false);
        toast.error(data.message);
      }
    };

    fetchAllData();
  }, []);

  const totalCourses = courses.length;
  const acceptedCourses = courses.filter(
    (item: any) => item.course_status === "ACCEPTED"
  );

  const rejectedCourses = courses.filter(
    (item: any) => item.course_status === "REJECTED"
  );
  const pendingCourses = courses.filter(
    (item: any) => item.course_status === "REQUESTED"
  );

  return (
    <div className="flex flex-col gap-3">
      <div>
        <StatCard
          totalCourses={totalCourses}
          acceptedCourses={acceptedCourses.length}
          rejectedCourses={rejectedCourses.length}
          pendingCourses={pendingCourses.length}
        />
      </div>
      <div className="px-7 mt-8">
        <Datatable columns={columns} data={courses} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ViewRequestedCourses;
