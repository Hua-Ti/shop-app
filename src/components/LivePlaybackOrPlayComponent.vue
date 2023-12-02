<template>
    <div class="livePlayBack-box">
        <!-- <div class="backImg" :style="{ backgroundImage: `url(${firstFrame})` }">
        </div> -->
        <div class="top-nav">
            <div class="author-about">
                <van-image width="35" height="35" :round="true" :src="authorImg" />
                <div class="author-text">
                    <div class="author-name">
                        {{ authorName }}
                    </div>
                    <div class="author-weight">
                        <p>{{ authorHeight }}</p>
                        <p>{{ authorWeight }}</p>
                    </div>
                </div>
                <div class="attention">
                    <van-icon name="plus" color="white" size="12" />
                    <p>关注</p>
                </div>
            </div>
            <div class="btns">
                <div class="search">
                    <van-icon name="search" color="#ffffffcb" size="20" />
                </div>
                <div class="esc-btn" @click="router.go(-1)">
                    <van-icon name="cross" color="#ffffffcb" size="18" />
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-head">
                <div class="bottom-left">
                    我是弹幕模块
                </div>
                <div class="bottom-right">
                    <div class="comment">
                        <van-icon class="myIcon comment-icon" color="white" size="16" name="comment" />
                        <p>买家评论</p>
                        <span class="num">{{ commentNumber }}</span>
                    </div>
                    <div class="collection">
                        <van-icon class="myIcon" color="white" size="16" name="star" />
                        <p>收藏</p>
                    </div>
                </div>
            </div>
            <div class="bottom-foot">
                <div class="goods">
                    <van-image width="50" height="50" radius="5" :src="goodsImg" />
                    <div class="goods-text">
                        <div class="goods-name">
                            {{ goodsName }}
                            <van-image width="33" height="10" radius="5" :src="goodsLiveImg" />
                        </div>
                        <div class="goods-price">
                            <p>{{ goodsPrice }}</p>
                        </div>
                    </div>
                </div>
                <div class="purchase">
                    立即购买
                </div>
            </div>
            <!-- 插槽 -->
            <slot>
                <!-- <div class="slider">
                    <van-icon name="play" size="20" color="white" class="myPlayBtn" v-show="!isPlay" />
                    <van-icon name="pause" size="20" color="white" class="myPlayBtn" v-show="isPlay" />
                    <van-slider v-model="sliderValue" class="myslider" active-color="white" inactive-color="#ffffff70">
                        <template #button>
                            <div class="custom-button">
                                <div style="width: 10px;height: 10px;"></div>
                            </div>
                        </template>
                    </van-slider>
                    <div class="speed">
                        <p>倍速</p>
                    </div>
                </div> -->
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// 传参内容
const props = defineProps({
    authorImg: {
        type: String,
    },
    authorName: {
        type: String,
        default: '小画家style',
    },
    authorHeight: {
        type: String,
        default: '163cm'
    },
    authorWeight: {
        type: String,
        default: '45kg'
    },
    goodsName: {
        type: String,
        default: '2023直筒牛仔裤',
    },
    goodsImg: {
        type: String,
    },
    goodsLiveImg: {
        type: String,
    },
    goodsPrice: {
        type: String,
        default: '¥39.9',
    },
    commentNumber: {
        type: [Number, String],
    }
});

let sliderValue = ref(0);
let isPlay = ref(false);
</script>

<style lang="scss" scoped>
.livePlayBack-box {
    font-size: 14px;
    padding: 0 10px;
    position: relative;

    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;

    // z-index: 999;
    z-index: 2;

}

.top-nav {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.85);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: translateY(25px);

    .btns {
        display: flex;

        .esc-btn {
            margin-left: 10px;
        }
    }
}

.author-about {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    .author-text {
        margin: 0 6px;
    }

    .author-name {
        font-weight: 700;
    }

    .author-weight {
        margin-top: 4px;
        font-size: 10px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.65);
        display: flex;

        p:first-child {
            margin-right: 6px;
        }
    }

    .attention {
        height: 25px;
        display: flex;
        align-items: center;
        padding: 0 8px;
        background-image: linear-gradient(90deg, #f6515c, #f44e7c, #f54690);
        border-radius: 999px;

        p {
            margin-left: 2px;
        }
    }
}

.bottom {
    font-size: 14px;
    padding: 0 10px;
    display: flex;
    flex-flow: column nowrap;
    background-image: linear-gradient(#00000000, #00000030, #00000050, #00000070);

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}

.bottom-head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .myIcon {
        padding: 6px;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 999px;
    }

    .comment-icon {
        margin-left: 11px;
    }

    .bottom-right {
        height: 100px;
        font-size: 12px;
        font-weight: 400;
        color: white;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;

        .comment {
            position: relative;
        }

        .num {
            font-size: 10px;
            padding: 1px 5px;
            border-radius: 999px;
            background-color: white;
            color: red;

            position: absolute;
            right: -2px;
            top: -8px;
        }
    }
}

.bottom-foot {
    height: 60px;
    background-color: rgba(0, 0, 0, 0.4);
    margin: 10px 0;
    padding: 5px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
}

.goods {
    display: flex;
    align-items: center;
}

.goods-text {
    margin-left: 10px;
    height: 50px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;

    .goods-name {
        display: flex;
        flex-flow: column nowrap;
        color: white;
    }

    .goods-price {
        font-weight: 700;
        color: var(--subject-color);
    }
}

.purchase {
    height: 30px;
    line-height: 30px;
    padding: 0 12px;
    color: white;
    border-radius: 999px;
    background-image: linear-gradient(#ff4466, #ff4466);
    transform: translateY(10px) translateX(-10px);
}
</style>