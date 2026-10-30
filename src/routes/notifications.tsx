import { createFileRoute } from "@tanstack/react-router";
import { Screen, TopBar, Avatar, DemoBadge } from "@/components/app/shell";
import { useStore } from "@/lib/store";
import { NOTIFS, userById } from "@/lib/data";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "सूचनाएँ — SamiraReel" },
      { name: "description", content: "Likes, follows and comments on your SamiraReel posts." },
      { property: "og:title", content: "Notifications — SamiraReel" },
      { property: "og:description", content: "Your SamiraReel activity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Notifs,
});

function Notifs() {
  const s = useStore();
  return (
    <Screen>
      <TopBar
        title={<span className="font-display text-xl font-bold">{s.t("notifications")}</span>}
      />
      <p className="px-4 pt-3">
        <DemoBadge>नमूना सूचनाएँ — पुश नोटिफ़िकेशन नहीं</DemoBadge>
      </p>
      {NOTIFS.map((n, i) => {
        const u = userById(n.userId);
        return (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <Avatar src={u.avatar} size={44} />
            <p className="flex-1 text-sm">
              <b>{u.handle}</b> {n.text} <span className="text-muted-foreground">{n.time}</span>
            </p>
            <button
              onClick={() => s.toggleFollow(u.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${s.following.has(u.id) ? "bg-secondary" : "bg-primary text-primary-foreground"}`}
            >
              {s.following.has(u.id) ? s.t("following") : s.t("follow")}
            </button>
          </div>
        );
      })}
    </Screen>
  );
}
