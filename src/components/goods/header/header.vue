<template>
  <div class="header">
    <div id="back" @click="routerBack">
      <i class="iconfont pull-left">&#xe612;</i>后退
    </div>
    <div class="top clear" @click="linkToSellerDetails">
      <img :src="seller.img" class="pull-left">
      <div calss="pull-right">
        <h3>{{ seller.name }}</h3>
        <section>
          <span v-if="seller.tag[1]">{{ seller.tag[1] }}/</span> <span v-if="seller.delivery.time">{{ seller.delivery.time }}分钟送达 /</span>
          <span>{{ seller.freePrice | freePrice }}</span>
          <i class="iconfont pull-right">&#xe612;</i>
        </section>
        <section>
          <p class="notice">
            公告：{{ seller.info }}
          </p>
        </section>
      </div>
    </div>
    <div class="bottom clear" @click="linkToActivity" v-if="seller.activity">
      <div class="bot-left pull-left">
        <span> {{ seller.activity[0].info }} </span> <span>(APP专享)</span>
      </div>
      <div class="bot-right pull-right">
        <span> {{ seller.activity.length }}个活动 </span>
        <i class="iconfont">&#xe612;</i>
      </div>
    </div>
    <div v-else class="bottom clear" @click="linkToActivity">
      <div class="pull-left">
        <span> 该商家暂时没有提供活动 </span>
      </div>
      <div class="bot-right pull-right">
        <i class="iconfont">&#xe612;</i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        seller: {
          "activity": [
            {
              "name": "新",
              "info": "新用户下单立减20.0元(不与其它活动同享)"
            },
            {
              "name": "满",
              "info": "满65减5(不与美食活动同享)（限在线支付）"
            },
            {
              "name": "半",
              "info": "汉堡王五折双享餐"
            }
          ],
          "name": "汉堡王(中山小榄店20637)",
          "info": " 汉堡王，是全球大型连锁餐饮企业，截止至2016年上半年，汉堡王在全球100多个国家及地区经营着超过15000家门店，现已全面加入外卖领导品牌饿了么，期待您的光临，配送问题可联系饿了么客服热线10105757.",
          "tag": [
            "准时达",
            "蜂鸟专送"
          ],
          "start": {
            "amount": 5,
            "grade": 4.7
          },
          "monthAmount": 169,
          "freePrice": 70,
          "delivery": {
            "begin": 20,
            "price": 3,
            "time": 33,
            "distance": 1.10
          },
          "promise": [
            "保",
            "票",
            "准"
          ],
          "img": "/static/img/seller1.jpeg",
          "brand": true,
          "id": 1
        },
      }
    },
    computed: {
      sellerId(){
        return this.$route.query.sellerId
      }
    },

    methods: {
      routerBack(){
        this.$router.go(-1);
      },
      linkToSellerDetails(){
        this.$store.commit('isRenderDetais', true);
      },
      linkToActivity(){
        this.$store.commit('isRenderActivity', true);
      }
    },
    created(){
      const _self = this,
        URL = this.$store.state.URL;
      this.$http.get(URL)
        .then(function (res) {
          _self.seller = res.data.seller[_self.sellerId - 1];
        })
    },
    filters: {
      freePrice(val){
        return val === 0 ? '免配送费' : '满' + val + '免配送费';
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .header {
    width: 100vw;
    height: 2.5rem;
    line-height: .4rem;
    background-color: rgba(119, 103, 137, .43);
    padding: .2rem;
    color: #fff;
  }

  #back {
    position: relative;
    top: -.1rem;
    .iconfont {
      display: block;
      line-height: .4rem;
      height: .4rem;
      transform: rotate(180deg);
      text-align: right;
      position: relative;
      top: -.03rem;
    }
  }

  .top {
    img {
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 6px;
      margin-right: .2rem;
    }
    h3 {
      font-size: .3rem;
      padding: .05rem 0;
    }
  }

  .notice {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .bottom {
    padding-top: .1rem;
  }

  .bot-left {
    width: 70%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &::before {
      content: "新";
      background: rgb(112, 188, 70);
      margin-right: .1rem;
      line-height: .24rem;
      padding: .02rem;
      border-radius: .08rem;
    }
  }
</style>
