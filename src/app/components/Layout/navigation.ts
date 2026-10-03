import {
  BookOpen,
  House,
  Music2,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    label: "About",
    href: "/about",
    icon: UserRound,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: BookOpen,
  },
  {
    label: "Music",
    href: "/music",
    icon: Music2,
  },
];
