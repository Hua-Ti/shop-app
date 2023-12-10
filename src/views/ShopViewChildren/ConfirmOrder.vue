<template>
    <div class="confirm-order">
        <div class="confirm-top">
            <van-nav-bar :title="`确认订单`">
                <template #left>
                    <van-icon name="arrow-left" size="18" color="gray" @click="router.go(-1)" />
                </template>
                <template #right>
                    <van-icon name="shopping-cart-o" size="20" color="gray" @click="router.replace({ name: 'shop' })" />
                </template>
            </van-nav-bar>
            <van-notice-bar color="#ff5375" background="#ffe6e8" left-icon="info-o">
                温馨提示：请及时跟进订单信息哟！
            </van-notice-bar>
            <div class="address-box" :style="{ backgroundImage: `url(${line})` }">
                <div class="address" @click="router.push({ name: 'addressmanagement' })">
                    <div class="address-one">
                        <van-icon name="location-o" class="location" size="25" color="gray" />
                    </div>
                    <div class="address-two">
                        <p class="custom-title">
                            {{ addressNeirong.name }}{{ addressNeirong.tel }}
                        </p>
                        <p class="custom-span">{{ addressNeirong.address || '点击选择地址' }}</p>
                    </div>
                    <div class="address-three">
                        <van-icon name="arrow" class="location" size="25" color="gray" />
                    </div>
                </div>
            </div>
        </div>

        <!-- 确认提交的内容 -->
        <div class="confirm-center">
            <div class="mainBox" v-for="e in data" :key="e.id">
                <div class="dianming-box">
                    <div>
                        <van-icon name="shop-collect-o" color="gray" size="22" />&nbsp;
                        <p>{{ e.shopName }}</p>
                    </div>
                    <div>
                        <van-icon name="chat-o" color="#ff5375" size="18" />
                        <p style="font-size: 12px;">联系商家</p>
                    </div>
                </div>

                <!-- 订单详情 -->
                <div class="order-box">
                    <div class="order-picture">
                        <van-image width="80" height="105" :src="e.imgSrc" />
                    </div>
                    <div class="order-text">
                        <div class="order-texts">
                            <div class="order-texts-one">
                                <p class="one-one">{{ e.goodsName }}</p>
                                <p class="one-two">颜色: {{ e.style }};尺码: {{ e.size }};</p>
                            </div>
                            <div class="order-texts-two">
                                <p class="two-one">¥{{ Number(e.price) * e.count }}
                                </p>
                                <p class="two-two">x{{ e.count }}</p>
                            </div>
                        </div>
                        <p class="ppp">付款后最晚于3日内发货</p>
                    </div>
                </div>

                <div class="other-box">
                    <div class="kuaidi">
                        <p>快递运费<span>全国包邮</span></p>
                        <p style="color: var(--subject-color);">¥0.00</p>
                    </div>

                    <div class="remark">
                        <p>订单备注</p>
                        <div><input type="text" v-model="value" placeholder="有什么想对商家说的可以写在这里哦~"></div>
                    </div>
                    <!-- <div class="total">
                        <p class="total-prices">¥176.40</p>&nbsp;
                        <p class="total-dian">店铺合计:</p>&nbsp;
                        <p class="total-shu">共1件</p>
                    </div> -->


                </div>
            </div>
            <div class="confirm-bottom">
                <van-submit-bar :price="totalPrices" text-align="left" button-text="提交订单" button-color="#ff468a"
                    @submit="onSubmit" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { shopCarData } from '../../typings'
import { useRouter, RouterView } from 'vue-router';
import line from '../../assets/images/shop_line.png'
import { showToast } from 'vant';
import { getAddress } from '../../stores/address'
const addressNeirong = getAddress()
const router = useRouter();

const data = ref<Array<shopCarData>>([]);

const totalPrices = computed(() => {
    let all = 0;
    for (let i = 0; i < data.value.length; i++) {
        const e = data.value[i];
        all += e.count * Number(e.price) * 100;
    }
    return all;
})

// 获取数据
function getData() {
    data.value = JSON.parse(localStorage.buyData || `[]`)
    console.log(data.value);
}

