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
            <div>

                <div class="dianming-box">
                    <div>
                        <van-icon name="shop-collect-o" color="gray" size="22" />&nbsp;
                        <p>商店的名字</p>
                    </div>
                    <div>
                        <van-icon name="chat-o" color="#ff5375" size="21" />
                        <p>联系商家</p>
                    </div>
                </div>

                <!-- 订单详情 -->
                <div class="order-box">
                    <div class="order-picture">
                        <van-image width="80" height="105" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                    </div>
                    <div class="order-text">
                        <div class="order-texts">
                            <div class="order-texts-one">
                                <p class="one-one">法式复古连衣裙绑带收腰中长裙2020秋季新款喇叭袖梦幻粉裙子</p>
                                <p class="one-two">颜色: 图片色;尺码: L;</p>
                            </div>
                            <div class="order-texts-two">
                                <p class="two-one">￥16228.00
                                </p>
                                <p class="two-two">x1<van-icon name="records-o" size="20" /></p>
                            </div>
                        </div>
                        <p class="ppp">付款后最晚于3日内发货</p>
                    </div>
                </div>

                <div class="other-box">

                    <div class="kuaidi">
                        <p>快递运费<span>全国包邮</span></p>
                        <p>￥0.00</p>
                    </div>

                    <div class="remark">
                        <p>订单备注</p>
                        <div><input type="text" v-model="value" placeholder="有什么想对商家说的可以写在这里哦~"></div>
                    </div>
                    <div class="total">
                        <p class="total-prices">￥176.40</p>&nbsp;
                        <p class="total-dian">店铺合计:</p>&nbsp;
                        <p class="total-shu">共1件</p>
                    </div>


                </div>
            </div>







            <div class="confirm-bottom">
                <van-submit-bar :price="3050" text-align="left" button-text="提交订单" button-color="#ff468a"
                    @submit="onSubmit" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, } from 'vue'
import { useRouter, RouterView } from 'vue-router';
import line from '../../assets/images/shop_line.png'
import { showToast } from 'vant';
import { getAddress } from '../../stores/address'
const addressNeirong = getAddress()
const router = useRouter();

const value = ref('');
const onSubmit = () => {
    if (!addressNeirong.address) {
        showToast('请选择地址');
    } else { showToast('跳到支付'); }
}

</script>

<style lang="scss" scoped>
.confirm-order {
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
        background-color: #fff0f3;
        color: #ff5375;
        margin-top: 3%;
        padding-top: 2%;
        padding-bottom: 2%;
        padding-left: 2%;
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