import { describe, expect, it } from "vitest";
import config from "../../capacitor.config";

describe("Android demo packaging", () => {
  it("bundles the local demo instead of connecting to a hosted provider", () => {
    expect(config.webDir).toBe("dist/android/client");
    expect(config.server?.url).toBeUndefined();
    expect(config.server?.cleartext).not.toBe(true);
  });
});