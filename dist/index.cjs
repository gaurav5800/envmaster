#!/usr/bin/env node
"use strict";

// src/index.ts
var import_commander = require("commander");
var program = new import_commander.Command();
program.name("envmaster").description("A modern CLI to validate, generate and manage .env files.").version("0.1.0");
program.command("doctor").description("Run environment diagnostics").action(() => {
  console.log("\u{1F7E2} EnvMaster");
  console.log("Running environment diagnostics...");
});
program.parse();
