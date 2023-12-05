<template>
    <div class="address-management">
        <div class="page-top">
            <van-nav-bar :title="`地址管理`">
                <template #left>
                    <van-icon name="arrow-left" size="18" color="gray" @click="router.go(-1)" />
                </template>
            </van-nav-bar>
        </div>
        <div class="page-bottom">
            <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @edit="onEdit"
                :show-add-button="false">
            </van-address-list>

            <div class="bottom">
                <div class="button-box">
                    <van-cell @click="showPopup">
                        <van-button color="linear-gradient(to right, #d3ce62, #ff4689)" block>新增地址</van-button>
                    </van-cell>
                    <van-popup v-model:show="show" closeable close-icon="close" position="bottom" :overlay="false"
                        :style="{ height: '95%' }">
                        <div class="address-bianji">
                            <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result
                                :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']"
                                @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" />
                        </div>
                    </van-popup>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { showToast } from 'vant';
import { areaList } from '@vant/area-data';
const router = useRouter();
const chosenAddressId = ref('1');
const show = ref(false);
const showPopup = () => {
    show.value = true;
};
const list = [
    {
        id: '1',
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
    },
    {
        id: '2',
        name: '李四',
        tel: '1310000000',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
    },
];
const searchResult = ref([]);

const onSave = () => showToast('save');
const onDelete = () => showToast('delete');
// interface searchResult {
//     name: string,
//     address: string
// }
const onChangeDetail = (val: any) => {
    if (val) {
        searchResult.value = [
            // {
            //     name: '黄龙万科中心',
            //     address: '杭州市西湖区',
            // },
        ];
    } else {
        searchResult.value = [];
    }
};
const onEdit = (item: any, index: any) => showToast('编辑地址:' + index);
</script>
<style lang="scss" scoped>
.address-management {
    background-color: #f7f8fa;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 13;
}

.bottom {
    background-color: white;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;

    .button-box {
        width: 94vw;
        margin: 10px auto;


    }
}

.address-bianji {
    margin-top: 1%;
}
</style>