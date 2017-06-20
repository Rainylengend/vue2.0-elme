import Vue from "vue";
import vuex from "vuex";

Vue.use(vuex);

const store = new vuex.Store({
  state: {
    data: '',
    URL: '/static/data.json',
    goods: {
      footerIsActive: false,
      isActive: false,
      isBounce: false,
      allPrice: 0
    },
    isRenderDetais: false,
    isCloseDetails: true,
    isRenderActivity: false,
    isCloseActivity: true,
    isActiveShopCar: false,
    cache: []
  },
  mutations: {
    initCache(state, val){
      state.cache = null;
      state.cache = val
    },
    isActiveShopCar(state, val){
      state.isActiveShopCar = val
    },
    isRenderDetais(state, val){

      if (val === false) {
        state.isCloseDetails = true;
        setTimeout(function () {
          state.isRenderDetais = val;
        }, 500)
      } else {
        state.isRenderDetais = val;
        state.isCloseDetails = false;
      }

    },

    isRenderActivity(state, val){

      if (val === false) {
        state.isCloseActivity = true;
        setTimeout(function () {
          state.isRenderActivity = val;
        }, 500)
      } else {
        state.isRenderActivity = val;
        state.isCloseActivity = false;
      }
    },

    initData(state, val){
      state.data = val;
    },
    changeAllPrice(state, val){
      state.goods.allPrice = val;
    },

    //foods的减菜单以及数量是否激活
    active(state, index, sellerId){
      let _isActive = state.goods.isActive;

      state.goods.isActive = null;
      _isActive[index[0]][index[1]] = true;
      window.sessionStorage['setActive' + index[2]] = JSON.stringify(_isActive);
      state.goods.isActive = _isActive;
    },

    setActive(state, arr){
      state.goods.isActive = arr;
    },

    unActive(state, index){
      let _isActive = state.goods.isActive;

      if (arguments[1] === true) {
        console.log(_isActive, 1)
      } else {
        state.goods.isActive = null;
        _isActive[index[0]][index[1]] = false;
        window.sessionStorage['setActive' + index[2]] = JSON.stringify(_isActive);
        state.goods.isActive = _isActive;
      }
    },
    //footer的样式是否激活
    footerActive(state){
      state.goods.footerIsActive = true;
    },

    FooterUnActive(state){
      state.goods.footerIsActive = false;
    },

    bounce(state){
      state.goods.isBounce = true;
    },

    unBounce(state){
      state.goods.isBounce = false;
    }
  }
});

export default store
