#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_commander = require("commander");

// src/commands/doctor.ts
var import_chalk = __toESM(require("chalk"), 1);

// src/core/parser.ts
var import_fs = __toESM(require("fs"), 1);
function parseEnvFile(filePath) {
  if (!import_fs.default.existsSync(filePath)) {
    return [];
  }
  const content = import_fs.default.readFileSync(filePath, "utf8");
  return content.split("\n").map((line) => line.trim()).filter(
    (line) => line && !line.startsWith("#") && line.includes("=")
  ).map((line) => {
    const [key, ...value] = line.split("=");
    return {
      key: key.trim(),
      value: value.join("=").trim()
    };
  });
}

// src/core/comparator.ts
function compareEnvFiles(env, example) {
  const envKeys = new Set(env.map((v) => v.key));
  const exampleKeys = new Set(example.map((v) => v.key));
  return {
    missingInExample: [...envKeys].filter((key) => !exampleKeys.has(key)),
    extraInExample: [...exampleKeys].filter((key) => !envKeys.has(key))
  };
}

// src/services/env.service.ts
var import_fs2 = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
function fileExists(fileName) {
  return import_fs2.default.existsSync(import_path.default.join(process.cwd(), fileName));
}

// src/commands/doctor.ts
function doctorCommand() {
  console.log(import_chalk.default.blue("\n\u{1F50D} Running diagnostics...\n"));
  const envExists = fileExists(".env");
  const exampleExists = fileExists(".env.example");
  console.log(
    envExists ? import_chalk.default.green("\u2705 .env found") : import_chalk.default.red("\u274C .env not found")
  );
  console.log(
    exampleExists ? import_chalk.default.green("\u2705 .env.example found") : import_chalk.default.red("\u274C .env.example not found")
  );
  if (!envExists) {
    process.exit(1);
  }
  const envVariables = parseEnvFile(".env");
  const exampleVariables = exampleExists ? parseEnvFile(".env.example") : [];
  console.log("\n\u{1F4E6} Variables found:");
  if (envVariables.length === 0) {
    console.log("No variables found.");
  } else {
    envVariables.forEach((variable) => {
      console.log(`  \u2022 ${variable.key}`);
    });
  }
  if (exampleExists) {
    const comparison = compareEnvFiles(envVariables, exampleVariables);
    if (comparison.missingInExample.length > 0) {
      console.log("\n\u274C Missing from .env.example:");
      comparison.missingInExample.forEach((key) => {
        console.log(`  \u2022 ${key}`);
      });
    }
    if (comparison.extraInExample.length > 0) {
      console.log("\n\u26A0\uFE0F Extra in .env.example:");
      comparison.extraInExample.forEach((key) => {
        console.log(`  \u2022 ${key}`);
      });
    }
  }
  const passed = [envExists, exampleExists].filter(Boolean).length;
  const failed = 2 - passed;
  console.log(import_chalk.default.bold("\nSummary"));
  console.log(import_chalk.default.green(`${passed} passed`));
  console.log(import_chalk.default.red(`${failed} failed
`));
  process.exit(failed ? 1 : 0);
}

// src/commands/sync.ts
var import_chalk2 = __toESM(require("chalk"), 1);

// src/core/writer.ts
var import_fs3 = __toESM(require("fs"), 1);
function writeEnvExample(filePath, variables) {
  const content = variables.map((v) => `${v.key}=`).join("\n");
  import_fs3.default.writeFileSync(filePath, content);
}

// src/commands/sync.ts
function syncCommand() {
  console.log(import_chalk2.default.blue("\n\u{1F504} Syncing .env.example...\n"));
  const envVariables = parseEnvFile(".env");
  const exampleVariables = parseEnvFile(".env.example");
  const comparison = compareEnvFiles(
    envVariables,
    exampleVariables
  );
  if (comparison.missingInExample.length === 0) {
    console.log(import_chalk2.default.green("\u2705 .env.example is already up to date."));
    return;
  }
  console.log("Adding missing keys:");
  comparison.missingInExample.forEach((key) => {
    console.log(`+ ${key}`);
  });
  const updatedVariables = [
    ...exampleVariables,
    ...comparison.missingInExample.map((key) => ({
      key,
      value: ""
    }))
  ];
  writeEnvExample(".env.example", updatedVariables);
  console.log(import_chalk2.default.green("\n\u2705 .env.example updated successfully!"));
}

// src/commands/validate.ts
var import_chalk3 = __toESM(require("chalk"), 1);

// src/core/validator.ts
var ENV_NAME_REGEX = /^[A-Z_][A-Z0-9_]*$/;
function validateVariables(variables) {
  const errors = [];
  const seen = /* @__PURE__ */ new Set();
  for (const variable of variables) {
    if (seen.has(variable.key)) {
      errors.push({
        key: variable.key,
        message: "Duplicate key"
      });
      continue;
    }
    seen.add(variable.key);
    if (!ENV_NAME_REGEX.test(variable.key)) {
      errors.push({
        key: variable.key,
        message: "Invalid variable name"
      });
      continue;
    }
    if (variable.value === "") {
      errors.push({
        key: variable.key,
        message: "Empty value"
      });
    }
  }
  return errors;
}

// src/commands/validate.ts
function validateCommand() {
  console.log(import_chalk3.default.blue("\n\u{1F50D} Validating .env file...\n"));
  const variables = parseEnvFile(".env");
  const errors = validateVariables(variables);
  if (errors.length > 0) {
    console.log(import_chalk3.default.red("Validation Errors:\n"));
    errors.forEach((error) => {
      console.log(import_chalk3.default.red(`\u2717 ${error.key}: ${error.message}`));
    });
    console.log(import_chalk3.default.red("\nValidation failed.\n"));
    process.exit(1);
  }
  console.log(import_chalk3.default.green("\u2713 Validation passed.\n"));
  console.log(import_chalk3.default.green("\nValidation passed.\n"));
}

// src/index.ts
var program = new import_commander.Command();
program.name("envmaster").description("A modern CLI to validate, generate and manage .env files.").version("0.1.0");
program.command("sync").description("Sync .env.example with .env").action(syncCommand);
program.command("validate").description("Validate .env file").action(validateCommand);
program.command("doctor").description("Run environment diagnostics").action(doctorCommand);
program.parse();
