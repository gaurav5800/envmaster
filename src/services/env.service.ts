import fs from "fs";
import path from "path";

export function fileExists(fileName: string): boolean {
  return fs.existsSync(path.join(process.cwd(), fileName));
}

export function writeFile(
  fileName: string,
  content: string,
  force = false
): boolean {
  const filePath = path.join(process.cwd(), fileName);

  if (fs.existsSync(filePath) && !force) {
    return false;
  }

  fs.writeFileSync(filePath, content);

  return true;
}

export function readFile(fileName: string): string {
  return fs.readFileSync(path.join(process.cwd(), fileName), "utf8");
}