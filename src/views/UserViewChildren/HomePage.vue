<template>
    <div class="page-box">
        <div class="page-top">
            <van-nav-bar :title="`个人资料`">
                <template #left>
                    <van-icon name="arrow-left" size="18" color="gray" @click="router.go(-1)" />
                </template>
            </van-nav-bar>
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
import { accountNumber } from '../../stores/counter'
import { getPicture } from '../../stores/picture'
const router = useRouter();
const pictureSrc = getPicture()
const src = ref('')
const fileList = ref([
    { url: '../../../public/user_touxiang.png' || src },
]);
const userid = accountNumber()



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
    // let picture = localStorage.picture || `[]`;
    // // pictureList = JSON.parse(picture);
    // console.log(picture.substring(12, 75))
    // src.value = picture.substring(12, 75)
};
// onMounted(() => {
//     let picture = localStorage.picture || `[]`;
//     // pictureList = JSON.parse(picture);
//     console.log(picture.substring(12, 75))
//     src.value = picture.substring(12, 75)
// })
//返回上一级

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
    // padding: 0px 15px;
    // height: 40px;
    // background-color: white;
    // line-height: 40px;

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