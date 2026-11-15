'use client';
import type {OfferId} from './offers';
export default function BriefLink({id,children,className='button primary'}:{id?:OfferId;children:React.ReactNode;className?:string}){return <a href="#contacts" className={className} onClick={()=>{const details=document.getElementById('project-details');if(details instanceof HTMLDetailsElement)details.open=true;if(id)window.dispatchEvent(new CustomEvent('nfctag:select',{detail:id}))}}>{children}</a>}
