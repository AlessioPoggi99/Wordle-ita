if(!self.define){let e,s={};const i=(i,o)=>(i=new URL(i+".js",o).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(o,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let n={};const l=e=>i(e,r),a={module:{uri:r},exports:n,require:l};s[r]=Promise.all(o.map((e=>a[e]||l(e)))).then((e=>(c(...e),n)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/chart-0db6fd1c.svg",revision:null},{url:"assets/gear-a83d35b2.svg",revision:null},{url:"assets/globe-35b6161d.svg",revision:null},{url:"assets/import-cca99fdf.svg",revision:null},{url:"assets/index-954f0ad0.js",revision:null},{url:"assets/index-b8fed1c6.css",revision:null},{url:"assets/info-ed8a8b63.svg",revision:null},{url:"assets/trash-a204de5e.svg",revision:null},{url:"assets/workbox-window.prod.es5-a7b12eab.js",revision:null},{url:"assets/xmark-cce288d1.svg",revision:null},{url:"icons/maskable-icon.svg",revision:"df6a273c01cb4e271db078457554eb2b"},{url:"icons/wordle_logo_144x144.png",revision:"5ebc3f23954fb4cc057cfc7e6b3de340"},{url:"icons/wordle_logo_192x192.png",revision:"54c2bda6b25497b97297691c3e9896cc"},{url:"icons/wordle_logo_32x32.png",revision:"8a5ea1a89734fbc5384bfa4dff21a6cf"},{url:"icons/wordle_logo_512x512.png",revision:"b33c6a9186337be8c8dd0f6f5efc2579"},{url:"icons/wordle-apple-touch-icon.png",revision:"a96ecf516cb5820bb3027b1d19983c07"},{url:"icons/wordle-favicon.ico",revision:"8a5ea1a89734fbc5384bfa4dff21a6cf"},{url:"index.html",revision:"cafc8e5cb847017f8ca673bd34688574"},{url:"manifest.webmanifest",revision:"8d829a87137dad02a1ecc34f9b6e5742"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"sitemap.xml",revision:"5f230ccf637b79afd92af3e9a27e6b9f"},{url:"icons/wordle_logo_512x512.png",revision:"b33c6a9186337be8c8dd0f6f5efc2579"},{url:"icons/wordle_logo_192x192.png",revision:"54c2bda6b25497b97297691c3e9896cc"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"sitemap.xml",revision:"5f230ccf637b79afd92af3e9a27e6b9f"},{url:"icons/maskable-icon.svg",revision:"df6a273c01cb4e271db078457554eb2b"},{url:"icons/wordle-apple-touch-icon.png",revision:"a96ecf516cb5820bb3027b1d19983c07"},{url:"icons/wordle-favicon.ico",revision:"8a5ea1a89734fbc5384bfa4dff21a6cf"},{url:"icons/wordle_logo_144x144.png",revision:"5ebc3f23954fb4cc057cfc7e6b3de340"},{url:"icons/wordle_logo_32x32.png",revision:"8a5ea1a89734fbc5384bfa4dff21a6cf"},{url:"manifest.webmanifest",revision:"8d829a87137dad02a1ecc34f9b6e5742"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
