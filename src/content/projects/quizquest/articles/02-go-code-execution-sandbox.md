# Go Code Execution Sandbox

QuizQuest's code challenges run learner-submitted Go code in a sandboxed execution environment. Building this correctly meant solving two problems: security (running untrusted code) and reliability (handling infinite loops, memory bombs, and malformed input without taking down the service).

## Why a Separate Microservice

The code runner is not part of the Next.js application. It's a standalone Go HTTP microservice with a single endpoint:

```
POST /execute
Content-Type: application/json

{ "code": "package main\n\nfunc main() {\n..." }
```

Response:
```json
{ "stdout": "...", "stderr": "...", "exitCode": 0, "runtimeMs": 142 }
```

Isolating the executor as a microservice keeps blast radius contained. If a submission crashes the runner, it only affects that process — not the Next.js API, not the database, not other learners' sessions.

## Sandbox Constraints

Each submission runs in an isolated subprocess with hard constraints:

- **CPU time limit**: 5 seconds. Exceeded → SIGKILL + `timeout` error response
- **Memory limit**: 64MB. Exceeded → process killed + `memory limit exceeded` error
- **Network access**: disabled. The subprocess runs without network capabilities
- **Filesystem access**: read-only tmpfs. The submitted code can't write to the host filesystem

The Go standard library's `exec.CommandContext` handles the timeout. `ulimit` enforces the memory constraint at the OS level before the process starts.

## Challenge Evaluation

Each code challenge has a set of test cases defined in the lesson Markdown metadata:

```yaml
---
type: code-challenge
language: go
testCases:
  - input: "5"
    expectedOutput: "120"
  - input: "0"
    expectedOutput: "1"
---
```

The runner executes the submission once per test case, passing input via stdin and comparing stdout to expected output. Pass/fail is determined per-test-case, and the overall result is pass only if all cases pass.
