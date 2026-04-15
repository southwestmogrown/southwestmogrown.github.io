# PassStack

PassStack is a developer toolkit for job seekers — upload a PDF resume, paste a job description, and get a full battle plan: tiered gap analysis, tailored bullet rewrites, a streaming cover letter draft, a personalized study plan, and behavioral STAR interview coaching, all powered by a multi-phase Claude API pipeline.

![PassStack landing](/assets/images/projects/resume-parser/PassStack-Landing.png)

## The Problem

Job seekers spend hours manually tailoring resumes and cover letters for each application with no structured feedback on skill gaps, no guidance on what to study, and no preparation for behavioral interviews. The process is unstructured, repetitive, and leaves obvious value on the table.

## The Solution

PassStack sequences five Claude API phases behind a clean UI, with free scoring up front and a $5 one-time Stripe token unlocking paid phases.

- **Phase 0 — Experience Interviewer** (FREE) — Multi-turn chat that surfaces concrete impact metrics and hidden skills before scoring. Produces an `InterviewBrief` merged into the resume data.
- **Phase 1 — Extraction** (FREE) — Claude reads the PDF (base64-encoded) and returns structured `ResumeData`.
- **Phase 2 — Scoring + Job Posting Flags** (FREE) — Claude compares `ResumeData` against the JD and returns a severity-tiered `MatchResult` plus automatic red-flag detection (ghost jobs, impossible requirements, scam indicators).
- **Phase 3 — Rewrite + Study Plan** (PAID, parallel) — Bullet rewrites and a personalized study plan generated in parallel.
- **Phase 4 — Cover Letter** (PAID, streaming) — Streams a cover letter draft; returns a "do not apply" redirect if dealbreakers exist.
- **Phase 5 — STAR Prep** (PAID) — Converts gap analysis into coached behavioral interview prep with STAR-format question coaching.

![PassStack demo](/assets/images/projects/resume-parser/PassStack-Demo.png)

## Architecture

Next.js (App Router) with TypeScript. PDF parsing and all Claude calls are server-side — no API keys in the client bundle. Payments use Stripe `PaymentElement` in an in-app modal; a successful payment mints a 4-use Supabase token (one use per paid phase). UI is Tailwind CSS. Batch mode lets users score a single resume against multiple JDs in parallel.

## Status

Live at [resume-parser-ten-mu.vercel.app](https://resume-parser-ten-mu.vercel.app/). Source on GitHub.
