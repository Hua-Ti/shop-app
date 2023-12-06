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
const activeIndex={}
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { getHomeNavigation } from '../apic/homes'
import { type List } from '../typings'
const router = useRouter();
let keyWord = ref('');
// let count = ref(Math.random() * 2000)
const homeTwoNav = ref<Array<List>>([])

const active = router.currentRoute.value.query.pid ? ref(router.currentRoute.value.query.pid) : ref(0)
// const active = ref(0)
console.log(active)
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
    //首页数据
    let homeTwoNavMenu: any = await getHomeNavigation();

    homeTwoNav.value = homeTwoNavMenu.data[117330].list
    let home=homeTwoNav.value
    for(let i=0;i<homeTwoNav.value.length;i++){
        activeIndex.home[i]=i;
    }
    console.log(activeIndex)
    console.log(homeTwoNav)
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
    .van-tabs__line{
        bottom:0.5rem!important;
        height:1.5px;
        width:20px;
        background-color:white;
    }
    .head-top{
        font-family: 'Courier New', Courier, monospace;
        font-size: 13px;
        .van-tab--active{
            color:white;
            font-size: 15px;
            
        }
        .van-tab{
            color:rgba(255,255,255,.8)
        }
        .van-tabs__nav--line {
            box-sizing: border-box;
        }
    }

   
}
</style>