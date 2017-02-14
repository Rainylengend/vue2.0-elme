<template>
  <div class="classify">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <ul class="swiper-slide">
          <li v-for="item in classify[0]" v-cloak>
            <img :src="item.img">
            <p>{{item.msg}}</p>
          </li>
        </ul>
        <ul class="swiper-slide">
          <li v-for="item in classify[1]" v-cloak>
            <img :src="item.img">
            <p>{{item.msg}}</p>
          </li>
        </ul>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
const url = '/static/img/';
const classify = {
  0:[
    {img: url + 'food1.png',msg:'美食'},
    {img: url + 'food2.png',msg:'甜品饮品'},
    {img: url + 'food3.png',msg:'商店超市'},
    {img: url + 'food4.png',msg:'果蔬生鲜'},
    {img: url + 'food5.png',msg:'准时达'},
    {img: url + 'food6.png',msg:'简餐'},
    {img: url + 'food7.png',msg:'土豪推荐'},
    {img: url + 'food8.png',msg:'鲜花蛋糕'}
  ],
  1:[
    {img: url + 'food9.png',msg:'汉堡'},
    {img: url + 'food10.png',msg:'麻辣烫'},
    {img: url + 'food11.png',msg:'披萨意面'},
    {img: url + 'food12.png',msg:'川湘菜'},
    {img: url + 'food13.png',msg:'包子粥店'}
  ]
};

export default {
    data() {
        return {
          classify
        }
    },
    mounted() {
      let mySwiper = new this.$swiper('.swiper-container', {
        pagination : '.swiper-pagination'
      })
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .swiper-pagination-bullet-active,.swiper-pagination-bullet{
    width:.08rem;
    height:.08rem;
    background: rgba(0,0,0,.6);
  }
  .classify{
    border-bottom:10px solid #F4F4F4;
    img{
      margin: auto;
      width:.9rem;
      height:.9rem;
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      padding-top:.2rem;
      padding-bottom:.2rem;
      li{
        width:25vw;
        height:1.3rem;
        text-align: center;
      }
    }
  }
</style>
