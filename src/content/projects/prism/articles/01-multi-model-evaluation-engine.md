# Multi-Model Evaluation Engine

Prism's core value is running the same prompt against multiple models simultaneously and presenting the results in a way that makes comparison effortless. The evaluation engine is what makes that possible.

## Fan-Out Architecture

When a user submits a prompt run, Prism fans out the request to each configured model in parallel. Each model call is an independent async operation:

```ts
const results = await Promise.allSettled(
  selectedModels.map(model => runPrompt(prompt, model, params))
)
```

`Promise.allSettled` is intentional — a failure from one model shouldn't block the others. If GPT-4 times out, the Claude and Gemini responses still render. The failed model shows an error state in its response pane.

## Model Adapters

Each LLM provider has a different API shape. Prism uses a thin adapter pattern to normalize them:

```ts
interface ModelAdapter {
  id: string
  name: string
  run(prompt: string, params: RunParams): Promise<ModelResponse>
}
```

Adding a new model means implementing the adapter interface — nothing else in the system needs to change. This kept the codebase clean as model support expanded.

## Response Normalization

Each adapter returns a `ModelResponse` with a consistent shape: text output, token counts, latency, and a cost estimate. Cost estimation uses the provider's published per-token rates applied to the actual token counts returned in the API response — not a guess.

![Prism playground with side-by-side responses](/assets/images/projects/prism/prism-playground.png)

## Scoring

After responses render, the user can score each one on a 1–5 scale. Scores are attached to the run record in PostgreSQL and aggregated per model over time. This turns individual evaluations into a longitudinal dataset — useful for understanding which models perform best for specific prompt types.
