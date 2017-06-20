<template>
  <div id="seller">
    <h3 class="index-title">推荐商家</h3>
    <router-link :to="{path:'goods',query:{sellerId:index+1}}" tag="div" class="seller" v-for="(item,index) in seller">
      <img :src="item.img" class="seller-logo">
      <div class="seller-intro" @click="routerTo">
        <section class="clear">
          <h3 class="pull-left" :class="{brand:item.brand}">{{item.name}}</h3>
          <div class="pull-right">
            <i v-for="i in seller[index].promise">{{i}}</i>
          </div>
        </section>
        <section class="seller-grade_list clear">
          <div class="seller-grade pull-left">
            <i class="iconfont active" v-for="i in item.start.amount">&#xe79a; </i>
            <i class="iconfont" v-for="i in (5-item.start.amount)">&#xe79a; </i>
            <span class="grade">{{ item.start.grade }}</span>
            <span class="month-amount">月售<span>{{item.monthAmount}}</span>单</span>
          </div>
          <div class="pull-right tag">
            <span v-for="i in seller[index].tag">{{i}}</span>
          </div>
        </section>
        <section class="address-info clear">
          <div class="pull-left">
            <span class="min-price">￥<span>{{ item.delivery.begin }}</span>起送</span> / <span class="send-price">{{  item.delivery.price | sendPrice }}</span>
          </div>
          <div class="pull-right">
            <span>{{ item.delivery.distance }}km</span> / <span class="address-time"> {{ item.delivery.time }} 分钟</span>
          </div>
        </section>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        seller: [
          {
            "name": "汉堡王(中山小榄店20637)",
            "tag": ["准时达 ", "蜂鸟专送"],
            "start": {"amount": 5, "grade": 4.7},
            "monthAmount": 169,
            "delivery": {"begin": 20, "price": 3, "time": 33, "distance": 1.10},
            "promise": ["保", "票", "准"],
            "img": '',
            brand: true
          }
        ]
      }
    },
    computed: {
      allData(){
        return this.$store.state.data
      }
    },
    watch: {
      allData(val){
        this.seller = val.seller;
      }
    },
    methods: {
      routerTo(){
        this.$emit('routerRender');
      }
    },
    created(){
      this.seller = this.allData.seller;
    },
    filters: {
      sendPrice(val){
        if (typeof val === 'string') {
          return val
        } else {
          return '配送费约￥' + val
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .index-title {
    height: .7rem;
    line-height: .7rem;
    font-size: .3rem;
    color: #000;
    font-weight: bold;
    padding-left: .3rem;
    border-bottom: 1px solid #F4F4F4;
  }

  .seller {
    height: 2rem;
    display: flex;
    padding: .3rem .1rem;
    border-bottom: 1px solid #F4F4F4;
  }

  .seller-logo {
    width: 1rem;
    height: 1.2rem;
    margin-right: .1rem;
  }

  .seller-intro {
    section {
      width: calc(100vw - 1.2rem);
      &:first-of-type i {
        font-style: normal;
        color: rgb(153, 153, 153);
        border: 1px solid rgb(221, 221, 221);
      }
    }
    h3 {
      font-size: .3rem;
      max-width: 3.75rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      &.brand::before {
        content: '品牌';
        font-size: .24rem;
        padding: .04rem;
        border-radius: 2px;
        background: #ffd930;
        margin-right: .2rem;
      }
    }

  }

  .seller-grade {
    .iconfont {
      font-size: .24rem;
      &.active {
        color: #ffaa0c;
      }
    }
  }

  .grade {
    color: #ff6000;
  }

  .tag span {
    margin-left: .1rem;
    &:first-of-type {
      color: #2395ff;
      border: 1px solid #44a5ff;
      background: #fff;
      border-radius: 2px;
    }
    &:last-of-type {
      background: #2395ff;
      color: #fff;
      border-radius: 2px;
    }
  }

  .address-time {
    color: #2395ff;
  }
</style>
