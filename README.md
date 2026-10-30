# SamiraReel (समीरा रील)

**आपकी दुनिया, आपकी रील! 🇮🇳**

A Hindi-first, mobile-first photo and reel sharing web app built with **TanStack Start (React 19) + Vite + Tailwind CSS v4**.

> ⚠️ **This is a frontend demo.** There is no backend. Everything below marked "demo / local-only" runs entirely in your browser and never contacts a real provider.

---

## Run it locally (free)

Requirements: **Node.js 22.12+** (use a current Node 22 LTS release) and npm, or [Bun](https://bun.sh) 1.1+ (free). Capacitor 8 needs Node 22+, and the installed Vite version needs at least 22.12 on the Node 22 line.

```bash
bun install        # install dependencies
bun run dev        # start dev server → http://localhost:8080
bun run build      # production build
bunx vitest run    # run tests
bunx eslint src    # lint
```

No account, API key, database or paid service is needed to run the app.

Equivalent npm commands (there is a committed `bun.lock`, not a committed npm lockfile):

```bash
npm install
npm run dev -- --port 8080
npm run build
npm test
npm run lint
```

For reproducible Bun installation use `bun install --frozen-lockfile`. Outside Lovable, `bun run dev` / `npm run dev` may default to port 5173; pass `-- --port 8080` to npm as above to select port 8080 explicitly.

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

**Prepared for a free local Capacitor build; no APK has been built.** No hosted website, billing, account, API key, database, or paid service is needed. The ordinary `npm run build` web build is unchanged.

Added Capacitor **8.6.0** (`core`, `android`, and development-only `cli`), `capacitor.config.ts`, and a separate `vite.capacitor.config.ts`. The Android build produces a TanStack SPA shell at **`dist/android/client/index.html`** and its assets. Capacitor copies only that client directory; the temporary server build is not packaged or run on Android. There is no `server.url`, remote app wrapper, or new authentication implementation.

The initial application ID is `app.samirareel.android` and the display name is **SamiraReel**. The identifier is a local packaging default, not proof of domain ownership or a Play Store registration. If you need a different permanent ID, edit it **before** generating `android/`; changing it later requires native-project changes.

### Free local prerequisites

1. Install Node.js **22.12+** and npm.
2. Install the current stable **Android Studio** from [developer.android.com/studio](https://developer.android.com/studio). Capacitor 8 requires **Android Studio Otter 2025.2.1 or newer**, with **JDK 21** (the bundled runtime is suitable).
3. In Android Studio → **More Actions → SDK Manager** (or **Settings → Languages & Frameworks → Android SDK**), install **Android SDK Platform 36**, **SDK Build-Tools 36.x**, **Android SDK Platform-Tools**, and **Android SDK Command-line Tools (latest)**. Accept the SDK licenses. Let Android Studio download the Gradle version selected by the generated project; a separate global Gradle install is unnecessary.
4. For testing, create an emulator in **Device Manager**, or enable **Developer options → USB debugging** on a real Android phone and connect it by USB.

The current sandbox has no Java/Android SDK/Gradle toolchain. Native project generation and APK compilation are left to your local computer. `cap add android` itself normally only needs Node and the installed Capacitor packages, not Java; compilation requires the complete Android toolchain above. The generated native project is not included in this preparation pass.

### Generate the Android project once

From the exported project folder:

```bash
npm install
npm run build:android
# Confirm dist/android/client/index.html exists before continuing.
npm run android:add
npm run android:sync
npm run android:open
```

Run `android:add` **only once** when `android/` does not yet exist. Do not delete an existing native project to repeat setup. `android:sync` rebuilds the bundled demo and updates the existing native project; it does not build an APK. Keep the generated Android source and Gradle wrapper in your local repository, but not SDK paths, build output, signing keys, or copied web assets. Before committing native files, add these exclusions to your local root `.gitignore` (the sandbox's root `.gitignore` is managed/read-only):

```gitignore
android/.gradle/
android/.kotlin/
android/local.properties
android/**/build/
android/app/src/main/assets/public/
android/app/src/main/assets/capacitor.config.json
android/app/src/main/assets/capacitor.plugins.json
*.apk
*.aab
*.jks
*.keystore
```

### Build a debug APK in Android Studio

1. Open the generated **`android/`** folder (the `android:open` command does this).
2. Wait for Gradle sync. Use Android Studio's bundled **JDK 21** in **Settings → Build, Execution, Deployment → Build Tools → Gradle**. If asked for the SDK location, select the installed SDK; Android Studio creates `android/local.properties`.
3. Select the **debug** build variant, then **Build → Generate App Bundles or APKs → Generate APKs** (some versions label this **Build Bundle(s) / APK(s) → Build APK(s)**).
4. The debug APK is normally **`android/app/build/outputs/apk/debug/app-debug.apk`**. Use the displayed **Locate** link to confirm it exists. Debug signing is automatic and free; this is a test APK, not a release upload.
5. Run on a phone/emulator using Android Studio's **Run** button, or install the APK using `adb install -r android/app/build/outputs/apk/debug/app-debug.apk` when the device is connected and authorized.

Optional terminal build after Android Studio has configured JDK/SDK:

```bash
# macOS / Linux, from the project root
cd android
./gradlew assembleDebug

# Windows PowerShell, from the project root instead
# Set-Location android
# .\gradlew.bat assembleDebug
```

After web changes, run `npm run android:sync`, then rebuild the APK. Never add production signing keys or passwords to source control. Local debug APK creation and sideloading are free; Google Play distribution has a separate developer registration fee and is not configured here.

### Android limitations and branding

- The HTML/app code is bundled locally; existing remote sample photos, videos, and Google Fonts still need an internet connection. This is **not** a fully offline media package.
- Data is saved only in the Android WebView's local storage, separate from your desktop browser. Clearing app data or uninstalling loses it. No cloud sync or secure account exists.
- OTP, Google sign-in, AI, messages, calls, live streams, and payouts remain the existing **demo-only** experiences. Packaging does not send SMS, start OAuth, deliver messages, call providers, broadcast video, or pay anyone.
- Android hardware Back, file picking, sharing/clipboard, keyboard layout, safe areas, and media behavior must be tested on an actual emulator/device; no native camera, push, secure-auth, or other feature plugins are added.
- The original logo remains unavailable; the documented `LOGO_URL` integration point above is preserved unchanged. No logo or launcher icon has been created or substituted in this pass. `cap add android` supplies stock template launcher assets locally: these are **not** your logo and must not be presented as final branding. Replace them only with owner-approved launcher assets; do not crop/recolor/redesign the original logo.
- Neither the Android-specific production bundle nor a native APK should be described as verified until the commands above complete and the app runs on a device.

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
capacitor.config.ts      Android identifier, name, and local webDir
vite.capacitor.config.ts separate bundled SPA build for Android
```
