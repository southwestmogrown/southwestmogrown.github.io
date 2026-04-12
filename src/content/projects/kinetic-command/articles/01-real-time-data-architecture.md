# Real-Time Data Architecture

The core engineering challenge in Kinetic Command wasn't the dashboard UI — it was making real-time data feel instant without hammering the server or drowning the client in unnecessary updates.

## Why WebSockets

The first design used polling: the client fetched fresh KPI data every 5 seconds. It worked in testing but created visible lag spikes in production when multiple clients polled simultaneously. Switching to WebSockets eliminated that pattern entirely.

With WebSockets, the server owns the update cycle. When a metric changes, the server pushes the delta to all connected clients immediately. Clients don't ask — they listen.

## The Event Model

Each KPI category (units produced, defect rate, downtime, throughput) is a separate event channel. Clients subscribe to only the channels relevant to their view. A floor operator sees line-level events. A plant manager sees aggregated shift-level events.

```
ws.on('metric:line-5:throughput', (delta) => {
  updateMetric('throughput', delta)
})
```

This channel isolation keeps the client payload small and prevents unnecessary re-renders. A throughput update for Line 5 doesn't trigger a re-render in the Line 2 panel.

## State Management

Client state is a flat key-value map of metric IDs to their current values and timestamps. Each WebSocket event is a merge operation — never a full replacement. This means even on a slow connection, the UI always shows the last known value rather than a blank.

## The Simulation Layer

The SIM control panel injects synthetic events through the same WebSocket infrastructure as live data. This was essential for demos and onboarding — the full production behavior is testable without needing real floor systems connected.

![Kinetic Command SIM Control Panel](/assets/images/projects/kinetic-command/Kinetic-Command-SIM-Control-Panel.png)
