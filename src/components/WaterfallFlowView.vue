<!-- 瀑布流 -->
<template>
    <div class="waterfallFlow">
        <div class="item" v-for="(item, index) in getHomeC" :key="index">
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
                    <img src="https://s10.mogucdn.com/mlcdn/c45406/190717_0a48k9jegh3a0gg2gfgaf3j24bij0_84x84.png" alt="">
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
    </div>
</template>
<script setup lang="ts">
const props = defineProps(['getHomeC'])

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