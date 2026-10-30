export type User = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  followers: number;
  verified?: boolean;
};
export type Comment = { id: string; userId: string; text: string };
export type Post = {
  id: string;
  userId: string;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  location?: string;
  kind: "photo" | "reel";
  time: string;
};

const av = (n: number) => `https://i.pravatar.cc/150?img=${n}`;
const img = (s: string, w = 800, h = 800) => `https://picsum.photos/seed/${s}/${w}/${h}`;

export const ME: User = {
  id: "me",
  name: "आप (Demo)",
  handle: "aap_demo",
  avatar: av(68),
  bio: "SamiraReel पर नया क्रिएटर ✨",
  followers: 128,
};

export const USERS: User[] = [
  {
    id: "u1",
    name: "प्रिया शर्मा",
    handle: "priya.travels",
    avatar: av(47),
    bio: "घुमक्कड़ 🏔️ | Jaipur",
    followers: 48200,
    verified: true,
  },
  {
    id: "u2",
    name: "Rohan Verma",
    handle: "rohan_cooks",
    avatar: av(12),
    bio: "घर का खाना 🍛",
    followers: 12900,
  },
  {
    id: "u3",
    name: "अनन्या",
    handle: "ananya.dance",
    avatar: av(44),
    bio: "Kathak + Bollywood 💃",
    followers: 98100,
    verified: true,
  },
  {
    id: "u4",
    name: "Arjun Singh",
    handle: "arjun.fit",
    avatar: av(15),
    bio: "फिटनेस कोच 💪",
    followers: 7300,
  },
  {
    id: "u5",
    name: "मीरा",
    handle: "meera.art",
    avatar: av(32),
    bio: "Madhubani artist 🎨",
    followers: 23400,
  },
  {
    id: "u6",
    name: "Kabir",
    handle: "kabir.music",
    avatar: av(53),
    bio: "Sitar x Lo-fi 🎶",
    followers: 5600,
  },
];

export const userById = (id: string) => (id === "me" ? ME : (USERS.find((u) => u.id === id) ?? ME));

const caps: [string, string, string][] = [
  ["u1", "हवा महल की सुबह 🌅 #Jaipur #IncredibleIndia", "Jaipur, Rajasthan"],
  ["u2", "आज बनाया माँ वाला राजमा चावल 😋 #घरकाखाना", "Delhi"],
  ["u3", "नया Kathak फ्यूज़न स्टेप 💃 #dance #reels", "Lucknow"],
  ["u5", "मधुबनी पेंटिंग – 3 दिन का काम 🎨 #art", "Darbhanga, Bihar"],
  ["u4", "सुबह 6 बजे की दौड़ 🏃 #fitness", "Mumbai"],
  ["u6", "Sitar + rain = सुकून 🌧️ #music", "Pune"],
  ["u1", "केरल के बैकवॉटर्स 🛶 #Kerala", "Alleppey"],
  ["u3", "Garba nights 🪔 #Navratri", "Ahmedabad"],
];

export const POSTS: Post[] = caps.map(([userId, caption, location], i) => ({
  id: `p${i + 1}`,
  userId,
  caption,
  location,
  image: img(`samira${i}`, 800, i % 3 === 2 ? 1400 : 800),
  likes: 120 + i * 937,
  kind: i % 3 === 2 ? "reel" : "photo",
  time: `${i + 1} घंटे पहले`,
  comments: [
    { id: `c${i}a`, userId: USERS[(i + 1) % 6]!.id, text: "बहुत सुंदर! 😍" },
    { id: `c${i}b`, userId: USERS[(i + 3) % 6]!.id, text: "Wow, amazing 🔥" },
  ],
}));

export const REELS = Array.from({ length: 6 }, (_, i) => ({
  id: `r${i}`,
  userId: USERS[i % 6]!.id,
  image: img(`reel${i}`, 720, 1280),
  caption: [
    "देसी स्ट्रीट फ़ूड टूर 🍢",
    "1 मिनट में साड़ी ड्रेपिंग 🥻",
    "Himalaya sunrise 🏔️",
    "Bhangra challenge 🕺",
    "रंगोली टाइमलैप्स 🌸",
    "Chai pe charcha ☕",
  ][i],
  audio: [
    "Original audio",
    "Kesariya • Arijit",
    "Lo-fi Sitar",
    "Punjabi Beat",
    "Classical Flute",
    "Chai Song",
  ][i],
  likes: 5000 + i * 3210,
}));

export const EXPLORE = Array.from({ length: 24 }, (_, i) => img(`explore${i}`, 400, 400));

export type Chat = {
  id: string;
  name: string;
  avatar: string;
  group?: boolean;
  members?: string[];
  messages: { from: string; text: string; time: string }[];
};
export const CHATS: Chat[] = [
  {
    id: "c1",
    name: "प्रिया शर्मा",
    avatar: av(47),
    messages: [{ from: "u1", text: "नमस्ते! रील बहुत अच्छी थी 😊", time: "10:20" }],
  },
  {
    id: "c2",
    name: "Rohan Verma",
    avatar: av(12),
    messages: [{ from: "u2", text: "Recipe भेजूँ?", time: "09:02" }],
  },
  {
    id: "c3",
    name: "क्रिएटर्स गैंग 🇮🇳",
    avatar: av(5),
    group: true,
    members: ["u3", "u5", "u6"],
    messages: [
      { from: "u3", text: "कल collab करें?", time: "कल" },
      { from: "u6", text: "हाँ बिल्कुल! 🎶", time: "कल" },
    ],
  },
];

export const NOTIFS = [
  { userId: "u1", text: "ने आपकी पोस्ट लाइक की", time: "2मि" },
  { userId: "u3", text: "ने आपको फ़ॉलो करना शुरू किया", time: "1घं" },
  { userId: "u2", text: "ने कमेंट किया: “शानदार!”", time: "3घं" },
  { userId: "u5", text: "ने आपको एक रील में टैग किया", time: "कल" },
];

export const fmt = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : String(n);
