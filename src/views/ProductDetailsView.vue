<template>
    <div class="project-details-box">
        <div class="wrapper" :ref="el => scrollEl = el as HTMLElement">
            <ul :style="{ width: topImagesList.length * 72 + 'vw' }">
                <li v-for="(item, index) in topImagesList" :key="item" @click="showList(index)">
                    <img :src="item">
                </li>
            </ul>
        </div>
        <van-popup v-model:show="show" position="center">
            <div class="wrapper1" :ref="el => scrollEl1 = el as HTMLElement">
                <ul :style="{ width: topImagesList.length * 100 + 'vw' }">
                    <li v-for="item in topImagesList" :key="item">
                        <img :src="item">
                    </li>
                </ul>
            </div>
        </van-popup>
        <van-action-bar class="bottom-bar">
            <van-action-bar-icon icon="shop-o" text="店铺" />
            <van-action-bar-icon icon="cart-o" text="购物车" />
            <van-action-bar-icon icon="star-o" @click="onClickIcon" v-show="flag" text="未收藏" />
            <van-action-bar-icon icon="star" @click="onClickIcon" v-show="!flag" text="已收藏" color="#f46" />
            <van-action-bar-button color="#FFE6E8" class="left-attow" type="warning" text="加入购物车" />
            <van-action-bar-button color="#FF4689" class="right-arrow" type="danger" text="立即购买" />
        </van-action-bar>
    </div>
    <div class="price-box" v-if="price.nowPrice">
        <div class="detailTitle">
            <div class="price-num">
                <span class="price">{{ price.currency }} {{ price.nowPrice }}</span>
                <span class="active" v-if="price.priceTags">{{ price.priceTags[0].text }}</span>
            </div>
            <span>已售{{ price.sales }}</span>
        </div>
        <div class="title">{{ skuInfoList.title }}</div>
        <div class="evaluate">
            <div class="evaluate-title">
                <span class="evaluate-arctial">评价({{ rateInfoV2List.cRate }})</span>
                <p>评分<span class="evaluate-score">{{ rateInfoV2List.cScore }}</span></p>
            </div>
            <div>
                <ul class="evaluate-button">
                    <li v-for="item in rateInfoV2List.rateTags">
                        <span>{{ item.value }}({{ item.num }})</span>
                    </li>
                </ul>
            </div>
            <ul class="evaluation-area">
                <li v-for="item in rateInfoV2List.list" :key="item.content">
                    <div class="evaluation-area-title">
                        <img :src="item.user.avatar">
                        <div>
                            <p class="name">{{ item.user.uname }}</p>
                            <p class="data">{{ formatDate(item.created) }}</p>
                        </div>
                    </div>
                    <p>{{ item.content }}</p>
                </li>
            </ul>
        </div>
        <div class="detailInfo">
            <p class="article-title">{{ detailInfoList.detailImage[0].key }}</p>
            <van-text-ellipsis class="article-text" rows="3" :content="detailInfoList.desc" expand-text="展开"
                collapse-text="收起" />
            <div class="detailImage">
                <img v-for="item in detailInfoList.detailImage[0].list" :src="item">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, reactive } from "vue"
import { useRouter } from "vue-router";
import { getProdectDetails } from "../apic/search";
import BScroll from '@better-scroll/core';

// import {type detailList} from "../typings"


const router = useRouter();
const topImagesList = ref<Array<string>>([]);
const show = ref(false);
let flag = ref(true);
const onClickIcon = () => {
    flag.value = !flag.value;
};

let screenWidth = ref(0);

let id = ref("");

const showList = (index: number) => {
    show.value = true;
    initScroll1(index);
}

let price = reactive({
    priceTags: [{
        text: "",
    }],
    nowPrice: "",
    currency: "",
    sales: "",
});

let skuInfoList = reactive({
    title: "",
})

let detailInfoList = reactive({
    desc: "",
    detailImage: [{
        key: "",
        list: [""],
    }],
})

let rateInfoV2List = reactive({
    list: [{
        user: {
            uname: "",
            avatar: "",
        },
        created: 0,
        content: "",
    }],
    cRate: 0,
    rateTags: [{
        value: "",
        num: 0,
    }],
    cScore: "",
})

// 将时间戳转化为日期的格式
const formatDate = (created: number) => {
    // 由于这里的时间戳是10位，所以要补0，改成13位
    created = Number(created + "000");
    const date = new Date(created);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始，需要加1
    const day = date.getDate();
    return `${year}-${addZero(month)}-${addZero(day)}`
}

