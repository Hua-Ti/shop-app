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
                            accept="image/png, image/jpeg,data:image/jpeg;base64" :after-read="afterRead" />
                    </div>
                </div>
                <div class="group_item">
                    <p class="item_l">用户id</p>
                    <div class="item_r">{{ userid.accountName }}</div>
                </div>
                <!-- <div class="group_item">
                    <div class="item_l">昵称</div>
                    <div class="item_r" @touchmove="niChen" v-show="nichengshow == false">{{ nicheng ||
                        userid.accountName
                    }}
                    </div>
                    <div><input type="text" v-show="nichengshow == true" autofocus v-model="nicheng" @focus="niChens" />
                    </div>
                </div> -->
                <div class="group_item">
                    <div class="item_l">昵称</div>
                    <div class="item_r" @touchmove="niChen">{{ nicheng ||
                        userid.accountName
                    }}
                    </div>
                    <input type="text" v-show="nichengshow == true" v-model="nicheng" @blur="niChens" />

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
const nicheng = ref('')
const nichengshow = ref(false)
// const src = ref(new URL('../../assets/images/user_touxiang.png', import.meta.url).href)
const src = ref(new URL('../../assets/images/user_touxiang.png', import.meta.url).href)
const fileList = ref([
    { url: src },
]);
const userid = accountNumber()

onMounted(() => {
    console.log('主页的onMounted');
    // src.value = pictureSrc.pictureurl

})
const niChen = (() => {
    nichengshow.value = true

})
const niChens = (() => {
    nichengshow.value = false
})

const afterRead = (file: any) => {
    // 此时可以自行将文件上传至服务器
    console.log(file);
    pictureSrc.changePicture(file.content)
    console.log(pictureSrc.pictureurl);


};

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

// input {
//     background-color: #d1d1d1;
//     border: none;
//     height: 12px;
// }

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