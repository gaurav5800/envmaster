import { EnvVariable } from "./parser";

export interface ValidationError {
  key: string;
  message: string;
}

const ENV_NAME_REGEX = /^[A-Z_][A-Z0-9_]*$/;

export function validateVariables(
  variables: EnvVariable[]
): ValidationError[] {
  const errors: ValidationError[] = [];
  const seen = new Set<string>();

  for (const variable of variables) {
    // Duplicate key
    if (seen.has(variable.key)) {
      errors.push({
        key: variable.key,
        message: "Duplicate key",
      });
      continue;
    }

    seen.add(variable.key);

    // Invalid variable name
    if (!ENV_NAME_REGEX.test(variable.key)) {
      errors.push({
        key: variable.key,
        message: "Invalid variable name",
      });
      continue;
    }

    // Empty value
    if (variable.value === "") {
      errors.push({
        key: variable.key,
        message: "Empty value",
      });
    }
  }

  return errors;
}