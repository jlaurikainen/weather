if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let t={};const a=e=>s(e,c),o={module:{uri:c},exports:t,require:a};i[c]=Promise.all(n.map((e=>o[e]||a(e)))).then((e=>(r(...e),t)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-CFTubNQK.css",revision:null},{url:"assets/index-MKzBI5-J.js",revision:null},{url:"index.html",revision:"c96f2c3c2a506a77d25d840188d272a6"},{url:"registerSW.js",revision:"c5cccc7305f570eadae9693dacbc0adf"},{url:"pwa-192x192.png",revision:"988bdceb9a081daa1928cc9aef67aee6"},{url:"pwa-512x512.png",revision:"6f6d67f8e62498beb7187a700f828419"},{url:"pwa-maskable-192x192.png",revision:"7b3017da6b9923e9d7d87ad4567098b1"},{url:"pwa-maskable-512x512.png",revision:"6e2ab16f5819c054fa72c7fbbcf556ee"},{url:"manifest.webmanifest",revision:"8c3e4829cccf7f0c376526fb1a7df63a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
