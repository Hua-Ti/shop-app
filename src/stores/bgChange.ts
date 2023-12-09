import { defineStore } from 'pinia'
import { ref } from 'vue'

// 首页正在流行页面 head 背景颜色
export const useBgColor = defineStore('bg', () => {
    const bgColorIndex = ref(0);
    const changeColor = (index: number) => {
        bgColorIndex.value = index
    }
    return { bgColorIndex, changeColor }
})

// 点击关注
export const useAttention = defineStore('gz', () => {
    const attention = ref([]);
    // 取出本地关注数据
    let attentionItem = localStorage.attention
    if (attentionItem != undefined && attentionItem != null) {
        attention.value = JSON.parse(attentionItem);
    }

    const addAttention = (item: object) => {
        attention.value.push(item);
        localStorage.attention = JSON.stringify(attention.value)
    }
    const removeAttention = (item: object) => {
        attention.value.map((dataList: any, index: number) => {
            if (item == dataList.actUserId) {
                attention.value.splice(index, 1)
            }
        });
        localStorage.attention = JSON.stringify(attention.value)
    }

    return { attention, addAttention, removeAttention }
})
