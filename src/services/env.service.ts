import fs from "fs";
import path from "path";

export function fileExists(fileName: string): boolean {
  return fs.existsSync(path.join(process.cwd(), fileName));
}