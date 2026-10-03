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
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const formatted = useMemo(() => formatParts(now ?? new Date(2026, 9, 2, 21, 56, 52)), [now]);

  return (
    <GlassCard className="time-card">
      <h2 className="card-heading">
        <span aria-hidden="true">🕘</span>
        Local Time
      </h2>
      <p className="date-line">{formatted.date}</p>
      <time className="clock" dateTime={now?.toISOString()}>
        {formatted.time}
      </time>
    </GlassCard>
  );
}
