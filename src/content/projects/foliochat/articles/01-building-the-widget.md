# Building the Widget

FolioChat is distributed as a single self-contained TypeScript React component. No CSS imports, no external dependencies beyond React itself. Drop in the component, set the `endpoint` prop, and the widget is live.

Building a truly zero-dependency embeddable widget requires a discipline that most component development doesn't: everything has to live inside the component, and nothing can assume the host environment.

## Why No External CSS

External CSS files create two problems for embeddable components. First, they can be overridden or blocked by the host site's styles. Second, they require a separate network request and a bundler configuration that the consumer has to manage.

All FolioChat styles are inline — applied via the React `style` prop with explicit values for every visual property. This is more verbose to write but produces a component that looks exactly the same everywhere it's embedded, regardless of the host site's CSS.

## The Open Event

FolioChat can be opened programmatically from anywhere in the host application without creating a prop-drilling dependency:

```ts
window.dispatchEvent(new CustomEvent('foliochat:open'))
```

The widget listens for this event and opens its chat panel. This decoupled pattern is what makes the Hero section's "ASK FOLIOCHAT" button work — it doesn't need a direct reference to the FolioChat component. It just fires an event.

## GitHub Context Pipeline

When a visitor sends a message, the request goes to the FolioChat API endpoint, not the Claude API directly. The server fetches live GitHub data — repos, recent commits, README content — and injects it as context into the Claude prompt.

This keeps API keys server-side and ensures the response is always grounded in current repository state. A visitor asking about a project gets answers based on what's actually in the repo right now, not a cached snapshot.

## Theming

Four props control the widget's visual identity: `theme` (dark/light/auto), `accentColor` (any CSS color), `position` (bottom-left or bottom-right), and `greeting` (opening message).

The `auto` theme mode reads `prefers-color-scheme` from the browser and switches automatically. All color values in the widget are derived from the accent color at runtime — borders, hover states, and focus rings are computed relative to the accent rather than hardcoded. This means any accent color produces a visually coherent widget without requiring additional configuration.

![FolioChat example](/assets/images/projects/foliochat/foliochat-example.png)
