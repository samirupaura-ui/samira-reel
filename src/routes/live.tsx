import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, Eye } from "lucide-react";
import { DemoBadge } from "@/components/app/shell";
import { USERS } from "@/lib/data";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "लाइव (प्रोटोटाइप) — SamiraReel" },
      { name: "description", content: "Live streaming prototype on SamiraReel." },
      { property: "og:title", content: "Live prototype — SamiraReel" },
      { property: "og:description", content: "Live streaming prototype." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Live,
});

const LINES = ["नमस्ते! 🙏", "बहुत बढ़िया 🔥", "Jaipur से हेलो!", "❤️❤️❤️", "अगला गाना?"];

function Live() {
  const router = useRouter();
  const [msgs, setMsgs] = useState<string[]>([]);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setMsgs((m) => [...m.slice(-5), `${USERS[i % 6]!.handle}: ${LINES[i % 5]}`]);
      i++;
    }, 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative mx-auto h-dvh max-w-md overflow-hidden">
      <img
        src="https://picsum.photos/seed/livebg/720/1280"
        alt=""
        className="kenburns h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-overlay to-transparent" />
      <div className="absolute inset-x-4 top-4 flex items-center gap-2">
        <span className="rounded bg-destructive px-2 py-0.5 text-xs font-bold">LIVE</span>
        <span className="flex items-center gap-1 rounded bg-overlay px-2 py-0.5 text-xs">
          <Eye className="h-3 w-3" />
          1.2K
        </span>
        <DemoBadge>प्रोटोटाइप — प्रसारण नहीं हो रहा</DemoBadge>
        <button className="ml-auto" aria-label="Close" onClick={() => router.history.back()}>
          <X />
        </button>
      </div>
      <div className="absolute bottom-6 left-4 right-4 space-y-1 text-sm">
        {msgs.map((m, i) => (
          <p key={i} className="w-fit rounded-full bg-overlay px-3 py-1">
            {m}
          </p>
        ))}
      </div>
    </div>
  );
}
