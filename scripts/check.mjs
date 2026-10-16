import {readFileSync,existsSync} from 'node:fs';
const dir=new URL('../public/',import.meta.url);
for(const file of ['index.html','styles.css','app.mjs','engine.mjs','favicon.svg','_headers']){if(!existsSync(new URL(file,dir)))throw new Error(`Missing deployment asset ${file}`);}
const html=readFileSync(new URL('index.html',dir),'utf8');
for(const asset of ['/app.mjs','/styles.css','/favicon.svg'])if(!html.includes(asset))throw new Error(`Missing entry ${asset}`);
if(/https?:\/\//.test(html))throw new Error('External resources forbidden in zero-dependency UI');
if(/GEMINI_API_KEY|process\.env|cdn\.tailwindcss/.test(readFileSync(new URL('app.mjs',dir),'utf8')+html))throw new Error('Unsafe secret or CDN references');
const config=JSON.parse(readFileSync(new URL('../wrangler.jsonc',import.meta.url),'utf8'));
if(config.assets.directory!=='./public')throw new Error('Cloudflare assets configuration mismatch');
console.log('Static assets and Cloudflare config verified.');
