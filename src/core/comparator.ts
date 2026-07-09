import { EnvVariable } from "./parser";

export interface ComparisonResult {
  missingInExample: string[];
  extraInExample: string[];
}

export function compareEnvFiles(
  env: EnvVariable[],
  example: EnvVariable[]
): ComparisonResult {
  const envKeys = new Set(env.map(v => v.key));
  const exampleKeys = new Set(example.map(v => v.key));

  return {
    missingInExample: [...envKeys].filter(key => !exampleKeys.has(key)),
    extraInExample: [...exampleKeys].filter(key => !envKeys.has(key)),
  };
}