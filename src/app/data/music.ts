export type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover?: string;
};

export const tracks: Track[] = [
  {
    id: "afterlife",
    title: "loser monologue",
    artist: "crushes motorist",
    src: "/music/sign crushes motorist - loser monologue.mp3",
    cover: "/music-covers/t1.png",
  },
];
