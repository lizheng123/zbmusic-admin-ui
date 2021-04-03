<template>
<!-- app内容包裹 -->
  <div class="app-wrapper">
      <!-- 左侧垂直导航 -->
      <div class="left-sidebar">
          <sidebar/>
      </div>
      <!-- 主展示内容区域 -->
      <div class="main-container">
          <app-main />
      </div>
  </div>
</template>

<script>
import { AppMain,Sidebar } from './components'
export default {
    name: 'Layout',
    components: {
        AppMain,Sidebar
    },
    data(){
        return{

        }
    },
}
</script>

<style lang="scss">
.app-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    // background: yellow;
    $sideBarWidth:210px;
    .left-sidebar{
        -webkit-transition: width .28s;
        transition: width .28s;
        width: 210px!important;
        background-color: #304156;
        height: 100%;
        position: fixed;
        font-size: 0;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
    }
    .main-container{
        min-height: 100%;
        transition: margin-left .28s;
        margin-left: $sideBarWidth;
        position: relative;
        // background: brown;
    }
}
</style>