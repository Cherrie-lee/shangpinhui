// 引入Vue核心库
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 应用Vuex插件
Vue.use(Vuex)
/* // action：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions={}
// mutations：修改state的唯一手段
const mutations ={}
// state:仓库存储数据的地方
const state ={}
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters ={} */
// 引入小仓库
import home from './home/index'
import search from './search/index'
import detail from './detail/detail'
import cartList from './cartList/cartList'
import user from './user'
import trade from './trade/trade'

export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        cartList,
        user,
        trade,
    }
})