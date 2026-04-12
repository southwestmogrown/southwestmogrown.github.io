# Scoring and Run History

A prompt evaluation tool without persistent history is a one-shot instrument. Prism's run history system turns it into a longitudinal analysis platform — every evaluation is stored, searchable, and comparable.

## The Run Record

Each prompt run creates a record in PostgreSQL via Prisma:

```ts
model Run {
  id          String    @id @default(cuid())
  prompt      String
  params      Json      // temperature, max_tokens, system prompt
  createdAt   DateTime  @default(now())
  responses   Response[]
}

model Response {
  id          String  @id @default(cuid())
  runId       String
  modelId     String
  output      String
  tokens      Int
  latencyMs   Int
  score       Int?    // 1–5, set by user after review
  run         Run     @relation(fields: [runId], references: [id])
}
```

The `params` field is stored as JSON rather than normalized columns to keep the schema flexible as model-specific parameters evolve.

## History Browser

The history page lists all saved runs in reverse chronological order. Each row shows the prompt summary, models used, average score, and timestamp. Clicking into a run restores the full side-by-side view exactly as it appeared at evaluation time — all responses, scores, and metadata intact.

## Filtering and Analysis

Runs can be filtered by model, date range, and minimum score. This makes it possible to answer questions like "which runs used Claude and scored above 4?" without exporting to a spreadsheet.

Over time the run history becomes a personal benchmark dataset — a record of which prompt patterns consistently produce high-quality outputs across different models and parameter configurations.

![Prism demo view](/assets/images/projects/prism/Prism-Demo.png)
