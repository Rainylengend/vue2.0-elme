<template>
  <div class="footer clear" @click="showCar">
    <div class="shop-car pull-left" :class="{active:isActive,bounce:isBounce}" id="shop-car">
      <i class="iconfont">&#xf0088;</i>
    </div>
    <div class="total-price pull-left">￥{{ allPrice }}</div>
    <button class="pull-right pay" :class="{active:isActive}" @click="aler">去结算</button>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        onOff: false
      }
    },
    computed: {
      allPrice(){
        return this.$store.state.goods.allPrice;
      },
      sellerId(){
        return this.$route.query.sellerId;
      },
      isActive(){
        return this.$store.state.goods.footerIsActive;
      },
      isBounce(){
        return this.$store.state.goods.isBounce;
      }
    },

    watch: {
      allPrice(val){
        if (val === 0) {
          this.$store.commit('FooterUnActive');
        }
      }
    },

    methods: {
      showCar(){
        if (this.allPrice !== 0) {
          this.onOff = !this.onOff;
          this.$store.commit('isActiveShopCar', this.onOff);
        }
      },
      aler(e){

        alert('结算界面还在开发中~~')
        e.stopPropagation()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @keyframes bounce {
    0% {
      transform: scale(.6);
    }
    33% {
      transform: scale(1.4);
    }
    66% {
      transform: scale(.8);
    }
    100% {
      transform: scale(1);
    }
  }

  .footer {
    width: 100vw;
    height: .96rem;
    background: #3d3d3f;
    z-index: 100;
  }

  .shop-car {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    text-align: center;
    border: .1rem solid #aaa;
    background: #3d3d3f;
    margin: 0 .2rem;
    position: relative;
    top: -50%;
    &.active {
      background: #3B96E9;
      color: #fff;
      border: .1rem solid #3d3d3f;
    }
    &.bounce {
      animation: bounce .5s;
    }
    i {
      font-size: .65rem;
      line-height: 1rem;
    }
  }

  .total-price {
    color: #fff;
    font-size: .4rem;
  }

  .pay {
    width: 2.1rem;
    height: .96rem;
    background: #535356;
    color: #fff;
    font-size: .4rem;
    font-weight: bold;
    &.active {
      background: #4cd964;
    }
  }

</style>
