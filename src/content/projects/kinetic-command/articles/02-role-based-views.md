# Role-Based Views

Manufacturing floors are not flat organizations. Floor operators, line team leads, and plant managers all need visibility into the same underlying data — but they need to see it very differently.

## The Problem With One-Size-Fits-All Dashboards

Most operations software shows everyone everything. The result is that operators have to scroll past management metrics that don't affect their decisions, and managers have to look past granular line data to find the summary they need. Cognitive load goes up, reaction time goes up.

Kinetic Command uses role-based views to solve this: each role gets a purpose-built interface that shows exactly what they need and hides what they don't.

## Three Views

**Floor Operator View** — Line-level focus. Shows the operator's assigned line with current throughput, active alerts, and defect count. Nothing else. The goal is zero cognitive load at the machine.

**Team Lead Line View** — Cross-line visibility for a shift section. Shows all lines in the team lead's zone with comparative throughput, escalation flags, and the ability to drill into any individual line.

![Team Lead Line View](/assets/images/projects/kinetic-command/Kinetic-Command-Team-Lead-Line-View.png)

**Admin / Plant Manager View** — Full floor visibility. Shift-level aggregates, historical trend overlays, and access to the SIM control panel for scenario testing.

![Admin Dashboard](/assets/images/projects/kinetic-command/Kinetic-Command-Admin.png)

## Implementation

Role resolution happens at the session layer — the user's role is encoded in their auth token and validated server-side before any data is returned. The frontend reads the resolved role from the session and renders the corresponding layout component. There's no client-side role logic; the client simply receives the role it's been assigned.

This keeps the role enforcement surface small and auditable. Adding a new role is a matter of defining its data scope on the server and its view component on the client.