onMounted(() => {
    getData();
})

const value = ref('');
const onSubmit = () => {
    if (!addressNeirong.address) {
        showToast('请选择地址');
    } else {
        localStorage.buyData = '[]';
        router.replace({ name: 'pay' })
    }
}

</script>

<style lang="scss" scoped>
.confirm-order {
    font-size: 13px;
    background-color: #f6f6f6;
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 12;
}

.address-box {
    padding-top: 2px;
    background-repeat: repeat-x;
    background-size: 10%;
}

.address {
    // line-height: 120%;
    background-color: rgb(255, 255, 255);
    // width: 90vw;
    display: flex;
    justify-content: space-between;

    div {
        // padding: 2%;
        margin-top: 3%;
        margin-bottom: 3%;
    }

}

.address-one {
    background-color: white;
    width: 9vw;
    text-align: right;
}

.address-two {
    background-color: rgb(255, 255, 255);
    width: 82vw;

    p {
        margin-top: 2%;
        padding-left: 1%;
        padding-right: 1%;
    }
}

.custom-span {
    color: rgb(126, 125, 125);
    line-height: 1.1;
}

.address-three {
    background-color: rgb(255, 255, 255);
    width: 9vw;
    text-align: left;
}

.location {
    line-height: 200%;
}

.confirm-center {
    padding-top: 7px;

    .dianming-box {
        background-color: rgb(255, 255, 255);
        display: flex;
        justify-content: space-between;
        padding-left: 3%;
        padding-right: 4%;
        padding-top: 2%;
        padding-bottom: 2%;
        margin: 0 auto;

        div {
            display: flex;
        }

        p {
            display: inline;
            color: gray;
            line-height: 160%;
        }
    }
}

.order-box {
    display: flex;
    background-color: rgb(255, 255, 255);
    padding-left: 3%;
    padding-right: 4%;
    padding-top: 1%;
    padding-bottom: 3%;
    margin: 0 auto;
    border-bottom: 1px solid #dfdfdf;

    .order-text {
        margin-left: 2%;
        margin-top: 1%;

        .order-texts {
            display: flex;
        }
    }

    .ppp {
        display: inline-block;
        background-color: #fff0f3;
        color: #ff5375;
        margin-top: 3%;
        padding: 2%;
        border-radius: 8px;
    }
}

.order-texts-one {
    margin-right: 2%;

    .one-one {
        // font-weight: 600;
        line-height: 1.2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .one-two {
        margin-top: 2%;
        color: gray;
    }
}

.order-texts-two {
    text-align: right;

    .two-one {
        color: var(--subject-color);
        margin-top: 2px;
    }

    .two-two {
        margin-top: 15%;
        color: gray;
    }
}

.other-box {
    background-color: rgb(255, 255, 255);
    padding-left: 3%;
    padding-right: 4%;
    padding-top: 2%;
    padding-bottom: 2%;
    margin: 0 auto;
}

.kuaidi {
    display: flex;
    justify-content: space-between;
    // background-color: antiquewhite;
    padding-top: 3%;
    padding-bottom: 3%;

    p {
        flex-basis: 50%;

        &:nth-child(2) {
            text-align: right;
        }

        span {
            color: gray;
            margin-left: 8%;
        }

    }
}

.remark {
    // background-color: #ff5375;
    display: flex;
    padding-top: 3%;
    padding-bottom: 3%;

    p {
        padding-top: 2.3%;
    }

    div {
        margin-left: 3%;

        input {
            width: 72vw;
            height: 30px;
            padding-left: 3%;
            outline: none;
            border: none;
            border-radius: 6px;
            background-color: #f7f7f7;

        }
    }
}

.total {
    display: flex;
    flex-direction: row-reverse;
    padding-top: 3%;
    padding-bottom: 3%;
    border-top: 1px solid #ecebeb;

    .total-prices {
        color: #ff5375;
        font-size: 17px;
        font-weight: 600;
    }

    .total-shu {
        color: gray;
        padding-top: 1px;
    }

    .total-dian {
        padding-top: 1px;
    }
}
</style>