'use client';
import {useEffect,useRef,useState} from 'react';
import {solutions} from './data';
import {offers} from './offers';
import {imageSources} from './media';
import Carousel from './Carousel';
import BriefLink from './BriefLink';
import {Arrow} from './Icons';

export default function Portfolio(){
 const [selected,setSelected]=useState<number|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{if(selected!==null&&!dialog.current?.open)dialog.current?.showModal()},[selected]);
 const titles=['Стойки для отзывов','Страницы со ссылками','Наклейки с меню','Личные NFC-визитки'];
 const descriptions=['Переход на площадку с отзывами','Контакты, соцсети и запись в одном месте','Меню на телефоне гостя за столом','Контакты и портфолио после знакомства'];
 return <section className="portfolio-section wrap" id="work" aria-labelledby="portfolio-title">
  <div className="section-heading"><h2 id="portfolio-title">Четыре формата NFC</h2><p>Выберите формат, чтобы открыть полную подборку примеров.</p></div>
  <div className="portfolio-grid">{solutions.map((item,i)=><article className="portfolio-card" id={item.id} key={item.id}>
   <button type="button" className="portfolio-image" onClick={()=>setSelected(i)} aria-label={'Посмотреть примеры: '+titles[i]}><img src={item.works[0].src} srcSet={imageSources(item.works[0].src)} sizes="(max-width:600px) 100vw, 580px" alt={item.works[0].title} width={item.works[0].width} height={item.works[0].height} loading="lazy"/></button>
   <div className="portfolio-card-body"><div><h3>{titles[i]}</h3><p>{descriptions[i]}</p></div><div className="portfolio-actions"><button type="button" className="text-link" onClick={()=>setSelected(i)}>Примеры · {item.works.length} <Arrow/></button><BriefLink id={offers[i].id} className="text-link">Обсудить <Arrow/></BriefLink></div></div>
  </article>)}</div>
  <p className="portfolio-note">Дизайн-концепции и визуализации. Оформление, материал и размер согласуем под ваш проект.</p>
  <dialog ref={dialog} className="portfolio-dialog" onClose={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close()}} aria-label={selected===null?'Примеры работ':titles[selected]}>
   <div className="portfolio-dialog-content"><button type="button" className="close" onClick={()=>dialog.current?.close()} aria-label="Закрыть подборку">✕</button>{selected!==null&&<><h2>{titles[selected]}</h2><p className="portfolio-dialog-note">Дизайн-концепции и визуализации</p><Carousel key={selected} works={solutions[selected].works} label={solutions[selected].short}/></>}</div>
  </dialog>
 </section>
}
