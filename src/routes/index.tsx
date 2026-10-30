import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { Screen, TopBar, HomeActions, Avatar, DemoBadge } from "@/components/app/shell";
import { PostCard } from "@/components/app/post-card";
import { useStore } from "@/lib/store";
import { ME, USERS } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SamiraReel (समीरा रील) — आपकी दुनिया, आपकी रील!" },
      {
        name: "description",
        content:
          "Hindi-first photo & reel sharing app for India 🇮🇳 — stories, reels, chats, free forever.",
      },
      { property: "og:title", content: "SamiraReel — आपकी दुनिया, आपकी रील!" },
      { property: "og:description", content: "Hindi-first photo & reel sharing app for India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const s = useStore();
  const [story, setStory] = useState<number | null>(null);
  return (
    <Screen>
      <TopBar right={<HomeActions />} />
      {!s.authed && (
        <Link
          to="/login"
          className="mx-4 mt-3 flex items-center justify-between rounded-xl bg-accent px-4 py-3 text-sm"
        >
          <span>📱 +91 नंबर से जुड़ें</span>
          <span className="font-semibold text-primary">{s.t("login")} →</span>
        </Link>
      )}
      <div className="no-scrollbar flex gap-4 overflow-x-auto border-b px-4 py-3">
        <Link to="/create" className="flex w-16 shrink-0 flex-col items-center gap-1 text-xs">
          <span className="relative">
            <Avatar src={ME.avatar} size={60} />
            <span className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-xs text-primary-foreground">
              +
            </span>
          </span>
          आपकी स्टोरी
        </Link>
        {USERS.map((u, i) => (
          <button
            key={u.id}
            onClick={() => setStory(i)}
            className="flex w-16 shrink-0 flex-col items-center gap-1 text-xs"
          >
            <Avatar src={u.avatar} size={60} ring />
            <span className="w-16 truncate">{u.handle}</span>
          </button>
        ))}
      </div>
      {s.posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
      <p className="px-6 py-8 text-center text-xs text-muted-foreground">
        ✅ {s.t("free")} <br />
        <span className="mt-2 inline-block">
          <DemoBadge>नमूना सामग्री</DemoBadge>
        </span>
      </p>

      {story !== null && (
        <div
          className="fixed inset-0 z-50 mx-auto max-w-md bg-background"
          onClick={() => setStory(story < USERS.length - 1 ? story + 1 : null)}
        >
          <div className="absolute inset-x-2 top-2 flex gap-1">
            {USERS.map((_, i) => (
              <span
                key={i}
                className={`h-0.5 flex-1 rounded ${i <= story ? "bg-foreground" : "bg-foreground/30"}`}
              />
            ))}
          </div>
          <div className="absolute left-3 right-3 top-5 z-10 flex items-center gap-2 text-sm font-semibold">
            <Avatar src={USERS[story]!.avatar} size={32} />
            {USERS[story]!.handle}
            <button
              className="ml-auto"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                setStory(null);
              }}
            >
              <X />
            </button>
          </div>
          <img
            src={`https://picsum.photos/seed/story${story}/720/1280`}
            alt=""
            className="h-full w-full object-cover"
          />
          <p className="absolute bottom-6 w-full text-center text-xs text-muted-foreground">
            आगे बढ़ने के लिए टैप करें
          </p>
        </div>
      )}
    </Screen>
  );
}
