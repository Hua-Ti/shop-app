<template>
    <div @click="router.push({
        name: 'livePlayback', params: {
            itemUrlId: '1n2dne6',
            actorUrlId: '19pb9ua',
            explainId: 3110825,
        }
    })">我是关注页面</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

</script>

<style lang="scss" scoped>
</style>