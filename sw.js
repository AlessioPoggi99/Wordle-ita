if(!self.define){let e,o={};const i=(i,s)=>(i=new URL(i+".js",s).href,o[i]||new Promise((o=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=o,document.head.appendChild(e)}else e=i,importScripts(i),o()})).then((()=>{let e=o[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(o[n])return;let r={};const l=e=>i(e,n),a={module:{uri:n},exports:r,require:l};o[n]=Promise.all(s.map((e=>a[e]||l(e)))).then((e=>(c(...e),r)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/gear-a83d35b2.svg",revision:null},{url:"assets/import-cca99fdf.svg",revision:null},{url:"assets/index-2d7c4ebe.css",revision:null},{url:"assets/index-dde61ff8.js",revision:null},{url:"assets/info-ed8a8b63.svg",revision:null},{url:"assets/trash-a204de5e.svg",revision:null},{url:"assets/workbox-window.prod.es5-a7b12eab.js",revision:null},{url:"assets/xmark-cce288d1.svg",revision:null},{url:"icons/maskable-icon.svg",revision:"df6a273c01cb4e271db078457554eb2b"},{url:"icons/wordle_logo_144x144.png",revision:"5ebc3f23954fb4cc057cfc7e6b3de340"},{url:"icons/wordle_logo_192x192.png",revision:"54c2bda6b25497b97297691c3e9896cc"},{url:"icons/wordle_logo_32x32.png",revision:"8a5ea1a89734fbc5384bfa4dff21a6cf"},{url:"icons/wordle_logo_512x512.png",revision:"b33c6a9186337be8c8dd0f6f5efc2579"},{url:"icons/wordle-apple-touch-icon.png",revision:"a96ecf516cb5820bb3027b1d19983c07"},{url:"icons/wordle-favicon.ico",revision:"8a5ea1a89734fbc5384bfa4dff21a6cf"},{url:"index.html",revision:"ede2c28d81e6aac47529993a521a0058"},{url:"manifest.webmanifest",revision:"e2b8f2f00c10e86251004a0d5a99a9d0"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"icons/maskable-icon.svg",revision:"df6a273c01cb4e271db078457554eb2b"},{url:"icons/wordle-apple-touch-icon.png",revision:"a96ecf516cb5820bb3027b1d19983c07"},{url:"icons/wordle-favicon.ico",revision:"8a5ea1a89734fbc5384bfa4dff21a6cf"},{url:"icons/wordle_logo_144x144.png",revision:"5ebc3f23954fb4cc057cfc7e6b3de340"},{url:"icons/wordle_logo_192x192.png",revision:"54c2bda6b25497b97297691c3e9896cc"},{url:"icons/wordle_logo_32x32.png",revision:"8a5ea1a89734fbc5384bfa4dff21a6cf"},{url:"icons/wordle_logo_512x512.png",revision:"b33c6a9186337be8c8dd0f6f5efc2579"},{url:"manifest.webmanifest",revision:"e2b8f2f00c10e86251004a0d5a99a9d0"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));