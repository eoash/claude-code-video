import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import { C, FPS } from "./theme";
import { Intro } from "./scenes/Intro";
import { SkillsDemo } from "./scenes/SkillsDemo";
import { MultiAgentDemo } from "./scenes/MultiAgentDemo";
import { McpDemo } from "./scenes/McpDemo";
import { Outro } from "./scenes/Outro";
import { GlitchTransition } from "./components/GlitchTransition";

const GLITCH = Math.round(0.5 * FPS); // 15 frames

// Scene start frames (cumulative, overlays don't affect duration)
const INTRO_START = 0;
const SKILLS_START = 8 * FPS;
const MULTI_START = (8 + 12) * FPS;
const MCP_START = (8 + 12 + 22) * FPS;
const OUTRO_START = (8 + 12 + 22 + 16) * FPS;

export const MediumVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <TransitionSeries>
        {/* Intro: 8s */}
        <TransitionSeries.Sequence durationInFrames={8 * FPS}>
          <Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Overlay durationInFrames={GLITCH}>
          <GlitchTransition />
        </TransitionSeries.Overlay>

        {/* Skills Demo: 12s */}
        <TransitionSeries.Sequence durationInFrames={12 * FPS}>
          <SkillsDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Overlay durationInFrames={GLITCH}>
          <GlitchTransition />
        </TransitionSeries.Overlay>

        {/* Multi-Agent Demo: 22s */}
        <TransitionSeries.Sequence durationInFrames={22 * FPS}>
          <MultiAgentDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Overlay durationInFrames={GLITCH}>
          <GlitchTransition />
        </TransitionSeries.Overlay>

        {/* MCP Demo: 16s */}
        <TransitionSeries.Sequence durationInFrames={16 * FPS}>
          <McpDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Overlay durationInFrames={GLITCH}>
          <GlitchTransition />
        </TransitionSeries.Overlay>

        {/* Outro: 7s */}
        <TransitionSeries.Sequence durationInFrames={7 * FPS}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Voiceover layer */}
      <Sequence from={Math.round(1 * FPS)} layout="none">
        <Audio src={staticFile("voiceover/intro.mp3")} volume={0.9} />
      </Sequence>
      <Sequence from={SKILLS_START + Math.round(1 * FPS)} layout="none">
        <Audio src={staticFile("voiceover/skills.mp3")} volume={0.9} />
      </Sequence>
      <Sequence from={MULTI_START + Math.round(1 * FPS)} layout="none">
        <Audio src={staticFile("voiceover/multiagent.mp3")} volume={0.9} />
      </Sequence>
      <Sequence from={MCP_START + Math.round(1 * FPS)} layout="none">
        <Audio src={staticFile("voiceover/mcp.mp3")} volume={0.9} />
      </Sequence>
      <Sequence from={OUTRO_START + Math.round(0.5 * FPS)} layout="none">
        <Audio src={staticFile("voiceover/outro.mp3")} volume={0.9} />
      </Sequence>
    </AbsoluteFill>
  );
};
