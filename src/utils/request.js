import Vue from 'vue'
import store from '@/store'
import axios from 'axios'
import router from '@/router/index'
import { Loading } from 'element-ui'
let loading
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading () {
  loading.close()
}

let needLoadingRequestCount = 0
export function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
const $http = axios.create()
$http.interceptors.request.use(
  config => {
    config.headers={
      Authorization:b64EncodeUnicode(store.state.app.user.passport+":"+store.state.app.user.passwd)
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)
function b64EncodeUnicode(str) {
  return "Basic " + btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
}

/*$http.interceptors.response.use(
  response => {
    // 当返回信息为未登录或者登录失效的时候重定向为登录页面
    if (response.data.code === 'W_100004' || response.data.message === '用户未登录或登录超时，请登录！') {
      router.push({
        path: '/',
        querry: {redirect: router.currentRoute.fullPath} // 从哪个页面跳转
      })
    }
    tryHideFullScreenLoading()
    return response.data
  },
  error => {
    Promise.reject(error)
}
)*/
Object.defineProperty(Vue.prototype, '$axios', { value: $http })
