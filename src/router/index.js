// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store/index'
// 使用插件
Vue.use(VueRouter);

// 先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace
// location参数：告诉原来的push方法，往哪里跳转（传递哪些参数）
// resolve成功回调
// reject失败回调
// call|apply区别
// 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行传递数组
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this.location,()=>{},()=>{})
    }
}
let router= new VueRouter({
    // 配置路由
    routes,
    // 滚动条
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置 
        return {y:0};
    }
})
// 全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to,from,next)=>{
    // to:获取到要跳转到的路由信息
    // from：获取到从那个路由跳转过来的信息
    // next：next() 放行   next(path) 放行到指定位置
    // 获取仓库中的token---可以确定用户登录了
    let token=store.state.user.token;
    let name=store.state.user.userInfo.name;
    // 用户登录了
    if(token){
        // 已经登录想去登录不可以
        if(to.path=='/login'){
            next('/home');
        }else{
            // 已经登陆，当问的是非登录
            // 如果去的是search、shopcart
            if(name){
                next();
            }else{
                // 再跳转之前获取用户信息
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // token失效
                    await store.dispatch('Logout');
                    next('/login');
                }
            }
        }
    }else{
        // 用户未登录：不能去交易、支付【pay|paysuccess]相关的
        let toPath=to.path;
        if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay')!=-1 ||toPath.indexOf('/center')!=-1 ){ 
            next('/login?redirect='+toPath)
        }else{
            next();
        }
    }
})
export default router;