import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Screen, TopBar, DemoBadge } from "@/components/app/shell";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "AI सहायता — SamiraReel" },
      {
        name: "description",
        content: "Hindi/English help, captions, hashtags and reel ideas for creators.",
      },
      { property: "og:title", content: "AI Help — SamiraReel" },
      { property: "og:description", content: "Captions, hashtags and ideas in Hindi & English." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AI,
});

const QUICK = [
  "मेरी रील के लिए कैप्शन लिखो",
  "Diwali के hashtags",
  "Cooking reel ideas",
  "अकाउंट प्राइवेट कैसे करें?",
];

function reply(q: string) {
  const l = q.toLowerCase();
  if (l.includes("hashtag") || q.includes("हैशटैग"))
    return "#Diwali2026 #दिवाली #FestivalOfLights #IndiaCreators #SamiraReel #रोशनी";
  if (l.includes("caption") || q.includes("कैप्शन"))
    return "1) “हर पल एक कहानी, हर कहानी एक रील ✨”\n2) “देसी दिल, ग्लोबल वाइब 🇮🇳”\n3) “Chai, dosti aur yeh pal ☕”";
  if (l.includes("idea") || q.includes("आइडिया"))
    return "• 30 सेकंड में दादी की रेसिपी\n• स्ट्रीट फ़ूड रेटिंग चैलेंज\n• Before/After किचन ट्रांज़िशन";
  if (q.includes("प्राइवेट") || l.includes("private"))
    return "प्रोफ़ाइल → ⚙ सेटिंग्स → ‘प्राइवेट अकाउंट’ चालू करें। अब सिर्फ़ मंज़ूर फ़ॉलोअर्स आपकी पोस्ट देख पाएँगे।";
  return "मैं कैप्शन, हैशटैग, रील आइडिया और ऐप सहायता में मदद कर सकता हूँ। I can help in Hindi or English!";
}

function AI() {
  const s = useStore();
  const [msgs, setMsgs] = useState<{ me: boolean; text: string }[]>([
    { me: false, text: "नमस्ते! 🙏 मैं समीरा AI हूँ। आज क्या मदद करूँ?" },
  ]);
  const [q, setQ] = useState("");
  const ask = (text: string) => {
    setMsgs((m) => [...m, { me: true, text }, { me: false, text: reply(text) }]);
    setQ("");
  };
  return (
    <Screen>
      <TopBar
        title={
          <span className="flex items-center gap-2 font-display text-xl font-bold">
            <Sparkles className="h-5 w-5 text-primary" />
            {s.t("aiHelp")}
          </span>
        }
      />
      <p className="px-4 pt-3 text-xs text-warning">
        ⚠ डेमो: जवाब पहले से लिखे नमूने हैं — असली AI मॉडल अभी जुड़ा नहीं है।
      </p>
      <div className="space-y-2 p-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.me ? "justify-end" : ""}`}>
            <p
              className={`max-w-[80%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm ${m.me ? "bg-brand text-primary-foreground" : "bg-secondary"}`}
            >
              {m.text}
            </p>
          </div>
        ))}
      </div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4">
        {QUICK.map((x) => (
          <button
            key={x}
            onClick={() => ask(x)}
            className="shrink-0 rounded-full bg-accent px-3 py-1.5 text-xs"
          >
            {x}
          </button>
        ))}
      </div>
      <form
        className="sticky bottom-16 flex gap-2 bg-background p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) ask(q.trim());
        }}
      >
        <input
          aria-label="इनपुट"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="हिंदी या English में पूछें…"
          className="flex-1 rounded-full bg-secondary px-4 py-2 text-sm outline-none"
        />
        <button className="font-semibold text-primary">{s.t("send")}</button>
      </form>
      <p className="text-center">
        <DemoBadge>AI डेमो</DemoBadge>
      </p>
    </Screen>
  );
}
