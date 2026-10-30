# SamiraReel (समीरा रील)

**आपकी दुनिया, आपकी रील! 🇮🇳**

A Hindi-first, mobile-first photo and reel sharing web app built with **TanStack Start (React 19) + Vite + Tailwind CSS v4**.

> ⚠️ **This is a frontend demo.** There is no backend. Everything below marked "demo / local-only" runs entirely in your browser and never contacts a real provider.

---

## Run it locally (free)

Requirements: [Bun](https://bun.sh) 1.1+ (free). Node.js 20+ also works with `npm`.

```bash
bun install        # install dependencies
bun run dev        # start dev server → http://localhost:8080
bun run build      # production build
bunx vitest run    # run tests
bunx eslint src    # lint
```

No account, API key, database or paid service is needed to run the app.

---

## What works (frontend, sample content)

| Area | Status |
|---|---|
| Five-tab nav: Home, Reels, Create, Explore, Profile | Works |
| Stories viewer, feed, like / double-tap like, comments, save, follow/unfollow | Works, **saved on this device only** |
| Share | Uses your phone's native share sheet or copies a link |
| Create post (photo) | Works, photo is shrunk and **saved on this device only** |
| Explore search + hashtags | Works on sample creators |
| Hindi / English toggle | Menus and buttons; sample content stays mostly Hindi |
| Privacy toggles, block / unblock, report, community safety info | Works locally; reports go nowhere |
| Creator dashboard, transparent eligibility, free onboarding | UI only; stats are samples |
| Reset demo data | Settings → "डेमो डेटा रीसेट करें" |

## Demo-only / not connected (clearly labelled in the app)

| Feature | What actually happens |
|---|---|
| +91 phone OTP login | **Not secure authentication.** No SMS is sent, the number is not verified; any 6 digits are accepted. |
| Google sign-in | Button only. No Google OAuth happens. |
| AI Help & caption suggestions | Pre-written local answers / fixed templates. No AI request is made. |
| Direct & group messages | Stored only in this browser; nothing is delivered to anyone. Replies are automatic samples. |
| Voice / video calls | Prototype screen with a timer. No call is placed. |
| Live streaming | Prototype screen with simulated comments. Nothing is broadcast. |
| Notifications | Sample list. No push notifications. |
| Creator payouts | No payment provider. No money is ever sent or received. |
| Cloud storage / sync | None. Data lives in `localStorage` key `samirareel.demo.v1` on one device. |

Core browsing, reels, chats and calls are designed to stay **free** — no ads, coins, paywalls or watch-to-unlock.

---

## Logo integration point (exact original logo)

The app currently shows the text wordmark "समीरा रील" because the original logo file is **not in this repository**. No substitute logo has been created.

To use the original logo **unchanged**:

1. Put the exact file in `public/` — e.g. `public/logo.png`.
2. In `src/lib/brand.ts` set:
   ```ts
   export const LOGO_URL: string | null = "/logo.png";
   ```
3. It then appears everywhere the wordmark is shown (home header, login screen) via the `Logo` component in `src/components/app/shell.tsx`. It is rendered as a plain `<img>` with its natural aspect ratio — no crop, recolor or frame.

---

## Environment variables

None are required today. When real providers are added, server-only secrets must **never** use the `VITE_` prefix. Placeholders only — do not commit real values:

```bash
# .env (example — not used yet)
# SMS_OTP_PROVIDER_API_KEY=
# GOOGLE_OAUTH_CLIENT_ID=
# AI_PROVIDER_API_KEY=
# REALTIME_CHAT_URL=
# CALLS_PROVIDER_KEY=
# PAYOUT_PROVIDER_KEY=
```

---

## Export / push to GitHub

**From Lovable (recommended):** open the project → **GitHub** button (top-right) → **Connect to GitHub** → authorize → **Create repository**. Lovable then syncs changes both ways automatically.

**Manually from a local copy:**

```bash
git init
git add .
git commit -m "SamiraReel frontend demo"
git branch -M main
git remote add origin https://github.com/<your-username>/samirareel.git
git push -u origin main
```

`node_modules/`, build output and `.env` are already in `.gitignore`.

---

## Android APK

Possible for free, but not built in this repo:

- Publish the web app to a public HTTPS URL, then wrap it with **PWABuilder** (pwabuilder.com) or **Capacitor + Android Studio** on your own computer.
- Side-loading the APK is free. Listing on Google Play needs a one-time developer fee.

---

## Project layout

```
src/lib/brand.ts         name, tagline, LOGO_URL slot
src/lib/data.ts          sample users / posts / reels / chats
src/lib/store.tsx        app state (React context)
src/lib/persist.ts       local-only browser storage
src/components/app/      shell (nav, top bar, badges) and post card
src/routes/              one file per screen
src/test/                vitest tests
```
