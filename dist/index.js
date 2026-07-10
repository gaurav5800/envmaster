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

// src/commands/validate.ts
import chalk3 from "chalk";

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
  console.log(chalk3.blue("\n\u{1F50D} Validating .env file...\n"));
  const variables = parseEnvFile(".env");
  const errors = validateVariables(variables);
  if (errors.length > 0) {
    console.log(chalk3.red("Validation Errors:\n"));
    errors.forEach((error) => {
      console.log(chalk3.red(`\u2717 ${error.key}: ${error.message}`));
    });
    console.log(chalk3.red("\nValidation failed.\n"));
    process.exit(1);
  }
  console.log(chalk3.green("\u2713 Validation passed.\n"));
  console.log(chalk3.green("\nValidation passed.\n"));
}

// src/commands/init.ts
import chalk4 from "chalk";
import fs4 from "fs";
var DEFAULT_ENV_TEMPLATE = `# Application
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
function initCommand(options) {
  console.log(chalk4.blue("\n\u{1F680} Initializing EnvMaster...\n"));
  let envCreated = false;
  let exampleCreated = false;
  if (!fs4.existsSync(".env") || options.force) {
    fs4.writeFileSync(".env", DEFAULT_ENV_TEMPLATE);
    console.log(chalk4.green("\u2713 Created .env"));
    envCreated = true;
  } else {
    console.log(chalk4.yellow("\u26A0 .env already exists (skipped)"));
  }
  if (!fs4.existsSync(".env.example") || options.force) {
    fs4.writeFileSync(".env.example", DEFAULT_ENV_TEMPLATE);
    console.log(chalk4.green("\u2713 Created .env.example"));
    exampleCreated = true;
  } else {
    console.log(chalk4.yellow("\u26A0 .env.example already exists (skipped)"));
  }
  if (envCreated || exampleCreated) {
    console.log(chalk4.green("\nInitialization complete.\n"));
  } else {
    console.log(chalk4.yellow("\nNothing was created.\n"));
  }
}

// src/commands/generate.ts
import chalk5 from "chalk";
function generateCommand() {
  console.log(chalk5.blue("\n\u2699\uFE0F Generating .env.example...\n"));
  const variables = parseEnvFile(".env");
  if (variables.length === 0) {
    console.log(chalk5.red("\u274C .env not found or empty.\n"));
    process.exit(1);
  }
  writeEnvExample(".env.example", variables);
  console.log(chalk5.green("\u2705 .env.example generated successfully!\n"));
}

// src/commands/secrets.ts
import chalk6 from "chalk";

// src/core/secrets.ts
var SECRET_PATTERNS = [
  /^sk_live_/,
  /^sk_test_/,
  /^ghp_/,
  /^AKIA[A-Z0-9]{16}$/,
  /^eyJ/,
  /^sk-/,
  /^postgres:\/\//,
  /^mysql:\/\//,
  /^mongodb:\/\//
];
function detectSecrets(variables) {
  return variables.filter((variable) => {
    const value = variable.value.trim();
    if (!value) {
      return false;
    }
    return SECRET_PATTERNS.some((pattern) => pattern.test(value));
  });
}

// src/commands/secrets.ts
function secretsCommand() {
  console.log(chalk6.blue("\n\u{1F512} Scanning .env.example...\n"));
  const variables = parseEnvFile(".env.example");
  if (variables.length === 0) {
    console.log(chalk6.red("\u274C .env.example not found or empty.\n"));
    process.exit(1);
  }
  const secrets = detectSecrets(variables);
  if (secrets.length === 0) {
    console.log(chalk6.green("\u2705 No secrets found.\n"));
    return;
  }
  console.log(chalk6.red("\u274C Possible secrets detected:\n"));
  secrets.forEach((secret) => {
    console.log(`\u2022 ${secret.key}`);
  });
  console.log(
    chalk6.yellow(`
Found ${secrets.length} potential secret(s).
`)
  );
  process.exit(1);
}

// src/commands/lint.ts
import fs5 from "fs";
import chalk7 from "chalk";

// src/core/linter.ts
function lintEnv(content) {
  const issues = [];
  const seen = /* @__PURE__ */ new Set();
  const lines = content.split("\n");
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    if (!line.trim() || line.trim().startsWith("#")) {
      return;
    }
    if (/\s=\s|=\s|\s=/.test(line)) {
      issues.push({
        line: lineNumber,
        message: "Remove spaces around '='"
      });
    }
    const [key] = line.split("=");
    const variableName = key.trim();
    if (seen.has(variableName)) {
      issues.push({
        line: lineNumber,
        message: "Duplicate variable"
      });
    } else {
      seen.add(variableName);
    }
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(variableName)) {
      issues.push({
        line: lineNumber,
        message: "Invalid variable name"
      });
      return;
    }
    if (!/^[A-Z][A-Z0-9_]*$/.test(variableName)) {
      issues.push({
        line: lineNumber,
        message: "Variable name should be UPPER_CASE"
      });
    }
    const value = line.split("=").slice(1).join("=").trim();
    if (value === "") {
      issues.push({
        line: lineNumber,
        message: "Empty value"
      });
    }
  });
  return issues;
}

// src/commands/lint.ts
function lintCommand() {
  console.log(chalk7.blue("\n\u{1F50D} Linting .env...\n"));
  if (!fs5.existsSync(".env")) {
    console.log(chalk7.red("\u274C .env file not found.\n"));
    process.exit(1);
  }
  const content = fs5.readFileSync(".env", "utf8");
  const issues = lintEnv(content);
  if (issues.length === 0) {
    console.log(chalk7.green("\u2705 No lint issues found.\n"));
    return;
  }
  issues.forEach((issue) => {
    console.log(
      chalk7.red(`\u274C Line ${issue.line}: ${issue.message}`)
    );
  });
  console.log(
    chalk7.yellow(`
Found ${issues.length} issue(s).
`)
  );
  process.exit(1);
}

// src/index.ts
var program = new Command();
program.command("init").description("Initialize a new environment setup").option("-f, --force", "Overwrite existing files").action(initCommand);
program.name("envmaster").description("A modern CLI to validate, generate and manage .env files.").version("0.1.0");
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
program.command("sync").description("Sync .env.example with .env").action(syncCommand);
program.command("validate").description("Validate .env file").action(validateCommand);
program.command("doctor").description("Run environment diagnostics").action(doctorCommand);
program.command("generate").description("Generate .env.example from .env").action(generateCommand);
program.command("secrets").description("Scan .env.example for exposed secrets").action(secretsCommand);
program.command("lint").description("Lint .env file for common issues").action(lintCommand);
program.parse();
