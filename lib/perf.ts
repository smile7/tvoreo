export type PerfSnapshot = {
  load: number;
  ttfb: number;
  dom: number;
  kb: number;
  requests: number;
  cached: boolean;
};

/* Реални измервания от браузъра (Navigation + Resource Timing API). Нищо не е измислено. */
export function readPerf(): PerfSnapshot | null {
  if (typeof performance === "undefined") return null;
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  if (!nav || !nav.loadEventEnd) return null;
  const res = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
  const bytes = (nav.transferSize || 0) + res.reduce((s, r) => s + (r.transferSize || 0), 0);
  const encoded = (nav.encodedBodySize || 0) + res.reduce((s, r) => s + (r.encodedBodySize || 0), 0);
  return {
    load: Math.max(1, Math.round(nav.loadEventEnd - nav.startTime)),
    ttfb: Math.max(0, Math.round(nav.responseStart - nav.startTime)),
    dom: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
    kb: Math.round((bytes || encoded) / 1024),
    requests: res.length + 1,
    cached: bytes === 0,
  };
}

export function onPerf(cb: (p: PerfSnapshot | null) => void) {
  const run = () => setTimeout(() => cb(readPerf()), 0);
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
}
