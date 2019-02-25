import Vue from 'vue'
import moment from 'moment'
import './request'
import * as common from './common'
import api from '../config/index'
Object.defineProperty(Vue.prototype, '$moment', { value: moment })
Object.defineProperty(Vue.prototype, '$api', { value: api.config })
Object.defineProperty(Vue.prototype, '$common', { value: common })
