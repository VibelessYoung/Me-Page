export type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover?: string;
};

export const tracks: Track[] = [
  {
    id: "kill-switch",
    title: "killswitch",
    artist: "mentally scared",
    src: "/music/killswitch.mp3",
    cover: "/music-covers/c3.jpg",
  },
  {
    id: "loneliness",
    title: "loneliness",
    artist: "prodghesti3",
    src: "/music/killswitch.mp3",
    cover: "/music-covers/c4.jpg",
  },
  {
    id: "Girls-Like-You",
    title: "Girls Like You",
    artist: "Interval 941",
    src: "/music/Girls Like You.mp3",
    cover: "/music-covers/c1.jpg",
  },
  {
    id: "existing-your-warm-arms",
    title: "existing",
    artist: "your warm arms",
    src: "/music/existing   your warm arms.m4a",
    cover: "/music-covers/c2.jpg",
  },
  {
    id: "Sarah",
    title: "Sarah",
    artist: "Alex G",
    src: "/music/Sarah.mp3",
    cover: "/music-covers/c5.jpg",
  },
  {
    id: "needs-no-progress-i-will-lie",
    title: "needs no progress, i will lie",
    artist: "salvia palth",
    src: "/music/111 - needs no progress, i will lie - salvia palth (320).mp3",
    cover: "/music-covers/c6.jpg",
  },
];
