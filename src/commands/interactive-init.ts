import chalk from "chalk";
import { input, checkbox } from "@inquirer/prompts";
import { writeFile } from "../services/env.service";
export async function interactiveInitCommand() {
  console.clear();

  console.log(chalk.green.bold("🚀 Welcome to EnvMaster\n"));

  const projectName = await input({
    message: "Project name:",
    default: "my-app",
  });
const variables = await checkbox({
  message: "Select environment variables",
  choices: [
    {
      name: "DATABASE_URL",
      value: "DATABASE_URL",
      checked: true,
    },
    {
      name: "JWT_SECRET",
      value: "JWT_SECRET",
      checked: true,
    },
    {
      name: "API_KEY",
      value: "API_KEY",
      checked: true,
    },
    {
      name: "PORT",
      value: "PORT",
      checked: true,
    },
    {
      name: "APP_ENV",
      value: "APP_ENV",
      checked: true,
    },
    {
      name: "APP_NAME",
      value: "APP_NAME",
      checked: true,
    },
  ],
});
  console.log();

console.log(chalk.green("Project:"), projectName);

console.log();

console.log(chalk.cyan("Selected Variables"));

variables.forEach((v) => {
  console.log("✓", v);
});

const template = variables
  .map((variable) => `${variable}=`)
  .join("\n");

  const envCreated = writeFile(".env", template);

const exampleCreated = writeFile(".env.example", template);

console.log();

if (envCreated) {
  console.log(chalk.green("✓ Created .env"));
} else {
  console.log(chalk.yellow("⚠ .env already exists"));
}

if (exampleCreated) {
  console.log(chalk.green("✓ Created .env.example"));
} else {
  console.log(chalk.yellow("⚠ .env.example already exists"));
}

console.log();
console.log(chalk.green.bold("🎉 Project initialized successfully!"));
}