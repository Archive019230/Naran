import { moods } from "@/lib/data";

export const THEME_KEY = "naran-theme";

export function moodVars(mood: (typeof moods)[number]): Record<string, string> {
  return {
    "--mood-bg": mood.bg,
    "--mood-blob-1": mood.blob1,
    "--mood-blob-2": mood.blob2,
    "--mood-accent": mood.accent,
    "--mood-accent-soft": mood.accentSoft,
    "--mood-surface": mood.surface,
    "--mood-ink": mood.ink,
    "--mood-ink-strong": mood.inkStrong,
    "--mood-ink-muted": mood.inkMuted,
    "--mood-line": mood.line,
  };
}

export function applyMood(index: number) {
  const i = ((index % moods.length) + moods.length) % moods.length;
  const mood = moods[i];
  const root = document.documentElement;
  const vars = moodVars(mood);

  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
  root.dataset.mood = String(i);
  root.style.colorScheme = mood.dark ? "dark" : "light";

  try {
    window.localStorage.setItem(
      THEME_KEY,
      JSON.stringify({ index: i, vars, dark: mood.dark }),
    );
  } catch {
    /* private mode */
  }

  return mood;
}

export const currentMoodIndex = () =>
  Number(document.documentElement.dataset.mood || 0);

export const THEME_INIT_SCRIPT = `(function(){try{
var s=window.localStorage.getItem(${JSON.stringify(THEME_KEY)});
if(!s)return;var t=JSON.parse(s);if(!t||!t.vars)return;
var r=document.documentElement.style;
for(var k in t.vars){r.setProperty(k,t.vars[k]);}
if(t.index!=null){document.documentElement.dataset.mood=String(t.index);}
r.colorScheme=t.dark?"dark":"light";
}catch(e){}})();`;
