import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, MONO } from "../theme";

type TerminalProps = {
  children: React.ReactNode;
  title?: string;
  width?: string | number;
  height?: string | number;
};

export const Terminal: React.FC<TerminalProps> = ({
  children,
  title = "claude-code — zsh",
  width = "80%",
  height = "65%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, 0.3 * fps], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width,
          height,
          background: C.terminal,
          borderRadius: 12,
          border: "1px solid #333",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transform: `scale(${scale})`,
          opacity,
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            height: 48,
            background: C.terminalBar,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 8,
            borderBottom: "1px solid #222",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#FF5F57",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#FEBC2E",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#28C840",
            }}
          />
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 13,
              color: C.dimText,
              fontFamily: MONO,
            }}
          >
            {title}
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            padding: "20px 24px",
            fontFamily: MONO,
            fontSize: 28,
            lineHeight: 1.8,
            color: C.white,
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};
