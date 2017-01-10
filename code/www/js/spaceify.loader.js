function HttpParser(){var e=this,n=null,t=0,o=null,r="",i={},a=null,c=null;console;e.getStatusCode=function(){return parseInt(a)},e.getStatusText=function(){return c},e.getContentBegin=function(){return o},e.getHeaderSize=function(){return t},e.getHeaderValueAsInt=function(e){return e=e.toLowerCase(),i.hasOwnProperty(e)?parseInt(i[e]):null},e.getHeaderValue=function(e){if(e=e.toLowerCase(),i.hasOwnProperty(e))return i[e]},e.getHeaders=function(){return i},e.getRawHeaders=function(){return r};var l=function(e){for(var n=0;n<e.byteLength;n+=1)if(n+4<e.byteLength&&13==e[n]&&10==e[n+1]&&13==e[n+2]&&10==e[n+3]){o=n+4;break}t=o?o:e.byteLength},s=function(e){r="",i={},n=o?String.fromCharCode.apply(null,e.subarray(0,o)):String.fromCharCode.apply(null,e);var t=n.split("\n"),l=t[0].split(" ");a=l[1],c=l.length>=3?l[2]:"OK";for(var s=1;s<t.length;s++){var u=t[s].indexOf(":");if(u>-1){var d=t[s].substring(0,u);d=d.toLowerCase();var p="";t[s].length>u&&(p=t[s].substring(u+1).trim()),i[d]=d in i?i[d]+", "+p:p,r+=(""!=r?"\r\n":"")+d+": "+p}}};e.parse=function(e){l(e),s(e)}}function PiperClient(){var e=this,n=null;n="undefined"!=typeof exports?require("../libs/spaceifyconnect.bundle.js"):window.sp;var t=new Object,o=new Object,r=null,i=null,a=new n.CommunicationClient,c=null,l=null;e.setCookies=function(e){l=e},e.getCookies=function(){return l},e.sendTcpBinary=function(e,n){a.sendBinaryOnConnection(e,n)},e.createTcpTunnel=function(n,o,r,c){var l=n+o;for(var s in t)if(t[s].hostnameAndPort==l)return t[s].listener=r,void c(s);a.createDirectConnection(i,function(i){a.callRpcOnConnection(i,"tunnelTcp",[n,o],e,function(){t[i]={listener:r,hostnameAndPort:l},c(i)})})},e.exposeRpcMethod=function(e,n,t){a.exposeRpcMethod(e,n,t)},e.callClientRpc=function(e,n,t,o,r){a.callClientRpc(e,n,t,o,r)},e.createWebSocketTunnel=function(n,t,r){a.createPipe(i,function(i){a.callClientRpc(i,"pipeWebSocket",[n],e,function(){o[i]=t,r(i)})})},e.setBinaryListener=function(e){c=e},e.onBinary=function(e,n,o){t.hasOwnProperty(o)&&t[o].listener(e)},e.onClientDisconnected=function(e){},e.onClientConnected=function(e){e&&"piper"==e.getClientType()&&a.createDirectConnection(e.getClientId(),function(){i=e.getClientId(),r&&r()})},e.upgradeToWebRtc=function(e){a.upgradeToWebRtc(i,function(){e()})},e.sendBinary=function(e){a.sendBinaryToClient(i,e)},e.connect=function(n,t,o){r=o,a.setClientListener(e),a.setBinaryListener(e),a.connectWithOptions({host:n,port:t,isSsl:!1},"piperclient","jounigroupx",function(){})};var s=0,u=1e3;e.testPing=function(e){a.createDirectConnection(i,function(n){d(0,n,e)})};var d=function(n,t,o){if(++n==u+1)return void o(s,u);var r=Date.now();a.callRpcOnConnection(t,"hello",[],e,function(e,i){s+=Date.now()-r,console.log("index: "+n+", time: "+(Date.now()-r)/1e3+", length: "+i.length),d(n,t,o)})}}function SpXMLHttpRequest(){var e=this,n=SpXMLHttpRequest.OriginalXMLHttpRequest?new SpXMLHttpRequest.OriginalXMLHttpRequest:null,t=(console,null),o=null,r=null;"undefined"!=typeof exports?(t=require("urlutils"),o=require("./httpparser"),LoaderUtil=require("./loaderutil"),r=LoaderUtil.piperClient):(t=window.URL,o=window.HttpParser,r=LoaderUtil.piperClient);var i=new o,a="",c="",l="GET",s=null,u=null,d=!1,p=!1,f=!1,g=!1,h=!1,y=!1,C=!1,w=null,R=0,m=null,b=null,v=null,S=null,L=null,O=null,T=null,P=0,A=null,I=[],D=["GET","HEAD","POST","PUT","DELETE","OPTIONS","PATCH"],H=["CONNECT","TRACE","TRACK"],E="80",x="localhost",M="localhost",U="",q={none:"",abort:"end-user abort",fatal:"fatal",timeout:"timeout"},j={basic:"basic",cors:"cors",default:"default",error:"error",opaque:"opaque",opaqueredirect:"opaqueredirect"},k={type:j.default,terminationReason:q.none,url:null,urlList:[],status:200,statusText:"OK",headers:{},body:null,trailer:{},httpsState:"none",CSPList:[],CORSExposedHeaderNameList:[],locationURL:null},_=0,B=0,N={DOMSTRING:"",BLOB:"blob",JSON:"json",TEXT:"text",DOCUMENT:"document",ARRAYBUFFER:"arraybuffer",MOZ_BLOB:"moz-blob",MOZ_CHUNKED_TEXT:"moz-chunked-text",MOZ_CHUNKED_ARRAYBUFFER:"moz-chunked-arraybuffer",MS_STREAM:"ms-stream"},X="^(Accept-Charset)$|^(Accept-Encoding)$|^(Access-Control-Request-Headers)$|^(Access-Control-Request-Method)$|";X+="^(Connection)$|^(Content-Length)$|^(Cookie)$|^(Cookie2)$|^(Date)$|^(DNT)$|^(Expect)$|^(Host)$|^(Keep-Alive)$|",X+="^(Origin)$|^(Referer)$|^(TE)$|^(Trailer)$|^(Transfer-Encoding)$|^(Upgrade)$|^(Via)$|^(Proxy-.*)|^(Sec-.*)",X=new RegExp(X,"i"),e.readyState=SpXMLHttpRequest.UNSENT,e.response="",e.responseText=null,e.responseType=N.DOMSTRING,e.responseURL="",e.responseXML=null,e.status=0,e.statusText="",e.timeout=0,e.withCredentials=!1,e.upload={onabort:null,onerror:null,ontimeout:null,onprogress:null,onloadstart:null,onload:null,onloadend:null},e.onabort=null,e.onerror=null,e.ontimeout=null,e.onprogress=null,e.onloadstart=null,e.onload=null,e.onloadend=null,e.onreadystatechange=null;var W=["abort","error","timeout","progress","loadstart","load","loadend","readystatechange"],$=function(n){se(),"function"==typeof e.ontimeout&&e.ontimeout(n)},G=function(n){se(),"function"==typeof e.onprogress&&e.onprogress(n)},V=function(n){se(),"function"==typeof e.onabort&&e.onabort(n)},F=function(n){se(),"function"==typeof e.onerror&&e.onerror(n)},z=function(n){se(),"function"==typeof e.onloadstart&&e.onloadstart(n)},K=function(n){se(),"function"==typeof e.onload&&e.onload(n)},J=function(n){se(),"function"==typeof e.onloadend&&e.onloadend(n)},Z=function(n){se(),"function"==typeof e.onreadystatechange&&e.onreadystatechange(n)};n&&(n.ontimeout=$,n.onprogress=G,n.onabort=V,n.onerror=F,n.onloadstart=z,n.onload=K,n.onloadend=J,n.onreadystatechange=Z),e.open=function(e,t,o,r,i){n?Q(e,t,o,r,i):Y(e,t,o,r,i)};var Q=function(e,t,o,r,i){l=e,isAsync="undefined"===o||o,s="undefined"!==r?r:null,u="undefined"!==i?i:null,n.open(e,t,isAsync,s,u)},Y=function(e,n,t,o,r){if(!d&&(e=e.toUpperCase(),D.indexOf(e)!=-1&&H.indexOf(e)==-1)){if(l=e,le(n),"undefined"===t&&(t=!0,o=null,r=null),s=o?o:null,u=r?r:null,x){var i="";s&&(i=s),u&&i&&(i+=":"+u),i&&(x=i+"@"+x)}p=!1,h=!1,y=!1,g=!t,I=[],k.type=j.error,k.status=0,k.statusText="",k.headers={},k.body=null,k.trailer={},b=null,v=null,S=null,L=null,d=!0,ce(SpXMLHttpRequest.OPENED)}};e.send=function(e){n?ee(e):ne(e)};var ee=function(t){return isAsync&&(n.responseType=e.responseType),n.send(t)},ne=function(n){if(n&&(m=n),P=0,d&&(!p||f)){"GET"!=l&&"HEAD"!=l||(m=null),(e.upload.onabort||e.upload.onerror||e.upload.ontimeout||e.upload.onprogress||e.upload.onloadstart||e.upload.onload||e.upload.onloadend)&&(y=!0),U=l+" "+c+" HTTP/1.1\r\nHost: "+x;for(var t=0;t<I.length;t++)U+="\r\n"+I[t].header+": "+I[t].value;m&&(U+="\r\nContent-Length: "+m.length+"\r\n",U+=m),U+="\r\n\r\n";var o=LoaderUtil.toab(U);_=o.byteLength,C=!1,m||(C=!0),p=!0,g||("function"!=typeof e.onloadstart||f||e.onloadstart(ae("loadstart",{loaded:0,total:0,lengthComputable:!1,target:e})),!C&&y&&("function"!=typeof e.upload.onloadstart||f||e.upload.onloadstart(ae("loadstart",{loaded:0,total:U.length,lengthComputable:!0,target:e}))),w&&clearInterval(w),w=null,R=0,e.timeout>0&&(w=setInterval(function(){h?clearInterval(w):++R>=e.timeout&&clearInterval(w)},1))),B=0,r.createTcpTunnel(M,E,te,function(e){r.sendTcpBinary(e,o),B=_,re(),f=!1})}};e.setRequestHeader=function(e,t){if(n)n.setRequestHeader(e,t);else{if(!d)return;if(p)return;if(e=e.trim().toLowerCase(),!e||!t)return;if(e.match(X))return;I.push({header:e,value:t})}},e.abort=function(){n&&(e.readyState=SpXMLHttpRequest.UNSENT,n.abort())},e.getResponseHeader=function(e){return n?n.getResponseHeader(e):i.getHeaderValue(e)},e.getAllResponseHeaders=function(){return n?n.getAllResponseHeaders():i.getRawHeaders()},e.overrideMimeType=function(t){return n?n.overrideMimeType(t):void(e.readyState!=SpXMLHttpRequest.LOADING&&e.readyState!=SpXMLHttpRequest.DONE&&(t=t.toLowerCase(),A=t))},e.addEventListener=function(e,t,o){var r=o;if(n)n.addEventListener(e,t,o);else{if(W.indexOf(e)===-1)return;"boolean"==typeof o&&(r={capture:o,once:!1,passive:!1})}},e.removeEventListener=function(e,t,o){var r=o;n?n.removeEventListener(e,t,o):"boolean"==typeof o&&(r={capture:o,passive:!1})},e.dispatchEvent=function(e){n&&n.dispatchEvent(e)};var te=function(n){h=!0;var t=new Uint8Array(n);if(T)oe(t);else{if(i.parse(t),301==i.getStatusCode()||302==i.getStatusCode())return f=!0,le(i.getHeaderValue("Location")),void e.send();O=i.getHeaderValue("Content-Type"),T=i.getHeaderValueAsInt("Content-Length"),k.headers=i.getHeaders(),k.body=[],ce(SpXMLHttpRequest.HEADERS_RECEIVED),T?oe(t.subarray(i.getContentBegin())):ie(!0)}if(T&&T==P){for(var o=0;o<k.body.length;o++)k.body[o]&&(e.responseText+=LoaderUtil.ab2str(k.body[o]));ie(!1)}},oe=function(n){k.body.push(n),P+=n.byteLength,ce(SpXMLHttpRequest.LOADING,!0),"function"==typeof e.onprogress&&e.onprogress(ae("progress",{loaded:P,total:T,lengthComputable:!0,target:e}))},re=function(){C=!0,y&&!f&&("function"==typeof e.upload.onprogress&&e.upload.onprogress(ae("progress",{loaded:B,total:_,lengthComputable:!0,target:e})),"function"==typeof e.upload.onload&&e.upload.onload(ae("load",{loaded:B,total:_,lengthComputable:!0,target:e})),"function"==typeof e.upload.onloadend&&e.upload.onloadend(ae("loadend",{loaded:B,total:_,lengthComputable:!0,target:e})))},ie=function(n){e.status=i.getStatusCode(),e.statusText=i.getStatusText(),n&&"function"==typeof e.onprogress&&e.onprogress(ae("progress",{loaded:0,total:0,lengthComputable:!0,target:e})),p=!1,ce(SpXMLHttpRequest.DONE),"function"==typeof e.onload&&e.onload(ae("load",{loaded:P,total:T?T:0,lengthComputable:!0,target:e})),"function"==typeof e.onloadend&&e.onloadend(ae("loadend",{loaded:P,total:T?T:0,lengthComputable:!0,target:e}))},ae=function(e,n){var t;if(t={type:e},n)for(var o in n)t[o]=n[o];return t},ce=function(n,t){(e.readyState!=n||t)&&(e.readyState=n,"function"==typeof e.onreadystatechange&&e.onreadystatechange(ae("readystatechange",{target:e})))},le=function(e){var n;e.indexOf("//")!=-1?(n=new t(e),"10.0.0.1"==n.hostname&&(n.hostname="localhost"),x=n.host,n.hostname&&(M=n.hostname),n.port&&(E=n.port),c=n.toString()):(n=e,"/"!=n.charAt(0)&&(n="/"+n),c=n),a=e},se=function(){e.status=n.status,e.statusText=n.statusText,e.response=n.response,e.readyState=n.readyState,e.responseURL=n.responseURL,e.responseType=n.responseType,e.responseType!=N.DOMSTRING&&e.responseType!=N.TEXT||(e.responseText=n.responseText),e.responseType==N.DOCUMENT&&isAsync&&(e.responseXML=n.responseXML),e.upload=n.upload,e.timeout=n.timeout,e.withCredentials=n.withCredentials}}function LoaderUtil(){var e=this,n=null;n="undefined"!=typeof exports?require("sessionstorage"):window.sessionStorage,e.Utf8ArrayToStr=function(e){var n,t,o,r,i,a;for(n="",o=e.length||e.byteLength,t=0;t<o;)switch(r=e[t++],r>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:n+=String.fromCharCode(r);break;case 12:case 13:i=e[t++],n+=String.fromCharCode((31&r)<<6|63&i);break;case 14:i=e[t++],a=e[t++],n+=String.fromCharCode((15&r)<<12|(63&i)<<6|(63&a)<<0)}return n},e.ab2str=function(n){return e.Utf8ArrayToStr(n)},e.str2ab=function(e){for(var n=new ArrayBuffer(2*e.length),t=new Uint16Array(n),o=0,r=e.length;o<r;o++)t[o]=e.charCodeAt(o);return n},e.toab=function(e){for(var n=new ArrayBuffer(e.length),t=new Uint8Array(n),o=0,r=e.length;o<r;o++)t[o]=e.charCodeAt(o);return n},e.getSession=function(e){return n.getItem(e)?n.getItem(e):""},e.setSession=function(e,t){t||(t=""),n.setItem(e,t.trim())}}function SpaceifyLoader(){var e=this,n=null,t=null,o=!1,r=null,i=null,a=0,c="x-edge-session";e.loadData=function(e,o){var r,i,a,c,l=new XMLHttpRequest;return e.getAttribute("sp_src")?(r="sp_src",a="src"):e.getAttribute("spe_src")?(r="spe_src",a="src"):e.getAttribute("sp_href")?(r="sp_href",a="href"):e.getAttribute("spe_href")?(r="spe_href",a="href"):e.getAttribute("sp_bgnd")&&(r="sp_bgnd",a=""),c=e.getAttribute(r),i="spe_src"==r||"spe_href"==r?t:n,c.indexOf("//")==-1&&i&&(c=new URL(c,i).toString()),c?(l.addEventListener("loadend",function(n){if(4==l.readyState){var t=l.response;if(e.onload=function(n){"sp_bgnd"!=r&&window.URL.revokeObjectURL(e[a]),"function"==typeof o&&o()},"sp_bgnd"==r){var i=new window.FileReader;i.readAsDataURL(t),i.onloadend=function(){e.style.backgroundImage="url("+i.result+")"}}else e[a]=window.URL.createObjectURL(t);e.removeAttribute(r)}}),l.open("GET",c,!0),l.responseType="blob",void l.send()):void("function"==typeof o&&o())},e.postData=function(e,n,t,o){var r,i=new XMLHttpRequest;i.addEventListener("loadend",function(e){if(4==i.readyState)if(LoaderUtil.setSession("sessionCookies",i.getResponseHeader("Set-Cookie")),(r=i.getResponseHeader(c))&&LoaderUtil.setSession(c,r),200!=i.status)"function"==typeof o&&o(i.status,null);else if(i.response instanceof Blob){var n=new FileReader;n.onload=function(e){"function"==typeof o&&o(null,n.result)},n.readAsText(i.response.data,"UTF-8")}else"function"==typeof o&&o(null,JSON.stringify(i.response))});for(var a="---------------------------"+Date.now().toString(16),l="",s=0;s<n.length;s++)l+="\r\n--"+a+"\r\n",l+=n[s].content,l+="\r\n\r\n"+n[s].data+"\r\n";l+="\r\n--"+a+"--",i.withCredentials=!0,i.open("POST",e,!0),i.responseType=t?t:"text",i.setRequestHeader("Cookie",LoaderUtil.getSession("sessionCookies")),i.setRequestHeader(c,LoaderUtil.getSession(c)),i.setRequestHeader("Content-Type","multipart/form-data; boundary="+a),i.send(l)},e.loadPage=function(e,n,t){var o=new XMLHttpRequest;o.addEventListener("loadend",function(e){if(4==o.readyState){LoaderUtil.setSession("sessionCookies",o.getResponseHeader("Set-Cookie")),(hvalue=o.getResponseHeader(c))&&LoaderUtil.setSession(c,hvalue);var r=document.open("text/html","replace");r.write(o.responseText),r.close(),r.loadPageSpHost=n,r.loadPageSpeHost=t}}),o.withCredentials=!0,o.open("GET",e,!0),o.setRequestHeader("Cookie",LoaderUtil.getSession("sessionCookies")),o.setRequestHeader(c,LoaderUtil.getSession(c)),o.send(null)},e.getAllElements=function(){var e=Array.prototype.slice.call(document.querySelectorAll("[sp_src]")),n=Array.prototype.slice.call(document.querySelectorAll("[spe_src]")),t=Array.prototype.slice.call(document.querySelectorAll("[sp_href]")),o=Array.prototype.slice.call(document.querySelectorAll("[spe_href]")),r=Array.prototype.slice.call(document.querySelectorAll("[sp_bgnd]"));i=o.concat(t,n,e,r),console.log("SpaceifyLoader::loadAll() :: Number of elements with sp_src:",e.length,"spe_src:",n.length,"sp_href:",t.length,"spe_href:",o.length,"sp_bgnd:",r.length)},e.hasElements=function(){return!!(i&&i.length>0)},e.recurseElements=function(){if(a<i.length)e.loadData(i[a],function(){a++,e.recurseElements()});else{var n=document.createEvent("Event");n.initEvent("spaceifyReady",!0,!0),window.dispatchEvent(n)}},e.parseQuery=function(e){var n,t,o,r={};e=decodeURIComponent(e),n=e.indexOf("url=blob")!=-1?e.split("#"):e.split("?"),n=n.length<2?n[0]:n[1],o=n.split("&");for(var i=0,a=o.length;i<a;i++)o[i]&&(t=o[i].split("="),r[t[0]]=2==t.length?t[1]:null);return r},e.setSpHosts=function(e){n=e.sp_host,t=e.spe_host},e.connect=function(e,n,t){LoaderUtil.piperClient.connect(e,n,function(){r&&r(),t()})},e.setConnectionListener=function(e){r=e,o&&e()}}function getNetworkInfo(e){window.isSpaceifyNetwork=!1;var n=window.location.href.replace("blob:",""),t=n.indexOf(":");n=t!=-1?n.substring(0,t+1):window.location.protocol;var o=new WebSocket(("http:"==n?"ws":"wss")+"://edge.spaceify.net:2947","json-rpc");o.onopen=function(){window.isSpaceifyNetwork=!0,o.close(),e()},o.onerror=function(n){o.close(),e()}}function prepareLoader(e){spaceifyLoader.setSpHosts(e),window.isSpaceifyNetwork?window.XMLHttpRequest=SpXMLHttpRequest.OriginalXMLHttpRequest:(window.isSpaceifyNetwork=!1,window.XMLHttpRequest=SpXMLHttpRequest,spaceifyLoader.connect(LoaderUtil.SERVER_ADDRESS.host,LoaderUtil.SERVER_ADDRESS.port,function(){}))}function loadPageOrElements(e){spaceifyLoader.getAllElements(),spaceifyLoader.hasElements()?(elementIndex=0,spaceifyLoader.recurseElements()):spaceifyLoader.loadPage(e.sp_host+e.sp_path,e.sp_host,e.spe_host)}if(function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("wrtc"),require("websocket")):"function"==typeof define&&define.amd?define(["wrtc","websocket"],n):"object"==typeof exports?exports.sp=n(require("wrtc"),require("websocket")):e.sp=n(e.wrtc,e.websocket)}(this,function(e,n){return function(e){function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var t={};return n.m=e,n.c=t,n.p="",n(0)}([function(e,n,t){e.exports={Client:t(1),WebRtcConnector:t(2),CommunicationClient:t(6),RpcCommunicator:t(7),WebRtcPeerConnection:t(3),WebSocketRpcConnection:t(11),CallBackbuffer:t(8),WebSocketConnection:t(9)}},function(e,n,t){function o(e,n,t){var o=this,r=e,i=n,a=!1,c=!1,l=null,s=new Array;o.toJSON=function(){var e={clientId:r,clientType:i,webRtc:a,localHub:c,preferredConnectionId:l};return e},o.isArrivedBeforeUs=function(){return t},o.setClientId=function(e){r=e},o.setClientType=function(e){i=e},o.setWebRtc=function(e){a=e},o.setPreferredConnectionId=function(e){l=e},o.getClientId=function(){return r},o.getClientType=function(){return i},o.isWebRtc=function(){return a},o.getPreferredConnectionId=function(){return l},o.isLocalHub=function(){return c},o.setLocalHub=function(e){c=e},o.addPipeId=function(e){s.push(e)},o.getBinaryConnectionId=function(){return pipeId},o.getConnectionType=function(){return a?"WebRtc":c?"Local Hub":"Cloud"}}e.exports=o},function(e,n,t){function o(e,n,o){var r=this,i=null;i=t(3);var a=(console,new Object),c=new Object,l=null;r.setConnectionListener=function(e){l=e},r.onIceCandidate=function(t,o){e.callRpc("callClientRpc",[o,"handleIceCandidate",[t]],r,null,n)};var s=function(e){a[e]=new i(o),a[e].setPartnerId(e),a[e].setIceListener(r),a[e].setStreamListener(r),a[e].setConnectionListener(r),a[e].setDataChannelListener(r)};r.shutdown=function(e){for(var n in a)a.hasOwnProperty(n)&&(a[n].close(),delete a[n])},r.handleRtcOffer=function(t,o,i){a.hasOwnProperty(o)||s(o),a[o].onConnectionOfferReceived(t,o,function(t){e.callRpc("callClientRpc",[o,"handleRtcAnswer",[t]],r,null,n)})},r.handleRtcAnswer=function(e,n,t){a[n].onConnectionAnswerReceived(e)},r.handleIceCandidate=function(e,n,t){a.hasOwnProperty(n)||s(n),a[n].onIceCandidateReceived(e)},r.onDisconnected=function(n){if(a.hasOwnProperty(n)){for(var t=a[n],o=t.getDataChannelConnections(),r=0;r<o.length;r++)e.onDisconnected(o[r]);l.onWebRtcDisconnected(n),t.close(),delete a[n]}},r.onPrimaryDataChannelOpen=function(n,t){var o=e.addConnection(t);l&&l.onWebRtcConnected(n,o),c.hasOwnProperty(n)&&c[n].apply()},r.onAdditionalDataChannelOpen=function(n,t){var o=e.addConnection(t);l&&l.onAdditionalDataChannelOpen(n,o)},r.onStream=function(e,n){},r.onRemoveStream=function(e,n){r.onDisconnected(n)},r.connectToPeer=function(t,o){a.hasOwnProperty(t)||(s(t),o&&(c[t]=o),a[t].createConnectionOffer(function(o){e.callRpc("callClientRpc",[t,"handleRtcOffer",[o]],r,null,n)}))},r.createDataChannelConnection=function(n,t){a[n].createDataChannelConnection(function(n){var o=e.addConnection(n);t(o)})},"undefined"!=typeof window&&(window.onbeforeunload=r.shutdown),e.exposeRpcMethod("handleRtcOffer",r,r.handleRtcOffer),e.exposeRpcMethod("handleRtcAnswer",r,r.handleRtcAnswer),e.exposeRpcMethod("handleIceCandidate",r,r.handleIceCandidate)}"undefined"!=typeof window&&(navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia),e.exports=o},function(e,n,t){function o(e){var n=this,o=null,r=null,i=null,a=null;a=t(4);var c=t(5);o=c.RTCPeerConnection,r=c.RTCSessionDescription,i=c.RTCIceCandidate,"undefined"!=typeof window&&(o=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection,r=window.RTCSessionDescription||window.mozRTCSessionDescription||window.webkitRTCSessionDescription,i=window.RTCIceCandidate||window.mozRTCIceCandidate||window.webkitRTCIceCandidate);var l=console,s=null,u=null,d=null,p=null,f=null,g=null,h=new Array,y={optional:[{DtlsSrtpKeyAgreement:!0}]},C=new o(e,y),w=null,R=0;n.createDataChannelConnection=function(e){R++;var n=C.createDataChannel(R,{reliable:!0});n.onopen=function(){},n.binaryType="arraybuffer",n.onmessage=function(){var t=new a(n);h.push(t),e(t)}},C.ondatachannel=function(e){var t=e.channel||e;if(t.binaryType="arraybuffer",null==w)w=new a(t),t.onopen=n.onPrimaryDataChannelOpen;else{var o=new a(t);t.onopen=function(){t.send("OK"),h.push(o),p&&p.onAdditionalDataChannelOpen(s,o)}}},n.onPrimaryDataChannelOpen=function(e){h.push(w),p&&p.onPrimaryDataChannelOpen(s,w)},n.onAdditionalDataChannelOpen=function(e){},n.getDataChannelConnections=function(){return h},n.onPrimaryDataChannelClosed=function(e){f.onDisconnected(s)},n.setDataChannelListener=function(e){p=e};var m=function(e){},b=function(e){!f||"disconnected"!=C.iceConnectionState&&"closed"!=C.iceConnectionState||f.onDisconnected(s)},v=function(e){},S=function(e){null==e.candidate||u.onIceCandidate(e.candidate,s)};C.onsignalingstatechange=m,C.oniceconnectionstatechange=b,C.onicegatheringstatechange=v,C.onicecandidate=S,n.close=function(){"closed"==C.signalingState&&"closing"==C.signalingState||C.close()},n.getPartnerId=function(){return s},n.setPartnerId=function(e){s=e},n.setIceListener=function(e){u=e},n.setStreamListener=function(e){d=e,C.onaddstream=function(e){n.onStream(e)},C.onremovestream=function(e){n.onRemoveStream(e)}},n.setConnectionListener=function(e){f=e},n.onStream=function(e){d.onStream(e.stream,s)},n.onRemoveStream=function(e){d.onRemoveStream(e.stream,s)},n.addStream=function(e){g=e,C.addStream(e)},n.createConnectionOffer=function(e){var t=null,o=C.createDataChannel("jsonrpcchannel",{reliable:!0});o.binaryType="arraybuffer",o.onopen=n.onPrimaryDataChannelOpen,w=new a(o),C.createOffer(function(n){t=n,C.setLocalDescription(n,function(){e(C.localDescription,s)},function(e){l.log("WebRtcPeerConnectioncreateConnectionOffer() setLocalDescription error")},{})},function(e){l.log(e)})},n.onConnectionAnswerReceived=function(e){C.setRemoteDescription(new r(e),function(){},function(e){l.log("WebRtcPeerConnectiononConnectionAnswerReceived() setRemoteDescription returned error "+e)})},n.onConnectionOfferReceived=function(e,n,t){var o=new r(e);C.setRemoteDescription(o,function(){C.createAnswer(function(e){C.setLocalDescription(e,function(){t(C.localDescription)},function(e){l.log(e)})},function(e){l.log(e)})},function(e){l.log("WebRtcPeerConnectiononConnectionOfferReceived setting remote description failed "+e)})},n.onIceCandidateReceived=function(e){C.addIceCandidate(new i(e),function(){},function(e){l.log("WebRtcPeerConnectiononIceCandidateReceived adding Ice candidate failed "+e)})}}e.exports=o},function(e,n,t){function o(e){var n=this,t=console,o=null,r=null;n.send=function(n){try{"open"==e.readyState&&e.send(n)}catch(e){t.log(e)}},n.close=function(){},n.sendBinary=function(n){try{"open"==e.readyState&&e.send(n)}catch(e){console.log(e)}},n.getBufferedAmount=function(){return e.bufferedAmount},n.setId=function(e){o=e},n.getId=function(){return o},n.setListener=function(e){r=e},n.onMessage=function(e){try{r&&r.onMessage(e.data,n)}catch(e){console.log(e)}},n.setPipedTo=function(e){},n.getPipedTo=function(){return null},e.onmessage=n.onMessage}e.exports=o},function(n,t){n.exports=e},function(e,n,t){function o(){var e=this,n=null,o=null,r=null,i=null;n=t(7),o=t(9),r=t(1),i=t(2);var a=(console,null),c=null,l=null,s=new Object,u=null,d=null,p=null,f=null,g=null,h=new n,y=new o,C=new Object,w=new Object,R=new Object,m=(new n,null);e.callRpcOnClient=function(e,n,t,o,r){C.hasOwnProperty(e)&&(C[e].isWebRtc()?(t.push(u),h.callRpc(n,t,o,r,C[e].getPreferredConnectionId())):C[e].isLocalHub()?h.callRpc("callClientRpc",[e,n,t],o,r,C[e].getPreferredConnectionId()):h.callRpc("callClientRpc",[e,n,t],o,r,g))},e.callRpcOnConnection=function(e,n,t,o,r){t.push(u),h.callRpc(n,t,o,r,e)},e.notifyClient=function(e,n,t){C.hasOwnProperty(e)&&(C[e].isWebRtc()?(t.push(u),h.callRpc(n,t,null,null,C[e].getPreferredConnectionId())):C[e].isLocalHub()?h.callRpc("callClientRpc",[e,n,t],null,null,C[e].getPreferredConnectionId()):h.callRpc("callClientRpc",[e,n,t],null,null,g))},e.sendBinaryOnConnection=function(e,n){h.sendBinary(n,e)},e.getClientsByType=function(e){return w[e]},e.getConnectionType=function(e){return C[e].getConnectionType()},e.upgradeToWebRtc=function(e,n){C[e].isWebRtc()||m.connectToPeer(e,n)},e.getBufferedAmount=function(e){return h.getConnection(e).getBufferedAmount()},e.createDirectConnection=function(e,n){C[e].isWebRtc()?m.createDataChannelConnection(e,function(t){R[t]=e,n(t)}):b(e,n)},e.onWebRtcConnected=function(e,n){C.hasOwnProperty(e)&&(C[e].setWebRtc(!0),C[e].setPreferredConnectionId(n)),p&&p.onConnectionTypeUpdated(C[e],C[e].getConnectionType())},e.onWebRtcDisconnected=function(e){},e.onAdditionalDataChannelOpen=function(e,n){R[n]=e};var b=function(n,t){var r,i=new o;i.connect(a,function(){r=h.addConnection(i),h.callRpc("constructPipe",[n,u],e,function(){C.hasOwnProperty(n)&&(C[n].addPipeId(r),R[r]=n),t(r)},r)})};e.requestPipe=function(n,t,r,i){var c=new o,l=null;c.connect(a,function(){l=h.addConnection(c),h.callRpc("registerAsPipe",[n],e,function(e,n){C.hasOwnProperty(t)&&(C[t].addPipeId(l),R[l]=t),i(null,"Ok")},l)})},e.pipeToExternalConnection=function(e,n){var t=h.addConnection(n);h.setupPipe(e,t)},e.onBinary=function(e,n){f&&(R.hasOwnProperty(n)?f.onBinary(e,R[n],n):f.onBinary(e,n))},e.setClientListener=function(e){d=e},e.setConnectionTypeListener=function(e){p=e},e.setBinaryListener=function(e){f=e};var v=function(e,n,t){var o=null;return C.hasOwnProperty(e)?o=C[e]:(o=new r(e,n,t),C[e]=o),w.hasOwnProperty(n)||(w[n]=new Object),w[n][e]=o,o},S=function(e){delete w[C[e].getClientType()][e],delete C[e]},L=function(n,t){var o=g;n&&(o=n),h.callRpc("getConnectedClients",[l],e,function(e,r){var i=null;for(var a in r)C.hasOwnProperty(a)||r[a].clientId==u?n&&(C[a].setLocalHub(!0),C[a].setPreferredConnectionId(o)):(i=null==n?v(r[a].clientId,r[a].clientType,!0):v(r[a].clientId,r[a].clientType,!1),!n&&d&&i.getClientId()!=u&&d.onClientConnected(i));t()},o)},O=function(n,t){if(null!=n){var r=null,i=null,a=null;for(var d in n){r=n[d].port;for(var p=0;p<n[d].localIps.length;p++){i=n[d].localIps[p];var f={host:i,port:r,id:u},g=null;a=new o,a.connect(f,function(){g=h.addConnection(a),s[g]=g,L(g,function(){h.callRpc("registerAsClient",[u,c,l],e,function(e,n){})})})}}t()}},T=function(n){h.callRpc("getLocalHubs",[],e,function(e,t){t?O(t,n):n()},g)};e.exposeRpcMethod=function(e,n,t){h.exposeRpcMethod(e,n,t)},e.connectWithOptions=function(n,t,o,r){c=t,l=o,h.setBinaryListener(e),n.hasOwnProperty("id")||(n.id=null),a=n,y.connect(a,function(){g=h.addConnection(y),m=new i(h,g,LoaderUtil.WEBRTC_CONFIG),m.setConnectionListener(e),h.callRpc("registerAsClient",[null,c,l],e,function(e,n){u=n,L(null,function(){T(function(){r(n)})})},g)})},e.connect=function(n,t,o,r,i){return a={host:n,port:t,id:null},e.connectWithOptions(a,o,r,i)},e.onClientConnected=function(e,n,t){if(e.clientId!=u){if(s.hasOwnProperty(n))return C[e.clientId].setLocalHub(!0),void C[e.clientId].setPreferredConnectionId(n);if(!C.hasOwnProperty(e.clientId)){var o=v(e.clientId,e.clientType,!1);d&&o.getClientId()!=u&&d.onClientConnected(o)}}},e.onClientDisconnected=function(e,n,t){C.hasOwnProperty(e.clientId)&&d&&e.clientId!=u&&(d.onClientDisconnected(C[e.clientId]),S(e.clientId))},e.onHubConnected=function(e,n,t){},e.onHubDisconnected=function(e,n,t){},e.getConnectedClients=function(){return C},e.getOwnId=function(){return u},h.exposeRpcMethod("onClientConnected",e,e.onClientConnected),h.exposeRpcMethod("onClientDisconnected",e,e.onClientDisconnected),h.exposeRpcMethod("onHubConnected",e,e.onHubConnected),h.exposeRpcMethod("onHubDisconnected",e,e.onHubDisconnected),h.exposeRpcMethod("requestPipe",e,e.requestPipe)}e.exports=o},function(e,n,t){function o(){var e=this,n=null;n=t(8);var o=1,r=new Object,i=null,a=null,c=null,l=new n,s=new Object,u=0,d=null,p=function(e,n){try{s[n].send(JSON.stringify(e))}catch(e){console.log(e)}};e.sendMessage=p;var f=function(e,n,t,o){try{if(e){p({jsonrpc:"2.0",error:e,id:t});"undefined"!=typeof e.code?e.code:"","undefined"!=typeof e.path?e.path:"","undefined"!=typeof e.message?e.message:""}else p({jsonrpc:"2.0",result:n,id:t},o)}catch(e){console.log(e)}},g=function(e,n){try{if(!e.jsonrpc||"2.0"!=e.jsonrpc||!e.method)return void p({jsonrpc:"2.0",error:{code:-32600,message:"Invalid JSON-RPC."},id:null},n);if("[object Array]"!==Object.prototype.toString.call(e.params))return void p({jsonrpc:"2.0",error:{code:-32602,message:"Parameters must be sent inside an array."},id:e.id},n);if(!r.hasOwnProperty(e.method))return null!=e.id?void p({jsonrpc:"2.0",error:{code:-32601,message:"Method "+e.method+" not found."},id:e.id},n):void p({jsonrpc:"2.0",error:{code:-32601,message:"Method "+e.method+" not found."},id:null},n);var t=r[e.method];"undefined"==typeof e.params&&(e.params=new Array),null!=e.id?(e.params.push(n),e.params.push(function(t,o){f(t,o,e.id,n)}),t.method.apply(t.object,e.params)):(e.params.push(n),e.params.push(function(e,n){}),t.method.apply(t.object,e.params))}catch(e){console.log(e)}},h=function(e){try{var n=null,t=null;"undefined"!=typeof e.error&&(n=e.error),"undefined"!=typeof e.result&&(t=e.result),e.id&&l.callMethodAndPop(e.id,n,t)}catch(e){console.log(e)}},y=function(e,n){try{e.method?g(e,n):h(e)}catch(e){console.log(e)}},C=function(){u++;for(var e=u;;)if(e=Math.floor(4294967296*Math.random()),!s.hasOwnProperty(e))break;return e};e.exposeRpcMethod=function(e,n,t){try{r[e]={object:n,method:t}}catch(e){console.log(e)}},e.setConnectionListener=function(e,n){i={object:e,listener:n}},e.setDisconnectionListener=function(e,n){a={object:e,listener:n}},e.setBinaryListener=function(e){c=e},e.connectionExists=function(e){return!("undefined"==typeof e||!s.hasOwnProperty(e))||!("undefined"!=typeof e||!s.hasOwnProperty(d))},e.getConnection=function(e){return s[e]},e.callRpc=function(n,t,r,i,a){if(e.connectionExists(a))try{"function"==typeof i?(l.pushBack(o,r,i),"undefined"!=typeof a?p({jsonrpc:"2.0",method:n,params:t,id:""+o},a):p({jsonrpc:"2.0",method:n,params:t,id:""+o},d),o++):"undefined"!=typeof a?p({jsonrpc:"2.0",method:n,params:t},a):p({jsonrpc:"2.0",method:n,params:t},d)}catch(e){console.log(e)}},e.notifyAll=function(e,n){try{for(var t in s)p({jsonrpc:"2.0",method:e,params:n,id:null},t)}catch(e){console.log(e)}},e.getBufferedAmount=function(e){return s[e].getBufferedAmount()},e.sendBinary=function(e,n){try{s[n].sendBinary(e)}catch(e){console.log(e)}},e.setupPipe=function(e,n){s.hasOwnProperty(e)&&s.hasOwnProperty(n)&&(s[e].setPipedTo(n),s[n].setPipedTo(e))},e.closeConnection=function(e){try{e in s&&(s[e].close(),delete s[e])}catch(e){console.log(e)}},e.onMessage=function(e,n){try{var t=n.getPipedTo();if(null!=t)return void s[t].send(e);if(e instanceof ArrayBuffer)return void(c&&c.onBinary(e,n.getId()));var o;try{o=JSON.parse(e)}catch(e){return void p({jsonrpc:"2.0",error:{code:-32700,message:"Invalid JSON."},id:null},n.getId())}y(o,n.getId())}catch(e){console.log(e)}},e.addConnection=function(n){try{return n.getId()||n.setId(C()),s[n.getId()]=n,n.setListener(e),i&&i.listener.call(i.object,n.getId()),d=n.getId(),n.getId()}catch(e){console.log(e)}},e.onDisconnected=function(n){try{e.closeConnection(n),a&&a.listener.call(a.object,n)}catch(e){console.log(e)}}}e.exports=o},function(e,n,t){function o(e){var n=this,t=new Object;n.pushBack=function(e,n,o){t[e]=[n,o]},n.callMethodAndPop=function(e,n,o){if(!t.hasOwnProperty(e))throw{error:"CallbackBuffer::callMethodAndPop(). Callback not found"};t[e][1].call(t[e][0],n,o,e),delete t[e]}}e.exports=o},function(e,n,t){function o(){var e=this,n=null;n=t(10),n="undefined"!=typeof window?window.WebSocket:n.w3cwebsocket;var o=console,r=null,i=null,a=null,c=null,l=null,s=null,u=null;e.connect=function(t,i){t.protocol=t.isSsl?"wss":"ws";try{var a=t.protocol+"://"+t.host+":"+t.port+"/json-rpc";
t.id&&(a+="?id="+t.id),r=new n(a,"json-rpc",null,null,t.isSsl?{rejectUnauthorized:!1}:null),r.binaryType="arraybuffer",r.onopen=function(){i(null)},r.onmessage=p,r.onclose=function(n,t){f(n,t,e)}}catch(e){o.log(e)}},e.setSocket=function(n){try{r=n,r.on("message",d),r.on("close",function(n,t){f(n,t,e)})}catch(e){o.log(e)}},e.setId=function(e){i=e},e.setPipedTo=function(e){u=e},e.getPipedTo=function(){return u},e.setRemoteAddress=function(e){a=e},e.setRemotePort=function(e){c=e},e.setOrigin=function(e){l=e},e.setListener=function(e){s=e},e.getId=function(){return i},e.getRemoteAddress=function(){return a},e.getRemotePort=function(){return c},e.getOrigin=function(){return l};var d=function(n){try{s&&("utf8"==n.type&&s.onMessage(n.utf8Data,e),"binary"==n.type&&s.onMessage(n.binaryData,e))}catch(e){o.log(e)}},p=function(n){try{s&&s.onMessage(n.data,e)}catch(e){o.log(e)}},f=function(e,n,t){try{s&&s.onDisconnected(t.getId())}catch(e){o.log(e)}};e.send=function(e){try{r.send(e)}catch(e){o.log(e)}},e.sendBinary=e.send,e.close=function(){try{r.close()}catch(e){o.log(e)}}}e.exports=o},function(e,t){e.exports=n},function(e,n,t){function o(){var e=this,n=null,o=null;n=t(7),o=t(9);var r=new o,i=new n;e.callRpc=function(e,n,t,o){return i.callRpc(e,n,t,o)},e.connect=function(e,n){r.connect(e,function(){i.addConnection(r),n(null,null)})},e.close=function(){},e.getCommunicator=function(){return i}}e.exports=o}])}),"undefined"!=typeof exports&&(module.exports=HttpParser),"undefined"!=typeof exports&&(module.exports=PiperClient),SpXMLHttpRequest.UNSENT=0,SpXMLHttpRequest.OPENED=1,SpXMLHttpRequest.HEADERS_RECEIVED=2,SpXMLHttpRequest.LOADING=3,SpXMLHttpRequest.DONE=4,SpXMLHttpRequest.OriginalXMLHttpRequest="undefined"!=typeof window?window.XMLHttpRequest:null,"undefined"!=typeof exports&&(module.exports=SpXMLHttpRequest),"undefined"!=typeof exports)var PiperClient=require("./piperclient");LoaderUtil.prototype.SERVER_ADDRESS=function(){return{host:"spaceify.net",port:1979}}(),LoaderUtil.prototype.WEBRTC_CONFIG=function(){return{iceServers:[{url:"stun:kandela.tv"},{url:"turn:kandela.tv",username:"webrtcuser",credential:"jeejeejee"}]}}(),LoaderUtil.prototype.piperClient=function(){return new PiperClient}(),"undefined"!=typeof exports?(module.exports=new LoaderUtil,global.SERVER_ADDRESS=module.exports.SERVER_ADDRESS,global.WEBRTC_CONFIG=module.exports.WEBRTC_CONFIG):LoaderUtil=new LoaderUtil;var spaceifyLoader=new SpaceifyLoader;window.onload=function(){var e,n,t=spaceifyLoader.parseQuery(window.location.href);t.sp_host||(e=n=window.location.protocol+"//"+window.location.hostname+"/","undefined"!=typeof document.loadPageSpHost&&(e=document.loadPageSpHost),"undefined"!=typeof document.loadPageSpeHost&&(n=document.loadPageSpeHost),t={sp_host:e,spe_host:n,sp_path:"index.html"}),getNetworkInfo(function(){window.isSpaceifyNetwork?(prepareLoader(t),loadPageOrElements(t)):(spaceifyLoader.setConnectionListener(function(){loadPageOrElements(t)}),prepareLoader(t))})};