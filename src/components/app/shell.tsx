import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Film, PlusSquare, Compass, User, Heart, MessageCircle, Languages } from "lucide-react";
import type { ReactNode } from "react";
import { useStore } from "@/lib/store";
import { LOGO_URL, APP_NAME_HI } from "@/lib/brand";

export function Logo({ className = "" }: { className?: string }) {
  if (LOGO_URL) return <img src={LOGO_URL} alt="SamiraReel" className={`h-8 w-auto ${className}`} />;
  return <span className={`font-display text-2xl font-bold text-brand ${className}`}>{APP_NAME_HI}</span>;
}

export function DemoBadge({ children = "डेमो" }: { children?: ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-warning/50 bg-warning/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warning">⚠ {children}</span>;
}

export function Avatar({ src, size = 40, ring = false }: { src: string; size?: number; ring?: boolean }) {
  const im = <img src={src} alt="" width={size} height={size} className="rounded-full border-2 border-background object-cover" style={{ width: size, height: size }} />;
  return ring ? <span className="story-ring inline-block">{im}</span> : im;
}

export function TopBar({ title, right }: { title?: ReactNode; right?: ReactNode }) {
  const { lang, setLang } = useStore();
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background/90 px-4 py-3 backdrop-blur">
      {title ?? <Logo />}
      <div className="flex items-center gap-3">
        {right}
        <button aria-label="Language" onClick={() => setLang(lang === "hi" ? "en" : "hi")} className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs font-semibold">
          <Languages className="h-3.5 w-3.5" />{lang === "hi" ? "EN" : "हि"}
        </button>
      </div>
    </header>
  );
}

export function HomeActions() {
  return (
    <>
      <Link to="/notifications" aria-label="Notifications"><Heart className="h-6 w-6" /></Link>
      <Link to="/messages" aria-label="Messages"><MessageCircle className="h-6 w-6" /></Link>
    </>
  );
}

const NAV = [
  { to: "/", icon: Home, k: "home" },
  { to: "/reels", icon: Film, k: "reels" },
  { to: "/create", icon: PlusSquare, k: "create" },
  { to: "/explore", icon: Compass, k: "explore" },
  { to: "/profile", icon: User, k: "profile" },
] as const;

export function Screen({ children, nav = true }: { children: ReactNode; nav?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { t, toast } = useStore();
  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-20 shadow-2xl md:border-x">
      {children}
      {toast && <div className="fixed left-1/2 top-16 z-50 -translate-x-1/2 rounded-full bg-popover px-4 py-2 text-sm shadow-glow">{toast}</div>}
      {nav && (
        <nav className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-md -translate-x-1/2 justify-around border-t bg-background/95 py-2 backdrop-blur">
          {NAV.map(({ to, icon: Icon, k }) => {
            const active = path === to;
            return (
              <Link key={to} to={to} className={`flex flex-col items-center gap-0.5 text-[10px] ${active ? "text-primary" : "text-muted-foreground"}`}>
                <Icon className="h-6 w-6" strokeWidth={active ? 2.5 : 1.8} />{t(k)}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button onClick={() => onChange(!on)} className="flex w-full items-center justify-between py-3 text-left" aria-pressed={on}>
      <span className="text-sm">{label}</span>
      <span className={`relative h-6 w-11 rounded-full transition ${on ? "bg-primary" : "bg-secondary"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-all ${on ? "left-5" : "left-0.5"}`} />
      </span>
    </button>
  );
}

export const btn = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition active:scale-95";
export const btnPrimary = `${btn} bg-brand text-primary-foreground shadow-glow`;
export const btnGhost = `${btn} bg-secondary text-secondary-foreground`;
