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
    slug: "why-i-love-watching-anime",
    title: "چرا تماشای انیمه رو دوست دارم",
    description:
      "حس خوبی میده وقتی داری یک انیمه رو تماشا میکنی انگار داری با اون کرکتر از دنیای واقعی دور میشی و باهاش زندگی میکنی",
    date: "Oct 3, 2026",
    readingTime: "30 Sec read",
    category: "Personal",
  },
];
