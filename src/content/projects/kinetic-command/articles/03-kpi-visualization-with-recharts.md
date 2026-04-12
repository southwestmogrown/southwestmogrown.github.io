# KPI Visualization with Recharts

Choosing the right chart type for each KPI was as important as the data pipeline itself. The wrong visualization creates misreads. Throughput shown as a pie chart doesn't communicate urgency. Defect rate shown as a line chart obscures the magnitude of a single bad batch.

## Chart Decisions Per KPI

**Throughput** — line chart over a rolling window (last 8 hours of a shift). The slope tells the story: is production accelerating, holding, or slowing down? Area fills below the line make drops visually immediate.

![Kinetic Command Dashboard with line drawer](/assets/images/projects/kinetic-command/Kinetic-Command-Dashboard-Line-Drawer.png)

**Defect Rate** — bar chart per line, updated in real time. Bar height maps directly to defect count, making cross-line comparison instant.

**Downtime Events** — timeline strip at the bottom of each line card. Each downtime event is a colored block on a time axis. Duration is visible at a glance without needing to read numbers.

**Shift Aggregate** — summary KPI tiles with sparklines. The tile shows the current value prominently; the sparkline provides shift context without taking up screen space.

## Recharts Configuration

Recharts' composable API made it straightforward to layer data onto shared axes. The main pattern used throughout Kinetic Command:

```tsx
<ComposedChart data={metrics}>
  <Area dataKey="throughput" fill="var(--accent-dim)" stroke="var(--accent)" />
  <Line dataKey="target" strokeDasharray="4 2" stroke="var(--border)" />
  <Tooltip content={<KPITooltip />} />
</ComposedChart>
```

Custom tooltip components keep the hover state consistent with the dashboard's dark industrial theme. All chart colors reference CSS variables — when the theme updates, charts update automatically.

## Performance

Recharts re-renders on every data change by default. In a live dashboard with 6+ charts updating from WebSocket events, this created visible frame drops. The fix was memoizing each chart component and only passing the delta to the relevant chart rather than re-rendering all charts on every event.
