import {reqFindUserAddressList,reqGetTrade} from '@/api/index'

const state={
    address:[],
    orderInfo:{},
}
const mutations={
    FINDUSERADDRESSLIST(state,address){
        state.address=address;
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo;
    }
}
const actions={
    // 获取用户地址信息
    async findUserAddressList({commit}){
        let res = await reqFindUserAddressList();
        if(res==200){
            commit('FINDUSERADDRESSLIST',res.data);
        }
    },
    // 获取订单页面信息
    async getOrderInfo({commit}){
        let res=await reqGetTrade();
        if(res.code==200){
            commit('GETORDERINFO',res.data)
        }
    }
}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters,
}