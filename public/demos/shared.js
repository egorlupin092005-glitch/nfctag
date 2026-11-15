export const q=(selector,root=document)=>root.querySelector(selector);
export const all=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
export const money=value=>new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',maximumFractionDigits:0}).format(value);
export const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function readLocal(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
export function writeLocal(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}}
export function setupDialogs(){all('[data-close]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.close)?.close()));all('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()}))}
export function toast(text){const target=q('#toast');if(!target)return;target.textContent=text;target.classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>target.classList.remove('visible'),2800)}
export function isoDate(date){const pad=n=>String(n).padStart(2,'0');return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`}
export function prettyDate(value,withYear=false){return new Date(value+'T12:00:00').toLocaleDateString('ru-RU',{day:'numeric',month:'long',...(withYear?{year:'numeric'}:{})})}
export function downloadFile(name,content,type){const url=URL.createObjectURL(new Blob([content],{type}));const anchor=document.createElement('a');anchor.href=url;anchor.download=name;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
