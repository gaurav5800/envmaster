import fs from "fs";
import chalk from "chalk";
import { lintEnv } from "../core/linter";

export function lintCommand() {
  console.log(chalk.blue("\n🔍 Linting .env...\n"));

  if (!fs.existsSync(".env")) {
    console.log(chalk.red("❌ .env file not found.\n"));
    process.exit(1);
  }

  const content = fs.readFileSync(".env", "utf8");

  const issues = lintEnv(content);

  if (issues.length === 0) {
    console.log(chalk.green("✅ No lint issues found.\n"));
    return;
  }

  issues.forEach((issue) => {
    console.log(
      chalk.red(`❌ Line ${issue.line}: ${issue.message}`)
    );
  });

  console.log(
    chalk.yellow(`\nFound ${issues.length} issue(s).\n`)
  );

  process.exit(1);
}