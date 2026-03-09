import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, SANS } from "../theme";

type BadgeProps = {
  number: string;
  label: string;
};

export const Badge: React.FC<BadgeProps> = ({ number, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const translateX = interpolate(frame, [0, 0.5 * fps], [-100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        left: 40,
        opacity,
        transform: `translateX(${translateX}px)`,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        style={{
          fontFamily: SANS,
          fontSize: 20,
          fontWeight: 700,
          color: C.accent,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {number}
      </span>
      <div style={{ width: 24, height: 1, background: C.accent }} />
      <span
        style={{
          fontFamily: SANS,
          fontSize: 20,
          fontWeight: 700,
          color: C.white,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
};
