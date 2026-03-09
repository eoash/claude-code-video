import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, MONO, CHAR_FRAMES, CURSOR_BLINK } from "../theme";

type TypingTextProps = {
  text: string;
  startFrame?: number;
  charFrames?: number;
  color?: string;
  prefix?: string;
  showCursor?: boolean;
  fontSize?: number;
};

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  startFrame = 0,
  charFrames = CHAR_FRAMES,
  color = C.white,
  prefix = "",
  showCursor = true,
  fontSize = 28,
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - startFrame);

  const typedChars = Math.min(
    text.length,
    Math.floor(localFrame / charFrames)
  );
  const typedText = text.slice(0, typedChars);
  const isTyping = typedChars < text.length;

  const cursorOpacity = isTyping
    ? 1
    : interpolate(
        frame % CURSOR_BLINK,
        [0, CURSOR_BLINK / 2, CURSOR_BLINK],
        [1, 0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );

  if (frame < startFrame) return null;

  return (
    <div style={{ fontFamily: MONO, fontSize, lineHeight: 1.7 }}>
      {prefix && <span style={{ color: C.accent }}>{prefix}</span>}
      <span style={{ color }}>{typedText}</span>
      {showCursor && (
        <span style={{ color: C.accent, opacity: cursorOpacity }}>
          {"\u258C"}
        </span>
      )}
    </div>
  );
};
