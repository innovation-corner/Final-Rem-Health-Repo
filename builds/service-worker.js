"use strict";var precacheConfig=[["/index.html","d3fe4fe58b24a7e54ac98c38b7dbf095"],["/static/css/main.efdf7f5b.css","efdf7f5b41ee779c70e3b2771a278595"],["/static/js/0.dca13ef9.chunk.js","00174d91f192d3f9e4e0477037e142c0"],["/static/js/2.d25fc4b4.chunk.js","58352ddf8e1c4e85705a52b7e0abc548"],["/static/js/3.b372b651.chunk.js","121bec85a703b8280e0c8df3859cbaa7"],["/static/js/4.c922b0a5.chunk.js","82f0e9ad93c7e3b1d4f3e599866122b7"],["/static/js/5.c9edf22c.chunk.js","6dcae01c13e6f98af39d422e2bfe4be6"],["/static/js/6.bcf4b719.chunk.js","a65a57fd2447f4437b28f30da564b630"],["/static/js/7.d9baa768.chunk.js","d0abf46a67a9cdbfb7d255987cfc4550"],["/static/js/main.ca4c1554.js","1252564df08acdbd725c889b1ab408a1"],["/static/media/Linearicons-Free.03e91f12.woff2","03e91f122aa5fd425abbe23c85546eb0"],["/static/media/Linearicons-Free.2f3e9f80.ttf","2f3e9f80fff7d699dd3de6904d7d1647"],["/static/media/Linearicons-Free.65060723.woff","65060723fe964f85afa0a82d0bb78cf9"],["/static/media/Linearicons-Free.71ad32ce.svg","71ad32ce1ab07350277dfcf1f7a503a5"],["/static/media/Linearicons-Free.b9b7f23c.eot","b9b7f23cb61b1f503e1249b63d980448"],["/static/media/Pe-icon-7-stroke.01798bc1.ttf","01798bc13e33afc36a52f2826638d386"],["/static/media/Pe-icon-7-stroke.71394c0c.eot","71394c0c7ad6c1e7d5c77e8ac292fba5"],["/static/media/Pe-icon-7-stroke.b38ef310.woff","b38ef310874bdd008ac14ef3db939032"],["/static/media/Pe-icon-7-stroke.c45f7de0.svg","c45f7de008ab976a8e817e3c0e5095ca"],["/static/media/city1.ebc5562d.jpg","ebc5562d1cffc3bdb49fb28166eccda7"],["/static/media/logo-inverse.8bf405fe.png","8bf405fea801e92c6d7ccdd3b5d8d1e5"],["/static/media/logo.69724321.png","69724321ef545f608fafa63fdcc41cc0"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});