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
            <!-- 举个例子占位 -->
            、
        </div>



        <div class="confirm-bottom">
            <van-submit-bar :price="3050" text-align="left" button-text="提交订单" button-color="#ff468a" @submit="onSubmit" />
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

    // padding: 1%;
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
</style>