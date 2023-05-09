// 登录与注册模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqLogout} from '@/api/index'
import {setToken,removeToken} from '@/utils/token'
const state={
    code:"",
    token:localStorage.getItem("TOKEN"),
    userInfo:{}
}
const mutations={
    GETCODE(state,code){
        state.code=code;
    },
    // 用户登录
    USERLOGIN(state,token){
        state.token=token;
    },
    // 获取用户信息
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    // 清楚本地存储
    CLEARUSER(state){
        // 把仓库中相关用户信息清空
        state.token='';
        state.userInfo={};
        // 本地存储清空
        removeToken();
    }
}
const actions={
    // 获取验证码:把验证码返回，但是正常情况，后台把验证码发到用户手机上
    async getCode({commit},phone){
        let res= await reqGetCode(phone);
        if(res.code ==200){
            commit('GETCODE',res.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    }  ,
    // 用户注册
    async userRegister({commit},user){
        let res=await reqUserRegister(user)
        console.log(res);
        if(res.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    // 用户登录
    async userLogin({commit},user){
        let res= await reqUserLogin(user)
        console.log(res);
        // 服务器下发token，用户唯一标识符（uuid）
        // 将来经常通过带token找服务器要用户信息进行展示
        if(res.code==200){
            commit('USERLOGIN',res.data.token);
            // 持久化存储
            setToken(res.data.token);
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let res= await reqGetUserInfo();
        if(res.code==200){
            // 用户已经登陆成功且获取到token
            commit("GETUSERINFO",res.data);
            return 'ok';
        }else{
            return Promise.reject(new Error("fail"));
        }
    },
    // 退出登录
    async Logout({commit}){
        // 只是向服务器发出一次请求，通知服务器清除数据
        let res= await reqLogout();
        // action里面不能进行操作，需要提交mutations进行处理
        if(res.code==200){
            commit('CLEARUSER');
            return 'ok';
        }else{
            return Promise.reject(new Error("fail"));
        }
    }
}
const getters={}
export default {
    state,
    mutations,
    actions,
    getters,
}