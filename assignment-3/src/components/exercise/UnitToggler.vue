<template>
    <div>
        <Tag severity="info" :value="`날씨단위: ${unitLabel}${configStore.unitSymbol}`" />
        <Button label="단위변경" size="small" text @click="configStore.toggleUnit" />
    </div>
</template>

<script setup>
import { useConfigStore } from '@/stores/configStore';
import { computed } from 'vue';
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const configStore = useConfigStore()
const unitLabel = computed(() => (configStore.unit === 'celsius' ? '섭씨' : '화씨'))
</script>

<style scoped>
@reference '@/assets/main.css';

div {
  @apply flex items-center gap-2;
}

:deep(.p-tag) {
  @apply rounded-full bg-slate-900/5 px-3 py-1 font-medium text-slate-700;
}

:deep(.p-button) {
  @apply rounded-full px-3 py-1.5 text-sm font-medium text-slate-500;
}

:deep(.p-button:hover) {
  @apply bg-slate-900/5 text-slate-900;
}
</style>
