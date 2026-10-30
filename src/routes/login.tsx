import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo, DemoBadge, btnPrimary, btnGhost } from "@/components/app/shell";
import { useStore } from "@/lib/store";
import { TAGLINE } from "@/lib/brand";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "लॉगिन / रजिस्टर — SamiraReel" },
      { name: "description", content: "Sign up or log in to SamiraReel with your +91 Indian mobile number." },
      { property: "og:title", content: "Log in — SamiraReel" },
      { property: "og:description", content: "Join SamiraReel with your +91 number." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

function Login() {
  const s = useStore();
  const nav = useNavigate();
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const valid = /^[6-9]\d{9}$/.test(phone);
  const done = () => { s.setAuthed(true); s.notify("स्वागत है! 🎉 (डेमो)"); nav({ to: "/" }); };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
      <div className="text-center"><Logo className="text-5xl" /><p className="mt-2 text-muted-foreground">{TAGLINE}</p></div>
      <div className="rounded-xl border border-warning/40 bg-warning/10 p-3 text-xs text-warning">⚠ डेमो: OTP SMS और Google साइन-इन अभी असली प्रदाता से जुड़े नहीं हैं। कोई भी 6 अंक (जैसे 123456) काम करेगा।</div>
      {step === "phone" ? (
        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); if (!valid) return setErr("सही 10 अंकों का भारतीय नंबर डालें"); setErr(""); s.setPhone(phone); setStep("otp"); }}>
          <label className="text-sm font-semibold">मोबाइल नंबर</label>
          <div className="flex overflow-hidden rounded-xl bg-secondary">
            <span className="flex items-center gap-1 border-r px-3 text-sm">🇮🇳 +91</span>
            <input inputMode="numeric" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="98765 43210" className="flex-1 bg-transparent px-3 py-3 outline-none" />
          </div>
          {err && <p className="text-xs text-destructive">{err}</p>}
          <button className={`${btnPrimary} w-full`}>OTP भेजें</button>
        </form>
      ) : (
        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); if (otp.length !== 6) return setErr("6 अंकों का OTP डालें"); done(); }}>
          <p className="text-sm">+91 {phone} पर भेजा गया OTP डालें <DemoBadge /></p>
          <input inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="••••••" className="w-full rounded-xl bg-secondary px-3 py-3 text-center text-2xl tracking-[0.5em] outline-none" />
          {err && <p className="text-xs text-destructive">{err}</p>}
          <button className={`${btnPrimary} w-full`}>सत्यापित करें</button>
          <button type="button" onClick={() => setStep("phone")} className="w-full text-xs text-muted-foreground">नंबर बदलें</button>
        </form>
      )}
      <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />या<span className="h-px flex-1 bg-border" /></div>
      <button onClick={done} className={`${btnGhost} w-full`}><span className="font-bold">G</span> Google से जारी रखें <DemoBadge /></button>
      <button onClick={() => nav({ to: "/" })} className="text-sm text-muted-foreground">बिना लॉगिन ब्राउज़ करें →</button>
    </div>
  );
}
