import React from "react";
import { Composition, Folder } from "remotion";
import { FPS } from "./theme";
import { MediumVideo } from "./MediumVideo";
import { ShortVideo } from "./ShortVideo";
import { Intro } from "./scenes/Intro";
import { SkillsDemo } from "./scenes/SkillsDemo";
import { MultiAgentDemo } from "./scenes/MultiAgentDemo";
import { McpDemo } from "./scenes/McpDemo";
import { Outro } from "./scenes/Outro";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Claude-Code-2026">
      {/* Full videos */}
      <Composition
        id="ClaudeCodeMedium"
        component={MediumVideo}
        durationInFrames={65 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="ClaudeCodeShort"
        component={ShortVideo}
        durationInFrames={35 * FPS}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* Individual scenes for preview */}
      <Folder name="Scenes">
        <Composition
          id="Intro"
          component={Intro}
          durationInFrames={8 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="SkillsDemo"
          component={SkillsDemo}
          durationInFrames={12 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="MultiAgentDemo"
          component={MultiAgentDemo}
          durationInFrames={22 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="McpDemo"
          component={McpDemo}
          durationInFrames={16 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Outro"
          component={Outro}
          durationInFrames={7 * FPS}
          fps={FPS}
          width={1920}
          height={1080}
        />
      </Folder>
    </Folder>
  );
};
