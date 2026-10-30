import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Settings, Sparkles, BarChart3, Grid3x3, Bookmark } from "lucide-react";
import { Screen, TopBar, Avatar, btnGhost } from "@/components/app/shell";
import { useStore } from "@/lib/store";
import { ME, POSTS } from "@/lib/data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "मेरी प्रोफ़ाइल — SamiraReel" },
      { name: "description", content: "Your SamiraReel profile, posts and saved items." },
      { property: "og:title", content: "Profile — SamiraReel" },
      { property: "og:description", content: "Your SamiraReel profile." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Profile,
});

function Profile() {
  const s = useStore();
  const [tab, setTab] = useState<"posts" | "saved">("posts");
  const mine = s.posts.filter((p) => p.userId === "me");
  const saved = POSTS.filter((p) => s.saved.has(p.id));
  const list = tab === "posts" ? mine : saved;
  return (
    <Screen>
      <TopBar title={<span className="font-display text-xl font-bold">@{ME.handle}</span>} right={<Link to="/settings" aria-label="Settings"><Settings className="h-6 w-6" /></Link>} />
      <div className="flex items-center gap-6 p-4">
        <Avatar src={ME.avatar} size={84} ring />
        <div className="grid flex-1 grid-cols-3 text-center text-sm">
          <div><p className="text-lg font-bold">{mine.length}</p>{s.t("posts")}</div>
          <div><p className="text-lg font-bold">{ME.followers}</p>{s.t("followers")}</div>
          <div><p className="text-lg font-bold">{s.following.size}</p>{s.t("following")}</div>
        </div>
      </div>
      <div className="px-4 text-sm"><p className="font-semibold">{ME.name}</p><p className="text-muted-foreground">{ME.bio}</p>{s.authed && <p className="text-xs text-warning">डेमो सत्र: +91 {s.phone} (सत्यापित नहीं)</p>}</div>
      <div className="grid grid-cols-3 gap-2 p-4">
        <Link to="/creator" className={btnGhost}><BarChart3 className="h-4 w-4" />क्रिएटर</Link>
        <Link to="/ai" className={btnGhost}><Sparkles className="h-4 w-4" />AI</Link>
        <Link to={s.authed ? "/settings" : "/login"} className={btnGhost}>{s.authed ? s.t("settings") : s.t("login")}</Link>
      </div>
      <div className="flex border-t">
        <button onClick={() => setTab("posts")} className={`flex flex-1 justify-center py-3 ${tab === "posts" ? "border-b-2 border-primary" : "text-muted-foreground"}`}><Grid3x3 /></button>
        <button onClick={() => setTab("saved")} className={`flex flex-1 justify-center py-3 ${tab === "saved" ? "border-b-2 border-primary" : "text-muted-foreground"}`}><Bookmark /></button>
      </div>
      {list.length === 0 ? <p className="p-10 text-center text-sm text-muted-foreground">{tab === "posts" ? "अभी कोई पोस्ट नहीं — बनाएँ टैब से शुरू करें" : "कुछ सेव नहीं किया"}</p> : (
        <div className="grid grid-cols-3 gap-0.5">{list.map((p) => <img key={p.id} src={p.image} alt="" className="aspect-square w-full object-cover" />)}</div>
      )}
    </Screen>
  );
}
