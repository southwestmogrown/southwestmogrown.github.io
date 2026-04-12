# Streaming and ZIP Delivery

A Kaminify run generates multiple pages of HTML, each requiring a Claude API call. Waiting for all pages to complete before showing anything would make the UX feel slow and opaque. Streaming solves that.

## Progressive Streaming

Each page generates independently via a Next.js route handler that streams chunks as they arrive from the Claude API:

```ts
const stream = await claude.messages.stream({ ... })

for await (const chunk of stream) {
  controller.enqueue(encoder.encode(chunk.delta.text))
}
```

The browser receives these chunks over a `ReadableStream` and renders each page section as it arrives. Users see the site taking shape in real time — first the navigation, then the hero, then the content sections. The perceived generation time drops significantly even though total generation time stays the same.

## Preview Rendering

The streamed HTML renders in a live iframe preview panel as chunks accumulate. The preview uses `srcdoc` rather than a URL so there's no cross-origin friction. As each section completes, the iframe updates without a full reload.

## ZIP Assembly

When all pages finish generating, Kaminify assembles the full site into a ZIP archive. The ZIP contains:
- One `.html` file per page
- A shared `styles.css` file extracted from the common inline patterns
- An `assets/` directory for any images referenced during generation

The ZIP assembly runs on the server — `jszip` builds the archive from the in-memory page outputs and streams the binary directly to the browser as a download. No temporary files, no server-side storage required.

Supabase is used to persist the design system extraction results and generation history so users can return to a previous run without regenerating.
