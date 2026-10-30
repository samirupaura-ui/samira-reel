import { describe, expect, it } from "vitest";
import { parseDemo } from "@/lib/persist";

const valid = { lang: "en", authed: true, phone: "9876543210", posts: [], chats: [], privacy: { hideLikes: true }, liked: ["p1"], saved: [], following: ["u1"], blocked: ["u2"] };

describe("demo persistence", () => {
  it("restores saved likes, follows, blocks and language", () => {
    const d = parseDemo(JSON.stringify(valid))!;
    expect(d.lang).toBe("en");
    expect(d.liked).toEqual(["p1"]);
    expect(d.blocked).toEqual(["u2"]);
    expect(d.privacy["hideLikes"]).toBe(true);
  });
  it("ignores corrupt or tampered storage", () => {
    expect(parseDemo("{not json")).toBeNull();
    expect(parseDemo(JSON.stringify({ ...valid, lang: "fr" }))).toBeNull();
    expect(parseDemo(JSON.stringify({ ...valid, liked: [1] }))).toBeNull();
  });
});
