#!/usr/bin/env node

// src/index.ts
import { Command } from "commander";
var program = new Command();
program.name("envmaster").description("A modern CLI to validate, generate and manage .env files.").version("0.1.0");
program.command("doctor").description("Run environment diagnostics").action(() => {
  console.log("\u{1F7E2} EnvMaster");
  console.log("Running environment diagnostics...");
});
program.parse();
