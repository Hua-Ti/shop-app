<template>
    <div>
        <van-search v-model="keyWord" show-action placeholder="冬季连衣裙搭配" shape="round" :clearable="false">
            <template #action>
                <van-icon @click="gotoShop" name="shopping-cart-o" size="20" />
            </template>
        </van-search>
        <div class="main">
            <div class="tab-bar">
                <RouterLink replace :to="{ name: 'hot' }" v-slot="{ navigate, isActive, isExactActive }" custom>
                    <div @click="navigate"
                        :class="['tab-title', isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
                        <span>热门</span>
                    </div>
                </RouterLink>
                <RouterLink replace :to="{ name: 'dressing' }" v-slot="{ navigate, isActive, isExactActive }" custom>
                    <div @click="navigate"
                        :class="['tab-title', isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
                        <span>穿搭</span>
                    </div>
                </RouterLink>
                <RouterLink replace :to="{ name: 'makeup' }" v-slot="{ navigate, isActive, isExactActive }" custom>
                    <div @click="navigate"
                        :class="['tab-title', isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
                        <span>美妆</span>
                    </div>
                </RouterLink>
            </div>
            <!-- tab-bar 结束 -->

            <div>
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterView, useRouter } from "vue-router";
import { } from '../apic/live-data';
import type { } from '../typings';
const router = useRouter();

let keyWord = ref('');
let isActive = 1;

//获取数据

onMounted(() => {
})



// 点击跳转相关
function gotoShop() {
    keyWord.value = '';
    router.push({ name: 'shop' })
}

function gotoChildView(curId: number) {
    if (curId == 1) {
        isActive = 1;
        router.replace({ name: 'hot' })
    } else if (curId == 60) {
        isActive = 60;
        router.replace({ name: 'dressing' })
    } else {
        isActive = 61;
        router.replace({ name: 'makeup' })
    }
}

</script>

<style lang="scss" scoped>
.main {
    padding: 0 10px;
}

.tab-bar {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 10px;

    .tab-title {
        padding: 12px;
        color: #666666;
    }

    .router-link-active {
        color: black;
        font-size: 16px;
        font-weight: 700;
        position: relative;
        margin-top: -3px;

        &::after {
            content: '';
            display: block;
            width: 26px;
            height: 2px;
            background-color: #ff5777;

            position: absolute;
            bottom: 3px;
            left: 14px;
        }
    }

}
</style>