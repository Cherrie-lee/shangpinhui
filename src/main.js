import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router/index'

// 注册全局组件
import TypeNav from '@/components/TypeNav/TypeNav'
import Carousel from '@/components/Carousel/Carousel'
import Pagination from '@/components/Pagination/Pagination'
import {Button,MessageBox} from 'element-ui'
// 第一个参数：全局组件的名字  第二个参数：那一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
// ELementUI注册组件的时候，还有一种写法：挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false
// 测试
import {reqCategoryList} from '@/api';
reqCategoryList();

// 引入store
import store from '@/store';
// 引入mockServe.js——mock数据
import '@/mock/mockServe';
// 引入swiper样式
import 'swiper/css/swiper.css';
// 统一接收api文件夹里面全部请求函数 
// 统一引入
import * as API from '@/api';
import huahua from '@/assets/huahua.png'
// 引入插件
import VueLazyload from 'vue-lazyload';
// 注册插件
Vue.use(VueLazyload,{
    // 懒加载默认图片
    loading:huahua,
})
// 引入校验插件
import "@/plugins/validate"
new Vue({
    render: h => h(App),
    // 注册路由：底下的写法KV一致省略v
    router,
    store,
    // 全局事件总线的设置
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API=API;
    },
}).$mount('#app')