# Two-Pass Extraction and Scoring

Resume Parser doesn't try to score a candidate in a single LLM call. Using two sequential Claude calls — one to extract, one to evaluate — produces more accurate and auditable results than asking a single prompt to do both at once.

## Why Two Passes

A single prompt that says "read this resume and score it against this job description" produces a useful output but conflates two distinct cognitive tasks: understanding what the candidate has done, and evaluating whether that matches what the role requires.

When these tasks are separated, each call can be optimized independently. The first call is precise and structured. The second call is evaluative and comparative.

## Pass One: Structured Extraction

The first Claude call receives the raw resume text and returns a typed JSON profile:

```json
{
  "name": "...",
  "currentTitle": "...",
  "yearsExperience": 7,
  "skills": ["TypeScript", "React", "PostgreSQL"],
  "experience": [
    {
      "company": "...",
      "title": "...",
      "duration": "2 years",
      "highlights": ["..."]
    }
  ],
  "education": { "degree": "BS Computer Science", "year": 2017 },
  "accomplishments": ["Reduced API latency by 60%", "Led team of 5"]
}
```

This structured output is validated against a Zod schema before proceeding. If extraction produces an invalid shape, the process halts with a clear error — not a bad score.

## Pass Two: Fit Scoring

The second Claude call receives the validated candidate profile JSON and the job description text. The prompt asks Claude to evaluate fit across four dimensions: technical skills match, experience relevance, seniority alignment, and standout accomplishments. Each dimension is scored 1–10 with a brief rationale. The overall score is a weighted composite.

The rationale output is what makes Resume Parser useful beyond the number itself — reviewers can see *why* a candidate scored 7.2, not just that they did.
