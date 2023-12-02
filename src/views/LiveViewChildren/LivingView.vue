<template>
    <div class="livingBox">
        <LivePlaybackOrPlayComponent></LivePlaybackOrPlayComponent>
    </div>
</template>

<script setup lang="ts">
import LivePlaybackOrPlayComponent from '../../components/LivePlaybackOrPlayComponent.vue'
</script>

<style lang="scss" scoped>
.livingBox {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: white;
    z-index: 3;
}
</style>