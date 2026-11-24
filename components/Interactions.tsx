"use client";
import { useEffect } from "react";

/* Всички „живи“ детайли на едно място: поява при скрол, курсор, магнитни бутони,
   spotlight, скоби, следящи курсора, линия на процеса, връзка към оценителя. */
export function Interactions() {
  useEffect(() => {
    const html = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    /* 1. Поява при скрол */
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    /* 2. Бутони, които отварят оценителя с избран отговор */
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest("[data-estimate],[data-estimate-tier]");
      if (!a) return;
      const type = a.getAttribute("data-estimate") || undefined;
      const tier = a.getAttribute("data-estimate-tier") || undefined;
      window.dispatchEvent(new CustomEvent("tvoreo:estimate", { detail: { type, tier } }));
    };
    document.addEventListener("click", onClick);
    cleanups.push(() => document.removeEventListener("click", onClick));

    /* 3. Скрол: хедър, скобите в hero, линията на процеса */
    const header = document.querySelector<HTMLElement>("[data-header]");
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const steps = document.querySelector<HTMLElement>("[data-steps]");
    const stepEls = Array.from(document.querySelectorAll<HTMLElement>("[data-step]"));
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY, vh = window.innerHeight;
        header?.classList.toggle("is-scrolled", y > 8);
        if (hero) hero.style.setProperty("--hs", Math.min(1, y / (hero.offsetHeight || 1)).toFixed(3));
        if (steps) {
          const r = steps.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, (vh * 0.62 - r.top) / r.height));
          steps.style.setProperty("--pp", p.toFixed(3));
          stepEls.forEach((s) => s.classList.toggle("on", s.getBoundingClientRect().top < vh * 0.62));
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    /* 4. Ефекти с мишка, само за десктоп и без „намалено движение“ */
    if (fine && !reduced) {
      html.classList.add("fx");
      const cur = document.createElement("div");
      cur.className = "cursor";
      cur.setAttribute("aria-hidden", "true");
      cur.innerHTML = '<span class="cursor-label"></span>';
      document.body.appendChild(cur);
      const label = cur.firstElementChild as HTMLElement;
      let tx = -100, ty = -100, cx = -100, cy = -100, loop = 0;
      let mag: HTMLElement | null = null;

      const tick = () => {
        cx += (tx - cx) * 0.22;
        cy += (ty - cy) * 0.22;
        cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
        loop = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.3 ? requestAnimationFrame(tick) : 0;
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        tx = e.clientX;
        ty = e.clientY;
        if (!loop) loop = requestAnimationFrame(tick);
        const t = e.target as Element;

        const hot = t.closest("a,button,label,summary,[role=slider],[data-cursor]") as HTMLElement | null;
        const txt = t.closest("input,textarea");
        const lbl = hot?.closest("[data-cursor]")?.getAttribute("data-cursor") || "";
        cur.classList.toggle("is-hot", !!hot && !txt);
        cur.classList.toggle("has-label", !!lbl && !txt);
        cur.classList.toggle("is-text", !!txt);
        if (label.textContent !== lbl) label.textContent = lbl;

        const spot = t.closest("[data-spot]") as HTMLElement | null;
        if (spot) {
          const r = spot.getBoundingClientRect();
          spot.style.setProperty("--sx", `${e.clientX - r.left}px`);
          spot.style.setProperty("--sy", `${e.clientY - r.top}px`);
        }

        const m = t.closest("[data-magnetic]") as HTMLElement | null;
        if (mag && mag !== m) mag.style.transform = "";
        mag = m;
        if (m) {
          const r = m.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
          m.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
        }

        if (hero) {
          const r = hero.getBoundingClientRect();
          if (e.clientY < r.bottom) {
            hero.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
            hero.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
          }
        }
      };
      const onLeave = () => cur.classList.add("is-out");
      const onEnter = () => cur.classList.remove("is-out");
      const onDown = () => cur.classList.add("is-down");
      const onUp = () => cur.classList.remove("is-down");
      document.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      document.documentElement.addEventListener("pointerenter", onEnter);
      document.addEventListener("pointerdown", onDown);
      document.addEventListener("pointerup", onUp);
      cleanups.push(() => {
        document.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        document.documentElement.removeEventListener("pointerenter", onEnter);
        document.removeEventListener("pointerdown", onDown);
        document.removeEventListener("pointerup", onUp);
        cur.remove();
        html.classList.remove("fx");
      });
    }

    /* 5. Пасхалка за програмисти */
    console.log(
      "%c‹T› Tvoreo%c\nЧетеш кода? Харесваме те.\nТворим софтуер по мярка → #ocenka",
      "font:700 20px/1.4 sans-serif;color:#2E6BFF",
      "font:14px/1.6 monospace;color:#5B6B80",
    );

    return () => {
      cleanups.forEach((c) => c());
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
