<template>
    <!-- 首页二级页面 -->
    <div class="homeChild">
        <!-- 首页二级模块 -->
        <homeTwoModule :homeNav="homeNav" />

        <!-- 限时快抢模块 -->
        <div class="goodList">
            <!-- 限时快抢 -->
            <div class="timeLimit">
                <p>限时快抢 <span>></span></p>
                <div class="timeLimit-item">
                    <div v-for="(i, index) in timeRobItem" :key="index">
                        <img :src="i.cover" alt="111">
                        <p>￥<span>{{ Math.floor(i.livePrice) }}</span>.31</p>
                    </div>
                </div>
            </div>
            <!-- 女装尖货榜 -->
            <div @click="shoping" class='topGoodsListOfWomen'>
                <p>女装尖货榜 <span>></span></p>
                <img v-if="TimeRob[2]" :src="TimeRob[2]?.backgroundImage">
            </div>
        </div>
        <!-- 瀑布流内容 -->
        <keep-alive>
            <WaterfallFlow />
        </keep-alive>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute,useRouter } from "vue-router";
import WaterfallFlow from '@/components/WaterfallFlowView.vue';
import homeTwoModule from '@/components/homeTwoModule.vue';

import { getHomeModuleRow, gettimeLimitedQuickGrab, getTimeProg, getHomeNavigation } from '../../apic/homes'
import { type List, type HomeTopNav, type gettimeRob, type gettimeRobItem, type HomeNavigation } from '../../typings'
const router = useRouter();
const route=useRoute();
let keyWord = ref('');
// let count = ref(Math.random() * 2000)
const homeTwoNav = ref<Array<List>>([])
const homeNav = ref<Array<HomeTopNav>>([])
const TimeRob = ref<Array<gettimeRob>>([])
const timeRobItem = ref<Array<gettimeRobItem>>([])
const active = ref(0)

// 点击跳转相关
//跳购买页面
function shoping() {
    router.push({ name: 'shop' })
}
const pid = router.currentRoute.value.query.pid
onMounted(async () => {
    console.log('pid', pid)
    //首页数据
    let homeTwoNavMenu: any = await getHomeNavigation();
    let dataArr = await getHomeModuleRow();
    let dataTime = await gettimeLimitedQuickGrab();
    let dataProg: any = await getTimeProg();

    homeTwoNav.value = homeTwoNavMenu.data[117330].list
    homeNav.value = dataArr
    TimeRob.value = dataTime
    timeRobItem.value = dataProg.data?.itemList.splice(0, 3)
    // console.log(homeTwoNav)
})





</script>

<style lang="scss" scoped>
.homeChild {
    padding-top: 10px;
    border-top-right-radius: 14px;
    border-top-left-radius: 14px;
    background-color: white;
    position: relative;
    top: -12px;

    // 限时快抢模块
    .goodList {
        width: 100vw;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        .timeLimit {
            width: 63vw;
            height: 142px;
            background-color: #f7eee2;
            border-radius: 10px;
        }

        .timeLimit>p {
            font-size: 14px;
            font-weight: 800;
            padding: 10px;
        }

        .timeLimit>p>span {
            font-family: '仿宋';
            font-size: 13;
        }

        .timeLimit-item {
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            height: 59%;
        }

        .timeLimit-item img {
            width: 100%;
            height: 100%;
            border-radius: 6px;
        }

        .timeLimit-item>div {
            width: 32%;
            height: 84%;
            background-color: rgb(250, 227, 231);
            border-radius: 10px;
        }

        .timeLimit-item p {
            font-size: 12px;
            text-align: center;
            margin-top: 5px;
            font-weight: 600;
        }

        .timeLimit-item span {
            font-size: 15px;
        }

        .topGoodsListOfWomen {
            width: 30vw;
            height: 142px;
            background-color: #f2d2d4;
            border-radius: 10px;
        }

        .topGoodsListOfWomen p {
            font-size: 16px;
            font-weight: 600;
            margin: 10px;
            font-family: '仿宋';
            margin-top: 15px;
            display: flex;
            align-items: center;
        }

        .topGoodsListOfWomen span {
            font-size: 13px;
            margin-left: 5px;
        }

        .topGoodsListOfWomen img {
            display: inline-block;
            border-radius: 5px;
            width: 90%;
            height: 66%;
            // background-color: rgb(250, 152, 230);
            margin: 0 6px 2px 6px;
        }
    }
}
</style>