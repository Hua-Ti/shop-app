<template>
    <div @click="router.push({name:'livePlayback'})">我是关注页面</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

</script>

<style lang="scss" scoped></style>