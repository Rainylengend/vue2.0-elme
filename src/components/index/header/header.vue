<template>
  <div class="header">
    <i class="iconfont">&#xe505;</i>
    <div class="position">小榄镇龙山公园</div>
    <div class="login">登陆</div>
  </div>
</template>

<script>
export default {

}
</script>

<style rel="stylesheet/scss" scoped>
  @import "../../../commont/fonts/font.scss";
  .header{
    width:100%;
    height:44px;
    line-height:44px;
    font-size:18px;
    color: #fff;
    background: rgb(0, 151, 255);
    display: flex;
    position: fixed;
    z-index: 1000;
    top:0;
  }
  .header > * {
    flex-grow:1;
    text-align: center;
  }
  .header .iconfont{
    font-size:.5rem;
  }

</style>
