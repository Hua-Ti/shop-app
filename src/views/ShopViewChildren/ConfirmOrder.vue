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
                <van-cell @click="router.push({ name: 'addressmanagement' })" value="" class="address">
                    <template #icon>
                        <van-icon name="location-o" size="22" class="location" />
                    </template>
                    <template #right-icon>
                        <van-icon name="arrow" class="location" size="20" color="#999" />
                    </template>
                    <template #title>
                        <span class="custom-title">
                            张三 18685994747
                        </span>
                    </template>
                    <template #label>
                        <span class="custom-title">江苏省张家港</span>
                    </template>
                </van-cell>
            </div>
        </div>

        <!-- 确认内容 -->
        <div class="confirm-center">
            <!-- 举个例子占位 -->
            <img style="width: 100vw;" src="../../assets/images/例子.png" alt="">
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
const router = useRouter();
const onSubmit = () => showToast('点击按钮');
</script>

<style lang="scss" scoped>
.confirm-order {
    background-color: #fff5cf;
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

    .address {
        line-height: 120%;
    }
}

.location {
    line-height: 150%;
    margin-right: 1%;
}
</style>