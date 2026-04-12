# Claude-Powered Content Synthesis

Once Kaminify has a formalized design system, the second stage is applying that system to new content. This is where Claude does its most complex work: not extracting, but *generating*.

## The Synthesis Prompt

The synthesis prompt is structured and constrained. It receives:
- The extracted design token JSON from stage one
- The scraped and structured content from the target URL
- A page structure definition (nav, hero, sections, footer)
- An output constraint: valid HTML with only inline styles, no external dependencies

The inline-styles constraint is intentional. The generated output needs to be portable — downloadable as a ZIP and openable from any filesystem without a build step.

## Multi-Page Generation

Kaminify generates a full multi-page site, not just a single page. Each route (home, about, services, contact) is a separate Claude call with the same design token context but different content scope.

Running these calls in parallel would be faster, but introduces a coherence problem: Claude might make slightly different design decisions on each page. The sequential approach ensures each page inherits the resolved design choices from the previous one, maintaining visual consistency across the full site.

## Handling Ambiguity

Claude occasionally produces outputs that don't strictly follow the token constraints — using a color not in the extracted palette, or breaking the spacing scale. Kaminify runs a lightweight validation pass after generation that checks the HTML against the token set and flags deviations. Severe deviations trigger a re-generation of that section.

This feedback loop keeps the output quality consistent without requiring a human review step.
