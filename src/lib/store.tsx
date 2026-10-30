import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { loadDemo, saveDemo, clearDemo } from "./persist";
import { CHATS, POSTS, type Chat, type Post } from "./data";

export type Lang = "hi" | "en";
const DICT = {
  home: ["होम", "Home"],
  reels: ["रील्स", "Reels"],
  create: ["बनाएँ", "Create"],
  explore: ["खोजें", "Explore"],
  profile: ["प्रोफ़ाइल", "Profile"],
  follow: ["फ़ॉलो", "Follow"],
  following: ["फ़ॉलो कर रहे", "Following"],
  search: ["खोजें…", "Search…"],
  comment: ["कमेंट लिखें…", "Add a comment…"],
  post: ["पोस्ट", "Post"],
  messages: ["संदेश", "Messages"],
  notifications: ["सूचनाएँ", "Notifications"],
  settings: ["सेटिंग्स", "Settings"],
  aiHelp: ["AI सहायता", "AI Help"],
  creator: ["क्रिएटर डैशबोर्ड", "Creator Dashboard"],
  login: ["लॉगिन", "Log in"],
  logout: ["लॉग आउट", "Log out"],
  saved: ["सेव किया", "Saved"],
  posts: ["पोस्ट्स", "Posts"],
  followers: ["फ़ॉलोअर्स", "Followers"],
  send: ["भेजें", "Send"],
  free: [
    "ब्राउज़िंग, रील्स, चैट और कॉल हमेशा मुफ़्त — कोई ज़बरदस्ती विज्ञापन नहीं।",
    "Browsing, reels, chats & calls are always free — no forced ads.",
  ],
} as const;
export type Key = keyof typeof DICT;

type State = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
  authed: boolean;
  setAuthed: (b: boolean) => void;
  phone: string;
  setPhone: (s: string) => void;
  posts: Post[];
  addPost: (p: Post) => void;
  addComment: (postId: string, text: string) => void;
  liked: Set<string>;
  toggleLike: (id: string) => void;
  saved: Set<string>;
  toggleSave: (id: string) => void;
  following: Set<string>;
  toggleFollow: (id: string) => void;
  blocked: Set<string>;
  toggleBlock: (id: string) => void;
  privacy: Record<string, boolean>;
  setPrivacy: (k: string, v: boolean) => void;
  chats: Chat[];
  sendMessage: (chatId: string, text: string) => void;
  toast: string | null;
  notify: (s: string) => void;
  resetDemo: () => void;
};
const Ctx = createContext<State | null>(null);

function useSet(init: string[] = []) {
  const [s, set] = useState(new Set(init));
  const toggle = (id: string) =>
    set((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  return [s, toggle, set] as const;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("hi");
  const [authed, setAuthed] = useState(false);
  const [phone, setPhone] = useState("");
  const [posts, setPosts] = useState(POSTS);
  const [liked, toggleLike, setLiked] = useSet();
  const [saved, toggleSave, setSaved] = useSet();
  const [following, toggleFollow, setFollowing] = useSet(["u1", "u3"]);
  const [blocked, toggleBlock, setBlocked] = useSet();
  const [privacy, setP] = useState<Record<string, boolean>>({
    privateAccount: false,
    hideLikes: false,
    limitComments: true,
    filterWords: true,
    dmFromFollowers: true,
    activityStatus: true,
  });
  const [chats, setChats] = useState(CHATS);
  const [toast, setToast] = useState<string | null>(null);
  const loaded = useRef(false);
  // Load saved demo state after hydration (browser storage only, never during SSR).
  useEffect(() => {
    const d = loadDemo();
    if (d) {
      setLang(d.lang);
      setAuthed(d.authed);
      setPhone(d.phone);
      setPosts(d.posts);
      setChats(d.chats);
      setP(d.privacy);
      setLiked(new Set(d.liked));
      setSaved(new Set(d.saved));
      setFollowing(new Set(d.following));
      setBlocked(new Set(d.blocked));
    }
    loaded.current = true;
  }, [setLiked, setSaved, setFollowing, setBlocked]);
  useEffect(() => {
    if (!loaded.current) return;
    const ok = saveDemo({
      lang,
      authed,
      phone,
      posts,
      chats,
      privacy,
      liked: [...liked],
      saved: [...saved],
      following: [...following],
      blocked: [...blocked],
    });
    if (!ok) setToast("फ़ोन की स्टोरेज भर गई — कुछ बदलाव सेव नहीं हुए");
  }, [lang, authed, phone, posts, chats, privacy, liked, saved, following, blocked]);
  const resetDemo = () => {
    clearDemo();
    location.reload();
  };
  const notify = (s: string) => {
    setToast(s);
    setTimeout(() => setToast(null), 2200);
  };

  const value: State = {
    lang,
    setLang,
    t: (k) => DICT[k][lang === "hi" ? 0 : 1],
    authed,
    setAuthed,
    phone,
    setPhone,
    posts,
    addPost: (p) => setPosts((x) => [p, ...x]),
    addComment: (postId, text) =>
      setPosts((x) =>
        x.map((p) =>
          p.id === postId
            ? { ...p, comments: [...p.comments, { id: crypto.randomUUID(), userId: "me", text }] }
            : p,
        ),
      ),
    liked,
    toggleLike,
    saved,
    toggleSave,
    following,
    toggleFollow,
    blocked,
    toggleBlock,
    privacy,
    setPrivacy: (k, v) => setP((p) => ({ ...p, [k]: v })),
    chats,
    sendMessage: (chatId, text) => {
      const now = new Date().toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit" });
      setChats((c) =>
        c.map((ch) =>
          ch.id === chatId
            ? { ...ch, messages: [...ch.messages, { from: "me", text, time: now }] }
            : ch,
        ),
      );
      setTimeout(
        () =>
          setChats((c) =>
            c.map((ch) =>
              ch.id === chatId
                ? {
                    ...ch,
                    messages: [
                      ...ch.messages,
                      {
                        from: (ch.group ? ch.members?.[0] : undefined) ?? "u1",
                        text: "😊 (डेमो ऑटो-रिप्लाई)",
                        time: now,
                      },
                    ],
                  }
                : ch,
            ),
          ),
        1200,
      );
    },
    toast,
    notify,
    resetDemo,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("no store");
  return c;
};
