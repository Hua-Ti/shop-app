<template>
    <div class="collec-data">
        <van-nav-bar title="我的收藏" right-text="更多商品" @click-right="onClickRight" />
        <div class="head-nav">
            <van-tabs v-model:active="active">
                <van-tab title="收藏视频" replace :to="{ name: 'collection', query: { id: 0 } }">
                    <WaterfallFlowView :getCollList="collectDataList.collectionDataList" />
                    <div class="more">没有更多了~~</div>
                </van-tab>
                <van-tab title="收藏商品" replace :to="{ name: 'collection', query: { id: 1 } }">
                    <div class="aShop">
                        <img src="../assets/images/dianpu.jpg" alt="">
                        <div>你还没有收藏任何商品哦~~</div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { collection } from '../stores/bgChange';
import  WaterfallFlowView from '../components/WaterfallFlowView.vue';


const router = useRouter();
const collectDataList = collection();
// collectDataList.collectionDataList

let active = ref(0);

function onClickRight(){
    console.log(1111)
    router.push({
        name:'homechild'
    })
}


</script>

<style lang="scss">
.collec-data{
    width: 100vw;
    height: 100vh;
  

    .van-nav-bar .van-icon,
    .van-nav-bar__text,
    .van-nav-bar__title {
        color: #222222;
    }

    .van-nav-bar__title {
        font-weight: 570;
        font-size: 18px;
    }

    .van-tabs--line .van-tabs__wrap {
        border-bottom: 1px solid #ccc;
    }



    .head-nav {

        // padding: 0px 40px;
        // font-size: 14px;
        .van-tab--active {
            // color: #f56;
            font-weight: 600;
            font-size: 15px;
        }

        .van-tabs__line {
            bottom: 0.6rem;
            width: 28px;
            height: 2px;
            background-color: #f56;
        }

        .van-tab {
            margin: 20px;
        }

    }

    .atten-item {
        padding: 0 15px;
        box-sizing: border-box;
    }

    .att-item-list {
        display: flex;
        font-size: 14px;
        height: 70px;
        align-items: center;
        border-bottom: 1px solid #e6e4e4;
        justify-content: space-between;

        .image {
            width: 50px;
            height: 50px;
            background-position: center center;
            background-size: contain;
            border-radius: 50%;
            margin-right: 6px;
        }

        .information {
            width: 60%;
        }

        .title {
            font-size: 16px;
            font-weight: 580;
            margin-bottom: 8px;
        }

        .content {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #717171;
        }

        .attentionIsArray {
            width: 68px;
            font-size: 14px;
            color: #888787;
            border: 1px solid #888787;
            padding: 8px 12px;
            margin-left: 10px;
            border-radius: 999px;
        }

    }
    .more{
        font-size: 12px;
        text-align: center;
        margin-top:30px;
    }
    .aShop{
        img{
            width: 300px;
            margin:50px auto;
        }
        text-align: center;
        font-size: 13px;

    }

}

</style>