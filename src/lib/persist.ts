import type { Chat, Post } from "./data";

/** Demo-only local persistence (this device's browser storage). Not a backend, not synced, not secure. */
export const STORAGE_KEY = "samirareel.demo.v1";

export type DemoState = {
  lang: "hi" | "en";
  authed: boolean;
  phone: string;
  posts: Post[];
  chats: Chat[];
  privacy: Record<string, boolean>;
  liked: string[];
  saved: string[];
  following: string[];
  blocked: string[];
};

const isArr = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((x) => typeof x === "string");

export function parseDemo(raw: string | null): DemoState | null {
  if (!raw) return null;
  try {
    const d = JSON.parse(raw) as Partial<DemoState>;
    if ((d.lang !== "hi" && d.lang !== "en") || !Array.isArray(d.posts) || !Array.isArray(d.chats))
      return null;
    if (![d.liked, d.saved, d.following, d.blocked].every(isArr)) return null;
    return {
      lang: d.lang,
      authed: d.authed === true,
      phone: typeof d.phone === "string" ? d.phone : "",
      posts: d.posts,
      chats: d.chats,
      privacy: d.privacy ?? {},
      liked: d.liked!,
      saved: d.saved!,
      following: d.following!,
      blocked: d.blocked!,
    };
  } catch {
    return null;
  }
}

export function loadDemo(): DemoState | null {
  try {
    return parseDemo(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function saveDemo(d: DemoState): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
    return true;
  } catch {
    return false;
  }
}

export function clearDemo() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** Shrinks an uploaded image to a small JPEG data URL so it survives refresh in browser storage. */
export function fileToStoredImage(file: File, max = 720): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.75));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("not an image"));
    };
    img.src = url;
  });
}