// 若当前的数字小于0，则补0
const addZero = (num: number) => {
    return num < 10 ? "0" + num : num;
}
onMounted(async () => {
    id.value = router.currentRoute.value.query.id as string;

    let data = await getProdectDetails(id.value);
    topImagesList.value = data.topImages;
    skuInfoList = data.skuInfo;
    price = data.normalPrice;
    detailInfoList = data.detailInfo;
    rateInfoV2List = data.rateInfoV2;

    // 页面更新渲染完毕,实例化BetterScroll
    nextTick(initScroll);
    screenWidth.value = window.innerWidth;
})



// BScroll 父容器dom元素
const scrollEl = ref<HTMLElement>()
const scrollEl1 = ref<HTMLElement>()

// BS实例对象
const bs = ref<BScroll>();

const initScroll = () => {
    if (!bs.value) {
        bs.value = new BScroll(scrollEl.value!, {
            scrollX: true, // 横向滚动
            scrollY: false,
            click: true, // 内部子元素可以被点击
        })
    }
}

const initScroll1 = (index: number) => {
    nextTick(() => {
        let bs1Value = new BScroll(scrollEl1.value!, {
            scrollX: true, // 横向滚动  
            scrollY: false,
            startX: index * -screenWidth.value,
            momentum: false,
            bounce: false,
        })

        bs1Value.on("scrollStart", () => {
            screenWidth.value = window.innerWidth;
            let direction = bs1Value.movingDirectionX;
            bs1Value.once('scrollEnd', () => {
                if (direction == 1 && index < topImagesList.value.length - 1) {
                    index += 1;
                } else if (direction == -1 && index > 0) {
                    index -= 1;
                }
                bs1Value.scrollTo((index) * -screenWidth.value, 0, 500);
                direction = 0;
            })
        })

    })
}
</script>

<style lang="scss">
.left-attow {
    .van-button__text {
        color: #f46;
    }
}

.price-box {
    font-size: 12px;
    padding: 10px 10px 50px;
    box-sizing: border-box;

    .evaluate-title {
        font-size: 14px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
        border-top: 8px solid #F9F9F9;

        .evaluate-arctial {
            font-size: 16px;
        }

        .evaluate-score {
            color: #f25;
        }
    }

    .evaluate-button {
        display: flex;
        padding: 0 0 15px;
        flex-wrap: wrap;

        li {
            padding: 5px 10px;
            background-color: #eee;
            border-radius: 5px;
            margin-right: 5px;
            margin-bottom: 10px;
        }
    }

    .evaluation-area {
        overflow: auto;
        display: flex;
        white-space: nowrap;

        li {
            display: inline-block;
            // width: 100vw;
            background-color: #FAFAFA;
            padding: 15px;
            margin-right: 15px;
            flex: 1;

            .evaluation-area-title {
                display: flex;
                align-items: center;
                margin-bottom: 10px;

                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                }

                .name {
                    font-size: 14px;
                    font-weight: bolder;
                    margin-bottom: 10px;
                }

                .data {
                    font-size: 10px;
                    color: #aaa;
                }
            }
        }
    }

    .article-title {
        font-size: 16px;
        font-weight: bold;
        padding: 10px 0;
    }

    .article-text {
        padding-bottom: 10px;
    }

    .title {
        margin-top: 10px;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 15px;
    }

    .detailImage {
        width: 100%;

        img {
            width: 100%;
            vertical-align: middle;
        }
    }

    .detailTitle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #666;

        .price-num {
            .price {
                font-size: 20px;
                font-weight: bold;
                color: #000;
                vertical-align: -2px;
                margin-right: 5px;
            }

            .active {
                color: #f25;
                background-color: #FFE8EE;
                padding: 2px;
            }
        }
    }
}

.project-details-box {
    width: 100vw;
    background-color: #F1F1F1;

    .bottom-bar {
        z-index: 11;
    }

    .van-popup--center {
        max-width: none;
    }

    .wrapper1 {
        width: 100vw;
        overflow: hidden;

        ul {
            white-space: nowrap;

            li {
                width: 100vw;
                display: inline-block;

                img {
                    width: 100%;
                    height: 100%;
                    vertical-align: middle;
                }
            }
        }
    }

    .wrapper {
        width: 100vw;
        overflow: hidden;

        ul {
            white-space: nowrap;
            display: flex;
            align-items: center;

            li {
                width: 69vw;
                display: inline-block;
                margin-right: 3vw;
                margin-top: 3vw;

                img {
                    width: 100%;
                    height: 100%;
                    vertical-align: middle;
                }
            }
        }
    }
}</style>