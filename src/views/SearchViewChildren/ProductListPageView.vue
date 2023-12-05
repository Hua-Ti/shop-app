<template>
    <div class="shopping-List">

        <div class="shoping-list-top">
            <span @click="$router.go(-1)">
                <van-icon name="arrow-left" />
            </span>
            <input type="text" :placeholder="keyWord" class="input">
        </div>
        <van-tabs color="#ff3f78" v-model:active="active" @click-tab="onClickTab" class="tabber-nav">
            <van-tab :title="item.title" :key="item.sortKey" v-for="item in titleList"></van-tab>

            <van-tab title="价格" v-if="titleList.length">
                <van-popup v-model:show="show" round style="width: 100%; height: 50%; padding: 10px;">
                    <div class="price">
                        <span v-for="item in priceList" key="item">{{ item.min }}-{{ item.max }}</span>
                    </div>
                    <div>
                        <span>区间(元)</span>
                        <input type="number">-
                        <input type="number">
                        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)">
                            确认
                        </van-button>
                    </div>
                </van-popup>
            </van-tab>
        </van-tabs>

        <div v-if="wallList.length" class="shopping-details">
            <div v-for="item in wallList" :key="item.tradeItemId">
                <shopping-view :tradeItemId="item.tradeItemId" :img="item.img" :title="item.title"
                    :leftbottom_taglist="item.leftbottom_taglist" :cfav="item.cfav" :price="item.price" />
            </div>
        </div>
        <div v-else>
            <div class="noshopping">
                <img src="../assets/images/noShopping.png">
                <p>没有相关的商品结果哦 ~~</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue"
import { useRouter } from "vue-router";
import { getKeywordSearch } from "../../apic/search"
import { type sortFilterList, type priceFilterList, type wallDocsList } from "../../typings"
import ShoppingView from "../../components/Shopping.vue"

const router = useRouter();
const active = ref(0);
const show = ref(false);
const onClickTab = () => {
    show.value = true;
}

let titleList = ref<Array<sortFilterList>>([]);
let priceList = ref<Array<priceFilterList>>([]);
let wallList = ref<Array<wallDocsList>>([]);

let option = reactive({
    q: "",
    sort: "pop",
    page: 1,
    minPrice: 0,
    maxPrice: 100,
});


let keyWord = ref("");
onMounted(async () => {
    keyWord.value = router.currentRoute.value.query.keyWord as string;

    option.q = keyWord.value;
    let data = await getKeywordSearch(option);
    titleList.value = data.sortFilter;
    priceList.value = data.priceFilter;
    wallList.value = data.wall.docs;
})

</script>

<style lang="scss" scoped>
.shopping-List {
    width: 100vw;
    position: relative;
    background-color: #EFEFEF;
    padding-top: 100px;
    z-index: 15;


    .shopping-details {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .keyword {
        color: #ff3f78;
    }

    .tabber-nav {
        position: fixed;
        width: 100vw;
        top: 49px;
        border-bottom: 1px solid #ccc;
        background-color: #fff;
        z-index: 10;
    }

    .shoping-list-top {
        width: 100vw;
        display: flex;
        align-items: center;
        position: fixed;
        top: 0;
        height: 50px;
        font-size: 13px;
        background: linear-gradient(180deg, rgba(255, 69, 105, 1) 34%, rgba(255, 255, 255, 1) 100%);
        z-index: 10;

        input {
            display: inline-block;
            width: 250px;
            height: 28px;
            border: none;
            border-radius: 999px;
            padding-left: 15px;
            font-size: 12px;
        }

        span {
            font-size: 15px;
            margin-left: 10px;
            margin-right: 20px;
            transform: translateY(-1px);
            color: #fff;
            font-weight: bold;
        }
    }
    .noshopping{
        width: 100vw;
        height: 87.7vh;
        text-align: center;
        padding-top: 50px;
        img{
            width: 150px;
        }
        p{
            font-size: 16px;
            margin-top: 15px;
            color: #888;
        }
    }
}
</style>