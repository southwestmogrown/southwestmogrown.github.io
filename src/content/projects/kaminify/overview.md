# Kaminify

Kaminify is an AI-powered design cloning pipeline. Feed it a design URL and a content URL, and it extracts the visual system from the first, structures the content from the second, and produces a fully-rendered multi-page site — streamed progressively and downloadable as a ZIP.

![Kaminify splash screen](/assets/images/projects/kaminify/kaminify-splash.png)

## The Problem

Recreating a site's visual identity for a new content context is tedious work. Designers extract colors, fonts, spacing, and component patterns by hand. Then engineers rebuild those patterns in a new codebase. The entire process is manual, undocumented, and not repeatable.

## The Solution

Kaminify automates that pipeline. It uses a two-stage Claude API process: first extracting and formalizing the design system from the target site, then applying that system to new content. The result streams to the browser as it generates and can be downloaded as a complete ZIP archive.

Key capabilities:
- **Design extraction** — parses CSS, class names, and computed styles into a structured design token set
- **AI content synthesis** — Claude maps structured content onto the extracted design system
- **Progressive streaming** — pages render as they generate, not all at once
- **ZIP export** — download the full generated site as static HTML/CSS files

## Architecture

Next.js 15 frontend with TypeScript. Supabase handles session and asset persistence. The AI pipeline runs as a server action — no API keys on the client. Streaming is handled via ReadableStream piped through the Next.js route handler.

## Status

Live at [kaminify.com](https://kaminify.com). Source on GitHub.
