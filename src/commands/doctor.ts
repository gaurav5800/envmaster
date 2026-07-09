import chalk from "chalk";
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

  const passed = [envExists, exampleExists].filter(Boolean).length;
  const failed = 2 - passed;

  console.log(chalk.bold("\nSummary"));
  console.log(chalk.green(`${passed} passed`));
  console.log(chalk.red(`${failed} failed\n`));

  process.exit(failed ? 1 : 0);
}