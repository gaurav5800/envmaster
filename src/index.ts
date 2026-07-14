#!/usr/bin/env node

import { Command } from "commander";
import { doctorCommand } from "./commands/doctor";
 import { syncCommand } from "./commands/sync";
import { validateCommand } from "./commands/validate";
 import { initCommand } from "./commands/init";
 import { generateCommand } from "./commands/generate";
import { secretsCommand } from "./commands/secrets";
import { lintCommand } from "./commands/lint";
import { interactiveInitCommand } from "./commands/interactive-init";
const program = new Command();
program
  .command("init")
  .description("Initialize a new environment setup")
  .option("-f, --force", "Overwrite existing files")
  .action(initCommand);
program
  .name("envmaster")
  .description("A modern CLI to validate, generate and manage .env files.")
  .version("0.1.0");



program.addHelpText(
  "after",
  `

Examples:

  $ envmaster init
  $ envmaster init --force
  $ envmaster doctor
  $ envmaster validate
  $ envmaster sync
  $ envmaster generate
`
);
program
  .command("sync")
  .description("Sync .env.example with .env")
  .action(syncCommand);
program
  .command("validate")
  .description("Validate .env file")
  .action(validateCommand);
  program
  .command("doctor")
  .description("Run environment diagnostics")
  .action(doctorCommand);

program
  .command("generate")
  .description("Generate .env.example from .env")
  .action(generateCommand);

program
  .command("secrets")
  .description("Scan .env.example for exposed secrets")
  .action(secretsCommand);

  program
  .command("lint")
  .description("Lint .env file for common issues")
  .action(lintCommand);


program
  .command("initx")
  .description("Interactive project initialization")
  .action(interactiveInitCommand);

program.parse();