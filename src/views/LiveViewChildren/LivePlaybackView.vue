<template>
    <div class="playBox">
        <video :src="videoUrl" loop :poster="firstFrame" ref="video"></video>
        <LivePlaybackOrPlayComponent>
            <div class="slider">
                <div @click="playVideo">
                    <van-icon name="play" size="20" color="white" class="myPlayBtn" v-show="!isPlay" />
                    <van-icon name="pause" size="20" color="white" class="myPlayBtn" v-show="isPlay" />
                </div>
                <van-slider v-model="sliderValue" class="myslider" active-color="white" inactive-color="#ffffff70">
                    <template #button>
                        <div class="custom-button">
                            <div style="width: 10px;height: 10px;"></div>
                        </div>
                    </template>
                </van-slider>
                <div class="speed">
                    <p>倍速</p>
                </div>
            </div>
        </LivePlaybackOrPlayComponent>
    </div>
</template>

<script setup lang="ts">
import axios from '@/untils/axios';
import type { livePlayBackList } from '../../typings'
import { ref, onMounted } from 'vue';
import LivePlaybackOrPlayComponent from '../../components/LivePlaybackOrPlayComponent.vue';

let sliderValue = ref(0);
const isPlay = ref(false);
const video = ref();

// 获取数据
const firstFrame = ref('');
const videoUrl = ref('');

const getData = async () => {
    console.log('发起请求')
    let { data } = await axios.get<livePlayBackList>(`https://apis.netstart.cn/mogujie/video/item?page=2`)
    firstFrame.value = data.data.list[0].firstFrame;
    videoUrl.value = data.data.list[0].videoUrl;
    console.log(videoUrl.value)
}

onMounted(() => {
    getData();
})


// 视频相关事件
// 点击播放暂停
function playVideo() {
    if (!isPlay) {
        console.log(111);
        // video.value.play();
    } else {
        console.log(222);
        // video.value.pause();
        console.log(video.value);
    }
}


</script>

<style lang="scss" scoped>
.playBox {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: white;
    z-index: 3;
}

video {
    width: 100vw;
    height: 100vh;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    object-fit: cover;
}

.slider {
    height: 40px;
    display: flex;

    .myslider {
        width: 245px;
        transform: translateY(20px) translateX(25px);
    }

    .myPlayBtn {
        transform: translateY(11px) translateX(10px);
    }

    .speed {
        align-self: center;
        color: white;
        background-color: transparent;
        font-size: 12px;
        padding: 2px 8px;
        border: 1px solid white;
        border-radius: 999px;
        transform: translateY(0px) translateX(43px);
    }
}

.custom-button {
    width: 10px;
    color: white;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    background-color: white;
    border-radius: 100px;
}
</style>