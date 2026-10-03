"use client";

import {
  ChevronDown,
  Maximize2,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Track } from "@/app/data/music";

type RepeatMode = "off" | "all" | "one";

type MusicPlayerProps = {
  tracks: Track[];
};

type EqualizerBand = {
  frequency: number;
  label: string;
};

const EQUALIZER_BANDS: EqualizerBand[] = [
  { frequency: 60, label: "60" },
  { frequency: 170, label: "170" },
  { frequency: 1000, label: "1k" },
  { frequency: 4000, label: "4k" },
  { frequency: 10000, label: "10k" },
];

const EQ_PRESETS = {
  Flat: [0, 0, 0, 0, 0],
  Bass: [7, 5, 1, -1, -2],
  Vocal: [-2, -1, 3, 5, 3],
  Chill: [4, 2, -1, 2, 3],
} as const;

function formatTime(time: number) {
  if (!Number.isFinite(time) || time < 0) {
    return "0:00";
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function MusicPlayer({ tracks }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  const filterNodesRef = useRef<BiquadFilterNode[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const animationFrameRef = useRef<number | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const [playbackRate, setPlaybackRate] = useState(1);

  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");

  const [showPlaylist, setShowPlaylist] = useState(true);
  const [showEqualizer, setShowEqualizer] = useState(false);

  const [eqValues, setEqValues] = useState<number[]>([...EQ_PRESETS.Flat]);

  const [visualizerData, setVisualizerData] = useState<number[]>(
    new Array(28).fill(0),
  );

  const [error, setError] = useState("");

  const currentTrack = tracks[currentIndex];

  const setupAudioGraph = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (sourceNodeRef.current) {
      return;
    }

    const AudioContextClass =
      window.AudioContext ??
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    const context = new AudioContextClass();

    const source = context.createMediaElementSource(audio);

    const filters = EQUALIZER_BANDS.map((band, index) => {
      const filter = context.createBiquadFilter();

      if (index === 0) {
        filter.type = "lowshelf";
      } else if (index === EQUALIZER_BANDS.length - 1) {
        filter.type = "highshelf";
      } else {
        filter.type = "peaking";
      }

      filter.frequency.value = band.frequency;
      filter.gain.value = 0;

      if (filter.type === "peaking") {
        filter.Q.value = 1;
      }

      return filter;
    });

    const analyser = context.createAnalyser();

    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.85;

    let previousNode: AudioNode = source;

    for (const filter of filters) {
      previousNode.connect(filter);
      previousNode = filter;
    }

    previousNode.connect(analyser);
    analyser.connect(context.destination);

    audioContextRef.current = context;
    sourceNodeRef.current = source;
    filterNodesRef.current = filters;
    analyserRef.current = analyser;
  }, []);

  const updateVisualizer = useCallback(() => {
    const analyser = analyserRef.current;

    if (!analyser || !isPlaying) {
      return;
    }

    const values = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(values);

    const bars = 28;
    const result: number[] = [];

    for (let i = 0; i < bars; i++) {
      const index = Math.floor((i / bars) * values.length);

      const value = values[index] ?? 0;

      result.push(Math.max(4, (value / 255) * 100));
    }

    setVisualizerData(result);

    animationFrameRef.current = requestAnimationFrame(updateVisualizer);
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setError("Unable to load this track.");
    };

    const handleEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        void audio.play();
        return;
      }

      if (shuffle && tracks.length > 1) {
        let nextIndex = currentIndex;

        while (nextIndex === currentIndex) {
          nextIndex = Math.floor(Math.random() * tracks.length);
        }

        setCurrentIndex(nextIndex);
        return;
      }

      if (currentIndex < tracks.length - 1) {
        setCurrentIndex((index) => index + 1);
        return;
      }

      if (repeatMode === "all") {
        setCurrentIndex(0);
        return;
      }

      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    audio.addEventListener("timeupdate", handleTimeUpdate);

    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);

      audio.removeEventListener("timeupdate", handleTimeUpdate);

      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, repeatMode, shuffle, tracks.length]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.src = currentTrack.src;
    audio.load();

    setCurrentTime(0);
    setDuration(0);
    setError("");
    setIsLoading(true);

    if (isPlaying) {
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentTrack.src]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const context = audioContextRef.current;

    if (!context || context.state === "closed") {
      return;
    }

    filterNodesRef.current.forEach((filter, index) => {
      filter.gain.value = eqValues[index] ?? 0;
    });
  }, [eqValues]);

  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, updateVisualizer]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (audioContextRef.current) {
        void audioContextRef.current.close();
      }
    };
  }, []);

  const play = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      setError("");

      setupAudioGraph();

      const context = audioContextRef.current;

      if (context?.state === "suspended") {
        await context.resume();
      }

      await audio.play();

      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setError("The browser blocked playback. Press play again.");
    }
  };

  const pause = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      void play();
    }
  };

  const changeTrack = (index: number) => {
    const shouldPlay = isPlaying;

    setCurrentIndex(index);

    if (!shouldPlay) {
      return;
    }

    requestAnimationFrame(() => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      void audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    });
  };

  const nextTrack = () => {
    if (shuffle && tracks.length > 1) {
      let nextIndex = currentIndex;

      while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * tracks.length);
      }

      setCurrentIndex(nextIndex);
      return;
    }

    setCurrentIndex((index) =>
      index >= tracks.length - 1
        ? repeatMode === "all"
          ? 0
          : index
        : index + 1,
    );
  };

  const previousTrack = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    setCurrentIndex((index) =>
      index <= 0 ? (repeatMode === "all" ? tracks.length - 1 : 0) : index - 1,
    );
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const value = Number(event.target.value);

    audio.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    setVolume(value);

    if (value > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((muted) => !muted);
  };

  const cycleRepeat = () => {
    setRepeatMode((mode) => {
      if (mode === "off") {
        return "all";
      }

      if (mode === "all") {
        return "one";
      }

      return "off";
    });
  };

  const applyPreset = (values: readonly number[]) => {
    setEqValues([...values]);

    filterNodesRef.current.forEach((filter, index) => {
      filter.gain.value = values[index] ?? 0;
    });
  };

  const updateEq = (index: number, value: number) => {
    setEqValues((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="mx-auto w-full max-w-5xl">
      <audio ref={audioRef} preload="metadata" />

      <div
        className="
          overflow-hidden
          rounded-[2rem]
          border border-white/10
          bg-black/30
          shadow-[0_30px_100px_rgba(0,0,0,0.35)]
          backdrop-blur-2xl
        "
      >
        <div className="grid lg:grid-cols-[1fr_320px]">
          {/* Main Player */}
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Top */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Now playing
                </p>

                <h1 className="mt-2 text-lg font-medium text-white/90">
                  Music
                </h1>
              </div>

              <button
                type="button"
                onClick={() => setShowPlaylist((value) => !value)}
                className="
                  flex size-10 items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/[0.04]
                  text-white/50
                  transition
                  hover:bg-white/[0.08]
                  hover:text-white
                  lg:hidden
                "
                aria-label="Toggle playlist"
              >
                <ChevronDown
                  size={18}
                  className={
                    showPlaylist
                      ? "rotate-180 transition-transform"
                      : "transition-transform"
                  }
                />
              </button>
            </div>

            {/* Artwork */}
            <div className="mx-auto w-full max-w-sm">
              <div
                className="
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-3xl
                  border border-white/10
                  bg-white/[0.03]
                  shadow-2xl
                "
              >
                {currentTrack.cover ? (
                  <Image
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 384px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-6xl text-white/10">
                    ♪
                  </div>
                )}

                <div className="absolute inset-0 bg-black/20" />

                {/* Visualizer */}
                <div
                  className="
                    absolute inset-x-8 bottom-7
                    flex h-12 items-end justify-center
                    gap-1
                  "
                  aria-hidden="true"
                >
                  {visualizerData.map((height, index) => (
                    <span
                      key={index}
                      className="
                        w-1.5
                        rounded-full
                        bg-white/70
                        transition-[height]
                        duration-75
                      "
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Track info */}
            <div className="mx-auto mt-8 max-w-sm">
              <h2 className="truncate text-xl font-semibold text-white">
                {currentTrack.title}
              </h2>

              <p className="mt-1 truncate text-sm text-white/40">
                {currentTrack.artist}
              </p>
            </div>

            {/* Progress */}
            <div className="mx-auto mt-8 max-w-sm">
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="
                  h-1 w-full
                  cursor-pointer
                  appearance-none
                  rounded-full
                  bg-white/10
                  accent-white
                "
                aria-label="Seek"
              />

              <div className="mt-2 flex justify-between text-[11px] text-white/30">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main controls */}
            <div className="mx-auto mt-7 flex max-w-sm items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => setShuffle((value) => !value)}
                className={`
                  flex size-9 items-center justify-center
                  rounded-full
                  transition
                  ${
                    shuffle ? "text-white" : "text-white/30 hover:text-white/70"
                  }
                `}
                aria-label="Shuffle"
                aria-pressed={shuffle}
              >
                <Shuffle size={17} />
              </button>

              <button
                type="button"
                onClick={previousTrack}
                className="
                  flex size-10 items-center justify-center
                  text-white/55
                  transition
                  hover:text-white
                "
                aria-label="Previous track"
              >
                <SkipBack size={21} fill="currentColor" />
              </button>

              <button
                type="button"
                onClick={togglePlay}
                disabled={isLoading && !isPlaying}
                className="
                  flex size-14 items-center justify-center
                  rounded-full
                  bg-white
                  text-black
                  shadow-[0_0_40px_rgba(255,255,255,0.12)]
                  transition
                  hover:scale-105
                  disabled:cursor-wait
                  disabled:opacity-60
                "
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={21} fill="currentColor" />
                ) : (
                  <Play size={21} fill="currentColor" />
                )}
              </button>

              <button
                type="button"
                onClick={nextTrack}
                className="
                  flex size-10 items-center justify-center
                  text-white/55
                  transition
                  hover:text-white
                "
                aria-label="Next track"
              >
                <SkipForward size={21} fill="currentColor" />
              </button>

              <button
                type="button"
                onClick={cycleRepeat}
                className="
                  relative
                  flex size-9 items-center justify-center
                  text-white/30
                  transition
                  hover:text-white/70
                "
                aria-label="Repeat"
              >
                {repeatMode === "one" ? (
                  <Repeat1 size={17} />
                ) : (
                  <Repeat size={17} />
                )}
              </button>
            </div>

            {/* Bottom controls */}
            <div className="mx-auto mt-8 flex max-w-sm items-center justify-between">
              {/* Volume */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="text-white/40 transition hover:text-white"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX size={17} />
                  ) : (
                    <Volume2 size={17} />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolume}
                  className="
                    hidden
                    w-20
                    cursor-pointer
                    accent-white
                    sm:block
                  "
                  aria-label="Volume"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={playbackRate}
                  onChange={(event) =>
                    setPlaybackRate(Number(event.target.value))
                  }
                  className="
                    appearance-none
                    rounded-full
                    border border-white/10
                    bg-white/[0.04]
                    px-3 py-1.5
                    text-xs
                    text-white/50
                    outline-none
                  "
                  aria-label="Playback speed"
                >
                  <option value="0.75" className="bg-neutral-900">
                    0.75x
                  </option>

                  <option value="1" className="bg-neutral-900">
                    1x
                  </option>

                  <option value="1.25" className="bg-neutral-900">
                    1.25x
                  </option>

                  <option value="1.5" className="bg-neutral-900">
                    1.5x
                  </option>

                  <option value="2" className="bg-neutral-900">
                    2x
                  </option>
                </select>

                <button
                  type="button"
                  onClick={() => setShowEqualizer((value) => !value)}
                  className={`
                    rounded-full
                    border border-white/10
                    px-3 py-1.5
                    text-xs
                    transition
                    ${
                      showEqualizer
                        ? "bg-white text-black"
                        : "bg-white/[0.04] text-white/50 hover:text-white"
                    }
                  `}
                >
                  EQ
                </button>

                <button
                  type="button"
                  className="
                    hidden
                    rounded-full
                    border border-white/10
                    bg-white/[0.04]
                    p-2
                    text-white/40
                    transition
                    hover:text-white
                    sm:flex
                  "
                  aria-label="Expand player"
                >
                  <Maximize2 size={15} />
                </button>
              </div>
            </div>

            {/* Equalizer */}
            {showEqualizer && (
              <div
                className="
                  mx-auto mt-8
                  max-w-sm
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  p-5
                "
              >
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/75">Equalizer</p>

                    <p className="mt-1 text-[11px] text-white/30">
                      Shape the sound your way
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => applyPreset(EQ_PRESETS.Flat)}
                    className="
                      text-xs
                      text-white/30
                      transition
                      hover:text-white/70
                    "
                  >
                    Reset
                  </button>
                </div>

                {/* Presets */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {Object.entries(EQ_PRESETS).map(([name, values]) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => applyPreset(values)}
                      className="
                          rounded-full
                          border border-white/10
                          bg-white/[0.04]
                          px-3 py-1.5
                          text-[11px]
                          text-white/45
                          transition
                          hover:bg-white/[0.08]
                          hover:text-white
                        "
                    >
                      {name}
                    </button>
                  ))}
                </div>

                {/* EQ sliders */}
                <div className="flex h-40 items-end justify-between gap-3">
                  {EQUALIZER_BANDS.map((band, index) => (
                    <div
                      key={band.frequency}
                      className="
                          flex h-full
                          flex-1
                          flex-col
                          items-center
                        "
                    >
                      <span className="mb-2 text-[10px] text-white/25">
                        {eqValues[index] > 0
                          ? `+${eqValues[index]}`
                          : eqValues[index]}
                      </span>

                      <input
                        type="range"
                        min="-12"
                        max="12"
                        step="1"
                        value={eqValues[index]}
                        onChange={(event) =>
                          updateEq(index, Number(event.target.value))
                        }
                        style={{
                          writingMode: "vertical-lr",
                          direction: "rtl",
                        }}
                        className="
                            h-28
                            w-1
                            cursor-pointer
                            accent-white
                          "
                        aria-label={`${band.frequency}Hz`}
                      />

                      <span className="mt-2 text-[10px] text-white/25">
                        {band.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <p className="mx-auto mt-5 max-w-sm text-center text-xs text-red-300/70">
                {error}
              </p>
            )}
          </div>

          {/* Playlist */}
          <aside
            className={`
              border-t border-white/10
              bg-white/[0.02]
              lg:border-l lg:border-t-0
              ${showPlaylist ? "block" : "hidden lg:block"}
            `}
          >
            <div className="p-6 sm:p-8 lg:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                    Playlist
                  </p>

                  <p className="mt-1 text-sm text-white/60">
                    {tracks.length} tracks
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPlaylist(false)}
                  className="
                    flex size-8 items-center justify-center
                    rounded-full
                    text-white/30
                    transition
                    hover:bg-white/[0.05]
                    hover:text-white
                    lg:hidden
                  "
                  aria-label="Close playlist"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              <div className="space-y-2">
                {tracks.map((track, index) => {
                  const active = index === currentIndex;

                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => changeTrack(index)}
                      className={`
                        group
                        flex w-full
                        items-center gap-3
                        rounded-2xl
                        p-3
                        text-left
                        transition
                        ${active ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"}
                      `}
                    >
                      <div
                        className="
                          relative
                          size-11
                          shrink-0
                          overflow-hidden
                          rounded-xl
                          bg-white/[0.05]
                        "
                      >
                        {track.cover ? (
                          <Image
                            src={track.cover}
                            alt=""
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-white/20">
                            ♪
                          </div>
                        )}

                        {active && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                            {isPlaying ? (
                              <div className="flex items-end gap-0.5">
                                <span className="h-3 w-0.5 animate-pulse rounded-full bg-white" />
                                <span className="h-5 w-0.5 animate-pulse rounded-full bg-white [animation-delay:120ms]" />
                                <span className="h-4 w-0.5 animate-pulse rounded-full bg-white [animation-delay:240ms]" />
                              </div>
                            ) : (
                              <Play
                                size={13}
                                fill="currentColor"
                                className="text-white"
                              />
                            )}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p
                          className={`
                            truncate text-sm
                            ${active ? "text-white" : "text-white/65"}
                          `}
                        >
                          {track.title}
                        </p>

                        <p className="mt-1 truncate text-[11px] text-white/25">
                          {track.artist}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
