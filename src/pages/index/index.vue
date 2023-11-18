<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="/home"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          unique-opened
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="item in user.menus" :key="item.id">
            <!-- 没有children就是菜单 -->
            <el-menu-item v-if='!item.children' :index="item.url">{{ item.title }}</el-menu-item>
            <el-submenu :index="item.id + ''" v-else>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="i.url" v-for="i in item.children" :key='i.id'>{{ i.title }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          {{ user.username }}
          <el-button type="primary" @click="logOut">退出</el-button>
        </el-header>
        <el-main>
          <!-- 二级路由出口 -->
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.meta.title">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["changeUser"]),
    logOut() {
      this.changeUser({}), this.$router.replace("/login");
    }
  }
};
</script>

<style lang=less scoped>
@import "../../less/index.less";
.el-header {
  background: @header-color;
  line-height: 60px;
  text-align: right;
}
.el-aside {
  background: @aside-color;
  height: 100vh;
}
.el-menu-item:focus,
.el-menu-item:hover,
/deep/ .el-submenu__title:hover {
  background: @header-color !important;
}
</style>