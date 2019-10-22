"use strict";var precacheConfig=[["/index.html","f35faf10b65a1205327897caa1066df3"],["/static/css/main.54eaa05c.css","54eaa05c5fbaf4ab187ee40ec6d12de6"],["/static/js/0.e26f3752.chunk.js","6dcbc93842f8feaf93ce2fe669ade556"],["/static/js/1.4caf6f76.chunk.js","c60f3968fc2e6e66c66b8e40ec7ce8b0"],["/static/js/10.50174a4c.chunk.js","82263616b6bd266f7c3f7fa16d737909"],["/static/js/11.37fbbb9a.chunk.js","39941aa2c79a94d3975de08f01bba2d8"],["/static/js/12.89e22933.chunk.js","4c9e323661c39692c2872d0ce7a0581a"],["/static/js/13.ac48fbd4.chunk.js","9bf10a2c74bd046dde14b9ea177a33ce"],["/static/js/14.f4a3bd47.chunk.js","d57943ff07f216a2ec74f50801e1e4e0"],["/static/js/2.09ae1916.chunk.js","194929f7a0fa68bd2236a25475b3e1dd"],["/static/js/3.e86d92e1.chunk.js","e33ba5ea727a20205cf32ba7f1dc773b"],["/static/js/4.ea4f25f2.chunk.js","6b6b8e5941f67359103b0208b86e7424"],["/static/js/5.b6d5f633.chunk.js","8ef3788fff42599b1f42b975f78c5c92"],["/static/js/6.b7405aa7.chunk.js","7a811a830158a00e1da7e360f5a05c82"],["/static/js/7.4957b4f4.chunk.js","3dc07d2692b1064543128bc44928812d"],["/static/js/8.9756a7c9.chunk.js","881bc244b6d230a34ca8e4fb2284745c"],["/static/js/9.a5d6aa0a.chunk.js","668c85d6b11ea9fab926235e9ab81a46"],["/static/js/main.203b4b71.js","d76d4fc44ffd37babd3625b6282b8f5d"],["/static/media/Linearicons-Free.03e91f12.woff2","03e91f122aa5fd425abbe23c85546eb0"],["/static/media/Linearicons-Free.2f3e9f80.ttf","2f3e9f80fff7d699dd3de6904d7d1647"],["/static/media/Linearicons-Free.65060723.woff","65060723fe964f85afa0a82d0bb78cf9"],["/static/media/Linearicons-Free.71ad32ce.svg","71ad32ce1ab07350277dfcf1f7a503a5"],["/static/media/Linearicons-Free.b9b7f23c.eot","b9b7f23cb61b1f503e1249b63d980448"],["/static/media/Pe-icon-7-stroke.01798bc1.ttf","01798bc13e33afc36a52f2826638d386"],["/static/media/Pe-icon-7-stroke.71394c0c.eot","71394c0c7ad6c1e7d5c77e8ac292fba5"],["/static/media/Pe-icon-7-stroke.b38ef310.woff","b38ef310874bdd008ac14ef3db939032"],["/static/media/Pe-icon-7-stroke.c45f7de0.svg","c45f7de008ab976a8e817e3c0e5095ca"],["/static/media/city1.ebc5562d.jpg","ebc5562d1cffc3bdb49fb28166eccda7"],["/static/media/logo.63736c51.png","63736c51e501121aaff03c6996bd2111"],["/static/media/rsz_rem_health_logo_colored_sans_bg.09030e83.png","09030e83489027ed76dc10c3c42f5f43"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),n=createCacheKey(c,hashParamName,a,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var c=new Request(a,{credentials:"same-origin"});return fetch(c).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});