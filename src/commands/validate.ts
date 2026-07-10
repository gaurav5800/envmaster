import chalk from "chalk";
import { parseEnvFile } from "../core/parser";
import { validateVariables } from "../core/validator";
 
 

const ENV_NAME_REGEX = /^[A-Z_][A-Z0-9_]*$/;
export function validateCommand() {
  console.log(chalk.blue("\n🔍 Validating .env file...\n"));

  const variables = parseEnvFile(".env");
const errors = validateVariables(variables);


if (errors.length > 0) {
  console.log(chalk.red("Validation Errors:\n"));

  errors.forEach((error) => {
    console.log(chalk.red(`✗ ${error.key}: ${error.message}`));
  });

  console.log(chalk.red("\nValidation failed.\n"));
  process.exit(1);
}

console.log(chalk.green("✓ Validation passed.\n"));

  console.log(chalk.green("\nValidation passed.\n"));
}