"use strict";var precacheConfig=[["/index.html","74367c6b7e51aabdf72492560f77fd90"],["/static/css/main.4b48e088.css","4b48e0889f2bbc5d565867080c32086e"],["/static/js/0.0696ef51.chunk.js","df6337304074a0300ca25a436aa74466"],["/static/js/1.23515779.chunk.js","c1c087b35184d0f1e78928a9e4fe6079"],["/static/js/10.474f0cc2.chunk.js","28f1206a4577cd0fdb5bc4d6c298dc5b"],["/static/js/11.9672ec5e.chunk.js","2be3773053781be833c77f15262683ad"],["/static/js/12.e26b1ba5.chunk.js","75598c461a5c7852fc064236582c15b8"],["/static/js/13.b58fe16a.chunk.js","e01cc2f93e7897a2700db9b5b5a75219"],["/static/js/2.573c0e7c.chunk.js","df454be8eba5a8e1a62ee981df9c9097"],["/static/js/3.abb9a42f.chunk.js","fd7f9fdff4082bcc5f7b245bd3ef6d8d"],["/static/js/4.6986fe13.chunk.js","e5ff38f92a0fbcd36720215ac6ffe257"],["/static/js/5.dbac3014.chunk.js","c90aa5d29c49c11c898f4f39a2331e12"],["/static/js/6.4a92c1e0.chunk.js","96946b6a3d389f50a9dab9c9772a5fcf"],["/static/js/7.c33bf6ce.chunk.js","d093b92f569879f24ebf09b84075bfc6"],["/static/js/8.1ad8c193.chunk.js","0a0c74ed861c375643aa615b6706ca05"],["/static/js/9.cc1a0fa7.chunk.js","a6d9b61befe875bbea6fd501a7a5feaa"],["/static/js/main.64ac183b.js","cbc784696f69573475cc29991c33edf2"],["/static/media/Linearicons-Free.03e91f12.woff2","03e91f122aa5fd425abbe23c85546eb0"],["/static/media/Linearicons-Free.2f3e9f80.ttf","2f3e9f80fff7d699dd3de6904d7d1647"],["/static/media/Linearicons-Free.65060723.woff","65060723fe964f85afa0a82d0bb78cf9"],["/static/media/Linearicons-Free.71ad32ce.svg","71ad32ce1ab07350277dfcf1f7a503a5"],["/static/media/Linearicons-Free.b9b7f23c.eot","b9b7f23cb61b1f503e1249b63d980448"],["/static/media/Pe-icon-7-stroke.01798bc1.ttf","01798bc13e33afc36a52f2826638d386"],["/static/media/Pe-icon-7-stroke.71394c0c.eot","71394c0c7ad6c1e7d5c77e8ac292fba5"],["/static/media/Pe-icon-7-stroke.b38ef310.woff","b38ef310874bdd008ac14ef3db939032"],["/static/media/Pe-icon-7-stroke.c45f7de0.svg","c45f7de008ab976a8e817e3c0e5095ca"],["/static/media/city1.ebc5562d.jpg","ebc5562d1cffc3bdb49fb28166eccda7"],["/static/media/logo.63736c51.png","63736c51e501121aaff03c6996bd2111"],["/static/media/rsz_rem_health_logo_colored_sans_bg.09030e83.png","09030e83489027ed76dc10c3c42f5f43"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),n=createCacheKey(c,hashParamName,a,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var c=new Request(a,{credentials:"same-origin"});return fetch(c).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});