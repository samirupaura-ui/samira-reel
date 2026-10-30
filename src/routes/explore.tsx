import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, BadgeCheck } from "lucide-react";
import { Screen, Avatar } from "@/components/app/shell";
import { useStore } from "@/lib/store";
import { EXPLORE, USERS, fmt } from "@/lib/data";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "खोजें — SamiraReel" },
      { name: "description", content: "Discover Indian creators, trending reels and hashtags." },
      { property: "og:title", content: "Explore — SamiraReel" },
      { property: "og:description", content: "Discover Indian creators and trends." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Explore,
});

const TAGS = ["#घरकाखाना", "#IncredibleIndia", "#Bollywood", "#Kathak", "#Cricket", "#Diwali"];

function Explore() {
  const s = useStore();
  const [q, setQ] = useState("");
  const ql = q.toLowerCase();
  const users = USERS.filter(
    (u) =>
      !s.blocked.has(u.id) &&
      (u.name.toLowerCase().includes(ql) ||
        u.handle.includes(ql) ||
        u.bio.toLowerCase().includes(ql)),
  );
  return (
    <Screen>
      <div className="sticky top-0 z-30 bg-background p-3">
        <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input aria-label="इनपुट"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={s.t("search")}
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setQ(t.slice(1))}
              className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      {q ? (
        <div className="divide-y">
          {users.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">कोई परिणाम नहीं</p>
          )}
          {users.map((u) => (
            <div key={u.id} className="flex items-center gap-3 px-4 py-3">
              <Avatar src={u.avatar} size={44} />
              <div className="flex-1 text-sm">
                <p className="flex items-center gap-1 font-semibold">
                  {u.handle}
                  {u.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                </p>
                <p className="text-muted-foreground">
                  {u.name} • {fmt(u.followers)} {s.t("followers")}
                </p>
              </div>
              <button
                onClick={() => s.toggleFollow(u.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${s.following.has(u.id) ? "bg-secondary" : "bg-primary text-primary-foreground"}`}
              >
                {s.following.has(u.id) ? s.t("following") : s.t("follow")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-0.5">
          {EXPLORE.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className={`aspect-square w-full object-cover ${i % 7 === 2 ? "row-span-2 h-full" : ""}`}
            />
          ))}
        </div>
      )}
    </Screen>
  );
}
