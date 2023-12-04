<template>
    <div class="shopping-List">

        <div class="shoping-list-top">
            <span>
                <van-icon name="arrow-left" />
            </span>
            <p>{{ router.currentRoute.value.query.keyWord }}</p>
        </div>
        <van-tabs v-model:active="active" @click-tab="onClickTab">
            <van-tab :title="item.title" :key="item.sortKey" v-for="item in titleList"></van-tab>

            <van-tab title="价格" v-if="priceList.length">
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

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue"
import { useRouter } from "vue-router";
import { getKeywordSearch } from "../apic/search"
import { type sortFilterList, type priceFilterList, type wallDocsList, type leftbottomTagList } from "../typings"

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
    console.log(titleList.value);
    console.log(wallList.value);
    console.log(data.priceFilter);
})

</script>

<style lang="scss" scoped>
.shopping-List {
    width: 100vw;
    background-color: #EFEFEF;
}
</style>