import CourseCard from "./CourseCard";

type CourseWithProgressWithCategory = {
  course_id: number;
  course_status: string;
  course_type: string;
  description: string;
  enrollment_fee: number;
  instructor_id: number;
  public_id: string;
  thumbnailUrl: string;
  title: string;
};
interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item: any) => (
          <CourseCard
            key={item.course_id}
            id={item.course_id}
            title={item.title}
            imageUrl={item.thumbnailUrl!}
            price={item.enrollment_fee!}
            category={item?.course_type!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foregrounded mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};

export default CoursesList;
