<!-- 瀑布流 -->
<template>
    <div class="waterfallFlow">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->


            <div class="item" v-for="(item, index) in getHomeC" :key="index"
                @click="liveBroadcastPage(item.itemId, item.actorId)">
                <div class="picture">
                    <img class="bigPic" :src="item.itemImage" alt="">
                    <div class="liveBroadcastAtTheSamePrice">
                        <img :src="item.lefttop_taglist[0]?.img" alt="">
                    </div>
                    <!-- 头像 -->
                    <div class="headImage">
                        <img :src="item.actorAvatar" alt="">
                        <span>{{ item.actorName }}</span>
                    </div>
                    <!-- 播放 -->
                    <div class="Play">
                        <img src="../assets/images/Play.png" alt="">
                    </div>
                </div>
                <p class="title">{{ item.title }}</p>
                <!-- 价格 -->
                <div class="price">
                    <div class="livePrice">
                        <div>
                            ￥<span>{{ Math.floor(item.showDiscountPrice) }}</span>
                            <span v-if="Math.floor(
                                (item.showDiscountPrice - Math.floor(item.showDiscountPrice)) * 10
                            )">.{{ Math.floor(
    (item.showDiscountPrice - Math.floor(item.showDiscountPrice)) * 10
) }}
                                <span class="decimalTwo"
                                    v-if="Math.floor((item.showDiscountPrice - Math.floor(item.showDiscountPrice * 10) / 10) * 100)">
                                    {{ Math.floor((item.showDiscountPrice - Math.floor(item.showDiscountPrice * 10) /
                                        10) * 100) }}
                                </span>
                            </span>
                        </div>
                        <img :src="item.bottomIcon" alt="">
                    </div>
                    <div class="sale">{{ item.sale }}</div>
                </div>
            </div>
        </van-list>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { getHomeContent } from '../apic/homes'
import { type getHomeC } from '../typings'
import { ref } from 'vue';
const router = useRouter();

// const list = ref([]);
const getHomeC = ref<Array<getHomeC>>([])
const loading = ref(false);
const finished = ref(false);
// const count = ref(Math.random() * 2000)

const props = defineProps(['getHomeC'])
function liveBroadcastPage(itemId: string, actorId: string) {
    router.push({
        name: 'livePlayback',
        query: {
            itemId: itemId,
            actorId: actorId
        }
    })
}
const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(async () => {
        // count.value++;
        let HomeContentData: any = await getHomeContent();//第二页数据
        getHomeC.value.push(HomeContentData.data.list);
        // 加载状态结束
        loading.value = false;
        // 数据全部加载完成
        finished.value = true;

    }, 1000);
};

</script>

<style lang="scss">
// 瀑布流内容
.waterfallFlow {
    margin: 10px;
    column-count: 2;
    column-gap: 10px;

    .item {
        margin-bottom: 10px;
    }

    .picture {
        position: relative;
    }

    .bigPic {
        width: 100%;
        height: 100%;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }

    // 播放
    .Play {
        position: absolute;
        right: 5px;
        top: 2px;
    }

    .Play img {
        width: 25px;
    }

    // 头像部分
    .headImage {
        position: absolute;
        left: 10px;
        bottom: 10px;
        color: white;
        display: flex;
        align-items: center;
        font-size: 10px;

        img {
            width: 13%;
            height: 13%;
            border-radius: 50%;
            margin-right: 5px;
            border: 1px solid #fff;
        }
    }

    // 直播同价
    .liveBroadcastAtTheSamePrice {
        position: absolute;
        top: 0;
        left: 0px;

        img {
            width: 40px;
        }
    }

    // 商品标题
    .title {
        width: 100%;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        overflow: hidden;
        font-size: 12px;
        margin: 5px;
        line-height: 1.2;
    }

    //价格
    .price {
        display: flex;
        justify-content: space-between;
        padding: 3px 5px 5px;
        color: #ff4668;
        font-size: 12px;

        .livePrice {
            display: flex;
            align-items: center;
            font-weight: 600;
        }

        .livePrice div>span:nth-child(1) {
            font-size: 14px;
            margin-left: -2px;
        }

        img {
            width: 20px;
            height: 12px;
            margin-left: 3px;
            margin-bottom: 1px;
        }

        .sale {
            font-size: 10px;
            padding: 3px 6px;
            background-color: #ffecef;
            border-radius: 10px;
            text-align: center;
        }

        .decimalTwo {
            margin-left: -1px;
        }
    }
}
</style>