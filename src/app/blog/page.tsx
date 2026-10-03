import BlogGrid from "@/app/components/Blog/BlogGrid";

export default function BlogPage() {
  return (
    <main className="min-h-screen px-5 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm text-white/35">Thoughts & notes</p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Blog
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/45 sm:text-base">
            A small collection of things I learn, build, think about, and
            occasionally feel like writing down.
          </p>
        </header>

        <BlogGrid />
      </div>
    </main>
  );
}
