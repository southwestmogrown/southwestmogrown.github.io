# Prism

Prism is a multi-model LLM prompt testing tool. Write a prompt once, run it against multiple AI models simultaneously, compare responses side by side, score them, and save runs for later analysis.

![Prism landing page](/assets/images/projects/prism/prism-landing.png)

## The Problem

Engineers iterating on LLM prompts lack structured tooling. They copy-paste prompts between different provider playgrounds, mentally compare outputs, and lose the history of what changed. There's no repeatable evaluation framework, and no audit trail of which prompt version produced which output.

## The Solution

Prism provides a single interface for multi-model prompt evaluation with persistent run history. You write the prompt once, configure the model set, and Prism fans out the requests in parallel. Responses render side by side with a scoring panel. Every run is saved to PostgreSQL via Prisma for later review.

Key capabilities:
- **Multi-model parallel execution** — run the same prompt across Claude, GPT-4, and others simultaneously
- **Side-by-side comparison** — response panes render in a grid for direct evaluation
- **Scoring interface** — rate each response per-run and track quality over time
- **Persistent run history** — all prompts, parameters, and outputs stored in PostgreSQL
- **Demo mode** — unauthenticated visitors can explore Prism without creating an account

## Stack

Next.js 14 with TypeScript, Prisma ORM, PostgreSQL, and the Claude API. Deployed to Vercel.

## Status

Live at [prompt-playground-weld.vercel.app](https://prompt-playground-weld.vercel.app/). Source on GitHub.
