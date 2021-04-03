<template>
  <div class="title-wrapper">
      <span>{{titleV}}</span>
  </div>
</template>

<script>
export default {
    name:'Title',
    props:{
        title:{
            type:String,
            default:'标题'
        }
    },
    computed:{
        titleV(){
            return this.title
        }
    }
}
</script>

<style lang="scss">
.title-wrapper{
    width: 100%;
    // padding: 0 18px;
    @include flex_rfc();
    height: 60px;
    span {
        font-size: 24px;
        // font-weight: 600;
    }
    
}
</style>