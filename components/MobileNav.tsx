"use client";
import { useEffect, useState } from "react";

export function MobileNav({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <button
        className="burger"
        aria-expanded={open}
        aria-controls="mnav"
        aria-label={open ? "Затвори менюто" : "Отвори менюто"}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
      </button>
      <nav id="mnav" className="mnav" aria-label="Мобилна навигация" data-open={open} hidden={!open}>
        <ul>
          {items.map((n, i) => (
            <li key={n.href} style={{ ["--i" as string]: i }}>
              <a href={n.href} onClick={() => setOpen(false)}>
                <span className="mnav-n">0{i + 1}</span>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="btn btn-primary" href="#ocenka" onClick={() => setOpen(false)}>
          Започни проект
        </a>
      </nav>
    </>
  );
}
