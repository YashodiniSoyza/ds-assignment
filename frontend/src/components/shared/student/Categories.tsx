import {
  FcEngineering,
  FcFilmReel,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";

import { IconType } from "react-icons";
import CategoryItem from "./Category-item";

const iconMap: any = {
  "Software engineering": FcEngineering,
  "Data Science": FcMusic,
  "Computer Science": FcFilmReel,
  "Computer Network": FcOldTimeCamera,
  "Operating Systems": FcSalesPerformance,
  Accounting: FcSportsMode,
};

interface CategoriesProps {
  items: any;
}

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item: any) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
