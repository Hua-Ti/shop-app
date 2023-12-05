<template>
    <div class="livePlayBack-box" :data-explainId="explainId">
        <!-- <div class="backImg" :style="{ backgroundImage: `url(${firstFrame})` }">
        </div> -->
        <div class="top-nav">
            <div class="author-about" data-authorId="authorId">
                <van-image width="35" height="35" :round="true" :src="authorImg" />
                <div class="author-text">
                    <div class="author-name">
                        {{ authorName }}
                    </div>
                    <div class="author-weight">
                        <p>{{ authorHeight }}cm</p>
                        <p>{{ authorWeight }}kg</p>
                    </div>
                </div>
                <div class="attention">
                    <van-icon name="plus" color="white" size="12" />
                    <p>关注</p>
                </div>
            </div>
            <div class="btns">
                <div class="search">
                    <van-icon name="search" color="#ffffffcb" size="20" @click="router.replace({ name: 'search' })" />
                </div>
                <div class="esc-btn" @click="router.go(-1)">
                    <van-icon name="cross" color="#ffffffcb" size="18" />
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-head">
                <div class="bottom-left">
                    <!-- 插槽 -->
                    <slot name="barrage"></slot>
                </div>
                <div class="bottom-right">
                    <div class="comment" @click="changeShowBtn">
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
            <div class="videoKey" v-if="isBenefitPointList">
                <!-- 插槽 -->
                <slot name="slotVideoKey">
                </slot>
            </div>
            <div class="bottom-foot" :data-goodsId="goodsId">
                <div class="goods">
                    <van-image width="50" height="50" radius="5" :src="goodsImg" />
                    <div class="goods-text">
                        <div class="goods-name">
                            <p>{{ goodsName }}</p>
                            <van-image width="33" height="10" radius="5" :src="goodsLiveImg" v-if="goodsLiveImg" />
                        </div>
                        <div class="goods-price">
                            <p>¥{{ goodsPrice }}</p>
                        </div>
                    </div>
                </div>
                <div class="purchase">
                    立即购买
                </div>
            </div>
            <!-- 插槽 -->
            <slot name="slotPlay">
            </slot>
        </div>

        <!-- 评论区弹出框 -->
        <van-popup v-model:show="showBottom" round position="bottom" :style="{ height: '65%' }" class="mycommentBox">
            <div class="commentTop">
                <div class="top-text">
                    <p class="buy">购买评价<span class="num">{{ commentNumber }}</span></p>
                    <span class="shopMuch">{{ soldCount }}</span>
                </div>
                <div class="comment-author">
                    <div class="comment-author-left">
                        <van-image round width="40" height="40" :src="authorImg" />
                        <div class="comment-author-text">
                            <p>{{ authorName }}</p>
                            <span>主播身高体重:{{ authorHeight }}cm {{ authorWeight }}kg</span>
                            <span class="comment-attention">
                                关注
                            </span>
                        </div>
                    </div>
                    <div class="comment-author-right">
                        <van-icon name="service-o" size="20" style="margin-left: 15px;" />
                        <p>商品客服</p>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="comment-count">
                    <div class="item" v-for="e in commentList" :key="e.userId">
                        <van-image round width="30" height="30" :src="e.avatar" />
                        <div class="customer-text">
                            <div class="customer-about">
                                <p class="name">{{ e.userName }}</p>
                                <van-image class="lvImg" round width="18" height="18"
                                    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                                <span class="back-customer">回头客</span>
                            </div>
                            <p class="customer-comment">
                                {{ e.content }}
                            </p>
                            <div class="imgBox" v-for="(imgSrc, i) in e.images" :key="i">
                                <van-image radius="10" width="100" height="100" :src="imgSrc" />
                            </div>
                            <p class="buy-things">
                                <span class="buy-time">{{ e.time }}</span>
                                <span class="buy-goods">
                                    颜色:AG黑白色2 尺码:均码
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { getPlaybackCommentsItem } from '../typings';
import { useRouter } from 'vue-router';
const router = useRouter();

// 传参内容
const props = defineProps({
    isBenefitPointList: {
        type: Boolean,
    },
    explainId: {
        type: [String, Number],
    },
    authorImg: {
        type: String,
    },
    authorId: {
        type: Number,
    }
    ,
    authorName: {
        type: String,
    },
    authorHeight: {
        type: Number,
    },
    authorWeight: {
        type: Number,
    },
    goodsName: {
        type: String,
    },
    goodsImg: {
        type: String,
    },
    goodsLiveImg: {
        type: String,
    },
    goodsPrice: {
        type: String,
    },
    goodsId: {
        type: [String, Number],
    }
    ,
    commentNumber: {
        type: [Number, String],
    },
    soldCount: {
        type: String
    },
    commentList: {
        type: Array<getPlaybackCommentsItem>
    }
});

onMounted(() => {
    console.log(props.commentList);
})

// 评论区弹出框
let showBottom = ref(false);

function changeShowBtn() {
    showBottom.value = true;
}
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

        p {
            width: 170px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 5px;
        }
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

.videoKey {
    background-color: rgba(0, 0, 0, 0.4);
    width: calc(100vw - 20px);
    height: 35px;
    margin-top: 10px;
    border-radius: 8px;
}

.mycommentBox {
    padding: 10px;
}

.commentTop {
    display: flex;
    flex-flow: column nowrap;
    position: relative;

    .top-text {
        display: flex;
        width: 375px;
        height: 35px;
        line-height: 35px;
        background-color: white;
        border-radius: 999px;
        z-index: 11;
        transform: translateY(-11px) translateX(-10px);
        position: fixed;
    }

    .buy {
        font-weight: 700;
        margin-left: 8px;
    }

    .num {
        font-size: 13px;
        margin-left: 2px;
    }

    .shopMuch {
        font-size: 11px;
        color: gray;
        margin-left: 8px;
        margin-top: 1px;
    }

}

.comment-author {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 35px;
    padding-bottom: 15px;
    border-bottom: 1px solid gainsboro;
}

.comment-author-left {
    display: flex;
    align-items: center;

    .comment-author-text {
        margin-left: 8px;
        font-size: 11px;
        position: relative;

        p {
            margin: 8px 0;
            font-size: 13px;
            font-weight: 700;
        }
    }

    .comment-attention {
        font-size: 11px;
        color: white;
        background-color: var(--subject-color);
        padding: 3px 9px;
        border-radius: 999px;

        position: absolute;
        top: 4px;
        right: 28px;
    }
}

.comment-author-right {
    color: var(--subject-color);
    border-left: 1px solid gainsboro;
    padding-left: 10px;

    p {
        font-size: 12px;
        margin-top: 5px;
    }
}

.customer-comment {
    max-width: 300px;
}

.item {
    margin-top: 20px;
    display: flex;
}

.customer-text {
    margin-left: 10px;
    padding-bottom: 13px;
    border-bottom: 1px solid gainsboro;

    .customer-about {
        display: flex;
        align-items: center;
        margin-bottom: 6px;
    }

    .lvImg {
        margin: 0 5px;
    }

    .back-customer {
        font-size: 11px;
        background-color: #ffdba5;
        color: #b07923;
        padding: 0 5px;
        border-radius: 999px;
    }

    .customer-comment {
        margin-bottom: 6px;
    }

}

.imgBox {
    margin-bottom: 8px;
    width: 300px;
    display: flex;
    justify-content: space-between;
    // background-color: pink;
}

.buy-things {
    font-size: 11px;
    color: rgb(162, 162, 162);
}
</style>