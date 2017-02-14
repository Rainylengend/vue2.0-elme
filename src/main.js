// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from './commont/js/axios'
import swiper from './commont/swiper/swiper-3.4.1.min';
import iScroll from './commont/js/iscroll';
import Tween from './commont/js/tween';


import Vue from 'vue';
import App from './App';
import router from './router'
import store from './store/store'


Vue.prototype.$http = axios;
Vue.prototype.$iScroll = iScroll;
Vue.prototype.$swiper = swiper;
Vue.prototype.$Tween = Tween;
Vue.prototype.$Storage = window.sessionStorage;


new Vue({
  el: '#app',
  router,
  store,
  methods: {
    initRem(){
      let size = 750;
      let change = function () {
        let width = window.screen.width;
        let rem = width / size > 1 ? 1 : width / size < 0.3 ? 0.3 : width / size;
        document.getElementsByTagName("html")[0].style.fontSize = rem * 100 + "px";
      };
      change();
      if (window.addEventListener) {
        window.addEventListener("resize", function () {
          change();
        }, false);
      } else {
        window.attachEvent("onresize", function () {
          change();
        });
      }
    }
  },
  created(){
    this.initRem();
    const _self = this,
      URL = this.$store.state.URL,
      sellerId = this.$route.query.sellerId;
    let sellerArr = [],
      cache = [];

    this.$http.get(URL)
      .then(function (res) {
        _self.$store.commit('initData', res.data);
        sellerArr.length = cache.length = res.data.seller.length;
        sellerArr.fill(0);

        //设置购物车的缓存
        for (let i = 0; i < cache.length; i++) {
          cache[i] = {}
        }

        if (_self.$Storage.cache) {
          _self.$store.commit('initCache',JSON.parse(_self.$Storage.cache ));
        }else{
          _self.$store.commit('initCache',cache );
        }

        //每个商家的结算总价
        if (!_self.$Storage.allPrice)
          _self.$Storage.allPrice = JSON.stringify(sellerArr);
      })
  },
  template: '<App/>',
  components: {App},

});
