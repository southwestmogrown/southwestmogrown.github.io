# Design Extraction Pipeline

The first half of the Kaminify pipeline is understanding what a design *is* — not as pixels, but as a system of tokens and relationships that can be applied to arbitrary content.

## The Challenge

CSS is messy. A real-world site might have 40 shades of gray, 12 font sizes, and class names like `.hero-wrapper-inner-v2`. Turning that into a usable design system requires more than scraping stylesheets — it requires reasoning about what matters.

## The Extraction Process

When a user submits a design URL, Kaminify:

1. **Fetches the page** with a headless browser to capture computed styles, not just raw CSS
2. **Traverses the DOM** to identify structural patterns — navigation, hero, cards, footers — based on element semantics and layout signals
3. **Computes a token set** — extracts the dominant color palette, font stack, spacing scale, and border/shadow patterns from the computed styles
4. **Sends the raw token data to Claude** with a prompt instructing it to rationalize and formalize the design system as a structured JSON object

The Claude step is critical. A purely algorithmic extraction produces noise. Claude can identify that `#1a1a2e` is the brand primary even when it appears less frequently than `#ffffff`, because it understands which tokens carry semantic weight.

## Output Format

The extracted design system JSON looks like:

```json
{
  "colors": {
    "primary": "#1a1a2e",
    "accent": "#e94560",
    "background": "#ffffff",
    "surface": "#f4f4f8"
  },
  "typography": {
    "fontFamily": "Inter, sans-serif",
    "scale": [12, 14, 16, 20, 28, 40, 56]
  },
  "spacing": [4, 8, 16, 24, 32, 48, 64],
  "radius": "8px",
  "shadows": ["0 2px 8px rgba(0,0,0,0.08)"]
}
```

This JSON is what feeds into the second stage — content synthesis. The design system becomes the grammar; the content is the vocabulary.
