import chalk from "chalk";
import { parseEnvFile } from "../core/parser";
import { compareEnvFiles } from "../core/comparator";
import { writeEnvExample } from "../core/writer";

export function syncCommand() {
  console.log(chalk.blue("\n🔄 Syncing .env.example...\n"));

  const envVariables = parseEnvFile(".env");
  const exampleVariables = parseEnvFile(".env.example");

  const comparison = compareEnvFiles(
    envVariables,
    exampleVariables
  );

  if (comparison.missingInExample.length === 0) {
    console.log(chalk.green("✅ .env.example is already up to date."));
    return;
  }

  console.log("Adding missing keys:");

  comparison.missingInExample.forEach((key) => {
    console.log(`+ ${key}`);
  });

  const updatedVariables = [
    ...exampleVariables,
    ...comparison.missingInExample.map((key) => ({
      key,
      value: "",
    })),
  ];

  writeEnvExample(".env.example", updatedVariables);

  console.log(chalk.green("\n✅ .env.example updated successfully!"));
}