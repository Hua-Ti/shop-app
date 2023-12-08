<template>
    <div class="address-management">
        <div class="page-top">
            <van-nav-bar :title="`地址管理`">
                <template #left>
                    <van-icon name="arrow-left" size="18" color="gray" @click="router.go(-1)" />
                </template>
            </van-nav-bar>
        </div>

        <van-button type="primary" @click="router.push({ name: 'location' })">跳转按钮</van-button>

        <!-- 地址列表 -->


        <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @edit="compile($event)"
            @select="daGou($event)" :show-add-button="false">
        </van-address-list>

        <!-- 增加地址 -->
        <div class="bottom">
            <div class="button-box">
                <van-cell @click="showPopup">
                    <van-button color="linear-gradient(to right, #d3ce62, #ff4689)" block>新增地址</van-button>
                </van-cell>

                <van-popup class="popup-box" v-model:show="show" closeable close-icon-position="top-left" position="bottom"
                    :style="{ height: '70%' }">
                    <div class="address-location" @click="goLocation">
                        <van-icon name="location-o" size="28" />
                    </div>

                    <div class="address-bianji2">
                        <van-cell-group inset class="goLocation-fu">
                            <van-field class="inputclass" v-model="name" placeholder="张三" label="姓名" label-width="4em" />
                        </van-cell-group>

                        <van-cell-group inset class="goLocation-fu">
                            <van-field class="inputclass" placeholder="180xxxxyyyy" v-model="tel" type="tel" label="电话"
                                label-width="4em" />
                        </van-cell-group>

                        <van-cell-group inset class="goLocation-fu">
                            <van-field class="inputclass" v-model="diqu" label="地区" label-width="4em"
                                placeholder="浙江省杭州市西湖区" />
                            <div class="goLocation" @click="goLocation">
                                <van-icon name="location-o" size="30" />
                            </div>
                        </van-cell-group>

                        <van-cell-group inset class="goLocation-fu">
                            <van-field class="inputclass" placeholder="景湖街道新华路xxx号" v-model="address" type="text"
                                label="详细地址" label-width="4em" />
                        </van-cell-group>

                        <van-cell class="moren" center title="设为默认收获地址">
                            <template #right-icon>
                                <van-switch v-model="checked" active-color="#ee0a24" inactive-color="#dcdee0"
                                    @change="Changeadd" />
                            </template>
                        </van-cell>
                        <van-button class="moren" type="primary" @click="addSave" block
                            color="linear-gradient(to right, #ff6034, #ee0a24)">保存</van-button>
                    </div>

                    <!-- 方法一 -->
                    <!-- <div class="address-bianji">
                        <van-address-edit :area-list="areaList" v-model:show="show" show-set-default
                            :search-result="searchResult" class="van-cell--clickable"
                            :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
                            :address-info="{
                                name: info!.name,
                                tel: info!.tel,
                                addressDetail: info!.addressDetail,
                                isDefault: info!.isDefault,
                            }">
                        </van-address-edit>
                    </div> -->

                </van-popup>
            </div>

        </div>
    </div>
    <router-view />
</template>

<script setup lang="ts">
import { useRouter, RouterView } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { listProps, showToast } from 'vant';
import { areaList } from '@vant/area-data';
import type { AddressEditInstance } from 'vant';
const router = useRouter();
const chosenAddressId = ref('');
const show = ref(false);

const changevalue = ref(false)
const list = ref([])
const searchResult = ref([]);
const addressEditRef = ref<AddressEditInstance>();
addressEditRef.value?.setAddressDetail('');
const info = ref<Shuju>()

//方法二的数据，没有用
const tel = ref('');
const name = ref('');
const diqu = ref('');
const address = ref('');
const checked = ref(false);
const pattern = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;



