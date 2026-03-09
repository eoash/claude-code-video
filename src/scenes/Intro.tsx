import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, MONO, SANS, CURSOR_BLINK } from "../theme";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: cursor blink (0~1s)
  const cursorOpacity = interpolate(
    frame % CURSOR_BLINK,
    [0, CURSOR_BLINK / 2, CURSOR_BLINK],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 2: "claude" typing (1~2.5s)
  const typeStart = 1 * fps;
  const typeText = "claude";
  const charFrames = 3;
  const typedChars = Math.min(
    typeText.length,
    Math.max(0, Math.floor((frame - typeStart) / charFrames))
  );
  const typed = typeText.slice(0, typedChars);

  // Phase 3: logo expand (3~5s)
  const logoStart = 3 * fps;
  const logoScale = interpolate(frame, [logoStart, logoStart + fps], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoOpacity = interpolate(
    frame,
    [logoStart, logoStart + 0.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 4: subtitle (5~7s)
  const subStart = 5 * fps;
  const subOpacity = interpolate(
    frame,
    [subStart, subStart + 0.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 5: fade out (7~8s)
  const fadeOutStart = 7 * fps;
  const fadeOut = interpolate(
    frame,
    [fadeOutStart, fadeOutStart + fps],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

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
      {/* Terminal prompt phase */}
      {frame < logoStart && (
        <div style={{ fontFamily: MONO, fontSize: 48, color: C.accent }}>
          <span style={{ color: C.dimText }}>{">"} </span>
          <span>{typed}</span>
          <span style={{ opacity: cursorOpacity }}>{"\u258C"}</span>
        </div>
      )}

      {/* Logo phase */}
      {frame >= logoStart && (
        <>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 72,
              fontWeight: 900,
              color: C.white,
              letterSpacing: "-0.02em",
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
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
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              opacity: subOpacity,
            }}
          >
            The AI-Native CLI — 2026
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
