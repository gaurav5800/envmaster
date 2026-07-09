#!/usr/bin/env node

// src/index.ts
import { Command } from "commander";

// src/commands/doctor.ts
import chalk from "chalk";

// src/core/parser.ts
import fs from "fs";
function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const content = fs.readFileSync(filePath, "utf8");
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
import fs2 from "fs";
import path from "path";
function fileExists(fileName) {
  return fs2.existsSync(path.join(process.cwd(), fileName));
}

// src/commands/doctor.ts
function doctorCommand() {
  console.log(chalk.blue("\n\u{1F50D} Running diagnostics...\n"));
  const envExists = fileExists(".env");
  const exampleExists = fileExists(".env.example");
  console.log(
    envExists ? chalk.green("\u2705 .env found") : chalk.red("\u274C .env not found")
  );
  console.log(
    exampleExists ? chalk.green("\u2705 .env.example found") : chalk.red("\u274C .env.example not found")
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
  console.log(chalk.bold("\nSummary"));
  console.log(chalk.green(`${passed} passed`));
  console.log(chalk.red(`${failed} failed
`));
  process.exit(failed ? 1 : 0);
}

// src/commands/sync.ts
import chalk2 from "chalk";

// src/core/writer.ts
import fs3 from "fs";
function writeEnvExample(filePath, variables) {
  const content = variables.map((v) => `${v.key}=`).join("\n");
  fs3.writeFileSync(filePath, content);
}

// src/commands/sync.ts
function syncCommand() {
  console.log(chalk2.blue("\n\u{1F504} Syncing .env.example...\n"));
  const envVariables = parseEnvFile(".env");
  const exampleVariables = parseEnvFile(".env.example");
  const comparison = compareEnvFiles(
    envVariables,
    exampleVariables
  );
  if (comparison.missingInExample.length === 0) {
    console.log(chalk2.green("\u2705 .env.example is already up to date."));
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
  console.log(chalk2.green("\n\u2705 .env.example updated successfully!"));
}

// src/index.ts
var program = new Command();
program.name("envmaster").description("A modern CLI to validate, generate and manage .env files.").version("0.1.0");
program.command("sync").description("Sync .env.example with .env").action(syncCommand);
program.command("doctor").description("Run environment diagnostics").action(doctorCommand);
program.parse();
