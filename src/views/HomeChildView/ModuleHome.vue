<template>
    <!-- 首页二级页面（热门模块） -->
    <!-- 热门 -->
    <div class="moduleHome">
        <div :class="bg">
            <van-nav-bar style="background-color: transparent;color:white;" left-text="返回" left-arrow @click-left="router.go(-1)" />
            <div class="bigImg">
                <img :src="`projectTitle/${route.query.keyword}bg.png`" alt="">
            </div>
            <div>
                <!-- 瀑布流内容 -->
                <WaterfallFlowShree />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {  useRouter,useRoute } from "vue-router";

import WaterfallFlowShree from '@/components/WaterfallFlowShree.vue';
const router=useRouter()
const route=useRoute()
const bg=route.query.keyword;



</script>

<style lang="scss">
.moduleHome {
    // background-color: #5a7a96;
    position: absolute;
    top: 0;
    height: 100vh;
    z-index:2;
    .bigImg img {
        width: 100vw;
        margin-bottom: 6px;
    }
    .van-nav-bar__text,.van-nav-bar .van-icon{
        color:#fff;
    }
    [class*=van-hairline]:after{
        border:none;
    }
    .棒球服{
        background-color: #6888a4;
    }
    .棉服{
        background-color: #b27160;
    }
    .百变潮流裤{
        background-color: #b18f56;
    }
    .宽松卫衣{
        background-color: #5f5657;
    }
    .毛呢大衣{
        background-color: #86a9b1;
    }
    .毛衣{
        background-color: #8aa062;
    }
    .皮草{
        background-color: #be8d77;
    }
    .气质风衣{
        background-color: #af7f68;
    }
    .少女感马甲{
        background-color: #aaa968;
    }
    .小个子精选{
        background-color: #98b0b8;
    }
    .羽绒服{
        background-color: #a897af;
    }
    .针织衫{
        background-color: #a36b67;
    }
}
</style>