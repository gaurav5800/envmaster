import { describe, it, expect } from "vitest";
import { lintEnv } from "../src/core/linter";

describe("lintEnv", () => {
  it("detects spaces around '='", () => {
    const content = `
DATABASE_URL = mysql
JWT_SECRET=abc
`;

    const issues = lintEnv(content);

    expect(issues).toHaveLength(1);
    expect(issues[0].message).toBe("Remove spaces around '='");
  });


  it("detects lowercase variable names", () => {
  const content = `
database_url=test
JWT_SECRET=abc
`;

  const issues = lintEnv(content);

  expect(issues).toHaveLength(1);
  expect(issues[0].message).toBe("Variable name should be UPPER_CASE");
});

it("detects invalid variable names", () => {
  const content = `
API KEY=test
`;

  const issues = lintEnv(content);

  expect(issues).toHaveLength(1);
  expect(issues[0].message).toBe("Invalid variable name");
});


it("detects variable names starting with numbers", () => {
  const content = `
123TOKEN=test
`;

  const issues = lintEnv(content);

  expect(issues).toHaveLength(1);
  expect(issues[0].message).toBe("Invalid variable name");
});


it("detects empty values", () => {
  const content = `
DATABASE_URL=
JWT_SECRET=abc
`;

  const issues = lintEnv(content);

  expect(issues).toHaveLength(1);
  expect(issues[0].message).toBe("Empty value");
});

it("detects duplicate variables", () => {
  const content = `
API_KEY=123
JWT_SECRET=abc
API_KEY=456
`;

  const issues = lintEnv(content);

  expect(issues).toHaveLength(1);
  expect(issues[0].message).toBe("Duplicate variable");
});




});