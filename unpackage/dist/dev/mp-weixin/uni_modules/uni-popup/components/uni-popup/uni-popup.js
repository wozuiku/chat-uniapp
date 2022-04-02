(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-popup/components/uni-popup/uni-popup"],{505:function(t,o,n){"use strict";n.r(o);var i=n(506),e=n(508);for(var s in e)"default"!==s&&function(t){n.d(o,t,(function(){return e[t]}))}(s);n(510);var r,a=n(23),c=Object(a["default"])(e["default"],i["render"],i["staticRenderFns"],!1,null,"7c43d41b",null,!1,i["components"],r);c.options.__file="uni_modules/uni-popup/components/uni-popup/uni-popup.vue",o["default"]=c.exports},506:function(t,o,n){"use strict";n.r(o);var i=n(507);n.d(o,"render",(function(){return i["render"]})),n.d(o,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(o,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(o,"components",(function(){return i["components"]}))},507:function(t,o,n){"use strict";var i;n.r(o),n.d(o,"render",(function(){return e})),n.d(o,"staticRenderFns",(function(){return r})),n.d(o,"recyclableRender",(function(){return s})),n.d(o,"components",(function(){return i}));try{i={uniTransition:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-transition/components/uni-transition/uni-transition")]).then(n.bind(null,588))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var e=function(){var t=this,o=t.$createElement;t._self._c},s=!1,r=[];e._withStripped=!0},508:function(t,o,n){"use strict";n.r(o);var i=n(509),e=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(o,t,(function(){return i[t]}))}(s);o["default"]=e.a},509:function(t,o,n){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n={name:"uniPopup",components:{},emits:["change","maskClick"],props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},maskClick:{type:Boolean,default:!0},backgroundColor:{type:String,default:"none"},safeArea:{type:Boolean,default:!0}},watch:{type:{handler:function(t){this.config[t]&&this[this.config[t]](!0)},immediate:!0},isDesktop:{handler:function(t){this.config[t]&&this[this.config[this.type]](!0)},immediate:!0},maskClick:{handler:function(t){this.mkclick=t},immediate:!0}},data:function(){return{duration:300,ani:[],showPopup:!1,showTrans:!1,popupWidth:0,popupHeight:0,config:{top:"top",bottom:"bottom",center:"center",left:"left",right:"right",message:"top",dialog:"center",share:"bottom"},maskClass:{position:"fixed",bottom:0,top:0,left:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.4)"},transClass:{position:"fixed",left:0,right:0},maskShow:!0,mkclick:!0,popupstyle:this.isDesktop?"fixforpc-top":"top"}},computed:{isDesktop:function(){return this.popupWidth>=500&&this.popupHeight>=500},bg:function(){return""===this.backgroundColor||"none"===this.backgroundColor?"transparent":this.backgroundColor}},mounted:function(){var o=this,n=function(){var n=t.getSystemInfoSync(),i=n.windowWidth,e=n.windowHeight,s=n.windowTop,r=n.safeAreaInsets;o.popupWidth=i,o.popupHeight=e+s,o.safeArea?o.safeAreaInsets=r:o.safeAreaInsets=0};n()},created:function(){this.mkclick=this.maskClick,this.animation?this.duration=300:this.duration=0,this.messageChild=null,this.clearPropagation=!1},methods:{closeMask:function(){this.maskShow=!1},disableMask:function(){this.mkclick=!1},clear:function(t){t.stopPropagation(),this.clearPropagation=!0},open:function(t){var o=["top","center","bottom","left","right","message","dialog","share"];t&&-1!==o.indexOf(t)||(t=this.type),this.config[t]?(this[this.config[t]](),this.$emit("change",{show:!0,type:t})):console.error("缺少类型：",t)},close:function(t){var o=this;this.showTrans=!1,this.$emit("change",{show:!1,type:this.type}),clearTimeout(this.timer),this.timer=setTimeout((function(){o.showPopup=!1}),300)},touchstart:function(){this.clearPropagation=!1},onTap:function(){this.clearPropagation?this.clearPropagation=!1:(this.$emit("maskClick"),this.mkclick&&this.close())},top:function(t){var o=this;this.popupstyle=this.isDesktop?"fixforpc-top":"top",this.ani=["slide-top"],this.transClass={position:"fixed",left:0,right:0,backgroundColor:this.bg},t||(this.showPopup=!0,this.showTrans=!0,this.$nextTick((function(){o.messageChild&&"message"===o.type&&o.messageChild.timerClose()})))},bottom:function(t){this.popupstyle="bottom",this.ani=["slide-bottom"],this.transClass={position:"fixed",left:0,right:0,bottom:0,paddingBottom:this.safeAreaInsets&&this.safeAreaInsets.bottom||0,backgroundColor:this.bg},t||(this.showPopup=!0,this.showTrans=!0)},center:function(t){this.popupstyle="center",this.ani=["zoom-out","fade"],this.transClass={position:"fixed",display:"flex",flexDirection:"column",bottom:0,left:0,right:0,top:0,justifyContent:"center",alignItems:"center"},t||(this.showPopup=!0,this.showTrans=!0)},left:function(t){this.popupstyle="left",this.ani=["slide-left"],this.transClass={position:"fixed",left:0,bottom:0,top:0,backgroundColor:this.bg,display:"flex",flexDirection:"column"},t||(this.showPopup=!0,this.showTrans=!0)},right:function(t){this.popupstyle="right",this.ani=["slide-right"],this.transClass={position:"fixed",bottom:0,right:0,top:0,backgroundColor:this.bg,display:"flex",flexDirection:"column"},t||(this.showPopup=!0,this.showTrans=!0)}}};o.default=n}).call(this,n(1)["default"])},510:function(t,o,n){"use strict";n.r(o);var i=n(511),e=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(o,t,(function(){return i[t]}))}(s);o["default"]=e.a},511:function(t,o,n){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-popup/components/uni-popup/uni-popup.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-popup/components/uni-popup/uni-popup-create-component',
    {
        'uni_modules/uni-popup/components/uni-popup/uni-popup-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(505))
        })
    },
    [['uni_modules/uni-popup/components/uni-popup/uni-popup-create-component']]
]);
