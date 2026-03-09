import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadNotoSansKR } from "@remotion/google-fonts/NotoSansKR";

// Fonts
export const { fontFamily: MONO } = loadJetBrains("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

export const { fontFamily: SANS } = loadNotoSansKR("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

// Colors — EO Brand
export const C = {
  bg: "#0A0A0A",
  terminal: "#111111",
  terminalBar: "#1A1A1A",
  accent: "#00E87A",
  white: "#FFFFFF",
  grey: "#888888",
  greyDark: "#444444",
  dimText: "#666666",
  red: "#FF4444",
  blue: "#4A9EFF",
  yellow: "#FFD93D",
} as const;

// Timing (frames @ 30fps)
export const FPS = 30;
export const CHAR_FRAMES = 2;
export const CURSOR_BLINK = 16;
