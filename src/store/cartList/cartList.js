import {reqGetCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/api/index'

const state={
    cartList:[]
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList;
    }
}
const actions={
    async getCartList({commit}){
        let res = await reqGetCartList();
        if(res.code==200){
            commit('GETCARTLIST',res.data);
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
       let res= await reqDeleteCartById(skuId);
       if(res.code==200){
        return 'ok';
       }else{
        return Promise.reject(new Error('faile'));
       } 
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let res=await reqUpdateCheckedById(skuId,isChecked)
        if(res.code==200){
         return 'ok';
        }else{
         return Promise.reject(new Error('faile'));
        } 
     },
    //  删除选中产品
     deleteAllCheckedCart({dispatch,getters}){
        // context：小仓库，commit【提交mutations修改state】  getters【计算属性】  dispatch【派发action】  state【当前仓库数据】
        // 获取购物车中全部产品 
        console.log(context);
        let PromiseAll=[];
        getters.cartList.cartInfoList.forEach(item=>{
            // if(item.isChecked==1){
            //     dispatch('deleteCartListBySkuId',item.skuId);
            // }
            let promise=item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
            // 将每一次返回的Promise添加到数组当中
            PromiseAll.push(promise);
        });
        // 只要全部的p1|P2..都成功，返回结果则成功
        return Promise.all(PromiseAll);
     },
    //  全选按钮选中所有产品
     updateAllCartChecked({dispatch,getters},isChecked){
        let PromiseAll=[];
        getters.cartList.cartInfoList.forEach(item=>{
            let promise=item.isChecked==isChecked?isChecked:dispatch('updateCheckedById',{skuId:item.skuId,isChecked:isChecked});
            PromiseAll.push(promise)
        })
        // 最终返回结果
        return Promise.all(PromiseAll);
     }
}
const getters={
    cartList(state){
        return state.cartList[0] || {}
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}