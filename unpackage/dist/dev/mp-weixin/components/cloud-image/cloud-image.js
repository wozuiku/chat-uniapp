(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/cloud-image/cloud-image"],{500:function(n,t,e){"use strict";e.r(t);var r=e(501),u=e(503);for(var i in u)"default"!==i&&function(n){e.d(t,n,(function(){return u[n]}))}(i);var c,o=e(23),a=Object(o["default"])(u["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],c);a.options.__file="components/cloud-image/cloud-image.vue",t["default"]=a.exports},501:function(n,t,e){"use strict";e.r(t);var r=e(502);e.d(t,"render",(function(){return r["render"]})),e.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),e.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),e.d(t,"components",(function(){return r["components"]}))},502:function(n,t,e){"use strict";var r;e.r(t),e.d(t,"render",(function(){return u})),e.d(t,"staticRenderFns",(function(){return c})),e.d(t,"recyclableRender",(function(){return i})),e.d(t,"components",(function(){return r}));var u=function(){var n=this,t=n.$createElement;n._self._c},i=!1,c=[];u._withStripped=!0},503:function(n,t,e){"use strict";e.r(t);var r=e(504),u=e.n(r);for(var i in r)"default"!==i&&function(n){e.d(t,n,(function(){return r[n]}))}(i);t["default"]=u.a},504:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(e(11));function u(n){return n&&n.__esModule?n:{default:n}}function i(n,t,e,r,u,i,c){try{var o=n[i](c),a=o.value}catch(d){return void e(d)}o.done?t(a):Promise.resolve(a).then(r,u)}function c(n){return function(){var t=this,e=arguments;return new Promise((function(r,u){var c=n.apply(t,e);function o(n){i(c,r,u,o,a,"next",n)}function a(n){i(c,r,u,o,a,"throw",n)}o(void 0)}))}}var o={name:"cloud-image",emits:["click","switchChange"],props:{mode:{type:String,default:function(){return"widthFix"}},src:{default:function(){return""}},width:{type:String,default:function(){return"100rpx"}},height:{type:String,default:function(){return"100rpx"}}},watch:{src:{handler:function(t){var e=this;t&&"cloud://"==t.substring(0,8)?n.getTempFileURL({fileList:[t]}).then((function(n){e.cSrc=n.fileList[0].tempFileURL})):this.cSrc=t},immediate:!0}},mounted:function(){return c(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:case"end":return n.stop()}}),n)})))()},methods:{onClick:function(){this.$emit("click")}},data:function(){return{cSrc:!1}}};t.default=o}).call(this,e(10)["default"])}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/cloud-image/cloud-image.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/cloud-image/cloud-image-create-component',
    {
        'components/cloud-image/cloud-image-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(500))
        })
    },
    [['components/cloud-image/cloud-image-create-component']]
]);
