"use client";

import { useEffect, useMemo, useState } from "react";

import GlassCard from "./GlassCard";

function formatParts(date: Date) {
  return {
    date: new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date),

    time: new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date),
  };
}

export default function LocalTimeCard() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => {
      setNow(new Date());
    };

    tick();

    const id = window.setInterval(tick, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, []);

  const formatted = useMemo(() => {
    if (!now) {
      return {
        date: "Loading...",
        time: "--:--:--",
      };
    }

    return formatParts(now);
  }, [now]);

  return (
    <GlassCard className="min-h-[145px] px-[18px] py-[18px] lg:min-h-0">
      <h2
        className="
          m-0
          flex
          items-center
          gap-2.5
          text-lg
          font-bold
          leading-none
          tracking-[-0.028em]
        "
      >
        <span aria-hidden="true">🕘</span>
        Local Time
      </h2>

      <p
        className="
          mt-5
          mb-0
          text-center
          text-base
          font-semibold
          tracking-[-0.02em]
          text-[#a7a7aa]
        "
      >
        {formatted.date}
      </p>

      <time
        dateTime={now?.toISOString()}
        className="
          mt-2
          block
          text-center
          text-[31px]
          font-medium
          leading-none
          tracking-[-0.025em]
          text-[#f7f7f8]
          tabular-nums
          max-[520px]:text-[27px]
        "
      >
        {formatted.time}
      </time>
    </GlassCard>
  );
}
