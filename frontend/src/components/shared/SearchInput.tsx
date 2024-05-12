import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Input } from "../ui/input";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { categoryId } = useParams();

  //   useEffect(() => {
  //     const url = qs.stringifyUrl(
  //       {
  //         url: pathname,
  //         query: {
  //           categoryId: currentCategoryId,
  //           title: debouncedValue,
  //         },
  //       },
  //       { skipEmptyString: true, skipNull: true }
  //     );

  //     router.push(url);
  //   }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for a course"
      />
    </div>
  );
};

export default SearchInput;
