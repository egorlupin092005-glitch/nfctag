import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('out');
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');let p=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(p!==root&&!p.startsWith(root+path.sep)){res.writeHead(403).end();return;}if((await stat(p)).isDirectory())p=path.join(p,'index.html');const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.pdf':'application/pdf','.png':'image/png','.woff':'font/woff','.txt':'text/plain'};res.setHeader('Content-Type',types[path.extname(p)]||'application/octet-stream');res.end(await readFile(p));}catch{res.writeHead(404).end('Not found');}}).listen(Number(process.env.PORT)||3001,'127.0.0.1',()=>console.log('http://127.0.0.1:3001'));


