import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen, TopBar, Toggle, Avatar, btnGhost } from "@/components/app/shell";
import { useStore } from "@/lib/store";
import { userById } from "@/lib/data";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "सेटिंग्स और सुरक्षा — SamiraReel" },
      { name: "description", content: "Privacy, blocking, reporting and community safety on SamiraReel." },
      { property: "og:title", content: "Settings & Safety — SamiraReel" },
      { property: "og:description", content: "Privacy and community safety controls." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsPage,
});

const LABELS: Record<string, string> = {
  privateAccount: "प्राइवेट अकाउंट", hideLikes: "लाइक काउंट छिपाएँ", limitComments: "अनजान लोगों के कमेंट सीमित करें",
  filterWords: "आपत्तिजनक शब्द फ़िल्टर", dmFromFollowers: "सिर्फ़ फ़ॉलोअर्स से DM", activityStatus: "ऑनलाइन स्टेटस दिखाएँ",
};

function SettingsPage() {
  const s = useStore();
  const nav = useNavigate();
  return (
    <Screen>
      <TopBar title={<span className="font-display text-xl font-bold">{s.t("settings")}</span>} />
      <section className="p-4">
        <h2 className="mb-1 text-xs font-semibold uppercase text-muted-foreground">भाषा / Language</h2>
        <div className="flex gap-2">{(["hi", "en"] as const).map((l) => <button key={l} onClick={() => s.setLang(l)} className={`flex-1 rounded-xl py-2 text-sm ${s.lang === l ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{l === "hi" ? "हिंदी" : "English"}</button>)}</div>
      </section>
      <section className="divide-y px-4">
        <h2 className="pb-1 text-xs font-semibold uppercase text-muted-foreground">गोपनीयता</h2>
        {Object.keys(LABELS).map((k) => <Toggle key={k} label={LABELS[k] ?? k} on={!!s.privacy[k]} onChange={(v) => s.setPrivacy(k, v)} />)}
      </section>
      <section className="p-4">
        <h2 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">ब्लॉक किए गए ({s.blocked.size})</h2>
        {s.blocked.size === 0 && <p className="text-sm text-muted-foreground">कोई नहीं। पोस्ट के ⋯ मेनू से ब्लॉक/रिपोर्ट करें।</p>}
        {[...s.blocked].map((id) => { const u = userById(id); return (
          <div key={id} className="flex items-center gap-3 py-2"><Avatar src={u.avatar} size={36} /><span className="flex-1 text-sm">{u.handle}</span><button onClick={() => s.toggleBlock(id)} className="text-xs text-primary">अनब्लॉक</button></div>
        ); })}
      </section>
      <section className="m-4 space-y-2 rounded-2xl bg-card p-4 text-sm">
        <h2 className="font-semibold">🛡️ कम्युनिटी सुरक्षा</h2>
        <p className="text-muted-foreground">नफ़रत, उत्पीड़न, धोखाधड़ी या बच्चों से जुड़ी हानिकारक सामग्री की अनुमति नहीं है। रिपोर्ट गोपनीय रहती हैं।</p>
        <button onClick={() => s.notify("सुरक्षा रिपोर्ट भेजी गई (डेमो)")} className={`${btnGhost} w-full`}>🚩 समस्या रिपोर्ट करें</button>
        <p className="text-xs text-muted-foreground">आपातकाल में 112 पर कॉल करें। साइबर अपराध: cybercrime.gov.in / 1930</p>
      </section>
      <section className="m-4 space-y-2 rounded-2xl bg-card p-4 text-sm">
        <h2 className="font-semibold">💾 डेमो डेटा</h2>
        <p className="text-muted-foreground">आपकी पोस्ट, लाइक, फ़ॉलो और सेटिंग्स सिर्फ़ इस फ़ोन/ब्राउज़र में सेव हैं — क्लाउड पर नहीं।</p>
        <button onClick={() => { if (confirm("सारा डेमो डेटा मिटाएँ?")) s.resetDemo(); }} className={`${btnGhost} w-full`}>डेमो डेटा रीसेट करें</button>
      </section>
      {s.authed && <div className="p-4"><button onClick={() => { s.setAuthed(false); nav({ to: "/login" }); }} className={`${btnGhost} w-full text-destructive`}>डेमो सत्र बंद करें</button></div>}
    </Screen>
  );
}
