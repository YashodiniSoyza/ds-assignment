import { IconBadge } from "@/components/shared/IconBadge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  category: string;
}
const CourseCard = ({
  id,
  title,
  imageUrl,
  price,
  category,
}: CourseCardProps) => {
  return (
    <Link to={`/student/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <img className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-purple-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>1 / 1 chapters</span>
            </div>
          </div>
          <p className="text-md md:text-sm font-medium text-slate-700">
            {formatPrice(price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
