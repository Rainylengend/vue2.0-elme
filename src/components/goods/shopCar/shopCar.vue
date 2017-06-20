<template>
  <div class="shopCar" :class="{active:isActive}">
    <div class="title">
      <span>购物车</span>
    </div>
    <ul class="items" v-if="cache" v-for="(item,index) in cache">
      <li v-if="item.amount">
        <span class="name">{{item.name}}</span>
        <span>￥{{ item.price*item.amount }}</span>
        <span class="pull-right">
          <span class="amount">{{item.amount}}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    computed: {
      isActive(){
        return this.$store.state.isActiveShopCar;
      },
      sellerId(){
        return this.$route.query.sellerId;
      },
      cache(){
        return this.$store.state.cache[this.sellerId - 1] ? this.$store.state.cache[this.sellerId - 1] : '';
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .shopCar {
    width: 100vw;
    min-height: 1.5rem;
    background: #fff;
    position: absolute;
    bottom: .96rem;
    z-index: 1;
    transform: translateY(100%);
    transition: .5s;
    &.active {
      transform: translateY(0);
    }
  }

  .title {
    height: .5rem;
    line-height: .5rem;
    text-indent: 1.5em;
    background: #ddd;
  }

  .items {
    li {
      padding: .4rem .2rem;
      border-bottom: 1px solid #F4F4F4;
    }
    span, a {
      display: inline-block;
    }
  }

  .name {
    width: 55%;
  }

  .add, .reduce {
    width: .5rem;
    height: .5rem;
    text-align: center;
    line-height: .46rem;
    font-size: .4rem;
    font-weight: bold;
    border-radius: 50%;
  }

  .add {
    background: #3190e8;
    color: #fff;
  }

  .reduce {
    color: #3190e8;
    border: 1px solid #3190e8;
  }

  .amount {
    width: .7rem;
    text-align: center;
    line-height: .5rem;
  }
</style>
