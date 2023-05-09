// 引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据格式引入进来【JSON数据格式根本没有对外暴露，但是可以进入】
// webpack默认对外暴露：图片、JSON数据格式
import banner from '@/mock/banners.json'
import floor from '@/mock/floors.json'

// mock数据：第一个参数请求地址  第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner});
Mock.mock("/mock/floor",{code:200,data:floor});