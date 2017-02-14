<template>
  <div id="app">
    <div>
      <v-header></v-header>
      <div id="iscroll">
        <div id="scroller">
          <v-classify></v-classify>
          <v-seller @routerRender="routerRender"></v-seller>
          <div class="pull-down">没有内容了~~~</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import iScroll from '../../commont/js/iscroll';

  import vHeader from './header/header.vue';
  import vClassify from '../classify/classify.vue';
  import vSeller from '../seller/seller.vue';

  export default {
    data() {
      return {
        scroll: null
      }
    },
    mounted(){
      let that = this,
        screenH = document.body.clientHeight || document.documentElement.clientHeight || window.pageYOffset,
        scrollH = document.getElementById('scroller').clientHeight,
        disH = screenH - scrollH;

        setTimeout(function(){
          that.scroll = new iScroll('iscroll', {
            onScrollEnd(e){
              if (this.y <= disH) {
                this.refresh();
                scrollH = document.getElementById('scroller').clientHeight;
                disH = screenH - scrollH;
              }
            }
          });
        },200)
    },
    methods: {
      routerRender(){
        this.index = false;
      },
      infinite(){

      }
    },
    components: {
      vHeader,
      vClassify,
      vSeller
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../commont/scss/reset.scss";

  #iscroll {
    height: calc(100vh - 44px);
    position: relative;
    margin-top: 44px;
    .pull-down {
      font-size: .3rem;
      line-height: .5rem;
      text-align: center;
    }
  }


</style>
