<template>
    <div class="address-management">
        <div class="page-top">
            <van-nav-bar :title="`地址管理`">
                <template #left>
                    <van-icon name="arrow-left" size="18" color="gray" @click="router.go(-1)" />
                </template>
            </van-nav-bar>
        </div>

        <!-- 地址列表 -->


        <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @edit="onEdit"
            :show-add-button="false">
        </van-address-list>

        <!-- 增加地址 -->
        <div class="bottom">
            <div class="button-box">
                <van-cell @click="showPopup">
                    <van-button color="linear-gradient(to right, #d3ce62, #ff4689)" block>新增地址</van-button>
                </van-cell>

                <van-popup v-model:show="show" closeable close-icon="close" position="bottom" :style="{ height: '70%' }">
                    <!-- <div class="address-bianji2">

                        <van-cell-group inset>

                            <van-field v-model="name" label="姓名" label-width="4em" />

                            <van-field v-model="tel" type="tel" label="电话" label-width="4em" />

                            <van-field v-model="diqu" type="digit" label="地区" label-width="4em" />

                            <van-field v-model="address" type="number" label="详细地址" label-width="4em" />

                        </van-cell-group>

                        <van-cell center title="设为默认收获地址">
                            <template #right-icon>
                                <van-switch v-model="checked" />
                            </template>
                        </van-cell>

                        <van-button round type="success" @click="addSave">保存</van-button>
                    </div> -->
                    <div class="address-bianji">
                        <van-address-edit :area-list="areaList" v-model:show="show" show-set-default
                            :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
                            @delete="onDelete" />
                    </div>
                </van-popup>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { listProps, showToast } from 'vant';
import { areaList } from '@vant/area-data';
const router = useRouter();
const chosenAddressId = ref('1');
const show = ref(false);
const tel = ref('');
const name = ref('');
const diqu = ref('');
const address = ref('');

const checked = ref(true);
const pattern = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
import type { AddressEditInstance } from 'vant';

const addressEditRef = ref<AddressEditInstance>();

addressEditRef.value?.setAddressDetail('');
const showPopup = () => {
    show.value = true;
};
// const list = [
//     {
//         id: '1',
//         name: '张三',
//         tel: '13000000000',
//         address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
//         isDefault: true,

//     },
//     // {
//     //     id: '2',
//     //     name: '李四',
//     //     tel: '1310000000',
//     //     address: '浙江省杭州市拱墅区莫干山路 50 号',

//     // },
// ];
const list = ref([])
const searchResult = ref([]);
onMounted(() => {
    let addressList = localStorage.addressList || `[]`;
    addressList = JSON.parse(addressList);
    list.value = addressList
})

const addSave = () => {
    let addressList = localStorage.addressList || `[]`;
    addressList = JSON.parse(addressList);

    addressList.push({
        id: new Date().getTime(),
        name: name.value,
        tel: tel.value,
        address: address.value,
        // isDefault: val.isDefault
    });
    list.value = addressList
    localStorage.addressList = JSON.stringify(addressList);
    // console.log(val)
    console.log(addressList)
    showToast({
        message: '添加成功',
        icon: 'success',
    });
    name.value = ''
    tel.value = ''
    diqu.value = ''

}
//获取输入的数据
const onSave = (val: any) => {
    let addressList = localStorage.addressList || `[]`;
    addressList = JSON.parse(addressList);

    addressList.push({
        id: new Date().getTime(),
        name: val.name,
        tel: val.tel,
        address: val.province
            + val.city + val.county + val.addressDetail,
        isDefault: val.isDefault
    });
    list.value = addressList
    localStorage.addressList = JSON.stringify(addressList);
    console.log(val)
    console.log(addressList)
    showToast({
        message: '添加成功',
        icon: 'success',
    });
}
const onDelete = (val: any) => {
    console.log(val)
    showToast('delete')
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

.delete-box {
    position: relative;

    .hhh {
        position: absolute;
        top: 50%;
        left: 50%;
        // display: inline;
    }
}


.delete-button {
    height: 100%;
}

.address-bianji2 {
    margin-top: 15%;
    height: 100vh;
    width: 100vw;
    background-color: aquamarine;
}

.address-bianji {
    margin-top: 15%;
}
</style>