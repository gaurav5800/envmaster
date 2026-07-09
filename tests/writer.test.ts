import { describe, it, expect } from "vitest";
import fs from "fs";
import { writeEnvExample } from "../src/core/writer";

describe("writeEnvExample", () => {
  it("writes env variables", () => {
    writeEnvExample("writer.env", [
      { key: "DATABASE_URL", value: "" },
      { key: "JWT_SECRET", value: "" },
    ]);

    const content = fs.readFileSync("writer.env", "utf8");

    expect(content).toContain("DATABASE_URL=");
    expect(content).toContain("JWT_SECRET=");

    fs.unlinkSync("writer.env");
  });
});