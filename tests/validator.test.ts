import { describe, it, expect } from "vitest";
import { validateVariables } from "../src/core/validator";

describe("validateVariables", () => {
  it("should return no errors for valid variables", () => {
    const result = validateVariables([
      { key: "DATABASE_URL", value: "mysql://localhost" },
      { key: "JWT_SECRET", value: "secret" },
    ]);

    expect(result).toHaveLength(0);
  });

  it("should detect empty values", () => {
    const result = validateVariables([
      { key: "API_KEY", value: "" },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].message).toBe("Empty value");
  });

  it("should detect duplicate keys", () => {
    const result = validateVariables([
      { key: "API_KEY", value: "123" },
      { key: "API_KEY", value: "456" },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].message).toBe("Duplicate key");
  });

  it("should detect invalid variable names", () => {
    const result = validateVariables([
      { key: "API-KEY", value: "123" },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].message).toBe("Invalid variable name");
  });
});