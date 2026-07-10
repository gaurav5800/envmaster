import chalk from "chalk";
import fs from "fs";
const DEFAULT_ENV_TEMPLATE = `# Application
APP_NAME=
APP_ENV=development
PORT=3000

# Database
DATABASE_URL=

# Authentication
JWT_SECRET=

# API
API_KEY=
`;
export function initCommand(options: { force?: boolean })  {
  console.log(chalk.blue("\n🚀 Initializing EnvMaster...\n"));
let envCreated = false;
let exampleCreated = false;

if (!fs.existsSync(".env") || options.force) {
    fs.writeFileSync(".env", DEFAULT_ENV_TEMPLATE);
    console.log(chalk.green("✓ Created .env"));
    envCreated = true;
} else {
    console.log(chalk.yellow("⚠ .env already exists (skipped)"));
}

  if (!fs.existsSync(".env.example") || options.force) {
    fs.writeFileSync(".env.example", DEFAULT_ENV_TEMPLATE);
    console.log(chalk.green("✓ Created .env.example"));
    exampleCreated = true;
} else {
    console.log(chalk.yellow("⚠ .env.example already exists (skipped)"));
}

if (envCreated || exampleCreated) {
  console.log(chalk.green("\nInitialization complete.\n"));
} else {
  console.log(chalk.yellow("\nNothing was created.\n"));
}
}