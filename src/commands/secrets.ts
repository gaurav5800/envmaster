import chalk from "chalk";
import { parseEnvFile } from "../core/parser";
import { detectSecrets } from "../core/secrets";

export function secretsCommand() {
  console.log(chalk.blue("\n🔒 Scanning .env.example...\n"));

  const variables = parseEnvFile(".env.example");

  if (variables.length === 0) {
    console.log(chalk.red("❌ .env.example not found or empty.\n"));
    process.exit(1);
  }

  const secrets = detectSecrets(variables);

  if (secrets.length === 0) {
    console.log(chalk.green("✅ No secrets found.\n"));
    return;
  }

  console.log(chalk.red("❌ Possible secrets detected:\n"));

  secrets.forEach((secret) => {
    console.log(`• ${secret.key}`);
  });

  console.log(
    chalk.yellow(`\nFound ${secrets.length} potential secret(s).\n`)
  );

  process.exit(1);
}