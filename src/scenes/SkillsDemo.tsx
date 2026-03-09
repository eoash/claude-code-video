import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { C, SANS } from "../theme";
import { Terminal } from "../components/Terminal";
import { TypingText } from "../components/TypingText";
import { OutputLine } from "../components/OutputLine";
import { Badge } from "../components/Badge";

const Caption: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = Math.min(1, frame / (0.5 * fps));

  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        width: "100%",
        textAlign: "center",
        fontFamily: SANS,
        fontSize: 32,
        color: C.white,
        opacity,
        letterSpacing: "0.05em",
      }}
    >
      {text}
    </div>
  );
};

export const SkillsDemo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Badge number="01" label="Skills" />

      <Sequence from={Math.round(0.5 * fps)} premountFor={fps}>
        <Terminal title="~/project — claude-code">
          {/* /commit typing */}
          <TypingText
            text="/commit"
            prefix="$ "
            startFrame={0}
            color={C.accent}
          />

          {/* Output lines */}
          <OutputLine
            text="Analyzing changes..."
            icon="🔍"
            startFrame={Math.round(2 * fps)}
            color={C.grey}
          />
          <OutputLine
            text="  M  src/api/auth.ts"
            startFrame={Math.round(3 * fps)}
            color={C.dimText}
            indent={16}
          />
          <OutputLine
            text="  M  src/utils/validate.ts"
            startFrame={Math.round(3.3 * fps)}
            color={C.dimText}
            indent={16}
          />
          <OutputLine
            text="Drafting commit message..."
            icon="📝"
            startFrame={Math.round(4.5 * fps)}
            color={C.grey}
          />
          <OutputLine
            text="✓ feat: add OAuth2 token refresh logic"
            startFrame={Math.round(6 * fps)}
            color={C.accent}
          />
          <OutputLine
            text="✓ Committed & pushed to origin/main"
            startFrame={Math.round(7.5 * fps)}
            color={C.accent}
          />
        </Terminal>
      </Sequence>

      {/* Bottom caption */}
      <Sequence from={Math.round(8.5 * fps)} layout="none" premountFor={fps}>
        <Caption text="한 줄 명령 → 분석 → 커밋 → 푸시 자동화" />
      </Sequence>
    </AbsoluteFill>
  );
};
