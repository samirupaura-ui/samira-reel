import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Phone, Video, Users } from "lucide-react";
import { Screen, TopBar, Avatar, DemoBadge } from "@/components/app/shell";
import { useStore } from "@/lib/store";
import { userById } from "@/lib/data";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "संदेश — SamiraReel" },
      { name: "description", content: "Free direct and group chats on SamiraReel." },
      { property: "og:title", content: "Messages — SamiraReel" },
      { property: "og:description", content: "Free direct and group chats." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Messages,
});

function Messages() {
  const s = useStore();
  const [open, setOpen] = useState<string | null>(null);
  const [txt, setTxt] = useState("");
  const chat = s.chats.find((c) => c.id === open);

  if (chat)
    return (
      <main className="mx-auto flex h-dvh max-w-md flex-col">
        <header className="flex items-center gap-3 border-b px-3 py-3">
          <button onClick={() => setOpen(null)} aria-label="Back">
            <ArrowLeft />
          </button>
          <Avatar src={chat.avatar} size={36} />
          <div className="flex-1 text-sm">
            <p className="font-semibold">{chat.name}</p>
            <p className="text-xs text-muted-foreground">
              {chat.group ? `${(chat.members?.length ?? 0) + 1} सदस्य` : "नमूना संपर्क"}
            </p>
          </div>
          <Link to="/call" search={{ name: chat.name, video: false }} aria-label="Voice call">
            <Phone className="h-5 w-5" />
          </Link>
          <Link to="/call" search={{ name: chat.name, video: true }} aria-label="Video call">
            <Video className="h-5 w-5" />
          </Link>
        </header>
        <p className="py-2 text-center">
          <DemoBadge>डेमो चैट — संदेश किसी को नहीं भेजे जाते</DemoBadge>
        </p>
        <div className="flex-1 space-y-2 overflow-y-auto px-3">
          {chat.messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : ""}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.from === "me" ? "bg-brand text-primary-foreground" : "bg-secondary"}`}
              >
                {chat.group && m.from !== "me" && (
                  <p className="text-xs font-semibold text-primary">{userById(m.from).handle}</p>
                )}
                {m.text}
                <span className="ml-2 text-[10px] opacity-70">{m.time}</span>
              </div>
            </div>
          ))}
        </div>
        <form
          className="flex gap-2 border-t p-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (txt.trim()) {
              s.sendMessage(chat.id, txt.trim());
              setTxt("");
            }
          }}
        >
          <input
            aria-label="इनपुट"
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            placeholder="संदेश लिखें…"
            className="flex-1 rounded-full bg-secondary px-4 py-2 text-sm outline-none"
          />
          <button className="font-semibold text-primary">{s.t("send")}</button>
        </form>
      </main>
    );

  return (
    <Screen>
      <TopBar
        title={<span className="font-display text-xl font-bold">{s.t("messages")}</span>}
        right={
          <button onClick={() => s.notify("नया ग्रुप (डेमो)")} aria-label="New group">
            <Users className="h-5 w-5" />
          </button>
        }
      />
      <p className="px-4 pt-3">
        <DemoBadge>डेमो मैसेजिंग — रियल-टाइम नहीं</DemoBadge>
      </p>
      {s.chats.map((c) => (
        <button
          key={c.id}
          onClick={() => setOpen(c.id)}
          className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-secondary"
        >
          <Avatar src={c.avatar} size={52} />
          <div className="flex-1 overflow-hidden text-sm">
            <p className="font-semibold">
              {c.name} {c.group && "👥"}
            </p>
            <p className="truncate text-muted-foreground">{c.messages.at(-1)?.text}</p>
          </div>
          <span className="text-xs text-muted-foreground">{c.messages.at(-1)?.time}</span>
        </button>
      ))}
    </Screen>
  );
}
