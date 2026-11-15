'use strict';

const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));
const rub = value => new Intl.NumberFormat('ru-RU', {style:'currency',currency:'RUB',maximumFractionDigits:0}).format(value);
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

$$('[data-close]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
$$('dialog').forEach(dialog => dialog.addEventListener('click', event => {if(event.target === dialog) dialog.close()}));

if(document.body.dataset.demo === 'menu') {
 const menu = [
  {id:'espresso',category:'coffee',name:'Эспрессо',description:'Короткий и насыщенный',composition:'Кофе, вода',price:160,volumes:[['40 мл',0]]},
  {id:'americano',category:'coffee',name:'Американо',description:'Чёрный кофе для неспешного утра',composition:'Эспрессо, горячая вода',price:190,volumes:[['200 мл',0],['300 мл',40]]},
  {id:'filter',category:'coffee',name:'Фильтр',description:'Чистый вкус без молока',composition:'Фильтр-кофе',price:210,volumes:[['250 мл',0],['350 мл',50]]},
  {id:'cappuccino',category:'coffee',name:'Капучино',description:'Равновесие кофе и молочной пены',composition:'Эспрессо, молоко',price:260,milk:true,volumes:[['200 мл',0],['300 мл',50]]},
  {id:'latte',category:'coffee',name:'Латте',description:'Мягкий кофе с большим количеством молока',composition:'Эспрессо, молоко',price:290,milk:true,volumes:[['300 мл',0],['400 мл',60]]},
  {id:'flatwhite',category:'coffee',name:'Флэт уайт',description:'Двойной эспрессо и тонкая молочная пена',composition:'Двойной эспрессо, молоко',price:280,milk:true,volumes:[['200 мл',0]]},
  {id:'blacktea',category:'tea',name:'Чёрный чай',description:'Классический чай в чайнике',composition:'Чёрный листовой чай, вода',price:240,volumes:[['400 мл',0]]},
  {id:'greentea',category:'tea',name:'Зелёный чай',description:'Лёгкий и деликатный',composition:'Зелёный листовой чай, вода',price:240,volumes:[['400 мл',0]]},
  {id:'berrytea',category:'tea',name:'Ягодный чай',description:'Тёплый напиток с ягодами и мятой',composition:'Ягоды, мята, вода, сахар',price:320,volumes:[['400 мл',0]]},
  {id:'croissant',category:'dessert',name:'Круассан',description:'Слоёное тесто и сливочное масло',composition:'Пшеничная мука, сливочное масло, молоко, яйцо, сахар, дрожжи',price:220,volumes:[['70 г',0]]},
  {id:'cheesecake',category:'dessert',name:'Чизкейк',description:'Сливочный десерт на песочной основе',composition:'Сливочный сыр, сливки, яйцо, сахар, пшеничная мука, сливочное масло',price:340,volumes:[['120 г',0]]},
  {id:'brownie',category:'dessert',name:'Брауни',description:'Шоколадный, с плотной серединой',composition:'Шоколад, сливочное масло, яйцо, сахар, пшеничная мука',price:280,volumes:[['90 г',0]]},
 ];
 const categories = {coffee:'Кофе',tea:'Чай',dessert:'Десерты'};
 let category='all', current=null, quantity=1, feedbackTimer;
 const selection = new Map();
 function renderMenu(){
  const search=$('#menu-search').value.trim().toLocaleLowerCase('ru');
  const visible=menu.filter(item=>(category==='all'||item.category===category)&&(item.name+' '+item.description+' '+item.composition).toLocaleLowerCase('ru').includes(search));
  $('#menu-results').innerHTML=visible.map(item=>`<button class="menu-item" type="button" data-item="${item.id}" aria-label="Открыть: ${item.name}"><span class="menu-item-category">${categories[item.category]} · ${item.volumes[0][0]}</span><span class="menu-item-name">${item.name}</span><span class="menu-item-description">${item.description}</span><span class="menu-item-bottom"><strong>${rub(item.price)}</strong><span aria-hidden="true">↗</span></span></button>`).join('');
  $('#menu-empty').hidden=visible.length!==0;
  $('#menu-count').textContent='Позиций: '+visible.length;
 }
 function selectCategory(value){category=value;$$('[data-category]').forEach(button=>{const active=button.dataset.category===value;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1});$('#menu-results').setAttribute('aria-labelledby','tab-'+value);renderMenu()}
 $$('[data-category]').forEach((button,index)=>{
  button.addEventListener('click',()=>selectCategory(button.dataset.category));
  button.addEventListener('keydown',event=>{const tabs=$$('[data-category]');let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();tabs[next].click();tabs[next].focus()}});
 });
 $('#menu-search').addEventListener('input',renderMenu);
 $('#menu-reset').addEventListener('click',()=>{$('#menu-search').value='';selectCategory('all');$('#menu-search').focus()});
 function unitPrice(){return current.price+Number(current.volumes[Number($('#item-volume').value)][1])+(current.milk&&$('#item-milk').value==='oat'?60:0)}
 function renderItemPrice(){$('#item-quantity').textContent=quantity;$('#item-price').textContent=rub(unitPrice()*quantity);$('#item-minus').disabled=quantity===1;$('#item-plus').disabled=quantity===20;if(current.milk)$('#item-composition').textContent='Состав: '+current.composition.replace('молоко',$('#item-milk').value==='oat'?'овсяный напиток':'молоко')}
 $('#menu-results').addEventListener('click',event=>{
  const button=event.target.closest('[data-item]');if(!button)return;
  current=menu.find(item=>item.id===button.dataset.item);quantity=1;
  $('#item-category').textContent=categories[current.category];$('#item-title').textContent=current.name;$('#item-description').textContent=current.description;$('#item-composition').textContent='Состав: '+current.composition;
  $('#item-volume').innerHTML=current.volumes.map(([label,extra],i)=>`<option value="${i}">${label}${extra?' · +'+rub(extra):''}</option>`).join('');
  $('#volume-label').firstChild.textContent=current.category==='dessert'?'Порция':'Объём';$('#milk-label').hidden=!current.milk;$('#item-milk').value='regular';renderItemPrice();$('#item-dialog').showModal();
 });
 $('#item-minus').addEventListener('click',()=>{quantity=Math.max(1,quantity-1);renderItemPrice()});
 $('#item-plus').addEventListener('click',()=>{quantity=Math.min(20,quantity+1);renderItemPrice()});
 $('#item-volume').addEventListener('change',renderItemPrice);$('#item-milk').addEventListener('change',renderItemPrice);
 function totals(){let count=0,total=0;selection.forEach(item=>{count+=item.quantity;total+=item.unit*item.quantity});return {count,total}}
 function updateSelection(){const value=totals();$('#selection-count').textContent=value.count?'В списке: '+value.count:'Ваш список пуст';$('#selection-total').textContent=rub(value.total);$('#view-selection').disabled=value.count===0}
 $('#add-selection').addEventListener('click',()=>{
  const volume=Number($('#item-volume').value), milk=current.milk?$('#item-milk').value:'none', key=[current.id,volume,milk].join(':');
  const existing=selection.get(key);const newQuantity=Math.min(99,(existing?.quantity||0)+quantity);
  selection.set(key,{name:current.name,details:current.volumes[volume][0]+(current.milk?' · '+(milk==='oat'?'овсяное молоко':'обычное молоко'):''),unit:unitPrice(),quantity:newQuantity});
  updateSelection();$('#item-dialog').close();$('#menu-feedback').textContent=current.name+' — в вашем списке';$('#menu-feedback').classList.add('visible');clearTimeout(feedbackTimer);feedbackTimer=setTimeout(()=>$('#menu-feedback').classList.remove('visible'),2600);
 });
 function renderReceipt(){
  $('#selection-items').innerHTML=selection.size?Array.from(selection.entries()).map(([key,item])=>`<div class="receipt-item"><div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.details)} · ${item.quantity} шт.</p><button class="quiet" type="button" data-remove="${key}" aria-label="Убрать: ${escapeHtml(item.name)}">Убрать</button></div><strong>${rub(item.unit*item.quantity)}</strong></div>`).join(''):'<p class="empty-receipt">Вы пока ничего не выбрали.</p>';
  $('#receipt-total').textContent=rub(totals().total);
 }
 $('#view-selection').addEventListener('click',()=>{renderReceipt();$('#selection-dialog').showModal()});
 $('#selection-items').addEventListener('click',event=>{const button=event.target.closest('[data-remove]');if(button){selection.delete(button.dataset.remove);updateSelection();renderReceipt()}});
 renderMenu();updateSelection();
}

