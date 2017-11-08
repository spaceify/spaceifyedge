
/*
 AngularJS v1.5.3
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(T,P,u){'use strict';function O(a){return function(){var b=arguments[0],d;d="["+(a?a+":":"")+b+"] http://errors.angularjs.org/1.5.3/"+(a?a+"/":"")+b;for(b=1;b<arguments.length;b++){d=d+(1==b?"?":"&")+"p"+(b-1)+"=";var c=encodeURIComponent,e;e=arguments[b];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;d+=c(e)}return Error(d)}}function za(a){if(null==a||Ya(a))return!1;if(M(a)||y(a)||H&&a instanceof H)return!0;
var b="length"in Object(a)&&a.length;return R(b)&&(0<=b&&(b-1 in a||a instanceof Array)||"function"==typeof a.item)}function q(a,b,d){var c,e;if(a)if(D(a))for(c in a)"prototype"==c||"length"==c||"name"==c||a.hasOwnProperty&&!a.hasOwnProperty(c)||b.call(d,a[c],c,a);else if(M(a)||za(a)){var f="object"!==typeof a;c=0;for(e=a.length;c<e;c++)(f||c in a)&&b.call(d,a[c],c,a)}else if(a.forEach&&a.forEach!==q)a.forEach(b,d,a);else if(oc(a))for(c in a)b.call(d,a[c],c,a);else if("function"===typeof a.hasOwnProperty)for(c in a)a.hasOwnProperty(c)&&
b.call(d,a[c],c,a);else for(c in a)va.call(a,c)&&b.call(d,a[c],c,a);return a}function pc(a,b,d){for(var c=Object.keys(a).sort(),e=0;e<c.length;e++)b.call(d,a[c[e]],c[e]);return c}function qc(a){return function(b,d){a(d,b)}}function Wd(){return++qb}function Ob(a,b,d){for(var c=a.$$hashKey,e=0,f=b.length;e<f;++e){var g=b[e];if(J(g)||D(g))for(var h=Object.keys(g),k=0,l=h.length;k<l;k++){var m=h[k],n=g[m];d&&J(n)?fa(n)?a[m]=new Date(n.valueOf()):Za(n)?a[m]=new RegExp(n):n.nodeName?a[m]=n.cloneNode(!0):
Pb(n)?a[m]=n.clone():(J(a[m])||(a[m]=M(n)?[]:{}),Ob(a[m],[n],!0)):a[m]=n}}c?a.$$hashKey=c:delete a.$$hashKey;return a}function S(a){return Ob(a,Aa.call(arguments,1),!1)}function Xd(a){return Ob(a,Aa.call(arguments,1),!0)}function Y(a){return parseInt(a,10)}function Qb(a,b){return S(Object.create(a),b)}function E(){}function $a(a){return a}function da(a){return function(){return a}}function rc(a){return D(a.toString)&&a.toString!==ka}function z(a){return"undefined"===typeof a}function A(a){return"undefined"!==
typeof a}function J(a){return null!==a&&"object"===typeof a}function oc(a){return null!==a&&"object"===typeof a&&!sc(a)}function y(a){return"string"===typeof a}function R(a){return"number"===typeof a}function fa(a){return"[object Date]"===ka.call(a)}function D(a){return"function"===typeof a}function Za(a){return"[object RegExp]"===ka.call(a)}function Ya(a){return a&&a.window===a}function ab(a){return a&&a.$evalAsync&&a.$watch}function Oa(a){return"boolean"===typeof a}function Yd(a){return a&&R(a.length)&&
Zd.test(ka.call(a))}function Pb(a){return!(!a||!(a.nodeName||a.prop&&a.attr&&a.find))}function $d(a){var b={};a=a.split(",");var d;for(d=0;d<a.length;d++)b[a[d]]=!0;return b}function oa(a){return N(a.nodeName||a[0]&&a[0].nodeName)}function bb(a,b){var d=a.indexOf(b);0<=d&&a.splice(d,1);return d}function pa(a,b){function d(a,b){var d=b.$$hashKey,e;if(M(a)){e=0;for(var f=a.length;e<f;e++)b.push(c(a[e]))}else if(oc(a))for(e in a)b[e]=c(a[e]);else if(a&&"function"===typeof a.hasOwnProperty)for(e in a)a.hasOwnProperty(e)&&
(b[e]=c(a[e]));else for(e in a)va.call(a,e)&&(b[e]=c(a[e]));d?b.$$hashKey=d:delete b.$$hashKey;return b}function c(a){if(!J(a))return a;var b=f.indexOf(a);if(-1!==b)return g[b];if(Ya(a)||ab(a))throw Ba("cpws");var b=!1,c=e(a);c===u&&(c=M(a)?[]:Object.create(sc(a)),b=!0);f.push(a);g.push(c);return b?d(a,c):c}function e(a){switch(ka.call(a)){case "[object Int8Array]":case "[object Int16Array]":case "[object Int32Array]":case "[object Float32Array]":case "[object Float64Array]":case "[object Uint8Array]":case "[object Uint8ClampedArray]":case "[object Uint16Array]":case "[object Uint32Array]":return new a.constructor(c(a.buffer));
case "[object ArrayBuffer]":if(!a.slice){var b=new ArrayBuffer(a.byteLength);(new Uint8Array(b)).set(new Uint8Array(a));return b}return a.slice(0);case "[object Boolean]":case "[object Number]":case "[object String]":case "[object Date]":return new a.constructor(a.valueOf());case "[object RegExp]":return b=new RegExp(a.source,a.toString().match(/[^\/]*$/)[0]),b.lastIndex=a.lastIndex,b;case "[object Blob]":return new a.constructor([a],{type:a.type})}if(D(a.cloneNode))return a.cloneNode(!0)}var f=[],
g=[];if(b){if(Yd(b)||"[object ArrayBuffer]"===ka.call(b))throw Ba("cpta");if(a===b)throw Ba("cpi");M(b)?b.length=0:q(b,function(a,c){"$$hashKey"!==c&&delete b[c]});f.push(a);g.push(b);return d(a,b)}return c(a)}function ia(a,b){if(M(a)){b=b||[];for(var d=0,c=a.length;d<c;d++)b[d]=a[d]}else if(J(a))for(d in b=b||{},a)if("$"!==d.charAt(0)||"$"!==d.charAt(1))b[d]=a[d];return b||a}function na(a,b){if(a===b)return!0;if(null===a||null===b)return!1;if(a!==a&&b!==b)return!0;var d=typeof a,c;if(d==typeof b&&
"object"==d)if(M(a)){if(!M(b))return!1;if((d=a.length)==b.length){for(c=0;c<d;c++)if(!na(a[c],b[c]))return!1;return!0}}else{if(fa(a))return fa(b)?na(a.getTime(),b.getTime()):!1;if(Za(a))return Za(b)?a.toString()==b.toString():!1;if(ab(a)||ab(b)||Ya(a)||Ya(b)||M(b)||fa(b)||Za(b))return!1;d=V();for(c in a)if("$"!==c.charAt(0)&&!D(a[c])){if(!na(a[c],b[c]))return!1;d[c]=!0}for(c in b)if(!(c in d)&&"$"!==c.charAt(0)&&A(b[c])&&!D(b[c]))return!1;return!0}return!1}function cb(a,b,d){return a.concat(Aa.call(b,
d))}function tc(a,b){var d=2<arguments.length?Aa.call(arguments,2):[];return!D(b)||b instanceof RegExp?b:d.length?function(){return arguments.length?b.apply(a,cb(d,arguments,0)):b.apply(a,d)}:function(){return arguments.length?b.apply(a,arguments):b.call(a)}}function ae(a,b){var d=b;"string"===typeof a&&"$"===a.charAt(0)&&"$"===a.charAt(1)?d=u:Ya(b)?d="$WINDOW":b&&P===b?d="$DOCUMENT":ab(b)&&(d="$SCOPE");return d}function db(a,b){if(z(a))return u;R(b)||(b=b?2:null);return JSON.stringify(a,ae,b)}function uc(a){return y(a)?
JSON.parse(a):a}function vc(a,b){a=a.replace(be,"");var d=Date.parse("Jan 01, 1970 00:00:00 "+a)/6E4;return isNaN(d)?b:d}function Rb(a,b,d){d=d?-1:1;var c=a.getTimezoneOffset();b=vc(b,c);d*=b-c;a=new Date(a.getTime());a.setMinutes(a.getMinutes()+d);return a}function wa(a){a=H(a).clone();try{a.empty()}catch(b){}var d=H("<div>").append(a).html();try{return a[0].nodeType===Pa?N(d):d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+N(b)})}catch(c){return N(d)}}function wc(a){try{return decodeURIComponent(a)}catch(b){}}
function xc(a){var b={};q((a||"").split("&"),function(a){var c,e,f;a&&(e=a=a.replace(/\+/g,"%20"),c=a.indexOf("="),-1!==c&&(e=a.substring(0,c),f=a.substring(c+1)),e=wc(e),A(e)&&(f=A(f)?wc(f):!0,va.call(b,e)?M(b[e])?b[e].push(f):b[e]=[b[e],f]:b[e]=f))});return b}function Sb(a){var b=[];q(a,function(a,c){M(a)?q(a,function(a){b.push(ja(c,!0)+(!0===a?"":"="+ja(a,!0)))}):b.push(ja(c,!0)+(!0===a?"":"="+ja(a,!0)))});return b.length?b.join("&"):""}function rb(a){return ja(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,
"=").replace(/%2B/gi,"+")}function ja(a,b){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,b?"%20":"+")}function ce(a,b){var d,c,e=Qa.length;for(c=0;c<e;++c)if(d=Qa[c]+b,y(d=a.getAttribute(d)))return d;return null}function de(a,b){var d,c,e={};q(Qa,function(b){b+="app";!d&&a.hasAttribute&&a.hasAttribute(b)&&(d=a,c=a.getAttribute(b))});q(Qa,function(b){b+="app";var e;!d&&(e=a.querySelector("["+b.replace(":",
"\\:")+"]"))&&(d=e,c=e.getAttribute(b))});d&&(e.strictDi=null!==ce(d,"strict-di"),b(d,c?[c]:[],e))}function yc(a,b,d){J(d)||(d={});d=S({strictDi:!1},d);var c=function(){a=H(a);if(a.injector()){var c=a[0]===P?"document":wa(a);throw Ba("btstrpd",c.replace(/</,"&lt;").replace(/>/,"&gt;"));}b=b||[];b.unshift(["$provide",function(b){b.value("$rootElement",a)}]);d.debugInfoEnabled&&b.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);b.unshift("ng");c=eb(b,d.strictDi);c.invoke(["$rootScope",
"$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;T&&e.test(T.name)&&(d.debugInfoEnabled=!0,T.name=T.name.replace(e,""));if(T&&!f.test(T.name))return c();T.name=T.name.replace(f,"");ea.resumeBootstrap=function(a){q(a,function(a){b.push(a)});return c()};D(ea.resumeDeferredBootstrap)&&ea.resumeDeferredBootstrap()}function ee(){T.name="NG_ENABLE_DEBUG_INFO!"+T.name;T.location.reload()}
function fe(a){a=ea.element(a).injector();if(!a)throw Ba("test");return a.get("$$testability")}function zc(a,b){b=b||"_";return a.replace(ge,function(a,c){return(c?b:"")+a.toLowerCase()})}function he(){var a;if(!Ac){var b=sb();($=z(b)?T.jQuery:b?T[b]:u)&&$.fn.on?(H=$,S($.fn,{scope:Ra.scope,isolateScope:Ra.isolateScope,controller:Ra.controller,injector:Ra.injector,inheritedData:Ra.inheritedData}),a=$.cleanData,$.cleanData=function(b){for(var c,e=0,f;null!=(f=b[e]);e++)(c=$._data(f,"events"))&&c.$destroy&&
$(f).triggerHandler("$destroy");a(b)}):H=U;ea.element=H;Ac=!0}}function tb(a,b,d){if(!a)throw Ba("areq",b||"?",d||"required");return a}function Sa(a,b,d){d&&M(a)&&(a=a[a.length-1]);tb(D(a),b,"not a function, got "+(a&&"object"===typeof a?a.constructor.name||"Object":typeof a));return a}function Ta(a,b){if("hasOwnProperty"===a)throw Ba("badname",b);}function Bc(a,b,d){if(!b)return a;b=b.split(".");for(var c,e=a,f=b.length,g=0;g<f;g++)c=b[g],a&&(a=(e=a)[c]);return!d&&D(a)?tc(e,a):a}function ub(a){for(var b=
a[0],d=a[a.length-1],c,e=1;b!==d&&(b=b.nextSibling);e++)if(c||a[e]!==b)c||(c=H(Aa.call(a,0,e))),c.push(b);return c||a}function V(){return Object.create(null)}function ie(a){function b(a,b,c){return a[b]||(a[b]=c())}var d=O("$injector"),c=O("ng");a=b(a,"angular",Object);a.$$minErr=a.$$minErr||O;return b(a,"module",function(){var a={};return function(f,g,h){if("hasOwnProperty"===f)throw c("badname","module");g&&a.hasOwnProperty(f)&&(a[f]=null);return b(a,f,function(){function a(b,d,e,f){f||(f=c);return function(){f[e||
"push"]([b,d,arguments]);return L}}function b(a,d){return function(b,e){e&&D(e)&&(e.$$moduleName=f);c.push([a,d,arguments]);return L}}if(!g)throw d("nomod",f);var c=[],e=[],p=[],F=a("$injector","invoke","push",e),L={_invokeQueue:c,_configBlocks:e,_runBlocks:p,requires:g,name:f,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),decorator:b("$provide","decorator"),animation:b("$animateProvider",
"register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),component:b("$compileProvider","component"),config:F,run:function(a){p.push(a);return this}};h&&F(h);return L})}})}function je(a){S(a,{bootstrap:yc,copy:pa,extend:S,merge:Xd,equals:na,element:H,forEach:q,injector:eb,noop:E,bind:tc,toJson:db,fromJson:uc,identity:$a,isUndefined:z,isDefined:A,isString:y,isFunction:D,isObject:J,isNumber:R,isElement:Pb,isArray:M,
version:ke,isDate:fa,lowercase:N,uppercase:vb,callbacks:{counter:0},getTestability:fe,$$minErr:O,$$csp:Ga,reloadWithDebugInfo:ee});Tb=ie(T);Tb("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:le});a.provider("$compile",Cc).directive({a:me,input:Dc,textarea:Dc,form:ne,script:oe,select:pe,style:qe,option:re,ngBind:se,ngBindHtml:te,ngBindTemplate:ue,ngClass:ve,ngClassEven:we,ngClassOdd:xe,ngCloak:ye,ngController:ze,ngForm:Ae,ngHide:Be,ngIf:Ce,ngInclude:De,ngInit:Ee,ngNonBindable:Fe,
ngPluralize:Ge,ngRepeat:He,ngShow:Ie,ngStyle:Je,ngSwitch:Ke,ngSwitchWhen:Le,ngSwitchDefault:Me,ngOptions:Ne,ngTransclude:Oe,ngModel:Pe,ngList:Qe,ngChange:Re,pattern:Ec,ngPattern:Ec,required:Fc,ngRequired:Fc,minlength:Gc,ngMinlength:Gc,maxlength:Hc,ngMaxlength:Hc,ngValue:Se,ngModelOptions:Te}).directive({ngInclude:Ue}).directive(wb).directive(Ic);a.provider({$anchorScroll:Ve,$animate:We,$animateCss:Xe,$$animateJs:Ye,$$animateQueue:Ze,$$AnimateRunner:$e,$$animateAsyncRun:af,$browser:bf,$cacheFactory:cf,
$controller:df,$document:ef,$exceptionHandler:ff,$filter:Jc,$$forceReflow:gf,$interpolate:hf,$interval:jf,$http:kf,$httpParamSerializer:lf,$httpParamSerializerJQLike:mf,$httpBackend:nf,$xhrFactory:of,$location:pf,$log:qf,$parse:rf,$rootScope:sf,$q:tf,$$q:uf,$sce:vf,$sceDelegate:wf,$sniffer:xf,$templateCache:yf,$templateRequest:zf,$$testability:Af,$timeout:Bf,$window:Cf,$$rAF:Df,$$jqLite:Ef,$$HashMap:Ff,$$cookieReader:Gf})}])}function fb(a){return a.replace(Hf,function(a,d,c,e){return e?c.toUpperCase():
c}).replace(If,"Moz$1")}function Kc(a){a=a.nodeType;return 1===a||!a||9===a}function Lc(a,b){var d,c,e=b.createDocumentFragment(),f=[];if(Ub.test(a)){d=d||e.appendChild(b.createElement("div"));c=(Jf.exec(a)||["",""])[1].toLowerCase();c=ha[c]||ha._default;d.innerHTML=c[1]+a.replace(Kf,"<$1></$2>")+c[2];for(c=c[0];c--;)d=d.lastChild;f=cb(f,d.childNodes);d=e.firstChild;d.textContent=""}else f.push(b.createTextNode(a));e.textContent="";e.innerHTML="";q(f,function(a){e.appendChild(a)});return e}function Mc(a,
b){var d=a.parentNode;d&&d.replaceChild(b,a);b.appendChild(a)}function U(a){if(a instanceof U)return a;var b;y(a)&&(a=W(a),b=!0);if(!(this instanceof U)){if(b&&"<"!=a.charAt(0))throw Vb("nosel");return new U(a)}if(b){b=P;var d;a=(d=Lf.exec(a))?[b.createElement(d[1])]:(d=Lc(a,b))?d.childNodes:[]}Nc(this,a)}function Wb(a){return a.cloneNode(!0)}function xb(a,b){b||gb(a);if(a.querySelectorAll)for(var d=a.querySelectorAll("*"),c=0,e=d.length;c<e;c++)gb(d[c])}function Oc(a,b,d,c){if(A(c))throw Vb("offargs");
var e=(c=yb(a))&&c.events,f=c&&c.handle;if(f)if(b){var g=function(b){var c=e[b];A(d)&&bb(c||[],d);A(d)&&c&&0<c.length||(a.removeEventListener(b,f,!1),delete e[b])};q(b.split(" "),function(a){g(a);zb[a]&&g(zb[a])})}else for(b in e)"$destroy"!==b&&a.removeEventListener(b,f,!1),delete e[b]}function gb(a,b){var d=a.ng339,c=d&&hb[d];c&&(b?delete c.data[b]:(c.handle&&(c.events.$destroy&&c.handle({},"$destroy"),Oc(a)),delete hb[d],a.ng339=u))}function yb(a,b){var d=a.ng339,d=d&&hb[d];b&&!d&&(a.ng339=d=++Mf,
d=hb[d]={events:{},data:{},handle:u});return d}function Xb(a,b,d){if(Kc(a)){var c=A(d),e=!c&&b&&!J(b),f=!b;a=(a=yb(a,!e))&&a.data;if(c)a[b]=d;else{if(f)return a;if(e)return a&&a[b];S(a,b)}}}function Ab(a,b){return a.getAttribute?-1<(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+b+" "):!1}function Bb(a,b){b&&a.setAttribute&&q(b.split(" "),function(b){a.setAttribute("class",W((" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+W(b)+" "," ")))})}function Cb(a,
b){if(b&&a.setAttribute){var d=(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");q(b.split(" "),function(a){a=W(a);-1===d.indexOf(" "+a+" ")&&(d+=a+" ")});a.setAttribute("class",W(d))}}function Nc(a,b){if(b)if(b.nodeType)a[a.length++]=b;else{var d=b.length;if("number"===typeof d&&b.window!==b){if(d)for(var c=0;c<d;c++)a[a.length++]=b[c]}else a[a.length++]=b}}function Pc(a,b){return Db(a,"$"+(b||"ngController")+"Controller")}function Db(a,b,d){9==a.nodeType&&(a=a.documentElement);for(b=
M(b)?b:[b];a;){for(var c=0,e=b.length;c<e;c++)if(A(d=H.data(a,b[c])))return d;a=a.parentNode||11===a.nodeType&&a.host}}function Qc(a){for(xb(a,!0);a.firstChild;)a.removeChild(a.firstChild)}function Yb(a,b){b||xb(a);var d=a.parentNode;d&&d.removeChild(a)}function Nf(a,b){b=b||T;if("complete"===b.document.readyState)b.setTimeout(a);else H(b).on("load",a)}function Rc(a,b){var d=Eb[b.toLowerCase()];return d&&Sc[oa(a)]&&d}function Of(a,b){var d=function(c,d){c.isDefaultPrevented=function(){return c.defaultPrevented};
var f=b[d||c.type],g=f?f.length:0;if(g){if(z(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};var k=f.specialHandlerWrapper||Pf;1<g&&(f=ia(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||k(a,c,f[l])}};d.elem=a;return d}function Pf(a,b,d){d.call(a,b)}function Qf(a,b,
d){var c=b.relatedTarget;c&&(c===a||Rf.call(a,c))||d.call(a,b)}function Ef(){this.$get=function(){return S(U,{hasClass:function(a,b){a.attr&&(a=a[0]);return Ab(a,b)},addClass:function(a,b){a.attr&&(a=a[0]);return Cb(a,b)},removeClass:function(a,b){a.attr&&(a=a[0]);return Bb(a,b)}})}}function Ha(a,b){var d=a&&a.$$hashKey;if(d)return"function"===typeof d&&(d=a.$$hashKey()),d;d=typeof a;return d="function"==d||"object"==d&&null!==a?a.$$hashKey=d+":"+(b||Wd)():d+":"+a}function Ua(a,b){if(b){var d=0;this.nextUid=
function(){return++d}}q(a,this.put,this)}function Tc(a){a=a.toString().replace(Sf,"");return a.match(Tf)||a.match(Uf)}function Vf(a){return(a=Tc(a))?"function("+(a[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function eb(a,b){function d(a){return function(b,c){if(J(b))q(b,qc(a));else return a(b,c)}}function c(a,b){Ta(a,"service");if(D(b)||M(b))b=p.instantiate(b);if(!b.$get)throw Ia("pget",a);return n[a+"Provider"]=b}function e(a,b){return function(){var c=x.invoke(b,this);if(z(c))throw Ia("undef",a);
return c}}function f(a,b,d){return c(a,{$get:!1!==d?e(a,b):b})}function g(a){tb(z(a)||M(a),"modulesToLoad","not an array");var b=[],c;q(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=p.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,!0);try{y(a)?(c=Tb(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):D(a)?b.push(p.invoke(a)):M(a)?b.push(p.invoke(a)):Sa(a,"module")}catch(e){throw M(a)&&(a=a[a.length-1]),e.message&&e.stack&&
-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ia("modulerr",a,e.stack||e.message||e);}}});return b}function h(a,c){function d(b,e){if(a.hasOwnProperty(b)){if(a[b]===k)throw Ia("cdep",b+" <- "+l.join(" <- "));return a[b]}try{return l.unshift(b),a[b]=k,a[b]=c(b,e)}catch(f){throw a[b]===k&&delete a[b],f;}finally{l.shift()}}function e(a,c,f){var g=[];a=eb.$$annotate(a,b,f);for(var h=0,k=a.length;h<k;h++){var l=a[h];if("string"!==typeof l)throw Ia("itkn",l);g.push(c&&c.hasOwnProperty(l)?c[l]:
d(l,f))}return g}return{invoke:function(a,b,c,d){"string"===typeof c&&(d=c,c=null);c=e(a,c,d);M(a)&&(a=a[a.length-1]);d=11>=Da?!1:"function"===typeof a&&/^(?:class\s|constructor\()/.test(Function.prototype.toString.call(a));return d?(c.unshift(null),new (Function.prototype.bind.apply(a,c))):a.apply(b,c)},instantiate:function(a,b,c){var d=M(a)?a[a.length-1]:a;a=e(a,b,c);a.unshift(null);return new (Function.prototype.bind.apply(d,a))},get:d,annotate:eb.$$annotate,has:function(b){return n.hasOwnProperty(b+
"Provider")||a.hasOwnProperty(b)}}}b=!0===b;var k={},l=[],m=new Ua([],!0),n={$provide:{provider:d(c),factory:d(f),service:d(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:d(function(a,b){return f(a,da(b),!1)}),constant:d(function(a,b){Ta(a,"constant");n[a]=b;F[a]=b}),decorator:function(a,b){var c=p.get(a+"Provider"),d=c.$get;c.$get=function(){var a=x.invoke(d,c);return x.invoke(b,null,{$delegate:a})}}}},p=n.$injector=h(n,function(a,b){ea.isString(b)&&l.push(b);
throw Ia("unpr",l.join(" <- "));}),F={},L=h(F,function(a,b){var c=p.get(a+"Provider",b);return x.invoke(c.$get,c,u,a)}),x=L;n.$injectorProvider={$get:da(L)};var r=g(a),x=L.get("$injector");x.strictDi=b;q(r,function(a){a&&x.invoke(a)});return x}function Ve(){var a=!0;this.disableAutoScrolling=function(){a=!1};this.$get=["$window","$location","$rootScope",function(b,d,c){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===oa(a))return b=a,!0});return b}function f(a){if(a){a.scrollIntoView();
var c;c=g.yOffset;D(c)?c=c():Pb(c)?(c=c[0],c="fixed"!==b.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):R(c)||(c=0);c&&(a=a.getBoundingClientRect().top,b.scrollBy(0,a-c))}else b.scrollTo(0,0)}function g(a){a=y(a)?a:d.hash();var b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var h=b.document;a&&c.$watch(function(){return d.hash()},function(a,b){a===b&&""===a||Nf(function(){c.$evalAsync(g)})});return g}]}function ib(a,b){if(!a&&!b)return"";
if(!a)return b;if(!b)return a;M(a)&&(a=a.join(" "));M(b)&&(b=b.join(" "));return a+" "+b}function Wf(a){y(a)&&(a=a.split(" "));var b=V();q(a,function(a){a.length&&(b[a]=!0)});return b}function Ja(a){return J(a)?a:{}}function Xf(a,b,d,c){function e(a){try{a.apply(null,Aa.call(arguments,1))}finally{if(L--,0===L)for(;x.length;)try{x.pop()()}catch(b){d.error(b)}}}function f(){t=null;g();h()}function g(){r=G();r=z(r)?null:r;na(r,I)&&(r=I);I=r}function h(){if(v!==k.url()||w!==r)v=k.url(),w=r,q(C,function(a){a(k.url(),
r)})}var k=this,l=a.location,m=a.history,n=a.setTimeout,p=a.clearTimeout,F={};k.isMock=!1;var L=0,x=[];k.$$completeOutstandingRequest=e;k.$$incOutstandingRequestCount=function(){L++};k.notifyWhenNoOutstandingRequests=function(a){0===L?a():x.push(a)};var r,w,v=l.href,Q=b.find("base"),t=null,G=c.history?function(){try{return m.state}catch(a){}}:E;g();w=r;k.url=function(b,d,e){z(e)&&(e=null);l!==a.location&&(l=a.location);m!==a.history&&(m=a.history);if(b){var f=w===e;if(v===b&&(!c.history||f))return k;
var h=v&&Ka(v)===Ka(b);v=b;w=e;if(!c.history||h&&f){if(!h||t)t=b;d?l.replace(b):h?(d=l,e=b.indexOf("#"),e=-1===e?"":b.substr(e),d.hash=e):l.href=b;l.href!==b&&(t=b)}else m[d?"replaceState":"pushState"](e,"",b),g(),w=r;return k}return t||l.href.replace(/%27/g,"'")};k.state=function(){return r};var C=[],K=!1,I=null;k.onUrlChange=function(b){if(!K){if(c.history)H(a).on("popstate",f);H(a).on("hashchange",f);K=!0}C.push(b);return b};k.$$applicationDestroyed=function(){H(a).off("hashchange popstate",f)};
k.$$checkUrlChange=h;k.baseHref=function(){var a=Q.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};k.defer=function(a,b){var c;L++;c=n(function(){delete F[c];e(a)},b||0);F[c]=!0;return c};k.defer.cancel=function(a){return F[a]?(delete F[a],p(a),e(E),!0):!1}}function bf(){this.$get=["$window","$log","$sniffer","$document",function(a,b,d,c){return new Xf(a,c,b,d)}]}function cf(){this.$get=function(){function a(a,c){function e(a){a!=n&&(p?p==a&&(p=a.n):p=a,f(a.n,a.p),f(a,n),n=a,n.n=
null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(a in b)throw O("$cacheFactory")("iid",a);var g=0,h=S({},c,{id:a}),k=V(),l=c&&c.capacity||Number.MAX_VALUE,m=V(),n=null,p=null;return b[a]={put:function(a,b){if(!z(b)){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}a in k||g++;k[a]=b;g>l&&this.remove(p.key);return b}},get:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return k[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b==n&&(n=b.p);b==p&&(p=
b.n);f(b.n,b.p);delete m[a]}a in k&&(delete k[a],g--)},removeAll:function(){k=V();g=0;m=V();n=p=null},destroy:function(){m=h=k=null;delete b[a]},info:function(){return S({},h,{size:g})}}}var b={};a.info=function(){var a={};q(b,function(b,e){a[e]=b.info()});return a};a.get=function(a){return b[a]};return a}}function yf(){this.$get=["$cacheFactory",function(a){return a("templates")}]}function Cc(a,b){function d(a,b,c){var d=/^\s*([@&<]|=(\*?))(\??)\s*(\w*)\s*$/,e={};q(a,function(a,f){if(a in m)e[f]=
m[a];else{var g=a.match(d);if(!g)throw ga("iscp",b,f,a,c?"controller bindings definition":"isolate scope definition");e[f]={mode:g[1][0],collection:"*"===g[2],optional:"?"===g[3],attrName:g[4]||f};g[4]&&(m[a]=e[f])}});return e}function c(a){var b=a.charAt(0);if(!b||b!==N(b))throw ga("baddir",a);if(a!==a.trim())throw ga("baddir",a);}var e={},f=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,g=/(([\w\-]+)(?:\:([^;]+))?;?)/,h=$d("ngSrc,ngSrcset,src,srcset"),k=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,l=/^(on[a-z]+|formaction)$/,
m=V();this.directive=function L(b,d){Ta(b,"directive");y(b)?(c(b),tb(d,"directiveFactory"),e.hasOwnProperty(b)||(e[b]=[],a.factory(b+"Directive",["$injector","$exceptionHandler",function(a,c){var d=[];q(e[b],function(e,f){try{var g=a.invoke(e);D(g)?g={compile:da(g)}:!g.compile&&g.link&&(g.compile=da(g.link));g.priority=g.priority||0;g.index=f;g.name=g.name||b;g.require=g.require||g.controller&&g.name;g.restrict=g.restrict||"EA";g.$$moduleName=e.$$moduleName;d.push(g)}catch(h){c(h)}});return d}])),
e[b].push(d)):q(b,qc(L));return this};this.component=function(a,b){function c(a){function e(b){return D(b)||M(b)?function(c,d){return a.invoke(b,this,{$element:c,$attrs:d})}:b}var f=b.template||b.templateUrl?b.template:"";return{controller:d,controllerAs:Uc(b.controller)||b.controllerAs||"$ctrl",template:e(f),templateUrl:e(b.templateUrl),transclude:b.transclude,scope:{},bindToController:b.bindings||{},restrict:"E",require:b.require}}var d=b.controller||E;q(b,function(a,b){"$"===b.charAt(0)&&(c[b]=
a,d[b]=a)});c.$inject=["$injector"];return this.directive(a,c)};this.aHrefSanitizationWhitelist=function(a){return A(a)?(b.aHrefSanitizationWhitelist(a),this):b.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(a){return A(a)?(b.imgSrcSanitizationWhitelist(a),this):b.imgSrcSanitizationWhitelist()};var n=!0;this.debugInfoEnabled=function(a){return A(a)?(n=a,this):n};var p=10;this.onChangesTtl=function(a){return arguments.length?(p=a,this):p};this.$get=["$injector","$interpolate",
"$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$sce","$animate","$$sanitizeUri",function(a,b,c,m,v,Q,t,G,C,K){function I(){try{if(!--pa)throw $=u,ga("infchng",p);t.$apply(function(){for(var a=0,b=$.length;a<b;++a)$[a]();$=u})}finally{pa++}}function qa(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=a}function Ca(a,b,c){la.innerHTML="<span "+b+">";b=la.firstChild.attributes;var d=b[0];b.removeNamedItem(d.name);
d.value=c;a.attributes.setNamedItem(d)}function B(a,b){try{a.addClass(b)}catch(c){}}function ba(a,b,c,d,e){a instanceof H||(a=H(a));for(var f=/\S+/,g=0,h=a.length;g<h;g++){var k=a[g];k.nodeType===Pa&&k.nodeValue.match(f)&&Mc(k,a[g]=P.createElement("span"))}var l=xa(a,b,a,c,d,e);ba.$$addScopeClass(a);var m=null;return function(b,c,d){tb(b,"scope");e&&e.needsNewScope&&(b=b.$parent.$new());d=d||{};var f=d.parentBoundTranscludeFn,g=d.transcludeControllers;d=d.futureParentElement;f&&f.$$boundTransclude&&
(f=f.$$boundTransclude);m||(m=(d=d&&d[0])?"foreignobject"!==oa(d)&&ka.call(d).match(/SVG/)?"svg":"html":"html");d="html"!==m?H(ca(m,H("<div>").append(a).html())):c?Ra.clone.call(a):a;if(g)for(var h in g)d.data("$"+h+"Controller",g[h].instance);ba.$$addScopeInfo(d,b);c&&c(d,b);l&&l(b,d,d,f);return d}}function xa(a,b,c,d,e,f){function g(a,c,d,e){var f,k,l,m,n,p,G;if(r)for(G=Array(c.length),m=0;m<h.length;m+=3)f=h[m],G[f]=c[f];else G=c;m=0;for(n=h.length;m<n;)k=G[h[m++]],c=h[m++],f=h[m++],c?(c.scope?
(l=a.$new(),ba.$$addScopeInfo(H(k),l)):l=a,p=c.transcludeOnThisElement?s(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?s(a,b):null,c(f,l,k,d,p)):f&&f(a,k.childNodes,u,e)}for(var h=[],k,l,m,n,r,p=0;p<a.length;p++){k=new qa;l=A(a[p],[],k,0===p?d:u,e);(f=l.length?ra(l,a[p],k,b,c,null,[],[],f):null)&&f.scope&&ba.$$addScopeClass(k.$$element);k=f&&f.terminal||!(m=a[p].childNodes)||!m.length?null:xa(m,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||k)h.push(p,f,k),
n=!0,r=r||f;f=null}return n?g:null}function s(a,b,c){function d(e,f,g,h,k){e||(e=a.$new(!1,k),e.$$transcluded=!0);return b(e,f,{parentBoundTranscludeFn:c,transcludeControllers:g,futureParentElement:h})}var e=d.$$slots=V(),f;for(f in b.$$slots)e[f]=b.$$slots[f]?s(a,b.$$slots[f],c):null;return d}function A(a,b,c,d,e){var h=c.$attr,k;switch(a.nodeType){case 1:Fa(b,ya(oa(a)),"E",d,e);for(var l,m,n,r=a.attributes,p=0,G=r&&r.length;p<G;p++){var v=!1,C=!1;l=r[p];k=l.name;m=W(l.value);l=ya(k);if(n=za.test(l))k=
k.replace(Vc,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()});(l=l.match(Ba))&&R(l[1])&&(v=k,C=k.substr(0,k.length-5)+"end",k=k.substr(0,k.length-6));l=ya(k.toLowerCase());h[l]=k;if(n||!c.hasOwnProperty(l))c[l]=m,Rc(a,l)&&(c[l]=!0);fa(a,b,m,l,n);Fa(b,l,"A",d,e,v,C)}a=a.className;J(a)&&(a=a.animVal);if(y(a)&&""!==a)for(;k=g.exec(a);)l=ya(k[2]),Fa(b,l,"C",d,e)&&(c[l]=W(k[3])),a=a.substr(k.index+k[0].length);break;case Pa:if(11===Da)for(;a.parentNode&&a.nextSibling&&a.nextSibling.nodeType===
Pa;)a.nodeValue+=a.nextSibling.nodeValue,a.parentNode.removeChild(a.nextSibling);Y(b,a.nodeValue);break;case 8:try{if(k=f.exec(a.nodeValue))l=ya(k[1]),Fa(b,l,"M",d,e)&&(c[l]=W(k[2]))}catch(w){}}b.sort(Z);return b}function Wc(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ga("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return H(d)}function O(a,b,c){return function(d,e,f,g,h){e=Wc(e[0],
b,c);return a(d,e,f,g,h)}}function Zb(a,b,c,d,e,f){var g;return a?ba(b,c,d,e,f):function(){g||(g=ba(b,c,d,e,f),b=c=f=null);return g.apply(this,arguments)}}function ra(a,b,d,e,f,g,h,k,l){function m(a,b,c,d){if(a){c&&(a=O(a,c,d));a.require=B.require;a.directiveName=L;if(C===B||B.$$isolateScope)a=ia(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=O(b,c,d));b.require=B.require;b.directiveName=L;if(C===B||B.$$isolateScope)b=ia(b,{isolateScope:!0});k.push(b)}}function n(a,c,e,f,g){function l(a,b,c,d){var e;
ab(a)||(d=c,c=b,b=a,a=u);Ca&&(e=K);c||(c=Ca?t.parent():t);if(d){var f=g.$$slots[d];if(f)return f(a,b,e,c,s);if(z(f))throw ga("noslot",d,wa(t));}else return g(a,b,e,c,s)}var m,r,p,B,I,K,x,t;b===e?(f=d,t=d.$$element):(t=H(e),f=new qa(t,d));I=c;C?B=c.$new(!0):G&&(I=c.$parent);g&&(x=l,x.$$boundTransclude=g,x.isSlotFilled=function(a){return!!g.$$slots[a]});v&&(K=T(t,f,x,v,B,c,C));C&&(ba.$$addScopeInfo(t,B,!0,!(w&&(w===C||w===C.$$originalDirective))),ba.$$addScopeClass(t,!0),B.$$isolateBindings=C.$$isolateBindings,
(p=ha(c,f,B,B.$$isolateBindings,C))&&B.$on("$destroy",p));for(r in K){p=v[r];var Va=K[r],Q=p.$$bindings.bindToController;Va.identifier&&Q&&(m=ha(I,f,Va.instance,Q,p));var L=Va();L!==Va.instance&&(Va.instance=L,t.data("$"+p.name+"Controller",L),m&&m(),m=ha(I,f,Va.instance,Q,p))}q(v,function(a,b){var c=a.require;a.bindToController&&!M(c)&&J(c)&&S(K[b].instance,jb(b,c,t,K))});q(K,function(a){var b=a.instance;D(b.$onInit)&&b.$onInit();D(b.$onDestroy)&&I.$on("$destroy",function(){b.$onDestroy()})});m=
0;for(r=h.length;m<r;m++)p=h[m],ja(p,p.isolateScope?B:c,t,f,p.require&&jb(p.directiveName,p.require,t,K),x);var s=c;C&&(C.template||null===C.templateUrl)&&(s=B);a&&a(s,e.childNodes,u,g);for(m=k.length-1;0<=m;m--)p=k[m],ja(p,p.isolateScope?B:c,t,f,p.require&&jb(p.directiveName,p.require,t,K),x);q(K,function(a){a=a.instance;D(a.$postLink)&&a.$postLink()})}l=l||{};for(var p=-Number.MAX_VALUE,G=l.newScopeDirective,v=l.controllerDirectives,C=l.newIsolateScopeDirective,w=l.templateDirective,I=l.nonTlbTranscludeDirective,
K=!1,x=!1,Ca=l.hasElementTranscludeDirective,t=d.$$element=H(b),B,L,Q,s=e,xa,Ea=!1,E=!1,y,ra=0,N=a.length;ra<N;ra++){B=a[ra];var R=B.$$start,Fa=B.$$end;R&&(t=Wc(b,R,Fa));Q=u;if(p>B.priority)break;if(y=B.scope)B.templateUrl||(J(y)?(X("new/isolated scope",C||G,B,t),C=B):X("new/isolated scope",C,B,t)),G=G||B;L=B.name;if(!Ea&&(B.replace&&(B.templateUrl||B.template)||B.transclude&&!B.$$tlb)){for(y=ra+1;Ea=a[y++];)if(Ea.transclude&&!Ea.$$tlb||Ea.replace&&(Ea.templateUrl||Ea.template)){E=!0;break}Ea=!0}!B.templateUrl&&
B.controller&&(y=B.controller,v=v||V(),X("'"+L+"' controller",v[L],B,t),v[L]=B);if(y=B.transclude)if(K=!0,B.$$tlb||(X("transclusion",I,B,t),I=B),"element"==y)Ca=!0,p=B.priority,Q=t,t=d.$$element=H(ba.$$createComment(L,d[L])),b=t[0],da(f,Aa.call(Q,0),b),Q[0].$$parentNode=Q[0].parentNode,s=Zb(E,Q,e,p,g&&g.name,{nonTlbTranscludeDirective:I});else{var P=V();Q=H(Wb(b)).contents();if(J(y)){Q=[];var Z=V(),Y=V();q(y,function(a,b){var c="?"===a.charAt(0);a=c?a.substring(1):a;Z[a]=b;P[b]=null;Y[b]=c});q(t.contents(),
function(a){var b=Z[ya(oa(a))];b?(Y[b]=!0,P[b]=P[b]||[],P[b].push(a)):Q.push(a)});q(Y,function(a,b){if(!a)throw ga("reqslot",b);});for(var $ in P)P[$]&&(P[$]=Zb(E,P[$],e))}t.empty();s=Zb(E,Q,e,u,u,{needsNewScope:B.$$isolateScope||B.$$newScope});s.$$slots=P}if(B.template)if(x=!0,X("template",w,B,t),w=B,y=D(B.template)?B.template(t,d):B.template,y=ua(y),B.replace){g=B;Q=Ub.test(y)?Xc(ca(B.templateNamespace,W(y))):[];b=Q[0];if(1!=Q.length||1!==b.nodeType)throw ga("tplrt",L,"");da(f,t,b);N={$attr:{}};
y=A(b,[],N);var ea=a.splice(ra+1,a.length-(ra+1));(C||G)&&Yc(y,C,G);a=a.concat(y).concat(ea);U(d,N);N=a.length}else t.html(y);if(B.templateUrl)x=!0,X("template",w,B,t),w=B,B.replace&&(g=B),n=aa(a.splice(ra,a.length-ra),t,d,f,K&&s,h,k,{controllerDirectives:v,newScopeDirective:G!==B&&G,newIsolateScopeDirective:C,templateDirective:w,nonTlbTranscludeDirective:I}),N=a.length;else if(B.compile)try{xa=B.compile(t,d,s),D(xa)?m(null,xa,R,Fa):xa&&m(xa.pre,xa.post,R,Fa)}catch(fa){c(fa,wa(t))}B.terminal&&(n.terminal=
!0,p=Math.max(p,B.priority))}n.scope=G&&!0===G.scope;n.transcludeOnThisElement=K;n.templateOnThisElement=x;n.transclude=s;l.hasElementTranscludeDirective=Ca;return n}function jb(a,b,c,d){var e;if(y(b)){var f=b.match(k);b=b.substring(f[0].length);var g=f[1]||f[3],f="?"===f[2];"^^"===g?c=c.parent():e=(e=d&&d[b])&&e.instance;if(!e){var h="$"+b+"Controller";e=g?c.inheritedData(h):c.data(h)}if(!e&&!f)throw ga("ctreq",b,a);}else if(M(b))for(e=[],g=0,f=b.length;g<f;g++)e[g]=jb(a,b[g],c,d);else J(b)&&(e=
{},q(b,function(b,f){e[f]=jb(a,b,c,d)}));return e||null}function T(a,b,c,d,e,f,g){var h=V(),k;for(k in d){var l=d[k],m={$scope:l===g||l.$$isolateScope?e:f,$element:a,$attrs:b,$transclude:c},n=l.controller;"@"==n&&(n=b[l.name]);m=Q(n,m,!0,l.controllerAs);h[l.name]=m;a.data("$"+l.name+"Controller",m.instance)}return h}function Yc(a,b,c){for(var d=0,e=a.length;d<e;d++)a[d]=Qb(a[d],{$$isolateScope:b,$$newScope:c})}function Fa(b,f,g,h,k,l,m){if(f===k)return null;k=null;if(e.hasOwnProperty(f)){var n;f=
a.get(f+"Directive");for(var p=0,G=f.length;p<G;p++)try{if(n=f[p],(z(h)||h>n.priority)&&-1!=n.restrict.indexOf(g)){l&&(n=Qb(n,{$$start:l,$$end:m}));if(!n.$$bindings){var v=n,C=n,w=n.name,B={isolateScope:null,bindToController:null};J(C.scope)&&(!0===C.bindToController?(B.bindToController=d(C.scope,w,!0),B.isolateScope={}):B.isolateScope=d(C.scope,w,!1));J(C.bindToController)&&(B.bindToController=d(C.bindToController,w,!0));if(J(B.bindToController)){var I=C.controller,K=C.controllerAs;if(!I)throw ga("noctrl",
w);if(!Uc(I,K))throw ga("noident",w);}var x=v.$$bindings=B;J(x.isolateScope)&&(n.$$isolateBindings=x.isolateScope)}b.push(n);k=n}}catch(t){c(t)}}return k}function R(b){if(e.hasOwnProperty(b))for(var c=a.get(b+"Directive"),d=0,f=c.length;d<f;d++)if(b=c[d],b.multiElement)return!0;return!1}function U(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;q(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});q(b,function(b,f){"class"==f?(B(e,b),a["class"]=(a["class"]?
a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function aa(a,b,c,d,e,f,g,h){var k=[],l,n,p=b[0],r=a.shift(),G=Qb(r,{templateUrl:null,transclude:null,replace:null,$$originalDirective:r}),v=D(r.templateUrl)?r.templateUrl(b,c):r.templateUrl,C=r.templateNamespace;b.empty();m(v).then(function(m){var w,I;m=ua(m);if(r.replace){m=Ub.test(m)?Xc(ca(C,W(m))):[];w=m[0];if(1!=m.length||1!==
w.nodeType)throw ga("tplrt",r.name,v);m={$attr:{}};da(d,b,w);var K=A(w,[],m);J(r.scope)&&Yc(K,!0);a=K.concat(a);U(c,m)}else w=p,b.html(m);a.unshift(G);l=ra(a,w,c,e,b,r,f,g,h);q(d,function(a,c){a==w&&(d[c]=b[0])});for(n=xa(b[0].childNodes,e);k.length;){m=k.shift();I=k.shift();var x=k.shift(),t=k.shift(),K=b[0];if(!m.$$destroyed){if(I!==p){var qa=I.className;h.hasElementTranscludeDirective&&r.replace||(K=Wb(w));da(x,H(I),K);B(H(K),qa)}I=l.transcludeOnThisElement?s(m,l.transclude,t):t;l(n,m,K,d,I)}}k=
null});return function(a,b,c,d,e){a=e;b.$$destroyed||(k?k.push(b,c,d,a):(l.transcludeOnThisElement&&(a=s(b,l.transclude,e)),l(n,b,c,d,a)))}}function Z(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function X(a,b,c,d){function e(a){return a?" (module: "+a+")":""}if(b)throw ga("multidir",b.name,e(b.$$moduleName),c.name,e(c.$$moduleName),a,wa(d));}function Y(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;
b&&ba.$$addBindingClass(a);return function(a,c){var e=c.parent();b||ba.$$addBindingClass(e);ba.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function ca(a,b){a=N(a||"html");switch(a){case "svg":case "math":var c=P.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function ea(a,b){if("srcdoc"==b)return G.HTML;var c=oa(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return G.RESOURCE_URL}
function fa(a,c,d,e,f){var g=ea(a,e);f=h[e]||f;var k=b(d,!0,g,f);if(k){if("multiple"===e&&"select"===oa(a))throw ga("selmulti",wa(a));c.push({priority:100,compile:function(){return{pre:function(a,c,h){c=h.$$observers||(h.$$observers=V());if(l.test(e))throw ga("nodomevents");var m=h[e];m!==d&&(k=m&&b(m,!0,g,f),d=m);k&&(h[e]=k(a),(c[e]||(c[e]=[])).$$inter=!0,(h.$$observers&&h.$$observers[e].$$scope||a).$watch(k,function(a,b){"class"===e&&a!=b?h.$updateClass(a,b):h.$set(e,a)}))}}}})}}function da(a,b,
c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=P.createDocumentFragment();for(g=0;g<e;g++)a.appendChild(b[g]);H.hasData(d)&&(H.data(c,H.data(d)),H(d).off("$destroy"));H.cleanData(a.querySelectorAll("*"));for(g=1;g<e;g++)delete b[g];b[0]=c;b.length=1}function ia(a,b){return S(function(){return a.apply(null,arguments)},
a,b)}function ja(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,wa(d))}}function ha(a,c,d,e,f){function g(b,c,e){D(d.$onChanges)&&c!==e&&($||(a.$$postDigest(I),$=[]),l||(l={},$.push(h)),l[b]&&(e=l[b].previousValue),l[b]={previousValue:e,currentValue:c})}function h(){d.$onChanges(l);l=u}var k=[],l;q(e,function(e,h){var l=e.attrName,m=e.optional,n,r,p,G;switch(e.mode){case "@":m||va.call(c,l)||(d[h]=c[l]=void 0);c.$observe(l,function(a){y(a)&&(g(h,a,d[h]),d[h]=a)});c.$$observers[l].$$scope=a;n=c[l];y(n)?
d[h]=b(n)(a):Oa(n)&&(d[h]=n);break;case "=":if(!va.call(c,l)){if(m)break;c[l]=void 0}if(m&&!c[l])break;r=v(c[l]);G=r.literal?na:function(a,b){return a===b||a!==a&&b!==b};p=r.assign||function(){n=d[h]=r(a);throw ga("nonassign",c[l],l,f.name);};n=d[h]=r(a);m=function(b){G(b,d[h])||(G(b,n)?p(a,b=d[h]):d[h]=b);return n=b};m.$stateful=!0;m=e.collection?a.$watchCollection(c[l],m):a.$watch(v(c[l],m),null,r.literal);k.push(m);break;case "<":if(!va.call(c,l)){if(m)break;c[l]=void 0}if(m&&!c[l])break;r=v(c[l]);
d[h]=r(a);m=a.$watch(r,function(a){g(h,a,d[h]);d[h]=a},r.literal);k.push(m);break;case "&":r=c.hasOwnProperty(l)?v(c[l]):E;if(r===E&&m)break;d[h]=function(b){return r(a,b)}}});return k.length&&function(){for(var a=0,b=k.length;a<b;++a)k[a]()}}var ma=/^\w/,la=P.createElement("div"),pa=p,$;qa.prototype={$normalize:ya,$addClass:function(a){a&&0<a.length&&C.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&C.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=Zc(a,b);c&&
c.length&&C.addClass(this.$$element,c);(c=Zc(b,a))&&c.length&&C.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=Rc(this.$$element[0],a),g=$c[a],h=a;f?(this.$$element.prop(a,b),e=f):g&&(this[g]=b,h=g);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=zc(a,"-"));f=oa(this.$$element);if("a"===f&&("href"===a||"xlinkHref"===a)||"img"===f&&"src"===a)this[a]=b=K(b,"src"===a);else if("img"===f&&"srcset"===a){for(var f="",g=W(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(g)?
k:/(,)/,g=g.split(k),k=Math.floor(g.length/2),l=0;l<k;l++)var m=2*l,f=f+K(W(g[m]),!0),f=f+(" "+W(g[m+1]));g=W(g[2*l]).split(/\s/);f+=K(W(g[0]),!0);2===g.length&&(f+=" "+W(g[1]));this[a]=b=f}!1!==d&&(null===b||z(b)?this.$$element.removeAttr(e):ma.test(e)?this.$$element.attr(e,b):Ca(this.$$element[0],e,b));(a=this.$$observers)&&q(a[h],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=V()),e=d[a]||(d[a]=[]);e.push(b);t.$evalAsync(function(){e.$$inter||
!c.hasOwnProperty(a)||z(c[a])||b(c[a])});return function(){bb(e,b)}}};var sa=b.startSymbol(),ta=b.endSymbol(),ua="{{"==sa&&"}}"==ta?$a:function(a){return a.replace(/\{\{/g,sa).replace(/}}/g,ta)},za=/^ngAttr[A-Z]/,Ba=/^(.+)Start$/;ba.$$addBindingInfo=n?function(a,b){var c=a.data("$binding")||[];M(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:E;ba.$$addBindingClass=n?function(a){B(a,"ng-binding")}:E;ba.$$addScopeInfo=n?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",
b)}:E;ba.$$addScopeClass=n?function(a,b){B(a,b?"ng-isolate-scope":"ng-scope")}:E;ba.$$createComment=function(a,b){var c="";n&&(c=" "+(a||"")+": "+(b||"")+" ");return P.createComment(c)};return ba}]}function ya(a){return fb(a.replace(Vc,""))}function Zc(a,b){var d="",c=a.split(/\s+/),e=b.split(/\s+/),f=0;a:for(;f<c.length;f++){for(var g=c[f],h=0;h<e.length;h++)if(g==e[h])continue a;d+=(0<d.length?" ":"")+g}return d}function Xc(a){a=H(a);var b=a.length;if(1>=b)return a;for(;b--;)8===a[b].nodeType&&
Yf.call(a,b,1);return a}function Uc(a,b){if(b&&y(b))return b;if(y(a)){var d=ad.exec(a);if(d)return d[3]}}function df(){var a={},b=!1;this.has=function(b){return a.hasOwnProperty(b)};this.register=function(b,c){Ta(b,"controller");J(b)?S(a,b):a[b]=c};this.allowGlobals=function(){b=!0};this.$get=["$injector","$window",function(d,c){function e(a,b,c,d){if(!a||!J(a.$scope))throw O("$controller")("noscp",d,b);a.$scope[b]=c}return function(f,g,h,k){var l,m,n;h=!0===h;k&&y(k)&&(n=k);if(y(f)){k=f.match(ad);
if(!k)throw Zf("ctrlfmt",f);m=k[1];n=n||k[3];f=a.hasOwnProperty(m)?a[m]:Bc(g.$scope,m,!0)||(b?Bc(c,m,!0):u);Sa(f,m,!0)}if(h)return h=(M(f)?f[f.length-1]:f).prototype,l=Object.create(h||null),n&&e(g,n,l,m||f.name),S(function(){var a=d.invoke(f,l,g,m);a!==l&&(J(a)||D(a))&&(l=a,n&&e(g,n,l,m||f.name));return l},{instance:l,identifier:n});l=d.instantiate(f,g,m);n&&e(g,n,l,m||f.name);return l}}]}function ef(){this.$get=["$window",function(a){return H(a.document)}]}function ff(){this.$get=["$log",function(a){return function(b,
d){a.error.apply(a,arguments)}}]}function $b(a){return J(a)?fa(a)?a.toISOString():db(a):a}function lf(){this.$get=function(){return function(a){if(!a)return"";var b=[];pc(a,function(a,c){null===a||z(a)||(M(a)?q(a,function(a){b.push(ja(c)+"="+ja($b(a)))}):b.push(ja(c)+"="+ja($b(a))))});return b.join("&")}}}function mf(){this.$get=function(){return function(a){function b(a,e,f){null===a||z(a)||(M(a)?q(a,function(a,c){b(a,e+"["+(J(a)?c:"")+"]")}):J(a)&&!fa(a)?pc(a,function(a,c){b(a,e+(f?"":"[")+c+(f?
"":"]"))}):d.push(ja(e)+"="+ja($b(a))))}if(!a)return"";var d=[];b(a,"",!0);return d.join("&")}}}function ac(a,b){if(y(a)){var d=a.replace($f,"").trim();if(d){var c=b("Content-Type");(c=c&&0===c.indexOf(bd))||(c=(c=d.match(ag))&&bg[c[0]].test(d));c&&(a=uc(d))}}return a}function cd(a){var b=V(),d;y(a)?q(a.split("\n"),function(a){d=a.indexOf(":");var e=N(W(a.substr(0,d)));a=W(a.substr(d+1));e&&(b[e]=b[e]?b[e]+", "+a:a)}):J(a)&&q(a,function(a,d){var f=N(d),g=W(a);f&&(b[f]=b[f]?b[f]+", "+g:g)});return b}
function dd(a){var b;return function(d){b||(b=cd(a));return d?(d=b[N(d)],void 0===d&&(d=null),d):b}}function ed(a,b,d,c){if(D(c))return c(a,b,d);q(c,function(c){a=c(a,b,d)});return a}function kf(){var a=this.defaults={transformResponse:[ac],transformRequest:[function(a){return J(a)&&"[object File]"!==ka.call(a)&&"[object Blob]"!==ka.call(a)&&"[object FormData]"!==ka.call(a)?db(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ia(bc),put:ia(bc),patch:ia(bc)},xsrfCookieName:"XSRF-TOKEN",
xsrfHeaderName:"X-XSRF-TOKEN",paramSerializer:"$httpParamSerializer"},b=!1;this.useApplyAsync=function(a){return A(a)?(b=!!a,this):b};var d=!0;this.useLegacyPromiseExtensions=function(a){return A(a)?(d=!!a,this):d};var c=this.interceptors=[];this.$get=["$httpBackend","$$cookieReader","$cacheFactory","$rootScope","$q","$injector",function(e,f,g,h,k,l){function m(b){function c(a){var b=S({},a);b.data=ed(a.data,a.headers,a.status,f.transformResponse);a=a.status;return 200<=a&&300>a?b:k.reject(b)}function e(a,
b){var c,d={};q(a,function(a,e){D(a)?(c=a(b),null!=c&&(d[e]=c)):d[e]=a});return d}if(!J(b))throw O("$http")("badreq",b);if(!y(b.url))throw O("$http")("badreq",b.url);var f=S({method:"get",transformRequest:a.transformRequest,transformResponse:a.transformResponse,paramSerializer:a.paramSerializer},b);f.headers=function(b){var c=a.headers,d=S({},b.headers),f,g,h,c=S({},c.common,c[N(b.method)]);a:for(f in c){g=N(f);for(h in d)if(N(h)===g)continue a;d[f]=c[f]}return e(d,ia(b))}(b);f.method=vb(f.method);
f.paramSerializer=y(f.paramSerializer)?l.get(f.paramSerializer):f.paramSerializer;var g=[function(b){var d=b.headers,e=ed(b.data,dd(d),u,b.transformRequest);z(e)&&q(d,function(a,b){"content-type"===N(b)&&delete d[b]});z(b.withCredentials)&&!z(a.withCredentials)&&(b.withCredentials=a.withCredentials);return n(b,e).then(c,c)},u],h=k.when(f);for(q(L,function(a){(a.request||a.requestError)&&g.unshift(a.request,a.requestError);(a.response||a.responseError)&&g.push(a.response,a.responseError)});g.length;){b=
g.shift();var m=g.shift(),h=h.then(b,m)}d?(h.success=function(a){Sa(a,"fn");h.then(function(b){a(b.data,b.status,b.headers,f)});return h},h.error=function(a){Sa(a,"fn");h.then(null,function(b){a(b.data,b.status,b.headers,f)});return h}):(h.success=fd("success"),h.error=fd("error"));return h}function n(c,d){function g(a,c,d,e){function f(){l(c,a,d,e)}K&&(200<=a&&300>a?K.put(L,[a,c,cd(d),e]):K.remove(L));b?h.$applyAsync(f):(f(),h.$$phase||h.$apply())}function l(a,b,d,e){b=-1<=b?b:0;(200<=b&&300>b?G.resolve:
G.reject)({data:a,status:b,headers:dd(d),config:c,statusText:e})}function n(a){l(a.data,a.status,ia(a.headers()),a.statusText)}function t(){var a=m.pendingRequests.indexOf(c);-1!==a&&m.pendingRequests.splice(a,1)}var G=k.defer(),C=G.promise,K,I,qa=c.headers,L=p(c.url,c.paramSerializer(c.params));m.pendingRequests.push(c);C.then(t,t);!c.cache&&!a.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(K=J(c.cache)?c.cache:J(a.cache)?a.cache:F);K&&(I=K.get(L),A(I)?I&&D(I.then)?I.then(n,n):M(I)?
l(I[1],I[0],ia(I[2]),I[3]):l(I,200,{},"OK"):K.put(L,C));z(I)&&((I=gd(c.url)?f()[c.xsrfCookieName||a.xsrfCookieName]:u)&&(qa[c.xsrfHeaderName||a.xsrfHeaderName]=I),e(c.method,L,d,g,qa,c.timeout,c.withCredentials,c.responseType));return C}function p(a,b){0<b.length&&(a+=(-1==a.indexOf("?")?"?":"&")+b);return a}var F=g("$http");a.paramSerializer=y(a.paramSerializer)?l.get(a.paramSerializer):a.paramSerializer;var L=[];q(c,function(a){L.unshift(y(a)?l.get(a):l.invoke(a))});m.pendingRequests=[];(function(a){q(arguments,
function(a){m[a]=function(b,c){return m(S({},c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){q(arguments,function(a){m[a]=function(b,c,d){return m(S({},d||{},{method:a,url:b,data:c}))}})})("post","put","patch");m.defaults=a;return m}]}function of(){this.$get=function(){return function(){return new T.XMLHttpRequest}}}function nf(){this.$get=["$browser","$window","$document","$xhrFactory",function(a,b,d,c){return cg(a,c,a.defer,b.angular.callbacks,d[0])}]}function cg(a,b,d,
c,e){function f(a,b,d){var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m,!1);f.removeEventListener("error",m,!1);e.body.removeChild(f);f=null;var g=-1,F="unknown";a&&("load"!==a.type||c[b].called||(a={type:"error"}),F=a.type,g="error"===a.type?404:200);d&&d(g,F)};f.addEventListener("load",m,!1);f.addEventListener("error",m,!1);e.body.appendChild(f);return m}return function(e,h,k,l,m,n,p,F){function L(){w&&w();v&&v.abort()}
function x(b,c,e,f,g){A(t)&&d.cancel(t);w=v=null;b(c,e,f,g);a.$$completeOutstandingRequest(E)}a.$$incOutstandingRequestCount();h=h||a.url();if("jsonp"==N(e)){var r="_"+(c.counter++).toString(36);c[r]=function(a){c[r].data=a;c[r].called=!0};var w=f(h.replace("JSON_CALLBACK","angular.callbacks."+r),r,function(a,b){x(l,a,c[r].data,"",b);c[r]=E})}else{var v=b(e,h);v.open(e,h,!0);q(m,function(a,b){A(a)&&v.setRequestHeader(b,a)});v.onload=function(){var a=v.statusText||"",b="response"in v?v.response:v.responseText,
c=1223===v.status?204:v.status;0===c&&(c=b?200:"file"==sa(h).protocol?404:0);x(l,c,b,v.getAllResponseHeaders(),a)};e=function(){x(l,-1,null,null,"")};v.onerror=e;v.onabort=e;p&&(v.withCredentials=!0);if(F)try{v.responseType=F}catch(Q){if("json"!==F)throw Q;}v.send(z(k)?null:k)}if(0<n)var t=d(L,n);else n&&D(n.then)&&n.then(L)}}function hf(){var a="{{",b="}}";this.startSymbol=function(b){return b?(a=b,this):a};this.endSymbol=function(a){return a?(b=a,this):b};this.$get=["$parse","$exceptionHandler",
"$sce",function(d,c,e){function f(a){return"\\\\\\"+a}function g(c){return c.replace(n,a).replace(p,b)}function h(a,b,c,d){var e;return e=a.$watch(function(a){e();return d(a)},b,c)}function k(f,k,n,r){function p(a){try{var b=a;a=n?e.getTrusted(n,b):e.valueOf(b);var d;if(r&&!A(a))d=a;else if(null==a)d="";else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=db(a)}d=a}return d}catch(g){c(La.interr(f,g))}}if(!f.length||-1===f.indexOf(a)){var v;k||(k=g(f),v=da(k),v.exp=f,v.expressions=
[],v.$$watchDelegate=h);return v}r=!!r;var q,t,G=0,C=[],K=[];v=f.length;for(var I=[],qa=[];G<v;)if(-1!=(q=f.indexOf(a,G))&&-1!=(t=f.indexOf(b,q+l)))G!==q&&I.push(g(f.substring(G,q))),G=f.substring(q+l,t),C.push(G),K.push(d(G,p)),G=t+m,qa.push(I.length),I.push("");else{G!==v&&I.push(g(f.substring(G)));break}n&&1<I.length&&La.throwNoconcat(f);if(!k||C.length){var Ca=function(a){for(var b=0,c=C.length;b<c;b++){if(r&&z(a[b]))return;I[qa[b]]=a[b]}return I.join("")};return S(function(a){var b=0,d=C.length,
e=Array(d);try{for(;b<d;b++)e[b]=K[b](a);return Ca(e)}catch(g){c(La.interr(f,g))}},{exp:f,expressions:C,$$watchDelegate:function(a,b){var c;return a.$watchGroup(K,function(d,e){var f=Ca(d);D(b)&&b.call(this,f,d!==e?c:f,a);c=f})}})}}var l=a.length,m=b.length,n=new RegExp(a.replace(/./g,f),"g"),p=new RegExp(b.replace(/./g,f),"g");k.startSymbol=function(){return a};k.endSymbol=function(){return b};return k}]}function jf(){this.$get=["$rootScope","$window","$q","$$q","$browser",function(a,b,d,c,e){function f(f,
k,l,m){function n(){p?f.apply(null,F):f(r)}var p=4<arguments.length,F=p?Aa.call(arguments,4):[],q=b.setInterval,x=b.clearInterval,r=0,w=A(m)&&!m,v=(w?c:d).defer(),Q=v.promise;l=A(l)?l:0;Q.$$intervalId=q(function(){w?e.defer(n):a.$evalAsync(n);v.notify(r++);0<l&&r>=l&&(v.resolve(r),x(Q.$$intervalId),delete g[Q.$$intervalId]);w||a.$apply()},k);g[Q.$$intervalId]=v;return Q}var g={};f.cancel=function(a){return a&&a.$$intervalId in g?(g[a.$$intervalId].reject("canceled"),b.clearInterval(a.$$intervalId),
delete g[a.$$intervalId],!0):!1};return f}]}function cc(a){a=a.split("/");for(var b=a.length;b--;)a[b]=rb(a[b]);return a.join("/")}function hd(a,b){var d=sa(a);b.$$protocol=d.protocol;b.$$host=d.hostname;b.$$port=Y(d.port)||dg[d.protocol]||null}function id(a,b){var d="/"!==a.charAt(0);d&&(a="/"+a);var c=sa(a);b.$$path=decodeURIComponent(d&&"/"===c.pathname.charAt(0)?c.pathname.substring(1):c.pathname);b.$$search=xc(c.search);b.$$hash=decodeURIComponent(c.hash);b.$$path&&"/"!=b.$$path.charAt(0)&&(b.$$path=
"/"+b.$$path)}function la(a,b){if(0===b.indexOf(a))return b.substr(a.length)}function Ka(a){var b=a.indexOf("#");return-1==b?a:a.substr(0,b)}function kb(a){return a.replace(/(#.+)|#$/,"$1")}function dc(a,b,d){this.$$html5=!0;d=d||"";hd(a,this);this.$$parse=function(a){var d=la(b,a);if(!y(d))throw Fb("ipthprfx",a,b);id(d,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Sb(this.$$search),d=this.$$hash?"#"+rb(this.$$hash):"";this.$$url=cc(this.$$path)+(a?"?"+a:"")+
d;this.$$absUrl=b+this.$$url.substr(1)};this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;A(f=la(a,c))?(g=f,g=A(f=la(d,f))?b+(la("/",f)||f):a+g):A(f=la(b,c))?g=b+f:b==c+"/"&&(g=b);g&&this.$$parse(g);return!!g}}function ec(a,b,d){hd(a,this);this.$$parse=function(c){var e=la(a,c)||la(b,c),f;z(e)||"#"!==e.charAt(0)?this.$$html5?f=e:(f="",z(e)&&(a=c,this.replace())):(f=la(d,e),z(f)&&(f=e));id(f,this);c=this.$$path;var e=a,g=/^\/[A-Z]:(\/.*)/;0===f.indexOf(e)&&
(f=f.replace(e,""));g.exec(f)||(c=(f=g.exec(c))?f[1]:c);this.$$path=c;this.$$compose()};this.$$compose=function(){var b=Sb(this.$$search),e=this.$$hash?"#"+rb(this.$$hash):"";this.$$url=cc(this.$$path)+(b?"?"+b:"")+e;this.$$absUrl=a+(this.$$url?d+this.$$url:"")};this.$$parseLinkUrl=function(b,d){return Ka(a)==Ka(b)?(this.$$parse(b),!0):!1}}function jd(a,b,d){this.$$html5=!0;ec.apply(this,arguments);this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;a==Ka(c)?
f=c:(g=la(b,c))?f=a+d+g:b===c+"/"&&(f=b);f&&this.$$parse(f);return!!f};this.$$compose=function(){var b=Sb(this.$$search),e=this.$$hash?"#"+rb(this.$$hash):"";this.$$url=cc(this.$$path)+(b?"?"+b:"")+e;this.$$absUrl=a+d+this.$$url}}function Gb(a){return function(){return this[a]}}function kd(a,b){return function(d){if(z(d))return this[a];this[a]=b(d);this.$$compose();return this}}function pf(){var a="",b={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(b){return A(b)?(a=b,this):
a};this.html5Mode=function(a){return Oa(a)?(b.enabled=a,this):J(a)?(Oa(a.enabled)&&(b.enabled=a.enabled),Oa(a.requireBase)&&(b.requireBase=a.requireBase),Oa(a.rewriteLinks)&&(b.rewriteLinks=a.rewriteLinks),this):b};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(d,c,e,f,g){function h(a,b,d){var e=l.url(),f=l.$$state;try{c.url(a,b,d),l.$$state=c.state()}catch(g){throw l.url(e),l.$$state=f,g;}}function k(a,b){d.$broadcast("$locationChangeSuccess",l.absUrl(),a,l.$$state,
b)}var l,m;m=c.baseHref();var n=c.url(),p;if(b.enabled){if(!m&&b.requireBase)throw Fb("nobase");p=n.substring(0,n.indexOf("/",n.indexOf("//")+2))+(m||"/");m=e.history?dc:jd}else p=Ka(n),m=ec;var F=p.substr(0,Ka(p).lastIndexOf("/")+1);l=new m(p,F,"#"+a);l.$$parseLinkUrl(n,n);l.$$state=c.state();var q=/^\s*(javascript|mailto):/i;f.on("click",function(a){if(b.rewriteLinks&&!a.ctrlKey&&!a.metaKey&&!a.shiftKey&&2!=a.which&&2!=a.button){for(var e=H(a.target);"a"!==oa(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;
var h=e.prop("href"),k=e.attr("href")||e.attr("xlink:href");J(h)&&"[object SVGAnimatedString]"===h.toString()&&(h=sa(h.animVal).href);q.test(h)||!h||e.attr("target")||a.isDefaultPrevented()||!l.$$parseLinkUrl(h,k)||(a.preventDefault(),l.absUrl()!=c.url()&&(d.$apply(),g.angular["ff-684208-preventDefault"]=!0))}});kb(l.absUrl())!=kb(n)&&c.url(l.absUrl(),!0);var x=!0;c.onUrlChange(function(a,b){z(la(F,a))?g.location.href=a:(d.$evalAsync(function(){var c=l.absUrl(),e=l.$$state,f;a=kb(a);l.$$parse(a);
l.$$state=b;f=d.$broadcast("$locationChangeStart",a,c,b,e).defaultPrevented;l.absUrl()===a&&(f?(l.$$parse(c),l.$$state=e,h(c,!1,e)):(x=!1,k(c,e)))}),d.$$phase||d.$digest())});d.$watch(function(){var a=kb(c.url()),b=kb(l.absUrl()),f=c.state(),g=l.$$replace,m=a!==b||l.$$html5&&e.history&&f!==l.$$state;if(x||m)x=!1,d.$evalAsync(function(){var b=l.absUrl(),c=d.$broadcast("$locationChangeStart",b,a,l.$$state,f).defaultPrevented;l.absUrl()===b&&(c?(l.$$parse(a),l.$$state=f):(m&&h(b,g,f===l.$$state?null:
l.$$state),k(a,f)))});l.$$replace=!1});return l}]}function qf(){var a=!0,b=this;this.debugEnabled=function(b){return A(b)?(a=b,this):a};this.$get=["$window",function(d){function c(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=d.console||{},e=b[a]||b.log||E;a=!1;try{a=!!e.apply}catch(k){}return a?function(){var a=[];q(arguments,function(b){a.push(c(b))});
return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){a&&c.apply(b,arguments)}}()}}]}function Wa(a,b){if("__defineGetter__"===a||"__defineSetter__"===a||"__lookupGetter__"===a||"__lookupSetter__"===a||"__proto__"===a)throw ca("isecfld",b);return a}function eg(a){return a+""}function ta(a,b){if(a){if(a.constructor===a)throw ca("isecfn",b);if(a.window===a)throw ca("isecwindow",b);if(a.children&&
(a.nodeName||a.prop&&a.attr&&a.find))throw ca("isecdom",b);if(a===Object)throw ca("isecobj",b);}return a}function ld(a,b){if(a){if(a.constructor===a)throw ca("isecfn",b);if(a===fg||a===gg||a===hg)throw ca("isecff",b);}}function Hb(a,b){if(a&&(a===(0).constructor||a===(!1).constructor||a==="".constructor||a==={}.constructor||a===[].constructor||a===Function.constructor))throw ca("isecaf",b);}function ig(a,b){return"undefined"!==typeof a?a:b}function md(a,b){return"undefined"===typeof a?b:"undefined"===
typeof b?a:a+b}function aa(a,b){var d,c;switch(a.type){case s.Program:d=!0;q(a.body,function(a){aa(a.expression,b);d=d&&a.expression.constant});a.constant=d;break;case s.Literal:a.constant=!0;a.toWatch=[];break;case s.UnaryExpression:aa(a.argument,b);a.constant=a.argument.constant;a.toWatch=a.argument.toWatch;break;case s.BinaryExpression:aa(a.left,b);aa(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.left.toWatch.concat(a.right.toWatch);break;case s.LogicalExpression:aa(a.left,
b);aa(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.constant?[]:[a];break;case s.ConditionalExpression:aa(a.test,b);aa(a.alternate,b);aa(a.consequent,b);a.constant=a.test.constant&&a.alternate.constant&&a.consequent.constant;a.toWatch=a.constant?[]:[a];break;case s.Identifier:a.constant=!1;a.toWatch=[a];break;case s.MemberExpression:aa(a.object,b);a.computed&&aa(a.property,b);a.constant=a.object.constant&&(!a.computed||a.property.constant);a.toWatch=[a];break;case s.CallExpression:d=
a.filter?!b(a.callee.name).$stateful:!1;c=[];q(a.arguments,function(a){aa(a,b);d=d&&a.constant;a.constant||c.push.apply(c,a.toWatch)});a.constant=d;a.toWatch=a.filter&&!b(a.callee.name).$stateful?c:[a];break;case s.AssignmentExpression:aa(a.left,b);aa(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=[a];break;case s.ArrayExpression:d=!0;c=[];q(a.elements,function(a){aa(a,b);d=d&&a.constant;a.constant||c.push.apply(c,a.toWatch)});a.constant=d;a.toWatch=c;break;case s.ObjectExpression:d=
!0;c=[];q(a.properties,function(a){aa(a.value,b);d=d&&a.value.constant;a.value.constant||c.push.apply(c,a.value.toWatch)});a.constant=d;a.toWatch=c;break;case s.ThisExpression:a.constant=!1;a.toWatch=[];break;case s.LocalsExpression:a.constant=!1,a.toWatch=[]}}function nd(a){if(1==a.length){a=a[0].expression;var b=a.toWatch;return 1!==b.length?b:b[0]!==a?b:u}}function od(a){return a.type===s.Identifier||a.type===s.MemberExpression}function pd(a){if(1===a.body.length&&od(a.body[0].expression))return{type:s.AssignmentExpression,
left:a.body[0].expression,right:{type:s.NGValueParameter},operator:"="}}function qd(a){return 0===a.body.length||1===a.body.length&&(a.body[0].expression.type===s.Literal||a.body[0].expression.type===s.ArrayExpression||a.body[0].expression.type===s.ObjectExpression)}function rd(a,b){this.astBuilder=a;this.$filter=b}function sd(a,b){this.astBuilder=a;this.$filter=b}function Ib(a){return"constructor"==a}function fc(a){return D(a.valueOf)?a.valueOf():jg.call(a)}function rf(){var a=V(),b=V(),d={"true":!0,
"false":!1,"null":null,undefined:u};this.addLiteral=function(a,b){d[a]=b};this.$get=["$filter",function(c){function e(d,e,g){var p,t,G;g=g||x;switch(typeof d){case "string":G=d=d.trim();var C=g?b:a;p=C[G];if(!p){":"===d.charAt(0)&&":"===d.charAt(1)&&(t=!0,d=d.substring(2));p=g?L:F;var K=new gc(p);p=(new hc(K,c,p)).parse(d);p.constant?p.$$watchDelegate=m:t?p.$$watchDelegate=p.literal?l:k:p.inputs&&(p.$$watchDelegate=h);g&&(p=f(p));C[G]=p}return n(p,e);case "function":return n(d,e);default:return n(E,
e)}}function f(a){function b(c,d,e,f){var g=x;x=!0;try{return a(c,d,e,f)}finally{x=g}}if(!a)return a;b.$$watchDelegate=a.$$watchDelegate;b.assign=f(a.assign);b.constant=a.constant;b.literal=a.literal;for(var c=0;a.inputs&&c<a.inputs.length;++c)a.inputs[c]=f(a.inputs[c]);b.inputs=a.inputs;return b}function g(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=fc(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function h(a,b,c,d,e){var f=d.inputs,h;if(1===f.length){var k=g,f=f[0];return a.$watch(function(a){var b=
f(a);g(b,k)||(h=d(a,u,u,[b]),k=b&&fc(b));return h},b,c,e)}for(var l=[],m=[],n=0,p=f.length;n<p;n++)l[n]=g,m[n]=null;return a.$watch(function(a){for(var b=!1,c=0,e=f.length;c<e;c++){var k=f[c](a);if(b||(b=!g(k,l[c])))m[c]=k,l[c]=k&&fc(k)}b&&(h=d(a,u,u,m));return h},b,c,e)}function k(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;D(b)&&b.apply(this,arguments);A(a)&&d.$$postDigest(function(){A(f)&&e()})},c)}function l(a,b,c,d){function e(a){var b=!0;q(a,function(a){A(a)||
(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,c,d){g=a;D(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function m(a,b,c,d){var e;return e=a.$watch(function(a){e();return d(a)},b,c)}function n(a,b){if(!b)return a;var c=a.$$watchDelegate,d=!1,c=c!==l&&c!==k?function(c,e,f,g){f=d&&g?g[0]:a(c,e,f,g);return b(f,c,e)}:function(c,d,e,f){e=a(c,d,e,f);c=b(e,c,d);return A(e)?c:e};a.$$watchDelegate&&a.$$watchDelegate!==h?c.$$watchDelegate=a.$$watchDelegate:
b.$stateful||(c.$$watchDelegate=h,d=!a.inputs,c.inputs=a.inputs?a.inputs:[a]);return c}var p=Ga().noUnsafeEval,F={csp:p,expensiveChecks:!1,literals:pa(d)},L={csp:p,expensiveChecks:!0,literals:pa(d)},x=!1;e.$$runningExpensiveChecks=function(){return x};return e}]}function tf(){this.$get=["$rootScope","$exceptionHandler",function(a,b){return td(function(b){a.$evalAsync(b)},b)}]}function uf(){this.$get=["$browser","$exceptionHandler",function(a,b){return td(function(b){a.defer(b)},b)}]}function td(a,
b){function d(){this.$$state={status:0}}function c(a,b){return function(c){b.call(a,c)}}function e(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,a(function(){var a,d,e;e=c.pending;c.processScheduled=!1;c.pending=u;for(var f=0,g=e.length;f<g;++f){d=e[f][0];a=e[f][c.status];try{D(a)?d.resolve(a(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),b(h)}}}))}function f(){this.promise=new d}var g=O("$q",TypeError);S(d.prototype,{then:function(a,b,c){if(z(a)&&z(b)&&
z(c))return this;var d=new f;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&e(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return k(b,!0,a)},function(b){return k(b,!1,a)},b)}});S(f.prototype,{resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(g("qcycle",a)):this.$$resolve(a))},$$resolve:function(a){function d(a){k||(k=!0,h.$$resolve(a))}
function f(a){k||(k=!0,h.$$reject(a))}var g,h=this,k=!1;try{if(J(a)||D(a))g=a&&a.then;D(g)?(this.promise.$$state.status=-1,g.call(a,d,f,c(this,this.notify))):(this.promise.$$state.value=a,this.promise.$$state.status=1,e(this.promise.$$state))}catch(l){f(l),b(l)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;e(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&
d&&d.length&&a(function(){for(var a,e,f=0,g=d.length;f<g;f++){e=d[f][0];a=d[f][3];try{e.notify(D(a)?a(c):c)}catch(h){b(h)}}})}});var h=function(a,b){var c=new f;b?c.resolve(a):c.reject(a);return c.promise},k=function(a,b,c){var d=null;try{D(c)&&(d=c())}catch(e){return h(e,!1)}return d&&D(d.then)?d.then(function(){return h(a,b)},function(a){return h(a,!1)}):h(a,b)},l=function(a,b,c,d){var e=new f;e.resolve(a);return e.promise.then(b,c,d)},m=function(a){if(!D(a))throw g("norslvr",a);var b=new f;a(function(a){b.resolve(a)},
function(a){b.reject(a)});return b.promise};m.prototype=d.prototype;m.defer=function(){var a=new f;a.resolve=c(a,a.resolve);a.reject=c(a,a.reject);a.notify=c(a,a.notify);return a};m.reject=function(a){var b=new f;b.reject(a);return b.promise};m.when=l;m.resolve=l;m.all=function(a){var b=new f,c=0,d=M(a)?[]:{};q(a,function(a,e){c++;l(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return m}function Df(){this.$get=
["$window","$timeout",function(a,b){var d=a.requestAnimationFrame||a.webkitRequestAnimationFrame,c=a.cancelAnimationFrame||a.webkitCancelAnimationFrame||a.webkitCancelRequestAnimationFrame,e=!!d,f=e?function(a){var b=d(a);return function(){c(b)}}:function(a){var c=b(a,16.66,!1);return function(){b.cancel(c)}};f.supported=e;return f}]}function sf(){function a(a){function b(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=
0;this.$id=++qb;this.$$ChildScope=null}b.prototype=a;return b}var b=10,d=O("$rootScope"),c=null,e=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$exceptionHandler","$parse","$browser",function(f,g,h){function k(a){a.currentScope.$$destroyed=!0}function l(a){9===Da&&(a.$$childHead&&l(a.$$childHead),a.$$nextSibling&&l(a.$$nextSibling));a.$parent=a.$$nextSibling=a.$$prevSibling=a.$$childHead=a.$$childTail=a.$root=a.$$watchers=null}function m(){this.$id=++qb;this.$$phase=
this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$$isolateBindings=null}function n(a){if(w.$$phase)throw d("inprog",w.$$phase);w.$$phase=a}function p(a,b){do a.$$watchersCount+=b;while(a=a.$parent)}function F(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function s(){}function x(){for(;t.length;)try{t.shift()()}catch(a){f(a)}e=
null}function r(){null===e&&(e=h.defer(function(){w.$apply(x)}))}m.prototype={constructor:m,$new:function(b,c){var d;c=c||this;b?(d=new m,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=a(this)),d=new this.$$ChildScope);d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d;(b||c!=this)&&d.$on("$destroy",k);return d},$watch:function(a,b,d,e){var f=g(a);if(f.$$watchDelegate)return f.$$watchDelegate(this,b,d,f,
a);var h=this,k=h.$$watchers,l={fn:b,last:s,get:f,exp:e||a,eq:!!d};c=null;D(b)||(l.fn=E);k||(k=h.$$watchers=[]);k.unshift(l);p(this,1);return function(){0<=bb(k,l)&&p(h,-1);c=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});q(a,function(a,
b){var k=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(k)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!z(e)){if(J(e))if(za(e))for(f!==n&&(f=n,v=f.length=0,l++),a=e.length,v!==a&&(l++,f.length=v=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==p&&(f=p={},v=0,l++);a=0;for(b in e)va.call(e,b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(v++,f[b]=g,l++));if(v>
a)for(b in l++,f)va.call(e,b)||(v--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,h,k=1<b.length,l=0,m=g(a,c),n=[],p={},r=!0,v=0;return this.$watch(m,function(){r?(r=!1,b(e,e,d)):b(e,h,d);if(k)if(J(e))if(za(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)va.call(e,a)&&(h[a]=e[a]);else h=e})},$digest:function(){var a,g,k,l,m,p,r,q,t=b,F,A=[],z,y;n("$digest");h.$$checkUrlChange();this===w&&null!==e&&(h.defer.cancel(e),x());c=null;do{q=!1;
for(F=this;v.length;){try{y=v.shift(),y.scope.$eval(y.expression,y.locals)}catch(E){f(E)}c=null}a:do{if(p=F.$$watchers)for(r=p.length;r--;)try{if(a=p[r])if(m=a.get,(g=m(F))!==(k=a.last)&&!(a.eq?na(g,k):"number"===typeof g&&"number"===typeof k&&isNaN(g)&&isNaN(k)))q=!0,c=a,a.last=a.eq?pa(g,null):g,l=a.fn,l(g,k===s?g:k,F),5>t&&(z=4-t,A[z]||(A[z]=[]),A[z].push({msg:D(a.exp)?"fn: "+(a.exp.name||a.exp.toString()):a.exp,newVal:g,oldVal:k}));else if(a===c){q=!1;break a}}catch(H){f(H)}if(!(p=F.$$watchersCount&&
F.$$childHead||F!==this&&F.$$nextSibling))for(;F!==this&&!(p=F.$$nextSibling);)F=F.$parent}while(F=p);if((q||v.length)&&!t--)throw w.$$phase=null,d("infdig",b,A);}while(q||v.length);for(w.$$phase=null;u.length;)try{u.shift()()}catch(J){f(J)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this===w&&h.$$applicationDestroyed();p(this,-this.$$watchersCount);for(var b in this.$$listenerCount)F(this,this.$$listenerCount[b],b);a&&a.$$childHead==
this&&(a.$$childHead=this.$$nextSibling);a&&a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=E;this.$on=this.$watch=this.$watchGroup=function(){return E};this.$$listeners={};this.$$nextSibling=null;l(this)}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a,b){w.$$phase||
v.length||h.defer(function(){v.length&&w.$digest()});v.push({scope:this,expression:g(a),locals:b})},$$postDigest:function(a){u.push(a)},$apply:function(a){try{n("$apply");try{return this.$eval(a)}finally{w.$$phase=null}}catch(b){f(b)}finally{try{w.$digest()}catch(c){throw f(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&t.push(b);a=g(a);r()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=
0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,F(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,g=!1,h={name:a,targetScope:e,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=cb([h],arguments,1),l,m;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,k)}catch(n){f(n)}else d.splice(l,1),l--,m--;if(g)return h.currentScope=null,h;e=e.$parent}while(e);
h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var g=cb([e],arguments,1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,g)}catch(l){f(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=
null;return e}};var w=new m,v=w.$$asyncQueue=[],u=w.$$postDigestQueue=[],t=w.$$applyAsyncQueue=[];return w}]}function le(){var a=/^\s*(https?|ftp|mailto|tel|file):/,b=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(b){return A(b)?(a=b,this):a};this.imgSrcSanitizationWhitelist=function(a){return A(a)?(b=a,this):b};this.$get=function(){return function(d,c){var e=c?b:a,f;f=sa(d).href;return""===f||f.match(e)?d:"unsafe:"+f}}}function kg(a){if("self"===a)return a;
if(y(a)){if(-1<a.indexOf("***"))throw ua("iwcard",a);a=ud(a).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+a+"$")}if(Za(a))return new RegExp("^"+a.source+"$");throw ua("imatcher");}function vd(a){var b=[];A(a)&&q(a,function(a){b.push(kg(a))});return b}function wf(){this.SCE_CONTEXTS=ma;var a=["self"],b=[];this.resourceUrlWhitelist=function(b){arguments.length&&(a=vd(b));return a};this.resourceUrlBlacklist=function(a){arguments.length&&(b=vd(a));return b};this.$get=["$injector",
function(d){function c(a,b){return"self"===a?gd(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw ua("unsafe");};d.has("$sanitize")&&(f=d.get("$sanitize"));var g=e(),h={};h[ma.HTML]=e(g);h[ma.CSS]=e(g);h[ma.URL]=e(g);h[ma.JS]=e(g);h[ma.RESOURCE_URL]=
e(h[ma.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw ua("icontext",a,b);if(null===b||z(b)||""===b)return b;if("string"!==typeof b)throw ua("itype",a);return new c(b)},getTrusted:function(d,e){if(null===e||z(e)||""===e)return e;var g=h.hasOwnProperty(d)?h[d]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(d===ma.RESOURCE_URL){var g=sa(e.toString()),n,p,q=!1;n=0;for(p=a.length;n<p;n++)if(c(a[n],g)){q=!0;break}if(q)for(n=0,p=b.length;n<p;n++)if(c(b[n],
g)){q=!1;break}if(q)return e;throw ua("insecurl",e.toString());}if(d===ma.HTML)return f(e);throw ua("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function vf(){var a=!0;this.enabled=function(b){arguments.length&&(a=!!b);return a};this.$get=["$parse","$sceDelegate",function(b,d){if(a&&8>Da)throw ua("iequirks");var c=ia(ma);c.isEnabled=function(){return a};c.trustAs=d.trustAs;c.getTrusted=d.getTrusted;c.valueOf=d.valueOf;a||(c.trustAs=c.getTrusted=function(a,b){return b},
c.valueOf=$a);c.parseAs=function(a,d){var e=b(d);return e.literal&&e.constant?e:b(d,function(b){return c.getTrusted(a,b)})};var e=c.parseAs,f=c.getTrusted,g=c.trustAs;q(ma,function(a,b){var d=N(b);c[fb("parse_as_"+d)]=function(b){return e(a,b)};c[fb("get_trusted_"+d)]=function(b){return f(a,b)};c[fb("trust_as_"+d)]=function(b){return g(a,b)}});return c}]}function xf(){this.$get=["$window","$document",function(a,b){var d={},c=!(a.chrome&&a.chrome.app&&a.chrome.app.runtime)&&a.history&&a.history.pushState,
e=Y((/android (\d+)/.exec(N((a.navigator||{}).userAgent))||[])[1]),f=/Boxee/i.test((a.navigator||{}).userAgent),g=b[0]||{},h,k=/^(Moz|webkit|ms)(?=[A-Z])/,l=g.body&&g.body.style,m=!1,n=!1;if(l){for(var p in l)if(m=k.exec(p)){h=m[0];h=h.substr(0,1).toUpperCase()+h.substr(1);break}h||(h="WebkitOpacity"in l&&"webkit");m=!!("transition"in l||h+"Transition"in l);n=!!("animation"in l||h+"Animation"in l);!e||m&&n||(m=y(l.webkitTransition),n=y(l.webkitAnimation))}return{history:!(!c||4>e||f),hasEvent:function(a){if("input"===
a&&11>=Da)return!1;if(z(d[a])){var b=g.createElement("div");d[a]="on"+a in b}return d[a]},csp:Ga(),vendorPrefix:h,transitions:m,animations:n,android:e}}]}function zf(){var a;this.httpOptions=function(b){return b?(a=b,this):a};this.$get=["$templateCache","$http","$q","$sce",function(b,d,c,e){function f(g,h){f.totalPendingRequests++;y(g)&&b.get(g)||(g=e.getTrustedResourceUrl(g));var k=d.defaults&&d.defaults.transformResponse;M(k)?k=k.filter(function(a){return a!==ac}):k===ac&&(k=null);return d.get(g,
S({cache:b,transformResponse:k},a))["finally"](function(){f.totalPendingRequests--}).then(function(a){b.put(g,a.data);return a.data},function(a){if(!h)throw lg("tpload",g,a.status,a.statusText);return c.reject(a)})}f.totalPendingRequests=0;return f}]}function Af(){this.$get=["$rootScope","$browser","$location",function(a,b,d){return{findBindings:function(a,b,d){a=a.getElementsByClassName("ng-binding");var g=[];q(a,function(a){var c=ea.element(a).data("$binding");c&&q(c,function(c){d?(new RegExp("(^|\\s)"+
ud(b)+"(\\s|\\||$)")).test(c)&&g.push(a):-1!=c.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,d){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var k=a.querySelectorAll("["+g[h]+"model"+(d?"=":"*=")+'"'+b+'"]');if(k.length)return k}},getLocation:function(){return d.url()},setLocation:function(b){b!==d.url()&&(d.url(b),a.$digest())},whenStable:function(a){b.notifyWhenNoOutstandingRequests(a)}}}]}function Bf(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",
function(a,b,d,c,e){function f(f,k,l){D(f)||(l=k,k=f,f=E);var m=Aa.call(arguments,3),n=A(l)&&!l,p=(n?c:d).defer(),q=p.promise,s;s=b.defer(function(){try{p.resolve(f.apply(null,m))}catch(b){p.reject(b),e(b)}finally{delete g[q.$$timeoutId]}n||a.$apply()},k);q.$$timeoutId=s;g[s]=p;return q}var g={};f.cancel=function(a){return a&&a.$$timeoutId in g?(g[a.$$timeoutId].reject("canceled"),delete g[a.$$timeoutId],b.defer.cancel(a.$$timeoutId)):!1};return f}]}function sa(a){Da&&(Z.setAttribute("href",a),a=
Z.href);Z.setAttribute("href",a);return{href:Z.href,protocol:Z.protocol?Z.protocol.replace(/:$/,""):"",host:Z.host,search:Z.search?Z.search.replace(/^\?/,""):"",hash:Z.hash?Z.hash.replace(/^#/,""):"",hostname:Z.hostname,port:Z.port,pathname:"/"===Z.pathname.charAt(0)?Z.pathname:"/"+Z.pathname}}function gd(a){a=y(a)?sa(a):a;return a.protocol===wd.protocol&&a.host===wd.host}function Cf(){this.$get=da(T)}function xd(a){function b(a){try{return decodeURIComponent(a)}catch(b){return a}}var d=a[0]||{},
c={},e="";return function(){var a,g,h,k,l;a=d.cookie||"";if(a!==e)for(e=a,a=e.split("; "),c={},h=0;h<a.length;h++)g=a[h],k=g.indexOf("="),0<k&&(l=b(g.substring(0,k)),z(c[l])&&(c[l]=b(g.substring(k+1))));return c}}function Gf(){this.$get=xd}function Jc(a){function b(d,c){if(J(d)){var e={};q(d,function(a,c){e[c]=b(c,a)});return e}return a.factory(d+"Filter",c)}this.register=b;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];b("currency",yd);b("date",zd);b("filter",mg);
b("json",ng);b("limitTo",og);b("lowercase",pg);b("number",Ad);b("orderBy",Bd);b("uppercase",qg)}function mg(){return function(a,b,d){if(!za(a)){if(null==a)return a;throw O("filter")("notarray",a);}var c;switch(ic(b)){case "function":break;case "boolean":case "null":case "number":case "string":c=!0;case "object":b=rg(b,d,c);break;default:return a}return Array.prototype.filter.call(a,b)}}function rg(a,b,d){var c=J(a)&&"$"in a;!0===b?b=na:D(b)||(b=function(a,b){if(z(a))return!1;if(null===a||null===b)return a===
b;if(J(b)||J(a)&&!rc(a))return!1;a=N(""+a);b=N(""+b);return-1!==a.indexOf(b)});return function(e){return c&&!J(e)?Ma(e,a.$,b,!1):Ma(e,a,b,d)}}function Ma(a,b,d,c,e){var f=ic(a),g=ic(b);if("string"===g&&"!"===b.charAt(0))return!Ma(a,b.substring(1),d,c);if(M(a))return a.some(function(a){return Ma(a,b,d,c)});switch(f){case "object":var h;if(c){for(h in a)if("$"!==h.charAt(0)&&Ma(a[h],b,d,!0))return!0;return e?!1:Ma(a,b,d,!1)}if("object"===g){for(h in b)if(e=b[h],!D(e)&&!z(e)&&(f="$"===h,!Ma(f?a:a[h],
e,d,f,f)))return!1;return!0}return d(a,b);case "function":return!1;default:return d(a,b)}}function ic(a){return null===a?"null":typeof a}function yd(a){var b=a.NUMBER_FORMATS;return function(a,c,e){z(c)&&(c=b.CURRENCY_SYM);z(e)&&(e=b.PATTERNS[1].maxFrac);return null==a?a:Cd(a,b.PATTERNS[1],b.GROUP_SEP,b.DECIMAL_SEP,e).replace(/\u00A4/g,c)}}function Ad(a){var b=a.NUMBER_FORMATS;return function(a,c){return null==a?a:Cd(a,b.PATTERNS[0],b.GROUP_SEP,b.DECIMAL_SEP,c)}}function sg(a){var b=0,d,c,e,f,g;-1<
(c=a.indexOf(Dd))&&(a=a.replace(Dd,""));0<(e=a.search(/e/i))?(0>c&&(c=e),c+=+a.slice(e+1),a=a.substring(0,e)):0>c&&(c=a.length);for(e=0;a.charAt(e)==jc;e++);if(e==(g=a.length))d=[0],c=1;else{for(g--;a.charAt(g)==jc;)g--;c-=e;d=[];for(f=0;e<=g;e++,f++)d[f]=+a.charAt(e)}c>Ed&&(d=d.splice(0,Ed-1),b=c-1,c=1);return{d:d,e:b,i:c}}function tg(a,b,d,c){var e=a.d,f=e.length-a.i;b=z(b)?Math.min(Math.max(d,f),c):+b;d=b+a.i;c=e[d];if(0<d){e.splice(Math.max(a.i,d));for(var g=d;g<e.length;g++)e[g]=0}else for(f=
Math.max(0,f),a.i=1,e.length=Math.max(1,d=b+1),e[0]=0,g=1;g<d;g++)e[g]=0;if(5<=c)if(0>d-1){for(c=0;c>d;c--)e.unshift(0),a.i++;e.unshift(1);a.i++}else e[d-1]++;for(;f<Math.max(0,b);f++)e.push(0);if(b=e.reduceRight(function(a,b,c,d){b+=a;d[c]=b%10;return Math.floor(b/10)},0))e.unshift(b),a.i++}function Cd(a,b,d,c,e){if(!y(a)&&!R(a)||isNaN(a))return"";var f=!isFinite(a),g=!1,h=Math.abs(a)+"",k="";if(f)k="\u221e";else{g=sg(h);tg(g,e,b.minFrac,b.maxFrac);k=g.d;h=g.i;e=g.e;f=[];for(g=k.reduce(function(a,
b){return a&&!b},!0);0>h;)k.unshift(0),h++;0<h?f=k.splice(h):(f=k,k=[0]);h=[];for(k.length>=b.lgSize&&h.unshift(k.splice(-b.lgSize).join(""));k.length>b.gSize;)h.unshift(k.splice(-b.gSize).join(""));k.length&&h.unshift(k.join(""));k=h.join(d);f.length&&(k+=c+f.join(""));e&&(k+="e+"+e)}return 0>a&&!g?b.negPre+k+b.negSuf:b.posPre+k+b.posSuf}function Jb(a,b,d,c){var e="";if(0>a||c&&0>=a)c?a=-a+1:(a=-a,e="-");for(a=""+a;a.length<b;)a=jc+a;d&&(a=a.substr(a.length-b));return e+a}function X(a,b,d,c,e){d=
d||0;return function(f){f=f["get"+a]();if(0<d||f>-d)f+=d;0===f&&-12==d&&(f=12);return Jb(f,b,c,e)}}function lb(a,b,d){return function(c,e){var f=c["get"+a](),g=vb((d?"STANDALONE":"")+(b?"SHORT":"")+a);return e[g][f]}}function Fd(a){var b=(new Date(a,0,1)).getDay();return new Date(a,0,(4>=b?5:12)-b)}function Gd(a){return function(b){var d=Fd(b.getFullYear());b=+new Date(b.getFullYear(),b.getMonth(),b.getDate()+(4-b.getDay()))-+d;b=1+Math.round(b/6048E5);return Jb(b,a)}}function kc(a,b){return 0>=a.getFullYear()?
b.ERAS[0]:b.ERAS[1]}function zd(a){function b(a){var b;if(b=a.match(d)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,k=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=Y(b[9]+b[10]),g=Y(b[9]+b[11]));h.call(a,Y(b[1]),Y(b[2])-1,Y(b[3]));f=Y(b[4]||0)-f;g=Y(b[5]||0)-g;h=Y(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));k.call(a,f,g,h,b)}return a}var d=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,d,f){var g="",h=
[],k,l;d=d||"mediumDate";d=a.DATETIME_FORMATS[d]||d;y(c)&&(c=ug.test(c)?Y(c):b(c));R(c)&&(c=new Date(c));if(!fa(c)||!isFinite(c.getTime()))return c;for(;d;)(l=vg.exec(d))?(h=cb(h,l,1),d=h.pop()):(h.push(d),d=null);var m=c.getTimezoneOffset();f&&(m=vc(f,m),c=Rb(c,f,!0));q(h,function(b){k=wg[b];g+=k?k(c,a.DATETIME_FORMATS,m):"''"===b?"'":b.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function ng(){return function(a,b){z(b)&&(b=2);return db(a,b)}}function og(){return function(a,b,d){b=Infinity===
Math.abs(Number(b))?Number(b):Y(b);if(isNaN(b))return a;R(a)&&(a=a.toString());if(!M(a)&&!y(a))return a;d=!d||isNaN(d)?0:Y(d);d=0>d?Math.max(0,a.length+d):d;return 0<=b?a.slice(d,d+b):0===d?a.slice(b,a.length):a.slice(Math.max(0,d+b),d)}}function Bd(a){function b(b,d){d=d?-1:1;return b.map(function(b){var c=1,h=$a;if(D(b))h=b;else if(y(b)){if("+"==b.charAt(0)||"-"==b.charAt(0))c="-"==b.charAt(0)?-1:1,b=b.substring(1);if(""!==b&&(h=a(b),h.constant))var k=h(),h=function(a){return a[k]}}return{get:h,
descending:c*d}})}function d(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}return function(a,e,f){if(null==a)return a;if(!za(a))throw O("orderBy")("notarray",a);M(e)||(e=[e]);0===e.length&&(e=["+"]);var g=b(e,f);g.push({get:function(){return{}},descending:f?-1:1});a=Array.prototype.map.call(a,function(a,b){return{value:a,predicateValues:g.map(function(c){var e=c.get(a);c=typeof e;if(null===e)c="string",e="null";else if("string"===c)e=e.toLowerCase();else if("object"===
c)a:{if("function"===typeof e.valueOf&&(e=e.valueOf(),d(e)))break a;if(rc(e)&&(e=e.toString(),d(e)))break a;e=b}return{value:e,type:c}})}});a.sort(function(a,b){for(var c=0,d=0,e=g.length;d<e;++d){var c=a.predicateValues[d],f=b.predicateValues[d],q=0;c.type===f.type?c.value!==f.value&&(q=c.value<f.value?-1:1):q=c.type<f.type?-1:1;if(c=q*g[d].descending)break}return c});return a=a.map(function(a){return a.value})}}function Na(a){D(a)&&(a={link:a});a.restrict=a.restrict||"AC";return da(a)}function Hd(a,
b,d,c,e){var f=this,g=[];f.$error={};f.$$success={};f.$pending=u;f.$name=e(b.name||b.ngForm||"")(d);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;f.$$parentForm=Kb;f.$rollbackViewValue=function(){q(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){q(g,function(a){a.$commitViewValue()})};f.$addControl=function(a){Ta(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a);a.$$parentForm=f};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=
a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];q(f.$pending,function(b,c){f.$setValidity(c,null,a)});q(f.$error,function(b,c){f.$setValidity(c,null,a)});q(f.$$success,function(b,c){f.$setValidity(c,null,a)});bb(g,a);a.$$parentForm=Kb};Id({ctrl:this,$element:a,set:function(a,b,c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(bb(d,c),0===d.length&&delete a[b])},$animate:c});f.$setDirty=function(){c.removeClass(a,Xa);c.addClass(a,
Lb);f.$dirty=!0;f.$pristine=!1;f.$$parentForm.$setDirty()};f.$setPristine=function(){c.setClass(a,Xa,Lb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;q(g,function(a){a.$setPristine()})};f.$setUntouched=function(){q(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){c.addClass(a,"ng-submitted");f.$submitted=!0;f.$$parentForm.$setSubmitted()}}function lc(a){a.$formatters.push(function(b){return a.$isEmpty(b)?b:b.toString()})}function mb(a,b,d,c,e,f){var g=N(b[0].type);if(!e.android){var h=
!1;b.on("compositionstart",function(){h=!0});b.on("compositionend",function(){h=!1;l()})}var k,l=function(a){k&&(f.defer.cancel(k),k=null);if(!h){var e=b.val();a=a&&a.type;"password"===g||d.ngTrim&&"false"===d.ngTrim||(e=W(e));(c.$viewValue!==e||""===e&&c.$$hasNativeValidators)&&c.$setViewValue(e,a)}};if(e.hasEvent("input"))b.on("input",l);else{var m=function(a,b,c){k||(k=f.defer(function(){k=null;b&&b.value===c||l(a)}))};b.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||
m(a,this,this.value)});if(e.hasEvent("paste"))b.on("paste cut",m)}b.on("change",l);if(Jd[g]&&c.$$hasNativeValidators&&g===d.type)b.on("keydown wheel mousedown",function(a){if(!k){var b=this.validity,c=b.badInput,d=b.typeMismatch;k=f.defer(function(){k=null;b.badInput===c&&b.typeMismatch===d||l(a)})}});c.$render=function(){var a=c.$isEmpty(c.$viewValue)?"":c.$viewValue;b.val()!==a&&b.val(a)}}function Mb(a,b){return function(d,c){var e,f;if(fa(d))return d;if(y(d)){'"'==d.charAt(0)&&'"'==d.charAt(d.length-
1)&&(d=d.substring(1,d.length-1));if(xg.test(d))return new Date(d);a.lastIndex=0;if(e=a.exec(d))return e.shift(),f=c?{yyyy:c.getFullYear(),MM:c.getMonth()+1,dd:c.getDate(),HH:c.getHours(),mm:c.getMinutes(),ss:c.getSeconds(),sss:c.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},q(e,function(a,c){c<b.length&&(f[b[c]]=+a)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function nb(a,b,d,c){return function(e,f,g,h,k,l,m){function n(a){return a&&!(a.getTime&&
a.getTime()!==a.getTime())}function p(a){return A(a)&&!fa(a)?d(a)||u:a}Kd(e,f,g,h);mb(e,f,g,h,k,l);var q=h&&h.$options&&h.$options.timezone,s;h.$$parserName=a;h.$parsers.push(function(a){return h.$isEmpty(a)?null:b.test(a)?(a=d(a,s),q&&(a=Rb(a,q)),a):u});h.$formatters.push(function(a){if(a&&!fa(a))throw ob("datefmt",a);if(n(a))return(s=a)&&q&&(s=Rb(s,q,!0)),m("date")(a,c,q);s=null;return""});if(A(g.min)||g.ngMin){var x;h.$validators.min=function(a){return!n(a)||z(x)||d(a)>=x};g.$observe("min",function(a){x=
p(a);h.$validate()})}if(A(g.max)||g.ngMax){var r;h.$validators.max=function(a){return!n(a)||z(r)||d(a)<=r};g.$observe("max",function(a){r=p(a);h.$validate()})}}}function Kd(a,b,d,c){(c.$$hasNativeValidators=J(b[0].validity))&&c.$parsers.push(function(a){var c=b.prop("validity")||{};return c.badInput||c.typeMismatch?u:a})}function Ld(a,b,d,c,e){if(A(c)){a=a(c);if(!a.constant)throw ob("constexpr",d,c);return a(b)}return e}function mc(a,b){a="ngClass"+a;return["$animate",function(d){function c(a,b){var c=
[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){var b=[];return M(a)?(q(a,function(a){b=b.concat(e(a))}),b):y(a)?a.split(" "):J(a)?(q(a,function(a,c){a&&(b=b.concat(c.split(" ")))}),b):a}return{restrict:"AC",link:function(f,g,h){function k(a,b){var c=g.data("$classCounts")||V(),d=[];q(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function l(a){if(!0===b||f.$index%
2===b){var l=e(a||[]);if(!m){var q=k(l,1);h.$addClass(q)}else if(!na(a,m)){var s=e(m),q=c(l,s),l=c(s,l),q=k(q,1),l=k(l,-1);q&&q.length&&d.addClass(g,q);l&&l.length&&d.removeClass(g,l)}}m=ia(a)}var m;f.$watch(h[a],l,!0);h.$observe("class",function(b){l(f.$eval(h[a]))});"ngClass"!==a&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var l=e(f.$eval(h[a]));g===b?(g=k(l,1),h.$addClass(g)):(g=k(l,-1),h.$removeClass(g))}})}}}]}function Id(a){function b(a,b){b&&!f[a]?(k.addClass(e,a),f[a]=!0):!b&&
f[a]&&(k.removeClass(e,a),f[a]=!1)}function d(a,c){a=a?"-"+zc(a,"-"):"";b(pb+a,!0===c);b(Md+a,!1===c)}var c=a.ctrl,e=a.$element,f={},g=a.set,h=a.unset,k=a.$animate;f[Md]=!(f[pb]=e.hasClass(pb));c.$setValidity=function(a,e,f){z(e)?(c.$pending||(c.$pending={}),g(c.$pending,a,f)):(c.$pending&&h(c.$pending,a,f),Nd(c.$pending)&&(c.$pending=u));Oa(e)?e?(h(c.$error,a,f),g(c.$$success,a,f)):(g(c.$error,a,f),h(c.$$success,a,f)):(h(c.$error,a,f),h(c.$$success,a,f));c.$pending?(b(Od,!0),c.$valid=c.$invalid=
u,d("",null)):(b(Od,!1),c.$valid=Nd(c.$error),c.$invalid=!c.$valid,d("",c.$valid));e=c.$pending&&c.$pending[a]?u:c.$error[a]?!1:c.$$success[a]?!0:null;d(a,e);c.$$parentForm.$setValidity(a,e,c)}}function Nd(a){if(a)for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}var yg=/^\/(.+)\/([a-z]*)$/,va=Object.prototype.hasOwnProperty,N=function(a){return y(a)?a.toLowerCase():a},vb=function(a){return y(a)?a.toUpperCase():a},Da,H,$,Aa=[].slice,Yf=[].splice,zg=[].push,ka=Object.prototype.toString,sc=Object.getPrototypeOf,
Ba=O("ng"),ea=T.angular||(T.angular={}),Tb,qb=0;Da=P.documentMode;E.$inject=[];$a.$inject=[];var M=Array.isArray,Zd=/^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/,W=function(a){return y(a)?a.trim():a},ud=function(a){return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},Ga=function(){if(!A(Ga.rules)){var a=P.querySelector("[ng-csp]")||P.querySelector("[data-ng-csp]");if(a){var b=a.getAttribute("ng-csp")||a.getAttribute("data-ng-csp");
Ga.rules={noUnsafeEval:!b||-1!==b.indexOf("no-unsafe-eval"),noInlineStyle:!b||-1!==b.indexOf("no-inline-style")}}else{a=Ga;try{new Function(""),b=!1}catch(d){b=!0}a.rules={noUnsafeEval:b,noInlineStyle:!1}}}return Ga.rules},sb=function(){if(A(sb.name_))return sb.name_;var a,b,d=Qa.length,c,e;for(b=0;b<d;++b)if(c=Qa[b],a=P.querySelector("["+c.replace(":","\\:")+"jq]")){e=a.getAttribute(c+"jq");break}return sb.name_=e},be=/:/g,Qa=["ng-","data-ng-","ng:","x-ng-"],ge=/[A-Z]/g,Ac=!1,Pa=3,ke={full:"1.5.3",
major:1,minor:5,dot:3,codeName:"diplohaplontic-meiosis"};U.expando="ng339";var hb=U.cache={},Mf=1;U._data=function(a){return this.cache[a[this.expando]]||{}};var Hf=/([\:\-\_]+(.))/g,If=/^moz([A-Z])/,zb={mouseleave:"mouseout",mouseenter:"mouseover"},Vb=O("jqLite"),Lf=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,Ub=/<|&#?\w+;/,Jf=/<([\w:-]+)/,Kf=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,ha={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,
"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ha.optgroup=ha.option;ha.tbody=ha.tfoot=ha.colgroup=ha.caption=ha.thead;ha.th=ha.td;var Rf=Node.prototype.contains||function(a){return!!(this.compareDocumentPosition(a)&16)},Ra=U.prototype={ready:function(a){function b(){d||(d=!0,a())}var d=!1;"complete"===P.readyState?setTimeout(b):(this.on("DOMContentLoaded",b),U(T).on("load",b))},toString:function(){var a=
[];q(this,function(b){a.push(""+b)});return"["+a.join(", ")+"]"},eq:function(a){return 0<=a?H(this[a]):H(this[this.length+a])},length:0,push:zg,sort:[].sort,splice:[].splice},Eb={};q("multiple selected checked disabled readOnly required open".split(" "),function(a){Eb[N(a)]=a});var Sc={};q("input select option textarea button form details".split(" "),function(a){Sc[a]=!0});var $c={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};q({data:Xb,removeData:gb,
hasData:function(a){for(var b in hb[a.ng339])return!0;return!1},cleanData:function(a){for(var b=0,d=a.length;b<d;b++)gb(a[b])}},function(a,b){U[b]=a});q({data:Xb,inheritedData:Db,scope:function(a){return H.data(a,"$scope")||Db(a.parentNode||a,["$isolateScope","$scope"])},isolateScope:function(a){return H.data(a,"$isolateScope")||H.data(a,"$isolateScopeNoTemplate")},controller:Pc,injector:function(a){return Db(a,"$injector")},removeAttr:function(a,b){a.removeAttribute(b)},hasClass:Ab,css:function(a,
b,d){b=fb(b);if(A(d))a.style[b]=d;else return a.style[b]},attr:function(a,b,d){var c=a.nodeType;if(c!==Pa&&2!==c&&8!==c)if(c=N(b),Eb[c])if(A(d))d?(a[b]=!0,a.setAttribute(b,c)):(a[b]=!1,a.removeAttribute(c));else return a[b]||(a.attributes.getNamedItem(b)||E).specified?c:u;else if(A(d))a.setAttribute(b,d);else if(a.getAttribute)return a=a.getAttribute(b,2),null===a?u:a},prop:function(a,b,d){if(A(d))a[b]=d;else return a[b]},text:function(){function a(a,d){if(z(d)){var c=a.nodeType;return 1===c||c===
Pa?a.textContent:""}a.textContent=d}a.$dv="";return a}(),val:function(a,b){if(z(b)){if(a.multiple&&"select"===oa(a)){var d=[];q(a.options,function(a){a.selected&&d.push(a.value||a.text)});return 0===d.length?null:d}return a.value}a.value=b},html:function(a,b){if(z(b))return a.innerHTML;xb(a,!0);a.innerHTML=b},empty:Qc},function(a,b){U.prototype[b]=function(b,c){var e,f,g=this.length;if(a!==Qc&&z(2==a.length&&a!==Ab&&a!==Pc?b:c)){if(J(b)){for(e=0;e<g;e++)if(a===Xb)a(this[e],b);else for(f in b)a(this[e],
f,b[f]);return this}e=a.$dv;g=z(e)?Math.min(g,1):g;for(f=0;f<g;f++){var h=a(this[f],b,c);e=e?e+h:h}return e}for(e=0;e<g;e++)a(this[e],b,c);return this}});q({removeData:gb,on:function(a,b,d,c){if(A(c))throw Vb("onargs");if(Kc(a)){c=yb(a,!0);var e=c.events,f=c.handle;f||(f=c.handle=Of(a,e));c=0<=b.indexOf(" ")?b.split(" "):[b];for(var g=c.length,h=function(b,c,g){var h=e[b];h||(h=e[b]=[],h.specialHandlerWrapper=c,"$destroy"===b||g||a.addEventListener(b,f,!1));h.push(d)};g--;)b=c[g],zb[b]?(h(zb[b],Qf),
h(b,u,!0)):h(b)}},off:Oc,one:function(a,b,d){a=H(a);a.on(b,function e(){a.off(b,d);a.off(b,e)});a.on(b,d)},replaceWith:function(a,b){var d,c=a.parentNode;xb(a);q(new U(b),function(b){d?c.insertBefore(b,d.nextSibling):c.replaceChild(b,a);d=b})},children:function(a){var b=[];q(a.childNodes,function(a){1===a.nodeType&&b.push(a)});return b},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,b){var d=a.nodeType;if(1===d||11===d){b=new U(b);for(var d=0,c=b.length;d<c;d++)a.appendChild(b[d])}},
prepend:function(a,b){if(1===a.nodeType){var d=a.firstChild;q(new U(b),function(b){a.insertBefore(b,d)})}},wrap:function(a,b){Mc(a,H(b).eq(0).clone()[0])},remove:Yb,detach:function(a){Yb(a,!0)},after:function(a,b){var d=a,c=a.parentNode;b=new U(b);for(var e=0,f=b.length;e<f;e++){var g=b[e];c.insertBefore(g,d.nextSibling);d=g}},addClass:Cb,removeClass:Bb,toggleClass:function(a,b,d){b&&q(b.split(" "),function(b){var e=d;z(e)&&(e=!Ab(a,b));(e?Cb:Bb)(a,b)})},parent:function(a){return(a=a.parentNode)&&
11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,b){return a.getElementsByTagName?a.getElementsByTagName(b):[]},clone:Wb,triggerHandler:function(a,b,d){var c,e,f=b.type||b,g=yb(a);if(g=(g=g&&g.events)&&g[f])c={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},
stopPropagation:E,type:f,target:a},b.type&&(c=S(c,b)),b=ia(g),e=d?[c].concat(d):[c],q(b,function(b){c.isImmediatePropagationStopped()||b.apply(a,e)})}},function(a,b){U.prototype[b]=function(b,c,e){for(var f,g=0,h=this.length;g<h;g++)z(f)?(f=a(this[g],b,c,e),A(f)&&(f=H(f))):Nc(f,a(this[g],b,c,e));return A(f)?f:this};U.prototype.bind=U.prototype.on;U.prototype.unbind=U.prototype.off});Ua.prototype={put:function(a,b){this[Ha(a,this.nextUid)]=b},get:function(a){return this[Ha(a,this.nextUid)]},remove:function(a){var b=
this[a=Ha(a,this.nextUid)];delete this[a];return b}};var Ff=[function(){this.$get=[function(){return Ua}]}],Tf=/^([^\(]+?)=>/,Uf=/^[^\(]*\(\s*([^\)]*)\)/m,Ag=/,/,Bg=/^\s*(_?)(\S+?)\1\s*$/,Sf=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ia=O("$injector");eb.$$annotate=function(a,b,d){var c;if("function"===typeof a){if(!(c=a.$inject)){c=[];if(a.length){if(b)throw y(d)&&d||(d=a.name||Vf(a)),Ia("strictdi",d);b=Tc(a);q(b[1].split(Ag),function(a){a.replace(Bg,function(a,b,d){c.push(d)})})}a.$inject=c}}else M(a)?
(b=a.length-1,Sa(a[b],"fn"),c=a.slice(0,b)):Sa(a,"fn",!0);return c};var Pd=O("$animate"),Ye=function(){this.$get=E},Ze=function(){var a=new Ua,b=[];this.$get=["$$AnimateRunner","$rootScope",function(d,c){function e(a,b,c){var d=!1;b&&(b=y(b)?b.split(" "):M(b)?b:[],q(b,function(b){b&&(d=!0,a[b]=c)}));return d}function f(){q(b,function(b){var c=a.get(b);if(c){var d=Wf(b.attr("class")),e="",f="";q(c,function(a,b){a!==!!d[b]&&(a?e+=(e.length?" ":"")+b:f+=(f.length?" ":"")+b)});q(b,function(a){e&&Cb(a,
e);f&&Bb(a,f)});a.remove(b)}});b.length=0}return{enabled:E,on:E,off:E,pin:E,push:function(g,h,k,l){l&&l();k=k||{};k.from&&g.css(k.from);k.to&&g.css(k.to);if(k.addClass||k.removeClass)if(h=k.addClass,l=k.removeClass,k=a.get(g)||{},h=e(k,h,!0),l=e(k,l,!1),h||l)a.put(g,k),b.push(g),1===b.length&&c.$$postDigest(f);g=new d;g.complete();return g}}}]},We=["$provide",function(a){var b=this;this.$$registeredAnimations=Object.create(null);this.register=function(d,c){if(d&&"."!==d.charAt(0))throw Pd("notcsel",
d);var e=d+"-animation";b.$$registeredAnimations[d.substr(1)]=e;a.factory(e,c)};this.classNameFilter=function(a){if(1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null)&&/(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString()))throw Pd("nongcls","ng-animate");return this.$$classNameFilter};this.$get=["$$animateQueue",function(a){function b(a,c,d){if(d){var h;a:{for(h=0;h<d.length;h++){var k=d[h];if(1===k.nodeType){h=k;break a}}h=void 0}!h||h.parentNode||h.previousElementSibling||
(d=null)}d?d.after(a):c.prepend(a)}return{on:a.on,off:a.off,pin:a.pin,enabled:a.enabled,cancel:function(a){a.end&&a.end()},enter:function(e,f,g,h){f=f&&H(f);g=g&&H(g);f=f||g.parent();b(e,f,g);return a.push(e,"enter",Ja(h))},move:function(e,f,g,h){f=f&&H(f);g=g&&H(g);f=f||g.parent();b(e,f,g);return a.push(e,"move",Ja(h))},leave:function(b,c){return a.push(b,"leave",Ja(c),function(){b.remove()})},addClass:function(b,c,g){g=Ja(g);g.addClass=ib(g.addclass,c);return a.push(b,"addClass",g)},removeClass:function(b,
c,g){g=Ja(g);g.removeClass=ib(g.removeClass,c);return a.push(b,"removeClass",g)},setClass:function(b,c,g,h){h=Ja(h);h.addClass=ib(h.addClass,c);h.removeClass=ib(h.removeClass,g);return a.push(b,"setClass",h)},animate:function(b,c,g,h,k){k=Ja(k);k.from=k.from?S(k.from,c):c;k.to=k.to?S(k.to,g):g;k.tempClasses=ib(k.tempClasses,h||"ng-inline-animate");return a.push(b,"animate",k)}}}]}],af=function(){this.$get=["$$rAF",function(a){function b(b){d.push(b);1<d.length||a(function(){for(var a=0;a<d.length;a++)d[a]();
d=[]})}var d=[];return function(){var a=!1;b(function(){a=!0});return function(d){a?d():b(d)}}}]},$e=function(){this.$get=["$q","$sniffer","$$animateAsyncRun","$document","$timeout",function(a,b,d,c,e){function f(a){this.setHost(a);var b=d();this._doneCallbacks=[];this._tick=function(a){var d=c[0];d&&d.hidden?e(a,0,!1):b(a)};this._state=0}f.chain=function(a,b){function c(){if(d===a.length)b(!0);else a[d](function(a){!1===a?b(!1):(d++,c())})}var d=0;c()};f.all=function(a,b){function c(f){e=e&&f;++d===
a.length&&b(e)}var d=0,e=!0;q(a,function(a){a.done(c)})};f.prototype={setHost:function(a){this.host=a||{}},done:function(a){2===this._state?a():this._doneCallbacks.push(a)},progress:E,getPromise:function(){if(!this.promise){var b=this;this.promise=a(function(a,c){b.done(function(b){!1===b?c():a()})})}return this.promise},then:function(a,b){return this.getPromise().then(a,b)},"catch":function(a){return this.getPromise()["catch"](a)},"finally":function(a){return this.getPromise()["finally"](a)},pause:function(){this.host.pause&&
this.host.pause()},resume:function(){this.host.resume&&this.host.resume()},end:function(){this.host.end&&this.host.end();this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel();this._resolve(!1)},complete:function(a){var b=this;0===b._state&&(b._state=1,b._tick(function(){b._resolve(a)}))},_resolve:function(a){2!==this._state&&(q(this._doneCallbacks,function(b){b(a)}),this._doneCallbacks.length=0,this._state=2)}};return f}]},Xe=function(){this.$get=["$$rAF","$q","$$AnimateRunner",
function(a,b,d){return function(b,e){function f(){a(function(){g.addClass&&(b.addClass(g.addClass),g.addClass=null);g.removeClass&&(b.removeClass(g.removeClass),g.removeClass=null);g.to&&(b.css(g.to),g.to=null);h||k.complete();h=!0});return k}var g=e||{};g.$$prepared||(g=pa(g));g.cleanupStyles&&(g.from=g.to=null);g.from&&(b.css(g.from),g.from=null);var h,k=new d;return{start:f,end:f}}}]},ga=O("$compile");Cc.$inject=["$provide","$$sanitizeUriProvider"];var Vc=/^((?:x|data)[\:\-_])/i,Zf=O("$controller"),
ad=/^(\S+)(\s+as\s+([\w$]+))?$/,gf=function(){this.$get=["$document",function(a){return function(b){b?!b.nodeType&&b instanceof H&&(b=b[0]):b=a[0].body;return b.offsetWidth+1}}]},bd="application/json",bc={"Content-Type":bd+";charset=utf-8"},ag=/^\[|^\{(?!\{)/,bg={"[":/]$/,"{":/}$/},$f=/^\)\]\}',?\n/,Cg=O("$http"),fd=function(a){return function(){throw Cg("legacy",a);}},La=ea.$interpolateMinErr=O("$interpolate");La.throwNoconcat=function(a){throw La("noconcat",a);};La.interr=function(a,b){return La("interr",
a,b.toString())};var Dg=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,dg={http:80,https:443,ftp:21},Fb=O("$location"),Eg={$$html5:!1,$$replace:!1,absUrl:Gb("$$absUrl"),url:function(a){if(z(a))return this.$$url;var b=Dg.exec(a);(b[1]||""===a)&&this.path(decodeURIComponent(b[1]));(b[2]||b[1]||""===a)&&this.search(b[3]||"");this.hash(b[5]||"");return this},protocol:Gb("$$protocol"),host:Gb("$$host"),port:Gb("$$port"),path:kd("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,
b){switch(arguments.length){case 0:return this.$$search;case 1:if(y(a)||R(a))a=a.toString(),this.$$search=xc(a);else if(J(a))a=pa(a,{}),q(a,function(b,c){null==b&&delete a[c]}),this.$$search=a;else throw Fb("isrcharg");break;default:z(b)||null===b?delete this.$$search[a]:this.$$search[a]=b}this.$$compose();return this},hash:kd("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};q([jd,ec,dc],function(a){a.prototype=Object.create(Eg);a.prototype.state=
function(b){if(!arguments.length)return this.$$state;if(a!==dc||!this.$$html5)throw Fb("nostate");this.$$state=z(b)?null:b;return this}});var ca=O("$parse"),fg=Function.prototype.call,gg=Function.prototype.apply,hg=Function.prototype.bind,Nb=V();q("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),function(a){Nb[a]=!0});var Fg={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},gc=function(a){this.options=a};gc.prototype={constructor:gc,lex:function(a){this.text=a;this.index=0;for(this.tokens=
[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(a))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var b=a+this.peek(),d=b+this.peek(2),c=Nb[b],e=Nb[d];Nb[a]||c||e?(a=e?d:c?b:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=
a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,b){return-1!==b.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===
a||"+"===a||this.isNumber(a)},throwError:function(a,b,d){d=d||this.index;b=A(b)?"s "+b+"-"+this.index+" ["+this.text.substring(b,d)+"]":" "+d;throw ca("lexerr",a,b,this.text);},readNumber:function(){for(var a="",b=this.index;this.index<this.text.length;){var d=N(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var c=this.peek();if("e"==d&&this.isExpOperator(c))a+=d;else if(this.isExpOperator(d)&&c&&this.isNumber(c)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||
c&&this.isNumber(c)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:b,text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var b=this.text.charAt(this.index);if(!this.isIdent(b)&&!this.isNumber(b))break;this.index++}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var b=this.index;this.index++;for(var d="",c=a,e=!1;this.index<this.text.length;){var f=
this.text.charAt(this.index),c=c+f;if(e)"u"===f?(e=this.text.substring(this.index+1,this.index+5),e.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+e+"]"),this.index+=4,d+=String.fromCharCode(parseInt(e,16))):d+=Fg[f]||f,e=!1;else if("\\"===f)e=!0;else{if(f===a){this.index++;this.tokens.push({index:b,text:c,constant:!0,value:d});return}d+=f}this.index++}this.throwError("Unterminated quote",b)}};var s=function(a,b){this.lexer=a;this.options=b};s.Program="Program";s.ExpressionStatement=
"ExpressionStatement";s.AssignmentExpression="AssignmentExpression";s.ConditionalExpression="ConditionalExpression";s.LogicalExpression="LogicalExpression";s.BinaryExpression="BinaryExpression";s.UnaryExpression="UnaryExpression";s.CallExpression="CallExpression";s.MemberExpression="MemberExpression";s.Identifier="Identifier";s.Literal="Literal";s.ArrayExpression="ArrayExpression";s.Property="Property";s.ObjectExpression="ObjectExpression";s.ThisExpression="ThisExpression";s.LocalsExpression="LocalsExpression";
s.NGValueParameter="NGValueParameter";s.prototype={ast:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.program();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);return a},program:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.expressionStatement()),!this.expect(";"))return{type:s.Program,body:a}},expressionStatement:function(){return{type:s.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var a=
this.expression();this.expect("|");)a=this.filter(a);return a},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary();this.expect("=")&&(a={type:s.AssignmentExpression,left:a,right:this.assignment(),operator:"="});return a},ternary:function(){var a=this.logicalOR(),b,d;return this.expect("?")&&(b=this.expression(),this.consume(":"))?(d=this.expression(),{type:s.ConditionalExpression,test:a,alternate:b,consequent:d}):a},logicalOR:function(){for(var a=this.logicalAND();this.expect("||");)a=
{type:s.LogicalExpression,operator:"||",left:a,right:this.logicalAND()};return a},logicalAND:function(){for(var a=this.equality();this.expect("&&");)a={type:s.LogicalExpression,operator:"&&",left:a,right:this.equality()};return a},equality:function(){for(var a=this.relational(),b;b=this.expect("==","!=","===","!==");)a={type:s.BinaryExpression,operator:b.text,left:a,right:this.relational()};return a},relational:function(){for(var a=this.additive(),b;b=this.expect("<",">","<=",">=");)a={type:s.BinaryExpression,
operator:b.text,left:a,right:this.additive()};return a},additive:function(){for(var a=this.multiplicative(),b;b=this.expect("+","-");)a={type:s.BinaryExpression,operator:b.text,left:a,right:this.multiplicative()};return a},multiplicative:function(){for(var a=this.unary(),b;b=this.expect("*","/","%");)a={type:s.BinaryExpression,operator:b.text,left:a,right:this.unary()};return a},unary:function(){var a;return(a=this.expect("+","-","!"))?{type:s.UnaryExpression,operator:a.text,prefix:!0,argument:this.unary()}:
this.primary()},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.selfReferential.hasOwnProperty(this.peek().text)?a=pa(this.selfReferential[this.consume().text]):this.options.literals.hasOwnProperty(this.peek().text)?a={type:s.Literal,value:this.options.literals[this.consume().text]}:this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",
this.peek());for(var b;b=this.expect("(","[",".");)"("===b.text?(a={type:s.CallExpression,callee:a,arguments:this.parseArguments()},this.consume(")")):"["===b.text?(a={type:s.MemberExpression,object:a,property:this.expression(),computed:!0},this.consume("]")):"."===b.text?a={type:s.MemberExpression,object:a,property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return a},filter:function(a){a=[a];for(var b={type:s.CallExpression,callee:this.identifier(),arguments:a,filter:!0};this.expect(":");)a.push(this.expression());
return b},parseArguments:function(){var a=[];if(")"!==this.peekToken().text){do a.push(this.expression());while(this.expect(","))}return a},identifier:function(){var a=this.consume();a.identifier||this.throwError("is not a valid identifier",a);return{type:s.Identifier,name:a.text}},constant:function(){return{type:s.Literal,value:this.consume().value}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))}this.consume("]");
return{type:s.ArrayExpression,elements:a}},object:function(){var a=[],b;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;b={type:s.Property,kind:"init"};this.peek().constant?b.key=this.constant():this.peek().identifier?b.key=this.identifier():this.throwError("invalid key",this.peek());this.consume(":");b.value=this.expression();a.push(b)}while(this.expect(","))}this.consume("}");return{type:s.ObjectExpression,properties:a}},throwError:function(a,b){throw ca("syntax",b.text,a,b.index+1,this.text,
this.text.substring(b.index));},consume:function(a){if(0===this.tokens.length)throw ca("ueoe",this.text);var b=this.expect(a);b||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return b},peekToken:function(){if(0===this.tokens.length)throw ca("ueoe",this.text);return this.tokens[0]},peek:function(a,b,d,c){return this.peekAhead(0,a,b,d,c)},peekAhead:function(a,b,d,c,e){if(this.tokens.length>a){a=this.tokens[a];var f=a.text;if(f===b||f===d||f===c||f===e||!(b||d||c||e))return a}return!1},
expect:function(a,b,d,c){return(a=this.peek(a,b,d,c))?(this.tokens.shift(),a):!1},selfReferential:{"this":{type:s.ThisExpression},$locals:{type:s.LocalsExpression}}};rd.prototype={compile:function(a,b){var d=this,c=this.astBuilder.ast(a);this.state={nextId:0,filters:{},expensiveChecks:b,fn:{vars:[],body:[],own:{}},assign:{vars:[],body:[],own:{}},inputs:[]};aa(c,d.$filter);var e="",f;this.stage="assign";if(f=pd(c))this.state.computing="assign",e=this.nextId(),this.recurse(f,e),this.return_(e),e="fn.assign="+
this.generateFunction("assign","s,v,l");f=nd(c.body);d.stage="inputs";q(f,function(a,b){var c="fn"+b;d.state[c]={vars:[],body:[],own:{}};d.state.computing=c;var e=d.nextId();d.recurse(a,e);d.return_(e);d.state.inputs.push(c);a.watchId=b});this.state.computing="fn";this.stage="main";this.recurse(c);e='"'+this.USE+" "+this.STRICT+'";\n'+this.filterPrefix()+"var fn="+this.generateFunction("fn","s,l,a,i")+e+this.watchFns()+"return fn;";e=(new Function("$filter","ensureSafeMemberName","ensureSafeObject",
"ensureSafeFunction","getStringValue","ensureSafeAssignContext","ifDefined","plus","text",e))(this.$filter,Wa,ta,ld,eg,Hb,ig,md,a);this.state=this.stage=u;e.literal=qd(c);e.constant=c.constant;return e},USE:"use",STRICT:"strict",watchFns:function(){var a=[],b=this.state.inputs,d=this;q(b,function(b){a.push("var "+b+"="+d.generateFunction(b,"s"))});b.length&&a.push("fn.inputs=["+b.join(",")+"];");return a.join("")},generateFunction:function(a,b){return"function("+b+"){"+this.varsPrefix(a)+this.body(a)+
"};"},filterPrefix:function(){var a=[],b=this;q(this.state.filters,function(d,c){a.push(d+"=$filter("+b.escape(c)+")")});return a.length?"var "+a.join(",")+";":""},varsPrefix:function(a){return this.state[a].vars.length?"var "+this.state[a].vars.join(",")+";":""},body:function(a){return this.state[a].body.join("")},recurse:function(a,b,d,c,e,f){var g,h,k=this,l,m;c=c||E;if(!f&&A(a.watchId))b=b||this.nextId(),this.if_("i",this.lazyAssign(b,this.computedMember("i",a.watchId)),this.lazyRecurse(a,b,d,
c,e,!0));else switch(a.type){case s.Program:q(a.body,function(b,c){k.recurse(b.expression,u,u,function(a){h=a});c!==a.body.length-1?k.current().body.push(h,";"):k.return_(h)});break;case s.Literal:m=this.escape(a.value);this.assign(b,m);c(m);break;case s.UnaryExpression:this.recurse(a.argument,u,u,function(a){h=a});m=a.operator+"("+this.ifDefined(h,0)+")";this.assign(b,m);c(m);break;case s.BinaryExpression:this.recurse(a.left,u,u,function(a){g=a});this.recurse(a.right,u,u,function(a){h=a});m="+"===
a.operator?this.plus(g,h):"-"===a.operator?this.ifDefined(g,0)+a.operator+this.ifDefined(h,0):"("+g+")"+a.operator+"("+h+")";this.assign(b,m);c(m);break;case s.LogicalExpression:b=b||this.nextId();k.recurse(a.left,b);k.if_("&&"===a.operator?b:k.not(b),k.lazyRecurse(a.right,b));c(b);break;case s.ConditionalExpression:b=b||this.nextId();k.recurse(a.test,b);k.if_(b,k.lazyRecurse(a.alternate,b),k.lazyRecurse(a.consequent,b));c(b);break;case s.Identifier:b=b||this.nextId();d&&(d.context="inputs"===k.stage?
"s":this.assign(this.nextId(),this.getHasOwnProperty("l",a.name)+"?l:s"),d.computed=!1,d.name=a.name);Wa(a.name);k.if_("inputs"===k.stage||k.not(k.getHasOwnProperty("l",a.name)),function(){k.if_("inputs"===k.stage||"s",function(){e&&1!==e&&k.if_(k.not(k.nonComputedMember("s",a.name)),k.lazyAssign(k.nonComputedMember("s",a.name),"{}"));k.assign(b,k.nonComputedMember("s",a.name))})},b&&k.lazyAssign(b,k.nonComputedMember("l",a.name)));(k.state.expensiveChecks||Ib(a.name))&&k.addEnsureSafeObject(b);c(b);
break;case s.MemberExpression:g=d&&(d.context=this.nextId())||this.nextId();b=b||this.nextId();k.recurse(a.object,g,u,function(){k.if_(k.notNull(g),function(){e&&1!==e&&k.addEnsureSafeAssignContext(g);if(a.computed)h=k.nextId(),k.recurse(a.property,h),k.getStringValue(h),k.addEnsureSafeMemberName(h),e&&1!==e&&k.if_(k.not(k.computedMember(g,h)),k.lazyAssign(k.computedMember(g,h),"{}")),m=k.ensureSafeObject(k.computedMember(g,h)),k.assign(b,m),d&&(d.computed=!0,d.name=h);else{Wa(a.property.name);e&&
1!==e&&k.if_(k.not(k.nonComputedMember(g,a.property.name)),k.lazyAssign(k.nonComputedMember(g,a.property.name),"{}"));m=k.nonComputedMember(g,a.property.name);if(k.state.expensiveChecks||Ib(a.property.name))m=k.ensureSafeObject(m);k.assign(b,m);d&&(d.computed=!1,d.name=a.property.name)}},function(){k.assign(b,"undefined")});c(b)},!!e);break;case s.CallExpression:b=b||this.nextId();a.filter?(h=k.filter(a.callee.name),l=[],q(a.arguments,function(a){var b=k.nextId();k.recurse(a,b);l.push(b)}),m=h+"("+
l.join(",")+")",k.assign(b,m),c(b)):(h=k.nextId(),g={},l=[],k.recurse(a.callee,h,g,function(){k.if_(k.notNull(h),function(){k.addEnsureSafeFunction(h);q(a.arguments,function(a){k.recurse(a,k.nextId(),u,function(a){l.push(k.ensureSafeObject(a))})});g.name?(k.state.expensiveChecks||k.addEnsureSafeObject(g.context),m=k.member(g.context,g.name,g.computed)+"("+l.join(",")+")"):m=h+"("+l.join(",")+")";m=k.ensureSafeObject(m);k.assign(b,m)},function(){k.assign(b,"undefined")});c(b)}));break;case s.AssignmentExpression:h=
this.nextId();g={};if(!od(a.left))throw ca("lval");this.recurse(a.left,u,g,function(){k.if_(k.notNull(g.context),function(){k.recurse(a.right,h);k.addEnsureSafeObject(k.member(g.context,g.name,g.computed));k.addEnsureSafeAssignContext(g.context);m=k.member(g.context,g.name,g.computed)+a.operator+h;k.assign(b,m);c(b||m)})},1);break;case s.ArrayExpression:l=[];q(a.elements,function(a){k.recurse(a,k.nextId(),u,function(a){l.push(a)})});m="["+l.join(",")+"]";this.assign(b,m);c(m);break;case s.ObjectExpression:l=
[];q(a.properties,function(a){k.recurse(a.value,k.nextId(),u,function(b){l.push(k.escape(a.key.type===s.Identifier?a.key.name:""+a.key.value)+":"+b)})});m="{"+l.join(",")+"}";this.assign(b,m);c(m);break;case s.ThisExpression:this.assign(b,"s");c("s");break;case s.LocalsExpression:this.assign(b,"l");c("l");break;case s.NGValueParameter:this.assign(b,"v"),c("v")}},getHasOwnProperty:function(a,b){var d=a+"."+b,c=this.current().own;c.hasOwnProperty(d)||(c[d]=this.nextId(!1,a+"&&("+this.escape(b)+" in "+
a+")"));return c[d]},assign:function(a,b){if(a)return this.current().body.push(a,"=",b,";"),a},filter:function(a){this.state.filters.hasOwnProperty(a)||(this.state.filters[a]=this.nextId(!0));return this.state.filters[a]},ifDefined:function(a,b){return"ifDefined("+a+","+this.escape(b)+")"},plus:function(a,b){return"plus("+a+","+b+")"},return_:function(a){this.current().body.push("return ",a,";")},if_:function(a,b,d){if(!0===a)b();else{var c=this.current().body;c.push("if(",a,"){");b();c.push("}");
d&&(c.push("else{"),d(),c.push("}"))}},not:function(a){return"!("+a+")"},notNull:function(a){return a+"!=null"},nonComputedMember:function(a,b){return a+"."+b},computedMember:function(a,b){return a+"["+b+"]"},member:function(a,b,d){return d?this.computedMember(a,b):this.nonComputedMember(a,b)},addEnsureSafeObject:function(a){this.current().body.push(this.ensureSafeObject(a),";")},addEnsureSafeMemberName:function(a){this.current().body.push(this.ensureSafeMemberName(a),";")},addEnsureSafeFunction:function(a){this.current().body.push(this.ensureSafeFunction(a),
";")},addEnsureSafeAssignContext:function(a){this.current().body.push(this.ensureSafeAssignContext(a),";")},ensureSafeObject:function(a){return"ensureSafeObject("+a+",text)"},ensureSafeMemberName:function(a){return"ensureSafeMemberName("+a+",text)"},ensureSafeFunction:function(a){return"ensureSafeFunction("+a+",text)"},getStringValue:function(a){this.assign(a,"getStringValue("+a+")")},ensureSafeAssignContext:function(a){return"ensureSafeAssignContext("+a+",text)"},lazyRecurse:function(a,b,d,c,e,f){var g=
this;return function(){g.recurse(a,b,d,c,e,f)}},lazyAssign:function(a,b){var d=this;return function(){d.assign(a,b)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,stringEscapeFn:function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)},escape:function(a){if(y(a))return"'"+a.replace(this.stringEscapeRegex,this.stringEscapeFn)+"'";if(R(a))return a.toString();if(!0===a)return"true";if(!1===a)return"false";if(null===a)return"null";if("undefined"===typeof a)return"undefined";throw ca("esc");},nextId:function(a,
b){var d="v"+this.state.nextId++;a||this.current().vars.push(d+(b?"="+b:""));return d},current:function(){return this.state[this.state.computing]}};sd.prototype={compile:function(a,b){var d=this,c=this.astBuilder.ast(a);this.expression=a;this.expensiveChecks=b;aa(c,d.$filter);var e,f;if(e=pd(c))f=this.recurse(e);e=nd(c.body);var g;e&&(g=[],q(e,function(a,b){var c=d.recurse(a);a.input=c;g.push(c);a.watchId=b}));var h=[];q(c.body,function(a){h.push(d.recurse(a.expression))});e=0===c.body.length?E:1===
c.body.length?h[0]:function(a,b){var c;q(h,function(d){c=d(a,b)});return c};f&&(e.assign=function(a,b,c){return f(a,c,b)});g&&(e.inputs=g);e.literal=qd(c);e.constant=c.constant;return e},recurse:function(a,b,d){var c,e,f=this,g;if(a.input)return this.inputs(a.input,a.watchId);switch(a.type){case s.Literal:return this.value(a.value,b);case s.UnaryExpression:return e=this.recurse(a.argument),this["unary"+a.operator](e,b);case s.BinaryExpression:return c=this.recurse(a.left),e=this.recurse(a.right),
this["binary"+a.operator](c,e,b);case s.LogicalExpression:return c=this.recurse(a.left),e=this.recurse(a.right),this["binary"+a.operator](c,e,b);case s.ConditionalExpression:return this["ternary?:"](this.recurse(a.test),this.recurse(a.alternate),this.recurse(a.consequent),b);case s.Identifier:return Wa(a.name,f.expression),f.identifier(a.name,f.expensiveChecks||Ib(a.name),b,d,f.expression);case s.MemberExpression:return c=this.recurse(a.object,!1,!!d),a.computed||(Wa(a.property.name,f.expression),
e=a.property.name),a.computed&&(e=this.recurse(a.property)),a.computed?this.computedMember(c,e,b,d,f.expression):this.nonComputedMember(c,e,f.expensiveChecks,b,d,f.expression);case s.CallExpression:return g=[],q(a.arguments,function(a){g.push(f.recurse(a))}),a.filter&&(e=this.$filter(a.callee.name)),a.filter||(e=this.recurse(a.callee,!0)),a.filter?function(a,c,d,f){for(var n=[],p=0;p<g.length;++p)n.push(g[p](a,c,d,f));a=e.apply(u,n,f);return b?{context:u,name:u,value:a}:a}:function(a,c,d,m){var n=
e(a,c,d,m),p;if(null!=n.value){ta(n.context,f.expression);ld(n.value,f.expression);p=[];for(var q=0;q<g.length;++q)p.push(ta(g[q](a,c,d,m),f.expression));p=ta(n.value.apply(n.context,p),f.expression)}return b?{value:p}:p};case s.AssignmentExpression:return c=this.recurse(a.left,!0,1),e=this.recurse(a.right),function(a,d,g,m){var n=c(a,d,g,m);a=e(a,d,g,m);ta(n.value,f.expression);Hb(n.context);n.context[n.name]=a;return b?{value:a}:a};case s.ArrayExpression:return g=[],q(a.elements,function(a){g.push(f.recurse(a))}),
function(a,c,d,e){for(var f=[],p=0;p<g.length;++p)f.push(g[p](a,c,d,e));return b?{value:f}:f};case s.ObjectExpression:return g=[],q(a.properties,function(a){g.push({key:a.key.type===s.Identifier?a.key.name:""+a.key.value,value:f.recurse(a.value)})}),function(a,c,d,e){for(var f={},p=0;p<g.length;++p)f[g[p].key]=g[p].value(a,c,d,e);return b?{value:f}:f};case s.ThisExpression:return function(a){return b?{value:a}:a};case s.LocalsExpression:return function(a,c){return b?{value:c}:c};case s.NGValueParameter:return function(a,
c,d){return b?{value:d}:d}}},"unary+":function(a,b){return function(d,c,e,f){d=a(d,c,e,f);d=A(d)?+d:0;return b?{value:d}:d}},"unary-":function(a,b){return function(d,c,e,f){d=a(d,c,e,f);d=A(d)?-d:0;return b?{value:d}:d}},"unary!":function(a,b){return function(d,c,e,f){d=!a(d,c,e,f);return b?{value:d}:d}},"binary+":function(a,b,d){return function(c,e,f,g){var h=a(c,e,f,g);c=b(c,e,f,g);h=md(h,c);return d?{value:h}:h}},"binary-":function(a,b,d){return function(c,e,f,g){var h=a(c,e,f,g);c=b(c,e,f,g);
h=(A(h)?h:0)-(A(c)?c:0);return d?{value:h}:h}},"binary*":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)*b(c,e,f,g);return d?{value:c}:c}},"binary/":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)/b(c,e,f,g);return d?{value:c}:c}},"binary%":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)%b(c,e,f,g);return d?{value:c}:c}},"binary===":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)===b(c,e,f,g);return d?{value:c}:c}},"binary!==":function(a,b,d){return function(c,e,f,g){c=a(c,
e,f,g)!==b(c,e,f,g);return d?{value:c}:c}},"binary==":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)==b(c,e,f,g);return d?{value:c}:c}},"binary!=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!=b(c,e,f,g);return d?{value:c}:c}},"binary<":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<b(c,e,f,g);return d?{value:c}:c}},"binary>":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)>b(c,e,f,g);return d?{value:c}:c}},"binary<=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,
g)<=b(c,e,f,g);return d?{value:c}:c}},"binary>=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)>=b(c,e,f,g);return d?{value:c}:c}},"binary&&":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)&&b(c,e,f,g);return d?{value:c}:c}},"binary||":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)||b(c,e,f,g);return d?{value:c}:c}},"ternary?:":function(a,b,d,c){return function(e,f,g,h){e=a(e,f,g,h)?b(e,f,g,h):d(e,f,g,h);return c?{value:e}:e}},value:function(a,b){return function(){return b?{context:u,
name:u,value:a}:a}},identifier:function(a,b,d,c,e){return function(f,g,h,k){f=g&&a in g?g:f;c&&1!==c&&f&&!f[a]&&(f[a]={});g=f?f[a]:u;b&&ta(g,e);return d?{context:f,name:a,value:g}:g}},computedMember:function(a,b,d,c,e){return function(f,g,h,k){var l=a(f,g,h,k),m,n;null!=l&&(m=b(f,g,h,k),m+="",Wa(m,e),c&&1!==c&&(Hb(l),l&&!l[m]&&(l[m]={})),n=l[m],ta(n,e));return d?{context:l,name:m,value:n}:n}},nonComputedMember:function(a,b,d,c,e,f){return function(g,h,k,l){g=a(g,h,k,l);e&&1!==e&&(Hb(g),g&&!g[b]&&
(g[b]={}));h=null!=g?g[b]:u;(d||Ib(b))&&ta(h,f);return c?{context:g,name:b,value:h}:h}},inputs:function(a,b){return function(d,c,e,f){return f?f[b]:a(d,c,e)}}};var hc=function(a,b,d){this.lexer=a;this.$filter=b;this.options=d;this.ast=new s(a,d);this.astCompiler=d.csp?new sd(this.ast,b):new rd(this.ast,b)};hc.prototype={constructor:hc,parse:function(a){return this.astCompiler.compile(a,this.options.expensiveChecks)}};var jg=Object.prototype.valueOf,ua=O("$sce"),ma={HTML:"html",CSS:"css",URL:"url",
RESOURCE_URL:"resourceUrl",JS:"js"},lg=O("$compile"),Z=P.createElement("a"),wd=sa(T.location.href);xd.$inject=["$document"];Jc.$inject=["$provide"];var Ed=22,Dd=".",jc="0";yd.$inject=["$locale"];Ad.$inject=["$locale"];var wg={yyyy:X("FullYear",4,0,!1,!0),yy:X("FullYear",2,0,!0,!0),y:X("FullYear",1,0,!1,!0),MMMM:lb("Month"),MMM:lb("Month",!0),MM:X("Month",2,1),M:X("Month",1,1),LLLL:lb("Month",!1,!0),dd:X("Date",2),d:X("Date",1),HH:X("Hours",2),H:X("Hours",1),hh:X("Hours",2,-12),h:X("Hours",1,-12),
mm:X("Minutes",2),m:X("Minutes",1),ss:X("Seconds",2),s:X("Seconds",1),sss:X("Milliseconds",3),EEEE:lb("Day"),EEE:lb("Day",!0),a:function(a,b){return 12>a.getHours()?b.AMPMS[0]:b.AMPMS[1]},Z:function(a,b,d){a=-1*d;return a=(0<=a?"+":"")+(Jb(Math[0<a?"floor":"ceil"](a/60),2)+Jb(Math.abs(a%60),2))},ww:Gd(2),w:Gd(1),G:kc,GG:kc,GGG:kc,GGGG:function(a,b){return 0>=a.getFullYear()?b.ERANAMES[0]:b.ERANAMES[1]}},vg=/((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
ug=/^\-?\d+$/;zd.$inject=["$locale"];var pg=da(N),qg=da(vb);Bd.$inject=["$parse"];var me=da({restrict:"E",compile:function(a,b){if(!b.href&&!b.xlinkHref)return function(a,b){if("a"===b[0].nodeName.toLowerCase()){var e="[object SVGAnimatedString]"===ka.call(b.prop("href"))?"xlink:href":"href";b.on("click",function(a){b.attr(e)||a.preventDefault()})}}}}),wb={};q(Eb,function(a,b){function d(a,d,e){a.$watch(e[c],function(a){e.$set(b,!!a)})}if("multiple"!=a){var c=ya("ng-"+b),e=d;"checked"===a&&(e=function(a,
b,e){e.ngModel!==e[c]&&d(a,b,e)});wb[c]=function(){return{restrict:"A",priority:100,link:e}}}});q($c,function(a,b){wb[b]=function(){return{priority:100,link:function(a,c,e){if("ngPattern"===b&&"/"==e.ngPattern.charAt(0)&&(c=e.ngPattern.match(yg))){e.$set("ngPattern",new RegExp(c[1],c[2]));return}a.$watch(e[b],function(a){e.$set(b,a)})}}}});q(["src","srcset","href"],function(a){var b=ya("ng-"+a);wb[b]=function(){return{priority:99,link:function(d,c,e){var f=a,g=a;"href"===a&&"[object SVGAnimatedString]"===
ka.call(c.prop("href"))&&(g="xlinkHref",e.$attr[g]="xlink:href",f=null);e.$observe(b,function(b){b?(e.$set(g,b),Da&&f&&c.prop(f,e[g])):"href"===a&&e.$set(g,null)})}}}});var Kb={$addControl:E,$$renameControl:function(a,b){a.$name=b},$removeControl:E,$setValidity:E,$setDirty:E,$setPristine:E,$setSubmitted:E};Hd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var Qd=function(a){return["$timeout","$parse",function(b,d){function c(a){return""===a?d('this[""]').assign:d(a).assign||E}return{name:"form",
restrict:a?"EAC":"E",require:["form","^^?form"],controller:Hd,compile:function(d,f){d.addClass(Xa).addClass(pb);var g=f.name?"name":a&&f.ngForm?"ngForm":!1;return{pre:function(a,d,e,f){var n=f[0];if(!("action"in e)){var p=function(b){a.$apply(function(){n.$commitViewValue();n.$setSubmitted()});b.preventDefault()};d[0].addEventListener("submit",p,!1);d.on("$destroy",function(){b(function(){d[0].removeEventListener("submit",p,!1)},0,!1)})}(f[1]||n.$$parentForm).$addControl(n);var q=g?c(n.$name):E;g&&
(q(a,n),e.$observe(g,function(b){n.$name!==b&&(q(a,u),n.$$parentForm.$$renameControl(n,b),q=c(n.$name),q(a,n))}));d.on("$destroy",function(){n.$$parentForm.$removeControl(n);q(a,u);S(n,Kb)})}}}}}]},ne=Qd(),Ae=Qd(!0),xg=/^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/,Gg=/^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,Hg=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
Ig=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,Rd=/^(\d{4,})-(\d{2})-(\d{2})$/,Sd=/^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,nc=/^(\d{4,})-W(\d\d)$/,Td=/^(\d{4,})-(\d\d)$/,Ud=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Jd=V();q(["date","datetime-local","month","time","week"],function(a){Jd[a]=!0});var Vd={text:function(a,b,d,c,e,f){mb(a,b,d,c,e,f);lc(c)},date:nb("date",Rd,Mb(Rd,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":nb("datetimelocal",Sd,Mb(Sd,"yyyy MM dd HH mm ss sss".split(" ")),
"yyyy-MM-ddTHH:mm:ss.sss"),time:nb("time",Ud,Mb(Ud,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:nb("week",nc,function(a,b){if(fa(a))return a;if(y(a)){nc.lastIndex=0;var d=nc.exec(a);if(d){var c=+d[1],e=+d[2],f=d=0,g=0,h=0,k=Fd(c),e=7*(e-1);b&&(d=b.getHours(),f=b.getMinutes(),g=b.getSeconds(),h=b.getMilliseconds());return new Date(c,0,k.getDate()+e,d,f,g,h)}}return NaN},"yyyy-Www"),month:nb("month",Td,Mb(Td,["yyyy","MM"]),"yyyy-MM"),number:function(a,b,d,c,e,f){Kd(a,b,d,c);mb(a,b,d,c,e,f);c.$$parserName=
"number";c.$parsers.push(function(a){return c.$isEmpty(a)?null:Ig.test(a)?parseFloat(a):u});c.$formatters.push(function(a){if(!c.$isEmpty(a)){if(!R(a))throw ob("numfmt",a);a=a.toString()}return a});if(A(d.min)||d.ngMin){var g;c.$validators.min=function(a){return c.$isEmpty(a)||z(g)||a>=g};d.$observe("min",function(a){A(a)&&!R(a)&&(a=parseFloat(a,10));g=R(a)&&!isNaN(a)?a:u;c.$validate()})}if(A(d.max)||d.ngMax){var h;c.$validators.max=function(a){return c.$isEmpty(a)||z(h)||a<=h};d.$observe("max",function(a){A(a)&&
!R(a)&&(a=parseFloat(a,10));h=R(a)&&!isNaN(a)?a:u;c.$validate()})}},url:function(a,b,d,c,e,f){mb(a,b,d,c,e,f);lc(c);c.$$parserName="url";c.$validators.url=function(a,b){var d=a||b;return c.$isEmpty(d)||Gg.test(d)}},email:function(a,b,d,c,e,f){mb(a,b,d,c,e,f);lc(c);c.$$parserName="email";c.$validators.email=function(a,b){var d=a||b;return c.$isEmpty(d)||Hg.test(d)}},radio:function(a,b,d,c){z(d.name)&&b.attr("name",++qb);b.on("click",function(a){b[0].checked&&c.$setViewValue(d.value,a&&a.type)});c.$render=
function(){b[0].checked=d.value==c.$viewValue};d.$observe("value",c.$render)},checkbox:function(a,b,d,c,e,f,g,h){var k=Ld(h,a,"ngTrueValue",d.ngTrueValue,!0),l=Ld(h,a,"ngFalseValue",d.ngFalseValue,!1);b.on("click",function(a){c.$setViewValue(b[0].checked,a&&a.type)});c.$render=function(){b[0].checked=c.$viewValue};c.$isEmpty=function(a){return!1===a};c.$formatters.push(function(a){return na(a,k)});c.$parsers.push(function(a){return a?k:l})},hidden:E,button:E,submit:E,reset:E,file:E},Dc=["$browser",
"$sniffer","$filter","$parse",function(a,b,d,c){return{restrict:"E",require:["?ngModel"],link:{pre:function(e,f,g,h){h[0]&&(Vd[N(g.type)]||Vd.text)(e,f,g,h[0],b,a,d,c)}}}}],Jg=/^(true|false|\d+)$/,Se=function(){return{restrict:"A",priority:100,compile:function(a,b){return Jg.test(b.ngValue)?function(a,b,e){e.$set("value",a.$eval(e.ngValue))}:function(a,b,e){a.$watch(e.ngValue,function(a){e.$set("value",a)})}}}},se=["$compile",function(a){return{restrict:"AC",compile:function(b){a.$$addBindingClass(b);
return function(b,c,e){a.$$addBindingInfo(c,e.ngBind);c=c[0];b.$watch(e.ngBind,function(a){c.textContent=z(a)?"":a})}}}}],ue=["$interpolate","$compile",function(a,b){return{compile:function(d){b.$$addBindingClass(d);return function(c,d,f){c=a(d.attr(f.$attr.ngBindTemplate));b.$$addBindingInfo(d,c.expressions);d=d[0];f.$observe("ngBindTemplate",function(a){d.textContent=z(a)?"":a})}}}}],te=["$sce","$parse","$compile",function(a,b,d){return{restrict:"A",compile:function(c,e){var f=b(e.ngBindHtml),g=
b(e.ngBindHtml,function(a){return(a||"").toString()});d.$$addBindingClass(c);return function(b,c,e){d.$$addBindingInfo(c,e.ngBindHtml);b.$watch(g,function(){c.html(a.getTrustedHtml(f(b))||"")})}}}}],Re=da({restrict:"A",require:"ngModel",link:function(a,b,d,c){c.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),ve=mc("",!0),xe=mc("Odd",0),we=mc("Even",1),ye=Na({compile:function(a,b){b.$set("ngCloak",u);a.removeClass("ng-cloak")}}),ze=[function(){return{restrict:"A",scope:!0,controller:"@",
priority:500}}],Ic={},Kg={blur:!0,focus:!0};q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var b=ya("ng-"+a);Ic[b]=["$parse","$rootScope",function(d,c){return{restrict:"A",compile:function(e,f){var g=d(f[b],null,!0);return function(b,d){d.on(a,function(d){var e=function(){g(b,{$event:d})};Kg[a]&&c.$$phase?b.$evalAsync(e):b.$apply(e)})}}}}]});var Ce=["$animate","$compile",function(a,
b){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(d,c,e,f,g){var h,k,l;d.$watch(e.ngIf,function(d){d?k||g(function(d,f){k=f;d[d.length++]=b.$$createComment("end ngIf",e.ngIf);h={clone:d};a.enter(d,c.parent(),c)}):(l&&(l.remove(),l=null),k&&(k.$destroy(),k=null),h&&(l=ub(h.clone),a.leave(l).then(function(){l=null}),h=null))})}}}],De=["$templateRequest","$anchorScroll","$animate",function(a,b,d){return{restrict:"ECA",priority:400,terminal:!0,
transclude:"element",controller:ea.noop,compile:function(c,e){var f=e.ngInclude||e.src,g=e.onload||"",h=e.autoscroll;return function(c,e,m,n,p){var q=0,s,x,r,w=function(){x&&(x.remove(),x=null);s&&(s.$destroy(),s=null);r&&(d.leave(r).then(function(){x=null}),x=r,r=null)};c.$watch(f,function(f){var m=function(){!A(h)||h&&!c.$eval(h)||b()},t=++q;f?(a(f,!0).then(function(a){if(!c.$$destroyed&&t===q){var b=c.$new();n.template=a;a=p(b,function(a){w();d.enter(a,null,e).then(m)});s=b;r=a;s.$emit("$includeContentLoaded",
f);c.$eval(g)}},function(){c.$$destroyed||t!==q||(w(),c.$emit("$includeContentError",f))}),c.$emit("$includeContentRequested",f)):(w(),n.template=null)})}}}}],Ue=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(b,d,c,e){ka.call(d[0]).match(/SVG/)?(d.empty(),a(Lc(e.template,P).childNodes)(b,function(a){d.append(a)},{futureParentElement:d})):(d.html(e.template),a(d.contents())(b))}}}],Ee=Na({priority:450,compile:function(){return{pre:function(a,b,d){a.$eval(d.ngInit)}}}}),
Qe=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,b,d,c){var e=b.attr(d.$attr.ngList)||", ",f="false"!==d.ngTrim,g=f?W(e):e;c.$parsers.push(function(a){if(!z(a)){var b=[];a&&q(a.split(g),function(a){a&&b.push(f?W(a):a)});return b}});c.$formatters.push(function(a){return M(a)?a.join(e):u});c.$isEmpty=function(a){return!a||!a.length}}}},pb="ng-valid",Md="ng-invalid",Xa="ng-pristine",Lb="ng-dirty",Od="ng-pending",ob=O("ngModel"),Lg=["$scope","$exceptionHandler","$attrs",
"$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,b,d,c,e,f,g,h,k,l){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=u;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=u;this.$name=l(d.name||"",!1)(a);this.$$parentForm=Kb;var m=e(d.ngModel),
n=m.assign,p=m,s=n,y=null,x,r=this;this.$$setOptions=function(a){if((r.$options=a)&&a.getterSetter){var b=e(d.ngModel+"()"),f=e(d.ngModel+"($$$p)");p=function(a){var c=m(a);D(c)&&(c=b(a));return c};s=function(a,b){D(m(a))?f(a,{$$$p:b}):n(a,b)}}else if(!m.assign)throw ob("nonassign",d.ngModel,wa(c));};this.$render=E;this.$isEmpty=function(a){return z(a)||""===a||null===a||a!==a};this.$$updateEmptyClasses=function(a){r.$isEmpty(a)?(f.removeClass(c,"ng-not-empty"),f.addClass(c,"ng-empty")):(f.removeClass(c,
"ng-empty"),f.addClass(c,"ng-not-empty"))};var w=0;Id({ctrl:this,$element:c,set:function(a,b){a[b]=!0},unset:function(a,b){delete a[b]},$animate:f});this.$setPristine=function(){r.$dirty=!1;r.$pristine=!0;f.removeClass(c,Lb);f.addClass(c,Xa)};this.$setDirty=function(){r.$dirty=!0;r.$pristine=!1;f.removeClass(c,Xa);f.addClass(c,Lb);r.$$parentForm.$setDirty()};this.$setUntouched=function(){r.$touched=!1;r.$untouched=!0;f.setClass(c,"ng-untouched","ng-touched")};this.$setTouched=function(){r.$touched=
!0;r.$untouched=!1;f.setClass(c,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){g.cancel(y);r.$viewValue=r.$$lastCommittedViewValue;r.$render()};this.$validate=function(){if(!R(r.$modelValue)||!isNaN(r.$modelValue)){var a=r.$$rawModelValue,b=r.$valid,c=r.$modelValue,d=r.$options&&r.$options.allowInvalid;r.$$runValidators(a,r.$$lastCommittedViewValue,function(e){d||b===e||(r.$modelValue=e?a:u,r.$modelValue!==c&&r.$$writeModelToScope())})}};this.$$runValidators=function(a,b,c){function d(){var c=
!0;q(r.$validators,function(d,e){var g=d(a,b);c=c&&g;f(e,g)});return c?!0:(q(r.$asyncValidators,function(a,b){f(b,null)}),!1)}function e(){var c=[],d=!0;q(r.$asyncValidators,function(e,g){var h=e(a,b);if(!h||!D(h.then))throw ob("nopromise",h);f(g,u);c.push(h.then(function(){f(g,!0)},function(){d=!1;f(g,!1)}))});c.length?k.all(c).then(function(){g(d)},E):g(!0)}function f(a,b){h===w&&r.$setValidity(a,b)}function g(a){h===w&&c(a)}w++;var h=w;(function(){var a=r.$$parserName||"parse";if(z(x))f(a,null);
else return x||(q(r.$validators,function(a,b){f(b,null)}),q(r.$asyncValidators,function(a,b){f(b,null)})),f(a,x),x;return!0})()?d()?e():g(!1):g(!1)};this.$commitViewValue=function(){var a=r.$viewValue;g.cancel(y);if(r.$$lastCommittedViewValue!==a||""===a&&r.$$hasNativeValidators)r.$$updateEmptyClasses(a),r.$$lastCommittedViewValue=a,r.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var b=r.$$lastCommittedViewValue;if(x=z(b)?u:!0)for(var c=0;c<r.$parsers.length;c++)if(b=
r.$parsers[c](b),z(b)){x=!1;break}R(r.$modelValue)&&isNaN(r.$modelValue)&&(r.$modelValue=p(a));var d=r.$modelValue,e=r.$options&&r.$options.allowInvalid;r.$$rawModelValue=b;e&&(r.$modelValue=b,r.$modelValue!==d&&r.$$writeModelToScope());r.$$runValidators(b,r.$$lastCommittedViewValue,function(a){e||(r.$modelValue=a?b:u,r.$modelValue!==d&&r.$$writeModelToScope())})};this.$$writeModelToScope=function(){s(a,r.$modelValue);q(r.$viewChangeListeners,function(a){try{a()}catch(c){b(c)}})};this.$setViewValue=
function(a,b){r.$viewValue=a;r.$options&&!r.$options.updateOnDefault||r.$$debounceViewValueCommit(b)};this.$$debounceViewValueCommit=function(b){var c=0,d=r.$options;d&&A(d.debounce)&&(d=d.debounce,R(d)?c=d:R(d[b])?c=d[b]:R(d["default"])&&(c=d["default"]));g.cancel(y);c?y=g(function(){r.$commitViewValue()},c):h.$$phase?r.$commitViewValue():a.$apply(function(){r.$commitViewValue()})};a.$watch(function(){var b=p(a);if(b!==r.$modelValue&&(r.$modelValue===r.$modelValue||b===b)){r.$modelValue=r.$$rawModelValue=
b;x=u;for(var c=r.$formatters,d=c.length,e=b;d--;)e=c[d](e);r.$viewValue!==e&&(r.$$updateEmptyClasses(e),r.$viewValue=r.$$lastCommittedViewValue=e,r.$render(),r.$$runValidators(b,e,E))}return b})}],Pe=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:Lg,priority:1,compile:function(b){b.addClass(Xa).addClass("ng-untouched").addClass(pb);return{pre:function(a,b,e,f){var g=f[0];b=f[1]||g.$$parentForm;g.$$setOptions(f[2]&&f[2].$options);b.$addControl(g);
e.$observe("name",function(a){g.$name!==a&&g.$$parentForm.$$renameControl(g,a)});a.$on("$destroy",function(){g.$$parentForm.$removeControl(g)})},post:function(b,c,e,f){var g=f[0];if(g.$options&&g.$options.updateOn)c.on(g.$options.updateOn,function(a){g.$$debounceViewValueCommit(a&&a.type)});c.on("blur",function(){g.$touched||(a.$$phase?b.$evalAsync(g.$setTouched):b.$apply(g.$setTouched))})}}}}}],Mg=/(\s+|^)default(\s+|$)/,Te=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,
b){var d=this;this.$options=pa(a.$eval(b.ngModelOptions));A(this.$options.updateOn)?(this.$options.updateOnDefault=!1,this.$options.updateOn=W(this.$options.updateOn.replace(Mg,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},Fe=Na({terminal:!0,priority:1E3}),Ng=O("ngOptions"),Og=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
Ne=["$compile","$parse",function(a,b){function d(a,c,d){function e(a,b,c,d,f){this.selectValue=a;this.viewValue=b;this.label=c;this.group=d;this.disabled=f}function l(a){var b;if(!p&&za(a))b=a;else{b=[];for(var c in a)a.hasOwnProperty(c)&&"$"!==c.charAt(0)&&b.push(c)}return b}var m=a.match(Og);if(!m)throw Ng("iexp",a,wa(c));var n=m[5]||m[7],p=m[6];a=/ as /.test(m[0])&&m[1];var q=m[9];c=b(m[2]?m[1]:n);var s=a&&b(a)||c,x=q&&b(q),r=q?function(a,b){return x(d,b)}:function(a){return Ha(a)},w=function(a,
b){return r(a,y(a,b))},v=b(m[2]||m[1]),u=b(m[3]||""),t=b(m[4]||""),G=b(m[8]),C={},y=p?function(a,b){C[p]=b;C[n]=a;return C}:function(a){C[n]=a;return C};return{trackBy:q,getTrackByValue:w,getWatchables:b(G,function(a){var b=[];a=a||[];for(var c=l(a),e=c.length,f=0;f<e;f++){var g=a===c?f:c[f],k=a[g],g=y(k,g),k=r(k,g);b.push(k);if(m[2]||m[1])k=v(d,g),b.push(k);m[4]&&(g=t(d,g),b.push(g))}return b}),getOptions:function(){for(var a=[],b={},c=G(d)||[],f=l(c),g=f.length,m=0;m<g;m++){var n=c===f?m:f[m],p=
y(c[n],n),x=s(d,p),n=r(x,p),C=v(d,p),A=u(d,p),p=t(d,p),x=new e(n,x,C,A,p);a.push(x);b[n]=x}return{items:a,selectValueMap:b,getOptionFromViewValue:function(a){return b[w(a)]},getViewValueFromOption:function(a){return q?ea.copy(a.viewValue):a.viewValue}}}}}var c=P.createElement("option"),e=P.createElement("optgroup");return{restrict:"A",terminal:!0,require:["select","ngModel"],link:{pre:function(a,b,c,d){d[0].registerOption=E},post:function(b,g,h,k){function l(a,b){a.element=b;b.disabled=a.disabled;
a.label!==b.label&&(b.label=a.label,b.textContent=a.label);a.value!==b.value&&(b.value=a.selectValue)}function m(a,b,c,d){b&&N(b.nodeName)===c?c=b:(c=d.cloneNode(!1),b?a.insertBefore(c,b):a.appendChild(c));return c}function n(a){for(var b;a;)b=a.nextSibling,Yb(a),a=b}function p(a){var b=w&&w[0],c=G&&G[0];if(b||c)for(;a&&(a===b||a===c||8===a.nodeType||"option"===oa(a)&&""===a.value);)a=a.nextSibling;return a}function s(){var a=C&&u.readValue();C=z.getOptions();var b={},d=g[0].firstChild;t&&g.prepend(w);
d=p(d);C.items.forEach(function(a){var f,h;A(a.group)?(f=b[a.group],f||(f=m(g[0],d,"optgroup",e),d=f.nextSibling,f.label=a.group,f=b[a.group]={groupElement:f,currentOptionElement:f.firstChild}),h=m(f.groupElement,f.currentOptionElement,"option",c),l(a,h),f.currentOptionElement=h.nextSibling):(h=m(g[0],d,"option",c),l(a,h),d=h.nextSibling)});Object.keys(b).forEach(function(a){n(b[a].currentOptionElement)});n(d);x.$render();if(!x.$isEmpty(a)){var f=u.readValue();(z.trackBy||r?na(a,f):a===f)||(x.$setViewValue(f),
x.$render())}}var u=k[0],x=k[1],r=h.multiple,w;k=0;for(var v=g.children(),y=v.length;k<y;k++)if(""===v[k].value){w=v.eq(k);break}var t=!!w,G=H(c.cloneNode(!1));G.val("?");var C,z=d(h.ngOptions,g,b);r?(x.$isEmpty=function(a){return!a||0===a.length},u.writeValue=function(a){C.items.forEach(function(a){a.element.selected=!1});a&&a.forEach(function(a){(a=C.getOptionFromViewValue(a))&&!a.disabled&&(a.element.selected=!0)})},u.readValue=function(){var a=g.val()||[],b=[];q(a,function(a){(a=C.selectValueMap[a])&&
!a.disabled&&b.push(C.getViewValueFromOption(a))});return b},z.trackBy&&b.$watchCollection(function(){if(M(x.$viewValue))return x.$viewValue.map(function(a){return z.getTrackByValue(a)})},function(){x.$render()})):(u.writeValue=function(a){var b=C.getOptionFromViewValue(a);b&&!b.disabled?(g[0].value!==b.selectValue&&(G.remove(),t||w.remove(),g[0].value=b.selectValue,b.element.selected=!0),b.element.setAttribute("selected","selected")):null===a||t?(G.remove(),t||g.prepend(w),g.val(""),w.prop("selected",
!0),w.attr("selected",!0)):(t||w.remove(),g.prepend(G),g.val("?"),G.prop("selected",!0),G.attr("selected",!0))},u.readValue=function(){var a=C.selectValueMap[g.val()];return a&&!a.disabled?(t||w.remove(),G.remove(),C.getViewValueFromOption(a)):null},z.trackBy&&b.$watch(function(){return z.getTrackByValue(x.$viewValue)},function(){x.$render()}));t?(w.remove(),a(w)(b),w.removeClass("ng-scope")):w=H(c.cloneNode(!1));s();b.$watchCollection(z.getWatchables,s)}}}}],Ge=["$locale","$interpolate","$log",function(a,
b,d){var c=/{}/g,e=/^when(Minus)?(.+)$/;return{link:function(f,g,h){function k(a){g.text(a||"")}var l=h.count,m=h.$attr.when&&g.attr(h.$attr.when),n=h.offset||0,p=f.$eval(m)||{},s={},u=b.startSymbol(),x=b.endSymbol(),r=u+l+"-"+n+x,w=ea.noop,v;q(h,function(a,b){var c=e.exec(b);c&&(c=(c[1]?"-":"")+N(c[2]),p[c]=g.attr(h.$attr[b]))});q(p,function(a,d){s[d]=b(a.replace(c,r))});f.$watch(l,function(b){var c=parseFloat(b),e=isNaN(c);e||c in p||(c=a.pluralCat(c-n));c===v||e&&R(v)&&isNaN(v)||(w(),e=s[c],z(e)?
(null!=b&&d.debug("ngPluralize: no rule defined for '"+c+"' in "+m),w=E,k()):w=f.$watch(e,k),v=c)})}}}],He=["$parse","$animate","$compile",function(a,b,d){var c=O("ngRepeat"),e=function(a,b,c,d,e,m,n){a[c]=d;e&&(a[e]=m);a.$index=b;a.$first=0===b;a.$last=b===n-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(b&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var h=g.ngRepeat,k=d.$$createComment("end ngRepeat",h),l=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
if(!l)throw c("iexp",h);var m=l[1],n=l[2],p=l[3],s=l[4],l=m.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);if(!l)throw c("iidexp",m);var y=l[3]||l[1],x=l[2];if(p&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(p)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(p)))throw c("badident",p);var r,w,v,z,t={$id:Ha};s?r=a(s):(v=function(a,b){return Ha(b)},z=function(a){return a});return function(a,d,f,g,l){r&&(w=function(b,c,d){x&&(t[x]=b);t[y]=c;t.$index=
d;return r(a,t)});var m=V();a.$watchCollection(n,function(f){var g,n,r=d[0],s,t=V(),A,E,H,D,I,F,J;p&&(a[p]=f);if(za(f))I=f,n=w||v;else for(J in n=w||z,I=[],f)va.call(f,J)&&"$"!==J.charAt(0)&&I.push(J);A=I.length;J=Array(A);for(g=0;g<A;g++)if(E=f===I?g:I[g],H=f[E],D=n(E,H,g),m[D])F=m[D],delete m[D],t[D]=F,J[g]=F;else{if(t[D])throw q(J,function(a){a&&a.scope&&(m[a.id]=a)}),c("dupes",h,D,H);J[g]={id:D,scope:u,clone:u};t[D]=!0}for(s in m){F=m[s];D=ub(F.clone);b.leave(D);if(D[0].parentNode)for(g=0,n=D.length;g<
n;g++)D[g].$$NG_REMOVED=!0;F.scope.$destroy()}for(g=0;g<A;g++)if(E=f===I?g:I[g],H=f[E],F=J[g],F.scope){s=r;do s=s.nextSibling;while(s&&s.$$NG_REMOVED);F.clone[0]!=s&&b.move(ub(F.clone),null,r);r=F.clone[F.clone.length-1];e(F.scope,g,y,H,x,E,A)}else l(function(a,c){F.scope=c;var d=k.cloneNode(!1);a[a.length++]=d;b.enter(a,null,r);r=d;F.clone=a;t[F.id]=F;e(F.scope,g,y,H,x,E,A)});m=t})}}}}],Ie=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngShow,function(b){a[b?
"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Be=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngHide,function(b){a[b?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Je=Na(function(a,b,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&q(d,function(a,c){b.css(c,"")});a&&b.css(a)},!0)}),Ke=["$animate","$compile",function(a,b){return{require:"ngSwitch",controller:["$scope",function(){this.cases={}}],
link:function(d,c,e,f){var g=[],h=[],k=[],l=[],m=function(a,b){return function(){a.splice(b,1)}};d.$watch(e.ngSwitch||e.on,function(c){var d,e;d=0;for(e=k.length;d<e;++d)a.cancel(k[d]);d=k.length=0;for(e=l.length;d<e;++d){var s=ub(h[d].clone);l[d].$destroy();(k[d]=a.leave(s)).then(m(k,d))}h.length=0;l.length=0;(g=f.cases["!"+c]||f.cases["?"])&&q(g,function(c){c.transclude(function(d,e){l.push(e);var f=c.element;d[d.length++]=b.$$createComment("end ngSwitchWhen");h.push({clone:d});a.enter(d,f.parent(),
f)})})})}}}],Le=Na({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){c.cases["!"+d.ngSwitchWhen]=c.cases["!"+d.ngSwitchWhen]||[];c.cases["!"+d.ngSwitchWhen].push({transclude:e,element:b})}}),Me=Na({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){c.cases["?"]=c.cases["?"]||[];c.cases["?"].push({transclude:e,element:b})}}),Pg=O("ngTransclude"),Oe=Na({restrict:"EAC",link:function(a,b,d,c,e){d.ngTransclude===
d.$attr.ngTransclude&&(d.ngTransclude="");if(!e)throw Pg("orphan",wa(b));e(function(a){a.length&&(b.empty(),b.append(a))},null,d.ngTransclude||d.ngTranscludeSlot)}}),oe=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(b,d){"text/ng-template"==d.type&&a.put(d.id,b[0].text)}}}],Qg={$setViewValue:E,$render:E},Rg=["$element","$scope",function(a,b){var d=this,c=new Ua;d.ngModelCtrl=Qg;d.unknownOption=H(P.createElement("option"));d.renderUnknownOption=function(b){b="? "+Ha(b)+
" ?";d.unknownOption.val(b);a.prepend(d.unknownOption);a.val(b)};b.$on("$destroy",function(){d.renderUnknownOption=E});d.removeUnknownOption=function(){d.unknownOption.parent()&&d.unknownOption.remove()};d.readValue=function(){d.removeUnknownOption();return a.val()};d.writeValue=function(b){d.hasOption(b)?(d.removeUnknownOption(),a.val(b),""===b&&d.emptyOption.prop("selected",!0)):null==b&&d.emptyOption?(d.removeUnknownOption(),a.val("")):d.renderUnknownOption(b)};d.addOption=function(a,b){if(8!==
b[0].nodeType){Ta(a,'"option value"');""===a&&(d.emptyOption=b);var g=c.get(a)||0;c.put(a,g+1);d.ngModelCtrl.$render();b[0].hasAttribute("selected")&&(b[0].selected=!0)}};d.removeOption=function(a){var b=c.get(a);b&&(1===b?(c.remove(a),""===a&&(d.emptyOption=u)):c.put(a,b-1))};d.hasOption=function(a){return!!c.get(a)};d.registerOption=function(a,b,c,h,k){if(h){var l;c.$observe("value",function(a){A(l)&&d.removeOption(l);l=a;d.addOption(a,b)})}else k?a.$watch(k,function(a,e){c.$set("value",a);e!==
a&&d.removeOption(e);d.addOption(a,b)}):d.addOption(c.value,b);b.on("$destroy",function(){d.removeOption(c.value);d.ngModelCtrl.$render()})}}],pe=function(){return{restrict:"E",require:["select","?ngModel"],controller:Rg,priority:1,link:{pre:function(a,b,d,c){var e=c[1];if(e){var f=c[0];f.ngModelCtrl=e;b.on("change",function(){a.$apply(function(){e.$setViewValue(f.readValue())})});if(d.multiple){f.readValue=function(){var a=[];q(b.find("option"),function(b){b.selected&&a.push(b.value)});return a};
f.writeValue=function(a){var c=new Ua(a);q(b.find("option"),function(a){a.selected=A(c.get(a.value))})};var g,h=NaN;a.$watch(function(){h!==e.$viewValue||na(g,e.$viewValue)||(g=ia(e.$viewValue),e.$render());h=e.$viewValue});e.$isEmpty=function(a){return!a||0===a.length}}}},post:function(a,b,d,c){var e=c[1];if(e){var f=c[0];e.$render=function(){f.writeValue(e.$viewValue)}}}}}},re=["$interpolate",function(a){return{restrict:"E",priority:100,compile:function(b,d){if(A(d.value))var c=a(d.value,!0);else{var e=
a(b.text(),!0);e||d.$set("value",b.text())}return function(a,b,d){var k=b.parent();(k=k.data("$selectController")||k.parent().data("$selectController"))&&k.registerOption(a,b,d,c,e)}}}}],qe=da({restrict:"E",terminal:!1}),Fc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){c&&(d.required=!0,c.$validators.required=function(a,b){return!d.required||!c.$isEmpty(b)},d.$observe("required",function(){c.$validate()}))}}},Ec=function(){return{restrict:"A",require:"?ngModel",link:function(a,
b,d,c){if(c){var e,f=d.ngPattern||d.pattern;d.$observe("pattern",function(a){y(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw O("ngPattern")("noregexp",f,a,wa(b));e=a||u;c.$validate()});c.$validators.pattern=function(a,b){return c.$isEmpty(b)||z(e)||e.test(b)}}}}},Hc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e=-1;d.$observe("maxlength",function(a){a=Y(a);e=isNaN(a)?-1:a;c.$validate()});c.$validators.maxlength=function(a,b){return 0>e||c.$isEmpty(b)||
b.length<=e}}}}},Gc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e=0;d.$observe("minlength",function(a){e=Y(a)||0;c.$validate()});c.$validators.minlength=function(a,b){return c.$isEmpty(b)||b.length>=e}}}}};T.angular.bootstrap?T.console&&console.log("WARNING: Tried to load angular more than once."):(he(),je(ea),ea.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM",
"PM"],DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"],FIRSTDAYOFWEEK:6,MONTH:"January February March April May June July August September October November December".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),STANDALONEMONTH:"January February March April May June July August September October November December".split(" "),WEEKENDRANGE:[5,
6],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",medium:"MMM d, y h:mm:ss a",mediumDate:"MMM d, y",mediumTime:"h:mm:ss a","short":"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-\u00a4",negSuf:"",posPre:"\u00a4",posSuf:""}]},id:"en-us",localeID:"en_US",pluralCat:function(a,
c){var e=a|0,f=c;u===f&&(f=Math.min(b(a),3));Math.pow(10,f);return 1==e&&0==f?"one":"other"}})}]),H(P).ready(function(){de(P,yc)}))})(window,document);!window.angular.$$csp().noInlineStyle&&window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"), require("path"), require("websocket"), require("adm-zip"), require("child_process"), require("http"), require("https"), require("mkdirp"), require("net"), require("os"), require("request"), require("url"));
	else if(typeof define === 'function' && define.amd)
		define("spe", ["fs", "path", "websocket", "adm-zip", "child_process", "http", "https", "mkdirp", "net", "os", "request", "url"], factory);
	else if(typeof exports === 'object')
		exports["spe"] = factory(require("fs"), require("path"), require("websocket"), require("adm-zip"), require("child_process"), require("http"), require("https"), require("mkdirp"), require("net"), require("os"), require("request"), require("url"));
	else
		root["spe"] = factory(root["fs"], root["path"], root["websocket"], root["adm-zip"], root["child_process"], root["http"], root["https"], root["mkdirp"], root["net"], root["os"], root["request"], root["url"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_34__, __WEBPACK_EXTERNAL_MODULE_35__, __WEBPACK_EXTERNAL_MODULE_63__, __WEBPACK_EXTERNAL_MODULE_64__, __WEBPACK_EXTERNAL_MODULE_65__, __WEBPACK_EXTERNAL_MODULE_66__, __WEBPACK_EXTERNAL_MODULE_67__, __WEBPACK_EXTERNAL_MODULE_68__, __WEBPACK_EXTERNAL_MODULE_69__, __WEBPACK_EXTERNAL_MODULE_70__, __WEBPACK_EXTERNAL_MODULE_71__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 72);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifyconfig": 3
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 2;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

/**
 * Spaceify configuration, 28.1.2016 Spaceify Oy
 *
 * @class SpaceifyConfig
 */

function SpaceifyConfig()
{
var self = this;

self.initialize = function(mode_)
	{
	var i, file, configs;
	var mode = (typeof mode_ !== "undefined" ? mode_ : "");

	if(mode == "webpack" || typeof window === "undefined")								// webpack or Node.js
		{
		if(mode == "webpack")
			file = __webpack_require__(0).readFileSync(__dirname + "/config.json", "utf8");
		else
			file = __webpack_require__(0).readFileSync("/var/lib/spaceify/code/config.json", "utf8");

		configs = JSON.parse(file);

		for(i in configs)
			self[i] = configs[i];
		}
	else																				// Webpage
		{
		for(i in window.speconfig)
			self[i] = window.speconfig[i];
		}

	if(mode == "realpaths")																// Node.js and post-processing
		self.makeRealApplicationPaths();

	return self;
	}

self.get = function(c)
	{
	return (c in self ? self[c] : null);
	}

self.toMinifiedJSONString = function()
	{
	var str = "", config = "";

	for(var c in self)
		{
		if(typeof self[c] !== "function" && typeof self[c] !== "object")
			{
			config = self[c];

			if(typeof config === "string")
				config = config.replace(/\\/g, "\\\\");

			str += (str != "" ? "," : "") + '"' + c + '":"' + config + '"';
			}
		}

	return "{" + str + "}";
	}

self.makeRealApplicationPaths = function()
	{ // To make application development easier, the configuration paths are made to point to the real directories on the edge computer.
	  // After running this method the applications outside and inside Spaceify / docker containers is identical.
	if(typeof window !== "undefined")
		return;

	var manifest;
	var pathParts;
	var volumePath;
	var cwd = process.cwd();

	var SpaceifyUnique = __webpack_require__(21);
	var unique = new SpaceifyUnique();

	self["API_PATH"] = self["SPACEIFY_CODE_PATH"];
	self["API_WWW_PATH"] = self["SPACEIFY_WWW_PATH"];
	self["API_NODE_MODULES_DIRECTORY"] = self["SPACEIFY_NODE_MODULES_PATH"];

	pathParts = cwd.split("/");

	if(pathParts[pathParts.length - 1] == self["APPLICATION_ROOT"])
		{
		manifest = getManifest(cwd);

			// Application path with manifest -> cwd is most likely a real application directory
		if(manifest)
			{
			volumePath = cwd.replace("/" + self["APPLICATION_ROOT"], "/");

			self["VOLUME_PATH"] = volumePath;
			self["VOLUME_TLS_PATH"] = volumePath + self["TLS_DIRECTORY"];
			self["VOLUME_APPLICATION_PATH"] = volumePath + self["APPLICATION_DIRECTORY"];
			self["VOLUME_APPLICATION_WWW_PATH"] = volumePath + self["APPLICATION_DIRECTORY"] + self["WWW_DIRECTORY"];
			}
		}
	else
		{
		// Not an application path -> lets handle it as volume directory
		volumePath = cwd + "/";

		manifest = getManifest(cwd);

			// External application such as native application or debug mode application
		if(manifest)
			{
				// Lets assume all the necessary directories are in the current working directory
			self["VOLUME_PATH"] = volumePath;
			self["VOLUME_APPLICATION_PATH"] = volumePath;
			self["VOLUME_APPLICATION_WWW_PATH"] = volumePath + self["WWW_DIRECTORY"];

				// Lets assume there is an installed application and with certificate directory
			self["VOLUME_TLS_PATH"] = unique.getVolPath(manifest.type, manifest.unique_name, self) + self["VOLUME_TLS_PATH"];
			}
		}
	}

var getManifest = function(path)
	{
	var manifest = null;

	try {
		manifest = __webpack_require__(0).readFileSync(path + "/" + self["MANIFEST"], "utf8");

		manifest = JSON.parse(manifest);
		}
	catch(err)
		{
		}

	return manifest;
	}

}

SpaceifyConfig.getConfig = function(mode_)
	{
	var config = new SpaceifyConfig();

	return config.initialize(mode_);
	}

if(true)
	module.exports = SpaceifyConfig;

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 4;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

/**
 * Config, 2.3.2017 Spaceify Oy
 *
 * @class Config
 */

function Config()
{
var self = this;

//console.log("in Config::Config()");

var baseConfig = null;
var overridingConfig = null;
var config = null;
var path = null;

// Hack to use real require in webpack
var doRequire = function(module)
	{
	return eval("require")(module);
	};

// Load the default speconfig.js file and apply overrides in the order:
// 1. make base config global
// 2. module.parent.speconfig
// 3. "speconfig.js"
// 4. process.cwd()/speconfig.js

var globalObj = (typeof(window) === "undefined" ? global : window);

if (typeof globalObj.speBaseConfig_)
	{
	baseConfig = globalObj.speBaseConfig_;
	}

if (typeof window === "undefined") //in node.js
	{
	path = __webpack_require__(34);

	if (!baseConfig)
		{
		try	{
			var apipath = "/var/lib/spaceify/code/";
			baseConfig = doRequire(path.resolve(apipath, "spebaseconfig.js"));

			//console.log("Loaded base config from /var/lib/spaceify/code/");
			}
		catch (e)
			{
			baseConfig = __webpack_require__(10);

			//console.log("Loaded base config from the spaceifyedge package");
			}
		}

	if (!baseConfig)
		{
		//console.log("Error loading base config, exiting");

		process.exit(1);
		}

	// load and apply the overriding configs

	try	{
		overridingConfig = doRequire(module.parent.speconfig);
		Config.overrideConfigValues(baseConfig, overridingConfig);

		//console.log("Loaded overriding config from module.parent.speconfig");
		}
	catch (e)
		{}
	finally
		{
		try
			{
			overridingConfig = doRequire("speconfig");
			Config.overrideConfigValues(baseConfig, overridingConfig);

			//console.log("Loaded overriding config from \"speconfig\"");
			}
		catch (e)
			{}
		finally
			{
			try
				{
				//console.log("Trying to load overriding config from working directory "+process.cwd());

				overridingConfig = doRequire(path.resolve(process.cwd(), "speconfig.js"));
				Config.overrideConfigValues(baseConfig, overridingConfig);

				//console.log("Loaded overriding config from working directory");
				}
			catch (e)
				{
				//console.log(e);
				}
			finally
				{
				//console.log("Loading config files completed");
				}
			}
		}

	}
else if (typeof window !== "undefined")	//in browser
	{
	var lib = window;

	if (window.spe)	// browser using a bundled spaceifyedge
		{
		lib = window.spe;
		}

	if (!baseConfig)
		baseConfig = lib.SpeBaseConfig;

	if (lib.SpeConfig)
		Config.overrideConfigValues(baseConfig, lib.SpeConfig);
	
	if (lib !== window && window.SpConfig)
		Config.overrideConfigValues(baseConfig, window.SpConfig);
		
	}

/*
if (!baseConfig)						// Default configuration not found
	{
	config = {};
	}
else
	{
	config = {};

	// Apply configuration from webpack or window or nodejs config
	if(ConfigClass["defaultConfig"])							// Set defaultConfig as base
		config = ConfigLoader.overrideConfigValues(config, ConfigClass.defaultConfig);

	if (ConfigClass[class_])										// Class found
		config = ConfigLoader.overrideConfigValues(config, ConfigClass[class_]);

	if (ConfigClass["globalConfigOverride"])						// Global override
		config = ConfigLoader.overrideConfigValues(config, ConfigClass["globalConfigOverride"]);

	if(override_)												// User override (when calling this function)
		config = ConfigLoader.overrideConfigValues(config, override_);
	}
*/
//console.log("Config::Config() "+JSON.stringify(baseConfig));

globalObj.speBaseConfig_ = baseConfig;

self.getConfig = function()
	{
	return baseConfig;
	}

}

Config.overrideConfigValues = function(obj1, obj2)
	{
	for (var p in obj2)
		{
    	try
    		{
      		// Property in destination object set; update its value.
      		if ( obj2[p].constructor==Object )
      			{
        		obj1[p] = Config.overrideConfigValues(obj1[p], obj2[p]);
				}
			else
				{
        		obj1[p] = obj2[p];
				}
			}

    	catch(e)
    		{
      		// Property in destination object not set; create it and set its value.
      		obj1[p] = obj2[p];
			}
  		}

  	return obj1;
	};

/*
Config.overrideConfigValues = function(config, overridingValues)
	{
	var newConfig = config;

	for (var g in overridingValues)
		{
		if (overridingValues[g] !== null)
			newConfig[g] = overrideValues_[g];
		}
	return newConfig;
	};
*/
Config.destroySingleton = function()
	{
	var globalObj = null;

	if (typeof(window) === "undefined") //nodejs
		globalObj = global;
	else
		globalObj = window;

	globalObj.speConfigInstance_ = null;
	};

Config.getConfig = function()
	{
	var globalObj = null;

	if (typeof(window) === "undefined") //nodejs
		globalObj = global;
	else
		globalObj = window;

	if (!globalObj.speConfigInstance_)
		{
		globalObj.speConfigInstance_ = new Config();
		Object.freeze(globalObj.speConfigInstance_);
		}

	return globalObj.speConfigInstance_.getConfig();
	};

if(true)
	module.exports = Config;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(46)(module)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Logger, 18.12.2013 Spaceify Oy
 *
 * @class Logger
 */

function Logger(config, class_)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

self.RETURN		= 1;
var LOG			= "log";
var DIR			= "dir";
var INFO		= "info";
self.ERROR		= "error";
var ERROR = self.ERROR;
var WARN		= "warn";
self.FORCE		= "force";
var FORCE = self.FORCE;
var STDOUT		= "stdout";

	// Labels -- -- -- -- -- -- -- -- -- -- //
var labels = {};
labels[LOG]		= "[i] ";
labels[DIR]		= "[d] ";
labels[INFO]	= "[i] ";
labels[ERROR]	= "[e] ";
labels[WARN]	= "[w] ";
labels[FORCE]	= "";
labels[STDOUT]	= "";

var showLabels	= true;

	// -- -- -- -- -- -- -- -- -- -- //
var enabled = (config ? config : {});

// Local: enabled = true (default), not enabled = false
enabled[LOG]	= (typeof enabled[LOG] !== "undefined" ? enabled[LOG] : true);
enabled[DIR]	= (typeof enabled[DIR] !== "undefined"  ? enabled[DIR] : true);
enabled[INFO]	= (typeof enabled[INFO] !== "undefined"  ? enabled[INFO] : true);
enabled[ERROR]	= (typeof enabled[ERROR] !== "undefined"  ? enabled[ERROR] : true);
enabled[WARN]	= (typeof enabled[WARN] !== "undefined"  ? enabled[WARN] : true);
enabled[FORCE]	= true;
enabled[STDOUT]	= true;

	// -- -- -- -- -- -- -- -- -- -- //
self.log		= function() { out(LOG, false, arguments); }
self.dir		= function() { out(DIR, false, arguments); }
self.info		= function() { out(INFO, false, arguments); }
self.error		= function() { out(ERROR, false, arguments); }
self.warn		= function() { out(WARN, false, arguments); }
self.force		= function() { out(FORCE, false, arguments); }
self.stdout		= function() { out(STDOUT, true, arguments); }

	// -- -- -- -- -- -- -- -- -- -- //

var out = function(type, useStdout)
	{
	if (!enabled[type] && type != FORCE)
		return;

	var str = "";
	var strs = self.convertArguments(arguments[2]);
	var strp = null;

	for (var i = 0; i < strs.length; i++)							// Concatenate strings passed in the arguments, separate strings with space
		{
		strp = (typeof strs[i] == "string" ? strs[i] : JSON.stringify(strs[i]));
		str += (str != "" && str != "\n" && str != "\r" && str != "\r\n" ? " " : "") + strp;
		}

	if (type == ERROR)
		{
		str += new Error().stack;
		}

	str = str.replace(/[\x00-\x09\x0b-\x0c\x0e-\x1f]/g, "");		// Replace control characters 0-9, 11-12, 14-31

	if (!useStdout && showLabels)
		{
		var dateString = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

		str = dateString +" "+labels[type]+"["+class_+"] "+ str;
		}

	if (isNodeJs)
		{
		if (!useStdout)												// console.log prints new line
			console.log(str);
		else														// stdout.write doesn't
			process.stdout.write(str);
		}
	else
		{
		if (type == DIR && console.dir)
			console.dir(str);

		else if (type == ERROR && console.error)
			console.error(str);

		else if (type == INFO && console.info)
			console.info(str);

		else if (type == WARN && console.warn)
			console.warn(str);

		else
			console.log(str);
		}
	};

self.setOptions = function(options)
	{
	if (typeof options.enabled !== "undefined")
		{
		for (var type in options.enabled)
			{
			enabled[type] = options.enabled[type];
			}
		}

	if (typeof options.showLabels !== "undefined")
		showLabels = options.showLabels;
	};

self.clone = function(logger)
	{
	var enabled_ = logger.getEnabled();

	enabled[LOG]	= enabled_[LOG];
	enabled[DIR]	= enabled_[DIR];
	enabled[INFO]	= enabled_[INFO];
	enabled[ERROR]	= enabled_[ERROR];
	enabled[WARN]	= enabled_[WARN];
	};

self.getEnabled = function()
	{
	return enabled;
	};

/**
  * Clone the values from this instance of the logger to the global base configuration
  * => Other instance of the logger get the same values as this instance
  */
self.cloneInstanceToBaseConfiguration = function()
	{
	var iLogger;
	var globalObj = (typeof(window) === "undefined" ? global : window);

	if (globalObj.speBaseConfig_ && globalObj.speBaseConfig_.logger)
		{
		iLogger = globalObj.speBaseConfig_.logger;

		for (var i in iLogger)
			{
			if (i != class_)
				{
				iLogger[i][LOG]		= enabled[LOG];
				iLogger[i][DIR]		= enabled[DIR];
				iLogger[i][INFO]	= enabled[INFO];
				iLogger[i][ERROR]	= enabled[ERROR];
				iLogger[i][WARN]	= enabled[WARN];
				}
			}
		}
	};

/**
 * Convert arguments to array and sanitize empty arguments
 */
self.convertArguments = function()
	{
	var args;

	if (Object.keys(arguments[0]).length == 0)
		{
		args = [""];
		}
	else
		{
		args = Array.prototype.slice.call(arguments[0]);
		}

	return args;
	}

}

Logger.createLogger_ = function(class_)
	{
	//console.log("Logger::CreateLogger() creating new logger for "+class_);

	var lib;
	var Config;

	if (typeof window === "undefined")
		{
		try
			{
			Config = __webpack_require__(5);
			}
		catch (e)
			{
			var apipath = "/var/lib/spaceify/code/";
			Config = __webpack_require__(50)(apipath + "config.js");
			}
		}
	else if (typeof window !== "undefined")
		{
		lib = (window.spe ? window.spe : window);
		Config = (lib.Config ? lib.Config : null);
		}

	var config = Config.getConfig();

	//console.log("Logger::getLogger()" + JSON.stringify(config));

	var loggerConfig = {};

	// Get base config
	Config.overrideConfigValues(loggerConfig, config.logger.defaultLoggerConfig);

	// Override with class-specific properties

	if (config.logger.hasOwnProperty(class_))
		{
		Config.overrideConfigValues(loggerConfig, config.logger[class_]);
		}

	// Override with global override
	Config.overrideConfigValues(loggerConfig, config.logger.globalConfigOverride);

	// Apply the "all" keyword

	var all_ = (typeof loggerConfig.all !== "undefined" ? loggerConfig.all : null);

	if (all_ !== null)											// Class specific override
		{
		loggerConfig['log'] = all_;
		loggerConfig['dir'] = all_;
		loggerConfig['info'] = all_;
		loggerConfig['error'] = all_;
		loggerConfig['warn'] = all_;
		}

	return new Logger(loggerConfig, class_);
	};

Logger.getLogger = function(class_)
	{
	if (!class_)
		class_ = "mainlog";

	var globalObj = null;

	if (typeof(window) === "undefined") //nodejs
		globalObj = global;

	else
		globalObj = window;


	if (!globalObj.hasOwnProperty("speLoggerInstances_"))
		{
		globalObj["speLoggerInstances_"] = new Object();
		}

	if (!globalObj.speLoggerInstances_.hasOwnProperty(class_))
		{
		globalObj.speLoggerInstances_[class_] = Logger.createLogger_(class_);
		}

	return globalObj.speLoggerInstances_[class_];
	};

if (true)
	module.exports = Logger;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * SpaceifyError, 4.6.2014 Spaceify Oy
 *
 * Keep this class dependency free!!!
 *
 * @SpaceifyError
 */

function SpaceifyError(errObj)
{
var self = this;

self.path = (errObj && errObj.path ? errObj.path : "");
self.code = (errObj && errObj.code ? errObj.code : "");
self.message = (errObj && errObj.message ? errObj.message : "");

	// CONSTANTS -- -- -- -- -- -- -- -- -- -- //
var CODE_SEPARATOR = ", ";
var PATH_SEPARATOR = ", ";
var MESSAGE_SEPARATOR = " ";

	// PUBLIC METHODS -- -- -- -- -- -- -- -- -- -- //
self.set = function(err)
	{
	self.path = err.path || "";
	self.code = err.code || "";
	self.message = err.message || "";
	}

self.getAsObject = function()
	{
	return {code: self.code, codes: [self.code], message: self.message, messages: [self.message], path: self.path, paths: [self.path]};
	}

self.getMessage = function()
	{
	return self.message;
	}

self.getCode = function()
	{
	return self.code;
	}

self.getPath = function()
	{
	return self.path;
	}

self.pre = function(path)
	{
	self.path = path;

	// There might be additional error objects after the path in the arguments: [path, err, err, ...]
	var args = Array.prototype.slice.call(arguments);
	// Pass this error object first (replace path with it) then the additional error objects: [thisError, err, err, ...]
	args[0] = self.getAsObject();

	return self.make.apply(this, args);
	}

self.preFmt = function(path, params)
	{
	self.path = path;

	return self.makeFmt(self.getAsObject(), params);
	}

	// ERRORS -- -- -- -- -- -- -- -- -- -- //
self.make = function()
	{
	var i;
	var path = "", paths = [];
	var code = "", codes = [];
	var message = "", messages = [];

	for(i = 0; i < arguments.length; i++)													// More than one error can be passed in the arguments
		{
		var aobj = arguments[i];

		if(aobj.messages)																	// concat arrays of paths, codes and messages, of the same size, to en existing error array
			{
			paths = paths.concat(aobj.paths);
			codes = codes.concat(aobj.codes);
			messages = messages.concat(aobj.messages);
			}
		else																				// push single error object to error array
			{
			paths.push(aobj.path ? aobj.path : "");
			codes.push(aobj.code ? aobj.code : "");
			messages.push(aobj.message ? aobj.message : aobj.toString());
			}
		}

	for(i = 0; i < messages.length; i++)													// Make single message, code and path strings
		{
		if(codes[i])
			code += (code != "" ? CODE_SEPARATOR : "") + codes[i];

		if(paths[i])
			path += (path != "" ? PATH_SEPARATOR : "") + paths[i];

		message += (message != "" ? MESSAGE_SEPARATOR : "") + messages[i];
		}

	return { code: code, message: message, path: path, codes: codes, paths: paths, messages: messages };
	}

self.makeFmt = function(err, params)
	{ // Make formatted error. This method handles only one error object
	err.message = self.replace(err.message, params);

	if(err.messages && err.messages.length > 0)
		err.messages[0] = err.message;

	return self.make(err);
	}

self.makeErrorObject = function(code, message, path)
	{
	var code_ = (typeof code != "undefined" ? code : "");
	var path_ = (typeof path != "undefined" ? path : "");
	var message_ = (typeof message != "undefined" ? message : "");

	return {code: code_, codes: [code_], message: message_, messages: [message_], path: path_, paths: [path_]};
	}

self.errorFromObject = function(eobj)
	{
	if(typeof eobj == "string")
		eobj = JSON.parse(eobj);

	return self.make(self.makeErrorObject(eobj.code, eobj.message, eobj.path));
	}

self.typeToErrorObject = function(err)
	{
	if(!err)
		err = self.makeErrorObject("###", "###", "###");
	else if(typeof err == "string")
		err = self.makeErrorObject("", err, "");
	else if(!err.codes && !err.messages && !err.paths)
		err = self.make(err);

	return err;
	}

self.errorToString = function(err, printPath, printCode)
	{ // Format an error object to a displayable string
	var errstr = "", code = "", path = "", message = "";

	if(typeof err == "string")
		errstr += err;
	else if(err.message && !err.messages)
		errstr += err.message;
	else if(err.pop)	// err instanceof isArray
		{
		while(err.length > 0)
			errstr += (errstr != "" ? MESSAGE_SEPARATOR : "") + self.errorToString(err.shift());
		}
	else if(err.messages)
		{
		for(var i = 0; i < err.messages.length; i++)							// Make simple error and code strings of the error arrays
			{
			code = (printCode && err.codes[i] ? err.codes[i] : null);
			path = (printPath && err.paths[i] ? err.paths[i] : null);
			message = self.ucfirst(err.messages[i]);
			message = self.endWithDot(message);

			errstr += (errstr != "" ? " " : "");
			errstr += (path ? path : "");
			errstr += (code ? (path ? " - " : "") + code : "");
			errstr += (code || path ? " " : "") + message;
			}
		}

	return errstr;
	}

self.replace = function(str, strs, replaceWith)
	{ // Replace all occurances of named tilde prefixed, alphanumerical parameters (e.g. ~name, ~Name1) supplied in the strs object in the str.
	var rw = (replaceWith ? replaceWith : "");

	for(var i in strs)
		{
		if(typeof strs[i] == "undefined")							// Don't replace parameters with undefined values
			continue;

		str = str.replace(i, strs[i]);
		}
																	// Remove unused parameters to tidy up the string
	str = str.replace(/\s~[a-zA-Z0-9]*\s/g, " " + rw + " ");		// ' ~x ' -> ' y '
	str = str.replace(/~[a-zA-Z0-9]*\s/g, " " + rw + " ");			// '~x '  -> ' y '
	str = str.replace(/\s~[a-zA-Z0-9]*/g, rw);						// ' ~x'  -> 'y'
	str = str.replace(/~[a-zA-Z0-9]+/g, rw);						// '~x'   -> 'y'

	return str;
	}

self.ucfirst = function(str)
	{
	str = str.trim();
	return str.charAt(0).toUpperCase() + str.slice(1);
	}

self.endWithDot = function(str)
	{
	str = str.trim();
	if(str.charAt(str.length - 1) != ".")
		str += ".";

	return str;
	}

}

if(true)
	module.exports = SpaceifyError;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Logger wrapper for Spaceify edge, 5.4.2017 Spaceify Oy
 *
 * @class SpaceifyLogger
 */

function SpaceifyLogger(class_)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var Logger = null;
var SpaceifyError = null;

if (isNodeJs)
	{
	var apipath = "/var/lib/spaceify/code/";

	try { Logger = __webpack_require__(6); } catch (e) { Logger = __webpack_require__(52)(apipath + "logger"); }
	try { SpaceifyError = __webpack_require__(7); } catch (e) { SpaceifyError = __webpack_require__(13)(apipath + "spaceifyerror"); }
	}
else if (typeof window !== "undefined")
	{
	Logger = (window.Logger ? window.Logger : null);
	SpaceifyError = (window.SpaceifyError ? window.SpaceifyError : null);
	}

var errorc = new SpaceifyError();
var logger = Logger.getLogger(class_);

self.log		= function() { logger.log.apply(self, logger.convertArguments(arguments)); }
self.dir		= function() { logger.dir.apply(self, logger.convertArguments(arguments)); }
self.info		= function() { logger.info.apply(self, logger.convertArguments(arguments)); }
self.warn		= function() { logger.warnapply(self, logger.convertArguments(arguments)); }
self.force		= function() { logger.force.apply(self, logger.convertArguments(arguments)); }
self.stdout		= function() { logger.stdout.apply(self, logger.convertArguments(arguments)); }
self.error		= function(err, path, code, type)
	{
	var message = (errorc ? errorc.errorToString(err, path, code) : err);

	if (type == logger.ERROR)
		logger.error(logger.ERROR, false, [message]);
	else if (type == logger.FORCE)
		logger.force(message);

	return message;
	}

self.setOptions = function(options)
	{
	logger.setOptions(options);
	};

self.clone = function(logger_)
	{
	logger.setOptions(logger_);
	};

self.getEnabled = function()
	{
	return logger.getEnabled();
	};

self.cloneInstanceToBaseConfiguration = function()
	{
	logger.cloneInstanceToBaseConfiguration();
	};

}

if (true)
	module.exports = SpaceifyLogger;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify Service, 29.7.2015 Spaceify Oy
 *
 * A class for connecting required services and opening servers for provided services.
 * This class can be used by Node.js applications and web pages.
 *
 * @class SpaceifyService
 */

function SpaceifyService()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var fibrous = null;
var Service = null;
var Connection = null;
var SpaceifyCore = null;
var SpaceifyError = null;
var SpaceifyConfig = null;
var SpaceifyNetwork = null;
//var SpaceifyLogger = null;
var WebSocketRpcServer = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Service = __webpack_require__(53)(lib + "service");
	SpaceifyCore = __webpack_require__(30)(lib + "spaceifycore");
	SpaceifyError = __webpack_require__(13)(lib + "spaceifyerror");
	SpaceifyConfig = __webpack_require__(1)(lib + "spaceifyconfig");
	SpaceifyNetwork = __webpack_require__(54)(lib + "spaceifynetwork");
	//SpaceifyLogger = require(lib + "spaceifylogger");
	WebSocketRpcServer = __webpack_require__(57)(lib + "websocketrpcserver");
	Connection = __webpack_require__(29)(lib + "connection");
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	Service = lib.Service;
	SpaceifyCore = lib.SpaceifyCore;
	SpaceifyError = lib.SpaceifyError;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyNetwork = lib.SpaceifyNetwork;
	//SpaceifyLogger = lib.SpaceifyLogger;
	WebSocketRpcServer = null;
	Connection = lib.Connection;
	fibrous = function(fn) { return fn; };
	}

var core = new SpaceifyCore();
var errorc = new SpaceifyError();
var network = new SpaceifyNetwork();
var config = SpaceifyConfig.getConfig("realpaths");
//var logger = new SpaceifyLogger("SpaceifyService");

var required = {};									// <= Clients (required services)
var requiredSecure = {};

var provided = {};									// <= Servers (provided services)
var providedSecure = {};

var keepServerUp = true;
var keepConnectionUp = true;
var keepConnectionUpTimerIds = {};

var caCrt = config.SPACEIFY_CODE_PATH + config.SPACEIFY_CRT_WWW;
var key = config.VOLUME_TLS_PATH + config.SERVER_KEY;
var crt = config.VOLUME_TLS_PATH + config.SERVER_CRT;

var errobj = errorc.makeErrorObject("not_open", "Connection is not ready.", "SpaceifyService::connect");

	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// CLIENT SIDE - THE REQUIRED SERVICES - NODE.JS / WEB PAGES -- -- -- -- -- -- -- -- -- -- //
self.connect = function(serviceObj, isSecure, callback)
	{ // serviceObj = object (service object) or string (service name)
	var service_name = (typeof serviceObj === "object" ? serviceObj.service_name : serviceObj);

	if(service_name == config.HTTP)
		return callback(errobj, null);

	if(typeof isSecure === "function")										// From web page or not defined
		{
		callback = isSecure;
		isSecure = (isNodeJs ? false : network.isSecure());
		}
	else																	// Web page always checks the protocol
		{
		isSecure = (isNodeJs ? isSecure : network.isSecure());
		}

	open(serviceObj, (!isSecure ? required : requiredSecure), isSecure, callback);
	}

function open(serviceObj, service, isSecure, callback)
	{
	var port;
	var service_name = (typeof serviceObj === "object" ? serviceObj.service_name : serviceObj);

	if(!service[service_name])
		{
		service[service_name] = new Service(service_name, false, new Connection());
		service[service_name].setConnectionListener(connectionListener);
		service[service_name].setDisconnectionListener(disconnectionListener);
		}

	if(typeof serviceObj === "object")
		{
		port = (!isSecure ? serviceObj.port : serviceObj.securePort);

		connect(service[service_name], port, isSecure, function()
			{
			if(typeof callback === "function")
				callback(null, service[service_name]);
			});
		}
	else
		{
		core.getService(service_name, "", function(err, serviceObj)
			{
			if(!serviceObj || err)
				{
				if(!service[service_name].getIsOpen())											// Let the automaton get the connection up
					disconnectionListener(-1, service_name, isSecure);

				if(typeof callback === "function")
					callback(errobj, null);
				}
			else
				{
				port = (!isSecure ? serviceObj.port : serviceObj.securePort);

				connect(service[service_name], port, isSecure, function()
					{
					if(typeof callback === "function")
						callback(null, service[service_name]);
					});
				}
			});
		}
	}

var connect = function(service, port, isSecure, callback)
	{
	if(service.getIsOpen())																	// Don't reopen connections!
		return callback();

	service.getConnection().connect({ hostname: config.EDGE_HOSTNAME, port: port, isSecure: isSecure, caCrt: caCrt }, callback);
	}

self.disconnect = function(service_names, callback)
	{ // Disconnect one service, listed services or all services
	var keys;

	if(!service_names)																		// All the services
		keys = Object.keys(required);
	else if(service_name.constructor !== Array)												// One service (string)
		keys = [service_names];

	for(var i = 0; i<keys.length; i++)
		{
		if(keys[i] in required)
			required[keys[i]].getConnection().close();

		if(keys[i] in requiredSecure)
			requiredSecure[keys[i]].getConnection().close();
		}
	}

var connectionListener = function(id, service_name, isSecure)
	{
	}

var disconnectionListener = function(id, service_name, isSecure)
	{
	if(!keepConnectionUp)
		return;

	var timerIdName = service_name + (!isSecure ? "F" : "T");								// Services have their own timers and
	if(timerIdName in keepConnectionUpTimerIds)												// only one timer can be running at a time
		return;

	var service = (!isSecure ? required[service_name] : requiredSecure[service_name]);

	keepConnectionUpTimerIds[timerIdName] = setTimeout(waitConnectionAttempt, config.RECONNECT_WAIT, id, service_name, isSecure, timerIdName, service);
	}

var waitConnectionAttempt = function(id, service_name, isSecure, timerIdName, service)
	{
	core.getService(service_name, "", function(err, serviceObj)
		{
		delete keepConnectionUpTimerIds[timerIdName];										// Timer can now be retriggered

		if(serviceObj)
			connect(service, (!isSecure ? serviceObj.port : serviceObj.securePort), isSecure, function() {});
		else
			disconnectionListener(id, service_name, isSecure);
		});
	}

self.getRequiredService = function(service_name)
	{
	return (required[service_name] ? required[service_name] : null);
	}

self.getRequiredServiceSecure = function(service_name)
	{
	return (requiredSecure[service_name] ? requiredSecure[service_name] : null);
	}

self.keepConnectionUp = function(val)
	{
	keepConnectionUp = (typeof val == "boolean" ? val : false);
	}

	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// -- -- -- -- -- -- -- -- -- -- //
	// SERVER SIDE - THE PROVIDED SERVICES - NODE.JS -- -- -- -- -- -- -- -- -- -- //
self.listen = fibrous( function(service_name, unique_name, port, securePort, listenUnsecure, listenSecure)
	{
	if(typeof listenUnsecure == "undefined")
		listenUnsecure = true;

	if(typeof listenSecure == "undefined")
		listenSecure = true;

	if(!provided[service_name])																// Create the connection objects
		provided[service_name] = new Service(service_name, true, new WebSocketRpcServer());

	if(!providedSecure[service_name])
		providedSecure[service_name] = new Service(service_name, true, new WebSocketRpcServer());

	if(listenUnsecure)
		listen.sync(provided[service_name], port, false);

	if(listenSecure)
		listen.sync(providedSecure[service_name], securePort, true);

	if(!port || !securePort)
		{ // If port was null or 0 the real port number is known only after the server is listening
		if(listenUnsecure)
			port = provided[service_name].getServer().getPort();

		if(listenSecure)
			securePort = providedSecure[service_name].getServer().getPort();

		console.log("    LISTEN -----> " + service_name + " - port: " + port + ", secure port: " + securePort);
		}

	core.sync.registerService(service_name, {unique_name: unique_name, port: port, securePort: securePort});
	});

var listen = fibrous( function(service, port, isSecure)
	{
	if(service.getIsOpen())
		return;

	service.getServer().sync.listen({ hostname: null, port: port, isSecure: isSecure, key: key, crt: crt, caCrt: caCrt, keepUp: keepServerUp });
	});

self.close = function(service_name)
	{ // Close one service, listed services or all services
	var keys;

	if(typeof service_names == "undefined")																		// All the services
		keys = Object.keys(provided);
	else if(typeof service_names != "undefined" && service_name.constructor !== Array)							// One service (string)
		keys = [service_names];

	for(var i = 0; i < keys.length; i++)
		{
		if(keys[i] in provided)
			provided[keys[i]].getServer().close();
		if(keys[i] in providedSecure)
			providedSecure[keys[i]].getServer().close();
		}
	}

self.getProvidedService = function(service_name)
	{
	return (provided[service_name] ? provided[service_name] : null);
	}

self.getProvidedServiceSecure = function(service_name)
	{
	return (providedSecure[service_name] ? providedSecure[service_name] : null);
	}

self.keepServerUp = function(val)
	{
	keepServerUp = (typeof val == "boolean" ? val : false);
	}

}

if(true)
	module.exports = SpaceifyService;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Config, 8.2.2017 Spaceify Oy
 *
 * This configuration is used with the 'spaceify connect'.
 *
 * Supported console output types:
 *   log, dir, info, error and warn
 *
 * The configuration logic is based on 'enable output' and operates with boolean values:
 *   false = output is disabled
 *    true = output is enabled
 *
 * The individual console output types can be overridden with the 'all' configuration.
 * The override takes three values:
 *   false = all the output types are disabled
 *    true = all the output types are enabled
 *    null = the override is not applied to the output types
 *
 * If the configuration for a class is not found, the default (defaultConfig) configuration
 * is used as a fallback. The default configuration operates identically to the individual
 * class configurations.
 *
 * There is a global (globalConfigOverride) override configuration. The global oveverride is applied
 * to all of the corresponding output types of all the individual class configurations.
 * The override takes three values:
 *   false = the output type of all the individual classes are disabled
 *    true = the output type of all the individual classes are enabled
 *    null = the override is not applied to the output type of the class
 *
 * NOTICE: the globalConfigOverride and defaultConfig configurations are mandatory variables in the config.js file!
 *
 * Order of precedence of the configurations
 *   Global configuration takes precedencence of class configurations
 * Order of precedence of the console output types
 *   'all' in a configuration (global or class) takes precedence the output types
 *
 * e.g.
 *      MyClass is unaltered
 *      globalConfigOverride = { log: null, dir: null, info: null, error: null, warn: null, all: null };
 *      MyClass = { log: true, dir: true, info: true, error: true, warn: true, all: null };
 *   => MyClass = { log: true, dir: true, info: true, error: true, warn: true, all: null };
 *
 *      MyClass 'all' overrides its output types
 *      globalConfigOverride = { log: null,  dir: null,  info: null,  error: null,  warn: null, all: null };
 *      MyClass = { log: true,  dir: true,  info: true,  error: true,  warn: true,  all: false };
 *   => MyClass = { log: false, dir: false, info: false, error: false, warn: false, all: false };
 *
 *      Global error is set to false and overrides MyClass error with false
 *      globalConfigOverride = { log: null, dir: null, info: null, error: false, warn: null, all: null };
 *      MyClass = { log: true, dir: true, info: true, error: true,  warn: true, all: null };
 *   => MyClass = { log: true, dir: true, info: true, error: false, warn: true, all: null };
 *
 *      Global 'all' is set to false and all the output types of MyClass are overridden with false
 *      globalConfigOverride = { log: null,  dir: null,  info: null,  error: null,  warn: null, all: false };
 *      MyClass = { log: true,  dir: true,  info: true,  error: true,  warn: true, all: null };
 *   => MyClass = { log: false, dir: false, info: false, error: false, warn: false, all: null };
 *
 * @class Config
 */

var SpeBaseConfig =
{
logger:
	{
	// Global configuration overrides (overrides the individual class configurations)

	loggerConfigOverride:
		{
		all: true,
		myoverride: 123,
		mydefault2: 3
		},

	// MANDATORY CONFIGURATION - Default configuration (always used as base config)

	defaultLoggerConfig:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true,
		all: true,
		mydefault1: 1,
		mydefault2: 2
		},

	// Class configurations (overrides defaultConfig)
	ApplicationManager:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	AppManService:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	BinaryRpcCommunicator:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Core:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Database:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	DHCPDLog:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	DockerContainer:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	DockerHelper:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	DockerImage:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	RegisterEdge:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	HttpService:
		{
		log: false,
		dir: false,
		info: false,
		error: true,
		warn: false
		},

	Iptables:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Main:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Manager:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Manifest:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Messaging:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	PubSub:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	RpcCommunicator:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SecurityModel:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Service:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyApplication:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyApplicationManager:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyConfig:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyCore:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyError:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyMessages:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyNet:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyNetwork:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyService:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SpaceifyUtility:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Spacelet:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	SPM:
		{
		log: false,
		dir: false,
		info: false,
		error: false,
		warn: false
		},

	ValidateApplication:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebOperation:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebRtcClient:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebRtcConnection:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebServer:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebSocketConnection:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebSocketRpcConnection:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebSocketRpcServer:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	WebSocketServer:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		},

	Connection:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true
		}
	},

testValue: "TestValueFromBaseConfig"
};

//Object.freeze(SpeBaseConfig);

if (true)
	module.exports = SpeBaseConfig;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * WebSocketConnection, 12.5.2016 Spaceify Oy
 *
 * @class WebSocketConnection
 */

function WebSocketConnection()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var SpaceifyError = null;
var SpaceifyLogger = null;

if(isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyLogger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyError = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());

	global.fs = __webpack_require__(0);
	global.WebSocket = __webpack_require__(35).w3cwebsocket;
	}
else
	{
	lib = (window.spe ? window.spe : window);

	SpaceifyLogger = lib.SpaceifyLogger;
	SpaceifyError = lib.SpaceifyError;
	}

var errorc = new SpaceifyError();
var logger = new SpaceifyLogger("WebSocketConnection");

var url = "";
var id = null;
var port = null;
var socket = null;
var origin = null;
var pipedTo = null;
var isOpen = false;
var isSecure = false;
var remotePort = null;
var remoteAddress = null;
var eventListener = null;

// For client-side use, in both Node.js and the browser

self.connect = function(opts, callback)
	{
	id = opts.id || null;
	port = opts.port || "";
	isSecure = opts.isSecure || false;

	var caCrt = opts.caCrt || "";
	var hostname = opts.hostname || null;
	var protocol = (!isSecure ? "ws" : "wss");
	var subprotocol = opts.subprotocol || "json-rpc";

	try	{
		url = protocol + "://" + hostname + (port ? ":" + port : "") + (id ? "?id=" + id : "");

		var cco = (isNodeJs && isSecure ? { tlsOptions: { ca: [fs.readFileSync(caCrt, "utf8")] } } : null);

		socket = new WebSocket(url, "json-rpc", null, null, null, cco);

		socket.binaryType = "arraybuffer";

		socket.onopen = function()
			{
			logger.log("WebSocketConnection::onOpen() " + url);

			isOpen = true;

			callback(null, true);
			};

		socket.onerror = function(err)
			{
			logger.error("WebSocketConnection::onError() " + url, true, true, logger.ERROR);

			isOpen = false;

			callback(errorc.makeErrorObject("wsc", "Failed to open WebsocketConnection.", "WebSocketConnection::connect"), null);
			}

		socket.onclose = function(reasonCode, description)
			{
			onSocketClosed(reasonCode, description, self);
			};

		socket.onmessage = onMessageEvent;
		}
	catch(err)
		{
		callback(err, null);
		}
	};

// For server-side Node.js use only

self.setSocket = function(val)
	{
	try	{
		socket = val;

		socket.on("message", onMessage);

		socket.on("close", function(reasonCode, description)
			{
			onSocketClosed(reasonCode, description, self);
			});

		isOpen = true;
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.setId = function(val)
	{
	id = val;
	};

self.setPipedTo = function(targetId)
	{
	pipedTo = targetId;
	};

self.setRemoteAddress = function(val)
	{
	remoteAddress = val;
	};

self.setRemotePort = function(val)
	{
	remotePort = val;
	};

self.setOrigin = function(val)
	{
	origin = val;
	};

self.setIsSecure = function(val)
	{
	isSecure = val;
	}

self.setEventListener = function(listener)
	{
	eventListener = listener;
	};

self.getId = function()
	{
	return id;
	};

self.getRemoteAddress = function()
	{
	return remoteAddress;
	};

self.getRemotePort = function()
	{
	return remotePort;
	};

self.getOrigin = function()
	{
	return origin;
	};

self.getIsSecure = function()
	{
	return isSecure;
	}

self.getPipedTo = function()
	{
	return pipedTo;
	}

self.getIsOpen = function()
	{
	return isOpen;
	}

self.getPort = function()
	{
	return port;
	}

var onMessage = function(message)
	{
	try	{
		if (eventListener)
			{
			if (message.type == "utf8")
				{
				//logger.log("WebSocketConnection::onMessage(string): " + JSON.stringify(message.utf8Data));

				eventListener.onMessage(message.utf8Data, self);
				}
			if (message.type == "binary")
				{
				//logger.log("WebSocketConnection::onMessage(binary): " + binaryData.length);

				eventListener.onMessage(message.binaryData, self);
				}
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

var onMessageEvent = function(event)
	{
	//logger.log("WebSocketConnection::onMessageEvent() " + JSON.stringify(event.data));

	try	{
		if (eventListener)
			eventListener.onMessage(event.data, self);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

var onSocketClosed = function(reasonCode, description, obj)
	{
	logger.log("WebSocketConnection::onSocketClosed() " + url);

	try	{
		isOpen = false;

		if (eventListener)
			eventListener.onDisconnected(obj.getId());
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.send = function(message)
	{
	try	{
		socket.send(message);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.sendBinary = self.send;

self.close = function()
	{
	try	{
		socket.close();
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

}

if (true)
	module.exports = WebSocketConnection;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * WebSocketRpcConnection, 12.5.2016 Spaceify Oy
 *
 * @class WebSocketRpcConnection
 */

function WebSocketRpcConnection()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var SpaceifyError = null;
var SpaceifyUtility = null;
var RpcCommunicator = null;
//var SpaceifyLogger = null;
var WebSocketConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyError = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	//SpaceifyLogger = require(lib + "spaceifylogger");
	SpaceifyUtility = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	RpcCommunicator = __webpack_require__(15)(lib + "rpccommunicator");
	WebSocketConnection = __webpack_require__(17)(lib + "websocketconnection");
	}
else
	{
	lib = (window.spe ? window.spe : window);

	//SpaceifyLogger = lib.SpaceifyLogger;
	SpaceifyError = lib.SpaceifyError;
	SpaceifyUtility = lib.SpaceifyUtility;
	RpcCommunicator = lib.RpcCommunicator;
	WebSocketConnection = lib.WebSocketConnection;
	}

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var communicator = new RpcCommunicator();
var connection = new WebSocketConnection();
//var logger = new SpaceifyLogger("WebSocketRpcConnection");

self.connect = function(options, callback)
	{
	connection.connect(options, function(err, data)
		{
		if(!err)
			{
			communicator.addConnection(connection);

			if(callback)
				callback(null, true);
			}
		else
			{
			if(callback)
				callback(errorc.makeErrorObject("wsrpcc", "Failed to open WebsocketRpcConnection.", "WebSocketRpcConnection::connect"), null);
			}
		});
	};

self.close = function()
	{
	};

self.getCommunicator = function()
	{
	return communicator;
	};

self.getConnection = function()
	{
	return connection;
	};

// Inherited methods
self.exposeRpcMethod = function(name, object, method)
	{
	communicator.exposeRpcMethod(name, object, method);
	}

self.exposeRpcMethodSync = function(name, object, method)
	{
	communicator.exposeRpcMethodSync(name, object, method);
	}

self.callRpc = function(method, params, object, listener)
	{
	return communicator.callRpc(method, params, object, listener, connection.getId());
	}

self.getIsOpen = function()
	{
	return connection.getIsOpen();
	}

self.getIsSecure = function()
	{
	return connection.getIsSecure();
	}

self.getPort = function()
	{
	return connection.getPort();
	}

self.getId = function()
	{
	return connection.getId();
	}

// External event listeners
self.setConnectionListener = function(listener)
	{
	communicator.setConnectionListener(listener);
	};

self.setDisconnectionListener = function(listener)
	{
	communicator.setDisconnectionListener(listener);
	};

}

if (true)
	module.exports = WebSocketRpcConnection;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifyerror": 7
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 13;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifyutility": 22
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 14;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./rpccommunicator": 25
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 15;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 16;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./websocketconnection": 11
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 17;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Service, 24.1.2016 Spaceify Oy
 *
 * A single service object. Used for both provided and required services. Only for Spaceify's internal use.
 *
 * @class Service
 */

function Service(service_name, isServer, connection)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
//var SpaceifyConfig = null;
//var SpaceifyLogger = null;
var SpaceifyUtility = null;
var fibrous = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	//SpaceifyConfig = require(lib + "spaceifyconfig");
	//SpaceifyLogger = require(lib + "spaceifylogger");
	SpaceifyUtility = __webpack_require__(14)(lib + "spaceifyutility");
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	//SpaceifyConfig = lib.SpaceifyConfig;
	//SpaceifyLogger = lib.SpaceifyLogger;
	var SpaceifyUtility = lib.SpaceifyUtility;
	var fibrous = function(fn) { return fn; };
	}

var utility = new SpaceifyUtility();
//var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("Service");

var serverUpListener = null;
var serverDownListener = null;
var connectionListeners = [];
var disconnectionListeners = [];

	// CONSTANTS -- -- -- -- -- -- -- -- -- -- //
self.REQUIRED = 0;
self.PROVIDED = 1;

	// PRIVATE METHODS -- -- -- -- -- -- -- -- -- -- //
var listenConnection = function(id)
	{
	for(var i = 0; i < connectionListeners.length; i++)
		connectionListeners[i](id, service_name, self.getIsSecure());
	}

var listenDisconnection = function(id)
	{
	for(var i = 0; i < disconnectionListeners.length; i++)
		disconnectionListeners[i](id, service_name, self.getIsSecure());
	}

var listenServerUp = function(id)
	{
	if(serverUpListener)
		serverUpListener(id, service_name, self.getIsSecure());
	}

var listenServerDown = function(id)
	{
	if(serverDownListener)
		listenServerDown(id, service_name, self.getIsSecure());
	}

	// PUBLIC METHODS -- -- -- -- -- -- -- -- -- -- //
self.setConnectionListener = function(listener)
	{
	if(typeof listener == "function")
		connectionListeners.push(listener);
	}

self.setDisconnectionListener = function(listener)
	{
	if(typeof listener == "function")
		disconnectionListeners.push(listener);
	}

self.setServerUpListener = function(listener)
	{
	serverUpListener = (typeof listener == "function" ? listener : null);
	}

self.setServerDownListener = function(listener)
	{
	serverDownListener = (typeof listener == "function" ? listener : null);
	}

self.getPort = function()
	{
	return connection.getPort();
	}

self.getIsOpen = function()
	{
	return connection.getIsOpen();
	}

self.getServiceName = function()
	{
	return service_name;
	}

self.getType = function()
	{
	return isServer ? self.PROVIDED : self.REQUIRED;
	}

self.getId = function()
	{
	return connection.getId();
	}

self.getServer = function()
	{
	return (isServer ? connection : null);
	}

self.getConnection = function()
	{
	return (!isServer ? connection : null);
	}

self.getIsSecure = function()
	{
	return connection.getIsSecure();
	}

self.exposeRpcMethod = function(name, object, method)
	{
	connection.exposeRpcMethod(name, object, method);
	}

self.exposeRpcMethodSync = function(name, object, method)
	{
	connection.exposeRpcMethodSync(name, object, method);
	}

self.callRpc = function()
	{
	connection.callRpc.apply(this, arguments);
	}

	// -- -- -- -- -- -- -- -- -- -- //
connection.setConnectionListener(listenConnection);							// Bubble events from connections and servers to this class
connection.setDisconnectionListener(listenDisconnection);

if(isServer)
	{
	connection.setServerUpListener(listenServerUp);
	connection.setServerDownListener(listenServerDown);
	}

}

if(true)
	module.exports = Service;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify core, 29.7.2015 Spaceify Oy
 *
 * @class SpaceifyCore
 */

function SpaceifyCore()
{
var self = this;

// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -
var isNodeJs = (typeof window === "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);

var lib = null;
var Connection = null;
var SpaceifyConfig = null;
var SpaceifyNetwork = null;
//var SpaceifyLogger = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Connection = __webpack_require__(29)(lib + "connection");
	SpaceifyConfig = __webpack_require__(1)(lib + "spaceifyconfig");
	//SpaceifyLogger = require(lib + "spaceifylogger");
	SpaceifyNetwork = function() {};
	}
else
	{
	lib = (window.spe ? window.spe : window);

	Connection = lib.Connection;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyNetwork = lib.SpaceifyNetwork;
	//SpaceifyLogger = lib.SpaceifyLogger;
	}

var connection = new Connection();
var network = new SpaceifyNetwork();
var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("SpaceifyCore");

var callQueue = [];

self.startSpacelet = function(unique_name, callback)
	{
	callRpc("startSpacelet", [unique_name], function(err, services, id, ms)
		{
		if(err)
			callback(err, null);
		else
			{
			var serviceNames = [];
			for(var s = 0; s < services.length; s++)							// Make service names array for convenience
				serviceNames.push(services[s].service_name);

			callback(null, {services: services, serviceNames: serviceNames}, id, ms);
			}
		});
	}

self.registerService = function(service_name, ports, callback)
	{
	callRpc("registerService", [service_name, ports], callback);
	}

self.unregisterService = function(service_name, unique_name, callback)
	{
	callRpc("unregisterService", [service_name, unique_name], callback);
	}

self.getService = function(service_name, unique_name, callback)
	{
	callRpc("getService", [service_name, unique_name], callback);
	}

self.getServices = function(service_name, callback)
	{
	callRpc("getServices", [service_name], callback);
	}

self.getOpenServices = function(unique_names, getHttp, callback)
	{
	callRpc("getOpenServices", [unique_names, getHttp], callback);
	}

self.getManifest = function(unique_name, callback)
	{
	var manifest = (isCache() ? getCache().getManifest(unique_name) : null);

	if(manifest)
		callback(null, manifest, -1, 0);
	else
		callRpc("getManifest", [unique_name, true, false], function(err, data, id, ms)
			{
			if(!err && isCache())
				getCache().setManifest(unique_name, data);

			callback(err, data, id, ms);
			});
	}

self.isAdminLoggedIn = function(callback)
	{
	network.doOperation({type: "isAdminLoggedIn"}, function(err, data, id, ms)
		{
		callback((err ? err : null), (err ? false : data), id, ms);
		});
	}

self.getApplicationStatus = function(unique_name, callback)
	{
	callRpc("getApplicationStatus", [unique_name], callback);
	}

self.isApplicationRunning = function(unique_name, callback)
	{
	callRpc("isApplicationRunning", [unique_name], callback);
	}

self.getServiceRuntimeStates = function(sessionId, callback)
	{
	callRpc("getServiceRuntimeStates", [sessionId], callback);
	}

self.getApplicationData = function(callback)
	{
	var i;

	callRpc("getApplicationData", [], function(err, data, id, ms)
		{
		if(!err && isCache())
			{
			for(i = 0; i < data.spacelet.length; i++)
				getCache().setApplication(data.spacelet[i]);

			for(i = 0; i < data.sandboxed.length; i++)
				getCache().setApplication(data.sandboxed[i]);

			for(i = 0; i < data.sandboxed_debian.length; i++)
				getCache().setApplication(data.sandboxed_debian[i]);

			for(i = 0; i < data.native_debian.length; i++)
				getCache().setApplication(data.native_debian[i]);
			}

		callback(err, data, id, ms);
		});
	}

self.getApplicationURL = function(unique_name, callback)
	{
	callRpc("getApplicationURL", [unique_name], callback);
	}

self.setSplashAccepted = function(callback)
	{
	callRpc("setSplashAccepted", [], callback);
	}

self.setEventListeners = function(events, listeners, context, sessionId, callback)
	{
	callRpc("setEventListeners", [events], function(err, data, id, ms)
		{
		if(!err)
			{
			for(var i = 0; i < events.length; i++)
				connection.exposeRpcMethod(events[i], context, listeners[i]);
			}

		callback(err, data, id, ms);
		});
	}

/*self.saveOptions = function(unique_name, directory, filename, data, callback)
	{
	var post = {unique_name: unique_name, directory: directory, filename: filename, data: data};
	network.doOperation(post, callback);
	}

self.loadOptions = function(unique_name, directory, filename, callback)
	{
	var post = {unique_name: unique_name, directory: directory, filename: filename};
	network.doOperation(post, callback);
	}*/

	// CONNECTION -- -- -- -- -- -- -- -- -- -- //
var callRpc = function(method, params, callback)
	{
	var callObj, isSecure, port, hostname, caCrt;

	if(connection.isConnecting())
		{
		callQueue.push({ method: method, params: params, callback: callback });
		}
	else if(!connection.isConnected())
		{
		callQueue.push({ method: method, params: params, callback: callback });

		isSecure = (isNodeJs ? true : network.isSecure());
		port = (!isSecure ? config.CORE_PORT : config.CORE_PORT_SECURE);
		caCrt = (isNodeJs ? config.SPACEIFY_CODE_PATH + config.SPACEIFY_CRT_WWW : "");

		if(!isNodeJs)																		// Web page
			hostname = network.getEdgeURL({ protocol: "" });
		else if(isRealSpaceify)																// Node.js
			hostname = config.EDGE_IP;
		else																				// Develop mode
			hostname = config.CONNECTION_HOSTNAME;

		connection.connect({ hostname: hostname, port: port, isSecure: isSecure, caCrt: caCrt }, function(err, data)
			{
			if(err)
				{
				while(typeof (callObj = callQueue.shift()) !== "undefined")					// Pass connection failure to all calls
					callObj.callback(err, null, -1, 0);
				}
			else
				{
				nextRpcCall();
				}
			});
		}
	else
		{
		callQueue.push({ method: method, params: params, callback: callback });

		nextRpcCall();
		}
	}

var nextRpcCall = function()
	{
	var callObj = callQueue.shift();

	if(typeof callObj !== "undefined")
		{
		connection.callRpc(callObj.method, callObj.params, self, function()
			{
			callObj.callback.apply(this, arguments);

			nextRpcCall();
			});
		}
	}

self.close = function()
	{
	connection.close();
	}

	// CACHE -- -- -- -- -- -- -- -- -- -- //
var getCache = function()
	{
	return (!isNodeJs && window && window.spaceifyCache ? window.spaceifyCache : null);
	}

var isCache = function()
	{
	var type = getCache();
	return (type == "undefined" || type == null ? false : true);
	}

}

if(true)
	module.exports = SpaceifyCore;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify Network, 29.7.2015 Spaceify Oy
 *
 * @class SpaceifyNetwork
 */

function SpaceifyNetwork()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var SpaceifyError = null;
var SpaceifyConfig = null;
var SpaceifyUtility = null;
//var SpaceifyLogger = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyError = __webpack_require__(13)(lib + "spaceifyerror");
	SpaceifyConfig = __webpack_require__(1)(lib + "spaceifyconfig");
	SpaceifyUtility = __webpack_require__(14)(lib + "spaceifyutility");
	//SpaceifyLogger = require(lib + "spaceifylogger");
	}
else
	{
	lib = (window.spe ? window.spe : window);

	SpaceifyError = lib.SpaceifyError;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyUtility = lib.SpaceifyUtility;
	//var SpaceifyLogger = lib.SpaceifyLogger;
	}

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var config = SpaceifyConfig.getConfig();
//var logger = new SpaceifyLogger("SpaceifyNetwork");

var dregx = new RegExp(config.EDGE_DOMAIN.replace(".", "\\.") + "$", "i");

// Get the URL to the Spaceify Edge
self.getEdgeURL = function(opts)
	{
	var options = {};
	options.protocol = (typeof opts.protocol !== "undefined" ? opts.protocol : null);
	options.withEndSlash = (typeof opts.withEndSlash !== "undefined" ? opts.withEndSlash : false);

	var protocol = self.getProtocol(true, options.protocol);

	// Origin: local/remote edge webpage or webpage running spacelet (URL not ending with EDGE_DOMAIN); defaults to spacelet
	var hostname = config.EDGE_HOSTNAME;
	if(typeof window !== "undefined" && window.location.hostname.match(dregx) !== null)
		{
		hostname = window.location.hostname;
		}

	return protocol + hostname + (options.withEndSlash ? "/" : "");
	}

// Get URL to applications resource
self.externalResourceURL = function(unique_name, options)
	{
	return self.getEdgeURL(options) + unique_name + "/";
	}

// Get secure or insecure port based on web pages protocol or requested security
self.getPort = function(port, securePort, isSecure)
	{
	return (!self.isSecure() && !isSecure ? port : securePort);
	}

// Returns true if current web page is encrypted
self.isSecure = function()
	{
	var protocol = self.getProtocol(false, null);

	return (protocol == "http:" ? false : true);
	}

// Return current protocol
self.getProtocol = function(withScheme, cProtocol)
	{
	var url, proto, protocol;

	if(cProtocol === "")														// No protocol
		{
		protocol = "";
		}
	else if(typeof window === "undefined")										// Node.js!!!
		{
		protocol = (cProtocol === null ? "" : cProtocol);
		}
	else																		// Web page
		{
		protocol = (cProtocol !== null ? cProtocol : location.protocol);

		if(protocol == "blob:")
			{
			if(window.parent)
				{
				url = "" + window.parent.location;
				url = url.replace(/^blob:/, "");

				if((proto = url.match(/^http.?:/)) !== null)
					protocol = proto[0];
				else
					protocol = "http:";
				}
			else
				protocol = "http:";
			}
		}

	if(protocol != "" && !protocol.match(/:$/))
		protocol += ":";

	return protocol + (protocol != "" && withScheme ? "//" : "")
	}

// Parse URL query
self.parseQuery = function(url)
	{
	var parameters = {}, part, pair, pairs;

	url = decodeURIComponent(url);

	url = url.replace(/#.*$/, "");

	part = url.split("?");

	if(part.length == 1 && url.charAt(0) != "?")
		return parameters;

	part = (part.length < 2 ? part[0] : part[1]);

	pairs = part.split("&");

	for (var i = 0, length = pairs.length; i < length; i++)
		{
		if (!pairs[i])
			continue;

		pair = pairs[i].split("=");
		parameters[pair[0]] = (pair.length == 2 ? pair[1] : null);
		}

	return parameters;
	}

self.remakeQueryString = function(query, exclude, include, path, encode)
	{ // Tip: exclude and include can be used in combination to replace values = first exclude old then include new.
	var i, hash, str, search = "";

	for(i = 0; i < exclude.length; i++)
		{
		if(exclude[i] in query)
			delete query[exclude[i]];
		}

	for(i in include)
		query[i] = include[i];

	for(i in query)
		{
		if(encode)
			{
			str = decodeURIComponent(query[i])
			str = encodeURIComponent(str);
			}
		else
			str = query[i];

		search += (search != "" ? "&" : "") + i + "=" + str;
		}

	if(path)
		{
		path = decodeURIComponent(path);

		if((hash = path.match(/(?:#.*)/, "")))									// hash part of the path
			hash = hash[0];

		path = path.replace(/\?.*$/, "");										// path without search and hash
		}
	else
		{
		hash = "";
		path = "";
		}

	path = path + (search ? "?" + search : "") + (hash ? hash : "");

	return path;
	}

self.parseURL = function(url)
	{
	/*var parser = document.createElement("a");
	parser.href = url;
	return parser;*/

	// parseUri 1.2.2
	// (c) Steven Levithan <stevenlevithan.com>
	// MIT License
	var	o =
		{
		strictMode: false,
		key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
		q:	{
			name:   "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
			},
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
			}
		},
		m	= o.parser[o.strictMode ? "strict" : "loose"].exec(url),
		uri	= {},
		i	= 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
	}

self.isPortInUse = function(port, callback)
	{ // Adapted from https://gist.github.com/timoxley/1689041
	if(!port)
		return callback(null, true);

	var net = __webpack_require__(68);
	var server = net.createServer();

	server.once("error", function(err)
		{
		callback(err.code != "EADDRINUSE" ? err : null, true);
		});

	server.once("listening", function()
		{
		server.once("close", function()
			{
			callback(null, false)
			});

		server.close();
		});

	server.listen(port);
	}

	// XMLHttpRequest -- -- -- -- -- -- -- -- -- -- //
self.GET = function(url, callback, responseType)
	{
	var ms = Date.now();
	var id = utility.randomString(16, true);
	var xhr = createXMLHttpRequest();
	xhr.onreadystatechange = function() { onReadyState(xhr, id, ms, callback); };

	xhr.open("GET", url, true);
	xhr.responseType = (responseType ? responseType : "");
	xhr.send();
	}

self.POST_FORM = function(url, post, responseType, callback)
	{
	if(typeof spaceifyLoader !== "undefined")
		{
		spaceifyLoader.postData(url, post, responseType, callback);
		}
	else
		{
		var boundary = "---------------------------" + Date.now().toString(16);

		var body = "";
		for(var i = 0; i < post.length; i++)
			{
			body += "\r\n--" + boundary + "\r\n";

			body += post[i].content;
			body += "\r\n\r\n" + post[i].data + "\r\n";
			}
		body += "\r\n--" + boundary + "--";

		var xhr = createXMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.responseType = (responseType ? responseType : "text");
		xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary);
		xhr.onreadystatechange = function() { onReadyState(xhr, utility.randomString(16, true), Date.now(), callback); };
		xhr.send(body);
		}
	}

self.doOperation = function(jsonData, callback)
	{
	var data;
	var result;
	var content;
	var error = null;
	var operationUrl;

	try {
		content = "Content-Disposition: form-data; name=operation;\r\nContent-Type: application/json; charset=utf-8";

		operationUrl = self.getEdgeURL({ withEndSlash: true }) + config.OPERATION_FILE;
		//true, null, true

		self.POST_FORM(operationUrl, [{content: content, data: JSON.stringify(jsonData)}], "json", function(err, response, id, ms)
			{
			try {
				if(typeof response !== "string")
					response = JSON.stringify(response);

				response = response.replace(/&quot;/g, '"');
				response = response.replace(/\\|^"|"$/g, '');

				result = JSON.parse(response);
				}
			catch(err)
				{
				result = {err: errorc.makeErrorObject("doOperation1", "Invalid JSON received.", "SpaceifyNetwork::doOperation")};
				}

			if(!result)
				{
				data = null;
				error = errorc.makeErrorObject("doOperation2", "Response is null.", "SpaceifyNetwork::doOperation");
				}
			else if(result.err)
				{
				data = result.data;
				error = result.err;
				}
			else if(result.error)
				{
				data = result.data;
				error = result.error;
				}
			else
				{
				data = result.data;
				error = null;
				}

			callback(error, data, id, ms);
			});
		}
	catch(err)
		{
		callback(err, null);
		}
	}

var createXMLHttpRequest = function()
	{
	return (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));		// IE7+, Firefox, Chrome, Opera, Safari : IE5, IE6
	}

var onReadyState = function(xhr, id, ms, callback)
	{
	if(xhr.readyState == 4)
		callback( (xhr.status != 200 ? xhr.status : null), (xhr.status == 200 ? xhr.response : null), id, Date.now() - ms );
	}

	// COOKIES -- -- -- -- -- -- -- -- -- -- //
self.setCookie = function(cname, cvalue, expiration_sec)
	{
	var expires = "";

	if(expiration_sec)
		{
		var dn = Date.now() + (expiration_sec * 1000);
		var dc = new Date(dn);
		expires = "expires=" + dc.toGMTString();
		}

	document.cookie = cname + "=" + cvalue + (expires != "" ? "; " + expires : "");
	}

self.getCookie = function(cname)
	{
	var name = cname + "=";
	var ca = document.cookie.split(";");
	for(var i = 0; i < ca.length; i++)
		{
		var c = ca[i];
		while(c.charAt(0) == " ")
			c = c.substring(1);

		if(c.indexOf(name) != -1)
			return c.substring(name.length, c.length);
		}

	return "";
	}

self.deleteCookie = function(cname)
	{
	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}

}

if(true)
	module.exports = SpaceifyNetwork;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Unique application, 17.10.2016 Spaceify Oy
 *
 * Keep this class dependency free!!!
 *
 * @class SpaceifyUnique
 */

function SpaceifyUnique()
{
var self = this;

self.getUniqueDirectory = function(unique_name, noEndSlash)
	{ // Get a file system safe directory name: lowercase, allowed characters, can't start or end with /.
	unique_name = unique_name.toLowerCase();
	unique_name = unique_name.replace(/[^a-z0-9\/_]/g, "/");
	unique_name = unique_name.replace(/^\/+/, "");
	unique_name += (unique_name.search(/\/$/) != -1 ? "" : "/");

	if(noEndSlash)
		unique_name = unique_name.replace(/\/$/, "");

	return unique_name;
	}

self.getSystemctlServiceName = function(unique_name)
	{
	return unique_name.replace(/_\//g, "") + ".service";
	}

self.getBasePath = function(type, unique_name, config)
	{
	return config.APP_TYPE_PATHS[type];
	}

self.getAppPath = function(type, unique_name, config)
	{
	return config.APP_TYPE_PATHS[type] + self.getUniqueDirectory(unique_name) + config.VOLUME_DIRECTORY + config.APPLICATION_DIRECTORY;
	}

self.getVolPath = function(type, unique_name, config)
	{
	return config.APP_TYPE_PATHS[type] + self.getUniqueDirectory(unique_name) + config.VOLUME_DIRECTORY;
	}

self.getWwwPath = function(type, unique_name, config)
	{
	return self.getAppPath(type, unique_name, config) + config.WWW_DIRECTORY;
	}

}

if(true)
	module.exports = SpaceifyUnique;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Utility + Spaceify Utility, 18.9.2013, 29.7.2015 Spaceify Oy
 *
 * @class SpaceifyUtility
 */

function SpaceifyUtility()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var Language = null;
var SpaceifyConfig = null;
var SpaceifyLogger = null;
var fibrous = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	Language = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyConfig = __webpack_require__(1)(lib + "spaceifyconfig");
	SpaceifyLogger = __webpack_require__(31)(lib + "spaceifylogger");
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());

	global.os = __webpack_require__(69);
	global.fs = __webpack_require__(0);
	global.path = __webpack_require__(34);
	global.mkdirp = __webpack_require__(67);
	global.AdmZip = __webpack_require__(63);
	global.request = __webpack_require__(70);
	global.spawn = __webpack_require__(64).spawn;
	}
else
	{
	lib = (window.spe ? window.spe : window);

	Language = {};
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyLogger = lib.SpaceifyLogger;
	fibrous = function(fn) { return fn; };
	}

var config = SpaceifyConfig.getConfig();
var language = Language;//new Language();
var logger = new SpaceifyLogger("SpaceifyUtility");

	// FILE SYSTEM -- -- -- -- -- -- -- -- -- -- //
self.loadRemoteFile = fibrous( function(fileUrl)
	{
	var result;

	try	{
		result = request.sync.get(fileUrl, { encoding: null, rejectUnauthorized: false, agent: false });
		}
	catch(err)
		{
		throw language.E_LOAD_REMOTE_FILE_FAILED_TO_INITIATE_HTTP_GET.pre("SpaceifyUtility::loadRemoteFile", err);
		}

	if(result.statusCode != 200)
		throw language.E_LOAD_REMOTE_FILE_FAILED_TO_LOAD_REMOTE_FILE.preFmt("SpaceifyUtility::loadRemoteFile", {"~file": fileUrl, "~code": result.statusCode});

	return result;
	});

self.loadRemoteFileToLocalFile = fibrous( function(fileUrl, targetDir, targetFile, throws)
	{
	try {
		var result = self.sync.loadRemoteFile(fileUrl);

		if(result.statusCode == 200)
			self.sync.writeFile(targetDir, targetFile, result.body);

		return true;
		}
	catch(err)
		{
		if(throws)
			throw language.E_LOAD_REMOTE_FILE_TO_LOCAL_FILE_FAILED.pre("SpaceifyUtility::loadRemoteFileToLocalFile", err);
		}

	return false;
	});

self.isFile = function(path, callback)
	{
	self.isLocal(path, "file", callback);
	}

self.isDirectory = function(path, callback)
	{
	self.isLocal(path, "directory", callback);
	}

self.isLocal = function(path, type, callback)
	{
	try {
		var stats = fs.sync.stat(path);

		if(stats && type == "file" && stats.isFile())
			callback(null, true);
		else if(stats && type == "directory" && stats.isDirectory())
			callback(null, true);
		else
			callback(null, false);
		}
	catch(err)
		{
		callback(null, false);
		}
	}

self.getPathType = function(path, callback)
	{
	try {
		var stats = fs.stat(path, function(err, data)
			{
			if(stats && stats.isFile())
				callback(null, "file");
			else if(stats && stats.isDirectory())
				callback(null, "directory");
			else
				callback(null, "undefined");
			});
		}
	catch(err)
		{
		callback(null, "undefined");
		}
	}

self.deleteDirectory = fibrous( function(source, throws)						// Recursively deletes directory and its files and subdirectories
	{
	try {
		var stats = fs.sync.stat(source);
		if(typeof stats != "undefined" && stats.isDirectory())
			{
			fs.sync.readdir(source).forEach(function(file, index)
				{
				var curPath = source + "/" + file;
				if(fs.sync.stat(curPath).isDirectory())
					self.sync.deleteDirectory(curPath, throws);
				else
					fs.sync.unlink(curPath);
				});

			fs.sync.rmdir(source);
			}
		}
	catch(err)
		{
		if(throws)
			throw language.E_DELETE_DIRECTORY_FAILED.pre("SpaceifyUtility::deleteDirectory", err);
		}
	});

self.copyDirectory = fibrous( function(source, target, throws, excludeDirectory)
	{ // Recursively copy source directory content to target directory.
	try {
		source += (source.search(/\/$/) != -1 ? "" : "/");
		target += (target.search(/\/$/) != -1 ? "" : "/");

		var stats = fs.sync.stat(source);
		if(typeof stats == "undefined" || !stats.isDirectory() || excludeDirectory.indexOf(source) != -1)
			return;

		var mode = parseInt("0" + (stats.mode & 511/*0777*/).toString(8), 8);

		mkdirp.sync(target, mode);

		fs.sync.readdir(source).forEach(function(file, index)
			{
			var sourcePath = source + file;
			var targetPath = target + file;

			stats = fs.sync.stat(sourcePath);
			if(stats.isDirectory())
				{
				self.sync.copyDirectory(sourcePath + "/", targetPath + "/", throws, excludeDirectory);
				}
			else
				{
				mode = parseInt("0" + (stats.mode & 511/*0777*/).toString(8), 8);
				var readStream = fs.createReadStream(sourcePath, {"autoClose": true});
				var writeStream = fs.createWriteStream(targetPath, {"mode": mode});
				readStream.pipe(writeStream);
				}
			});
		}
	catch(err)
		{
		if(throws)
			throw language.E_COPY_DIRECTORY_FAILED.pre("SpaceifyUtility::copyDirectory", err);
		}
	});

self.moveDirectory = fibrous( function(source, target, throws)
	{
	try {
		self.sync.copyDirectory(source, target, true, []);
		self.sync.deleteDirectory(source, true);
		}
	catch(err)
		{
		if(throws)
			throw language.E_MOVE_DIRECTORY_FAILED.pre("SpaceifyUtility::moveDirectory", err);
		}
	});

self.deleteFile = fibrous( function(source, throws)
	{
	try {
		var stats = fs.sync.stat(source);
		if(typeof stats != "undefined" && !stats.isDirectory())
			fs.sync.unlink(source);
		}
	catch(err)
		{
		if(throws)
			throw language.E_DELETE_FILE_FAILED.pre("SpaceifyUtility::deleteFile", err);
		}
	});

self.copyFile = fibrous( function(sourceFile, targetFile, throws)
	{
	try {
		var stats = fs.sync.stat(sourceFile);
		if(typeof stats != "undefined" && !stats.isDirectory())
			{
			var mode = parseInt("0" + (stats.mode & 511/*0777*/).toString(8), 8);
			var readStream = fs.createReadStream(sourceFile, {"autoClose": true});
			var writeStream = fs.createWriteStream(targetFile, {"mode": mode});
			readStream.pipe(writeStream);
			}
		}
	catch(err)
		{
		if(throws)
			throw language.E_COPY_FILE_FAILED.pre("SpaceifyUtility::copyFile", err);
		}
	});

self.moveFile = fibrous( function(sourceFile, targetFile, throws)
{
	try {
		self.sync.copyFile(sourceFile, targetFile, true);
		self.sync.deleteFile(sourceFile, true);
		}
	catch(err)
		{
		if(throws)
			throw language.E_MOVE_FILE_FAILED.pre("SpaceifyUtility::moveFile", err);
		}
});

self.zipDirectory = fibrous( function(source, zipfile)				// Craete a zip file from the contents of the source directory
	{
	source = source + (source != "" && source.search(/\/$/) == -1 ? "/" : "");

	try {
		/*var log = console.log;										// Disable console.log for a while, bacuse adm-zip prints directory content
		console.log = function() {};

		var zip = new AdmZip();
		zip.addLocalFolder(source);
		zip.writeZip(zipfile);

		console.log = log;*/

		self.execute.sync("zip", ["-r", "-q", zipfile, ".", "-i", "*"], {cwd: source}, null);
		}
	catch(err)
		{
		throw language.E_ZIP_DIRECTORY_FAILED.pre("SpaceifyUtility::zipDirectory", err);
		}
	});

self.getFileFromZip = function(zipFilename, filename, extractPath, deleteAfter)
	{ // Get a text file from a zip file. Extracts file to the extractPath if path is defined. Deletes archive if requested.
	var regex = new RegExp(filename + "$", "i");
	var zip = new AdmZip(zipFilename);
	var zipEntries = zip.getEntries();
	for(var ze in zipEntries)
		{
		if(zipEntries[ze].entryName.search(regex) != -1)
			{
			if(extractPath)
				zip.extractAllTo(extractPath, true);

			return zip.readAsText(zipEntries[ze].entryName);
			}
		}

	if(deleteAfter)
		self.sync.deleteFile(zipFilename);

	return null;
	}

self.unZip = function(zipFilename, extractPath, deleteAfter)
	{ // Extracts archive to extractPath. Deletes archive if requested.
	var zip = new AdmZip(zipFilename);
	zip.extractAllTo(extractPath, true);

	if(deleteAfter)
		self.sync.deleteFile(zipFilename);

	return true;
	}

self.writeFile = fibrous( function(targetDir, targetFile, data)
	{
	mkdirp.sync(targetDir);

	fs.sync.writeFile(targetDir + targetFile, data);
	});

self.preparePath = function(directory)
	{ // Add / at the end of path, if it is not empty and doesn't have it already
	return directory + (!directory.match(/^$/) && !directory.match(/\/$/) ? "/" : "");	// Not empty, doesn't end with /
	}

	// WWW / NETWORK -- -- -- -- -- -- -- -- -- -- //
self.postPublish = function(applicationPackage, username, password, release_name, callback)
	{
	logger.force(language.PACKAGE_POSTING);

	request({
		url: config.REGISTRY_PUBLISH_URL,
		headers: { "content-type" : "multipart/form-data" },
		method: "POST",
		multipart:
			[
				{ "Content-Disposition" : 'form-data; name="username"', body: username },
				{ "Content-Disposition" : 'form-data; name="password"', body: password },
				{ "Content-Disposition" : 'form-data; name="release"', body: release_name },
				{
				"Content-Disposition" : 'form-data; name="package"; filename="' + config.PUBLISH_ZIP + '"',
				"Content-Type" : "application/zip",
				body: fs.readFileSync(applicationPackage)
				}
			]
		},
		function(err, result, body)
			{
			callback(err ? err : null, err ? null : (result.statusCode != 200 ? result.statusCode : body));
			});
	}

self.postRegister = function(edge_id, edge_name, edge_password, callback)
	{
	//logger.force(language.POSTING_REGISTRATION);

	request["post"]({
		url: config.EDGE_REGISTER_URL,
		headers: { "content-type" : "multipart/form-data" },
		//method: "POST",
		multipart:
			[
				{ "Content-Disposition" : 'form-data; name="edge_id"', body: edge_id },
				{ "Content-Disposition" : 'form-data; name="edge_name"', body: edge_name },
				{ "Content-Disposition" : 'form-data; name="edge_password"', body: edge_password }
			]
		},
		function(err, result, body)
			{
			callback(err ? err : null, err ? null : (result.statusCode != 200 ? result.statusCode : body));
			});
	}

var isMAC = function(MAC)
	{
	return MAC.match(new RegExp(config.MAC_REGX, "i"));
	}

self.parseURLFromURLObject = function(urlObj, host, protocol, port)
	{ // //[edge.spaceify.net:32827]/service/spaceify/bigscreen
	urlObj.hostname = host + (port ? ":" + port : "");
	urlObj.protocol = protocol;

	return urlObj.format(urlObj);
	}

self.parseMultiPartData = function(contentType, body, throws)
	{ // Parse "multipart MIME data streams". Return attributes of the data stream and the body as it is (no decoding done)
	var boundary, partBoundary, endBoundary, dataLine, phase, contentTypeData = {}, bodyData, bodyParts = {};

	try {
		// content-type
		self.parseMultipartLine(contentType, contentTypeData);

		if(!(boundary = contentTypeData["boundary"]))
			throw "";

		partBoundary = "--" + boundary;
		endBoundary =  "--" + boundary + "--";

		// body
		body = body.split("\r\n");

		body.shift();
		while(body.length > 0)
			{
			phase = 0;
			bodyData = {body: ""};
			dataLine = body.shift();
			while(body.length > 0 && dataLine != partBoundary && dataLine != endBoundary)
				{
				if(dataLine == "")
					phase++;
				else if(phase == 0)
					self.parseMultipartLine(dataLine, bodyData);
				else
					bodyData.body += dataLine;

				dataLine = body.shift();
				}

			if(bodyData.name)
				bodyParts[bodyData.name] = bodyData;
			}
		}
	catch(err)
		{
		if(throws)
			throw err;
		}

	return bodyParts;
	}

self.parseMultipartLine = function(line, keyvalues)
	{ // parse multipart lines such as 'multipart/form-data; boundary=abcd' or 'Content-Disposition: form-data; name="data";' as key-value pairs
	var parts = line.split(";");

	for(var i = 0; i < parts.length; i++)
		{
		if(!parts[i])
			continue;

		var matched = parts[i].match(/[:=]/);

		if(!matched)
			keyvalues[parts[i].trim()] = "";
		else
			{
			var key = parts[i].substr(0, matched.index);
			var value = parts[i].substr(matched.index + 1);
			keyvalues[key.trim().toLowerCase()] = value.trim();
			}
		}
	}

	// PARSE / FORMAT -- -- -- -- -- -- -- -- -- -- //
self.loadJSON = fibrous( function(file, bParse, throws)
	{
	var manifest = null;

	try {
		manifest = fs.sync.readFile(file, {encoding: "utf8"});

		if(bParse)
			manifest = self.parseJSON(manifest, throws);
		}
	catch(err)
		{
		manifest = null;

		if(throws)
			throw language.E_LOAD_JSON_FAILED.pre("SpaceifyUtility::loadJSON", err);
		}

	return manifest;
	});

self.saveJSON = fibrous( function(file, json, throws)
	{
	var success = false;

	try {
		var jsondata = JSON.stringify(json, null, 2);

		fs.sync.writeFile(file, jsondata, {encoding: "utf8"});

		success = true;
		}
	catch(err)
		{
		if(throws)
			throw language.E_SAVE_JSON_FAILED.pre("SpaceifyUtility::saveJSON", err);
		}

	return success;
	});

self.parseJSON = function(str, throws)
	{
	var json;

	try {
		json = JSON.parse(str);
		}
	catch(err)
		{
		if(throws)
			throw (isNodeJs ?	language.E_PARSE_JSON_FAILED.pre("SpaceifyUtility::parseJSON", err) :
								self.makeErrorObject("JSON", "Failed to parse JSON.", "SpaceifyUtility::parseJSON"));
		}

	return json;
	}

self.replaces = function(str, strs)
	{ // Replace all occurances of %0, %1, ..., %strs.length - 1 with strings in the strs array. Reverse order so that e.g. %11 gets replaced before %1.
	for(var s = strs.length - 1; s >= 0; s--)
		{
		var regx = new RegExp("%" + s, "g");
		str = str.replace(regx, (typeof strs[s] == "undefined" ? "?" : strs[s]));
		}

	return str;
	}

self.replace = function(str, strs, replaceWith)
	{ // Replace all occurances of named tilde (~) prefixed, alphanumerical parameters (e.g. ~name, ~Name1) supplied in the strs object in the str.
	var r = (replaceWith ? replaceWith : ""), i;

	for(i in strs)
		{
		if(typeof strs[i] == "undefined")							// Don't replace parameters with undefined values
			continue;

		str = str.replace(i, strs[i]);
		}
																	// Remove unused parameters to tidy up the string
	str = str.replace(/\s~[a-zA-Z0-9]*\s/g, " " + r + " ");			// ' ~x ' -> ' ? '
	str = str.replace(/~[a-zA-Z0-9]+\s/g, " " + r + " ");			// '~x '  -> ' ? '
	str = str.replace(/\s~[a-zA-Z0-9]+/g, r);						// ' ~x'  -> '?'
	str = str.replace(/~[a-zA-Z0-9]+/g, r);							// '~x'   -> '?'

	return str;
	}

	// OPERATING SYSTEM -- -- -- -- -- -- -- -- -- -- //
self.execute = function(command, args, options, messageCallback, callback)
	{
	var bExited = false;
	var stdout = "";
	var stderr = "";

	var spawned = spawn(command, args, options);

	spawned.stdout.on("data", function(data)
		{
		if(messageCallback)
			messageCallback(false, data);

		stdout += data;
		});

	spawned.stderr.on("data", function(data)
		{
		if(messageCallback)
			messageCallback(true, data);

		stderr += data;
		});

	spawned.on("error", function(err)
		{
		if(!bExited) {
			callback(err, null); bExited = true; }
		});

	spawned.on("close", function(code)
		{
		if(!bExited) {
			callback(null, {code: code, signal: null, stdout: stdout, stderr: stderr}); bExited = true; }
		});

	spawned.on("exit", function(code, signal)
		{
		if(!bExited) {
			callback(null, {code: code, signal: signal, stdout: stdout, stderr: stderr}); bExited = true; }
		});
	}

	// STRING -- -- -- -- -- -- -- -- -- -- //
self.ucfirst = function(str)
	{
	return str.charAt(0).toUpperCase() + str.slice(1);
	}

	// RANDOM -- -- -- -- -- -- -- -- -- -- //
self.randomString = function(length, useAlpha)
	{ // http://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
	var chars = "", i;

	if(useAlpha)
		chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	else
		chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!�$#%&/(){}[]<>|��=+?*,.;:-_";

	var result = "";
	for(i = length; i > 0; --i)
		result += chars[Math.round(Math.random() * (chars.length - 1))];

	return result;
	}

self.generateRandomConnectionId = function(connections)
	{
	var ret;

	while(true)
		{
		ret = Math.floor(Math.random() * 4294967296);	//2 to power 32
		if (!connections.hasOwnProperty(ret))
			break;
		}

	return ret;
	}

self.bytesToHexString = function(bytes)
	{
	for(var hex = [], i = 0; i < bytes.length; i++)
		{
		hex.push((bytes[i] >>> 4).toString(16));
		hex.push((bytes[i] & 0xF).toString(16));
		}

	return hex.join("");
	}

	// DATE -- -- -- -- -- -- -- -- -- -- //
self.getLocalDateTime = function()
	{
	var date;
	date = new Date();
	date = date.getFullYear() + "-" +
	("00" + (date.getMonth()+1)).slice(-2) + "-" +
	("00" + date.getDate()).slice(-2) + " " +
	("00" + date.getHours()).slice(-2) + ":" +
	("00" + date.getMinutes()).slice(-2) + ":" +
	("00" + date.getSeconds()).slice(-2);

	return date;
	}

	// TYPES -- -- -- -- -- -- -- -- -- -- //
self.isObjectEmpty = function(obj)
	{
	return (typeof obj != "object" ? true : (Object.keys(obj).length == 0 ? true : false));
	}

self.assoc = function(_array, _key, _value)
	{ // Imitate associative arrays
	_key in _array ? _array[_key] = [_value] : _array[key].push(_value);

	return _array;
	}

self.toBuffer = function(data)
	{ // Make sure data is an instance of Buffer
	if(data instanceof Buffer)
		return data;
	else if(data instanceof Array || data instanceof Object)
		return new Buffer(JSON.stringify(data), "utf8");
	else if(typeof data == "string")
		return new Buffer(data, "utf8");
	else
		return new Buffer(data.toString(), "utf8");
	}

	// APPLICATION -- -- -- -- -- -- -- -- -- -- //
self.getApplicationIcon = function(manifest, startWithSlash)
	{
	var icon = null;

	if(manifest && manifest.images)
		{
		for(var i = 0; i < manifest.images.length; i++)
			{
			if(manifest.images[i].file.search("/^(icon\.)/i" != -1))
				{
				icon =	(startWithSlash ? "/" : "") + "images/" +
						("directory" in manifest.images[i] ? manifest.images[i].directory + "/" : "") + manifest.images[i].file;
				break;
				}
			}
		}

	return icon;
	}

}

if(true)
	module.exports = SpaceifyUtility;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * CallbackBuffer, 12.5.2016 Spaceify Oy
 *
 * Keep this class dependency free!!!
 *
 * @class CallbackBuffer
 */

function CallbackBuffer(initialListSize)
{
var self = this;

var callbacks = new Object();

self.pushBack = function(id, object, method)
	{
	callbacks[id] = [object, method, Date.now()];
	};

self.callMethodAndPop = function(id, error, result)
	{
	if (callbacks.hasOwnProperty(id))
		{
		(callbacks[id][1]).call(callbacks[id][0], error, result, id, Date.now() - callbacks[id][2]);
		delete callbacks[id];
		}
	else
		throw {error: "CallbackBuffer::callMethodAndPop(). Callback not found"};
	};
}

if (true)
	module.exports = CallbackBuffer;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify Service, 29.7.2015 Spaceify Oy
 *
 * A class for wrapping the local and remote connection logic.
 *
 * @class Connection
 */

function Connection()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);
var isSpaceifyNetwork = (typeof window !== "undefined" && window.isSpaceifyNetwork ? window.isSpaceifyNetwork : false);
var isSpaceletOrigin = (typeof window !== "undefined" && !window.location.hostname.match(/.*spaceify\.net/) ? true : false);

var lib = null;
var LoaderUtil = null;
var SpaceifyConfig = null;
var SpaceifyNetwork = null;
var WebSocketRpcConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";
	LoaderUtil = null;
	SpaceifyNetwork = function() {};
	SpaceifyConfig = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	WebSocketRpcConnection = __webpack_require__(61)(lib + "websocketrpcconnection");
	}
else
	{
	lib = (window.spe ? window.spe : window);

	LoaderUtil = (window.spl ? window.spl.LoaderUtil.getLoaderUtil() : {});
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyNetwork = lib.SpaceifyNetwork;
	WebSocketRpcConnection = lib.WebSocketRpcConnection;
	}

var network = new SpaceifyNetwork();
var config = SpaceifyConfig.getConfig();

var _connection = (isSpaceifyNetwork || isNodeJs || isSpaceletOrigin ? new WebSocketRpcConnection() : LoaderUtil.getPiperClient());

var tunnelId = null;
var isConnected = false;
var isConnecting = false;

self.connect = function(options, callback)
	{
	isConnecting = true;

	if(isSpaceifyNetwork || isNodeJs || isSpaceletOrigin)
		{
		_connection.connect(options, function(err, data)
			{
			if(!err)
				{
				isConnected = true;
				isConnecting = false;

				callback(null, true);
				}
			else
				{
				isConnected = false;
				isConnecting = false;

				callback(err, null);
				}
			});
		}
	else
		{
		_connection.createWebSocketTunnel({host: network.getEdgeURL({ protocol: "" }), port: options.port, protocol: network.getProtocol(false, null)}, null, function(id)
			{
			tunnelId = id;
			isConnected = true;
			isConnecting = false;

			callback(null, true);
			});
		}
	}
self.close = function()
	{
	if(_connection.close)
		_connection.close();

	_connection = null;
	}

self.callRpc = function(/*method, params, callback*/)
	{
	if(isSpaceifyNetwork || isNodeJs || isSpaceletOrigin)
		{
		_connection.callRpc.apply(self, arguments);
		}
	else
		{
		var args = Array.prototype.slice.call(arguments);
		args.unshift(tunnelId);

		_connection.callClientRpc.apply(self, args);
		}
	}

self.exposeRpcMethod = function(name, object, method)
	{
	_connection.exposeRpcMethod(name, object, method);
	}

self.exposeRpcMethodSync = function(name, object, method)
	{
	if(_connection.exposeRpcMethodSync)
		_connection.exposeRpcMethodSync(name, object, method);
	}

self.isConnected = function()
	{
	return isConnected;
	}

self.isConnecting = function()
	{
	return isConnecting;
	}

self.getPort = function()
	{
	return _connection.getPort ? _connection.getPort() : null;
	}

self.getIsOpen = function()
	{
	return _connection.getIsOpen ? _connection.getIsOpen() : null;
	}

self.getId = function()
	{
	return _connection.getId ? _connection.getId() : null;
	}

self.getIsSecure = function()
	{
	return _connection.getIsSecure ? _connection.getIsSecure() : null;
	}

self.setConnectionListener = function(listener)
	{
	if(_connection.setConnectionListener)
		_connection.setConnectionListener(listener);
	}

self.setDisconnectionListener = function(listener)
	{
	if(_connection.setDisconnectionListener)
		_connection.setDisconnectionListener(listener);
	}

}

if(true)
	module.exports = Connection;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * RpcCommunicator, 21.6.2016 Spaceify Oy
 *
 * A class that implements the JSON-RPC 2.0 protocol supporting single, batch and notification requests.
 * Communicates with the outside world with WebSocketConnection or WebRTCConnection objects
 * on the layer below. This is a two-way class that implements both client and server functionality.
 *
 * class @RpcCommunicator
 */

function RpcCommunicator()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);

var lib = null;
var SpaceifyError = null;
var SpaceifyLogger = null;
var CallbackBuffer = null;
var SpaceifyUtility = null;
var fibrous = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyLogger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyError = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	CallbackBuffer = __webpack_require__(58)(lib + "callbackbuffer");
	SpaceifyUtility = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	SpaceifyLogger = lib.SpaceifyLogger;
	SpaceifyError = lib.SpaceifyError;
	CallbackBuffer = lib.CallbackBuffer;
	SpaceifyUtility = lib.SpaceifyUtility;
	fibrous = function(fn) { return fn; };
	}

var errorc = new SpaceifyError();
var utility = new SpaceifyUtility();
var callbackBuffer = new CallbackBuffer();
var logger = new SpaceifyLogger("RpcCommunicator");

var callSequence = 1;
var exposedRpcMethods = {};

var eventListener = null;
var binaryListener = null;
var connectionListeners = [];
var disconnectionListeners = [];

var connections = {};
var latestConnectionId = null;

var EXPOSE_SYNC = 0;
var EXPOSE_TRADITIONAL = 1;
var  REQUEST_STR = "  REQUEST      -> ";
var   NOTIFY_STR = "  NOTIFICATION -> ";
var RESPONSE_STR = "  RETURN VALUE <- ";

//** Upwards interface towards business logic

self.exposeRpcMethod = function(name, object, method)
	{
	try	{
		exposedRpcMethods[name] = {type: EXPOSE_TRADITIONAL, method: method};
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.exposeRpcMethodSync = function(name, object, method)
	{
	try	{
		exposedRpcMethods[name] = {type: EXPOSE_SYNC, method: method};
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.setConnectionListener = function(listener)
	{
	if (typeof listener == "function")
		connectionListeners.push(listener);
	};

self.setDisconnectionListener = function(listener)
	{
	if (typeof listener == "function")
		disconnectionListeners.push(listener);
	};

self.setBinaryListener = function(listener)
	{
	binaryListener = (typeof listener == "function" ? listener : null);
	};

self.connectionExists = function(connectionId)
	{
	if (typeof connectionId !== "undefined" && connections.hasOwnProperty(connectionId) )
		return true;
	else if (typeof connectionId === "undefined" && connections.hasOwnProperty(latestConnectionId))
		return true;
	else
		return false;
	};

self.getConnection = function(connectionId)
	{
	return connections[connectionId];
	};

// Outgoing RPC call

self.callRpc = function(methods, params, object, callback, connectionId)
	{
	var callObject;
	var callObjects = [];
	var isBatch = false, currentId;
	var id = (typeof connectionId != "undefined" ? connectionId : latestConnectionId);		// Assume there is only one connection

	logger.log("RpcCommunicator::callRpc() connectionId: " + connectionId);

	if (!self.connectionExists(connectionId))
		return;

	try	{
		if (!(methods instanceof Array))													// Process single request as "a single batch request"
			{
			isBatch = false;
			params = [params];
			methods = [methods];
			}

		currentId = callSequence;															// Batch requests have only one callback and the id in
																							// the callbackBuffer is the id of the first request
		for(var i=0; i<methods.length; i++)
			{
			if (typeof callback == "function")												// Call: expects a response object
				callObject = {jsonrpc: "2.0", method: methods[i], params: params[i], id: callSequence++};
			else																			// Notification: doesn't expect a response object
				callObject = {jsonrpc: "2.0", method: methods[i], params: params[i]};

			callObjects.push(callObject);

			//logger.log(NOTIFY_STR + JSON.stringify(callObject));
			}

		if (typeof callback == "function")
			callbackBuffer.pushBack(currentId, object, callback);
		}
	catch(err)
		{
		return (typeof callback == "function" ? callback(errorc.makeErrorObject(-32000, "callRpc failed.", "RpcCommunicator::callRpc"), null) : false);
		}

	var request = isBatch ? callObjects : callObjects[0];									// Send as batch only if call was originally batch

	sendMessage(request, id);
	};

// Sends a RPC notification to all connections
self.notifyAll = function(method, params)
	{
	try	{
		for (var key in connections)
			{
			logger.log("RpcCommunicator::notifyAll() sending message to " + key);

			sendMessage({"jsonrpc": "2.0", "method": method, "params": params, "id": null}, key);
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.getBufferedAmount = function(connectionId)
	{
	return connections[connectionId].getBufferedAmount();
	};

self.sendBinary = function(data, connectionId)
	{
	logger.log("RPCCommunicator::sendBinary() " + data.byteLength);

	try	{
		connections[connectionId].sendBinary(data);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

//** Private methods

var sendBinaryCall = function(callId, method, params, connectionId)
	{
	var messageBuffer = new ArrayBuffer(8+4+callId.length+4+method.length+8+params.byteLength);
	var view = new DataView(messageBuffer);
	var messageArray = new Uint8Array(messageBuffer);

	view.setUint32(4, messageBuffer.byteLength - 8);
	view.setUint32(8, callId.length);
	view.setUint32(8 + 4 + callId.length, method.length);

	//messageArray.subarray(8 + 4, 8 + 4 + 4 + callId.length).set(params);
	//messageArray.subarray(8 + 4 + callId.length + 4 + method.length + 8, messageBuffer.byteLength).set(params);

	messageArray.subarray(8 + 4 + callId.length + 4 + method.length + 8, messageBuffer.byteLength).set(params);
	};

var sendMessage = function(message, connectionId)
	{
	try	{
		connections[connectionId].send(JSON.stringify(message));
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};
self.sendMessage = sendMessage;	//for testing, remove this later

// Send the return value of the RPC call to the caller
var sendResponse = function(err, result, id, connectionId)
	{
	try	{
		if (err)
			{
			logger.error(["Exception in executing a RPC method.", err], true, true, logger.ERROR);

			sendMessage({"jsonrpc": "2.0", "error": err, "id": id}, connectionId);
			}
		else
			sendMessage({"jsonrpc": "2.0", "result": result, "id": id}, connectionId);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

var handleMessage = function(requestsOrResponses, connectionId)
	{
	var isBatch = true;

	try	{
		if (!(requestsOrResponses instanceof Array))									// Process single request/response as "a single batch request/response"
			{ requestsOrResponses = [requestsOrResponses]; isBatch = false; }

		if (requestsOrResponses[0].method)												// Received a RPC Call from outside
			{
			logger.log("RpcCommunicator::handleRpcCall() connectionId: " + connectionId);

			if (isNodeJs && !isRealSpaceify)
				{
				fibrous.run( function()
					{
					handleRPCCall.sync(requestsOrResponses, isBatch, [], true, connectionId);
					}, function(err, data) { } );
				}
			else
				handleRPCCall(requestsOrResponses, isBatch, [], true, connectionId);
			}
		else																			// Received a return value(s) to an RPC call made by us
			handleReturnValue(requestsOrResponses, isBatch);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

var handleRPCCall = function(requests, isBatch, responses, onlyNotifications, connectionId)
	{
	var result;
	var request = requests.shift();

	if (!request)
		{
		if (!onlyNotifications && responses.length == 0)
			responses.push({"jsonrpc": "2.0", "error": {"code": -32603, "message": "Internal JSON-RPC error."}, id: null});

		if (responses.length > 0)															// Batch -> [response objects] || Single -> response object
			sendMessage((isBatch ? responses : responses[0]), connectionId);
		}
	else
		{
		var requestId = (request.hasOwnProperty("id") ? request.id : null);
		var rpcParams = (request.hasOwnProperty("params") ? request.params : []);

		if (requestId != null)
			onlyNotifications = false;

		logger.log((requestId ? REQUEST_STR : NOTIFY_STR) + JSON.stringify(request));

		if (!request.jsonrpc || request.jsonrpc != "2.0" || !request.method)				// Invalid JSON-RPC
			{
			addResponse(requestId, {"jsonrpc": "2.0", "error": {"code": -32600, "message": "The JSON sent is not a valid Request object."}, "id": null}, responses);

			return handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
			}

		if (rpcParams !== "undefined" && rpcParams.constructor !== Array )
			{
			addResponse(requestId, {"jsonrpc": "2.0", "error": {"code": -32602, "message": "Invalid method parameter(s). Parameters must be placed inside an array."}, "id": requestId}, responses);

			return handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
			}

		if (!exposedRpcMethods.hasOwnProperty(request.method))								// Unknown method
			{
			addResponse(requestId, {"jsonrpc": "2.0", "error": {"code": -32601, "message": "The method does not exist / is not available: " + request.method + "."}, "id": requestId}, responses);

			return handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
			}

		try	{
			var rpcMethod = exposedRpcMethods[request.method];

			var got = rpcParams.length;														// Check parameter count
			var expected = (rpcMethod.type == EXPOSE_SYNC ? (isRealSpaceify ? rpcMethod.method.length : rpcMethod.method.getLength()) - 1 : rpcMethod.method.length - 2);
																							// Synchronous: ..., connObj
			if (expected < got)																// Traditional: ..., connObj, callback
				rpcParams.splice(expected - got, got - expected);
			else if (expected > got)
				{
				expected = expected - got;
				while(expected--)
					rpcParams.push(null);
				}

			var connObj =	{
							requestId: requestId,
							connectionId: connectionId,
							isSecure: connections[connectionId].getIsSecure(),
							};

			if (!isRealSpaceify)
				{
				connObj.origin = connections[connectionId].getOrigin(),
				connObj.remotePort = connections[connectionId].getRemotePort(),
				connObj.remoteAddress = connections[connectionId].getRemoteAddress()
				}

			if (rpcMethod.type == EXPOSE_SYNC && !isRealSpaceify)							// Core methods wrapped in fibrous
				{
				//result = rpcMethod.method.sync(...rpcParams, connObj);

				rpcParams.push(connObj);
				result = rpcMethod.method.sync.apply(rpcMethod.object, rpcParams);

				addResponse(requestId, result, responses);

				handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
				}
			else if (rpcMethod.type == EXPOSE_SYNC && isRealSpaceify)						// Application methods exposed with exposeRpcMethodSync
				{
				//result = rpcMethod.method(...rpcParams, connObj);

				rpcParams.push(connObj);
				result = rpcMethod.method.apply(rpcMethod.object, rpcParams);

				addResponse(requestId, result, responses);

				handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
				}
			else																			// Traditional callback based methods
				{
				if (requestId != null)															// Request
					{
					/*rpcMethod.method(...rpcParams, connObj, function(err, data)
						{
						if (err)
							{
							addError(requestId, err, responses);

							handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
							}
						else
							{
							addResponse(requestId, data, responses);

							handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
							}
						});*/

					rpcParams.push(connObj, function(err, data)
						{
						callbackReturns(err, data, requestId, requests, isBatch, responses, onlyNotifications, connectionId);
						});
					rpcMethod.method.apply(rpcMethod.object, rpcParams);
					}
				else																			// Notification
					{
					//rpcMethod.method(...rpcParams, connObj, null);

					rpcParams.push(connObj);
					rpcMethod.method.apply(rpcMethod.object, rpcParams);

					handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
					}
				}
			}
		catch(err)
			{
			addError(requestId, err, responses);

			handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
			}
		}
	};

var callbackReturns = function(err, data, requestId, requests, isBatch, responses, onlyNotifications, connectionId)
	{
	if (err)
		{
		addError(requestId, err, responses);

		handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
		}
	else
		{
		addResponse(requestId, data, responses);
		handleRPCCall(requests, isBatch, responses, onlyNotifications, connectionId);
		}
	}

var addResponse = function(requestId, result, responses)
	{
	if (requestId != null)																	// Requests send responses
		{
		result = (typeof result === "undefined" ? null : result);

		logger.log("  RESPONSE <- " + JSON.stringify(result));

		responses.push({jsonrpc: "2.0", result: result, id: requestId});
		}
	//else																					// Notifications can't send responses
	//	logger.log("  NOTIFICATION - NO RESPONSE SEND");
	}

var addError = function(requestId, err, responses)
	{
	if (requestId != null)																	// Requests send responses
		{
		err = errorc.make(err);																	// Make all errors adhere to the SpaceifyError format

		logger.log("  ERROR RESPONSE <- " + JSON.stringify(err));

		responses.push({jsonrpc: "2.0", error: err, id: requestId});
		}
	//else																					// Notifications can't send responses
	//	logger.log("  NOTIFICATION - NO ERROR RESPONSE SEND");
	}

// Handle incoming return values for a RPC call that we have made previously
var handleReturnValue = function(responses, isBatch)
	{
	logger.log("RpcCommunicator::handleReturnValue()");

	var error = null, result = null;

	try	{
		if (isBatch)
			{
			var processed = processBatchResponse(responses);
			callbackBuffer.callMethodAndPop(processed.smallestId, processed.errors, processed.results);
			}
		else
			{
			logger.log(RESPONSE_STR + JSON.stringify(responses[0]));

			if (!responses[0].jsonrpc || responses[0].jsonrpc != "2.0" || !responses[0].id || (responses[0].result && responses[0].error))
				return;

			if (responses[0].hasOwnProperty("error"))
				{
				error = responses[0].error;
				result = null;
				}
			else if (responses[0].hasOwnProperty("result"))
				{
				error = null;
				result = responses[0].result;
				}

			callbackBuffer.callMethodAndPop(responses[0].id, error, result);
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

var processBatchResponse = function(responses)
	{ // Process raw JSON-RPC objects returned by batch JSON-RPC call. Returns an array containing
	  // [{error: .., result: ...}, {error: ..., result: ....}, ...] objects.
	var smallestId = -1;
	var errors = {}, results = {}

	for(var r=0; r<responses.length; r++)
		{
		logger.log(RESPONSE_STR + JSON.stringify(responses[r]));

		if (!responses[r].jsonrpc || responses[r].jsonrpc != "2.0" || !responses[r].id || (responses[r].result && responses[r].error))
			continue;

		smallestId = Math.max(smallestId, responses[r].id);

		if (responses[r].hasOwnProperty("error"))
			{
			errors[responses[r].id] = responses[r].error;
			results[responses[r].id] = null;
			}
		else if (responses[r].hasOwnProperty("result"))
			{
			errors[responses[r].id] = null;
			results[responses[r].id] = results[r].result;
			}
		}

	return {smallestId: smallestId, errors: errors, results: results};
	}

self.setupPipe = function(firstId, secondId)
	{
	logger.log("RpcCommunicator::setupPipe() between: " + firstId + " and " + secondId);

	if (!connections.hasOwnProperty(firstId) || !connections.hasOwnProperty(secondId))
		return;

	connections[firstId].setPipedTo(secondId);
	connections[secondId].setPipedTo(firstId);
	};

//** Downwards interface towards a connection

//** MessageListener interface implementation

self.onMessage = function(messageData, connection)
	{
	//logger.log("RpcCommunicator::onMessage(" + typeof messageData + ") " + messageData);

	try	{
		var pipeTarget = connection.getPipedTo();

		if (pipeTarget != null)
			{
			connections[pipeTarget].send(messageData);

			return;
			}

		if (messageData instanceof ArrayBuffer)
			{
			if (typeof binaryListener == "function")
				binaryListener.onBinary(messageData, connection.getId());

			return;
			}

		// JSON-RPC
		try {
			messageData = JSON.parse(messageData);

			handleMessage(messageData, connection.getId());
			}
		catch (err)
			{
			sendMessage({"jsonrpc": "2.0", "error": {"code": -32700, "message": "Invalid JSON."}, "id": null}, connection.getId());
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

//** EventListener interface implementation (events originate from server)

self.addConnection = function(conn)
	{
	try	{
		if (!conn.getId())
			conn.setId(utility.generateRandomConnectionId(connections));	// Use random connectionId to make ddos a little more difficult

		connections[conn.getId()] = conn;
		conn.setEventListener(self);

		for(var i=0; i<connectionListeners.length; i++)						// Bubble the event to client
			connectionListeners[i](conn.getId());

		latestConnectionId = conn.getId();
		return conn.getId();
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.onDisconnected = function(connectionId)
	{
	try	{
		self.closeConnection(connectionId);

		for(var i=0; i<disconnectionListeners.length; i++)			// Bubble the event to clients
			disconnectionListeners[i](connectionId);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

//** ---------------------------------------

self.closeConnection = function(connectionId)
	{
	try	{
		if (connectionId in connections)
			{
			connections[connectionId].close();
			delete connections[connectionId];
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

}

// Do this only in node.js, not in the browser

if (true)
	module.exports = RpcCommunicator;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
var RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;

function WebRtcConnection(rtcConfig)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var SpaceifyLogger = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyLogger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	SpaceifyLogger = lib.SpaceifyLogger;
	}

var logger = new SpaceifyLogger("WebRtcConnection");

var id = null;
var ownStream = null;
var partnerId = null;
var iceListener = null;
var streamListener = null;
var listener = null;
var eventListener = null;
var dataChannelListener = null;

var rtcOptions = { "optional": [{"DtlsSrtpKeyAgreement": true}] };

var peerConnection = new RTCPeerConnection(rtcConfig, rtcOptions);

var dataChannel = null;

// If we receive a data channel from somebody else, this gets called

peerConnection.ondatachannel = function(e)
	{
	var temp = e.channel || e; // Chrome sends event, FF sends raw channel

	logger.log("WebRtcConnection::peerConnection.ondatachannel", e);

	dataChannel = temp;
	dataChannel.binaryType = "arraybuffer";
	dataChannel.onopen = self.onDataChannelOpen;
	dataChannel.onmessage = self.onMessage;
	};

var onsignalingstatechange = function(state)
	{
	logger.log("WebRtcConnection::onsignalingstatechange", state);

	//if ( eventListener == "function" && peerConnection.signalingState == "closed")
	//	eventListener.onDisconnected(partnerId);
	}

var oniceconnectionstatechange = function(state)
	{
	logger.log("WebRtcConnection::oniceconnectionstatechange", state);

	if ( eventListener == "function" && (peerConnection.iceConnectionState == "disconnected" || peerConnection.iceConnectionState == "closed"))
		eventListener.onDisconnected(partnerId);
	};

var onicegatheringstatechange = function(state)
	{
	logger.log("WebRtcConnection::onicegatheringstatechange", state);
	};

var onIceCandidate = function(e)
	{
	logger.log("WebRtcConnection::onIceCanditate - partnerId:", partnerId, ", event:", e, "> iceListener was", iceListener);

	// A null ice canditate means that all canditates have been given
	if (e.candidate == null)
		{
		logger.log("> All Ice candidates listed");
		//iceListener.onIceCandidate(peerConnection.localDescription, partnerId);
		}
	else
		{
		iceListener.onIceCandidate(e.candidate, partnerId);
		}
	};

peerConnection.onsignalingstatechange = onsignalingstatechange;
peerConnection.oniceconnectionstatechange = oniceconnectionstatechange;
peerConnection.onicegatheringstatechange = onicegatheringstatechange;
peerConnection.onicecandidate = onIceCandidate;

self.close = function()
	{
	logger.log("WebRtcConnection::close");

	//peerConnection.removeStream(ownStream);
	dataChannel.close();
	if (peerConnection.signalingState != "closed")
		peerConnection.close();
	}

self.send = function(message)
	{
	try	{
		if (dataChannel.readyState == "open")
			dataChannel.send(message);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.getBufferedAmount = function()
	{
	return dataChannel.bufferedAmount;
	};

self.sendBinary = function(data)
	{
	try	{
		if (dataChannel.readyState == "open")
			dataChannel.send(data);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.onDataChannelClosed = function(e)
	{
	logger.log("WebRtcConnection::onDataChannelClosed", e);

	eventListener.onDisconnected(self);
	}

self.onDataChannelOpen = function(e)
	{
	logger.log("WebRtcConnection::onDataChannelOpen", e);

	dataChannel.binaryType = "arraybuffer";
	dataChannel.onclose = self.onDataChannelClosed;
	dataChannel.onmessage = self.onMessage;
	if (dataChannelListener)
		dataChannelListener.onDataChannelOpen(self);
	}

self.onMessage = function(message)
	{
	//logger.log("WebRtcConnection::onMessage", message.data);

	try	{
		if (listener)
			listener.onMessage(message.data, self);
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.setId = function(id_)
	{
	id = id_;
	//logger.log("WebRtcConnection::setId", id);
	};

self.getId = function()
	{
	//logger.log("WebRtcConnection::getId", id);

	return id;
	};

self.getPartnerId = function()
	{
	//logger.log("WebRtcConnection::getPartnerId", partnerId);

	return partnerId;
	};

self.setPartnerId = function(id_)
	{
	partnerId = id_;
	};

self.setDataChannelListener = function(lis)
	{
	dataChannelListener = lis;
	};

self.setListener = function(lis)
	{
	listener = lis;
	};

self.setIceListener = function(lis)
	{
	iceListener = lis;
	//peerConnection.onicecandidate = function(cand) {self.onIceCandidate(cand);};

	logger.log("WebRtcConnection::setIceListener", lis);
	};

self.setStreamListener = function(lis)
	{
	streamListener = lis;
	peerConnection.onaddstream = function(e) {self.onStream(e);};
	peerConnection.onremovestream = function(e) {self.onRemoveStream(e);};
	};

self.setEventListener = function(lis)
	{
	eventListener = lis;
	//peerConnection.onaddstream = function(e) {self.onStream(e);};
	};

self.onStream = function(e)
	{
	logger.log("WebRtcConnection::onStream", e);

	streamListener.onStream(e.stream, partnerId);
	}

self.onRemoveStream = function(e)
	{
	logger.log("WebRtcConnection::onStream", e);

	streamListener.onRemoveStream(e.stream, partnerId);
	}

self.addStream = function(stream)
	{
	ownStream = stream;
	peerConnection.addStream(stream);
	}

self.createConnectionOffer = function(callback)
	{
	var localDescription = null;

	dataChannel = peerConnection.createDataChannel("jsonrpcchannel", {reliable: true});
	dataChannel.binaryType = "arraybuffer";
	dataChannel.onopen = self.onDataChannelOpen;
	dataChannel.onmessage = self.onMessage;

	peerConnection.createOffer(function (desc)
		{
		logger.log("WebRtcConnection::peerConnectio.createOffer - Called its callback:", desc);

		localDescription = desc;

		/*
		peerConnection.onicecandidate = function(e)
			{
			logger.log(e.candidate);

			if (e.candidate == null)
				{
				logger.log("> All Ice candidates listed");

				//iceListener.onIceCandidate(peerConnection.localDescription, partnerId);
				callback(peerConnection.localDescription, partnerId);
				}
			};
		*/

		peerConnection.setLocalDescription(desc,
			function()
				{
				callback(peerConnection.localDescription, partnerId);
				},
			function(err)
				{ // "WebRtcConnection::createConnectionOffer - setLocalDescription error"
				logger.error(err, true, true, logger.ERROR);
				},
			{});
		},
		function(err)
			{
			logger.error(err, true, true, logger.ERROR);
			});
	};

//Interface for messages coming from the partner ove websocket

self.onConnectionAnswerReceived = function(descriptor)
	{
	logger.log("WebRtcConnection::onConnectionAnswerReceived, descriptor:", descriptor);

	peerConnection.setRemoteDescription(new RTCSessionDescription(descriptor), function()
		{
		logger.log("WebRtcConnection::onConnectionAnswerReceived() - setRemoteDescription returned OK");
		},
		function(err)
			{ // "WebRtcConnection::onConnectionAnswerReceived() setRemoteDescription returned error " + err
			logger.error(err, true, true, logger.ERROR);
			});

	};


self.onConnectionOfferReceived = function(descriptor, connectionId, callback)
	{
	logger.log("WebRtcConnection::onConnectionOfferReceived - Trying to set remote description");

	var desc = new RTCSessionDescription(descriptor);
	peerConnection.setRemoteDescription(desc, function()
		{
		logger.log("WebRtcConnection::onConnectionOfferReceived Remote description set");

		peerConnection.createAnswer(function (answer)
				{
				/*
				peerConnection.onicecandidate = function(e)
					{
					if (e.candidate == null)
						{
						logger.log("> All Ice candidates listed");

						//iceListener.onIceCandidate(peerConnection.localDescription, partnerId);
						callback(peerConnection.localDescription);
						}
					};
				*/
				peerConnection.setLocalDescription(answer, function ()
					{
					callback(peerConnection.localDescription);
					//callback(answer);
					},
					function(err)
						{
						logger.error(err, true, true, logger.ERROR);
						}
					);
				},
				function(err)
					{
					logger.error(err, true, true, logger.ERROR);
					});
		},
		function(err)
			{ // "WebRtcConnection::onConnectionOfferReceived setting remote description failed " + err
			logger.error(err, true, true, logger.ERROR);
			});

	};

self.onIceCandidateReceived = function(iceCandidate)
	{
	peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate),
			function()
				{
				logger.log("WebRtcConnection::onIceCandidateReceived - Adding Ice candidate succeeded");
				},
			function(err)
				{ // "WebRtcConnection::onIceCandidateReceived adding Ice candidate failed " + err
				logger.error(err, true, true, logger.ERROR);
				});
	};

// Dummy implementation for websocket compatibility

self.setPipedTo = function(targetId)
	{
	};

self.getPipedTo = function()
	{
	return null;
	};

}

if (true)
	module.exports = WebRtcConnection;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * WebSocketRpcServer, 21.6.2016 Spaceify Oy
 *
 * @class WebSocketRpcServer
 */

function WebSocketRpcServer()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
//var SpaceifyLogger = null;
//var SpaceifyConfig = null;
var RpcCommunicator = null;
var WebSocketServer = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	//SpaceifyLogger = require(lib + "spaceifylogger");
	//SpaceifyConfig = require(lib + "spaceifyconfig");
	RpcCommunicator = __webpack_require__(15)(lib + "rpccommunicator");
	WebSocketServer = __webpack_require__(62)(lib + "websocketserver");
	}
else
	{
	lib = (window.spe ? window.spe : window);

	//SpaceifyLogger = window.SpaceifyLogger;
	//SpaceifyConfig = window.SpaceifyConfig;
	RpcCommunicator = window.RpcCommunicator;
	WebSocketServer = window.WebSocketServer;
	}

//var config = SpaceifyConfig.getConfig();
var communicator = new RpcCommunicator();
var webSocketServer = new WebSocketServer();
//var logger = new SpaceifyLogger("WebSocketRpcServer");

webSocketServer.setEventListener(communicator);

var connectionListener = null;
var disconnectionListener = null;

self.listen = function(options, callback)
	{
	communicator.setConnectionListener(listenConnections);
	communicator.setDisconnectionListener(listenDisconnections);

	try {
		webSocketServer.listen(options, callback);
		}
	catch(err)
		{}
	}

self.close = function()
	{
	webSocketServer.close();
	}

self.getCommunicator = function()
	{
	return communicator;
	}

self.getServer = function()
	{
	return webSocketServer;
	}

// Inherited methods
self.getPort = function()
	{
	return webSocketServer.getPort();
	}

self.getIsOpen = function()
	{
	return webSocketServer.getIsOpen();
	}

self.getIsSecure = function()
	{
	return webSocketServer.getIsSecure();
	}

self.getId = function()
	{
	return webSocketServer.getId();
	}

self.exposeRpcMethod = function(name, object, method)
	{
	communicator.exposeRpcMethod(name, object, method);
	}

self.exposeRpcMethodSync = function(name, object, method)
	{
	communicator.exposeRpcMethodSync(name, object, method);
	}

self.nofifyAll = function(method, params)
	{
	communicator.nofifyAll(method, params);
	}

self.callRpc = function()
	{ // arguments contains a connection id!
	communicator.callRpc.apply(this, arguments);
	}

self.closeConnection = function(connectionId)
	{
	communicator.closeConnection(connectionId);
	}

self.setConnectionListener = function(listener)
	{
	connectionListener = (typeof listener == "function" ? listener : null);
	}

self.setDisconnectionListener = function(listener)
	{
	disconnectionListener = (typeof listener == "function" ? listener : null);
	}

self.setServerUpListener = function(listener)
	{
	webSocketServer.setServerUpListener(typeof listener == "function" ? listener : null);
	}

self.setServerDownListener = function(listener)
	{
	webSocketServer.setServerDownListener(typeof listener == "function" ? listener : null);
	}

	// Call listeners with additional server information
var listenConnections = function(id)
	{
	if(typeof connectionListener == "function")
		connectionListener(id, self.getId(), self.getIsSecure());
	}

var listenDisconnections = function(id)
	{
	if(typeof disconnectionListener == "function")
		disconnectionListener(id, self.getId(), self.getIsSecure());
	}

}

if (true)
	module.exports = WebSocketRpcServer;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * WebSocketServer, 21.6.2016 Spaceify Oy
 *
 * @class WebSocketServer
 */

function WebSocketServer()
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var SpaceifyLogger = null;
var SpaceifyConfig = null;
var SpaceifyUtility = null;
var WebSocketConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyLogger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyConfig = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyUtility = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	WebSocketConnection = __webpack_require__(17)(lib + "websocketconnection");

	global.fs = __webpack_require__(0);
	global.URL = __webpack_require__(71);
	global.http = __webpack_require__(65);
	global.https = __webpack_require__(66);
	global.WSServer = __webpack_require__(35).server;
	}
else
	{
	lib = (window.spe ? window.spe : window);

	SpaceifyLogger = window.SpaceifyLogger;
	SpaceifyConfig = window.SpaceifyConfig;
	SpaceifyUtility = window.SpaceifyUtility;
	WebSocketConnection = window.WebSocketConnection;
	}

var utility = new SpaceifyUtility();
var config = SpaceifyConfig.getConfig();
var logger = new SpaceifyLogger("WebSocketServer");

var options = {};
var manuallyClosed = false;
var serverDownTimerId = null;

var wsServer = null;
var webServer = null;

var eventListener = null;
var externalServerUpListener = null;
var externalServerDownListener = null;

self.listen = function(opts, callback)
	{
	try	{
		if(!("id" in options))														// Set only once
			{
			options.hostname = opts.hostname || null;
			options.port = opts.port || 0;
			options.key = opts.key || "";
			options.crt = opts.crt || "";
			options.caCrt = opts.caCrt || "";
			options.isSecure = opts.isSecure || false;
			options.keepUp = opts.keepUp || "";
			options.protocol = (!options.isSecure ? "ws" : "wss");
			options.subprotocol = opts.subprotocol || "json-rpc";
			options.id = opts.id || utility.generateRandomConnectionId({});
			}

		logger.log(utility.replace("WebSocketServer::listen() protocol: ~pr, subprotocol: ~s, hostname: ~h, port: ~po",
									{"~pr": options.protocol, "~s": options.subprotocol, "~h": options.hostname, "~po": options.port}));

		manuallyClosed = false;

			// CREATE HTTP SERVER -- -- -- -- -- -- -- -- -- -- //
		if (!options.isSecure)																// Start a http server
			{
			webServer = http.createServer(function(request, response)
				{
				response.writeHead(501);
				response.end("Not implemented");
				});
			}
		else																				// Start a https server
			{
			var key = fs.readFileSync(options.key);
			var crt = fs.readFileSync(options.crt);
			var caCrt = fs.readFileSync(options.caCrt, "utf8");

			webServer = https.createServer({ key: key, cert: crt, ca: caCrt }, function(request, response)
				{
				response.writeHead(501);
				response.end("Not implemented");
				});
			}

		webServer.listen(options.port, options.hostname, 511, function()
			{
			options.port = webServer.address().port;

			serverUpListener();

			if(typeof callback == "function")
				callback(null, true);
			});

		webServer.on("error", function(err)
			{
			logger.error("WebSocketServer::onError()", true, true, logger.ERROR);

			serverDownListener();

			if(typeof callback == "function")
				callback(err, null);
			});

		webServer.on("close", function()
			{
			serverDownListener();
			});

			// CREATE WEBSOCKET SERVER -- -- -- -- -- -- -- -- -- -- //
		wsServer = new WSServer(
			{
			httpServer: webServer,
			autoAcceptConnections: false,

			keepalive: true,																// Keepalive connections and
			keepaliveInterval: 60000,														// ping them once a minute and
			dropConnectionOnKeepaliveTimeout: true,											// drop a connection if there's no answer
			keepaliveGracePeriod: 10000														// within the grace period.
			});

		// Connection request
		wsServer.on("request", function(request)
			{
			try
				{
				var connection = new WebSocketConnection();
				connection.setSocket(request.accept(options.subprotocol, request.origin));
				connection.setRemoteAddress(request.remoteAddress);
				connection.setRemotePort(request.remotePort);
				connection.setOrigin(request.origin);
				connection.setIsSecure(options.isSecure);

				var query = URL.parse(request.resourceURL, true).query;
				if (query && query.id)
					connection.setId(query.id);

				eventListener.addConnection(connection);

				logger.log(utility.replace("WebSocketServer::request(~lp) protocol: ~p, remoteAddress: ~ra, remotePort: ~rp, origin: ~o, id: ~i",
						{"~lp": options.port, "~p": options.protocol, "~ra": request.remoteAddress, "~rp": request.remotePort, "~o": request.origin, "~i": connection.getId()}, "-"));
				}
			catch(err)
				{
				logger.error(err, true, true, logger.ERROR);
				return;
				}
			});

		// Connection is accepted
		wsServer.on("connect", function(webSocketConnection)
			{
			});

		// Connection closed
		wsServer.on("close", function(webSocketConnection, closeReason, description)
			{
			});
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.close = function()
	{
	try	{
		logger.log(utility.replace("WebSocketServer::close() protocol: :pr, subprotocol: :s, hostname: :h, port: :po",
									{":pr": options.protocol, ":s": options.subprotocol, ":h": options.hostname, ":po": options.port}));

		manuallyClosed = true;

		if(wsServer)
			{
			wsServer.shutDown();
			wsServer = null;
			}

		if(webServer)
			{
			webServer.close();
			webServer = null;
			}
		}
	catch(err)
		{
		logger.error(err, true, true, logger.ERROR);
		}
	};

self.getPort = function()
	{
	return options.port;
	}

self.getIsOpen = function()
	{
	return (webServer && wsServer ? true : false);
	}

self.getIsSecure = function()
	{
	return options.isSecure;
	}

self.getId = function()
	{
	return options.id;
	}

self.setEventListener = function(listener)
	{
	eventListener = listener;
	};

// INTERNAL SERVER UP AND DOWN LISTENERS AND KEEPUP LOGIC
var serverUpListener = function()
	{
	if(externalServerUpListener)
		externalServerUpListener(options.id);
	}

var serverDownListener = function()
	{
	if(externalServerDownListener)
		externalServerDownListener(options.id);

	if(options.keepUp && serverDownTimerId == null && !manuallyClosed)
		{
		serverDownTimerId = setTimeout(function()
			{
			serverDownTimerId = null;
			self.listen(options, null);
			}, config.RECONNECT_WAIT);
		}
	}

	// EXTERNAL SERVER UP AND DOWN LISTENERS
self.setServerUpListener = function(listener)
	{
	externalServerUpListener = (typeof listener == "function" ? listener : null);
	}

self.setServerDownListener = function(listener)
	{
	externalServerDownListener = (typeof listener == "function" ? listener : null);
	}

}

if (true)
	module.exports = WebSocketServer;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./webjsonrpc/connection": 24,
	"./webjsonrpc/webrtcconnection": 26,
	"./webjsonrpc/websocketconnection": 11,
	"./webjsonrpc/websocketrpcconnection": 12
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 29;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifycore": 19
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 30;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifylogger": 8
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 31;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 32;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 33;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_34__;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_35__;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * SpaceifyApp, 8.11.2017 Spaceify Oy
 *
 * Angular for Spaceify
 *
 * @class SpaceifyApp
 */

function SpaceifyApp()
{
var self = this;

var lib = (window.spe ? window.spe : window);
var sdom = new lib.SpaceifyDOM();

var spaceifyApp = window.angular.module("spaceifyApp", []);

	// BOOTSTRAP MANUALLY AFTER 'spaceifyReady' EVENT: angular.bootstrap(document, ["spaceifyApp"]); -- -- -- -- -- -- -- -- -- -- //

	// CONTROLLERS -- -- -- -- -- -- -- -- -- -- //
spaceifyApp.controller("bodyController", ["$scope", "$window", "$compile", "$timeout", function($scope, $window, $compile, $timeout)
	{
	$scope.safeApply = function(fn)
		{ // Get rid of "$apply already in progress errors" - https://coderwall.com/p/ngisma/safe-apply-in-angular-js
		var phase = this.$root.$$phase;
		if(phase == '$apply' || phase == '$digest')
			{
			if(fn && (typeof(fn) === 'function'))
				fn();
			}
		else
			this.$apply(fn);
		};

	$scope.getString = function(section, index)
		{
		return window.spelocales[spelocale][section][index];
		}

	$scope.addTile = function(detail)
		{
		$scope.manifest = (detail.manifest ? detail.manifest : {});
		$scope.sp_src = (detail.sp_src ? detail.sp_src : "");
		$scope.id = (detail.id ? detail.id : "");

		$scope.safeApply(function()
			{
			var content = $compile(window.spetiles[detail.type])($scope);	// compile, bind to scope and append

			sdom.append(detail.container, content[0]);

			if(typeof detail.callback == "function")
				$timeout(detail.callback, 0);
			});
		};
	}]);

	// DIRECTIVES -- -- -- -- -- -- -- -- -- -- //
spaceifyApp.directive("bodyDirective", ["$rootScope", "$compile", "$timeout", function($rootScope, $compile, $timeout)
	{
	return {
			restrict: "AE",
			bindToController: true,
			controller: "bodyController",
			link: function(scope, element, attr, controller, transcludeFn) {}
		};
	}]);

	// FILTERS -- -- -- -- -- -- -- -- -- -- //
spaceifyApp.filter("replace", function()
	{
	return function(input, find, replace_)
		{
		return input.replace(find, replace_);
		};
	});

spaceifyApp.filter("capitalize", function()
	{
	return function(input)
		{
		return input.charAt(0).toUpperCase() + input.slice(1);
		};
	});

spaceifyApp.filter("trustasresourceurl", ["$sce", function($sce)
	{
	return function(input)
		{
		return $sce.trustAsResourceUrl(input);
		};
	}]);

self.getCookie = function(cname)
	{
	var name = cname + "=";
	var ca = document.cookie.split(";");
	for(var i = 0; i < ca.length; i++)
		{
		var c = ca[i];
		while(c.charAt(0) == " ")
			c = c.substring(1);

		if(c.indexOf(name) != -1)
			return c.substring(name.length, c.length);
		}

	return "";
	}

self.bootstrap = function()
	{
	//window.addEventListener("load", function()
	angular.element(document).ready(function()
		{
		angular.bootstrap(document, ["spaceifyApp"]);
		});
	}

var spelocale = self.getCookie("locale") || "en_US";
}

if(true)
	module.exports = SpaceifyApp;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify application, 25.1.2016 Spaceify Oy
 *
 * @class SpaceifyApplication
 */

function SpaceifyApplication()
{
// NODE.JS / REAL SPACEIFY - - - - - - - - - - - - - - - - - - - -

var isNodeJs = (typeof window === "undefined" ? true : false);
var isRealSpaceify = (isNodeJs && typeof process.env.IS_REAL_SPACEIFY !== "undefined" ? true : false);

var lib = null;
var WebServer = null;
var SpaceifyCore = null;
var SpaceifyConfig = null;
var SpaceifyLogger = null;
var SpaceifyUtility = null;
var SpaceifyService = null;
var fibrous = null;

if(isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	WebServer = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	SpaceifyCore = __webpack_require__(30)(lib + "spaceifycore");
	SpaceifyConfig = __webpack_require__(1)(lib + "spaceifyconfig");
	SpaceifyLogger = __webpack_require__(31)(lib + "spaceifylogger");
	SpaceifyUtility = __webpack_require__(14)(lib + "spaceifyutility");
	SpaceifyService = __webpack_require__(55)(lib + "spaceifyservice");
	fibrous = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	}
else
	{
	lib = (window.spe ? window.spe : window);

	WebServer = function() {};
	SpaceifyCore = lib.SpaceifyCore;
	SpaceifyConfig = lib.SpaceifyConfig;
	SpaceifyLogger = lib.SpaceifyLogger;
	SpaceifyUtility = lib.SpaceifyUtility;
	SpaceifyService = lib.SpaceifyService;
	fibrous = function(fn) { return fn; };
	}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var self = this;

var httpServer = new WebServer();
var httpsServer = new WebServer();
var utility = new SpaceifyUtility();
var spaceifyCore = new SpaceifyCore();
var spaceifyService = new SpaceifyService();
var config = SpaceifyConfig.getConfig("realpaths");
var logger = new SpaceifyLogger("SpaceifyApplication");

var manifest = null;
var application = null;

var HTTP_PORT = (isRealSpaceify ? 80 : null);
var HTTPS_PORT = (isRealSpaceify ? 443 : null);

self.start = function()
	{
	if(isNodeJs)
		start.apply(self, arguments);
	else
		self.connect.apply(self, arguments);
	}

var start = function(application_, options)
	{
	fibrous.run( function()
		{
		var server;
		var port;
		var securePort;
		var registerHttp;
		var hasWebServers;
		var listenHttp = false;
		var listenHttps = false;
		var listenSecure = true;
		var listenUnsecure = true;

		application = application_;

			// OPTIONS -- -- -- -- -- -- -- -- -- -- //
		options = options || {};

		hasWebServers = (options.webservers || options.webServers ? true : false);

		if(hasWebServers)
			{
			server = options.webservers || options.webServers;
			listenHttp = ("http" in server ? server.http : false);
			listenHttps = ("https" in server ? server.https : false);
			}

		if(options.websocketservers || options.webSocketServers)
			{
			server = options.websocketservers || options.webSocketServers;
			listenSecure = ("secure" in server ? server.secure : false);
			listenUnsecure = ("unsecure" in server ? server.unsecure : false);
			}

			// APPLICATION -- -- -- -- -- -- -- -- -- -- //
		try {
			manifest = utility.sync.loadJSON(config.VOLUME_APPLICATION_PATH + config.MANIFEST, true, true);

				// SERVICES -- -- -- -- -- -- -- -- -- -- //
			if(manifest.provides_services)														// <= SERVERS - PROVIDES SERVICES
				{
				var services = manifest.provides_services;

				for(var i = 0; i < services.length; i++)
					{
					if(services.service_type == config.ALIEN)
						continue;

					port = (isRealSpaceify ? config.FIRST_SERVICE_PORT + i : null);
					securePort = (isRealSpaceify ? config.FIRST_SERVICE_PORT_SECURE + i : null);

					spaceifyService.sync.listen(services[i].service_name, manifest.unique_name, port, securePort, listenUnsecure, listenSecure);
					}
				}

			if(manifest.requires_services)														// <= CLIENTS - REQUIRES SERVICES
				{
				createRequiredServices.sync(manifest.requires_services, 0, false);
				createRequiredServices.sync(manifest.requires_services, 0, true);
				}

				// START APPLICATIONS HTTP AND HTTPS WEB SERVERS -- -- -- -- -- -- -- -- -- -- //
			if(hasWebServers)
				{
				var opts =	{
							hostname: config.ALL_IPV4_LOCAL,
							key: config.VOLUME_TLS_PATH + config.SERVER_KEY,
							crt: config.VOLUME_TLS_PATH + config.SERVER_CRT,
							caCrt: config.API_WWW_PATH + config.SPACEIFY_CRT,
							wwwPath: config.VOLUME_APPLICATION_WWW_PATH,
							indexFile: config.INDEX_FILE,
							serverName: manifest.name + " Server"
							};

				registerHttp = false;

				if(listenHttp && !httpServer.getIsOpen())
					{
					opts.isSecure = false;
					opts.port = HTTP_PORT;
					opts.mappedPort = (isRealSpaceify ? process.env["PORT_80"] : null);
					httpServer.setSessionManager(null, config.SESSION_TOKEN_NAME);
					httpServer.listen.sync(opts);

					HTTP_PORT = httpServer.getPort();											// Get the port because native and develop mode applications
																								// do not have knowledge of port numbers beforehand
					registerHttp = true;
					}

				if(listenHttps && !httpsServer.getIsOpen())
					{
					opts.isSecure = true;
					opts.port = HTTPS_PORT;
					opts.mappedPort = (isRealSpaceify ? process.env["PORT_443"] : null);
					httpsServer.setSessionManager(null, config.SESSION_TOKEN_NAME);
					httpsServer.listen.sync(opts);

					HTTPS_PORT = httpsServer.getPort();

					registerHttp = true;
					}

				if(registerHttp && !isRealSpaceify)
					{
					spaceifyCore.sync.registerService("http", {unique_name: manifest.unique_name, port: HTTP_PORT, securePort: HTTPS_PORT});
					console.log("    LISTEN -----> " + config.HTTP + " - port: " + HTTP_PORT + ", secure port: " + HTTPS_PORT);
					}
				}

			if(application && application.start && typeof application.start == "function")
				application.start();

				// APPLICATION INITIALIALIZED SUCCESSFULLY -- -- -- -- -- -- -- -- -- -- //
			console.log(config.APPLICATION_INITIALIZED, "---", manifest.unique_name);
			}
		catch(err)
			{
			initFail.sync(err);
			}
		}, function(err, data)
			{
			//initFail.sync(err);
			});
	}

self.connect = function(application_, unique_names, options)
	{ // Setup connections to open services of applications and spacelets; open, open_local or both depending from where this method is called
	try {
		application = application_;

		if(unique_names.constructor !== Array)													// getOpenServices takes an array of unique names
			unique_names = [unique_names];

		spaceifyCore.getOpenServices(unique_names, false, function(err, services)
			{
			if(err)
				throw err;
			else
				connectServices(application, services);
			});
		}
	catch(err)
		{
		if(typeof application == "function")
			application(err, false);
		else if(application && application.fail && typeof application.fail == "function")
			application.fail(err);
		}
	}

var connectServices = function(application_, services)
	{ // Connect to services in the array one at a time
	var service = services.shift();

	application = application_;

	if(typeof service === "undefined")
		{
		if(typeof application == "function")
			application(null, true);
		else if(application && application.start && typeof application.start == "function")
			application.start();

		return;
		}

	spaceifyService.connect(service.service_name, function(err, data)
		{
		connectServices(application, services);
		});
	}

var initFail = fibrous( function(err)
	{ // FAILED TO INITIALIALIZE THE APPLICATION. -- -- -- -- -- -- -- -- -- -- //
	logger.error([";;", err, "::"], true, true, logger.ERROR);
	console.log(manifest.unique_name + config.APPLICATION_UNINITIALIZED);						// console.log is used intentionally!!!

	stop.sync(err);
	});

var stop = fibrous( function(err)
	{
	httpServer.close();
	httpsServer.close();

	spaceifyService.disconnect();																// Disconnect clients
	spaceifyService.close();																	// Close servers

	spaceifyCore.close();

	if(application && application.fail && typeof application.fail == "function")
		application.fail(err);
	});

var createRequiredServices = function(services, position, isSecure, callback)
	{
	if(position == services.length)
		callback();
	else
		{
		spaceifyService.connect(services[position++].service_name, isSecure, function(err, data)
			{
			createRequiredServices(services, position, isSecure, callback);
			});
		}
	}

	// METHODS -- -- -- -- -- -- -- -- -- -- //
self.getOwnUrl = function(isSecure)
	{
	if(!isNodeJs)
		return null;

	var ownUrl = (!isSecure ? "http://" : "https://") + config.EDGE_HOSTNAME + ":" + (!isSecure ? HTTP_PORT : HTTPS_PORT);

	return ownUrl;
	}

self.getManifest = function()
	{
	return manifest;
	}

	// REQUIRED (= CLIENT) -- -- -- -- -- -- -- -- -- -- //
self.getRequiredService = function(service_name)
	{
	return spaceifyService.getRequiredService(service_name);
	}

self.getRequiredServiceSecure = function(service_name)
	{
	return spaceifyService.getRequiredServiceSecure(service_name);
	}

	// PROVIDED (= SERVICE) -- -- -- -- -- -- -- -- -- -- //
self.getProvidedService = function(service_name)
	{
	return spaceifyService.getProvidedService(service_name);
	}

self.getProvidedServiceSecure = function(service_name)
	{
	return spaceifyService.getProvidedServiceSecure(service_name);
	}

}

if(true)
	module.exports = (typeof window === "undefined" ? new SpaceifyApplication() : SpaceifyApplication);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify Application Manager, 8.1.2016 Spaceify Oy
 *
 * For Spaceify's internal use.
 *
 * Messages might arrive after the actual operation is finished. Therefore, both the operation
 * and messaging are waited before returning to the caller
 *
 * @class SpaceifyApplicationManager
 */

function SpaceifyApplicationManager()
{
var self = this;

var lib = (window.spe ? window.spe : window);

var errorc = new lib.SpaceifyError();
var network = new lib.SpaceifyNetwork();
var utility = new lib.SpaceifyUtility();
var config = lib.SpaceifyConfig.getConfig();
var spaceifyMessages = new lib.SpaceifyMessages();
//var logger = new lib.SpaceifyLogger("SpaceifyApplicationManager");

var operation;																	// Queue operation, execute operations in order
var operations = [];

var sequence = 0;
var error = null;
var result = null;

/**
 * @param   package            (1) unique name of a package in the spaceify registry or a URL to a package in the (2) GitHub repository or in the (3) Internet
 * @param   username           optional username/password for loading packages requiring credentials, set to "" (empty string) if not required
 * @param   password
 * @param   handler            custom handlet callback, null if application doesn't have one
 * @param   origin             callbacks for different types of Application manager messages:
 *                             error, warning, failed, message, question, questionTimedOut
 */
self.installApplication = function(applicationPackage, username, password, force, origin, handler)
	{
	setup("installApplication", {package: applicationPackage, username: username, password: password, force: force, }, origin, handler, true);
	}

/**
 * @param   unique_name       unique name of an application to remove/start/stop/restart
 * @param   origin            callbacks for different types of Application manager messages:
 *                            error, warning, failed, message, question, questionTimedOut
 * @param   handler           application defined callback, null if application doesn't have one
 */
self.removeApplication = function(unique_name, origin, handler)
	{
	setup("removeApplication", {unique_name: unique_name}, origin, handler, true);
	}

self.purgeApplication = function(unique_name, origin, handler)
	{
	setup("purgeApplication", {unique_name: unique_name}, origin, handler, true);
	}

self.startApplication = function(unique_name, origin, handler)
	{
	setup("startApplication", {unique_name: unique_name}, origin, handler, true);
	}

self.stopApplication = function(unique_name, origin, handler)
	{
	setup("stopApplication", {unique_name: unique_name}, origin, handler, true);
	}

self.restartApplication = function(unique_name, origin, handler)
	{
	setup("restartApplication", {unique_name: unique_name}, origin, handler, true);
	}

self.logIn = function(password, origin, handler)
	{
	setup("logIn", {password: password}, origin, handler, false);
	}

self.logOut = function(origin, handler)
	{
	setup("logOut", {}, origin, handler, false);
	}

self.isAdminLoggedIn = function(origin, handler)
	{
	setup("isAdminLoggedIn", {}, origin, handler, true);
	}

self.getCoreSettings = function(origin, handler)
	{
	setup("getCoreSettings", {}, origin, handler, true);
	}

self.saveCoreSettings = function(settings, origin, handler)
	{
	setup("saveCoreSettings", {settings: settings}, origin, handler, true);
	}

self.getEdgeSettings = function(origin, handler)
	{
	setup("getEdgeSettings", {}, origin, handler, true);
	}

self.saveEdgeSettings = function(settings, origin, handler)
	{
	setup("saveEdgeSettings", {settings: settings}, origin, handler, true);
	}

self.getServiceRuntimeStates = function(origin, handler)
	{
	setup("getServiceRuntimeStates", {}, origin, handler, true);
	}

/**
 * @param   types   an array of application types: "spacelet", "sandboxed", "sandboxed_debian" and/or "native_debian" or empty for all types,
 *                  e.g. ["spacelet", "sandboxed"]
 * @param   origin  callbacks for different types of Application manager messages:
 *                  error, warning, failed, message, question, questionTimedOut
 * @return          Node.js style error and data objects. data contains manifests of installed applications as JavaScript Objects
 *                  grouped by type {spacelet: [{}, ...], sandboxed: [{}, ...], sandboxed_debian: [{}, ...], native_debian: [{}, ....]}
 */
self.getApplications = function(types, origin, handler)
	{
	setup("getApplications", {types: types}, origin, handler, true);
	}

/**
 * @param   types  an array of application types: "spacelet", "sandboxed", "sandboxed_debian" and/or "native_debian" or empty for all types,
 *          e.g. ["spacelet", "sandboxed"]
 * @return         Node.js style error and data objects. data contains manifests of published packages as JavaScript Objects and MySQL query information
 *                 {spacelet: [{}, ...], sandboxed: [{}, ...], sandboxed_debian: [{}, ...], native_debian: [{}, ....], MySQL}.
 */
self.appStoreGetPackages = function(search, returnCallback)
	{
	var search = JSON.stringify(search);
	var content = 'Content-Disposition: form-data; name="search";\r\nContent-Type: plain\/text; charset=utf-8';

	network.POST_FORM(config.EDGE_APPSTORE_GET_PACKAGES_URL, [{content: content, data: search}], "application/json", function(err, response)
		{
		var err = null;
		var data = null;

		try {
			response = response.replace(/&quot;/g, '"');
			response = response.replace(/\\|^"|"$/g, '');

			data = JSON.parse(response);

			if(data.error)
				{
				err = data.error;
				data = null;
				}
			}
		catch(err_)
			{
			err = errorc.makeErrorObject("JSON", "Failed to get packages: JSON.parse failed", "SpaceifyApplicationManager::appStoreGetPackages");
			}

		returnCallback(err, data);
		});
	}

/**
 *
 */
var setup = function(type, params, origin, handler, getMessages)
	{
	var op = { type: type, params: params, origin: origin, handler: handler, getMessages: getMessages, ms: Date.now(), id: utility.randomString(16, true) };

 	if(operations.length == 0)
 		{
		operation = op;
		connect();
 		}
 	else
		operations.push(op);
	}

var connect = function()
	{
	if(operation.getMessages)											// Set up messaging before doing the operation
		spaceifyMessages.connect(self, operation.origin);
	else																// Connection is already open or do the operation without messaging
		self.connected();
	}

	// -- //
self.connected = function()
	{ // Messaging is now set up (or bypassed), post the operation.
	sequence = 1;

	var post = { type: operation.type };								// One object with operation and custom parameters
	for(var i in operation.params)
		post[i] = operation.params[i];

	network.doOperation(post, function(err, data)
		{
		error = err;
		result = data;

		self.end(1);
		});
	}

self.fail = function(err)
	{ // Failed to set up the messaging.
	error = err;
	result = null;

	self.end(2);
	}

self.end = function(sequence)
	{ // Either operation or messaging finishes first. Wait for both of them to finish before returning.
	sequence += sequence;
	if(sequence != 2)
		return;

	var errors = spaceifyMessages.getErrors();

	if(error || errors.length > 0)
		operation.origin.error(error ? [error] : errors, operation.id, Date.now() - operation.ms);
	else if(typeof operation.handler == "function")
		operation.handler(result, operation.id, Date.now() - operation.ms);

	if(operations.length > 0)
		{
		operation = operations.shift();
		connect();
		}
	}

 /*
 * @param   result             the user selected answer either in the short or long format
 * @param   answerCallBackId   the id given by Application manager in a call to questionsCallback
 */
self.answer = function(result_, answerCallBackId)
	{
	spaceifyMessages.answer(result_, answerCallBackId);
	}

}

if(true)
	module.exports = SpaceifyApplicationManager;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify Cache, 29.7.2015 Spaceify Oy
 *
 * Keep this class dependency free!!!
 *
 * A cache class to reduce unnecessary RPC calls by storing application data.
 * For Spaceify's internal use.
 *
 * @class SpaceifyCache
 */

function SpaceifyCache()
{
var self = this;

var ready_counter = 0;

var applications = {};
var EXPIRATION_TIME = 60 * 1000;

var config = SpaceifyConfig.getConfig();

self.setApplication = function(application)
	{
	if(!applications[application.unique_name])
		applications[application.unique_name] = {};

	applications[application.unique_name].manifest = application;
	applications[application.unique_name].isRunning = application.isRunning;
	}

self.getApplication = function(unique_name)
	{
	return (unique_name in applications ? applications[unique_name] : null);
	}

	// SERVICES -- -- -- -- -- -- -- -- -- -- //
self.setService = function(service, unique_name)
	{
	if(service.service_type != config.HTTP)
		return;

	if(!applications[unique_name])
		applications[unique_name] = {};

	if(!applications[unique_name].services)
		applications[unique_name].services = [];

	applications[unique_name].services.push(service);
	}

self.getService = function(service_name, unique_name)
	{ // Get service either by service name (when unique_name is not set) or by service name and unique_name.
	for(var UNIQUE_NAME in applications)														// Iterate all applications
		{
		var services = (applications[UNIQUE_NAME].services ? applications[UNIQUE_NAME].services : []);	// Find from the services they have
		for(var s = 0; s < services.length; s++)
			{
			var SERVICE_NAME = services[s].service_name;

			// 1:
			// Multiple applications can have the same service name. Return the first matching service.
			// Without checking the unique_name the HTTP service of the first application would always be returned.
			// 2:
			// The service belongs to the requested unique application
			if( /*1*/ (!unique_name && service_name == SERVICE_NAME && service_name != config.HTTP) ||
			    /*2*/ (unique_name && unique_name == UNIQUE_NAME && service_name == SERVICE_NAME) )
				return services[s];
			}
		}

	return null;
	}

	// MANIFEST -- -- -- -- -- -- -- -- -- -- //
self.setManifest = function(unique_name, manifest)
	{
	if(!applications[unique_name])
		applications[unique_name] = {};

	applications[unique_name].manifest = manifest;
	}

self.getManifest = function(unique_name)
	{
	return (applications[unique_name] && applications[unique_name].manifest ? applications[unique_name].manifest : null);
	}

	// RUNNING STATUS -- -- -- -- -- -- -- -- -- -- //
self.setRunning = function(unique_name, isRunning)
	{
	if(!applications[unique_name])
		applications[unique_name] = {};

	applications[unique_name].isRunning = isRunning;
	applications[unique_name].isRunningStart = Date.now();
	}

self.isRunning = function(unique_name)
	{
	if(!applications[unique_name] || !applications[unique_name].hasOwnProperty("isRunning"))
		return null;

	var run_time = Date.now() - applications[unique_name].isRunningStart;			// Running status expires after the expiration time
	return (run_time > EXPIRATION_TIME ? null : applications[unique_name].isRunning);
	}

	// APPLICATION URLS -- -- -- -- -- -- -- -- -- -- //
self.setApplicationURL = function(unique_name, urls)
	{
	if(!applications[unique_name])
		applications[unique_name] = {};

	applications[unique_name].urls = urls;
	applications[unique_name].urls_start = Date.now();
	}

self.getApplicationURL = function(unique_name)
	{
	if(!applications[unique_name] || !applications[unique_name].hasOwnProperty("urls"))
		return null;

	var urls_time = Date.now() - applications[unique_name].urls_start;				// URLs expire after the expiration time
	return (urls_time > EXPIRATION_TIME ? null : applications[unique_name].urls);
	}

}

if(true)
	module.exports = SpaceifyCache;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * SpaceifyDOM, 8.11.2017 Spaceify Oy
 *
 * Some DOM helper functions.
 *
 * @class SpaceifyDOM
 */

function SpaceifyDOM()
{
var self = this;

self.show = function(elements, status)
	{
	var i, ids, elem;

	ids = elements.split(",");

	for (i = 0; i < ids.length; i++)
		{
		elem = document.getElementById(ids[i].trim());

		if (elem)
			elem.style.display = (!status ? "none" : "block");
		}
	}

self.empty = function(ids)
	{
	var i, ids = ids.split(","), element;

	for (i = 0; i < ids.length; i++)
		{
		element = document.getElementById(ids[i].trim());

		while (element.firstChild)
    		element.removeChild(element.firstChild);
		}
	}

self.remove = function(parentId, id)
	{
	var parent = document.getElementById(parentId);
	var element = document.getElementById(id);

	parent.removeChild(element);
	}

self.value = function(id, value)
	{
	var result = null, element = document.getElementById(id);

	if (element)
		{
		if (value)
			{
			element.value = value;
			}
		else
			{
			result = element.value;
			}
		}

	return result;
	}

self.focus = function(id)
	{
	var element = document.getElementById(id);

	if (element)
		element.focus();
	}

self.append = function(id, content)
	{
	var element = document.getElementById(id);

	if (element)
		{
		if (typeof content == "string")
			element.appendChild(document.createTextNode(content));
		else
			element.appendChild(content);
		}

	}

}

if (true)
	module.exports = SpaceifyDOM;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify Messages, 21.1.2016 Spaceify Oy
 *
 * For Spaceify's internal use. Use only on web pages.
 *
 * @class SpaceifyMessages
 */

function SpaceifyMessages()
{
var self = this;

var lib = (window.spe ? window.spe : window);

var connection = new lib.Connection();
var network = new lib.SpaceifyNetwork();
var config = lib.SpaceifyConfig.getConfig();
//var logger = new lib.SpaceifyLogger("SpaceifyMessages");

var messageId;
var errors = [];
var warnings = [];
var callerOrigin = null;
var managerOrigin = null;

self.connect = function(managerOrigin_, callerOrigin_)
	{
	errors = [];
	warnings = [];
	callerOrigin = callerOrigin_;
	managerOrigin = managerOrigin_;

	var protocol, host, options = { hostname: network.getEdgeURL({ protocol: "" }), port: config.APPMAN_MESSAGE_PORT_SECURE, isSecure: true };

	if (connection.isConnected())
		return managerOrigin.connected();

	connection.exposeRpcMethod("stdout", self, stdout);
	connection.exposeRpcMethod("fail", self, fail);
	connection.exposeRpcMethod("error", self, error);
	connection.exposeRpcMethod("warning", self, warning);
	connection.exposeRpcMethod("notify", self, notify);
	connection.exposeRpcMethod("message", self, message);
	connection.exposeRpcMethod("question", self, question);
	connection.exposeRpcMethod("questionTimedOut", self, questionTimedOut);
	connection.exposeRpcMethod("end", self, end);

	network.doOperation({ type: "requestMessageId" }, function(err, gotId)						// Request a messageId
		{
		if (err)
			return fail(err);

		messageId = gotId;

		if (messageId !== null)
			{
			connection.connect(options, function(err, data)
				{
				if (err)
					return fail(err);

				connection.callRpc("confirm", [messageId]);

				managerOrigin.connected();
				});
			}
		else
			{
			managerOrigin.connected();
			}
		});
	}

self.isConnected = function()
	{
	return connection.isConnected();
	}

self.getErrors = function()
	{
	return errors;
	}

self.getWarnings = function()
	{
	return warnings;
	}

	// Exposed RPC methods -- -- -- -- -- -- -- -- -- -- //
var fail = function(err, connObj, callback)
	{
	if (callerOrigin.fail)
		callerOrigin.fail(err);

	managerOrigin.fail(err);

	if (typeof callback === "function")
		callback(null, true);
	}

var error = function(err, connObj, callback)
	{
	errors.push(err);

	if (typeof callback === "function")
		callback(null, true);
	}

var warning = function(message_, code, connObj, callback)
	{
	warning.push({message: message_, code: code});

	if (callerOrigin.warning)
		callerOrigin.warning(message_, code);

	if (typeof callback === "function")
		callback(null, true);
	}

var notify = function(message_, code, connObj, callback)
	{
	if (callerOrigin.notify)
		callerOrigin.notify(message_, code, connObj, callback);

	if (typeof callback === "function")
		callback(null, true);
	}

var message = function(message_, connObj, callback)
	{
	if (callerOrigin.message)
		callerOrigin.message(message_);

	if (typeof callback === "function")
		callback(null, true);
	}

var stdout = function(message_, connObj, callback)
	{
	if (callerOrigin.stdout)
		callerOrigin.stdout(message_);

	if (typeof callback === "function")
		callback(null, true);
	}

var question = function(message_, choices, origin, answerCallBackId, connObj, callback)
	{
	if (callerOrigin.question)
		callerOrigin.question(message_, choices, origin, answerCallBackId);

	if (typeof callback === "function")
		callback(null, true);
	}

var questionTimedOut = function(message_, origin, answerCallBackId, connObj, callback)
	{
	if (callerOrigin.questionTimedOut)
		callerOrigin.questionTimedOut(message_, origin, answerCallBackId);

	if (typeof callback === "function")
		callback(null, true);
	}

var end = function(message_, connObj, callback)
	{
	managerOrigin.end(1);

	if (typeof callback === "function")
		callback(null, true);
	}

	// Response methods -- -- -- -- -- -- -- -- -- -- //
self.sendAnswer = function(answer, answerCallBackId)
	{
	connection.callRpc("answer", [messageId, answer, answerCallBackId]);
	}

}

if (true)
	module.exports = SpaceifyMessages;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * SpaceifyNet, 29.7.2015 Spaceify Oy
 *
 * For Spaceify's internal use. Use only on web pages.
 *
 * @class SpaceifyNet
 */

function SpaceifyNet()
{
var self = this;

var ordinal = 0;
var showLoadingInstances = 0;
var applications = { spacelet: {}, sandboxed: {}, sandboxed_debian: {}, native_debian: {}, spacelet_count: 0, sandboxed_count: 0, sandboxed_debian_count: 0, native_debian_count: 0 };

var lib = (window.spe ? window.spe : window);

var spdom = new lib.SpaceifyDOM();
var core = new lib.SpaceifyCore();
var utility = new lib.SpaceifyUtility();
var network = new lib.SpaceifyNetwork();
var sam = new lib.SpaceifyApplicationManager();
var config = lib.SpaceifyConfig.getConfig();
//var logger = new lib.SpaceifyLogger("SpaceifyNet");

var WWW_PORT = 80;
var WWW_PORT_SECURE = 443;

var APPTILE = "apptile";
var APPTILE_ = APPTILE + "_";

	// USER INTERFACE -- -- -- -- -- -- -- -- -- -- //
self.showLoading = function(show)
	{
	if (show)
		{
		if (showLoadingInstances == 0)
			spdom.show([{ id: "loading", status: "block" }]);

		showLoadingInstances++;
		}
	else
		{
		showLoadingInstances = Math.max(0, --showLoadingInstances);

		if (showLoadingInstances == 0)
			spdom.show([{ id: "loading", status: "none" }]);
		}
	}

var alertTimerIds = { error: null, success: null };
self.showError = function(id, msgstr) { alerts(id, msgstr, "error"); }
self.showSuccess = function(msgstr) { alerts(id, msgstr, "success"); }
var alerts = function(id, msgstr, type)
	{
	var txt, element = document.getElementById(id);

	if (element)
		{
		if (alertTimerIds[type])
			clearTimeout(alertTimerIds[type]);

		spdom.empty(id);

		txt = document.createTextNode(msgstr);
		element.appendChild(txt);

		element.style.visibility = "visible";

		alertTimerIds[type] = window.setTimeout(function() { element.style.visibility = "hidden"; alertTimerIds[type] = null; }, 5000);
		}
	}

var msgFormat = function(msg)
	{
	var rmsg = "", i;

	if (self.isArray(msg))
		{
		for (i = 0; i < msg.length; i++)
			rmsg += (rmsg != "" ? "<br>" : "") + msg[i];
		}
	else
		rmsg = msg;

	return rmsg;
	}

self.onEnterPress = function(e)
	{
	var key = (typeof e == null ? window.event.keyCode : e.keyCode);
	return (key == 13 || key == 10 ? true : false);
	}

self.isArray = function(obj)
	{
	return Object.prototype.toString.call(obj) === "[object Array]";
	}

var scope = function(id)
	{
	return angular.element(document.getElementById(id)).scope();
	}

	// SPLASH -- -- -- -- -- -- -- -- -- -- //
self.setSplashAccepted = function()
	{
	try {
		core.setSplashAccepted(function(err, data)
			{
			if (data && data == true)
				window.location.reload(true);
			});
		}
	catch(err)
		{
		//logger.error(err, true, true, 0, logger.ERROR);
		}
	}

self.loadCertificate = function()
	{
	var src = network.getEdgeURL({ withEndSlash: true }) + "spaceify.crt";

	document.getElementById("certIframe").setAttribute("sp_src", src);

	spaceifyLoader.loadData(document.getElementById("certIframe"), {}, null);

	return true;
	}

self.adminLogOut = function(loadLaunchPage)
	{
	var sam = new SpaceifyApplicationManager();

	this.error = this.fail = this.warning = this.notify = this.message = function()
		{}

	this.ok = function()
		{
		if (loadLaunchPage)
			self.loadLaunchPage();
		}

	sam.logOut(self, this.ok);
	}

	// PAGE BROWSER -- -- -- -- -- -- -- -- -- -- //
self.loadAppstorePage = function(mode)
	{
	var sp_page;
	var url = network.getEdgeURL({ /*protocol: "https", */withEndSlash: true });
	var port = (!network.isSecure() ? WWW_PORT : WWW_PORT_SECURE);
	
	spaceifyLoader.loadPage(config.INDEX_FILE/*sp_page*/, port/*sp_port*/, url + config.APPSTORE/*sp_host*/, url/*spe_host*/);
	}

self.loadLaunchPage = function()
	{
	var url = network.getEdgeURL({ /*protocol: "https", */withEndSlash: true });
	var port = (!network.isSecure() ? WWW_PORT : WWW_PORT_SECURE);

	spaceifyLoader.loadPage(config.INDEX_FILE/*sp_page*/, port/*sp_port*/, url/*sp_host*/, url/*spe_host*/);
	}

self.loadSecurePage = function()
	{
	var src = network.getEdgeURL({ protocol: "https", withEndSlash: true });
	window.location.replace(src);
	}

	// APPLICATIONS -- -- -- -- -- -- -- -- -- -- //
self.showInstalledApplications = function(callback)
	{
	spdom.empty("spacelet, sandboxed, sandboxed_debian, native_debian");

	var methods = [], j;

	core.getApplicationData(function(err, apps)
		{
		if (!apps)
			return (typeof callback == "function" ? callback() : false);

		for (j = 0; j < apps.spacelet.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.spacelet[j], null], type: "async"});

		for (j = 0; j < apps.sandboxed.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.sandboxed[j], null], type: "async"});

		for (j = 0; j < apps.sandboxed_debian.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.sandboxed_debian[j], null], type: "async"});

		for (j = 0; j < apps.native_debian.length; j++)
			methods.push({object: self, method: self.renderTile, params: [apps.native_debian[j], null], type: "async"});

		new SpaceifySynchronous().waterFall(methods, function()
			{
			if (typeof callback == "function")
				callback();
			});
		});

	}

self.renderTile = function(manifest, callback)
	{
	var element, query;
	var sp_port, host, sp_host, spe_host, sp_path, icon, id;

	if (manifest.hasTile)																			// Application supplies its own tile
		{
		core.getApplicationURL(manifest.unique_name, function(err, appURL)
			{
			sp_port = (!network.isSecure() ? appURL.port : appURL.securePort);

			spe_host = network.getEdgeURL({ withEndSlash: true });

			if (appURL.implementsWebServer && sp_port)
				{
				host = spe_host;
				sp_host = spe_host;
				}
			else
				{
				host = network.externalResourceURL(manifest.unique_name, { withEndSlash: true });
				sp_host = host;
				}

			sp_path = config.TILEFILE;

			id = APPTILE_ + manifest.unique_name.replace("/", "_");
			scope("edgeBody").addTile({type: APPTILE, container: manifest.type, manifest: manifest, id: id, callback:
				function()
					{
					query = {};
					query.sp_port = sp_port;
					query.sp_host = encodeURIComponent(sp_host);
					query.sp_path = encodeURIComponent(sp_path);
					query.spe_host = encodeURIComponent(spe_host);

					element = document.getElementById(id);
					element.src = host + "remote.html" + network.remakeQueryString(query, [], {}, "", true);

					callback();
					}
				});
			});
		}
	else																							// Spaceify renders default tile
		{
		if ((icon = utility.getApplicationIcon(manifest, false)))
			{
			sp_host = network.externalResourceURL(manifest.unique_name, { protocol: "", withEndSlash: true });
			sp_path = icon;
			}
		else
			{
			sp_host = network.getEdgeURL({ withEndSlash: true });
			sp_path = "images/icon.png";
			}

		id = "iconimage_" + manifest.unique_name.replace("/", "_");
		scope("edgeBody").addTile({type: "tile", container: manifest.type, manifest: manifest, id: id, sp_src: sp_host + sp_path, callback: function()
			{
			spaceifyLoader.loadData(document.getElementById(id), {}, callback);
			} });
		}

	addApplication(manifest);
	}

self.removeTile = function(type, manifest)
	{
	var id = manifest.unique_name.replace(/\//, "_");

	removeApplication(manifest);

	spdom.show(type + ", " + type + "_header", (applications[type + "_count"] > 0 ? "block" : "none"));

	spdom.remove(type, APPTILE_ + id);
	}

var addApplication = function(manifest)
	{
	if (manifest.type == config.SPACELET)
		{ applications.spacelet[manifest.unique_name] = manifest; applications.spacelet_count++; }
	else if (manifest.type == config.SANDBOXED)
		{ applications.sandboxed[manifest.unique_name] = manifest; applications.sandboxed_count++; }
	else if (manifest.type == config.SANDBOXED_DEBIAN)
		{ applications.sandboxed_debian[manifest.unique_name] = manifest; applications.sandboxed_debian_count++; }
	else if (manifest.type == config.NATIVE_DEBIAN)
		{ applications.native_debian[manifest.unique_name] = manifest; applications.native_debian_count++; }
	}

var removeApplication = function(manifest)
	{
	if (manifest.type == config.SPACELET)
		{ delete applications.spacelet[manifest.unique_name]; applications.spacelet_count--; }
	else if (manifest.type == config.SANDBOXED)
		{ delete applications.sandboxed[manifest.unique_name]; applications.sandboxed_count--; }
	else if (manifest.type == config.SANDBOXED_DEBIAN)
		{ delete applications.sandboxed_debian[manifest.unique_name]; applications.sandboxed_debian_count--; }
	else if (manifest.type == config.NATIVE_DEBIAN)
		{ delete applications.native_debian[manifest.unique_name]; applications.native_debian_count--; }
	}

self.getApplications = function()
	{
	return applications;
	}

}

if (true)
	module.exports = SpaceifyNet;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spaceify Synchronous, 29.7.2015 Spaceify Oy
 *
 * Keep this class dependency free!!!
 *
 * @class SpaceifySynchronous
 */

function SpaceifySynchronous()
{
var self = this;

var methodId = 0;
var methods = [];
var results = {};
var waiting = null;
var finally_ = null;

// Start traversing functions in the order they are defined. Functions are executed independently and results are not passed to the next function.
// The results of operations are stored in the results object in the same order as the functions were executed.
self.waterFall = function(_methods, callback)
	{
	if((!_methods || _methods.length == 0) && typeof callback == "function")
		callback(results);
	else if(!_methods || _methods.length == 0 || typeof callback != "function")
		return;

	finally_ = callback;

	methods = _methods;

	next();
	}

// Call the methods one after another recursively
var next = function()
	{
	if(methods.length == 0)
		return finally_();

	var calling = methods.shift();

	// Call a method that is asynchronous. Store the original callback and replace it with ours. It's assumed that
	// the original callback is the last parameter. After our callback returns call the original callback, if it is defined (not null).
	if(calling.type == "async")
		{
		waiting = calling.params[calling.params.length - 1];
		calling.params[calling.params.length - 1] = wait;
		calling.method.apply(calling.object, calling.params);
		}
	// Call a method that is synchronous.
	else
		{
		results[++methodId] = calling.method.apply(calling.object, calling.params);
		next();
		}
	}

var wait = function()
	{
	results[++methodId] = Array.prototype.slice.call(arguments);			// Array of return values rather than the arguments object

	if(typeof waiting == "function")
		waiting.apply(this, arguments);

	next();
	}

self.getResult = function(methodId)
	{
	return (results[methodId] ? results[methodId] : null);
	}

self.getResults = function()
	{
	return results;
	}

}

if(true)
	module.exports = SpaceifySynchronous;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Spacelet, 24.1.2016 Spaceify Oy
 *
 * For webpage use.
 *
 * class @Spacelet
 */

function Spacelet()
{
var self = this;

var lib = (window.spe ? window.spe : window);

var core = new lib.SpaceifyCore();
//var logger = new lib.SpaceifyLogger("Spacelet");
var spaceifyService = new lib.SpaceifyService();
var spaceifyNetwork = new lib.SpaceifyNetwork();

self.start = function(application, unique_name, callback)
	{ // callback takes preference over application context
	try {
		core.startSpacelet(unique_name, function(err, serviceobj)
			{
			if(err)
				{
				if(typeof application == "function")
					application(err, false);
				else if(application && application.fail)
					application.fail(err);
				}
			else
				{
				for(var i = 0; i < serviceobj.serviceNames.length; i++)
					{
					spaceifyService.connect(serviceobj.serviceNames[i], (i + 1 != serviceobj.serviceNames.length ? null : function(err, data)
						{
						if(typeof application == "function")
							application(null, true);
						else if(application && application.start)
							application.start();
						}));
					}
				}
			});
		}
	catch(err)
		{
		if(typeof application == "function")
			application(err, false);
		else if(application && application.fail)
			application.fail(err);
		}
	}

self.getRequiredService = function(service_name)
	{
	return spaceifyService.getRequiredService(service_name);
	}

self.getRequiredServiceSecure = function(service_name)
	{
	return spaceifyService.getRequiredServiceSecure(service_name);
	}

self.isSpaceifyNetwork = function(timeout, callback)
	{
	spaceifyNetwork.isSpaceifyNetwork(timeout, callback);
	}

}

if(true)
	module.exports = Spacelet;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


navigator.getUserMedia = (	navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.msGetUserMedia);

function WebRtcClient(rtcConfig)
{
var self = this;

var isNodeJs = (typeof window === "undefined" ? true : false);

var lib = null;
var SpaceifyLogger = null;
//var SpaceifyConfig = null;
var RpcCommunicator = null;
var WebSocketConnection = null;

if (isNodeJs)
	{
	lib = "/var/lib/spaceify/code/";

	SpaceifyLogger = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }());
	//SpaceifyConfig = require(lib + "spaceifyconfig");
	RpcCommunicator = __webpack_require__(15)(lib + "rpccommunicator");
	WebSocketConnection = __webpack_require__(17)(lib + "websocketconnection");
	}
else
	{
	lib = (window.spe ? window.spe : window);

	SpaceifyLogger = lib.SpaceifyLogger;
	//SpaceifyConfig = lib.SpaceifyConfig;
	RpcCommunicator = lib.RpcCommunicator;
	WebSocketConnection = lib.WebSocketConnection;
	}

var communicator = new RpcCommunicator();
var connection = new WebSocketConnection();
//var speconfig = SpaceifyConfig.getConfig();
var logger = new SpaceifyLogger("WebRtcClient");

var ownStream = null;
var connectionListener = null;
var rtcConnections = new Object();

self.setConnectionListener = function(lis)
	{
	connectionListener = lis;
	}

self.onIceCandidate = function(iceCandidate, partnerId)
	{
	logger.log("WebRtcClient::onIceCandidate - Got it, sending it to the other client");

	communicator.callRpc("offerIce", [iceCandidate, partnerId]);
	};

var createConnection = function(partnerId)
	{
	rtcConnections[partnerId] = new WebRtcConnection(rtcConfig);
	rtcConnections[partnerId].setPartnerId(partnerId);

	rtcConnections[partnerId].setIceListener(self);
	rtcConnections[partnerId].setStreamListener(self);
	rtcConnections[partnerId].setConnectionListener(self);
	rtcConnections[partnerId].setDataChannelListener(self);
	}

self.shutdown = function(e)
	{
	logger.log("WebRtcClient::onbeforeunload");

	for (var id in rtcConnections)
		{
		if (rtcConnections.hasOwnProperty(id))
			{
			rtcConnections[id].close();
			delete rtcConnections[id];
			}
		}
	}

// RPC methods

self.handleRtcOffer = function(descriptor, partnerId, connectionId)
	{
	logger.log("WebRtcClient::handleRtcOffer descriptor:", descriptor);

	if (!rtcConnections.hasOwnProperty(partnerId))
		{
		createConnection(partnerId);
		}

	rtcConnections[partnerId].onConnectionOfferReceived(descriptor, connectionId, function(answer)
		{
		logger.log("WebRtcClient::handleRtcOffer - onConnectionOfferReceived returned");

		communicator.callRpc("acceptConnectionOffer",[answer, partnerId]);
		});

	};

self.handleRtcAnswer = function(descriptor, partnerId, connectionId)
	{
	logger.log("WebRtcClient::handleRtcAnswer");

	rtcConnections[partnerId].onConnectionAnswerReceived(descriptor);
	};

self.handleIceCandidate = function(iceCandidate, partnerId, connectionId)
	{
	logger.log("WebRtcClient::handleIceCandidate");

	if (!rtcConnections.hasOwnProperty(partnerId))
		{
		createConnection(partnerId);
		}

	rtcConnections[partnerId].onIceCandidateReceived(iceCandidate);
	};

// Private methods

var connectToCoordinator = function(config, callback)
	{
	logger.log("WebRtcClient::connectToCoordinator", "> Websocket connecting to the coordinator");

	connection.connect(config, function()
		{
		logger.log("WebRtcClient::connectToCoordinator - Websocket Connected to the Coordinator");
		logger.log("> Creating RPCCommunicator for the Websocket");

		communicator.addConnection(connection);
		callback();
		});
	};

self.onDisconnected = function(partnerId)
	{
	logger.log("WebRtcClient::onDisconnected");

	if (rtcConnections.hasOwnProperty(partnerId))
		{
		var connection = rtcConnections[partnerId];
		connectionListener.onDisconnected(connection.getId());

		connection.close();
		delete rtcConnections[partnerId];
		}
	};

self.onDataChannelOpen = function(connection)
	{
	logger.log("WebRtcClient::onDataChannelOpen");

	connectionListener.addConnection(connection);
	};

self.onStream = function(stream, partnerId)
	{
	logger.log("WebRtcClient::onStream");
	};

self.onRemoveStream = function(stream, partnerId)
	{
	logger.log("WebRtcClient::onRemoveStream");

	self.onDisconnected(partnerId);
	};

var connectToPeers = function(announceId, callback)
	{
	logger.log("WebRtcClient::connectToPeers - Announcing to the Coordinator");

	communicator.callRpc("announce", [announceId], self, self.onPeerIdsArrived);
	};

//Callback of the connectToPeers RPC call

self.onPeerIdsArrived = function(err, data, id)
	{
	logger.log("WebRtcClient::onPeerIdsArrived - data.length:", data.length);

	var partnerId = 0;

	for (var i=0; i<data.length; i++)
		{
		partnerId = data[i];

		//Create a WebRTC connection and

		createConnection(partnerId);

		logger.log("WebRtcClient::onPeerIdsArrived - Trying to create offer to client id", partnerId);

		//Creating a connection offer

		rtcConnections[partnerId].createConnectionOffer(function(offer, peerId)
			{
			logger.log("WebRtcClient::onPeerIdsArrived - Offer created, sending it to the other client", peerId);

			communicator.callRpc("offerConnection", [offer, peerId]);
			});
		}

	if (data.length === 0)
		logger.log("> Announce returned 0 client ids, not connecting");
	};

self.run = function(config, callback)
	{
	logger.log("WebRtcClient::run");

	window.onbeforeunload = self.shutdown;

	communicator.exposeRpcMethod("handleRtcOffer", self, self.handleRtcOffer);
	communicator.exposeRpcMethod("handleRtcAnswer", self, self.handleRtcAnswer);
	communicator.exposeRpcMethod("handleIceCandidate", self, self.handleIceCandidate);

	connectToCoordinator(config, function()
		{
		logger.log("WebRtcClient::run - Connected to the coordinator");

		connectToPeers(config.announceId, function()
			{
			logger.log("WebRtcClient::run - connectToPeers returned");
			});

		if (callback)
			callback(communicator);
		});

	};
}

if (true)
	module.exports = WebRtcClient;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SpeConfig =
{
logger:
	{
	// Overrides everything (including the individual class configurations)

	loggerConfigOverride:
		{
		all: true
		},

	// Class configurations (overrides defaultLoggerConfig)

		// x

	// Default logger config

	defaultLoggerConfig:
		{
		log: true,
		dir: true,
		info: true,
		error: true,
		warn: true,
		all: null,
		mydefault1: 1,
		mydefault2: 2
		}
	},

// a test value for the unit tests

testValue: "TestValueFromSplConfig"
};

Object.freeze(SpeConfig);

if (true)
	module.exports = SpeConfig;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function()
{
var self = this;

self.make = function()
	{
	var SpaceifyConfig = __webpack_require__(3);
	var config = SpaceifyConfig.getConfig();

	return "(function spaceifyConfig(){window.speconfig=" + config.toMinifiedJSONString() + ";})();\n";
	}
}


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var fs = __webpack_require__(0);
var module_ = __webpack_require__(48);

var config = (new module_()).make();

fs.writeFileSync(__dirname + "/../../libs/spaceify.config.js", config, "utf8");

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./config.js": 5,
	"./spaceifyconfig.js": 3,
	"./spebaseconfig.js": 10,
	"./speconfig.js": 47,
	"./webpack/make.config.js": 49
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 50;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 51;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./logger": 6,
	"./spaceifylogger": 8
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 52;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./service": 18,
	"./spaceifyservice": 9
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 53;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifynetwork": 20
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 54;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./spaceifyservice": 9
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 55;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 56;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./webjsonrpc/websocketrpcserver": 27
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 57;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./callbackbuffer": 23
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 58;


/***/ }),
/* 59 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 59;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 60;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./websocketrpcconnection": 12
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 61;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./websocketserver": 28
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 62;


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_63__;

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_65__;

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_66__;

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_67__;

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_68__;

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_69__;

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_70__;

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_71__;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
{
Config: __webpack_require__(5),
SpeBaseConfig: __webpack_require__(10),
Logger: __webpack_require__(6),
SpaceifyError: __webpack_require__(7),
SpaceifyLogger: __webpack_require__(8),

SpaceifyDOM: __webpack_require__(40),
Service: __webpack_require__(18),
SpaceifyApplication: __webpack_require__(37),
SpaceifyApplicationManager: __webpack_require__(38),
SpaceifyCache: __webpack_require__(39),
SpaceifyConfig: __webpack_require__(3),
SpaceifyCore: __webpack_require__(19),
SpaceifyMessages: __webpack_require__(41),
SpaceifyNet: __webpack_require__(42),
SpaceifyNetwork: __webpack_require__(20),
SpaceifyService: __webpack_require__(9),
SpaceifySynchronous: __webpack_require__(43),
SpaceifyUnique: __webpack_require__(21),
SpaceifyUtility: __webpack_require__(22),
Spacelet: __webpack_require__(44),
//BinaryRpcCommunicator: require("./webjsonrpc/binaryrpccommunicator.js"),
CallbackBuffer: __webpack_require__(23),
RpcCommunicator: __webpack_require__(25),
WebRtcClient: __webpack_require__(45),
WebRtcConnection: __webpack_require__(26),
WebSocketConnection: __webpack_require__(11),
WebSocketRpcConnection: __webpack_require__(12),
WebSocketRpcServer: __webpack_require__(27),
WebSocketServer: __webpack_require__(28),
Connection: __webpack_require__(24),
SpaceifyApp: __webpack_require__(36)
};



/***/ })
/******/ ]);
});
(function spaceifyConfig(){window.speconfig={"SPACEIFY_PATH":"/var/lib/spaceify/","SPACEIFY_CODE_PATH":"/var/lib/spaceify/code/","SPACEIFY_DATA_PATH":"/var/lib/spaceify/data/","SPACEIFY_WWW_PATH":"/var/lib/spaceify/code/www/","SPACEIFY_NODE_MODULES_PATH":"/var/lib/spaceify/code/node_modules/","SPACEIFY_WWW_ERRORS_PATH":"/var/lib/spaceify/code/www/errors/","SPACEIFY_TLS_PATH":"/var/lib/spaceify/data/tls/","SPACEIFY_DATABASE_FILE":"/var/lib/spaceify/data/db/spaceify.db","SPACEIFY_TEMP_SESSIONID":"/var/lib/spaceify/data/db/session.id","SPACEIFY_REGISTRATION_FILE":"/var/lib/spaceify/data/db/edge.id","SPACEIFY_REGISTRATION_FILE_TMP":"/tmp/edge.id","SPACEIFY_MANIFEST_RULES_FILE":"/var/lib/spaceify/data/manifest/manifest.rules","SPACELETS_PATH":"/var/lib/spaceify/data/spacelets/","SANDBOXED_PATH":"/var/lib/spaceify/data/sandboxed/","SANDBOXED_DEBIAN_PATH":"/var/lib/spaceify/data/sandboxed_debian/","NATIVE_DEBIAN_PATH":"/var/lib/spaceify/data/native_debian/","INSTALLED_PATH":"/var/lib/spaceify/data/installed/","DOCS_PATH":"/var/lib/spaceify/data/docs/","VERSION_FILE":"/var/lib/spaceify/versions","WWW_DIRECTORY":"www/","API_PATH":"/api/","API_WWW_PATH":"/var/lib/spaceify/code/www/","API_NODE_MODULES_DIRECTORY":"/var/lib/spaceify/code/node_modules/","APPLICATION_ROOT":"application","APPLICATION_PATH":"/application/","APPLICATION_DIRECTORY":"application/","VOLUME_PATH":"/volume/","VOLUME_DIRECTORY":"volume/","VOLUME_APPLICATION_PATH":"/volume/application/","VOLUME_APPLICATION_WWW_PATH":"/volume/application/www/","VOLUME_TLS_PATH":"/volume/tls/","SYSTEMD_PATH":"/lib/systemd/system/","START_SH_FILE":"application/start.sh","WORK_PATH":"/tmp/package/","PACKAGE_PATH":"package/","SOURCES_DIRECTORY":"sources/","LOCALES_PATH":"/var/lib/spaceify/code/www/locales/","DEFAULT_LOCALE":"en_US","SPACEIFY_INJECT":"/var/lib/spaceify/code/www/lib/inject/spaceify.csv","LEASES_PATH":"/var/lib/spaceify/data/dhcp-data","IPTABLES_PATH":"/var/lib/spaceify/data/ipt-data","IPTABLES_PIPER":"/var/lib/spaceify/data/dev/iptpiper","IPTABLES_PIPEW":"/var/lib/spaceify/data/dev/iptpipew","TLS_DIRECTORY":"tls/","TLS_SCRIPTS_PATH":"/var/lib/spaceify/data/scripts/","UBUNTU_DISTRO_NAME":"ubuntu","RASPBIAN_DISTRO_NAME":"raspbian","UBUNTU_DOCKER_IMAGE":"spaceifyubuntu","RASPBIAN_DOCKER_IMAGE":"spaceifyraspbian","CUSTOM_DOCKER_IMAGE":"custom_","EDGE_IP":"10.0.0.1","EDGE_HOSTNAME":"edge.spaceify.net","EDGE_DOMAIN":"spaceify.net","EDGE_SHORT_HOSTNAME":"e.n","EDGE_SUBNET":"10.0.0.0/16","ALL_IPV4_LOCAL":"0.0.0.0","CONNECTION_HOSTNAME":"localhost","APPLICATION_SUBNET":"172.17.0.0/16","EDGE_PORT_HTTP":"80","EDGE_PORT_HTTPS":"443","CORE_PORT":"2947","CORE_PORT_SECURE":"4947","APPMAN_PORT":"2948","APPMAN_PORT_SECURE":"4948","APPMAN_MESSAGE_PORT":"2950","APPMAN_MESSAGE_PORT_SECURE":"4950","REGISTRY_HOSTNAME":"spaceify.org","REGISTRY_URL":"https://spaceify.org","REGISTRY_PUBLISH_URL":"https://spaceify.org/ajax/upload.php?type=package&fileid=package","REGISTRY_INSTALL_URL":"https://spaceify.org/install.php","EDGE_APPSTORE_GET_PACKAGES_URL":"https://spaceify.org/appstore/getpackages.php","EDGE_REGISTER_URL":"https://spaceify.net/edge/register.php","EDGE_LOGIN_URL":"https://spaceify.net/edge/login.php","EDGE_GET_RESOURCE_URL":"spaceify.org/appstore/getresource.php?resource=","GITHUB_HOSTNAME":"github.com","MAC_REGX":"^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$","IP_REGX":"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$","JAVASCRIPT":"javascript","CSS":"css","FILE":"file","UTF8":"utf","ASCII":"ascii","BASE64":"base64","ANY":"any","ALL":"all","SPACELET":"spacelet","SANDBOXED":"sandboxed","SANDBOXED_DEBIAN":"sandboxed_debian","NATIVE_DEBIAN":"native_debian","OPEN":"open","OPEN_LOCAL":"open_local","STANDARD":"standard","ALIEN":"alien","HTTP":"http","EXT_COMPRESSED":".zip","PACKAGE_DELIMITER":"@","PX":"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7","MANIFEST":"spaceify.manifest","README_MD":"readme.md","PACKAGE_ZIP":"package.zip","PUBLISH_ZIP":"publish.zip","SPM_ERRORS_JSON":"spm_errors.json","SPM_HELP":"spm.help","DOCKERFILE":"Dockerfile","MANIFEST_RULES":"manifest.rules","VERSIONS":"versions","APPSTORE":"appstore/","INDEX_FILE":"index.html","LOGIN_FILE":"login.html","SECURITY_FILE":"security.html","OPERATION_FILE":"operation.xop","LOCATION_FILE":"location.conf","SERVER_NAME":"Spaceify Web Server","TILEFILE":"tile.html","WEB_SERVER":"WEB_SERVER","APPLICATION_INITIALIZED":"*** application initialized","APPLICATION_UNINITIALIZED":"*** application uninitialized","IMAGE_DIRECTORY":"www/images/","FIRST_SERVICE_PORT":"2777","FIRST_SERVICE_PORT_SECURE":"3777","SERVER_CRT":"server.crt","SERVER_KEY":"server.key","SPACEIFY_CRT":"spaceify.crt","SPACEIFY_CRT_WWW":"www/spaceify.crt","RECONNECT_WAIT":"10000","SESSION_COOKIE_PUBSUB_PATH":"/var/lib/spaceify/data/db/session_cookies.pub","SPACEIFY_REPOSITORY":"deb [ arch=all,amd64,i386 ] http://spaceify.net/repo stable/spaceify main","SPACEIFY_APPLICATION_REPOSITORY_LIST":"/etc/apt/sources.list.d/spaceifyapplication.list","EVENT_SPACELET_INSTALLED":"spaceletInstalled","EVENT_SPACELET_REMOVED":"spaceletRemoved","EVENT_SPACELET_STARTED":"spaceletStarted","EVENT_SPACELET_STOPPED":"spaceletStopped","EVENT_SANDBOXED_INSTALLED":"sandboxedInstalled","EVENT_SANDBOXED_REMOVED":"sandboxedRemoved","EVENT_SANDBOXED_STARTED":"sandboxedStarted","EVENT_SANDBOXED_STOPPED":"sandboxedStopped","EVENT_SANDBOXED_DEBIAN_INSTALLED":"sandboxedDebianInstalled","EVENT_SANDBOXED_DEBIAN_REMOVED":"sandboxedDebianRemoved","EVENT_SANDBOXED_DEBIAN_STARTED":"sandboxedDebianStarted","EVENT_SANDBOXED_DEBIAN_STOPPED":"sandboxedDebianStopped","EVENT_NATIVE_DEBIAN_INSTALLED":"nativeDebianInstalled","EVENT_NATIVE_DEBIAN_REMOVED":"nativeDebianRemoved","EVENT_NATIVE_DEBIAN_STARTED":"nativeDebianStarted","EVENT_NATIVE_DEBIAN_STOPPED":"nativeDebianStopped","EVENT_EDGE_SETTINGS_CHANGED":"EdgeSettingsChanged","EVENT_CORE_SETTINGS_CHANGED":"CoreSettingsChanged","SESSION_TOKEN_NAME":"x-edge-session","SESSION_TOKEN_NAME_COOKIE":"xedgesession","WWW_CACHE_MAX_ITEMS":"40","WWW_CACHE_EXPIRE_TIME":"20"};})();
(function spaceifyLocales(){window.spelocales={"en_US":{"404":{"title":"Spaceify - 404","body":"Web server returned response code 404 - Not Found."},"500":{"title":"Spaceify - 500","body":"Web server returned response code 500 - Internal Server Error."},"global":{"locale":"en_US","encoding":"UTF-8","description":"American English","loading":"Loading...","copyright":"Copyright © 2014 - 2017 Spaceify Oy","btn_login":"Log In","btn_install":"Install","btn_reload":"Reload","btn_cancel":"Cancel","certificate_error":"It seems that your browser does not have the Spaceify edge node certificate installed. The certificate is required for loading web pages over secure connection. Install the certificate by pushing the 'Install' button. A pop-up window should appear requesting to accept 'Spaceify CA' as a trusted Certificate Authority (CA). Depending of your browser, there might be options for selecting the trust level. Select to trust the CA for identifying web pages. After you have installed the certificate, push the 'Reload' button to switch using encrypted connection.","certificate_error_cancel":"Pushing the 'Cancel' button hides this message.","delete_certificate":"Installed certificate can be deleted only from browsers settings. Open the security settings and select 'Manage' or 'View' certificates. From there find 'Authorities' or 'Trusted Authorities' and search for Spaceify Inc. / Spaceify CA. Select the certificate and delete it.","security_warning":"Unsecure connection detected! Without encryption anyone can see and exploit your password, session, and all other data. Push the 'Reload' button to switch using encrypted connection."},"index":{"title":"Welcome to Spaceify","version":"v","splash_welcome":"Welcome to Spaceify powered wireless network.","splash_info":"1. Insert Terms of use, privacy policy or anything here for your splash page. See index.html for details of how this page is generated and how to customize it for your purposes. 2. Add 'Accept' button for your site. Users can continue only if they agree with the rules of your edge node. 3. Add 'Install' button. Allow user to load and install the Spaceify CA root certificate to their list of trusted certificates. Encrypted pages can be loaded only if the certificate is installed.","splash_accept_action":"Accept","splash_certificate_action":"Install","spacelets":"Spacelets","sandboxed":"Sandboxed","sandboxed debian":"Native Sandboxed","native_debian":"Native","user_utilities":"Utilities","admin_utilities":"Administration","admin_tile_title":"Spaceify Store","install_certificate_title":"Install Spaceify's certificate","open_admin_tools":"Open Admin Tools","logout":"Log Out"},"login":{"title":"Spaceify - Log In","password":"Password","back_to_launchpage":"Back to Launchpage"},"appstore/index":{"title":"Spaceify - AppStore"}}};})();
(function spaceifyTiles(){window.spetiles={"apptile":"<iframe class=\"edgeTile\" id=\"{{ ::id }}\" frameborder=\"0\"></iframe>","tile":"<div class=\"edgeTile\"><img id=\"{{ ::id }}\" sp_src=\"{{ ::sp_src }}\" width=\"64\" height=\"64\"><div class=\"edgeText\">{{ ::manifest.name }}</div><div class=\"edgeText edgeSubText\">{{ ::manifest.developer.name }}</div></div>"};})();

(function spaceifyClasses(){
window.Logger = spe.Logger;
window.SpaceifyDOM = spe.SpaceifyDOM;
window.Service = spe.Service;
window.SpaceifyApplication = spe.SpaceifyApplication;
window.SpaceifyApplicationManager = spe.SpaceifyApplicationManager;
window.SpaceifyCache = spe.SpaceifyCache;
window.SpaceifyConfig = spe.SpaceifyConfig;
window.SpaceifyCore = spe.SpaceifyCore;
window.SpaceifyError = spe.SpaceifyError;
window.SpaceifyMessages = spe.SpaceifyMessages;
window.SpaceifyNet = spe.SpaceifyNet;
window.SpaceifyNetwork = spe.SpaceifyNetwork;
window.SpaceifyService = spe.SpaceifyService;
window.SpaceifySynchronous = spe.SpaceifySynchronous;
window.SpaceifyUnique = spe.SpaceifyUnique;
window.SpaceifyUtility = spe.SpaceifyUtility;
window.Spacelet = spe.Spacelet;
//window.BinaryRpcCommunicator = spe.BinaryRpcCommunicator;
window.CallbackBuffer = spe.CallbackBuffer;
window.RpcCommunicator = spe.RpcCommunicator;
window.WebRtcClient = spe.WebRtcClient;
window.WebRtcConnection = spe.WebRtcConnection;
window.WebSocketConnection = spe.WebSocketConnection;
window.WebSocketRpcConnection = spe.WebSocketRpcConnection;
window.WebSocketRpcServer = spe.WebSocketRpcServer;
window.WebSocketServer = spe.WebSocketServer;
window.SpaceifyApp = spe.SpaceifyApp;})();
