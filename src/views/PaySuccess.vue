<template>
    <div>支付后跳转页面</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import qs from 'qs'
// 1 引入useRoute路由信息方法
import { useRoute } from 'vue-router'
// 2 获取实例
const route = useRoute()

const created = function(){
    let data = {
        out_trade_no:route.query.out_trade_no,
        trade_no:route.query.trade_no
    }
    console.log(route.query);
    axios({
        url: 'http://localhost:3000/api/queryOrder',
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data)
    }).then((res: any) => {
        console.log('成功',res);
        console.log("666");
    }).catch(err => {
        console.log('错误信息',err);
    })
}
created()
</script>