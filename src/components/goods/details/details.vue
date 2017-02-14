<template>
  <div class="details" :class="{slideOut:isClose}">
    <header><i class="iconfont pull-left" @click="closeDetails">&#xe612;</i>商家详情</header>
    <div class="activity">
      <div class="title">活动与属性</div>
      <div class="content" v-if="details">
        <p v-for="item in details">
          <i>{{ item.name }}</i>
          {{ item.info }}
        </p>
      </div>
      <div v-else class="content">
        该商家现在还没有活动哟~
      </div>
    </div>
    <div class="info">
      <div class="title">商家信息</div>
      <div class="content">
        <p v-if="name"> {{name}} </p>
        <p v-if="address"> {{ address }} </p>
        <p v-if="BusinessHours">
          营业时间：{{ BusinessHours }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    computed: {
      sellerId(){
        return this.$route.query.sellerId
      },
      isClose(){
        return this.$store.state.isCloseDetails;
      },
      allData(){
        return this.$store.state.data;
      },
      details(){
        return this.allData.seller[this.sellerId - 1].details;
      },
      address(){
        return this.allData.seller[this.sellerId - 1].address;
      },
      BusinessHours(){
        return this.allData.seller[this.sellerId - 1].BusinessHours;
      },
      name(){
        return this.allData.seller[this.sellerId - 1].name;
      }
    },
    methods: {
      closeDetails(){
        this.$store.commit('isRenderDetais', false);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }

  .details {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #eee;
    position: absolute;
    top: 0;
    left: 0;
    animation: slideIn .5s forwards;
    -webkit-animation: slideIn .5s;
    z-index: 1000;
    &.slideOut {
      animation: slideOut .5s;
      -webkit-animation: slideOut .5s
    }
  }

  header {
    height: 44px;
    line-height: 44px;
    font-size: 22px;
    color: #fff;
    font-weight: normal;
    background-color: #2196f3;
    text-align: center;
    i {
      transform: rotate(180deg);
      display: inline-block;
      width: 30px;
      height: 44px;
      position: relative;
      top: -2px;
    }
  }

  .activity, .info {
    background: #fff;
    margin-top: .15rem;
  }

  .title {
    line-height: .6rem;
    font-size: .32rem;
    border-bottom: 1px solid #F4F4F4;
  }

  .activity .content, .title {
    padding: .1rem .25rem;
  }

  .activity .content p {
    padding: .1rem 0;
    i {
      background: rgb(112, 188, 70);
      color: #fff;
      font-style: normal;
      margin-right: .1rem;
    }
  }

  .info .content p {
    padding: .2rem 0;
    margin: 0 .25rem;
    border-bottom: 1px solid #F4F4F4;
  }
</style>
