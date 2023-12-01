<template>
    <div class="mona-live-item" v-for="(ld, index) in liveData" :key="index">
        <div class="actor-info">
            <!-- 主播头像 -->
            <van-image round width="45px" height="45px" :src="ld.avatar" />
            <span class="user-name">{{ ld.userName }}</span>
        </div>
        <!-- 商品推荐与评论 -->
        <div class="main" :style="{ background: 'url(' + ld.bgImg + ')' }">
            <div class="live-info-mask">
                <div class="live-info">
                    <div class="dot"></div>
                    <div class="status">直播中</div>
                    <div class="watch-num">{{  }}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

const props = defineProps(["liveData"])

</script>

<style lang="scss">
.mona-live-item {
    padding: 0 10px;
    // margin-bottom: 10px;

    .actor-info {
        display: flex;
        // align-items: center;
        height: 40px;

        .van-image {
            border: 0.04rem solid hsla(0, 0%, 100%, .9);
            transform: translate(20%, 15%);
        }

        .user-name {
            font-size: 14px;
            margin-left: 15px;
            transform: translateY(45%);
        }
    }

    .main {
        background-size: 100% auto !important;
        background-position: 50%;
        background-repeat: no-repeat !important;
        display: flex;
        flex-direction: column;
        height: 195px;
        border-radius: 10px;
        background-color: #efefef;
    }
    .live-info-mask{
        position: relative;
        margin-top: auto;
        padding: 5px 12px;
        background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.4));
        .live-info{
            padding:0 5px;
        }
    }
}
</style>