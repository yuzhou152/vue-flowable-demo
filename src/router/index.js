import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
Vue.use(Router)

const Routers = new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/views/login'], resolve)
    },
    {
      path: '/home',
      name: '首页',
      component: resolve => require(['@/views/settingsCore/layout/layout'], resolve),
      children: [
        /* 权限管理路由 */
        {
          path: 'workbench/process',
          name: '流程管理',
          component: resolve => require(['@/views/workbench/process/process'], resolve)
        },
        {
          path: 'workbench/task/:ordercode',
          name: '任务管理',
          component: resolve => require(['@/views/workbench/task/task'], resolve)
        },
        {
          path: 'workbench/task/task1/:ordercode/:taskid/:processInstanceId',
          name: '任务详情',
          component: resolve => require(['@/views/workbench/task/instance/task1'], resolve)
        },
        {
          path: 'workbench/task/task2/:ordercode/:taskid/:processInstanceId',
          name: '任务详情',
          component: resolve => require(['@/views/workbench/task/instance/task2'], resolve)
        }
      ]
    }, {
      path: '/Error',
      component: resolve => require(['@/views/notFound'], resolve)
    }, {
      path: '*',
      redirect: '/Error'
    }
  ]
})
Routers.beforeEach((to, form, next) => {
  if ((to.name && to.name !== '登陆')) {
    next()
    if (to.name.indexOf('新增编辑') !== -1) return false
    store.commit('pushRouterViews', to)
    if (to.name !== '登陆' && store.state.app.routerViews.length === 1) {
      store.commit('updataCheckRouter', to.fullPath)
    }
    next()
  } else {
    next()
  }
})
export default Routers
