<template>
  <div>
    <Index></Index>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- <Bottom v-show="$route.path == '/home'||$route.path == '/search'"></Bottom> -->
    <Bottom v-show="$route.meta.show"></Bottom>
  </div>
</template>

<script>
import Index from './components/Header/Index'
import Bottom from './components/Footer/Bottom.vue'
export default {
   name:'App',
   components:{
    Index,
    Bottom,
   },
   mounted(){
    // 通知vuex发请求，获取数据，存储与仓库中
        this.$store.dispatch('categoryList');
        
   }
}
</script>

<style>
</style>