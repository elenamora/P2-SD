webpackJsonp([0],{"/FM6":function(t,e,n){"use strict";var r=n("7zaN"),o=n("NgFo"),s=n("r9rG"),a=n("X4ut");function i(t){var e=new s(t),n=o(s.prototype.request,e);return r.extend(n,s.prototype,e),r.extend(n,e),n}var u=i(a);u.Axios=s,u.create=function(t){return i(r.merge(a,t))},u.Cancel=n("UQuV"),u.CancelToken=n("IvvZ"),u.isCancel=n("PSw2"),u.all=function(t){return Promise.all(t)},u.spread=n("Kpxz"),t.exports=u,t.exports.default=u},"5v2I":function(t,e,n){"use strict";var r=n("7zaN");t.exports=r.isStandardBrowserEnv()?{write:function(t,e,n,o,s,a){var i=[];i.push(t+"="+encodeURIComponent(e)),r.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),r.isString(o)&&i.push("path="+o),r.isString(s)&&i.push("domain="+s),!0===a&&i.push("secure"),document.cookie=i.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},"6g3E":function(t,e,n){t.exports=n("/FM6")},"6z6l":function(t,e,n){"use strict";var r=n("7zaN");t.exports=r.isStandardBrowserEnv()?function(){var t,e=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(t){var r=t;return e&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return t=o(window.location.href),function(e){var n=r.isString(e)?o(e):e;return n.protocol===t.protocol&&n.host===t.host}}():function(){return!0}},"7zaN":function(t,e,n){"use strict";var r=n("NgFo"),o=n("ANFB"),s=Object.prototype.toString;function a(t){return"[object Array]"===s.call(t)}function i(t){return null!==t&&"object"==typeof t}function u(t){return"[object Function]"===s.call(t)}function c(t,e){if(null!==t&&void 0!==t)if("object"!=typeof t&&(t=[t]),a(t))for(var n=0,r=t.length;n<r;n++)e.call(null,t[n],n,t);else for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.call(null,t[o],o,t)}t.exports={isArray:a,isArrayBuffer:function(t){return"[object ArrayBuffer]"===s.call(t)},isBuffer:o,isFormData:function(t){return"undefined"!=typeof FormData&&t instanceof FormData},isArrayBufferView:function(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isObject:i,isUndefined:function(t){return void 0===t},isDate:function(t){return"[object Date]"===s.call(t)},isFile:function(t){return"[object File]"===s.call(t)},isBlob:function(t){return"[object Blob]"===s.call(t)},isFunction:u,isStream:function(t){return i(t)&&u(t.pipe)},isURLSearchParams:function(t){return"undefined"!=typeof URLSearchParams&&t instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:c,merge:function t(){var e={};function n(n,r){"object"==typeof e[r]&&"object"==typeof n?e[r]=t(e[r],n):e[r]=n}for(var r=0,o=arguments.length;r<o;r++)c(arguments[r],n);return e},extend:function(t,e,n){return c(e,function(e,o){t[o]=n&&"function"==typeof e?r(e,n):e}),t},trim:function(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}}},ANFB:function(t,e){function n(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
t.exports=function(t){return null!=t&&(n(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&n(t.slice(0,0))}(t)||!!t._isBuffer)}},BHFg:function(t,e,n){"use strict";var r=n("7zaN"),o=n("GBSs"),s=n("si6v"),a=n("utbB"),i=n("6z6l"),u=n("n4gD"),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n("V1cB");t.exports=function(t){return new Promise(function(e,d){var l=t.data,p=t.headers;r.isFormData(l)&&delete p["Content-Type"];var f=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in f||i(t.url)||(f=new window.XDomainRequest,h="onload",m=!0,f.onprogress=function(){},f.ontimeout=function(){}),t.auth){var v=t.auth.username||"",g=t.auth.password||"";p.Authorization="Basic "+c(v+":"+g)}if(f.open(t.method.toUpperCase(),s(t.url,t.params,t.paramsSerializer),!0),f.timeout=t.timeout,f[h]=function(){if(f&&(4===f.readyState||m)&&(0!==f.status||f.responseURL&&0===f.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in f?a(f.getAllResponseHeaders()):null,r={data:t.responseType&&"text"!==t.responseType?f.response:f.responseText,status:1223===f.status?204:f.status,statusText:1223===f.status?"No Content":f.statusText,headers:n,config:t,request:f};o(e,d,r),f=null}},f.onerror=function(){d(u("Network Error",t,null,f)),f=null},f.ontimeout=function(){d(u("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED",f)),f=null},r.isStandardBrowserEnv()){var b=n("5v2I"),_=(t.withCredentials||i(t.url))&&t.xsrfCookieName?b.read(t.xsrfCookieName):void 0;_&&(p[t.xsrfHeaderName]=_)}if("setRequestHeader"in f&&r.forEach(p,function(t,e){void 0===l&&"content-type"===e.toLowerCase()?delete p[e]:f.setRequestHeader(e,t)}),t.withCredentials&&(f.withCredentials=!0),t.responseType)try{f.responseType=t.responseType}catch(e){if("json"!==t.responseType)throw e}"function"==typeof t.onDownloadProgress&&f.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&f.upload&&f.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then(function(t){f&&(f.abort(),d(t),f=null)}),void 0===l&&(l=null),f.send(l)})}},DDGY:function(t,e,n){"use strict";var r=n("7zaN");t.exports=function(t,e){r.forEach(t,function(n,r){r!==e&&r.toUpperCase()===e.toUpperCase()&&(t[e]=n,delete t[r])})}},EuB2:function(t,e,n){"use strict";var r=n("7zaN");function o(){this.handlers=[]}o.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},o.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},o.prototype.forEach=function(t){r.forEach(this.handlers,function(e){null!==e&&t(e)})},t.exports=o},GBSs:function(t,e,n){"use strict";var r=n("n4gD");t.exports=function(t,e,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?e(r("Request failed with status code "+n.status,n.config,null,n.request,n)):t(n)}},IvvZ:function(t,e,n){"use strict";var r=n("UQuV");function o(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(t){e=t});var n=this;t(function(t){n.reason||(n.reason=new r(t),e(n.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var t;return{token:new o(function(e){t=e}),cancel:t}},t.exports=o},"Jh+0":function(t,e,n){"use strict";t.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},Kpxz:function(t,e,n){"use strict";t.exports=function(t){return function(e){return t.apply(null,e)}}},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("Tqaz"),o=(n("sWs5"),n("7+uW")),s={render:function(){var t=this.$createElement;return(this._self._c||t)("router-view")},staticRenderFns:[]},a=n("VU/8")(null,s,!1,null,null,null).exports,i=n("/ocq"),u=n("6g3E"),c=n.n(u),d={data:function(){return{message:"My first component",tickets_bought:0,money:200,price:10,events_added:[],i:0,events:[],show:!0,total_tickets_bought:0}},methods:{buyTickets:function(t){var e=this.events_added.indexOf(t);this.events_added[e].quantity+=1,document.getElementById("demo").innerHTML=t.quantity,this.events_added[e].quantity>t.total_available_tickets&&(document.getElementById("buy").disabled=!0),document.getElementById("return").disabled=!1},returnTickets:function(t){var e=this.events_added.indexOf(t);this.events_added.items[e].quantity-=1,0===this.events_added.items[e].quantity&&this.events_added.splice(e,1),document.getElementById("buy").disabled=!1},addEvent:function(t){document.getElementById("demo").innerHTML=t.id,-1===this.events_added.indexOf(t)&&(t.quantity=1,this.events_added.push(t))},getEvents:function(){var t=this;c.a.get("https://grupa7test-eventright.herokuapp.com/events").then(function(e){t.events=e.data.events}).catch(function(t){console.error(t)})},showEventsCart:function(){document.getElementById("cart").style.display="block",document.getElementById("cards").style.display="none"},showEventsCards:function(){document.getElementById("cart").style.display="none",document.getElementById("cards").style.display="block"},addPurchase:function(t){var e=this,n="https://grupa7test-eventright.herokuapp.com/order/"+this.username;c.a.post(n,t,{auth:{username:this.token}}).then(function(){console.log("Order done")}).catch(function(t){console.log(t),e.getEvents()})},finalizePurchase:function(){for(var t=0;t<this.events_added.length;t+=1){var e={event_id:this.events_added[t].id,tickets_bought:this.events_added[t].quantity};document.getElementById("demo2").innerHTML="parametros",this.addPurchase(e)}this.getEvents()},getUser:function(){var t=this,e="https://grupa7test-eventright.herokuapp.com/account/"+this.username;c.a.get(e,{auth:{username:this.token}}).then(function(e){t.user=e.data.user,document.getElementById("info1").innerHTML="Money available: "+e.data.user.available_money}).catch(function(t){console.error(t)})},getOrders:function(){var t=this,e="https://grupa7test-eventright.herokuapp.com/order/"+this.username;c.a.get(e,{auth:{username:this.token}}).then(function(e){t.orders=e.data.all_orders}).catch(function(t){console.error(t)}),this.total_tickets_bought=0;for(var n=0;n<this.orders.length;n+=1)this.total_tickets_bought+=this.orders[n].tickets_bought;document.getElementById("info2").innerHTML="Total tickets bought: "+this.total_tickets_bought},getInfo:function(){this.getUser(),this.getOrders()},login:function(){this.$router.replace({path:"/userlogin"})},create:function(){this.$router.replace({path:"/createEvent",query:{username:this.username,logged:this.logged,is_admin:this.is_admin,token:this.token}})},update:function(){this.$router.replace({path:"/updateEvent",query:{username:this.username,logged:this.logged,is_admin:this.is_admin,token:this.token}})}},created:function(){this.logged=this.$route.query.logged,this.username=this.$route.query.username,this.is_admin=this.$route.query.is_admin,this.token=this.$route.query.token,this.getEvents(),document.getElementById("cart").style.display="none",document.getElementById("cards").style.display="block"}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("h1",[t._v(" "+t._s(t.message)+" ")]),t._v(" "),n("button",{staticClass:"btn btn-success btn-lg",attrs:{id:"buy"},on:{click:t.getInfo}},[t._v(" Info User ")]),t._v(" "),n("button",{staticClass:"btn btn-success btn-lg",attrs:{id:"return",disabled:""},on:{click:t.getUser}},[t._v(" Info User ")]),t._v(" "),n("h4",[t._v(" Total tickets bought: "+t._s(t.tickets_bought)+" ")]),t._v(" "),n("h4",[t._v(" Money available: "+t._s(t.money)+" ")]),t._v(" "),n("button",{staticClass:"btn btn-success btn-lg",attrs:{id:"login"},on:{click:t.login}},[t._v(" Login ")]),t._v(" "),n("button",{staticClass:"btn btn-success btn-lg",attrs:{id:"create"},on:{click:t.create}},[t._v(" Create new Event ")]),t._v(" "),n("button",{staticClass:"btn btn-success btn-lg",attrs:{id:"update"},on:{click:t.update}},[t._v(" Update Event ")]),t._v(" "),n("div",{staticClass:"container",attrs:{id:"cards"}},[n("button",{staticClass:"btn btn-success btn-lg",attrs:{id:"events_cart"},on:{click:t.showEventsCart}},[t._v("See Cart")]),t._v(" "),n("div",{staticClass:"row"},t._l(t.events,function(e){return n("div",{key:e.id,staticClass:"col-lg-4 col-md-6 mb-4"},[n("br"),t._v(" "),n("div",{staticClass:"card",staticStyle:{width:"18rem"}},[n("img",{staticClass:"card-img-top",attrs:{src:"",alt:"Card image cap"}}),t._v(" "),n("div",{staticClass:"card-body"},[n("h6",[t._v(t._s(e.name))]),t._v(" "),t._l(e.artists,function(e){return n("div",{key:e.id},[n("h5",[t._v(t._s(e.name))])])}),t._v(" "),n("h5",[t._v(t._s(e.country))]),t._v(" "),n("h6",[t._v(t._s(e.city))]),t._v(" "),n("h6",[t._v(t._s(e.place))]),t._v(" "),n("h6",[t._v(t._s(e.date))]),t._v(" "),n("h6",[t._v(t._s(e.price)+" €")]),t._v(" "),n("h5",[t._v(t._s(e.total_available_tickets)+" €")]),t._v(" "),n("button",{staticClass:"btn btn-success btn-lg",attrs:{id:"add"},on:{click:function(n){return t.addEvent(e)}}},[t._v(" Add Event ")])],2)])])}),0)]),t._v(" "),n("p",{attrs:{id:"demo"}}),t._v(" "),n("p",{attrs:{id:"demo2"}}),t._v(" "),n("p",{attrs:{id:"info1"}}),t._v(" "),n("p",{attrs:{id:"info2"}},[t._v("Total tickets bought")]),t._v(" "),n("div",{staticClass:"container",attrs:{id:"cart",disabled:""}},[n("table",{staticClass:"table"},[t._m(0),t._v(" "),n("tbody",t._l(t.events_added,function(e){return n("div",{key:e.id},[n("tr",[n("td",{attrs:{"data-th":"Event Name"}},[t._v(t._s(e.name))]),t._v(" "),n("td",{attrs:{"data-th":"Quantity"}},[t._v(" "+t._s(e.quantity)+"\n                    "),n("button",{staticClass:"btn btn-success btn-lg",attrs:{id:"buy"},on:{click:function(n){return t.buyTickets(e)}}},[t._v(" + ")]),t._v(" "),n("button",{staticClass:"btn btn-success btn-lg",attrs:{id:"return",disabled:""},on:{click:function(n){return t.returnTickets(e)}}},[t._v(" - ")])]),t._v(" "),n("td",{attrs:{"data-th":"Price(€)"}},[t._v(t._s(e.price))]),t._v(" "),n("td",{attrs:{"data-th":"Total"}},[t._v(t._s(e.quantity))]),t._v(" "),t._m(1,!0)])])}),0),t._v(" "),n("tfoot",[n("tr",[n("td",[n("button",{staticClass:"btn btn-success btn-lg",attrs:{id:"continue"},on:{click:t.showEventsCards}},[t._v("Continue shopping")])]),t._v(" "),n("td",[n("button",{staticClass:"btn btn-success btn-block",attrs:{id:"finish"},on:{click:t.finalizePurchase}},[t._v("Finish Purchase")])])])])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("Event Name")]),t._v(" "),n("th",[t._v("Quantity")]),t._v(" "),n("th",[t._v("Price(€)")]),t._v(" "),n("th",[t._v("Total")]),t._v(" "),n("th")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",{staticClass:"actions",attrs:{"data-th":""}},[e("button",{staticClass:"btn btn-danger btn-sm"},[this._v("Delete")])])}]};var p=n("VU/8")(d,l,!1,function(t){n("cV5e")},null,null).exports,f={data:function(){return{username:"",password:"",is_admin:""}},methods:{checkLogin:function(){var t=this,e={username:this.username,password:this.password};c.a.post("https://grupa7test-eventright.herokuapp.com/login",e).then(function(e){t.logged=!0,t.token=e.data.token,t.find_match=!0,t.getAccount(),t.$router.replace({path:"/",query:{username:t.username,logged:t.logged,is_admin:t.is_admin,token:t.token}}),alert("User logged in")}).catch(function(e){console.error(e),t.user="",alert("Username or Password incorrect")})},getAccount:function(){var t=this,e="https://grupa7test-eventright.herokuapp.com/account/"+this.username;c.a.get(e).then(function(e){t.is_admin=e.data.user.is_admin}).catch(function(t){console.error(t)})},createAccount:function(){this.$router.replace({path:"/newaccount"})},backToEvents:function(){this.logged=!1,this.$router.replace({path:"/",query:{logged:this.logged}})}},created:function(){}},h={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"form-label-group"},[n("label",{attrs:{for:"inputEmail"}},[t._v("Username")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"username",id:"inputUsername",placeholder:"Username",required:"",autofocus:""},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-label-group"},[n("br"),t._v(" "),n("label",{attrs:{for:"inputPassword"}},[t._v("Password")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",id:"inputPassword",placeholder:"Password",required:""},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"row"},[n("button",{staticClass:"btn btn-success btn-lg",attrs:{id:"signin"},on:{click:t.checkLogin}},[t._v(" Sign In ")]),t._v(" "),n("p",{attrs:{id:"debug"}})]),t._v(" "),n("div",{staticClass:"row"},[n("button",{staticClass:"btn btn-success btn-lg",attrs:{id:"createAccount"},on:{click:t.createAccount}},[t._v(" Create Account ")])]),t._v(" "),n("div",{staticClass:"row"},[n("button",{staticClass:"btn btn-success btn-lg",attrs:{id:"back"},on:{click:t.backToEvents}},[t._v(" Back to events ")])])])},staticRenderFns:[]},m=n("VU/8")(f,h,!1,null,null,null).exports,v={data:function(){return{addUserForm:{username:"",password:""},show:!0}},methods:{initForm:function(){this.addUserForm.username="",this.addUserForm.password=""},onSubmit:function(t){t.preventDefault(),this.createAccount(),alert("Account Created"),this.$router.replace({path:"/userlogin"})},onReset:function(t){var e=this;t.preventDefault(),this.addUserForm.username="",this.addUserForm.password="",this.show=!1,this.$nextTick(function(){e.show=!0})},createAccount:function(){var t=this;c.a.post("https://grupa7test-eventright.herokuapp.com/account",this.addUserForm).then(function(){console.log("Account Created")}).catch(function(e){console.log(e),alert("Account already exists"),t.onReset()})}}},g={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.show?n("b-form",{on:{submit:t.onSubmit,reset:t.onReset}},[n("b-form-group",{attrs:{id:"input-group-1",label:"Your Name:","label-for":"input-1"}},[n("b-form-input",{attrs:{id:"input-1",required:"",placeholder:"Enter username"},model:{value:t.addUserForm.username,callback:function(e){t.$set(t.addUserForm,"username",e)},expression:"addUserForm.username"}})],1),t._v(" "),n("b-form-group",{attrs:{id:"input-group-2",label:"Password:","label-for":"input-2"}},[n("b-form-input",{attrs:{id:"input-2",type:"password",required:"",placeholder:"Enter password"},model:{value:t.addUserForm.password,callback:function(e){t.$set(t.addUserForm,"password",e)},expression:"addUserForm.password"}})],1),t._v(" "),n("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v("Submit")]),t._v(" "),n("b-button",{attrs:{type:"reset",variant:"danger"}},[t._v("Reset")])],1):t._e()],1)},staticRenderFns:[]},b=n("VU/8")(v,g,!1,null,null,null).exports,_={data:function(){return{addEventForm:{name:"",price:"",date:"",country:"",city:"",place:"",total_available_tickets:""},show:!0}},methods:{initForm:function(){this.addEventForm.name="",this.addEventForm.price="",this.addEventForm.date="",this.addEventForm.country="",this.addEventForm.city="",this.addEventForm.place="",this.addEventForm.total_available_tickets=""},onSubmit:function(t){t.preventDefault(),this.$refs.addEventModal.hide();this.createEvent({place:"Platja",name:"Canet de Rock 2020",city:"Canet de Mar",date:"2020-07-05",price:"50",total_available_tickets:"300"}),alert("Event Created"),this.$router.replace({path:"/",query:{username:this.username,logged:this.logged,is_admin:this.is_admin,token:this.token}})},onReset:function(t){var e=this;t.preventDefault(),this.initForm(),this.show=!1,this.$nextTick(function(){e.show=!0})},createEvent:function(t){var e=this;c.a.post("https://grupa7test-eventright.herokuapp.com/event",t,{auth:{username:this.token}}).then(function(){console.log("Event Created")}).catch(function(t){console.log(t),alert("Event already exists"),e.onReset()})}},created:function(){this.logged=this.$route.query.logged,this.username=this.$route.query.username,this.is_admin=this.$route.query.is_admin,this.token=this.$route.query.token}},y={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.show?n("b-form",{on:{submit:t.onSubmit,reset:t.onReset}},[n("b-form-group",{attrs:{id:"input-group-1",label:"Event Name:","label-for":"input-1"}},[n("b-form-input",{attrs:{id:"input-1",required:"",placeholder:"Enter Event Name"},model:{value:t.addEventForm.name,callback:function(e){t.$set(t.addEventForm,"name",e)},expression:"addEventForm.name"}})],1),t._v(" "),n("b-form-group",{attrs:{id:"input-group-2",label:"Price:","label-for":"input-2"}},[n("b-form-input",{attrs:{id:"input-2",required:"",placeholder:"Enter price"},model:{value:t.addEventForm.price,callback:function(e){t.$set(t.addEventForm,"price",e)},expression:"addEventForm.price"}})],1),t._v(" "),n("b-form-group",{attrs:{id:"input-group-3",label:"Date:","label-for":"input-3"}},[n("b-form-input",{attrs:{id:"input-3",required:"",placeholder:"Enter date"},model:{value:t.addEventForm.date,callback:function(e){t.$set(t.addEventForm,"date",e)},expression:"addEventForm.date"}})],1),t._v(" "),n("b-form-group",{attrs:{id:"input-group-4",label:"Country:","label-for":"input-4"}},[n("b-form-input",{attrs:{id:"input-4",required:"",placeholder:"Enter country"},model:{value:t.addEventForm.country,callback:function(e){t.$set(t.addEventForm,"country",e)},expression:"addEventForm.country"}})],1),t._v(" "),n("b-form-group",{attrs:{id:"input-group-5",label:"City:","label-for":"input-5"}},[n("b-form-input",{attrs:{id:"input-5",required:"",placeholder:"Enter city"},model:{value:t.addEventForm.city,callback:function(e){t.$set(t.addEventForm,"city",e)},expression:"addEventForm.city"}})],1),t._v(" "),n("b-form-group",{attrs:{id:"input-group-6",label:"Place:","label-for":"input-6"}},[n("b-form-input",{attrs:{id:"input-6",required:"",placeholder:"Enter place"},model:{value:t.addEventForm.place,callback:function(e){t.$set(t.addEventForm,"place",e)},expression:"addEventForm.place"}})],1),t._v(" "),n("b-form-group",{attrs:{id:"input-group-7",label:"Tickets:","label-for":"input-7"}},[n("b-form-input",{attrs:{id:"input-7",required:"",placeholder:"Enter tickets"},model:{value:t.addEventForm.total_available_tickets,callback:function(e){t.$set(t.addEventForm,"total_available_tickets",e)},expression:"addEventForm.total_available_tickets"}})],1),t._v(" "),n("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v("Submit")]),t._v(" "),n("b-button",{attrs:{type:"reset",variant:"danger"}},[t._v("Reset")])],1):t._e()],1)},staticRenderFns:[]},E=n("VU/8")(_,y,!1,null,null,null).exports,w=n("VU/8")(null,null,!1,null,null,null).exports;o.default.use(i.a);var k=new i.a({mode:"history",base:Object({NODE_ENV:"production"}).BASE_URL,routes:[{path:"/",name:"Events",component:p},{path:"/userlogin",name:"Login",component:m},{path:"/newaccount",name:"createAccount",component:b},{path:"/createEvent",name:"createEvent",component:E},{path:"/updateEvent",name:"updateEvent",component:w}]});o.default.use(r.a),o.default.config.productionTip=!1,new o.default({router:k,render:function(t){return t(a)}}).$mount("#app")},NgFo:function(t,e,n){"use strict";t.exports=function(t,e){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return t.apply(e,n)}}},PSw2:function(t,e,n){"use strict";t.exports=function(t){return!(!t||!t.__CANCEL__)}},R54Z:function(t,e,n){"use strict";var r=n("7zaN"),o=n("SfS7"),s=n("PSw2"),a=n("X4ut"),i=n("Jh+0"),u=n("o6Lj");function c(t){t.cancelToken&&t.cancelToken.throwIfRequested()}t.exports=function(t){return c(t),t.baseURL&&!i(t.url)&&(t.url=u(t.baseURL,t.url)),t.headers=t.headers||{},t.data=o(t.data,t.headers,t.transformRequest),t.headers=r.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(e){delete t.headers[e]}),(t.adapter||a.adapter)(t).then(function(e){return c(t),e.data=o(e.data,e.headers,t.transformResponse),e},function(e){return s(e)||(c(t),e&&e.response&&(e.response.data=o(e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)})}},SfS7:function(t,e,n){"use strict";var r=n("7zaN");t.exports=function(t,e,n){return r.forEach(n,function(n){t=n(t,e)}),t}},UQuV:function(t,e,n){"use strict";function r(t){this.message=t}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,t.exports=r},V1cB:function(t,e,n){"use strict";var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function o(){this.message="String contains an invalid character"}o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",t.exports=function(t){for(var e,n,s=String(t),a="",i=0,u=r;s.charAt(0|i)||(u="=",i%1);a+=u.charAt(63&e>>8-i%1*8)){if((n=s.charCodeAt(i+=.75))>255)throw new o;e=e<<8|n}return a}},X4ut:function(t,e,n){"use strict";(function(e){var r=n("7zaN"),o=n("DDGY"),s={"Content-Type":"application/x-www-form-urlencoded"};function a(t,e){!r.isUndefined(t)&&r.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}var i,u={adapter:("undefined"!=typeof XMLHttpRequest?i=n("BHFg"):void 0!==e&&(i=n("BHFg")),i),transformRequest:[function(t,e){return o(e,"Content-Type"),r.isFormData(t)||r.isArrayBuffer(t)||r.isBuffer(t)||r.isStream(t)||r.isFile(t)||r.isBlob(t)?t:r.isArrayBufferView(t)?t.buffer:r.isURLSearchParams(t)?(a(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):r.isObject(t)?(a(e,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],function(t){u.headers[t]={}}),r.forEach(["post","put","patch"],function(t){u.headers[t]=r.merge(s)}),t.exports=u}).call(e,n("W2nU"))},cV5e:function(t,e){},mcPd:function(t,e,n){"use strict";t.exports=function(t,e,n,r,o){return t.config=e,n&&(t.code=n),t.request=r,t.response=o,t}},n4gD:function(t,e,n){"use strict";var r=n("mcPd");t.exports=function(t,e,n,o,s){var a=new Error(t);return r(a,e,n,o,s)}},o6Lj:function(t,e,n){"use strict";t.exports=function(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}},r9rG:function(t,e,n){"use strict";var r=n("X4ut"),o=n("7zaN"),s=n("EuB2"),a=n("R54Z");function i(t){this.defaults=t,this.interceptors={request:new s,response:new s}}i.prototype.request=function(t){"string"==typeof t&&(t=o.merge({url:arguments[0]},arguments[1])),(t=o.merge(r,{method:"get"},this.defaults,t)).method=t.method.toLowerCase();var e=[a,void 0],n=Promise.resolve(t);for(this.interceptors.request.forEach(function(t){e.unshift(t.fulfilled,t.rejected)}),this.interceptors.response.forEach(function(t){e.push(t.fulfilled,t.rejected)});e.length;)n=n.then(e.shift(),e.shift());return n},o.forEach(["delete","get","head","options"],function(t){i.prototype[t]=function(e,n){return this.request(o.merge(n||{},{method:t,url:e}))}}),o.forEach(["post","put","patch"],function(t){i.prototype[t]=function(e,n,r){return this.request(o.merge(r||{},{method:t,url:e,data:n}))}}),t.exports=i},sWs5:function(t,e){},si6v:function(t,e,n){"use strict";var r=n("7zaN");function o(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}t.exports=function(t,e,n){if(!e)return t;var s;if(n)s=n(e);else if(r.isURLSearchParams(e))s=e.toString();else{var a=[];r.forEach(e,function(t,e){null!==t&&void 0!==t&&(r.isArray(t)?e+="[]":t=[t],r.forEach(t,function(t){r.isDate(t)?t=t.toISOString():r.isObject(t)&&(t=JSON.stringify(t)),a.push(o(e)+"="+o(t))}))}),s=a.join("&")}return s&&(t+=(-1===t.indexOf("?")?"?":"&")+s),t}},utbB:function(t,e,n){"use strict";var r=n("7zaN"),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];t.exports=function(t){var e,n,s,a={};return t?(r.forEach(t.split("\n"),function(t){if(s=t.indexOf(":"),e=r.trim(t.substr(0,s)).toLowerCase(),n=r.trim(t.substr(s+1)),e){if(a[e]&&o.indexOf(e)>=0)return;a[e]="set-cookie"===e?(a[e]?a[e]:[]).concat([n]):a[e]?a[e]+", "+n:n}}),a):a}}},["NHnr"]);
//# sourceMappingURL=app.31beb835556b8caf8edf.js.map