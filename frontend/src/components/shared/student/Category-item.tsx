// import qs from "query-string";
import { cn } from "@/lib/utils";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { IconType } from "react-icons";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}

const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { categoryId, title } = useParams();

  const isSelected = categoryId === value;

  return (
    <button
    //   onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-purple-700 transition",
        isSelected && "border-purple-700 bg-purple-200/20 text-purple-800"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};

export default CategoryItem;
