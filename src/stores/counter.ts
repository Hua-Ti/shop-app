import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// pinia数据持久化
/* //作为第三个参数配置
  {
    persist: true
  }
*/

// 创建新的pinia时,命名记得用 use 开头  Store 结尾↓


// 修改路由名字辅助跳转(登录跳转)
export const useRouterNameStore = defineStore('routeFromName', () => {
  const fromName = ref('home');
  function changeFromName(curName: string) {
    fromName.value = curName;
    // console.log(fromName.value)
  }

  return { fromName, changeFromName }
}, { persist: true })

// 获取用户账号(id)
export const accountNumber = defineStore('counter', () => {
  const accountName = ref('');
  function changeaccountName(userid: string) {
    accountName.value = userid;

    // console.log(accountName.value)
  }
  return { accountName, changeaccountName }
}, { persist: true })


export const getPicture = defineStore('counter', () => {
  const picture = '../assets/images/user_touxiang.png'
  function changePicture() {
    // accountName.value = userid;

    // console.log(accountName.value)
  }
  return { picture, changePicture }
})
