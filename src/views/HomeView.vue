<template>
    <div class="home">
        <div class="head">
            <!-- 搜索 -->
            <div class="search" @click="gotoSearch">
                <van-search v-model="keyWord" readonly show-action placeholder="冬季连衣裙搭配" shape="round" :clearable="false">
                    <template #action>
                        <van-icon @click.stop="gotoShop" name="shopping-cart-o" size="20" />
                    </template>
                </van-search>
            </div>

            <!-- 二级导航 -->
            <div class="head-top">
                <van-tabs v-model:active="active" v-if="homeTwoNav">
                    <van-tab :to="{ name: 'homechild', query: { pid: h.maitKey } }" v-for="(h, index) in homeTwoNav"
                        :key="index" :title="h.title">
                    </van-tab>
                </van-tabs>
            </div>
        </div>


        <router-view />
    </div>
</template>
<script setup lang="ts">

// import { ref, onMounted } from "vue";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// import { useRouter } from "vue-router";

import { getHomeNavigation } from '../apic/homes'
import { type List, type item } from '../typings'
const router = useRouter();
const route = useRoute();
let keyWord = ref('');
// 导航下标数据
const activeIndex: item = {}
// let count = ref(Math.random() * 2000)
const homeTwoNav = ref<Array<List>>([])

let index = ref('');
console.log(route.query.pid);
const active = ref(0)
console.log(333, activeIndex)
console.log('index', index.value)
console.log('高亮下标', active.value)

// 点击跳转相关
//跳购物车页面
function gotoShop() {
    router.push({ name: 'shop' })
}
//跳搜索页面
function gotoSearch() {
    router.push({ name: 'search' })
}


onMounted(async () => {
    //首页导航
    let dataArr = await getHomeModuleRow();
    let dataTime = await gettimeLimitedQuickGrab();
    let dataProg: any = await getTimeProg();
    // let HomeContentData: any = await getHomeContent();//第二页数据

    // console.log('首页导航数据', dataArr)
    // console.log('首页好货数据', dataTime)
    // console.log('首页限时抢数据', dataProg.data.itemList)
    // console.log('首页内容', HomeContentData.data.list)

    homeNav.value = dataArr
    TimeRob.value = dataTime
    timeRobItem.value = dataProg.data.itemList.splice(0, 3)
    // getHomeC.value = HomeContentData.data.list
})


</script>

<style lang="scss">
.home {
    font-size: 16px;

    .head {
        background: rgb(220, 157, 167);
        background: linear-gradient(180deg, rgb(232, 188, 195) 0%, rgba(225, 148, 160, 0.978) 100%);
        color: #fff;
    }

    .head-top {
        width: 96vw;
        // background-color: aqua;
    }

    // 头部搜索
    .van-search,
    .van-tabs__nav {
        background-color: transparent;
        color: #fff;
    }

    .van-tabs--line .van-tabs__wrap {
        margin-left: -10px !important;
    }

    .van-search__field {
        height: 27px !important;
    }

    .van-tabs__nav {
        background: transparent !important;
        margin-left: 5px;
        width: 100%;
    }

    .van-search__action .van-icon {
        color: #f3e9e9;
    }

    .van-tabs__line {
        bottom: 0.5rem !important;
        height: 1.5px;
        width: 20px;
        background-color: white;
    }

    .head-top {
        font-family: 'Courier New', Courier, monospace;
        font-size: 13px;

        .van-tab--active {
            color: white;
            font-size: 15px;

        }

        .van-tab {
            color: rgba(255, 255, 255, .8)
        }

        .van-tabs__nav--line {
            box-sizing: border-box;
        }
    }


}
</style>