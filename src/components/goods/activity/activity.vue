<template>
  <div class="activity" :class="{fadeOut:isCloseActivity}">
    <div class="main">
      <h3>{{ this.seller.name }}</h3>
      <div class="star">
        <i class="iconfont active" v-for="i in this.seller.start.amount">&#xe79a; </i>
        <i class="iconfont" v-for="i in (5-this.seller.start.amount)">&#xe79a; </i>
      </div>
      <div class="activity-info">
        <div class="title">优惠信息</div>
        <div class="content" v-if="this.activity">
          <p v-for="item in this.activity"><i> {{ item.name }} </i> {{item.info}}</p>
        </div>
        <div v-else>
          暂时没有优惠信息~
        </div>
      </div>
      <div class="notice">
        <div class="title">商家公告</div>
        <p v-if="this.seller.info">
         {{ this.seller.info }}
        </p>
        <p v-else>
          商家比较懒什么都没说~
        </p>
      </div>
      <div class="close" @click="close">
        X
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      isCloseActivity(){
        return this.$store.state.isCloseActivity;
      },
      sellerId(){
        return this.$route.query.sellerId;
      },
      seller(){
        return this.$store.state.data.seller[ this.sellerId-1 ];
      },
      activity(){
        return this.seller.activity;
      }
    },
    methods: {
      close(){
        this.$store.commit('isRenderActivity', false);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .activity {
    width: 100vw;
    height: 100vh;
    background: #262626;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    animation: fadeIn .5s;
    &.fadeOut{
      animation: fadeOut .5s;
    }
  }


  .main {
    padding: 44px .4rem 0;
    height: 100%;
  }

  h3 {
    text-align: center;
    font-size: 1.5em;
  }

  .star {
    text-align: center;
    i{
      font-size: 1.5em;
      &.active{
        color: #ffaa0c;
      }
    }
  }

  .title {
    width: 1.6rem;
    text-align: center;
    font-size: .32rem;
    margin: .2rem auto;
    padding: 0 .1rem;
    border: 1px solid #F4F4F4;
    border-radius: 1.75em;
  }

  .close {
    width: 1rem;
    height: 1rem;
    font-size: .4rem;
    line-height: 1rem;
    text-align: center;
    border: 1px solid #F4F4F4;
    border-radius: 50%;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    margin-left: -.5rem;
  }

  .activity-info i{
    width:1.1em;
    height:1.1em;
    line-height:1.1em;
    display: inline-block;
    border-radius: 2px;
    text-align: center;
    background: rgb(112, 188, 70);
  }
</style>
