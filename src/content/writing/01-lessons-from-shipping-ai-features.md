# Lessons from Shipping AI Features in Production

Building demos with LLMs is easy. Getting them to behave consistently in production is a different problem entirely. Here are the lessons that actually changed how I approach AI feature development.

## Prompts Are Code

The first mistake most teams make is treating prompts as copy — something a product manager writes in a Notion doc, not something that lives in version control with tests.

A prompt is a program. It has inputs, outputs, and behavior. It can regress. It can have edge cases that only surface at scale. It deserves the same rigor as any other part of the codebase: version control, review, and a way to detect when it breaks.

This is what Prism was built to solve for. Every prompt should have a set of test cases that run on every change. Not just "does this produce output" but "does this produce the *right* output."

## Structured Output Is Your Friend

Asking an LLM to "return JSON" doesn't reliably produce JSON. It produces something that looks like JSON, sometimes wrapped in a markdown code block, sometimes with trailing commas, sometimes cut off mid-structure if the token limit is hit.

The pattern that actually works: define the schema first with something like Zod or JSON Schema, then include the schema definition in the prompt, then validate the response against the schema. If validation fails, retry once with the validation error added to the context. If it fails again, surface a user-facing error rather than passing bad data downstream.

Two-pass extraction (extract first, evaluate second) is almost always better than single-pass for complex tasks. The Resume Parser was built on this principle.

## Latency Is a UX Problem

A 3-second wait for an AI response feels like the app is broken. The same 3-second response streamed word by word feels instant. Streaming isn't a feature — it's a UI requirement.

If your AI feature can't stream, at minimum give the user something to watch: a progress indicator with stages, not just a spinner. "Extracting design tokens... Generating page layout... Composing content..." is infinitely better than an undifferentiated loading state.

## Fail Loudly and Specifically

Generic error messages for AI failures are a dead end for debugging and a frustrating experience for users. The output validation layer should produce specific, actionable errors:

- "Could not extract a valid design system from this URL" (Kaminify)
- "Resume format was too unusual to parse — try exporting as plain PDF" (Resume Parser)
- "Coach is unavailable — hint limit reached for this attempt" (QuizQuest)

These messages tell the user exactly what went wrong and often suggest a path forward. They also make production debugging dramatically easier.
