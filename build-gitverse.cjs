// Generate a separate, reproducible static export for GitVerse Pages.
// The regular Next/Vercel build keeps its existing root URL.
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const basePath = '/nfctag-site';
const origin = 'https://m1tski.gitverse.site';
const destination = path.resolve(__dirname, '../nfctag-gitverse');
const result = spawnSync(process.execPath, [require.resolve('next/dist/bin/next'), 'build'], {
  cwd: __dirname, stdio: 'inherit',
  env: {...process.env, GITVERSE_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: origin + basePath + '/'}
});
if (result.status !== 0) process.exit(result.status || 1);
// Only generated website files are copied; project notes, secrets and raw assets stay local.
fs.mkdirSync(destination, {recursive: true});
fs.cpSync(path.join(__dirname, 'out'), destination, {recursive: true});
let count = 0;
const includeEntries = new Set();
function visit(folder) {
  for (const entry of fs.readdirSync(folder, {withFileTypes:true})) {
    const file = path.join(folder, entry.name);
    const relative = path.relative(destination, file).split(path.sep).join('/');
    if (relative.split('/').some(part => part.startsWith('_'))) includeEntries.add(relative);
    if (entry.isDirectory()) { visit(file); continue; }
    count++;
    if (!/\.(html|css|js|json|txt)$/.test(entry.name)) continue;
    const original = fs.readFileSync(file, 'utf8');
    let content = original.replace(/(?<![\w/.-])\/(assets|work|demo-business|demos)(?=\/|["'\\])/g, basePath + '/$1');
    content = content.replaceAll(origin + '/work/', origin + basePath + '/work/');
    content = content.replaceAll('href="/#', 'href="' + basePath + '/#');
    content = content.replaceAll('rel="canonical" href="' + origin + '/"', 'rel="canonical" href="' + origin + basePath + '/"');
    if (content !== original) fs.writeFileSync(file, content);
  }
}
visit(destination);
fs.writeFileSync(path.join(destination, '.nojekyll'), '');
// Preserve Next runtime directories even when the Pages runner invokes Jekyll.
fs.writeFileSync(path.join(destination, '_config.yml'), 'include:\n' + [...includeEntries].sort().map(entry => '  - ' + JSON.stringify(entry)).join('\n') + '\n');
console.log(`GitVerse export: ${destination} (${count} files)`);
