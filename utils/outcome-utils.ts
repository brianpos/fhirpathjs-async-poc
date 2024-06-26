import type { Coding, OperationOutcomeIssue, OperationOutcome } from "fhir/r4b";

export function CreateOperationOutcome(
  severity: "error" | "fatal" | "warning" | "information",
  code:
    | "invalid"
    | "structure"
    | "required"
    | "value"
    | "invariant"
    | "security"
    | "login"
    | "unknown"
    | "expired"
    | "forbidden"
    | "suppressed"
    | "processing"
    | "not-supported"
    | "duplicate"
    | "multiple-matches"
    | "not-found"
    | "deleted"
    | "too-long"
    | "code-invalid"
    | "extension"
    | "too-costly"
    | "business-rule"
    | "conflict"
    | "transient"
    | "lock-error"
    | "no-store"
    | "exception"
    | "timeout"
    | "incomplete"
    | "throttled"
    | "informational",
  message: string,
  coding?: Coding,
  diagnostics?: string
): fhir4b.OperationOutcome {
  var result: fhir4b.OperationOutcome = {
    resourceType: "OperationOutcome",
    issue: [],
  };

  var issue: OperationOutcomeIssue = {
    severity: severity,
    code: code,
    details: { text: message },
  };
  if (coding && issue.details) issue.details.coding = [coding];
  if (diagnostics) issue.diagnostics = diagnostics;
  result.issue.push(issue);
  return result;
}

export function logMessage(enabled: boolean, outcome: OperationOutcome, message: string, data?: any) {
  if (enabled){
    console.log(message, data);
    // and append it into the outcome issues
    var issue: OperationOutcomeIssue = {
      severity: "information",
      code: "informational",
      details: { text: message }
    };
    outcome.issue.push(issue);
    if (typeof data === "string" || typeof data === "number" || typeof data === "boolean")
      issue.details!.text += "" + data;
    if (data){
      if (typeof data === "string")
        issue.diagnostics = data;
      else
        issue.diagnostics = JSON.stringify(data);
    }
  }
}

