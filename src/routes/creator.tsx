import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { Screen, TopBar, DemoBadge, btnPrimary } from "@/components/app/shell";
import { useStore } from "@/lib/store";
import { ME } from "@/lib/data";

export const Route = createFileRoute("/creator")({
  head: () => ({
    meta: [
      { title: "क्रिएटर डैशबोर्ड — SamiraReel" },
      { name: "description", content: "Free creator onboarding with transparent eligibility rules." },
      { property: "og:title", content: "Creator Dashboard — SamiraReel" },
      { property: "og:description", content: "Transparent eligibility, free onboarding." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Creator,
});

function Creator() {
  const s = useStore();
  const [joined, setJoined] = useState(false);
  const myPosts = s.posts.filter((p) => p.userId === "me").length;
  const rules = [
    { label: "18+ आयु और सत्यापित +91 नंबर", ok: s.authed },
    { label: "कम से कम 3 मूल पोस्ट", ok: myPosts >= 3, note: `${myPosts}/3` },
    { label: "100+ फ़ॉलोअर्स", ok: ME.followers >= 100, note: `${ME.followers}/100` },
    { label: "पिछले 90 दिन में कोई गंभीर नियम उल्लंघन नहीं", ok: true },
  ];
  const eligible = rules.every((r) => r.ok);
  return (
    <Screen>
      <TopBar title={<span className="font-display text-xl font-bold">{s.t("creator")}</span>} />
      <div className="grid grid-cols-3 gap-2 p-4 text-center">
        {[["पहुँच", "2.4K"], ["एंगेजमेंट", "8.2%"], ["नए फ़ॉलोअर्स", "+37"]].map(([k, v]) => <div key={k} className="rounded-2xl bg-card p-3"><p className="text-lg font-bold text-brand">{v}</p><p className="text-xs text-muted-foreground">{k}</p></div>)}
      </div>
      <p className="px-4 text-xs text-muted-foreground">आँकड़े नमूना हैं <DemoBadge /></p>
      <section className="m-4 rounded-2xl bg-card p-4">
        <h2 className="mb-1 font-semibold">पात्रता — पूरी तरह पारदर्शी</h2>
        <p className="mb-3 text-xs text-muted-foreground">जुड़ना मुफ़्त है। कोई छिपी शर्त या फ़ीस नहीं।</p>
        {rules.map((r) => (
          <div key={r.label} className="flex items-center gap-2 py-1.5 text-sm">{r.ok ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className="h-5 w-5 text-muted-foreground" />}<span className="flex-1">{r.label}</span>{r.note && <span className="text-xs text-muted-foreground">{r.note}</span>}</div>
        ))}
        <button onClick={() => { setJoined(true); s.notify("ऑनबोर्डिंग शुरू (डेमो) 🎉"); }} disabled={joined} className={`${btnPrimary} mt-4 w-full disabled:opacity-50`}>{joined ? "✓ आवेदन दर्ज (डेमो)" : "मुफ़्त में क्रिएटर बनें"}</button>
        {!eligible && <p className="mt-2 text-xs text-muted-foreground">आप अभी जुड़ सकते हैं; बाकी शर्तें पूरी होने पर कमाई के टूल खुलेंगे।</p>}
      </section>
      <section className="m-4 rounded-2xl border border-warning/40 bg-warning/10 p-4 text-sm text-warning">
        💰 पेआउट: डेमो-ओनली। कोई भुगतान प्रदाता जुड़ा नहीं है और कोई असली पैसा नहीं भेजा जाता।
      </section>
    </Screen>
  );
}
