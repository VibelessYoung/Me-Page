import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs } from "@/app/data/blogs";

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen px-5 pb-24 pt-32 text-white">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-white/35
            transition-colors
            hover:text-white/70
          "
        >
          <span>←</span>
          Back to blog
        </Link>

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-3">
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

            <span className="text-xs text-white/30">{blog.date}</span>

            <span className="text-xs text-white/30">{blog.readingTime}</span>
          </div>

          <h1
          dir="rtl"
            className="
              mt-6
              text-4xl
              font-semibold
              tracking-tight
              sm:text-5xl
              sm:leading-tight
            "
          >
            {blog.title}
          </h1>

          <p
          dir="rtl"
            className="
              mt-6
              text-base
              leading-8
              text-white/80
              sm:text-lg
            "
          >
            {blog.description}
          </p>
        </header>

        <div
          className="
            my-12
            h-px
            bg-white/10
          "
        />
      </article>
    </main>
  );
}
