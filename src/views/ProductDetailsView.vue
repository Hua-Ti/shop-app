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
                    <li v-for="(item, index) in topImagesList" :key="item">
                        <img :src="item">
                    </li>
                </ul>
            </div>
        </van-popup>
        <van-action-bar class="bottom-bar">
            <van-action-bar-icon icon="shop-o" text="店铺" />
            <van-action-bar-icon icon="cart-o" text="购物车" />
            <van-action-bar-icon icon="star-o" @click="onClickIcon" v-show="flag" text="未收藏" />
            <van-action-bar-icon icon="star" @click="onClickIcon" v-show="!flag" text="已收藏" color="#ff5000" />
            <van-action-bar-button type="warning" text="加入购物车" />
            <van-action-bar-button type="danger" text="立即购买" />
        </van-action-bar>
    </div>
    <div class="price-box" v-if="price.nowPrice">
        <div class="detailTitle">
            <div class="price-num">
                <span class="price">{{ price.currency }} {{ price.nowPrice }}</span>
                <span class="active" v-if="price.priceTags">{{ price.priceTags[0]?.text }}</span>
            </div>
            <span>已售{{ price.sales }}</span>
        </div>
        <div class="title">{{ skuInfoList.title }}</div>
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
import { collectionProduct } from '../stores/bgChange'

//收藏操作
const collectDataListProduct = collectionProduct();

let id = ref("");
const router = useRouter();
const topImagesList = ref<Array<string>>([]);
console.log(router)


const show = ref(false);
let flag = ref(true);
const onClickIcon = () => {
    if (flag.value) {
        flag.value = false;
        collectDataListProduct.addListProduct(id.value);
    } else if (!flag.value) {
        flag.value = true;
        collectDataListProduct.removeProduct(id.value)
    }
};
// 判断是否收藏
function collec() {
    collectDataListProduct.collectionDataProduct.map((item: any, index: number) => {
        console.log(item)
        if (id.value == item) {
            console.log('相同')
            collectDataListProduct.removeProduct(id)
            flag.value = false;
        }
    })
}

let screenWidth = ref(0);

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
onMounted(async () => {
    console.log('hhh',id)
    console.log('收藏数据',collectDataListProduct.collectionDataProduct);

    
    id.value = router.currentRoute.value.query.id as string;

    let data = await getProdectDetails(id.value);
    topImagesList.value = data.topImages;
    skuInfoList = data.skuInfo;
    price = data.normalPrice;
    detailInfoList = data.detailInfo;

    // 页面更新渲染完毕,实例化BetterScroll
    nextTick(initScroll);
    screenWidth.value = window.innerWidth;
    // 收藏显示
    collec()
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
            console.log("index=", index)
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
.price-box {
    font-size: 12px;
    padding: 10px 10px 50px;
    box-sizing: border-box;

    .article-title {
        font-size: 20px;
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
}
</style>