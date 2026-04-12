# Prompt Engineering Is a Discipline, Not a Trick

Prompt engineering has a reputation problem. The term conjures images of "magic words" that unlock hidden LLM capabilities — jailbreaks, persona tricks, elaborate rituals. That's not prompt engineering. That's tinkering.

Real prompt engineering is a software discipline with rigorous practices, measurable outcomes, and a body of knowledge that's developing fast.

## The Foundation: Clarity of Task

Every effective prompt starts with a single, clearly scoped task. The single biggest source of unreliable LLM output is prompts that conflate multiple tasks — asking Claude to extract data *and* evaluate it *and* format it *and* generate a summary, all in one call.

Break it up. Chain calls. The first call extracts. The second evaluates. The third formats. Each call can be tuned independently. Each can be tested independently.

This is not inefficient. It's the opposite — isolated calls fail and recover cleanly. A monolithic call that fails partway through is catastrophic to debug.

## Constraints Beat Instructions

Telling an LLM what to do is less effective than constraining what it can't do. "Write a helpful response" is unbounded. "Write a response under 3 sentences that asks one clarifying question and contains no code" is constrained.

The QuizQuest Socratic Coach prompt is almost entirely constraints. The constraint list was assembled by looking at actual coach outputs and identifying every type of unwanted response — then writing a constraint that eliminates it.

This is a debugging process, not a creative one.

## Temperature Is a Parameter, Not a Vibe

Temperature controls randomness in sampling. Low temperature (0.1–0.2) is appropriate for structured extraction, code generation, and anything that requires a deterministic answer. High temperature (0.8–1.0) is appropriate for creative tasks where variety is the goal.

Most AI features should use low temperature. The default temperature in most providers is 1.0, which is designed for chat and creative use — not for structured data extraction or evaluation tasks.

## Test Cases Come Before Prompts

The discipline that separates professional prompt engineering from ad-hoc tinkering is test-driven development for prompts.

Before writing a prompt, write the test cases. Define 5–10 inputs with expected outputs. Then write a prompt that passes them. As the prompt evolves, run the full test set. Track regressions.

This is what Prism is built for — it's a framework for running prompt test suites across models. The output isn't just a response; it's a dataset.

## The Meta-Skill

The most useful skill in prompt engineering isn't writing clever instructions. It's knowing when a prompt has reached its ceiling and the problem needs a different architecture — a different chain structure, a different model, a hybrid retrieval approach, or a structured extraction layer before the LLM sees the data.

Recognizing that boundary early saves enormous amounts of iteration time.
