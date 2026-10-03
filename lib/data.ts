export type Memory = {
  id: string;
  src: string;
  alt: string;
  title: string;
  date: string;
  note: string;
  tilt?: string;
};

export const initialMemories: Memory[] = [
  {
    id: "highschool",
    src: "https://i.imgur.com/hqO639b.jpg",
    alt: "Highschool",
    title: "Highschool 📚",
    date: "2024.05.11",
    note: "“We studied 10%, laughed 90% 😆”",
  },
  {
    id: "picnic",
    src: "https://i.imgur.com/oYFOMiZ.jpg",
    alt: "Picnic",
    title: "Picnic 🍱",
    date: "2024.12.29",
    note: "“After this picture the real adventure began! 😂”",
  },
  {
    id: "lastday",
    src: "https://i.imgur.com/ZDWM7yE.jpg",
    alt: "Last Day",
    title: "Last Day Before You Left 💙",
    date: "2025.10.09",
    note: "“This isn’t goodbye — it’s see you later 🤍”",
  },
];

export const bucketItems = [
  { id: "talk", label: "Late night talk 🍻" },
  { id: "karaoke", label: "Karaoke night 🎤" },
  { id: "memories", label: "More new memories 💞" },
  { id: "snacks", label: "Snack exchange from Poland 🇵🇱🍪" },
];

export const funnyReplies = [
  "We miss you too 😭 — come back or send snacks!",
  "Aww 🥺 stop making us emotional!",
  "Even Poland can’t handle your chaos 😆",
  "No distance can defeat our friendship 💪💙",
  "We’re virtually hugging you rn 🤗",
];

export const compliments = [
  "You’re literally the main character 💅",
  "Poland’s lucky to have you 🇵🇱✨",
  "Your Mongolian glow is unstoppable 💫",
  "Study hard, but also slay harder 😎",
  "You’re one assignment away from global domination 🌍",
];

export type Mood = {
  name: string;
  emoji: string;
  dark: boolean;
  bg: string;
  blob1: string;
  blob2: string;
  accent: string;
  accentSoft: string;
  surface: string;
  ink: string;
  inkStrong: string;
  inkMuted: string;
  line: string;
};

const light: Pick<
  Mood,
  "surface" | "ink" | "inkStrong" | "inkMuted" | "dark"
> = {
  dark: false,
  surface: "#ffffff",
  ink: "#43404b",
  inkStrong: "#2c2933",
  inkMuted: "#6f6b7a",
};

export const moods: Mood[] = [
  {
    ...light,
    name: "Blush",
    emoji: "🌸",
    bg: "#fffafc",
    blob1: "#ffd5ec",
    blob2: "#c3f0ff",
    accent: "#ff87bd",
    accentSoft: "#ffe4f2",
    line: "#f3e6ee",
  },
  {
    ...light,
    name: "Sky",
    emoji: "🌤️",
    bg: "#eef9ff",
    blob1: "#c3f0ff",
    blob2: "#dcd9ff",
    accent: "#3aa8e8",
    accentSoft: "#dff3ff",
    line: "#dcedf7",
  },
  {
    ...light,
    name: "Peach",
    emoji: "🍑",
    bg: "#fff6ec",
    blob1: "#ffe0c2",
    blob2: "#ffd7ec",
    accent: "#f58b4c",
    accentSoft: "#ffe9db",
    line: "#f6e6d8",
  },
  {
    ...light,
    name: "Mint",
    emoji: "🌿",
    bg: "#f1fff5",
    blob1: "#c9f7dd",
    blob2: "#d6f4ff",
    accent: "#2fae78",
    accentSoft: "#def8ec",
    line: "#ddf2e6",
  },
  {
    ...light,
    name: "Lilac",
    emoji: "💜",
    bg: "#f8f1ff",
    blob1: "#e6d4ff",
    blob2: "#ffd9f4",
    accent: "#9b6ae8",
    accentSoft: "#efe2ff",
    line: "#ebe0f7",
  },
  {
    ...light,
    name: "Poland",
    emoji: "🇵🇱",
    bg: "#fff5f6",
    blob1: "#ff8fa3",
    blob2: "#f0f0f0",
    accent: "#dc143c",
    accentSoft: "#ffe1e6",
    surface: "#ffffff",
    line: "#ffd9de",
  },
  {
    ...light,
    name: "Ulaanbaatar",
    emoji: "🇲🇳",
    bg: "#fff7f1",
    blob1: "#ff7a7a",
    blob2: "#5c8dff",
    accent: "#c4272b",
    accentSoft: "#ffe3e0",
    line: "#f3e2d8",
  },
  {
    name: "Midnight",
    emoji: "🌙",
    dark: true,
    bg: "#101018",
    blob1: "#5b3f8f",
    blob2: "#1f4b6b",
    accent: "#ff87bd",
    accentSoft: "#2c2136",
    surface: "#1a1a24",
    ink: "#c7c4d4",
    inkStrong: "#f4f2fa",
    inkMuted: "#8d89a0",
    line: "#2e2e3c",
  },
];
