<template>
    <article @click="showClickedCity">
        <h3>{{ props.name }} ({{ props.status }})</h3>
        <p>현재 기온: {{ props.temp }}도</p>
        <p v-if="props.temp > 25">{{ '더움' }}</p>
        <p v-else>{{ '선선함' }}</p>
        <button @click.stop="showDetail">상세보기</button>
    </article>
</template>

<script setup>
const props = defineProps({
    name: { type: String, required: true },
    temp: { type: Number, required: true },
    status: { type: String, required: true }
})

function showClickedCity() {
    alert(`${props.name}이 선택되었습니다.`)
}

function showDetail() {
    alert(`${props.name}의 현재 날씨는 [${props.status}] 상태입니다.`)
}
</script>