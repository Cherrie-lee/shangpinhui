// 当前这个模块：对API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'
import { get } from 'core-js/core/dict'
// 三级联动接口  http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList  get请求 无参数
export const reqCategoryList = () =>{
    // 发请求：axios发请求返回结果是Promised对象
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get',
    })
}

// 获取banner
export const reqGetBannerList = () =>{
    return mockRequests.get('/banner')
}
// 获取floor数据
export const reqGetFloorList =()=>{
    return mockRequests.get('/floor');
}

// 获取搜索模块数据  地址:/api/list   请求方式post  参数：需要带参数
// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//   }
// 当前这个接口，给服务器传递params参数  至少是一个空对象
export const reqGetSearchInfo = (params) => requests({url:'/list',method:'post',data:params})

// 获取产品详情信息的接口  URL：/api/item/{skuId}
export const reqGetItemInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'})

// 添加到购物车（对已有物品进行数量改动） /api/cart/addToCart/{skuId}/{skuNum}  post
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post',})

// 获取购物车列表   /api/cart/cartList  get
export const reqGetCartList=()=>requests({url:'/cart/cartList',method:'get'})

// 删除购物车商品  /api/cart/deleteCart/{skuId}  请求方式：delete
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 切换商品选中状态  /api/cart/checkCart/{skuID}/{isChecked}  get
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 注册获取验证码接口   /api/user/passport/sendCode/{phone}   get
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 用户注册接口   /api/user/passport/register   method:post
export const reqUserRegister=(data)=> requests({url:'/user/passport/register',method:'post',data})

// 登录接口   /api/user/passport/login   post
export const reqUserLogin=(data)=>requests({
    url:'/user/passport/login',
    method:'post',
    data,
})

// 获取用户信息【需要带用户token】添加了token校验获取用户登录信息，用户登录只保存用户的token
// http://182.92.128.115/api/user/passport/auth/getUserInfo

export const reqGetUserInfo=()=>requests({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
})

// 退出登录  /api/user/passport/logout  GET
export const reqLogout=()=>requests({
    url:'/user/passport/logout',
    method:'get',
})

// 获取用户地址信息   /api/user/userAddress/auth/findUserAddressList   get 
export const reqFindUserAddressList=()=>requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get',
})

// 获取订单交易页信息   /api/order/auth/trade
export const reqGetTrade=()=>requests({
    url:'/order/auth/trade',
    method:'get'
})

// 提交订单   /api/order/auth/submitOrder?tradeNo={tradeNo}   post
export const reqSubmitOrder=(tradeNo,data)=>requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data,
})

// 获取订单支付信息    /api/payment/weixin/createNative/{orderId}   get
export const reqPayInfo=(orderId)=>requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})

// 查询支付订单状态  /api/payment/weixin/queryPayStatus/{orderId}   get
export const reqGetPayStatus=(orderId)=>requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get',
})

// 获取我的订单列表   /api/order/auth/{page}/{limit}   get
export const reqGetMyOrderList=(page,limit)=>requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})