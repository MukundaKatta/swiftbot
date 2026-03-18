import { describe, it, expect } from "vitest";
import { Swiftbot } from "../src/core.js";
describe("Swiftbot", () => {
  it("init", () => { expect(new Swiftbot().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Swiftbot(); await c.manage(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Swiftbot(); await c.manage(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
