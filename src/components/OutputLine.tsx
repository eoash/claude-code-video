import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, MONO } from "../theme";

type OutputLineProps = {
  text: string;
  startFrame: number;
  color?: string;
  icon?: string;
  fontSize?: number;
  indent?: number;
};

export const OutputLine: React.FC<OutputLineProps> = ({
  text,
  startFrame,
  color = C.grey,
  icon,
  fontSize = 28,
  indent = 0,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [startFrame, startFrame + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize,
        lineHeight: 1.7,
        color,
        opacity,
        paddingLeft: indent,
      }}
    >
      {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
      {text}
    </div>
  );
};
