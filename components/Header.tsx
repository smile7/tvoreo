import { MobileNav } from "./MobileNav";

export const NAV = [
  { href: "#uslugi", label: "Услуги" },
  { href: "#proekti", label: "Проекти" },
  { href: "#proces", label: "Как работим" },
  { href: "#ekip", label: "За нас" },
];

export function Header() {
  return (
    <header className="site-header" data-header>
      <a className="skip" href="#main">Към съдържанието</a>
      <div className="hdr">
        <a className="hdr-logo" href="#top" aria-label="Tvoreo — начало">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/tvoreo-logo.svg" alt="Tvoreo" width="137" height="49" fetchPriority="high" />
        </a>
        <nav className="hdr-nav" aria-label="Основна навигация">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hdr-end">
          <div className="lang" role="group" aria-label="Език">
            <a href="#top" aria-current="true" lang="bg">BG</a>
            <a href="#top" lang="en" title="Английската версия (/en) идва след прототипа">EN</a>
          </div>
          <a className="btn btn-primary btn-sm" href="#ocenka" data-magnetic data-estimate="">
            Започни проект
          </a>
          <MobileNav items={NAV} />
        </div>
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
