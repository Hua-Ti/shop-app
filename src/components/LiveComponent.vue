<template>
    <div class="allBox">
        <div class="user-about">
            <van-image width="30" height="30" :round="true" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
            <div class="user-name">苗乐乐</div>
        </div>
        <div class="show-goods-box">
            <div class="goods-box">
                <div class="living-count">
                    <div class="living-text">
                        <span class="point"></span>
                        <p>直播中</p>
                    </div>
                    <div class="living-much">
                        <van-icon name="fire-o" />
                        <p>2.2w</p>
                    </div>
                </div>
                <div class="introduction">
                    <p>体验捡漏,速拼减肥塑形</p>
                </div>
                <div class="goods-content">
                    <div class="goods-item">
                        <van-image width="50" height="50" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                    </div>
                    <div class="price">¥69.9</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { } from 'vue';

// 获取参数值
const props = defineProps({});

</script>

<style lang="scss" scoped>
.user-about {}

.show-goods-box {}

.goods-box {}

.living-count {}

.introduction {}

.goods-content {}
</style>