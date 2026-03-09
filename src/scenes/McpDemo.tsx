import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { C, MONO, SANS } from "../theme";
import { Terminal } from "../components/Terminal";
import { TypingText } from "../components/TypingText";
import { OutputLine } from "../components/OutputLine";
import { Badge } from "../components/Badge";

const ServiceIcon: React.FC<{
  name: string;
  emoji: string;
  color: string;
  startFrame: number;
  x: "left" | "right";
}> = ({ name, emoji, color, startFrame, x }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 0.3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const scale = interpolate(
    frame,
    [startFrame, startFrame + 0.3 * fps],
    [0.5, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        position: "absolute",
        [x]: 60,
        top: "50%",
        transform: `translateY(-50%) scale(${scale})`,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          boxShadow: `0 8px 24px ${color}66`,
        }}
      >
        {emoji}
      </div>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 20,
          color: C.white,
          fontWeight: 700,
        }}
      >
        {name}
      </span>
    </div>
  );
};

export const McpDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Badge number="03" label="MCP Integration" />

      <Sequence from={Math.round(0.5 * fps)} premountFor={fps}>
        <Terminal title="~/project — claude-code" width="62%">
          <TypingText
            text="오늘 회의 내용 Slack에 공유하고 Notion에 정리해"
            prefix="$ "
            startFrame={0}
            charFrames={2}
          />
          <OutputLine
            text="Connected: Slack, Notion"
            icon="🔌"
            startFrame={Math.round(4 * fps)}
            color={C.blue}
          />
          <OutputLine
            text="Sending to Slack #general..."
            icon="💬"
            startFrame={Math.round(5.5 * fps)}
            color={C.grey}
          />
          <OutputLine
            text="✓ Slack #general — 회의록 전송 완료"
            startFrame={Math.round(7 * fps)}
            color={C.accent}
          />
          <OutputLine
            text="Creating Notion page..."
            icon="📄"
            startFrame={Math.round(9 * fps)}
            color={C.grey}
          />
          <OutputLine
            text="✓ Notion — 회의록 페이지 생성 완료"
            startFrame={Math.round(11 * fps)}
            color={C.accent}
          />
        </Terminal>
      </Sequence>

      {/* Slack icon */}
      <ServiceIcon
        name="Slack"
        emoji="💬"
        color="#4A154B"
        startFrame={Math.round(6 * fps)}
        x="left"
      />

      {/* Notion icon */}
      <ServiceIcon
        name="Notion"
        emoji="📄"
        color="#191919"
        startFrame={Math.round(10 * fps)}
        x="right"
      />

      {/* Connection lines - left */}
      {frame >= 6.5 * fps && (
        <div
          style={{
            position: "absolute",
            left: 130,
            top: "50%",
            width: interpolate(
              frame,
              [6.5 * fps, 7 * fps],
              [0, 200],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            height: 2,
            background: `linear-gradient(to right, ${C.accent}00, ${C.accent})`,
            transform: "translateY(-50%)",
          }}
        />
      )}

      {/* Connection lines - right */}
      {frame >= 10.5 * fps && (
        <div
          style={{
            position: "absolute",
            right: 130,
            top: "50%",
            width: interpolate(
              frame,
              [10.5 * fps, 11 * fps],
              [0, 200],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            height: 2,
            background: `linear-gradient(to left, ${C.accent}00, ${C.accent})`,
            transform: "translateY(-50%)",
          }}
        />
      )}

      {/* Caption */}
      {frame >= 13 * fps && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            width: "100%",
            textAlign: "center",
            fontFamily: SANS,
            fontSize: 32,
            color: C.white,
            opacity: interpolate(
              frame,
              [13 * fps, 13.5 * fps],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          터미널 하나로 모든 도구를 연결
        </div>
      )}
    </AbsoluteFill>
  );
};
