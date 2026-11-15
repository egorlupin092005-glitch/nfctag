'use client';
import {useState} from 'react';
import {offers} from './offers';
import {imageSources} from './media';
import {Arrow} from './Icons';
import BriefLink from './BriefLink';
export default function Experience(){
 const [selected,setSelected]=useState(0);
 const nfcOffers=offers.filter(x=>x.id!=='websites');
 const item=nfcOffers[selected];
 return <section className="experience" id="experience"><div className="wrap"><div className="experience-heading"><div><h2>Что откроет<br/>одно касание</h2></div><p>Покажем, как NFC помогает клиенту<br/>сделать следующий шаг.</p></div>
 <div className="scenario-options" role="group" aria-label="Выберите сценарий касания">{nfcOffers.map((x,i)=><button type="button" key={x.id} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{x.goal}</button>)}</div>
 <div className="experience-feature" key={item.id}><div className="experience-art"><img src={item.image} srcSet={imageSources(item.image)} sizes="(max-width:600px) 100vw, 600px" alt={'Пример: '+item.name} width="1536" height="1024"/></div><div className="experience-story"><span className="experience-kicker">{item.name}</span><h3>{item.result}</h3><p>{item.benefit}</p><ol className="experience-steps">{item.steps.map((step,i)=><li key={step}><span>{i+1}</span>{step}</li>)}</ol><div className="experience-action"><span>{item.price}</span><BriefLink id={item.id} className="button light-button">Обсудить решение <Arrow/></BriefLink></div></div></div>
 <p className="demo-note">NFC работает на совместимых телефонах. Для открытия онлайн-страницы нужен интернет.</p></div></section>
}
