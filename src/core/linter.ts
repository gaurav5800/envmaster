export interface LintIssue {
  line: number;
  message: string;
}

export function lintEnv(content: string): LintIssue[] {
  const issues: LintIssue[] = [];
 const seen = new Set<string>();
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // Ignore comments & blank lines
    if (!line.trim() || line.trim().startsWith("#")) {
      return;
    }

    // Rule 1: Spaces around '='
    if (/\s=\s|=\s|\s=/.test(line)) {
      issues.push({
        line: lineNumber,
        message: "Remove spaces around '='",
      });
    }


        // Rule 2: Variable name must be UPPER_CASE
    const [key] = line.split("=");
    const variableName = key.trim();
    if (seen.has(variableName)) {
      issues.push({
        line: lineNumber,
        message: "Duplicate variable",
      });
    } else {
      seen.add(variableName);
    }
    // Rule 2: Invalid variable name
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(variableName)) {
      issues.push({
        line: lineNumber,
        message: "Invalid variable name",
      });
      return;
    }

    // Rule 3: Variable name should be UPPER_CASE
    if (!/^[A-Z][A-Z0-9_]*$/.test(variableName)) {
      issues.push({
        line: lineNumber,
        message: "Variable name should be UPPER_CASE",
      });
    }

    // Rule 4: Empty value
    const value = line.split("=").slice(1).join("=").trim();

    if (value === "") {
      issues.push({
        line: lineNumber,
        message: "Empty value",
      });
    }




  });

  return issues;
}