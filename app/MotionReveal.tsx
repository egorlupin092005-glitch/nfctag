'use client';
import {useEffect} from 'react';
export default function MotionReveal(){useEffect(()=>{
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const nodes=document.querySelectorAll('.web-services-heading,.demo-grid,.menu-service-heading,.menu-service-grid,.portfolio-grid,.price-grid article,.steps article,.faq>div,.contact-heading,.brief-fields,.brief-summary');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.06,rootMargin:'0px 0px -20px 0px'});
 const setup=()=>{if(document.documentElement.dataset.motion==='off'||(reduced.matches&&document.documentElement.dataset.motion!=='on')){nodes.forEach(n=>n.classList.remove('will-reveal','is-visible'));observer.disconnect();return;}nodes.forEach((node,i)=>{if(node.getBoundingClientRect().top>innerHeight){node.classList.remove('is-visible');node.classList.add('will-reveal');(node as HTMLElement).style.setProperty('--reveal-delay',`${Math.min(i%3,2)*45}ms`);observer.observe(node)}})};setup();window.addEventListener('nfctag-motion',setup);
 let frame=0;const update=()=>{frame=0;document.querySelector('.header')?.setAttribute('data-scrolled',String(scrollY>30))};const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)};window.addEventListener('scroll',scroll,{passive:true});update();
 const enable=()=>{if(reduced.matches){nodes.forEach(n=>n.classList.add('is-visible'));observer.disconnect()}};reduced.addEventListener('change',enable);
 return()=>{observer.disconnect();window.removeEventListener('nfctag-motion',setup);window.removeEventListener('scroll',scroll);reduced.removeEventListener('change',enable);if(frame)cancelAnimationFrame(frame);nodes.forEach(n=>n.classList.remove('will-reveal','is-visible'))}
},[]);return null}

