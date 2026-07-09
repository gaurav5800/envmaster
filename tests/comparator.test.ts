import { describe, it, expect } from "vitest";
import { compareEnvFiles } from "../src/core/comparator";

describe("compareEnvFiles", () => {
  it("detects missing variables", () => {
    const env = [
      { key: "DATABASE_URL", value: "" },
      { key: "JWT_SECRET", value: "" },
    ];

    const example = [
      { key: "DATABASE_URL", value: "" },
    ];

    const result = compareEnvFiles(env, example);

    expect(result.missingInExample).toEqual(["JWT_SECRET"]);
    expect(result.extraInExample).toEqual([]);
  });

  it("detects extra variables", () => {
    const env = [
      { key: "DATABASE_URL", value: "" },
    ];

    const example = [
      { key: "DATABASE_URL", value: "" },
      { key: "OLD_KEY", value: "" },
    ];

    const result = compareEnvFiles(env, example);

    expect(result.extraInExample).toEqual(["OLD_KEY"]);
  });

  it("returns no differences", () => {
    const env = [
      { key: "DATABASE_URL", value: "" },
    ];

    const example = [
      { key: "DATABASE_URL", value: "" },
    ];

    const result = compareEnvFiles(env, example);

    expect(result.missingInExample).toEqual([]);
    expect(result.extraInExample).toEqual([]);
  });
});