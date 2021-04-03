<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "@/styles/index.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
}
html{color:#000;background:#FFF;}   
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,b,span,
fieldset,input,textarea,p,blockquote,th,td {   
margin:0;   
padding:0;
font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;   
}
a{
  text-decoration:none;
} 
li,div{
    // @include drag(false);
    @include textNoSelect();
}
// 重写element ui 组合输入框
.el-input-group__append, .el-input-group__prepend {
    color: #333 !important;
    background: none !important;
    padding: 0 12px !important;
}
.el-input-group--prepend .el-input__inner {
    border-left: 1px solid #fff;
}
</style>
