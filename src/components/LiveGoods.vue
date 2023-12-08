<!-- 直播间商品列表 -->
<template>
    <div class="sell-bag">
        <div class="goods-count">全部商品 {{ goods.length }}</div>
        <div class="goods-item-list-wrap">
            <div class="goods-item flex" v-for="(g, index) in goods" :key="index">
                <div class="goods-img" :style="{ backgroundImage: `url(${g.image})` }">
                    <div class="goods-index">{{ goods.length - index }}</div>
                </div>

                <div class="goods-msg-wrap">
                    <div class="goods-msg">
                        <div class="goods-tag-list">
                            <div class="icon-seckill goods-info-item-m icon-seckill-ing  f-main-center f-cross-center "
                                v-if="g.seckill">秒杀中</div>
                            <div class="icon-seckill goods-info-item-m  f-main-center f-cross-center" v-else>待秒杀</div>
                        </div>
                        <div class="goods-title">{{ g.title }}</div>
                    </div>
                    <!-- {{ g.seckill }} -->
                    <div class="goods-btn-wrap flex f-main-justify">
                        <div class="goods-price-wrap">{{ (g. defaultPrice /100).toFixed(2) }}</div>
                        <div class=""></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
const props = defineProps(["goods"])

onMounted(() => {
    console.log(props.goods);
})
</script>

<style scoped>
.sell-bag {
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-direction: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    position: fixed;
    bottom: 0;
    left: 10px;
    width: 355px;
    height: 430px;
    z-index: 1000;
    border-radius: 4px 4px 0 0;
    background: rgba(0, 0, 0, .55);
    backdrop-filter: blur(7.5px);
    overflow-y: scroll;
}

.goods-count {
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
    padding-left: 12px;
    width: 100%;
    height: 40px;
    font-size: 15px;
    color: #fff;
    line-height: 40px;
}

.goods-item-list-wrap {
    height: 100%;
    overflow: scroll;

    .goods-item {
        padding: 12px;
        width: 100%;
        height: 124px;
        background-color: rgba(0, 0, 0, .5);
        display: flex;

        .goods-img {
            position: relative;
            width: 100px;
            height: 100px;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 3px;
        }

        .goods-index {
            position: absolute;
            top: 0;
            left: 0;
            height: 24px;
            width: 25px;
            line-height: 24px;
            color: #fff;
            background-color: #413a3a;
            border-radius: 0 0 12px 0;
            font-size: 14px;
        }
    }
}

.goods-msg-wrap {
    margin-left: 9px;
    width: 67%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .goods-msg {
        flex-direction: column;
        display: flex;
    }

    .goods-tag-list {
        display: flex;
    }

    .icon-seckill-ing {
        background-image: linear-gradient(136deg, #fb872c, #fc4242) !important;
    }

    .goods-info-item-m {
        margin-bottom: 4px;
        margin-right: 2px;
    }

    .icon-seckill {
        text-align: center;
        width: 38px;
        height: 16px;
        line-height: 16px;
        font-size: 10px;
        color: #fff;
        flex-shrink: 0;
        border-radius: 2px;
        background-image: linear-gradient(90deg, #b2a9ff, #968aff);
    }

    .f-cross-center {
        -webkit-box-align: center;
        align-items: center;
    }

    .f-main-center {
        -webkit-box-pack: center;
        justify-content: center;
    }

    .goods-title {
        margin-top: 3px;
        width: 220px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}</style>