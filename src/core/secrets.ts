import { EnvVariable } from "./parser";

const SECRET_PATTERNS = [
  /^sk_live_/,
  /^sk_test_/,
  /^ghp_/,
  /^AKIA[A-Z0-9]{16}$/,
  /^eyJ/,
  /^sk-/,
  /^postgres:\/\//,
  /^mysql:\/\//,
  /^mongodb:\/\//,
];

export function detectSecrets(variables: EnvVariable[]) {
  return variables.filter((variable) => {
    const value = variable.value.trim();

    if (!value) {
      return false;
    }

    return SECRET_PATTERNS.some((pattern) => pattern.test(value));
  });
}