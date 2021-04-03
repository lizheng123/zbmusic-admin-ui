<template>
  <div class="sidebar-wrapper">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        default-active="2"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b"
        mode="vertical"
        :router="true">

        <el-submenu index="1">
          <template #title>
            <i class="el-icon-box"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>

export default {
  name:'Sidebar',
  // components: { SidebarItem, Logo },
  computed: {
    // activeMenu() {
    //   const route = this.$route
    //   const { meta, path } = route
    //   // if set path, the sidebar will highlight the path you set
    //   if (meta.activeMenu) {
    //     return meta.activeMenu
    //   }
    //   return path
    // },
    // showLogo() {
    //   return this.$store.state.settings.sidebarLogo
    // },
    // variables() {
    //   return variables
    // },
    // isCollapse() {
    //   return !this.sidebar.opened
    // }
  }
}
</script>

<style lang="scss">
.sidebar-wrapper{
    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .el-scrollbar__bar.is-vertical {
      right: 0px;
    }

    .el-scrollbar {
      height: 100vh;
    }

}
</style>