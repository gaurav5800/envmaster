#!/usr/bin/env node

import { Command } from "commander";
import { doctorCommand } from "./commands/doctor";
const program = new Command();

program
  .name("envmaster")
  .description("A modern CLI to validate, generate and manage .env files.")
  .version("0.1.0");




  program
  .command("doctor")
  .description("Run environment diagnostics")
  .action(doctorCommand);


program.parse();