<template>
    <div class="page-box">
        <div class="page-top">
            <span class="back" @click="goback">&lt;</span>
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
                        <!-- <label>
                            <img src="../../assets/images/user_touxiang.png" alt="">
                            <input @change="useChangnAvatar" style="display: none;" type="file" accept="image/*" multiple>
                        </label> -->
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
        <!-- <div class="page-bottom">
            <div>+新建收获地址</div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
import { accountNumber, getPicture } from '../../stores/counter'
import src from "../../assets/images/user_touxiang.png"
// const src = ref('../../assets/images/user_touxiang.png')
const pictureId = getPicture()
const fileList = ref([
    { url: src },
]);
const userid = accountNumber()

const router = useRouter();

const afterRead = (file: any) => {
    // 此时可以自行将文件上传至服务器
    console.log(file.objectUrl);
    // src = file.objectUrl
};
// let nicheng = ref('')


//返回上一级
function goback() {
    router.go(-1)
}

//改变头像
function useChangnAvatar() {
    console.log('111')
    // console.log(proxy)
    // let file = proxy.files[0]

    // if (/image\/\w+/.test(file.type)) {

    //     console.log('选择的是图片')
    //     var fr = new FileReader()

    //     //将文件读取为DataURL形式
    //     fr.readAsDataURL(file)

    //     //数据读取报错时触发
    //     fr.onerror = function () {
    //         console.log('图片读取失败');
    //     }
    //     fr.onload = function () {
    //         console.log('图片读取成功', fr.result);
    //         src.value = fr.result as string
    //         console.log(src.value)

    //     }
    // }
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