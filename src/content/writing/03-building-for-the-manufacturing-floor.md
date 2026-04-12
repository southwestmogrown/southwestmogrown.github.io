# Building for the Manufacturing Floor

Most software engineers write software for people who are comfortable with software. Manufacturing floor operators are not that audience. They're running production lines, wearing gloves, and making 30-second decisions. Building for that environment requires a fundamentally different design philosophy.

## The Glove Test

Every UI decision in Kinetic Command was evaluated against what I call the Glove Test: can a floor operator, wearing work gloves, extract the critical information in under five seconds?

This eliminates a lot of standard software design patterns:
- Small text labels (can't read from 3 feet away)
- Hover tooltips (no hover state on a touchscreen with gloves)
- Dense data tables (too much visual scanning)
- Modal dialogs (requires fine motor precision to dismiss)

What survives the Glove Test: large numbers, strong color contrast, minimal elements per screen, and persistent state (nothing that disappears).

## Information Hierarchy Is Everything

A floor operator needs to know one thing: is my line running normally? If yes, nothing needs their attention. If no, what specifically is wrong?

The KPI cards in Kinetic Command are designed around this binary. Green means normal. Any non-green state is immediately visually distinct and includes a single-line description of what's abnormal. The operator doesn't need to interpret a chart — the card tells them the answer.

Charts are for team leads and managers, who have the cognitive context and the time to interpret trend data. Floor operator views have no charts.

## Role-Based Design Is Not Optional

The instinct to build a "universal" dashboard that serves all roles is understandable but wrong for this environment. Every piece of information that isn't relevant to a role is cognitive noise. On a manufacturing floor, cognitive noise costs time. Time costs money. In some environments, it costs safety.

The role-based architecture in Kinetic Command started with an explicit question for each role: what is the one decision this person needs to make faster? Design for that decision. Everything else is secondary.

## Real-Time Means Real-Time

In office software, "real-time" usually means a few seconds of lag is acceptable. On a production floor, a 30-second delayed reading can mean 30 seconds of defective output. The WebSocket architecture in Kinetic Command was a non-negotiable requirement, not a nice-to-have.

This shaped the entire technical architecture: event-driven from the server, push-not-poll on the client, with delta updates rather than full state refreshes. The UI can never be more than one event behind.

## The Value of Simulation Mode

The SIM control panel was originally a developer tool for testing the dashboard without real floor data. It turned out to be the most valuable feature for adoption.

Floor operators are risk-averse about software changes. New tools require training time, and training time is production time. SIM mode let operators train on a live-looking dashboard without any risk to production. It also let managers run tabletop exercises — "what would we see if Line 4 had a defect spike?" — to test their team's readiness.

Simulation capability is now a first-class requirement in every operations tool I build.
