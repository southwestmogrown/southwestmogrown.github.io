# Kinetic Command

Kinetic Command is a real-time operations dashboard built for manufacturing floor environments where shift-level decision-making depends on accurate, live KPI visibility.

![Kinetic Command Dashboard](/assets/images/projects/kinetic-command/Kinetic-Command-Dashboard.png)

## The Problem

Production managers were working with shift reports compiled at the end of each cycle — meaning problems discovered at 4pm had been accumulating since 6am. Reactive firefighting replaced proactive management, and trend data lived in spreadsheets that no one had time to maintain during a shift.

## The Solution

Kinetic Command brings live WebSocket data streams to a role-stratified dashboard interface. Different operators see exactly the information their role requires — no noise, no missing signal.

Key capabilities:
- **Live KPI tracking** — WebSocket streams push metric updates in real time, no polling
- **Role-based views** — floor operators, team leads, and admins each get a purpose-built interface
- **Trend analysis** — Recharts-powered visualizations surface patterns across shifts
- **Simulation control panel** — built-in SIM mode for onboarding and demo without touching production data

## Stack

Next.js 14 with TypeScript on the frontend, Recharts for all data visualization, and Tailwind CSS for layout. The WebSocket layer is handled server-side with a lightweight event emitter pattern, keeping the client logic clean.

## Status

Live demo at [ops-dashboard-demo.vercel.app](https://ops-dashboard-demo.vercel.app/). Source available on GitHub.
