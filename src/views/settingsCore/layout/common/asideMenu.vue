<template>
  <el-menu
    :default-active="$store.state.app.checkRouter"
    class="el-menu-vertical-demo el-aside"
    :collapse="isCollapse"
    background-color="#2b2b38"
    text-color="#ffffff"
    unique-opened
    router>
    <div class="select">切换系统的下啦选项占位</div>
    <el-submenu v-for="item in menu" :key="item.id" :index="item.name">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item.name}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="childItem in item.children" :key="childItem.id" :index="childItem.url ? childItem.url : '#' " v-if="childItem.type === 'cd'"><span></span>{{childItem.name}}</el-menu-item>
      </el-menu-item-group>
      <el-submenu v-for="childItem in item.children" :key="childItem.id" :index="childItem.url ? childItem.url + '/' + childItem.id : '#'" v-if="childItem.type === 'ml'">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{childItem.name}}</span>
        </template>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'asideMenu',
  props: {
    isCollapse: { // 控制左侧菜单是否收缩
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menu: [] // 菜单数组
    }
  },
  created () {
    this.getMenu()
  },
  computed: {
    checkRouter () {
      return this.$store.state.app.checkRouter
    }
  },
  watch: {
    $route (to) {
      if (to.name.indexOf('新增编辑') !== -1) return false
      this.$store.commit('updataCheckRouter', to.fullPath)
    },
    checkRouter (newValue) {
      this.$router.push(newValue)
    }
  },
  methods: {
    /**
     * zb-获取左侧菜单列表
     * 模拟数据
     * @param type number
     */
    getMenu (type) {
      this.menu = [
        {
          "children": [
            {
              "id": 2,
              "name": "流程列表",
              "parentId": 1,
              "status": 0,
              "type": "cd",
              "url": "/home/workbench/process"
            },
            {
              "id": 3,
              "name": "任务列表",
              "parentId": 1,
              "status": 0,
              "type": "cd",
              "url": "/home/workbench/task/null"
            }
          ],
          "id": 1,
          "name": "工作台",
          "status": 0,
          "type": "ml",
          "url": ""
        }
      ];
    }
  }
}
</script>

<style scoped>
  .el-menu-item span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #76768e;
    border-radius: 50%;
    margin-right: 10px;
  }
  .el-menu-item-group .is-active {
    background-color: rgb(34, 34, 45) !important;
  }
  .el-menu-item-group .is-active span {
    background-color: #e8c260;
  }
</style>
