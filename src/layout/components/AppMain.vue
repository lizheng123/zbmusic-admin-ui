<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
        <router-view />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
}
</script>

<style lang="scss">
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

</style>
