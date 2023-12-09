import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const getPicture = defineStore('picture', () => {
    const picture = ref('');
    function changePicture() {
    }
    return { picture, changePicture }
}, { persist: true })