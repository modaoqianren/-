import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import  home  from "./modules/home";
import  cate  from "./modules/cate";
import  specs  from "./modules/specs";
import  goods  from './modules/goods';
import banner from './modules/banner';
import seckill from './modules/seckill';
import { state, getters, mutations } from './mutations'
import  actions  from './actions'
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules:{
    home,
    cate,
    specs,
    goods,
    banner,
    seckill
  }
})
