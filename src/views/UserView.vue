<template>
    <div>我是用户页面</div>
    <button @click="escUser">退出登录</button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

function escUser() {
    localStorage.token = '';
    router.replace({ name: 'home' });
}
</script>

<style lang="scss" scoped></style>