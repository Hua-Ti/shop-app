import {defineStore} from 'pinia'
import {ref} from 'vue'

// 首页正在流行页面 head 背景颜色
export const useBgColor=defineStore('bg',()=>{
    const bgColorIndex=ref(0);
    const changeColor=(index:number)=>{
        bgColorIndex.value=index
    }
    return {bgColorIndex,changeColor}
})