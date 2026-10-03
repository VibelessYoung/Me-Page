import Link from "next/link";
import type { Blog } from "@/app/data/blogs";

type BlogCardProps = {
  blog: Blog;
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="
        group block
        rounded-3xl
        border border-white/10
        bg-white/[0.06]
        p-6
        backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-1
        hover:border-white/20
        hover:bg-white/[0.09]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)]
      "
    >
      <article>
        <div className="mb-6 flex items-center justify-between gap-4">
          <span
            className="
              rounded-full
              border border-white/10
              bg-white/[0.05]
              px-3 py-1
              text-xs
              text-white/50
            "
          >
            {blog.category}
          </span>

          <span className="text-xs text-white/35">{blog.readingTime}</span>
        </div>

        <h2
          className="
            text-xl font-medium tracking-tight
            text-white
            transition-colors duration-300
            group-hover:text-white/90
          "
        >
          {blog.title}
        </h2>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/45">
          {blog.description}
        </p>

        <div className="mt-7 flex items-center justify-between">
          <span className="text-xs text-white/30">{blog.date}</span>

          <span
            className="
              text-sm text-white/40
              transition-all duration-300
              group-hover:translate-x-1
              group-hover:text-white/80
            "
          >
            →
          </span>
        </div>
      </article>
    </Link>
  );
}
