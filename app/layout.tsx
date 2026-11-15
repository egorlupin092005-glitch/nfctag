import type {Metadata,Viewport} from 'next';
import './styles.css';
import './service-styles.css';
export const viewport:Viewport={themeColor:'#f5f7fa'};
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://'+process.env.VERCEL_PROJECT_PRODUCTION_URL : 'https://nfctag-touch-studio.egor-lupin092005.chatgpt.site')),title:'NFCtag — NFC-стойки, меню и сайты для бизнеса в Туле',description:'Сайты для бизнеса: лендинги, каталоги, онлайн-запись, приём и обработка заказов. NFC-стойки, меню и визитки с вашим дизайном. Обсудите проект с NFCtag.',alternates:{canonical:'/'},openGraph:{title:'NFCtag — ваш бизнес в одном касании',description:'Сайты под задачи бизнеса, приём и обработка заказов. NFC-стойки, меню и визитки с вашим дизайном.',locale:'ru_RU',type:'website',images:[{url:'/work/stands-02-cafe-window.webp',width:1536,height:1024,alt:'NFC-стойки с индивидуальным дизайном'}]},twitter:{card:'summary_large_image'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ru"><head><link rel="preload" href="/assets/Golos-Text_Regular.woff" as="font" type="font/woff" crossOrigin="anonymous"/><link rel="preload" href="/assets/Golos-Text_Medium.woff" as="font" type="font/woff" crossOrigin="anonymous"/></head><body>{children}</body></html>}

