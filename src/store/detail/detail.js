import {reqGetItemInfo,reqAddOrUpdateShopCart} from '@/api/index'
// 封装游客身份临时uuid
import {getUUID} from '@/utils/uuid_token'

const state={
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
}
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo;
    },
}
const actions={
    // 获取产品信息的action
   async getGoodInfo({commit},skuId){
       let res= await reqGetItemInfo(skuId);
       if(res.code == 200){
        commit('GETGOODINFO',res.data);
       }
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车返回的解构
        // 加入购物车以后（发请求），前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
        // 因为服务器没有返回其余数据，因此不需要三连环存储数据
        let res=await reqAddOrUpdateShopCart(skuId,skuNum)
        // 代表加入购物车成功
        if(res.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
}
// 简化数组
const getters={
    // 路径导航简化的数据
    categoryView(state){
        // 数据没返回的时候是undefine;
       return state.goodInfo.categoryView||{};
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}