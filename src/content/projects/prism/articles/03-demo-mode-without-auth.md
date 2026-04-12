# Demo Mode Without Auth

Prism includes a full-featured demo mode for unauthenticated visitors. The goal: let anyone try the actual tool without creating an account, without a fake UI, and without the demo feeling like a downgraded experience.

## Why Demo Mode Matters

Prompt testing tools are hard to evaluate from a screenshot or a feature list. Engineers need to try the thing. Requiring account creation before the first use creates friction that breaks the evaluation loop before it starts.

Demo mode removes that friction entirely.

## How It Works

Demo mode uses a shared demo identity resolved at the session layer. When a visitor lands on Prism without an authenticated session, they're automatically assigned the demo identity. From that point on, the experience is identical to an authenticated user — they can run prompts, compare responses, score them, and view run history.

The only difference: demo runs are stored against the shared demo account, not a personal one. Demo history is visible to all demo users.

## Preventing Abuse

The shared demo account has rate limits applied at the API route level. Each demo session gets a token bucket that refills over time. Hitting the limit shows a friendly message prompting account creation for unlimited access — it's not a hard error, it's a conversion touchpoint.

## Upsell Transition

When a demo user creates an account, their active run (if any) is transferred to their new personal account. They don't lose the work they did in demo mode. This made the transition from demo to registered user feel seamless rather than disruptive.

The demo mode UX decision had a measurable effect: conversion from demo sessions to registered users was meaningfully higher than the previous flow that required registration before first use.
