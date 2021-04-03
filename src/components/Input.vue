<template>
  <div class="input-wrapper">
      <div class="input-content">
          <div>文字</div>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
  </div>
</template>

<script>
export default {
    name:'Input',
    props:{
        value:{}
    }
}
</script>

<style>

</style>