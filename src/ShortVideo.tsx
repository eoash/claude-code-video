import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { C, FPS } from "./theme";
import { Intro } from "./scenes/Intro";
import { SkillsDemo } from "./scenes/SkillsDemo";
import { MultiAgentDemo } from "./scenes/MultiAgentDemo";
import { McpDemo } from "./scenes/McpDemo";
import { Outro } from "./scenes/Outro";
import { GlitchTransition } from "./components/GlitchTransition";

const GLITCH = Math.round(0.3 * FPS); // 9 frames (faster transitions)

export const ShortVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <TransitionSeries>
        {/* Intro: 4s */}
        <TransitionSeries.Sequence durationInFrames={4 * FPS}>
          <Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Overlay durationInFrames={GLITCH}>
          <GlitchTransition />
        </TransitionSeries.Overlay>

        {/* Skills: 8s */}
        <TransitionSeries.Sequence durationInFrames={8 * FPS}>
          <SkillsDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Overlay durationInFrames={GLITCH}>
          <GlitchTransition />
        </TransitionSeries.Overlay>

        {/* Multi-Agent: 10s */}
        <TransitionSeries.Sequence durationInFrames={10 * FPS}>
          <MultiAgentDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Overlay durationInFrames={GLITCH}>
          <GlitchTransition />
        </TransitionSeries.Overlay>

        {/* MCP: 8s */}
        <TransitionSeries.Sequence durationInFrames={8 * FPS}>
          <McpDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Overlay durationInFrames={GLITCH}>
          <GlitchTransition />
        </TransitionSeries.Overlay>

        {/* Outro: 5s */}
        <TransitionSeries.Sequence durationInFrames={5 * FPS}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
