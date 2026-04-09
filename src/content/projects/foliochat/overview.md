# FolioChat

FolioChat is an AI-powered portfolio chat assistant that gives visitors a way to actually *talk* to a portfolio — asking real questions about projects, skills, and background instead of passively scrolling.

## The Problem

Static portfolio sites are one-way broadcasts. A visitor lands, skims the project list, and leaves. There's no way to explore depth, ask follow-up questions, or understand the reasoning behind technical decisions.

## The Solution

FolioChat connects directly to GitHub's API to index public repositories in real time, then uses the Claude API to answer questions with that context grounded in actual code and commit history.

Key capabilities:
- **Live GitHub context** — fetches repo data on demand, not from a stale snapshot
- **Conversational depth** — visitors can ask follow-up questions and explore specifics
- **Embeddable widget** — self-contained TypeScript/React component, drop-in anywhere
- **Themeable** — dark/light/auto modes, configurable accent color and position

## Architecture

The widget is a self-contained TypeScript React component with no external CSS dependencies. It communicates with a lightweight API that handles GitHub context fetching and Claude API calls server-side (keeping API keys off the client).

## Status

Active — live on this portfolio page. Ask it anything.
