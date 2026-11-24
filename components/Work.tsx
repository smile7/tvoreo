import Image from "next/image";
import { HScroll } from "./HScroll";

function Ph({ children }: { children: React.ReactNode }) {
  return <span className="ph-inline">{children}</span>;
}

const OTHERS = [
  {
    k: "museum",
    sector: "Култура и туризъм",
    title: "Музейно приложение",
    who: "[Музей в Северна България]",
    text: "[1–2 изречения какво направихме: напр. аудиогид, карта, офлайн режим. Попълва се с реалния проект.]",
    kind: "чака съгласие на клиента",
  },
  {
    k: "food",
    sector: "Ресторанти",
    title: "Онлайн поръчка на храна",
    who: "[Ресторант в Русе]",
    text: "[Основни функции и срок на изработка. Цифри само ако клиентът ги потвърди.]",
    kind: "анонимен проект",
  },
  {
    k: "qr",
    sector: "Заведения",
    title: "QR меню и поръчка от масата",
    who: "[Заведение в Русе]",
    text: "[Какво прави системата. Снимка на менюто, ако е разрешена.]",
    kind: "чака съгласие на клиента",
  },
  {
    k: "more",
    sector: "[Сектор]",
    title: "[Проект с линк или снимка]",
    who: "[Име, ако е разрешено]",
    text: "[Снимка на екрана или видео + линк към живия проект.]",
    kind: "с разрешение на клиента",
  },
];

function Illus({ k }: { k: string }) {
  if (k === "museum")
    return (
      <div className="il il-museum">
        <div className="ilm-phone"><div className="ilm-art" /><div className="ilm-play"><i /><s /></div><b /><b /></div>
      </div>
    );
  if (k === "food")
    return (
      <div className="il il-food">
        {[0, 1, 2].map((i) => <div key={i} className="ilf-row"><i /><b /><em>+</em></div>)}
        <div className="ilf-btn">Поръчай</div>
      </div>
    );
  if (k === "qr")
    return (
      <div className="il il-qr">
        <div className="ilq-table"><div className="ilq-code" /></div>
        <div className="ilq-menu"><b /><b /><b /><b /></div>
      </div>
    );
  return (
    <div className="il il-more">
      <span>[снимка на екрана]</span>
    </div>
  );
}

export function Work() {
  const head = (
    <div className="wrap work-head">
      <p className="kicker">02 — Избрани проекти</p>
      <h2 id="work-title" className="h2">
        Проекти, които <span className="accent-u">работят в момента.</span>
      </h2>
      <p className="sec-lede">
        Част от клиентите ни предпочитат дискретност, затова някои проекти показваме без име. Работата е реална.
      </p>
    </div>
  );

  return (
    <section className="work" id="proekti" aria-labelledby="work-title">
      <HScroll head={head}>
        <article className="case case-a" data-cursor="Виж">
          <div className="case-media">
            <div className="frame-desk">
              <div className="fd-bar"><i /><i /><i /><span>all4ruse.com</span></div>
              <Image
                src="/work/all4ruse-desktop.webp"
                alt="All4Ruse: начална страница със списък на събитията в Русе, филтри и календар"
                width={1600}
                height={1000}
                sizes="(min-width: 1024px) 640px, 90vw"
              />
            </div>
            <div className="frame-phone">
              <Image
                src="/work/all4ruse-mobile.webp"
                alt="All4Ruse на телефон: карти на събития с бутони за запазване и харесване"
                width={520}
                height={1125}
                sizes="180px"
              />
            </div>
          </div>
          <div className="case-body">
            <p className="case-meta">
              <span className="pill pill-a">Пълен кейс</span> Платформа · Русе · <Ph>[година]</Ph>
            </p>
            <h3>All4Ruse: всички събития в Русе на едно място</h3>
            <p>
              Платформа, в която организаторите публикуват събития, а хората в града ги намират, филтрират, запазват
              и харесват. Вход и профили, календар, тъмна тема, мобилна навигация като в приложение.
            </p>
            <dl className="case-kpi">
              <div><dt>Потребители</dt><dd><Ph>[N]</Ph></dd></div>
              <div><dt>Събития</dt><dd><Ph>[N]</Ph></dd></div>
              <div><dt>Посещения / мес.</dt><dd><Ph>[N]</Ph></dd></div>
            </dl>
            <div className="case-links">
              <a href="https://all4ruse.com" target="_blank" rel="noopener" className="link-arrow">
                all4ruse.com <span aria-hidden="true">↗</span>
              </a>
              <span className="muted-s">Подробният кейс: <Ph>[скоро]</Ph></span>
            </div>
          </div>
        </article>

        {OTHERS.map((o) => (
          <article className="case case-s" key={o.k} data-cursor="Скоро">
            <div className="case-media">
              <Illus k={o.k} />
              <span className="ph-tag ph-tag-abs">Илюстрация · {o.kind}</span>
            </div>
            <div className="case-body">
              <p className="case-meta">{o.sector} · <Ph>{o.who}</Ph></p>
              <h3>{o.title}</h3>
              <p className="ph-text">{o.text}</p>
            </div>
          </article>
        ))}

        <a className="case case-end" href="#proekti" data-cursor="Всички">
          <span className="ce-n">Всички проекти</span>
          <span className="ce-arrow" aria-hidden="true">→</span>
          <span className="ce-sub">Филтри по тип и сектор. Страницата е следваща стъпка.</span>
        </a>
      </HScroll>
    </section>
  );
}
