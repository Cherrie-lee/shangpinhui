<template>
  <div class="swiper-container" id="floor2Swiper"  ref="floorCarsouel">
      <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
              <img :src="carousel.imgUrl">
          </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name:'Carousel',
    props:['list'],
    watch: {
    list:{
        immediate:true,
        handler(newValue,oldValue){
            this.$nextTick(()=>{
                // 执行这个函数，服务器数据回来了，v-for执行完毕，结构有了
                 var mySwiper = new Swiper(this.$refs.floorCarsouel,{
                   loop:true,
                   pagination:{
                       el:'.swiper-pagination',
                       clickable:true,
                   },
                   // 如果需要前进后退按钮
                   navigation:{
                       nextEl:'.swiper-button-next',
                       prevEl:'.swiper-button-prev',
                   }
                }) 
            })
        }
    }
},
}
</script>

<style>

</style>