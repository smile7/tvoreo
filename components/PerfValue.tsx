"use client";
import { useEffect, useState } from "react";
import { onPerf, type PerfSnapshot } from "@/lib/perf";

/* Показва една реална стойност от измерването на тази страница. */
export function PerfValue({ field, fallback = "…" }: { field: keyof PerfSnapshot; fallback?: string }) {
  const [v, setV] = useState<string>(fallback);
  useEffect(() => onPerf((p) => p && setV(String(p[field]))), [field]);
  return <span className="perf-v">{v}</span>;
}
