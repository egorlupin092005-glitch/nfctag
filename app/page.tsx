import MotionToggle from './MotionToggle';
import MotionReveal from './MotionReveal';
import {imageSources} from './media';
import ProjectBrief from './ProjectBrief';
import BriefLink from './BriefLink';
import WebsiteServices from './WebsiteServices';
import MenuService from './MenuService';
import Portfolio from './Portfolio';
import {solutions,faqs} from './data';
import {offers} from './offers';
import {Arrow} from './Icons';
function Brand(){return <a className="brand" href="#top" aria-label="NFCtag — начало страницы"><span className="brand-symbol"><img src="/assets/logo-ice.webp" alt="" width="1100" height="1100"/></span><span className="brand-word"><img src="/assets/logo-ice.webp" alt="NFCtag" width="1100" height="1100"/></span></a>}
export default function Home(){return <>
 <a className="skip" href="#main">К содержимому</a>
 <header className="header glass"><Brand/><nav aria-label="Основная навигация"><a href="#menu">Меню</a><a href="#websites">Сайты и демо</a><a href="#work">NFC</a><a href="#pricing">Стоимость</a></nav><a className="button primary compact" href="#contacts">Написать Егору <Arrow/></a></header>
 <main id="main"><MotionReveal/>
  <section className="hero wrap service-hero" id="top"><div className="hero-copy"><h1>NFC-стойки, меню<br/>и сайты для бизнеса<br/>в Туле</h1><p className="brand-tagline">Касание. И вы на связи.</p><p>Делаем носители с вашим дизайном и цифровые страницы: от меню и контактов до заявок и обработки заказов.</p><div className="hero-actions"><a className="button primary" href="/demos/menu/">Попробовать меню <Arrow/></a><a className="hero-secondary" href="#websites">Сайты и примеры <span aria-hidden="true">↓</span></a></div></div>
  <div className="hero-showcase" aria-label="Четыре решения NFCtag">{solutions.map((item,i)=><a className={'hero-tile hero-tile-'+i} href={i===2?'#menu':'#'+item.id} key={item.id}><img src={item.works[0].src} srcSet={imageSources(item.works[0].src)} sizes="(max-width:600px) 50vw, 300px" alt={item.works[0].title} width={item.works[0].width} height={item.works[0].height} fetchPriority={i===0?'high':'auto'}/><span className="tile-caption"><span>{['Отзывы','Ваши ссылки','Меню на столе','Личная визитка'][i]}</span><Arrow/></span></a>)}</div></section>
  <WebsiteServices/>
  <MenuService/>
  <Portfolio/>
  <section className="pricing wrap" id="pricing"><div className="section-heading"><h2>Стоимость носителей</h2><p>Ориентиры за одну штуку. Разработка сайта или цифрового меню в эти суммы не входит.</p></div><div className="price-grid">{[offers[0],offers[2],offers[3]].map(item=><article key={item.id}><span className="price-name">{item.name}</span><strong>{item.price}</strong><p>{item.priceNote}</p><BriefLink id={item.id} className="text-link">Обсудить комплектацию <Arrow/></BriefLink></article>)}</div><div className="price-footnote"><p>Материал, тираж, страницу, размещение и обновления перечисляем в расчёте. Итоговую сумму согласуем до начала работы.</p><BriefLink id="websites" className="text-link">Рассчитать сайт <Arrow/></BriefLink></div></section>
  <section className="process wrap" id="process"><div className="section-heading"><h2>Как проходит работа</h2><p>Изготовление носителей — от 7 до 45 дней: срок зависит от печати наклеек и наличия NFC-чипов. Точную дату фиксируем при согласовании заказа. Срок разработки сайта рассчитываем отдельно.</p></div><div className="steps">{[['Задача и состав','Уточняем носитель, объём цифровой страницы и необходимые функции. Вы предоставляете контент и материалы бренда.'],['Дизайн и согласование','Показываем оформление, фиксируем стоимость, комплектацию и срок. Для цифрового меню включён один бесплатный раунд правок.'],['Изготовление и запуск','Печатаем и настраиваем носители, проверяем переходы и работу страницы. Передаём согласованные материалы и инструкцию.']].map(([title,description],i)=><article key={title}><span>{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
  <section className="faq wrap" id="faq"><div><h2>Перед заказом</h2><a className="text-link" href="#contacts">Спросить Егора <Arrow/></a></div><div className="faq-list">{faqs.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
  <section className="contacts wrap" id="contacts"><div className="contact-heading"><h2>На связи — Егор</h2><p>Ваш контакт по проекту. Обсудим задачу, состав работ, оформление и запуск. Можно сразу написать в Telegram или подготовить запрос на расчёт.</p><a className="button primary contact-direct" href="https://t.me/whismym1" target="_blank" rel="noopener noreferrer">Написать Егору <Arrow/></a></div><details className="project-details" id="project-details"><summary>Подготовить запрос на расчёт <span aria-hidden="true">+</span></summary><ProjectBrief/></details><div className="other-contacts"><span>Также можно связаться</span><a href="tel:+79208148671">+7 (920) 814-86-71</a><a href="mailto:whismym@vk.com">whismym@vk.com</a></div></section>
 </main>
 <footer className="wrap"><Brand/><a href="#top">В начало ↑</a><MotionToggle/><small>© {new Date().getFullYear()} NFCtag · Тула</small></footer>
 </>}
