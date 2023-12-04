<template>
    <div class="playBox" v-show="isReady">
        <video :src="videoUrl" loop :poster="firstFrame" ref="video" @loadedmetadata="getTotalTime"
            @timeupdate="getCurTime"></video>
        <LivePlaybackOrPlayComponent>
            <div class="slider">
                <div @click="playVideo">
                    <van-icon name="play" size="20" color="white" class="myPlayBtn" v-show="!isPlay" />
                    <van-icon name="pause" size="20" color="white" class="myPlayBtn" v-show="isPlay" />
                </div>
                <van-slider v-model="sliderValue" class="myslider" active-color="white" inactive-color="#ffffff70"
                    @drag-start="dragStart" @drag-end="dragEnd">
                    <template #button>
                        <div class="custom-button">
                            <div style="width: 10px;height: 10px;"></div>
                        </div>
                    </template>
                </van-slider>
                <div class="speed" @click="changePlaySpeed">
                    <p>{{ speedValue }}</p>
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
let speedValue = ref('倍速');
let speedCount = ref(0);
let draging = ref(false);
const isPlay = ref(false);
const video = ref();
let totalTime = ref(0);

// 解决mounted无法解析ref中dom元素的bug
let isReady = ref(true);

// 获取数据
const firstFrame = ref('');
const videoUrl = ref('https://tencentvod.mogucdn.com/vodtranscq1251964405/3270835011844763382/v.f313648.mp4!X3270835011844763382.mp4');

const getData = async () => {
    console.log('发起请求')
    let { data } = await axios.get<livePlayBackList>(`https://apis.netstart.cn/mogujie/video/item?page=2`)
    // firstFrame.value = data.data.list[0].firstFrame;
    // videoUrl.value = data.data.list[0].videoUrl;
    // isReady.value = true;
    // console.log(videoUrl.value)
}

onMounted(() => {
    getData();
    console.log(video.value)
})


// 点击播放暂停
function playVideo() {
    if (!isPlay.value) {
        video.value.play();
        isPlay.value = !isPlay.value;
    } else {
        video.value.pause();
        isPlay.value = !isPlay.value;
    }
}

// 获取视频总时间
function getTotalTime() {
    totalTime.value = video.value.duration;
}

// 获取当前的播放时间
function getCurTime() {
    let nowTime = video.value.currentTime;

    if (draging.value) {
        return
    }

    // 修改进度条
    sliderValue.value = (nowTime * 100 / totalTime.value);
}

// 进度条的拖动相关
// 开始拖拽不触发修改
function dragStart() {
    draging.value = true;
}

// 停止拖拽改变视频播放进度
function dragEnd() {
    video.value.currentTime = sliderValue.value / 100 * video.value.duration;
    draging.value = false;

    // 自动播放
    video.value.play();
    isPlay.value = true;
}

// 修改播放速率
function changePlaySpeed() {
    speedCount.value++;

    if (speedCount.value == 1) {
        speedValue.value = '1.5倍';
        video.value.playbackRate = 1.5;
    } else if (speedCount.value == 2) {
        speedValue.value = '2.0倍';
        video.value.playbackRate = 2;
    } else if (speedCount.value == 3) {
        speedValue.value = '倍速';
        video.value.playbackRate = 1.0;
    }

    // 清零
    speedCount.value > 2 ? speedCount.value = 0 : speedCount.value = speedCount.value;
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
    z-index: 11;
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