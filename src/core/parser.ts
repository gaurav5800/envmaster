import fs from "fs";

export interface EnvVariable {
  key: string;
  value: string;
}

export function parseEnvFile(filePath: string): EnvVariable[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, "utf8");

  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        line &&
        !line.startsWith("#") &&
        line.includes("=")
    )
    .map((line) => {
      const [key, ...value] = line.split("=");

      return {
        key: key.trim(),
        value: value.join("=").trim(),
      };
    });
}