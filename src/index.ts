#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("envmaster")
  .description("A modern CLI to validate, generate and manage .env files.")
  .version("0.1.0");

program
  .command("doctor")
  .description("Run environment diagnostics")
  .action(() => {
    console.log("🟢 EnvMaster");
    console.log("Running environment diagnostics...");
  });

program.parse();