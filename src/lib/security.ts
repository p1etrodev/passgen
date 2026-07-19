import type { SecurityLevel } from "../hooks/useGeneratePassword";

export const securityLabels: Record<SecurityLevel, string> = {
  weak: "Weak",
  average: "Average",
  strong: "Strong",
  "very-strong": "Very strong",
};

export type SecurityStyle = {
  gradient: string;
  bg: string;
  text: string;
  border: string;
  accent: string;
  accentChecked: string;
  accentColor: string;
};

export const securityStyles: Record<SecurityLevel | "neutral", SecurityStyle> = {
  weak: {
    gradient: "bg-radial-[at_50%_120%] from-red-500/25 to-black",
    bg: "bg-red-500/10",
    text: "text-red-500",
    border: "border-red-500/40",
    accent: "bg-red-500",
    accentChecked: "has-checked:text-white has-checked:bg-red-500 has-checked:border-red-500",
    accentColor: "accent-red-500",
  },
  average: {
    gradient: "bg-radial-[at_50%_120%] from-amber-500/25 to-black",
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    border: "border-amber-500/40",
    accent: "bg-amber-500",
    accentChecked: "has-checked:text-white has-checked:bg-amber-500 has-checked:border-amber-500",
    accentColor: "accent-amber-500",
  },
  strong: {
    gradient: "bg-radial-[at_50%_120%] from-green-500/25 to-black",
    bg: "bg-green-500/10",
    text: "text-green-500",
    border: "border-green-500/40",
    accent: "bg-green-500",
    accentChecked: "has-checked:text-white has-checked:bg-green-500 has-checked:border-green-500",
    accentColor: "accent-green-500",
  },
  "very-strong": {
    gradient: "bg-radial-[at_50%_120%] from-emerald-500/25 to-black",
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500/40",
    accent: "bg-emerald-500",
    accentChecked:
      "has-checked:text-white has-checked:bg-emerald-500 has-checked:border-emerald-500",
    accentColor: "accent-emerald-500",
  },
  neutral: {
    gradient: "bg-radial-[at_50%_120%] from-zinc-500/25 to-black",
    bg: "bg-zinc-500/10",
    text: "text-zinc-500",
    border: "border-zinc-500/40",
    accent: "bg-zinc-500",
    accentChecked: "has-checked:text-white has-checked:bg-zinc-500 has-checked:border-zinc-500",
    accentColor: "accent-zinc-500",
  },
};
