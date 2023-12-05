<template>
    <div class="live-box">
        <div class="handle" v-if="roomData">
            <header class="head-section">
                <div class="focus-actor">
                    <!-- 主播信息 -->
                    <van-image width="35px" height="35px" fit="cover" round :src="roomData.actorInfo.avatar" />

                    <div class="info">
                        <div class="actor-name lh-1">{{ roomData.actorInfo?.uname }}</div>
                        <div class="online-num">热度 {{ roomData.onlineUserCount }}</div>
                    </div>

                    <div class="actor-fans">
                        <div class="focus-btn f-center">关注</div>
                    </div>
                </div>
                <div class="live-tag" v-if="roomData.actorTag">
                    <van-image width="70" height="25" :src="roomData.actorTag.icon" />
                </div>
            </header>


            <div class="footer-mask">
                <!-- 评论区 -->
                <div class="comments">
                    <div class="comments-list">
                        <div class="official-tip">{{ roomData.noticeContent }}</div>
                    </div>
                </div>
            </div>

        </div>


        <div class="videoBox">
            <video ref="videoElement" autoplay style="width: 100vw; height: 100vh; object-fit: fill"></video>
        </div>
    </div>
</template>

<script setup lang="ts">
import flvjs from "flv.js"
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getLiveRoom } from "../../apic/live-data"
const route = useRoute();
const videoElement = ref(null);
const roomData = ref();

const flvPlayer = ref();

onMounted(async () => {
    let roomId = route.query.roomId;
    let actUserId = route.query.actUserId;
    let { data } = await getLiveRoom(roomId, actUserId);
    roomData.value = data;

    createVideo()
    console.log(roomData.value);
})
const createVideo = () => {

    if (flvjs.isSupported()) {
        // var videoElement = document.getElementById('videoElement');
        flvPlayer.value = flvjs.createPlayer({
            type: 'flv',
            url: roomData.value.definitions[0].liveUrl,
            isLive: true,
            hasAudio: true,
        });
        flvPlayer.value.attachMediaElement(videoElement.value);
        flvPlayer.value.load();

        setTimeout(function () {
            flvPlayer.value.play();
        }, 300);

        //处理视频播放错误的语法
        flvPlayer.value.on('error', () => {
            console.log(`视频加载失败，请稍候重试！`);
            return false;
        });

    }
}
</script>

<style scoped>
.live-box {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 999;

    .handle {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 300;
    }

    .head-section {
        position: relative;
        padding-top: 10px;
        padding-left: 5px;
        background-image: linear-gradient(0deg, transparent, rgba(0, 0, 0, .02) 18%, rgba(0, 0, 0, .6));

        .focus-actor {
            background: rgba(0, 0, 0, .2);
            padding: 7px 10px 7px 7.5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 175px;
            border-radius: 999px;
        }
    }

    .info {
        margin-right: 8px;
        color: #fff;
        font-size: 14px;
    }

    .actor-name {
        font-weight: 700;
    }

    .online-num {
        margin-top: 2px;
        font-size: 11px;
    }

    .lh-1 {
        line-height: 1;
    }

    .actor-fans {
        .focus-btn {
            font-size: 12px;
            height: 25px;
            background-image: linear-gradient(133deg, #ff5777, #ff469f);
            color: #fff;
            width: 44px;
            border-radius: 50px;
        }

        .f-center {
            display: flex;
            align-items: center !important;
            justify-content: center !important;
        }
    }

    .live-tag {
        position: absolute;
        top: 15px;
        right: 15px;
    }

    .footer-mask {
        margin-top: 60vh;
        padding-top: 10px;
        background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, .02) 18%, rgba(0, 0, 0, .4));
    }

    /* 评论区 */
    .comments {
        margin-left: 10px;
        width: 275px;
        height: 200px;
        overflow-y: auto;
        line-height: 1.5;
        overflow-scrolling: touch;

        &::-webkit-scrollbar {
            display: none;
        }

        .official-tip {
            margin-bottom: 5px;
            font-size: 10px;
            color: #fff;
        }
    }
}</style>