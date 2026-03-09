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

const AGENTS = [
  { name: "Agent 1", file: "auth.ts", speed: 0.9 },
  { name: "Agent 2", file: "validate.ts", speed: 1.0 },
  { name: "Agent 3", file: "api-client.ts", speed: 0.75 },
];

const ProgressBar: React.FC<{
  progress: number;
  label: string;
  file: string;
  done: boolean;
}> = ({ progress, label, file, done }) => (
  <div style={{ padding: "16px 20px" }}>
    <div
      style={{
        fontFamily: MONO,
        fontSize: 22,
        color: C.accent,
        marginBottom: 8,
      }}
    >
      {label} → {file}
    </div>
    <div
      style={{
        height: 6,
        background: "#222",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${Math.min(100, progress)}%`,
          height: "100%",
          background: done ? C.accent : C.blue,
          borderRadius: 3,
        }}
      />
    </div>
    {done && (
      <div
        style={{
          fontFamily: MONO,
          fontSize: 20,
          color: C.accent,
          marginTop: 6,
        }}
      >
        ✓ Complete
      </div>
    )}
  </div>
);

export const MultiAgentDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase timings
  const splitStart = 5 * fps;
  const splitEnd = 16 * fps;
  const mergeStart = 17 * fps;

  const splitOpacity = interpolate(
    frame,
    [splitStart, splitStart + 0.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const mergeOpacity = interpolate(
    frame,
    [mergeStart, mergeStart + 0.3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const isSplit = frame >= splitStart && frame < mergeStart;

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Badge number="02" label="Multi-Agent" />

      {/* Phase 1: Command input */}
      {frame < splitStart && (
        <Sequence from={Math.round(0.5 * fps)} premountFor={fps}>
          <Terminal title="~/project — claude-code">
            <TypingText
              text="이 3개 파일 동시에 리팩터링해줘"
              prefix="$ "
              startFrame={0}
              charFrames={2}
            />
            <OutputLine
              text="Spawning 3 agents..."
              icon="⚡"
              startFrame={Math.round(3 * fps)}
              color={C.yellow}
            />
          </Terminal>
        </Sequence>
      )}

      {/* Phase 2: 3-way split */}
      {isSplit && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 50px",
            gap: 16,
            opacity: splitOpacity,
          }}
        >
          {AGENTS.map((agent, i) => {
            const agentFrame = frame - splitStart;
            const progress = Math.min(
              100,
              (agentFrame / (9 * fps)) * 100 * agent.speed
            );
            const done = progress >= 100;

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: C.terminal,
                  border: `1px solid ${done ? C.accent : "#333"}`,
                  borderRadius: 10,
                  height: "55%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  boxShadow: done
                    ? `0 0 20px ${C.accent}33`
                    : "0 10px 30px rgba(0,0,0,0.4)",
                }}
              >
                <ProgressBar
                  progress={progress}
                  label={agent.name}
                  file={agent.file}
                  done={done}
                />
              </div>
            );
          })}
        </AbsoluteFill>
      )}

      {/* Phase 3: Merged result */}
      {frame >= mergeStart && (
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: mergeOpacity,
          }}
        >
          <Terminal title="~/project — claude-code">
            <OutputLine
              text="✓ 3 files refactored in 12s"
              startFrame={0}
              color={C.accent}
              fontSize={22}
            />
          </Terminal>
        </AbsoluteFill>
      )}

      {/* Caption */}
      {frame >= 18 * fps && (
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
              [18 * fps, 18.5 * fps],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          병렬 실행 — 3배 빠른 작업
        </div>
      )}
    </AbsoluteFill>
  );
};
