(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/hch-poster/hch-poster"],{178:function(t,e,n){"use strict";n.r(e);var r=n(179),s=n(181);for(var a in s)"default"!==a&&function(t){n.d(e,t,(function(){return s[t]}))}(a);n(184);var o,i=n(23),c=Object(i["default"])(s["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],o);c.options.__file="components/hch-poster/hch-poster.vue",e["default"]=c.exports},179:function(t,e,n){"use strict";n.r(e);var r=n(180);n.d(e,"render",(function(){return r["render"]})),n.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(e,"components",(function(){return r["components"]}))},180:function(t,e,n){"use strict";var r;n.r(e),n.d(e,"render",(function(){return s})),n.d(e,"staticRenderFns",(function(){return o})),n.d(e,"recyclableRender",(function(){return a})),n.d(e,"components",(function(){return r}));var s=function(){var t=this,e=t.$createElement;t._self._c},a=!1,o=[];s._withStripped=!0},181:function(t,e,n){"use strict";n.r(e);var r=n(182),s=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=s.a},182:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n(11)),s=n(183);function a(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n,r,s,a,o){try{var i=t[a](o),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(r,s)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(r,s){var a=t.apply(e,n);function i(t){o(a,r,s,i,c,"next",t)}function c(t){o(a,r,s,i,c,"throw",t)}i(void 0)}))}}var c={data:function(){return{system:{},canvasShow:!1}},props:{posterData:{type:Object,default:function(){return{}}}},computed:{poster:function(){var t=this.posterData,e=this.system,n={url:t.poster.url,r:t.poster.r*e.scale,w:t.poster.w*e.scale,h:t.poster.h*e.scale,x:(e.w-t.poster.w*e.scale)/2,y:(e.h-t.poster.h*e.scale)/2,p:t.poster.p*e.scale};return n},mainImg:function(){var t=this.posterData,e=this.system,n={url:t.mainImg.url,r:t.mainImg.r*e.scale,w:t.mainImg.w*e.scale,h:t.mainImg.h*e.scale,x:(e.w-t.mainImg.w*e.scale)/2,y:this.poster.y+t.poster.p*e.scale};return n},title:function(){var t=this.posterData,e=this.system,n=t.title;return n.x=this.mainImg.x,n.y=this.mainImg.y+this.mainImg.h+t.title.mt*e.scale,n},codeImg:function(){var t=this.posterData,e=this.system,n={url:t.codeImg.url,r:t.codeImg.r*e.scale,w:t.codeImg.w*e.scale,h:t.codeImg.h*e.scale,x:(e.w-t.codeImg.w*e.scale)/2,y:t.codeImg.mt*e.scale};return n}},created:function(){this.system=(0,s.getSystem)()},methods:{posterShow:function(){this.canvasShow=!0,this.creatPoster()},creatPoster:function(){var e=this;return i(r.default.mark((function n(){var a,o,i,c,u,l,h;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading({title:"生成海报中..."}),a=t.createCanvasContext("myCanvas",e),e.ctx=a,a.clearRect(0,0,e.system.w,e.system.h),a.draw(),o=e.poster,i=e.mainImg,c=e.codeImg,u=e.title,n.next=11,(0,s.drawSquarePic)(a,o.x,o.y,o.w,o.h,o.r,o.url);case 11:return n.next=13,(0,s.drawSquarePic)(a,i.x,i.y,i.w,i.h,i.r,i.url);case 13:return console.log("creatPoster -> title.x",u.x),l=(0,s.drawTextReturnH)(a,u.text,u.x,u.y,i.w,u.fontSize,u.color,u.lineHeight),n.next=17,(0,s.drawSquarePic)(a,c.x,c.y+l,c.w,c.h,c.r,c.url);case 17:h=0,e.posterData.tips.forEach((function(t,e){0==e?h=c.y+l+t.mt+c.h:h+=t.mt,h=(0,s.drawTextReturnH)(a,t.text,u.x,h,i.w,t.fontSize,t.color,t.lineHeight,t.align)})),t.hideLoading();case 20:case"end":return n.stop()}}),n)})))()},handleSaveCanvasImage:function(){t.showLoading({title:"保存中..."});var e=this;t.canvasToTempFilePath({x:this.poster.x,y:this.poster.y,width:this.poster.w,height:this.poster.h,destWidth:5*this.poster.w,destHeight:5*this.poster.h,canvasId:"myCanvas",success:function(n){t.saveImageToPhotosAlbum({filePath:n.tempFilePath,success:function(n){t.hideLoading(),t.showToast({title:"图片保存成功，可以去分享啦~",duration:2e3,icon:"none"}),e.handleCanvasCancel()},fail:function(){t.showToast({title:"保存失败，稍后再试",duration:2e3,icon:"none"}),t.hideLoading()}})},fail:function(e){console.log("fail -> res",e),t.showToast({title:"保存失败，稍后再试",duration:2e3,icon:"none"}),t.hideLoading()}},this)},handleCanvasCancel:function(){this.canvasShow=!1,this.$emit("cancel",!0)}}};e.default=c}).call(this,n(1)["default"])},184:function(t,e,n){"use strict";n.r(e);var r=n(185),s=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=s.a},185:function(t,e,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/hch-poster/hch-poster.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/hch-poster/hch-poster-create-component',
    {
        'components/hch-poster/hch-poster-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(178))
        })
    },
    [['components/hch-poster/hch-poster-create-component']]
]);
