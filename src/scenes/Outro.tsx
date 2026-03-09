import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, SANS, MONO } from "../theme";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(frame, [0, 0.5 * fps], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subOpacity = interpolate(frame, [fps, 1.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoOpacity = interpolate(frame, [2 * fps, 2.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [5 * fps, 6 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          fontFamily: SANS,
          fontSize: 80,
          fontWeight: 900,
          color: C.white,
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        Claude Code
      </div>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 24,
          color: C.accent,
          marginTop: 16,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: subOpacity,
        }}
      >
        The AI-Native CLI
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 14,
          color: C.dimText,
          marginTop: 48,
          opacity: logoOpacity,
        }}
      >
        EO Studio · Built with Remotion
      </div>
    </AbsoluteFill>
  );
};
