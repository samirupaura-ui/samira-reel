import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, BadgeCheck } from "lucide-react";
import { Avatar } from "./shell";
import { useStore } from "@/lib/store";
import { fmt, userById, type Post } from "@/lib/data";

export function PostCard({ post }: { post: Post }) {
  const s = useStore();
  const u = userById(post.userId);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [txt, setTxt] = useState("");
  const [burst, setBurst] = useState(0);
  const liked = s.liked.has(post.id);
  if (s.blocked.has(post.userId)) return null;

  const share = async () => {
    const url = `${location.origin}/?post=${post.id}`;
    try { if (navigator.share) await navigator.share({ title: "SamiraReel", url }); else { await navigator.clipboard.writeText(url); s.notify("लिंक कॉपी हुआ 🔗"); } } catch { /* cancelled */ }
  };

  return (
    <article className="border-b pb-3">
      <div className="flex items-center gap-3 px-4 py-3">
        <Avatar src={u.avatar} size={34} ring />
        <div className="flex-1 leading-tight">
          <p className="flex items-center gap-1 text-sm font-semibold">{u.handle}{u.verified && <BadgeCheck className="h-4 w-4 text-primary" />}</p>
          {post.location && <p className="text-xs text-muted-foreground">{post.location}</p>}
        </div>
        {post.userId !== "me" && (
          <button onClick={() => s.toggleFollow(post.userId)} className={`text-xs font-semibold ${s.following.has(post.userId) ? "text-muted-foreground" : "text-primary"}`}>
            {s.following.has(post.userId) ? s.t("following") : s.t("follow")}
          </button>
        )}
        <button aria-label="More" onClick={() => setMenu(!menu)}><MoreHorizontal className="h-5 w-5" /></button>
      </div>
      {menu && (
        <div className="mx-4 mb-2 grid gap-1 rounded-xl bg-popover p-2 text-sm">
          <button className="rounded-lg p-2 text-left hover:bg-secondary" onClick={() => { s.notify("रिपोर्ट भेजी गई — सेफ़्टी टीम (डेमो) देखेगी"); setMenu(false); }}>🚩 रिपोर्ट करें</button>
          <button className="rounded-lg p-2 text-left text-destructive hover:bg-secondary" onClick={() => { s.toggleBlock(post.userId); s.notify(`@${u.handle} ब्लॉक किया`); }}>⛔ @{u.handle} को ब्लॉक करें</button>
        </div>
      )}
      <div className="relative" onDoubleClick={() => { if (!liked) s.toggleLike(post.id); setBurst((b) => b + 1); }}>
        <img src={post.image} alt={post.caption} loading="lazy" className="aspect-square w-full object-cover" />
        {burst > 0 && <Heart key={burst} className="animate-pop absolute inset-0 m-auto h-24 w-24 fill-primary text-primary" />}
      </div>
      <div className="flex items-center gap-4 px-4 pt-3">
        <button aria-label="Like" onClick={() => s.toggleLike(post.id)}><Heart className={`h-6 w-6 ${liked ? "fill-primary text-primary" : ""}`} /></button>
        <button aria-label="Comment" onClick={() => setOpen(!open)}><MessageCircle className="h-6 w-6" /></button>
        <button aria-label="Share" onClick={share}><Send className="h-6 w-6" /></button>
        <button aria-label="Save" className="ml-auto" onClick={() => { s.toggleSave(post.id); s.notify(s.saved.has(post.id) ? "हटाया गया" : "सेव हुआ 🔖"); }}><Bookmark className={`h-6 w-6 ${s.saved.has(post.id) ? "fill-foreground" : ""}`} /></button>
      </div>
      <div className="space-y-1 px-4 pt-2 text-sm">
        {!s.privacy.hideLikes && <p className="font-semibold">{fmt(post.likes + (liked ? 1 : 0))} लाइक्स</p>}
        <p><span className="font-semibold">{u.handle}</span> {post.caption}</p>
        <button className="text-muted-foreground" onClick={() => setOpen(!open)}>सभी {post.comments.length} कमेंट देखें</button>
        {open && (
          <div className="space-y-1.5 pt-1">
            {post.comments.map((c) => <p key={c.id}><span className="font-semibold">{userById(c.userId).handle}</span> {c.text}</p>)}
            <form className="flex gap-2 pt-1" onSubmit={(e) => { e.preventDefault(); if (txt.trim()) { s.addComment(post.id, txt.trim()); setTxt(""); } }}>
              <input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder={s.t("comment")} className="flex-1 rounded-lg bg-secondary px-3 py-1.5 outline-none" />
              <button className="font-semibold text-primary">{s.t("post")}</button>
            </form>
          </div>
        )}
        <p className="text-xs text-muted-foreground">{post.time}</p>
      </div>
    </article>
  );
}
