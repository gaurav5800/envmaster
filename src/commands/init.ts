import chalk from "chalk";
 import { writeFile } from "../services/env.service";
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

envCreated = writeFile(
  ".env",
  DEFAULT_ENV_TEMPLATE,
  options.force
);

if (envCreated) {
  console.log(chalk.green("✓ Created .env"));
} else {
  console.log(chalk.yellow("⚠ .env already exists (skipped)"));
}

 exampleCreated = writeFile(
  ".env.example",
  DEFAULT_ENV_TEMPLATE,
  options.force
);

if (exampleCreated) {
  console.log(chalk.green("✓ Created .env.example"));
} else {
  console.log(chalk.yellow("⚠ .env.example already exists (skipped)"));
}

if (envCreated || exampleCreated) {
  console.log(chalk.green("\nInitialization complete.\n"));
} else {
  console.log(chalk.yellow("\nNothing was created.\n"));
}
}