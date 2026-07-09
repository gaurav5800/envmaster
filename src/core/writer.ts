import fs from "fs";
import { EnvVariable } from "./parser";

export function writeEnvExample(
  filePath: string,
  variables: EnvVariable[]
) {
  const content = variables
    .map((v) => `${v.key}=`)
    .join("\n");

  fs.writeFileSync(filePath, content);
}