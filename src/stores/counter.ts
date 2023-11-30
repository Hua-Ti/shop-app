import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 创建新的pinia时,命名记得用 use 开头  Store 结尾↓


// 修改路由名字辅助跳转(登录跳转)
export const useRouterNameStore = defineStore('routeFromName', () => {
  const fromName = ref('');
  function changeFromName(curName: string) {
    fromName.value = curName;
    // console.log(fromName.value)
  }

  return { fromName, changeFromName }
})
