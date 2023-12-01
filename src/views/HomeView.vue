<template>
    <div class="home">
        <!-- 搜索 -->
        <div class="search" @click="gotoSearch">
            <van-search v-model="keyWord" readonly show-action placeholder="冬季连衣裙搭配" shape="round" :clearable="false">
                <template #action>
                    <van-icon @click.stop="gotoShop" name="shopping-cart-o" size="20" />
                </template>
            </van-search>
        </div>
        <!-- 首页二级模块 -->
        <div class="home-nav">
            <div class="home-nav-tab">
                <van-grid square :column-num="7" icon-size="50px">
                    <van-grid-item class="nav-tab-item" v-for="h in homeNav" :key="h._system_record_entry_id"
                        :icon="h.image" :text="h.title" :sort="h.sort" :link="h.link" :titlecolor="h.titleColor"
                        :h5link="h.h5Link" />
                </van-grid>
            </div>
        </div>
        <!-- 限时快抢模块 -->
        <div class="goodList">
            <!-- 限时快抢 -->
            <div class="timeLimit">
                <p>限时快抢 ></p>
                <div class="timeLimit-item">
                    <div>
                        <img src="" alt="111">
                        <p>￥21.31</p>
                    </div>
                    <div>
                        <img src="" alt="111">
                        <p>￥21.31</p>
                    </div>
                    <div>
                        <img src="" alt="111">
                        <p>￥21.31</p>
                    </div>
                </div>
            </div>
            <!-- 女装尖货榜 -->
            <div class='topGoodsListOfWomen'>
                <p>女装尖货榜 ></p>
                <img src="" alt="222">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getHomeModuleRow, gettimeLimitedQuickGrab } from '../apic/homes'
import { type HomeTopNav, type gettimeRob } from '../typings'
const router = useRouter();
let keyWord = ref('');

const homeNav = ref<Array<HomeTopNav>>([])
const TimeRob = ref<Array<gettimeRob>>([])

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
    let data = await getHomeModuleRow();

    let dataTime = await gettimeLimitedQuickGrab();
    console.log('首页导航数据', data)
    console.log('首页限时抢数据', dataTime)

    homeNav.value = data
    TimeRob.value = dataTime
})


</script>

<style lang="scss" scoped>
.home {
    // 头部搜索
    font-size: 16px;

     .search {
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;
    //     width: 100vw;
    //     height: 45px;
    //     padding: 7.5px 8px;
    //     box-sizing: border-box;
    //     // background-color: rgb(255, 63, 120);
    //     // background-color: #d9919a;
    //     background: rgb(220, 157, 167);
    //     background: linear-gradient(180deg, rgba(220, 157, 167, 1) 0%, rgba(210, 119, 132, 0.9781162464985994) 100%);
    //     color: #fff;

    //     .van-search__field {
    //         align-items: center;
    //     }

    //     .van-search {
    //         padding: 2px 4px;
    //     }

    //     .van-search__field {
    //         padding: 2px 5px;
    //     }

    //     .van-search__content--round {
    //         height: 30px;
    //     }

    //     .search-nav {
    //         width: 80vw;
    //     }

    //     .Sort {
    //         font-size: 20px;
    //     }

    }

    .home-nav {
        // margin-top: 10px;
        overflow: auto;
        width: 100vw;
        // padding: 0 10px;
        height: 182px;
        box-sizing: border-box;

        //隐藏滚动条高度
        &::-webkit-scrollbar {
            height: 0px;
        }

        .home-nav-tab {
            width: 140vw;
        }

        .nav-tab-item {
            margin-top: 10px;
        }
        //去掉导航条边框
        [class*=van-hairline]:after {
            border: none;
        }
    }
    .goodList{
        width: 100vw;
        .timeLimit{
            width: 70vw; 
        }
        .timeLimit-item{
            display: flex;
            justify-content: space-between;
        }
    }

}
</style>