import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  random,
} from "remotion";
import { C } from "../theme";

export const GlitchTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const totalFrames = Math.round(0.5 * fps);

  const progress = interpolate(frame, [0, totalFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Intensity peaks in the middle
  const intensity = Math.sin(progress * Math.PI);

  // RGB shift
  const shiftX = intensity * 20;

  // Noise bars
  const bars = Array.from({ length: 8 }, (_, i) => {
    const y = random(`bar-${frame}-${i}`) * height;
    const h = random(`barh-${frame}-${i}`) * 10 + 2;
    const x = random(`barx-${frame}-${i}`) * width * 0.3;
    return { y, h, x };
  });

  return (
    <AbsoluteFill>
      {/* Red channel shift */}
      <AbsoluteFill
        style={{
          backgroundColor: "rgba(255,0,0,0.08)",
          transform: `translateX(${shiftX}px)`,
          mixBlendMode: "screen",
        }}
      />
      {/* Cyan channel shift */}
      <AbsoluteFill
        style={{
          backgroundColor: "rgba(0,255,200,0.06)",
          transform: `translateX(${-shiftX}px)`,
          mixBlendMode: "screen",
        }}
      />
      {/* Noise bars */}
      {bars.map((bar, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: bar.y,
            left: bar.x,
            width: width - bar.x * 2,
            height: bar.h,
            background: `rgba(255,255,255,${intensity * 0.15})`,
          }}
        />
      ))}
      {/* Flash */}
      <AbsoluteFill
        style={{
          backgroundColor: C.accent,
          opacity: intensity > 0.9 ? 0.15 : 0,
        }}
      />
    </AbsoluteFill>
  );
};
