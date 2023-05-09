<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局联动组件，不需要再次进行注册 -->
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :floor="floorList[index]"></Floor>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from './ListContainer/ListContainer.vue'
import TodayRecommend from './TodayRecommed/TodayRecommend.vue'
import Rank from './Rank/Rank.vue'
import Like from './Like/Like.vue'
import Floor from './Floor/Floor.vue'
import Brand from './Brand/Brand.vue'
import {mapState} from 'vuex'
export default {
name:'Home',
components:{
  ListContainer,
  TodayRecommend,
  Rank,
  Like,
  Floor,
  Brand,
},
mounted() {
  // 派发action，获取floor组建的数据
    this.$store.dispatch('getFloorList');
},
computed:{
    ...mapState({floorList:state=>state.home.floorList})
}
}
</script>

<style>

</style>