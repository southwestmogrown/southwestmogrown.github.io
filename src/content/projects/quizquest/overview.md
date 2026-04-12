# QuizQuest

QuizQuest is a gamified LMS that turns Markdown files into interactive lessons — reading modules, quizzes, and in-browser code challenges with a live Go execution sandbox. An AI Socratic Coach streams hints via SSE without ever giving the answer away. XP, streaks, and a rank system drive completion.

![QuizQuest dashboard](/assets/images/projects/quizquest/quizquest-dashboard.png)

## The Problem

Traditional training platforms fail at engagement. Learners drop off quickly because there's no feedback loop, no sense of progress, and no consequence to skimming. Passive reading modules don't build retention. The platforms that do have gamification lack any real technical depth.

## The Solution

QuizQuest treats learning content as data. Authors write Markdown files with embedded quiz and code-challenge metadata. The platform parses those files into three lesson types: reading modules, multiple-choice quizzes, and in-browser code challenges. All three are unified under a progress and reward system that tracks XP, streaks, and ranks.

Key capabilities:
- **Markdown-driven content** — drop in `.md` files and the platform generates the full lesson interface
- **Go execution sandbox** — in-browser code challenges run against a sandboxed Go runner; no setup required
- **AI Socratic Coach** — Claude streams contextual hints via SSE when a learner is stuck, without ever giving the answer directly
- **XP and rank system** — learners earn XP per completed module, maintain streaks for daily activity, and advance through a rank ladder
- **Prisma + PostgreSQL** — full persistence layer for progress, scores, and session data

## Architecture

Next.js 16 with TypeScript on the frontend. Prisma 7 with PostgreSQL for the data layer. The Go code runner is a sandboxed HTTP microservice that accepts code submissions and returns execution results. Claude API integration uses SSE for streaming coach hints. Deployed to Render via a `render.yaml` Blueprint.

## Status

Live at [quizquest-5g96.onrender.com](https://quizquest-5g96.onrender.com/). Source on GitHub.
