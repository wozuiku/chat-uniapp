(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/activation/activation"],{"14b8":function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}));var i=function(){var t=this,n=t.$createElement;t._self._c},o=[]},"244c":function(t,n,e){"use strict";e.r(n);var a=e("14b8"),i=e("6719");for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e("a6e7");var r,u=e("f0c5"),c=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,"d225e056",null,!1,a["a"],r);n["default"]=c.exports},6719:function(t,n,e){"use strict";e.r(n);var a=e("6e58"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=i.a},"6e58":function(t,n,e){"use strict";(function(t,a){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=o(e("a34a"));function o(t){return t&&t.__esModule?t:{default:t}}function r(t,n,e,a,i,o,r){try{var u=t[o](r),c=u.value}catch(s){return void e(s)}u.done?n(c):Promise.resolve(c).then(a,i)}function u(t){return function(){var n=this,e=arguments;return new Promise((function(a,i){var o=t.apply(n,e);function u(t){r(o,a,i,u,c,"next",t)}function c(t){r(o,a,i,u,c,"throw",t)}u(void 0)}))}}var c=t.database(),s=(c.command,{data:function(){return{userInfo:{},invitationInfo:{},activationCode:""}},onLoad:function(){this.init()},methods:{init:function(){this.userInfo=a.getStorageSync("userInfo"),console.log("init this.userInfo:",this.userInfo)},activation:function(){var t=this;return u(i.default.mark((function n(){return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log("this.activationCode:",t.activationCode),n.next=3,t.getInvitationInfo(t.activationCode);case 3:if(console.log("activation this.invitationInfo:",t.invitationInfo),!t.invitationInfo){n.next=17;break}if(t.invitationInfo.openId!=t.userInfo.openid){n.next=9;break}a.showToast({title:"不能用自己邀请码激活",icon:"none"}),n.next=15;break;case 9:return n.next=11,t.updateValidDate();case 11:return n.next=13,t.updateInvitationCount(t.activationCode);case 13:a.showToast({title:"激活码成功",icon:"none"}),a.switchTab({url:"/pages/index/my"});case 15:n.next=18;break;case 17:a.showToast({title:"激活码无效",icon:"none"});case 18:case"end":return n.stop()}}),n)})))()},getInvitationInfo:function(t){var n=this;return u(i.default.mark((function e(){var a;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.collection("chat-member-activation").where('invitationCode=="'+t+'" && invitationCodeStatus=="Y"').get();case 2:a=e.sent,n.invitationInfo=a.result.data[0];case 4:case"end":return e.stop()}}),e)})))()},updateValidDate:function(){var t=this;return u(i.default.mark((function n(){var e,a;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e=t.userInfo.validDate,console.log("newValidDate1:",e),a=new Date(e),a=a.setDate(a.getDate()+10),a=new Date(a),a=t.$formatter.timeFormat(a,"yyyy-mm-dd"),console.log("newValidDate2:",a),n.next=9,c.collection("chat-member").where('_id=="'+t.userInfo._id+'"').update({validDate:a});case 9:case"end":return n.stop()}}),n)})))()},updateInvitationCount:function(t){var n=this;return u(i.default.mark((function e(){return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.collection("chat-member-activation").where('invitationCode=="'+t+'" && invitationCodeStatus=="Y"').update({invitationCount:n.invitationInfo.invitationCount+1});case 2:case"end":return e.stop()}}),e)})))()}}});n.default=s}).call(this,e("a9ff")["default"],e("543d")["default"])},a6e7:function(t,n,e){"use strict";var a=e("b48c"),i=e.n(a);i.a},b48c:function(t,n,e){},f0b6:function(t,n,e){"use strict";(function(t){e("b794");a(e("66fd"));var n=a(e("244c"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])}},[["f0b6","common/runtime","common/vendor"]]]);