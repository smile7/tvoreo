"use client";
import { useEffect, useRef, type ReactNode } from "react";

/* Закачена секция: вертикалният скрол движи редицата с проекти хоризонтално (само десктоп). */
export function HScroll({ children, head }: { children: ReactNode; head: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current!, t = track.current!;
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let dist = 0, top = 0, raf = 0, on = false;

    const measure = () => {
      on = mq.matches && !document.documentElement.hasAttribute("data-no-pin");
      o.classList.toggle("is-pinned", on);
      if (!on) {
        o.style.height = "";
        t.style.transform = "";
        return;
      }
      dist = Math.max(0, t.scrollWidth - t.clientWidth);
      o.style.height = `${dist + window.innerHeight}px`;
      top = o.getBoundingClientRect().top + window.scrollY;
      update();
    };
    const update = () => {
      raf = 0;
      if (!on) return;
      const p = Math.min(1, Math.max(0, (window.scrollY - top) / (dist || 1)));
      t.style.transform = `translate3d(${-p * dist}px,0,0)`;
      o.style.setProperty("--wp", p.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="work-pin" ref={outer}>
      <div className="work-sticky">
        {head}
        <div className="work-track" ref={track}>
          {children}
        </div>
        <div className="work-progress" aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}
