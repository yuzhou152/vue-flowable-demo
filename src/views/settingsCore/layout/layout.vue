<template>
  <div class="portalLayoutMain">
    <el-container>
      <!--左侧菜单组件-->
      <asideMenu></asideMenu>
      <!--左侧菜单组件-->
      <el-container>
        <el-header>
          <!--顶部组件-->
          <Header></Header>
          <!--顶部组件-->
        </el-header>
        <div  class="breadcrumb">
          <router-link
            ref='tag'
            class="tags-view-item"
            :class="{'tags-view-active': $store.state.app.checkRouter === item.fullPath}"
            v-for="(item, index) in $store.state.app.routerViews"
            :key="index"
            :to="item.fullPath">
            {{item.name}}
            <span class='el-icon-close' v-if="$store.state.app.routerViews.length >= 2" @click.prevent.stop='closeSelectedTag(item)'></span>
          </router-link>
        </div>
        <el-main>
          <!--路由缓存-->
          <keep-alive :include="$store.state.app.includePageNames.toString()">
            <router-view> </router-view>
          </keep-alive>
          <!--路由缓存-->
          <div class="welcome-tip" v-if="$store.state.app.routerViews.length == 0">你好 欢迎使用知果果管理平台</div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './common/header'
import asideMenu from './common/asideMenu'
export default {
  components: {
    Header,
    asideMenu
  },
  name: 'layout',
  data () {
    return {
    }
  },
  computed: {
    tagRouters () {
      return this.$store.state.app.routerViews
    }
  },
  watch: {
    '$router' (to, form) {
      /*
      let routerViews = []
      this.$store.state.app.routerViews.map(item => {routerViews.push(item.fullPath)})
      if (routerViews.indexOf(to.fullPath) === -1) {
        this.$router.go(0)
      } */
    }
  },
  created () {
  },
  methods: {
    /**
     * zb-关闭快捷导航
     * 18-09-28
     * @tag Object 点击的路由对象
     */
    closeSelectedTag (tag) {
      console.log(this)
      this.$store.commit('delRouterViews', tag)
    }
  }
}
</script>

<style scoped rel="tylesheet/scss" lang="scss">
  .portalLayoutMain {
    height: 100%;
    .el-container {
      height: 100%;
      background-color: #f3f3f4;
      .el-header, .el-footer {
        height: 96px !important;
        background-color: #e9ecf1;
        color: #333;
        text-align: center;
        line-height: 96px;
      }
      .el-aside {
        font-size: 14px;
        min-width: 239px;
        background-color: #2b2b38;
        color: #333;
        text-align: left;
      }
      .el-main {
        color: #333;
        padding-top: 0;
      }
    }
  }
  .breadcrumb {
    height: 50px;
    line-height: 50px;
    text-align: left;
    padding-left:16px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0,0,0,.2);
  }
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
  .tags-view-item {
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
    text-decoration: none;
    margin: 0 5px;
  }
  .tags-view-active{
    background-color: rgba(64,158,255,.1);
  }
  .welcome-tip{
    font-size:24px;
    line-height:112px;
    text-align:center;
    color: rgba(75, 73, 81, 0.75);
  }
</style>
