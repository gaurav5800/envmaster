import { describe, it, expect } from "vitest";
import fs from "fs";
import { parseEnvFile } from "../src/core/parser";

describe("parseEnvFile", () => {
  it("should parse env variables", () => {
    fs.writeFileSync(
      "temp.env",
      `DATABASE_URL=test
JWT_SECRET=123
EMPTY=`
    );

    const vars = parseEnvFile("temp.env");

    expect(vars).toHaveLength(3);
    expect(vars[0].key).toBe("DATABASE_URL");
    expect(vars[0].value).toBe("test");

    expect(vars[1].key).toBe("JWT_SECRET");
    expect(vars[1].value).toBe("123");

    expect(vars[2].key).toBe("EMPTY");
    expect(vars[2].value).toBe("");

    fs.unlinkSync("temp.env");
  });
});