const showPopup = () => {
    info.value = [] as any;
    show.value = true;
    tel.value = ''
    name.value = ''
    diqu.value = ''
    address.value = ''
    checked.value = false
}
interface Shuju {
    name: string
    tel: string
    addressDetail: string
    isDefault: boolean
}
onMounted(() => {
    let addressList = localStorage.addressList || `[]`;
    addressList = JSON.parse(addressList);
    list.value = addressList
})
//编辑
const compile = (list: any) => {
    if (list != '[]') {
        show.value = true;

        console.log(list)
        tel.value = list.tel
        name.value = list.name
        diqu.value = list.diqu;
        address.value = list.address;
        checked.value = list.isDefault
        // console.log(chosenAddressId.value)
        // console.log(list)
        // info.value = list;

    }
}

//打勾的默认地址
onMounted(() => {
    let addressList = localStorage.addressList || `[]`;
    addressList = JSON.parse(addressList);
    if (addressList != '[]') {
        console.log('我是第二个onMounted', addressList)
        for (let i = 0; i <= addressList.length; i++) {
            const last = addressList[addressList.length - 1].isDefault;
            if (last) {
                chosenAddressId.value = addressList[addressList.length - 1].id
            }
        }
    }
})

//切换打勾
const daGou = (item: any) => {
    console.log(item.id)
    chosenAddressId.value = item.id
}


const onDelete = (val: any) => {
    console.log(val)
    showToast('delete')
};

const onEdit = (item: any, index: any) => showToast('编辑地址:' + index);
const goLocation = () => {
    showToast('跳到定位')

}

//方法二的方法，没有用
const Changeadd = (value: any) => {
    console.log(value)
    changevalue.value = value
}
const addSave = () => {
    if (name.value && tel.value && address.value && diqu.value != '') {
        let addressList = localStorage.addressList || `[]`;
        addressList = JSON.parse(addressList);

        addressList.push({
            id: new Date().getTime(),
            name: name.value,
            tel: tel.value,
            address: diqu.value + address.value,
            diqu: diqu.value,
            isDefault: changevalue.value,

        });

        console.log(addressList[addressList.length - 1].isDefault)
        for (let i = 0; i < addressList.length; i++) {
            const last = addressList[addressList.length - 1].isDefault;

            if (last) {
                chosenAddressId.value = addressList[addressList.length - 1].id
                for (let j = 0; j < addressList.length - 1; j++) {
                    addressList[j].isDefault = false;
                }
            }
        }

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
        address.value = ''
        diqu.value = ''
        checked.value = false

        // }

    } else {
        showToast('信息没有填完整')
    }

}

//获取输入的数据
const onSave = (val: any) => {
    let addressList = localStorage.addressList || `[]`;
    addressList = JSON.parse(addressList);
    console.log(val)
    addressList.push({
        id: new Date().getTime(),
        name: val.name,
        tel: val.tel,
        address: val.province
            + val.city + val.county + val.addressDetail,
        isDefault: val.isDefault,
        addressDetail: val.addressDetail,
        province: val.province,
        city: val.city,
        county: val.county
    });
    list.value = addressList
    localStorage.addressList = JSON.stringify(addressList);
    val = ''

    console.log(addressList)
    showToast({
        message: '添加成功',
        icon: 'success',
    });
}

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
        position: relative;

        .address-location {
            background-color: rgb(255, 255, 255);
            position: absolute;
            width: 12vw;
            height: 5vh;
            line-height: 6vh;
            top: 1%;
            text-align: center;
            right: 2%;
            color: #aeaeae;
        }
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

.moren {
    width: 91vw;
    border-radius: 2%;
    margin: 0 auto;
    margin-top: 2%;

}

.inputclass {
    padding-top: 4%;
    // padding-bottom: 2%;
    height: 6vh;

    background-color: rgb(255, 255, 255);
}

.goLocation-fu {
    position: relative;
    margin-top: 2%;

    // height: 20%;
    // padding-top: 10%;


    .goLocation {
        background-color: rgb(226, 226, 226);
        position: absolute;
        top: 10%;
        right: 10%;
    }
}


.address-bianji {
    margin-top: 15%;

}

//定位

.popup-box {
    // position: relative;


}


.van-cell--clickable {
    background-color: rgb(255, 253, 127);
    position: relative;




}
</style>