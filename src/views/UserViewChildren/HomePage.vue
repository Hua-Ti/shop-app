<template>
    <div class="page-box">
        <div class="page-top">
            <van-icon name="arrow-left" @click="goback" />
            <span class="title">个人资料</span>
        </div>
        <div class="page-bg">
        </div>
        <div class="page-message">
            <div class="base">
                <div class="group_item">
                    <p class="item_l">头像</p>
                    <div class="item_r">
                        <van-uploader v-model="fileList" reupload max-count="1" :deletable="false"
                            :after-read="afterRead" />
                    </div>
                </div>
                <div class="group_item">
                    <p class="item_l">用户id</p>
                    <div class="item_r">{{ userid.accountName }}</div>
                </div>
                <div class="group_item">
                    <div class="item_l">昵称</div>
                    <div class="item_r">{{ userid.accountName }}</div>
                </div>
                <div class="group_item">
                    <p class="item_l">简介</p>
                    <div class="item_r">这家伙很懒，什么都没留下!</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
import { accountNumber, getPicture } from '../../stores/counter'

const pictureSrc = getPicture()
const src = ref('../../../public/user_touxiang.png')
const fileList = ref([
    { url: src.value },
]);
const userid = accountNumber()

const router = useRouter();

const afterRead = (file: any) => {
    // 此时可以自行将文件上传至服务器
    console.log(file.objectUrl);
    let pictureList = localStorage.pictureList || `[]`;
    pictureList = JSON.parse(pictureList);
    pictureList.push({
        pictureid: file.objectUrl
    });
    localStorage.pictureList = JSON.stringify(pictureList);
    pictureSrc.picture = pictureList.slice(-1)[0].pictureid
    src.value = pictureSrc.picture
    console.log(src.value)
};
// onMounted(() => {
//     let pictureList = localStorage.pictureList || `[]`;
//     pictureList = JSON.parse(pictureList);
//     if (pictureList) {
//         pictureSrc.picture = pictureList.slice(-1)[0].pictureSrc
//         src.value = pictureSrc.picture.substring(5)
//     }
// })

//返回上一级
function goback() {
    router.go(-1)
}



</script>

<style lang="scss" scoped>
.page-box {
    background-color: #ffffff;
    position: fixed;
    top: 0px;
    bottom: 0;
    left: 0px;
    right: 0px;
}

.page-top {
    padding: 0px 15px;
    height: 40px;
    background-color: white;
    line-height: 40px;

    .back {
        font-size: 20px;
    }

    .title {
        margin-left: 40%;
        font-weight: 600;
        font-size: 14px;
    }

}

.page-bg {
    height: 150px;
    background: linear-gradient(90deg, #ff777a, #ff4879);
}

.page-message {
    width: 88vw;
    margin: -80px auto;
    border-radius: 5%;
    // background-color: aquamarine;
    height: 300px;

}

.base {
    background: #fefefe;
    display: flex;
    flex-direction: column;
    border-radius: 5%;
    box-shadow: 0px 2px 5px #cac9c9;
    // padding: 3%;



    .group_item {
        margin: 20px;
        padding-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ededed;

        .item_r {
            color: gray;
        }
    }
}


// .page-bottom {
//     background-color: var(--subject-color);
//     width: 88vw;
//     height: 45px;
//     position: fixed;
//     bottom: 30px;
//     left: 6%;
//     border-radius: 999px;
//     text-align: center;
//     line-height: 40px;
//     color: #ffffff;
//     font-size: 14px;

// }
</style>