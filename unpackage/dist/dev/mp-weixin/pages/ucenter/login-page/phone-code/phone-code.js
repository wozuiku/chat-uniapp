(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/login-page/phone-code/phone-code"],{257:function(n,e,o){"use strict";(function(n){o(5);t(o(3));var e=t(o(258));function t(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=o,n(e.default)}).call(this,o(1)["createPage"])},258:function(n,e,o){"use strict";o.r(e);var t=o(259),u=o(261);for(var r in u)"default"!==r&&function(n){o.d(e,n,(function(){return u[n]}))}(r);o(263);var c,i=o(23),s=Object(i["default"])(u["default"],t["render"],t["staticRenderFns"],!1,null,null,null,!1,t["components"],c);s.options.__file="pages/ucenter/login-page/phone-code/phone-code.vue",e["default"]=s.exports},259:function(n,e,o){"use strict";o.r(e);var t=o(260);o.d(e,"render",(function(){return t["render"]})),o.d(e,"staticRenderFns",(function(){return t["staticRenderFns"]})),o.d(e,"recyclableRender",(function(){return t["recyclableRender"]})),o.d(e,"components",(function(){return t["components"]}))},260:function(n,e,o){"use strict";var t;o.r(e),o.d(e,"render",(function(){return u})),o.d(e,"staticRenderFns",(function(){return c})),o.d(e,"recyclableRender",(function(){return r})),o.d(e,"components",(function(){return t}));try{t={uniForms:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(o.bind(null,548))},uniEasyinput:function(){return o.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(o.bind(null,481))},uniSendSmsCode:function(){return o.e("components/uni-send-sms-code/uni-send-sms-code").then(o.bind(null,488))},uniQuickLogin:function(){return Promise.all([o.e("common/vendor"),o.e("components/uni-quick-login/uni-quick-login")]).then(o.bind(null,463))}}}catch(i){if(-1===i.message.indexOf("Cannot find module")||-1===i.message.indexOf(".vue"))throw i;console.error(i.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var u=function(){var n=this,e=n.$createElement,o=(n._self._c,n.$t("common.verifyCodePlaceholder")),t=n.$t("common.verifyCodePlaceholder"),u=n.$t("common.login");n.$mp.data=Object.assign({},{$root:{m0:o,m1:t,m2:u}})},r=!1,c=[];u._withStripped=!0},261:function(n,e,o){"use strict";o.r(e);var t=o(262),u=o.n(t);for(var r in t)"default"!==r&&function(n){o.d(e,n,(function(){return t[n]}))}(r);e["default"]=u.a},262:function(n,e,o){"use strict";(function(n,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=r(o(245));function r(n){return n&&n.__esModule?n:{default:n}}var c={mixins:[u.default],data:function(){return{code:"",phone:""}},computed:{tipText:function(){return this.$t("common.verifyCodeSend")+"".concat(this.phone,"。")},canSubmit:function(){return 6==this.code.length}},onLoad:function(n){var e=n.phoneNumber;n.phoneArea;this.phone=e},onReady:function(){},methods:{submit:function(){var e=this;n.callFunction({name:"uni-id-cf",data:{action:"loginBySms",params:{mobile:this.phone,code:this.code}},success:function(n){var o=n.result;0===o.code?e.loginSuccess(o):t.showModal({content:o.msg,showCancel:!1})}})}}};e.default=c}).call(this,o(10)["default"],o(1)["default"])},263:function(n,e,o){"use strict";o.r(e);var t=o(264),u=o.n(t);for(var r in t)"default"!==r&&function(n){o.d(e,n,(function(){return t[n]}))}(r);e["default"]=u.a},264:function(n,e,o){}},[[257,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/ucenter/login-page/phone-code/phone-code.js.map