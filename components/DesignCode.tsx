"use client";
import { useCallback, useRef, type ReactNode, type KeyboardEvent, type PointerEvent } from "react";

/* Подписът на сайта: плъзгач „Дизайн | Код“. Отгоре е дизайнът, отдолу е истинският код. */
export function DesignCode({ design, code }: { design: ReactNode; code: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const drag = useRef(false);

  const set = useCallback((pct: number) => {
    const el = root.current;
    if (!el) return;
    const v = Math.min(100, Math.max(0, pct));
    el.style.setProperty("--split", `${v}%`);
    el.classList.add("dc-touched");
    handle.current?.setAttribute("aria-valuenow", String(Math.round(v)));
    handle.current?.setAttribute("aria-valuetext", `Дизайн ${Math.round(v)}%, код ${100 - Math.round(v)}%`);
  }, []);

  const current = () => {
    const el = root.current;
    if (!el) return 72;
    return parseFloat(getComputedStyle(el).getPropertyValue("--split")) || 72;
  };

  const fromEvent = (e: PointerEvent) => {
    const r = root.current!.getBoundingClientRect();
    set(((e.clientX - r.left) / r.width) * 100);
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    root.current?.classList.add("dc-dragging");
    fromEvent(e);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current) fromEvent(e);
  };
  const onUp = () => {
    drag.current = false;
    root.current?.classList.remove("dc-dragging");
  };
  const onKey = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    const map: Record<string, number> = {
      ArrowLeft: current() - step,
      ArrowRight: current() + step,
      Home: 0,
      End: 100,
    };
    if (e.key in map) {
      e.preventDefault();
      set(map[e.key]);
    }
  };

  return (
    <div className="dc" ref={root}>
      <div className="dc-design">{design}</div>
      <div className="dc-code" aria-hidden="true">
        {code}
      </div>
      <div
        ref={handle}
        className="dc-handle"
        role="slider"
        tabIndex={0}
        aria-label="Плъзгач Дизайн | Код: покажи кода зад дизайна"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={72}
        data-cursor="Дръпни"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={onKey}
        onDoubleClick={() => set(72)}
      >
        <span className="dc-grab" />
        <span className="dc-line" />
        <span className="dc-knob">
          <span className="dc-k-l">Дизайн</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
            <path d="M9 6 3 12l6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
          </svg>
          <span className="dc-k-r">Код</span>
        </span>
      </div>
    </div>
  );
}
