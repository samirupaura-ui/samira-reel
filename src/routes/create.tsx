import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ImagePlus, Sparkles, Radio } from "lucide-react";
import { Screen, TopBar, DemoBadge, btnPrimary, btnGhost } from "@/components/app/shell";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "नई पोस्ट बनाएँ — SamiraReel" },
      { name: "description", content: "Share a photo or reel with Hindi captions and AI hashtag ideas." },
      { property: "og:title", content: "Create — SamiraReel" },
      { property: "og:description", content: "Share photos and reels on SamiraReel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Create,
});

function Create() {
  const s = useStore();
  const nav = useNavigate();
  const [img, setImg] = useState<string | null>(null);
  const [cap, setCap] = useState("");
  const [kind, setKind] = useState<"photo" | "reel">("photo");

  const suggest = () => setCap((c) => `${c ? c + " " : ""}आज का पल, दिल से ✨ #SamiraReel #IndiaCreators #देसी`);

  return (
    <Screen>
      <TopBar title={<span className="font-display text-xl font-bold">{s.t("create")}</span>} />
      <div className="space-y-4 p-4">
        <div className="flex gap-2">
          {(["photo", "reel"] as const).map((k) => (
            <button key={k} onClick={() => setKind(k)} className={kind === k ? btnPrimary : btnGhost}>{k === "photo" ? "📷 फ़ोटो" : "🎬 रील"}</button>
          ))}
        </div>
        <label className="grid aspect-square cursor-pointer place-items-center overflow-hidden rounded-2xl border-2 border-dashed bg-card">
          {img ? <img src={img} alt="preview" className="h-full w-full object-cover" /> : <span className="flex flex-col items-center gap-2 text-muted-foreground"><ImagePlus className="h-10 w-10" />गैलरी से चुनें</span>}
          <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setImg(URL.createObjectURL(f)); }} />
        </label>
        <textarea value={cap} onChange={(e) => setCap(e.target.value)} rows={3} placeholder="कैप्शन लिखें…" className="w-full rounded-xl bg-secondary p-3 text-sm outline-none" />
        <button onClick={suggest} className={btnGhost}><Sparkles className="h-4 w-4 text-primary" />AI कैप्शन सुझाव <DemoBadge /></button>
        <button disabled={!img} onClick={() => { s.addPost({ id: crypto.randomUUID(), userId: "me", image: img!, caption: cap || "✨", likes: 0, comments: [], kind, time: "अभी" }); s.notify("पोस्ट शेयर हुई! 🎉"); nav({ to: "/" }); }} className={`${btnPrimary} w-full disabled:opacity-40`}>शेयर करें</button>
        <p className="text-center text-xs text-muted-foreground">पोस्ट सिर्फ़ इस सत्र में दिखेगी — <DemoBadge>क्लाउड स्टोरेज डेमो</DemoBadge></p>
        <Link to="/live" className={`${btnGhost} w-full`}><Radio className="h-4 w-4 text-destructive" />लाइव जाएँ (प्रोटोटाइप)</Link>
      </div>
    </Screen>
  );
}
