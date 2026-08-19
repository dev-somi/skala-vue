<template>
    <div>도시 검색</div>
    <input v-model="city" placeholder="검색할 도시 입력">
    <div>검색 중인 도시 : {{ city }}</div>
</template>

<script setup>
import { ref } from 'vue'

const city = ref('')
</script>