const Home=()=>import('@/pages/Home/Home.vue');
const Login=()=>import('@/pages/Login/index.vue');
const Register=()=>import('@/pages/Register/index.vue');
const Search=()=>import('@/pages/Search/Search.vue');
const Detail= ()=>import('@/pages/Detail/index.vue');
const AddCartSuccess=()=>import('@/pages/AddCartSuccess/index.vue');
const ShopCart=()=>import('@/pages/ShopCart/index.vue');
const Trade=()=>import('@/pages/Trade/index.vue');
const Pay=()=>import('@/pages/Pay/index.vue');
const PaySuccess=()=>import('@/pages/PaySuccess/index.vue');
const Center=()=>import('@/pages/Center/index.vue');
const MyOrder=()=>import('@/pages/Center/myOrder/index.vue');
const GroupOrder=()=>import('@/pages/Center/groupOrder/index.vue');
export default [
    {
        path: '/home',
        component: Home,
        // meta为路由元信息，可以自己进行设置
        meta: {
            show: true,
        }
    },
    {
        path: '/login',
        component:Login,
        meta: {
            show: false,
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            show: false,
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component:Search,
        meta: {
            show: true,
        },
        props: route => ({ keyword: route.params.keyword, k: route.query.k })

    },
    {
        name:'detail',
        path: '/detail/:skuId',
        component: Detail,
        meta: {
            show: true,
        }
    },
    {
        name:'addCartSuccess',
        path: '/addCartSuccess',
        component:  AddCartSuccess,
        meta: {
            show: true,
        }
    },
    {
        name:'shopCart',
        path: '/shopCart',
        component:ShopCart,
        meta: {
            show: true,
        },
    },
    {
        name:'trade',
        path: '/trade',
        component:Trade,
        meta: {
            show: true,
        },
        beforeEnter: (to, from, next) => {
           if(from.path=='/shopcart'){
            next();
           }else{
            next(false);
           }
        }
    },
    {
        name:'pay',
        path: '/pay',
        component: Pay,
        meta: {
            show: true,
        },
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
             next();
            }else{
             next(false);  //相当于next(from.path) 从哪来回哪去
            }
         }
    },
    {
        name:'paysuccess',
        path: '/paysuccess',
        component:PaySuccess,
        meta: {
            show: true,
        },
        beforeEnter: (to, from, next) => {
            if(from.path=='/pay'){
             next();
            }else{
                next(false);
            }
         }
    },
    {
        name:'center',
        path: '/center',
        component:Center,
        meta: {
            show: true,
        },
        // 二级路由组件
        children:[
            {
                name:'myorder',
                path:'myorder',
                component:MyOrder,
            },
            {
                name:'grouporder',
                path:'grouporder',
                component:GroupOrder,
            },
            // 重定向
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    // 重定向：在项目跑起来的时候，访问立马让他定向到首页
    {
        path: '*',
        redirect: "/home",
    }
]