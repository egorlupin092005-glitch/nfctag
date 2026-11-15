const demos = [
  { href: '/demos/menu/', title: 'Демо меню', kind: 'menu' },
  { href: '/demos/memo/', title: 'Демо личного кабинета', kind: 'account', id: 'memo' },
  { href: '/demos/request/', title: 'Демо формы заявки', kind: 'form', id: 'request' },
];

function Preview({ kind }: { kind: string }) {
  if (kind === 'menu') return <div className="example-preview example-menu" aria-hidden="true">
    <img src="/demos/media/food/toast-960.webp" srcSet="/demos/media/food/toast-320.webp 320w, /demos/media/food/toast-960.webp 960w" sizes="(max-width:700px) 100vw, 400px" alt="" width="960" height="640" loading="lazy" />
    <div className="example-menu-sheet"><div className="example-tabs"><strong>Завтраки</strong><span>Напитки</span></div><div className="example-menu-item"><span>Авокадо-тост</span><strong>590 ₽</strong></div><div className="example-menu-item"><span>Сырники</span><strong>490 ₽</strong></div></div>
  </div>;
  if (kind === 'account') return <div className="example-preview example-account" aria-hidden="true">
    <div className="example-account-heading"><span>Заказ №042</span><span className="example-ready">Готов</span></div>
    <div className="example-order-title">Ваша чашка<br/>готова к встрече</div>
    <div className="example-pickup"><span>Получение</span><strong>В мастерской <span>↗</span></strong></div>
    <div className="example-care"><span>Памятка по уходу</span><span>↗</span></div>
  </div>;
  return <div className="example-preview example-form" aria-hidden="true">
    <div className="example-form-label">Запись на занятие</div>
    <div className="example-field"><span>Занятие</span><strong>Мастер-класс <span>⌄</span></strong></div>
    <div className="example-field"><span>Ваше имя</span><strong className="example-placeholder">Как к вам обращаться</strong></div>
    <div className="example-submit"><span>Выбрать время</span><span>→</span></div>
  </div>;
}

export default function DemoShowcase() {
  return <div className="demo-showcase" id="demos"><div className="showcase-track">{demos.map(demo => <a href={demo.href} className="showcase-case" id={demo.id} key={demo.href}>
    <Preview kind={demo.kind}/>
    <div className="case-description"><h3>{demo.title}</h3><span className="case-open">Открыть демо <span aria-hidden="true">↗</span></span></div>
  </a>)}</div></div>;
}
