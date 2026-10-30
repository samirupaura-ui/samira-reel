import type { CapacitorConfig } from "@capacitor/cli";

// Packaging identifier only; it does not imply a registered domain or Play listing.
const config: CapacitorConfig = {
  appId: "app.samirareel.android",
  appName: "SamiraReel",
  webDir: "dist/android/client",
  // Bundle the demo locally. Never use server.url to load a hosted sign-in app.
};

export default config;
