import BlogCard from "./BlogCard";
import { blogs } from "@/app/data/blogs";

export default function BlogGrid() {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {blogs.map((blog) => (
        <BlogCard key={blog.slug} blog={blog} />
      ))}
    </div>
  );
}
