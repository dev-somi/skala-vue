<template>
    <div>
        <span>
            날씨단위: <span>{{ unitLabel }}{{ configStore.unitSymbol }}</span>
        </span>
        <button @click="configStore.toggleUnit">단위변경</button>
    </div>
</template>

<script setup>
import { useConfigStore } from '@/stores/configStore';
import { computed } from 'vue';

const configStore = useConfigStore()
const unitLabel = computed(() => (configStore.unit === 'celsius' ? '섭씨' : '화씨'))
</script>
