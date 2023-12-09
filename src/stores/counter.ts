import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// 引入stores的配置
import type { userLocationItem } from './stores-typings'

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
  }
  return { accountName, changeaccountName }
}, { persist: true })

// 获取用户定位
export const useUserGeolocationStore = defineStore('userGeolocation', () => {

  const userLocation = ref<userLocationItem>();
  const locationShow = ref(false)
  function getUserGeolocation(curLocation: userLocationItem) {
    userLocation.value = curLocation;
  }
  function changeLocationShow(show: boolean) {
    locationShow.value = show
  }
  return { userLocation, locationShow, getUserGeolocation, changeLocationShow }
}, { persist: true })
