export type Memory = {
  id: string;
  src: string;
  alt: string;
  title: string;
  date: string;
  note: string;
  tilt: string;
};

export const initialMemories: Memory[] = [
  {
    id: "highschool",
    src: "https://i.imgur.com/hqO639b.jpg",
    alt: "Highschool",
    title: "Highschool 📚",
    date: "2024.05.11",
    note: "“We studied 10%, laughed 90% 😆”",
    tilt: "-rotate-2",
  },
  {
    id: "picnic",
    src: "https://i.imgur.com/oYFOMiZ.jpg",
    alt: "Picnic",
    title: "Picnic 🍱",
    date: "2024.12.29",
    note: "“After this picture the real adventure began! 😂”",
    tilt: "rotate-2",
  },
  {
    id: "lastday",
    src: "https://i.imgur.com/ZDWM7yE.jpg",
    alt: "Last Day",
    title: "Last Day Before You Left 💙",
    date: "2025.10.09",
    note: "“This isn’t goodbye — it’s see you later 🤍”",
    tilt: "-rotate-1",
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
  bg: string;
  blob1: string;
  blob2: string;
  accent: string;
  accentSoft: string;
};

export const moods: Mood[] = [
  {
    name: "Blush",
    bg: "#fffafc",
    blob1: "#ffd5ec",
    blob2: "#c3f0ff",
    accent: "#ff87bd",
    accentSoft: "#ffe4f2",
  },
  {
    name: "Sky",
    bg: "#eef9ff",
    blob1: "#c3f0ff",
    blob2: "#dcd9ff",
    accent: "#5cb8f0",
    accentSoft: "#dff3ff",
  },
  {
    name: "Peach",
    bg: "#fff6ec",
    blob1: "#ffe0c2",
    blob2: "#ffd7ec",
    accent: "#ff9e6b",
    accentSoft: "#ffe9db",
  },
  {
    name: "Mint",
    bg: "#f1fff5",
    blob1: "#c9f7dd",
    blob2: "#d6f4ff",
    accent: "#4ecb92",
    accentSoft: "#def8ec",
  },
  {
    name: "Lilac",
    bg: "#f8f1ff",
    blob1: "#e6d4ff",
    blob2: "#ffd9f4",
    accent: "#a97bf0",
    accentSoft: "#efe2ff",
  },
];
