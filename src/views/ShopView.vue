<template>
    <div class="shopBox">

        <van-nav-bar :title="`购物车${curLength}`">
            <template #left>
                <van-icon name="arrow-left" size="18" color="gray" @click="router.go(-1)" />
            </template>
            <template #right>
                <van-icon name="search" size="18" color="gray" @click="router.replace({ name: 'search' })" />
            </template>
        </van-nav-bar>

        <div class="settlement">
            <van-checkbox v-model="isCheckAll" icon-size="14" checked-color="#ff4569">
                全选
            </van-checkbox>

            <div class="allPrice-box">
                <p class="allPrice">¥0.00</p>
                <button class="allPrice-btn" @click="theSubmit">结算</button>
            </div>
        </div>
        <div>
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { showToast } from 'vant';
import { useRouter, RouterView } from 'vue-router';
const router = useRouter();

let length = ref(0);
const isCheckAll = ref(false);
const checkedBox = ref<Array<string>>([]);

const curLength = computed(() => {
    let res = '';
    if (length.value > 0) {
        res = `(${length.value})`
    }
    return res;
})
// 提交判断
function theSubmit() {
    router.push({ name: 'confirmorder' })
    if (checkedBox.value.length == 0) {
        return showToast('请先选择商品哦~');

    }

}


</script>

<style lang="scss" scoped>
.shopBox {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    z-index: 11;
    background-color: white;
    font-size: 14px;
}

.settlement {
    height: 50px;
    border-top: 1px solid gainsboro;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}

.allPrice-box {
    display: flex;
    align-items: center;

    p {
        font-weight: 700;
        color: var(--subject-color);
        margin-right: 10px;
    }
}

.allPrice-btn {
    color: white;
    background-image: linear-gradient(90deg, #ff4469, #ff468d);
    padding: 5px 15px;
    border-color: transparent;
    border-radius: 999px;
}
</style>