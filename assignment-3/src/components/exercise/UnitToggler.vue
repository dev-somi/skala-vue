<template>
    <div
        class="flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 py-1.5 pl-3 pr-1.5 shadow-sm backdrop-blur">
        <span class="text-sm font-medium text-gray-600">
            날씨단위: <span class="font-semibold text-gray-900">{{ unitLabel }}{{ configStore.unitSymbol }}</span>
        </span>
        <Button @click="configStore.toggleUnit" variant="outline" size="sm"
            class="h-7 rounded-full px-3 text-xs">단위변경</Button>
    </div>
</template>

<script setup>
import { useConfigStore } from '@/stores/configStore';
import { Button } from '@/components/ui/button'
import { computed } from 'vue';

const configStore = useConfigStore()
const unitLabel = computed(() => (configStore.unit === 'celsius' ? '섭씨' : '화씨'))
</script>