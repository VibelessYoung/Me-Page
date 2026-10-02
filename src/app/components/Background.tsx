"use client";

import { CSSProperties } from "react";

// Switch between a flat color and an image without changing the layout.
// Example image mode: { type: "image", value: "/background.jpg" }
const background = {
  type: "color" as "color" | "image",
  value: "#0f0f0f",
};

export default function Background() {
  const style: CSSProperties =
    background.type === "image"
      ? {
          backgroundImage: `linear-gradient(rgba(10,10,10,.45), rgba(10,10,10,.45)), url(${background.value})`,
        }
      : {
          backgroundColor: background.value,
        };

  return <div aria-hidden="true" className="background-layer" style={style} />;
}
