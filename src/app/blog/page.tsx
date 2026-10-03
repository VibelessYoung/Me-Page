import BlogGrid from "@/app/components/Blog/BlogGrid";

export default function BlogPage() {
  return (
    <main dir="rtl" className="min-h-screen px-5 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm text-white/35">افکار و نوشته ها</p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            بلاگ
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/45 sm:text-base">
            مجموعه‌ای کوچک از چیزهایی که به آنها فکر
            می‌کنم و گاهی اوقات دلم می‌خواهد آنها را بنویسم.
          </p>
        </header>

        <BlogGrid />
      </div>
    </main>
  );
}
