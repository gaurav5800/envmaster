import chalk from "chalk";
import { parseEnvFile } from "../core/parser";
import { writeEnvExample } from "../core/writer";

export function generateCommand() {
  console.log(chalk.blue("\n⚙️ Generating .env.example...\n"));

  const variables = parseEnvFile(".env");

  if (variables.length === 0) {
    console.log(chalk.red("❌ .env not found or empty.\n"));
    process.exit(1);
  }

  writeEnvExample(".env.example", variables);

  console.log(chalk.green("✅ .env.example generated successfully!\n"));
}