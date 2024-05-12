import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCopy, FileCheck2, FileClock } from "lucide-react";

const StatCard = ({
  acceptedCourses,
  rejectedCourses,
  totalCourses,
  pendingCourses,
}: any) => {
  return (
    <div className="flex w-full  justify-around items-center my-5">
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center mb-2">Total Courses</CardTitle>
            <hr />
          </CardHeader>
          <CardContent className="flex  flex-col justify-center gap-3 items-center px-5">
            <BookCopy size={60} color="#5d17eb" />
            <h1 className="font-bold text-[60px] ">{totalCourses}</h1>
          </CardContent>
        </Card>
      </div>
      <div>
        {" "}
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center mb-2">Accepted Courses</CardTitle>
            <hr />
          </CardHeader>
          <CardContent className="flex  flex-col justify-center gap-3 items-center px-5">
            <FileCheck2 size={60} className="text-green-500" />
            <h1 className="font-bold text-[60px] ">{acceptedCourses}</h1>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center mb-2">Pending Courses</CardTitle>
            <hr />
          </CardHeader>
          <CardContent className="flex  flex-col justify-center gap-3 items-center px-5">
            <FileClock size={60} className="text-yellow-400" />
            <h1 className="font-bold text-[60px] ">{pendingCourses}</h1>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center mb-2">Rejected Courses</CardTitle>
            <hr />
          </CardHeader>
          <CardContent className="flex  flex-col justify-center gap-3 items-center px-5">
            <FileClock size={60} className="text-red-400" />
            <h1 className="font-bold text-[60px] ">{rejectedCourses}</h1>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatCard;
