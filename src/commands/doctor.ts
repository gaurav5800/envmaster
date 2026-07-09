import chalk from "chalk";
import { parseEnvFile } from "../core/parser";
import { compareEnvFiles } from "../core/comparator";
import { fileExists } from "../services/env.service";

export function doctorCommand() {
  console.log(chalk.blue("\n🔍 Running diagnostics...\n"));

  const envExists = fileExists(".env");
  const exampleExists = fileExists(".env.example");

  console.log(
    envExists
      ? chalk.green("✅ .env found")
      : chalk.red("❌ .env not found")
  );

  console.log(
    exampleExists
      ? chalk.green("✅ .env.example found")
      : chalk.red("❌ .env.example not found")
  );

  if (!envExists) {
    process.exit(1);
  }

  const envVariables = parseEnvFile(".env");
  const exampleVariables = exampleExists
    ? parseEnvFile(".env.example")
    : [];

  console.log("\n📦 Variables found:");

  if (envVariables.length === 0) {
    console.log("No variables found.");
  } else {
    envVariables.forEach((variable) => {
      console.log(`  • ${variable.key}`);
    });
  }

  if (exampleExists) {
    const comparison = compareEnvFiles(envVariables, exampleVariables);

    if (comparison.missingInExample.length > 0) {
      console.log("\n❌ Missing from .env.example:");

      comparison.missingInExample.forEach((key) => {
        console.log(`  • ${key}`);
      });
    }

    if (comparison.extraInExample.length > 0) {
      console.log("\n⚠️ Extra in .env.example:");

      comparison.extraInExample.forEach((key) => {
        console.log(`  • ${key}`);
      });
    }
  }

  const passed = [envExists, exampleExists].filter(Boolean).length;
  const failed = 2 - passed;

  console.log(chalk.bold("\nSummary"));
  console.log(chalk.green(`${passed} passed`));
  console.log(chalk.red(`${failed} failed\n`));

  process.exit(failed ? 1 : 0);
}