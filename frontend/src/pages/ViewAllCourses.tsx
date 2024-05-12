import { columns } from "@/components/shared/instructor/dashboard/column";
import Datatable from "@/components/shared/instructor/dashboard/data-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ViewAllCourses = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(courses);
  useEffect(() => {
    const fetchAllData = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/courses/instructor",
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

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

  return (
    <div className="p-6">
      <Datatable
        columns={columns}
        data={courses?.length === 0 ? [] : courses}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ViewAllCourses;
