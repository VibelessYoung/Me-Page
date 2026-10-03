export type Blog = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
};

export const blogs: Blog[] = [
  {
    slug: "why-i-love-building-websites",
    title: "Why I Love Building Websites",
    description:
      "A little story about why I enjoy creating things for the web and turning ideas into interfaces.",
    date: "Oct 3, 2026",
    readingTime: "3 min read",
    category: "Personal",
  },
  {
    slug: "learning-nextjs",
    title: "Learning Next.js",
    description:
      "Some notes from my journey of learning Next.js, React and everything around modern web development.",
    date: "Sep 28, 2026",
    readingTime: "5 min read",
    category: "Development",
  },
  {
    slug: "building-my-personal-website",
    title: "Building My Personal Website",
    description:
      "Thoughts, experiments and decisions behind building a small corner of the internet for myself.",
    date: "Sep 20, 2026",
    readingTime: "4 min read",
    category: "Personal",
  },
];
