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

// 收藏
export const collection = defineStore('sc', () => {
    // 点击的收藏？数据
    let collectionData = ref();
    const collItem = localStorage.collectionData
    if (collItem != undefined && collItem !=null) {
        collectionData=JSON.parse(collItem)
    }
    // 收藏的数据
    let collectionDataList = ref([])
    const collItemList = localStorage.collectionDataList
    if (collItemList != undefined && collItemList !=null) {
        collectionDataList.value=JSON.parse(collItemList)
    }

    // 点击数据的替换
    const repalceData = (item: object) => {
        console.log('数据', item)
        collectionData.value = item;
        localStorage.collectionData = JSON.stringify(collectionData.value);
    }
    
    const addList = (item: object) => {
        collectionDataList.value.push(item)
        localStorage.collectionDataList = JSON.stringify(collectionDataList.value)
    }
    const remove = (itemId: object) => {
        collectionDataList.value.map((dataList: any, index: number) => {
            if (itemId == dataList.id) {
                collectionDataList.value.splice(index, 1)
            }
        });
        localStorage.collectionDataList = JSON.stringify(collectionDataList.value)
    }

    return { collectionData,collectionDataList, repalceData, addList, remove }
})
// 收藏
export const collectionProduct = defineStore('sc', () => {
    // 点击的收藏？数据
    const collItem = localStorage.collectionData
    if (collItem != undefined && collItem !=null) {
        collectionData=JSON.parse(collItem)
    }
    // 收藏的数据
    let collectionDataList = ref([])
    const collItemList = localStorage.collectionDataList
    if (collItemList != undefined && collItemList !=null) {
        collectionDataList.value=JSON.parse(collItemList)
    }

    // 点击数据的替换
    const repalceData = (item: object) => {
        console.log('数据', item)
        collectionData.value = item;
        localStorage.collectionData = JSON.stringify(collectionData.value);
    }
    
    const addList = (item: object) => {
        collectionDataList.value.push(item)
        localStorage.collectionDataList = JSON.stringify(collectionDataList.value)
    }
    const remove = (itemId: object) => {
        collectionDataList.value.map((dataList: any, index: number) => {
            if (itemId == dataList.id) {
                collectionDataList.value.splice(index, 1)
            }
        });
        localStorage.collectionDataList = JSON.stringify(collectionDataList.value)
    }

    return { collectionData,collectionDataList, repalceData, addList, remove }
})
