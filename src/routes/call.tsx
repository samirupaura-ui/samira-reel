import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PhoneOff, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { DemoBadge } from "@/components/app/shell";

export const Route = createFileRoute("/call")({
  validateSearch: (s: Record<string, unknown>) => ({ name: String(s.name ?? "मित्र"), video: s.video === true || s.video === "true" }),
  head: () => ({
    meta: [
      { title: "कॉल (प्रोटोटाइप) — SamiraReel" },
      { name: "description", content: "Free voice and video calls prototype on SamiraReel." },
      { property: "og:title", content: "Call prototype — SamiraReel" },
      { property: "og:description", content: "Voice and video call prototype." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Call,
});

function Call() {
  const { name, video } = Route.useSearch();
  const router = useRouter();
  const [sec, setSec] = useState(0);
  const [mute, setMute] = useState(false);
  const [cam, setCam] = useState(video);
  useEffect(() => { const i = setInterval(() => setSec((x) => x + 1), 1000); return () => clearInterval(i); }, []);
  return (
    <div className="relative mx-auto flex h-screen max-w-md flex-col items-center justify-between overflow-hidden bg-card p-8">
      {cam && <img src="https://picsum.photos/seed/callbg/720/1280" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />}
      <div className="relative text-center"><DemoBadge>प्रोटोटाइप — कॉल असली नहीं है</DemoBadge></div>
      <div className="relative text-center">
        <div className="mx-auto mb-4 grid h-28 w-28 place-items-center rounded-full bg-brand font-display text-4xl font-bold">{name[0]}</div>
        <p className="font-display text-2xl font-bold">{name}</p>
        <p className="text-muted-foreground">{video ? "वीडियो" : "वॉइस"} कॉल • {String(Math.floor(sec / 60)).padStart(2, "0")}:{String(sec % 60).padStart(2, "0")}</p>
        <p className="mt-2 text-xs text-success">कॉल हमेशा मुफ़्त</p>
      </div>
      <div className="relative flex gap-6">
        <button onClick={() => setMute(!mute)} aria-label="Mute" className="grid h-14 w-14 place-items-center rounded-full bg-secondary">{mute ? <MicOff /> : <Mic />}</button>
        <button onClick={() => setCam(!cam)} aria-label="Camera" className="grid h-14 w-14 place-items-center rounded-full bg-secondary">{cam ? <Video /> : <VideoOff />}</button>
        <button onClick={() => router.history.back()} aria-label="End" className="grid h-14 w-14 place-items-center rounded-full bg-destructive"><PhoneOff /></button>
      </div>
    </div>
  );
}
