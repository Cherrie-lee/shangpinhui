import {reqGetSearchInfo} from '@/api'
const state ={
    searchList:{},
}
const actions ={
    // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
    // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    async getSearchList({commit},params={}){
        let res =await reqGetSearchInfo(params);
        if(res.code === 200){
           commit('GETSEARCHLIST',res.data); 
        }
    }
}
const mutations ={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList;
    }
}
// 计算属性：在项目当中，为了简化数据
// 项目中getters主要的作用是：简化仓库中的数据（简化数组而生）
// 可以把我们将来在组件中需要用到的数据简化一下【将来组件在获取数据的时候就方便了】
const getters ={
    // state是当前仓库中的state
    goodsList(state){
        // 这样有问题  假如网络不给力，返回的是undefined，所以需要加一个空数组以防万一
        return state.searchList.goodsList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}