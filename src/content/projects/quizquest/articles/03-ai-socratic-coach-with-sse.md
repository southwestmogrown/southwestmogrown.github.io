# AI Socratic Coach with SSE

The hardest design challenge in QuizQuest wasn't the gamification or the code sandbox — it was the AI coach. A coach that gives answers isn't a coach. It's a cheat code. The value of the coach is in the questions it asks, not the answers it provides.

## The Socratic Constraint

Every hint from the AI coach must be a question or a nudge, never a solution. This constraint is enforced in the system prompt:

> You are a Socratic learning coach. The learner is working on a code challenge. Your role is to help them find the answer themselves. Never provide code. Never state the answer directly. Ask one clarifying question that points toward the next step in their reasoning. Keep responses under 3 sentences.

Claude follows this reliably when the constraint is explicit and short. A longer, more nuanced constraint produces more drift. The three-sentence limit also forces Claude to be precise — long coaching responses dilute the signal.

## SSE Streaming

Hints stream to the client via Server-Sent Events rather than a standard JSON response. This makes the coaching experience feel conversational — the learner sees the response appearing in real time, word by word, rather than waiting for a complete response to arrive.

```ts
// Next.js route handler
const stream = await claude.messages.stream({
  model: 'claude-3-5-sonnet-20241022',
  system: COACH_SYSTEM_PROMPT,
  messages: buildCoachContext(challenge, learnerCode, attempts),
})

for await (const chunk of stream) {
  res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`)
}
res.write('data: [DONE]\n\n')
res.end()
```

The client receives these events and appends chunks to the coach message bubble in real time.

## Context Building

The coach prompt includes the full challenge description, the learner's current code, and their previous attempt history. The `attempts` context is important: it lets Claude see what the learner has already tried and avoid suggesting approaches they've already explored.

Hint requests are rate-limited per challenge — three per attempt, resets on new submission. This prevents the coach from becoming a hint-exhausting strategy.