if(document.body.dataset.demo==='memo'){
 const key='nfctag:demo-memo:v1';let saved={};
 try {const value=JSON.parse(localStorage.getItem(key)||'{}');if(value&&typeof value==='object')saved=value} catch {$('#memo-storage-note').hidden=false}
 $$('[data-memo-check]').forEach(input=>{input.checked=saved[input.dataset.memoCheck]===true});
 function updateMemo(persist){const inputs=$$('[data-memo-check]'),count=inputs.filter(input=>input.checked).length;$('#memo-progress').value=count;$('#memo-progress-text').textContent='Готово: '+count+' из '+inputs.length;if(persist){const value={};inputs.forEach(input=>value[input.dataset.memoCheck]=input.checked);try{localStorage.setItem(key,JSON.stringify(value))}catch{$('#memo-storage-note').hidden=false}}}
 $$('[data-memo-check]').forEach(input=>input.addEventListener('change',()=>updateMemo(true)));
 $('#memo-reset').addEventListener('click',()=>{$$('[data-memo-check]').forEach(input=>input.checked=false);updateMemo(true)});
 $('#memo-print').addEventListener('click',()=>window.print());updateMemo(false);
}

if(document.body.dataset.demo==='request'){
 const now=new Date(), pad=value=>String(value).padStart(2,'0');
 $('#request-date').min=[now.getFullYear(),pad(now.getMonth()+1),pad(now.getDate())].join('-');
 let status='Получена';
 function logStatus(value){const item=document.createElement('li'),time=document.createElement('time'),text=document.createElement('span');time.dateTime=new Date().toISOString();time.textContent=new Date().toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'});text.textContent=value;item.append(time,text);$('#request-history').append(item)}
 function changeStatus(value){status=value;$('#customer-status').textContent=value;$$('[data-status]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.status===value)))}
 $('#request-form').addEventListener('submit',event=>{
  event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
  if(!$('#request-name').value.trim()){$('#request-name').setCustomValidity('Укажите имя');$('#request-name').reportValidity();return}
  const data=new FormData(form), date=new Date(data.get('date')+'T12:00:00');
  $('#request-summary').replaceChildren();
  [['Занятие',data.get('workshop')],['День',date.toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'})],['Участников',data.get('guests')],['Имя',data.get('name').trim()],['Пожелания',data.get('comment').trim()||'Без пожеланий']].forEach(([label,value])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;$('#request-summary').append(dt,dd)});
  $('#request-number').textContent='Демо-заявка · '+String(Math.floor(1000+Math.random()*9000));$('#request-history').replaceChildren();changeStatus('Получена');logStatus('Заявка получена');form.hidden=true;$('#request-result').hidden=false;$('#request-result').focus();
 });
 $('#request-name').addEventListener('input',()=>$('#request-name').setCustomValidity(''));
 $$('[data-status]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.status===status)return;changeStatus(button.dataset.status);logStatus('Статус: '+status)}));
 $('#request-again').addEventListener('click',()=>{$('#request-form').reset();$('#request-name').setCustomValidity('');$('#request-result').hidden=true;$('#request-form').hidden=false;$('#request-date').focus()});
}
