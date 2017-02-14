<template>
  <div id="goods">
    <shop-car></shop-car>
    <div  class="goods">
      <v-header></v-header>
      <v-content class="content"></v-content>
      <v-footer></v-footer>
    </div>
    <v-details v-if="isRenderDetais"></v-details>
    <v-activity v-if="isRenderActivity"></v-activity>
  </div>
</template>

<script>
import vHeader from './header/header.vue';
import vContent from './content/content.vue';
import vFooter from './footer/footer.vue';
import vDetails from './details/details.vue';
import vActivity from './activity/activity.vue';
import shopCar from './shopCar/shopCar.vue';

export default {
  computed:{
    isRenderDetais(){
      return this.$store.state.isRenderDetais;
    },
    isRenderActivity(){
      return this.$store.state.isRenderActivity;
    }
  },
  components:{
    vHeader,
    vContent,
    vFooter,
    vDetails,
    vActivity,
    shopCar
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  #goods{
    position: relative;
  }
  .goods{
    width:100vw;
    overflow: hidden;
    display: flex;
    height:100vh;
    flex-direction: column;
  }
  .content{
    flex-grow:1;
    position: relative;
  }
</style>
