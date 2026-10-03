import MusicPlayer from "@/app/components/Music/MusicPlayer";
import { tracks } from "@/app/data/music";

export default function MusicPage() {
  return (
    <main className="min-h-screen px-5 pb-20 pt-28 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header dir="rtl" className="mb-10 ml-auto max-w-2xl text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            My sound
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            موزیک
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/40 sm:text-base">
            یه مجموعه کوچیک از آهنگ‌هایی که مدام بهشون برمی‌گردم.
          </p>
        </header>

        <MusicPlayer tracks={tracks} />
      </div>
    </main>
  );
}
