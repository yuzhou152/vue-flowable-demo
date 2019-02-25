const app = {
  state: {
    token: localStorage.getItem('XX_T') || '',
    user: localStorage.getItem('loginInfo') || {},
    routerViews: [],
    checkRouter: '',
    includePageNames: []
  },
  mutations: {
    updataUser (state, user) {
      state.user = user
      state.token = user ? user.token : ''
    },
    updataCheckRouter (state, tag) {
      state.checkRouter = tag
    },
    pushRouterViews (state, item) {
      if (state.routerViews.some(v => v.path === item.path)) return
      state.routerViews.push(item)
      state.includePageNames.push(item.meta.name)
    },
    pushIncludePageNames (state, item) {
      debugger
      if (state.includePageNames.some(v => v.path === item.path)) return
      debugger
      state.includePageNames.push(item.meta.name)
    },
    delRouterViews (state, tag) {
      for (const [i, v] of state.routerViews.entries()) {
        if (v.path === tag.path) {
          state.routerViews.splice(i, 1)
          state.includePageNames.splice(i, 1)
          break
        }
      }
      if (state.routerViews.length !== 0) state.checkRouter = state.routerViews[state.routerViews.length - 1].fullPath
    }
  }
}
export default app
