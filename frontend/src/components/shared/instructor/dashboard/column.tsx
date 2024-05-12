import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";

const user = JSON.parse(localStorage.getItem("user") || "{}");
export const columns: any = [
  {
    accessorKey: "title",
    header: ({ column }: any) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }: any) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: any) => {
      const price = parseFloat(row.original.enrollment_fee);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }: any) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: any) => {
      const status = row.original.course_status;

      return (
        <Badge
          className={cn(
            status === "REQUESTED" && "bg-yellow-400 text-white",
            status === "ACCEPTED" && "bg-green-600",
            status === "REJECTED" && "bg-red-600"
          )}
        >
          {status === "REQUESTED"
            ? "PENDING"
            : status === "ACCEPTED"
            ? "ACCEPTED"
            : "REJECTED"}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }: any) => {
      const { course_id } = row.original;

      const handleCourseDelete = async () => {
        const { data } = await axios.delete(
          `http://localhost:5000/api/courses/${course_id}`,
          {
            headers: { Authorization: `Bearer ${user.access_token}` },
          }
        );

        if (data.status) {
          toast.success(data.message);
          window.location.reload();
        } else {
          toast.error(data.message);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link to={`/instructor/courses/${course_id}`}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="hover:bg-red-300 text-red-500 cursor-pointer"
              onClick={handleCourseDelete}
            >
              <Trash2 className="h-4 w-4 mr-2 hover:bg-red-300" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
