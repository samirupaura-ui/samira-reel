import { createFileRoute } from "@tanstack/react-router";
import { Heart, MessageCircle, Send, Bookmark, Music2 } from "lucide-react";
import { Screen, Avatar, DemoBadge } from "@/components/app/shell";
import { useStore } from "@/lib/store";
import { REELS, fmt, userById } from "@/lib/data";

export const Route = createFileRoute("/reels")({
  head: () => ({
    meta: [
      { title: "रील्स — SamiraReel" },
      {
        name: "description",
        content: "Watch free Hindi reels from Indian creators — no forced ads.",
      },
      { property: "og:title", content: "रील्स — SamiraReel" },
      { property: "og:description", content: "Free Hindi reels from Indian creators." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reels,
});

function Reels() {
  const s = useStore();
  return (
    <Screen>
      <div className="no-scrollbar h-[calc(100vh-4.5rem)] snap-y snap-mandatory overflow-y-scroll">
        {REELS.map((r) => {
          const u = userById(r.userId);
          const liked = s.liked.has(r.id);
          return (
            <section key={r.id} className="relative h-full snap-start overflow-hidden">
              <img src={r.image} alt={r.caption} className="kenburns h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-overlay via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="font-display text-xl font-bold">रील्स</span>
                <DemoBadge>नमूना वीडियो</DemoBadge>
              </div>
              <div className="absolute bottom-6 right-3 flex flex-col items-center gap-5 text-xs">
                <button onClick={() => s.toggleLike(r.id)} className="flex flex-col items-center">
                  <Heart className={`h-7 w-7 ${liked ? "fill-primary text-primary" : ""}`} />
                  {fmt(r.likes + (liked ? 1 : 0))}
                </button>
                <button
                  onClick={() => s.notify("कमेंट्स जल्द (डेमो)")}
                  className="flex flex-col items-center"
                >
                  <MessageCircle className="h-7 w-7" />
                  214
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(location.href);
                    s.notify("लिंक कॉपी हुआ 🔗");
                  }}
                >
                  <Send className="h-7 w-7" />
                </button>
                <button onClick={() => s.toggleSave(r.id)}>
                  <Bookmark className={`h-7 w-7 ${s.saved.has(r.id) ? "fill-foreground" : ""}`} />
                </button>
              </div>
              <div className="absolute bottom-6 left-4 right-16 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Avatar src={u.avatar} size={32} />
                  {u.handle}
                  <button
                    onClick={() => s.toggleFollow(u.id)}
                    className="rounded-lg border px-2 py-0.5 text-xs"
                  >
                    {s.following.has(u.id) ? s.t("following") : s.t("follow")}
                  </button>
                </div>
                <p className="text-sm">{r.caption}</p>
                <p className="flex items-center gap-1 text-xs">
                  <Music2 className="h-3 w-3" />
                  {r.audio}
                </p>
              </div>
            </section>
          );
        })}
      </div>
    </Screen>
  );
}
