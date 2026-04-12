# Resume Parser

Resume Parser is a two-pass AI screening tool. Upload a PDF resume, paste a job description, and the system extracts structured candidate data and scores fit against the role — cutting manual review time by 80%.

![Resume Parser demo screen](/assets/images/projects/resume-parser/Resume-Parser-Demo-Screen.png)

## The Problem

Hiring managers were spending 3+ hours per cycle on initial resume screening. The process was inconsistent — the same resume evaluated by different reviewers got different outcomes. And the output was informal notes, not structured data that could inform later decisions.

## The Solution

Resume Parser uses two sequential Claude API calls in a deliberate pipeline. The first pass extracts structured data from the resume: skills, experience, education, and accomplishments. The second pass takes that structured data and the job description and produces a fit score with ranked reasoning.

Key capabilities:
- **PDF extraction** — parses uploaded resumes and normalizes them to plain text
- **Structured data extraction** — first Claude call produces a typed JSON candidate profile
- **JD-to-candidate scoring** — second Claude call reasons across both documents and outputs a ranked score with commentary
- **80% time reduction** — tested across multiple hiring cycles; reduced first-pass review from 3+ hours to under 40 minutes

## Architecture

Next.js 14 with TypeScript. PDF parsing happens server-side. Both Claude API calls are sequenced as server actions — no LLM keys in the client bundle. UI is Tailwind CSS.

## Status

Live at [resume-parser-ten-mu.vercel.app](https://resume-parser-ten-mu.vercel.app/). Source on GitHub.
