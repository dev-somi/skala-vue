<template>
    <div>
        <Button @click="clickedHot" :severity="sortOrder === 'hot' ? 'danger' : 'secondary'" text rounded
            title="가장 더운 순">
            <template #icon>
                <Flame />
            </template>
        </Button>
        <Button @click="clickedCool" :severity="sortOrder === 'cold' ? 'info' : 'secondary'" text rounded
            title="가장 시원한 순">
            <template #icon>
                <Snowflake />
            </template>
        </Button>
    </div>
</template>

<script setup>
import { Flame, Snowflake } from '@lucide/vue'
import Button from 'primevue/button'

const props = defineProps({
    sortOrder: {
        type: String,
        default: null
    }
})

const emit = defineEmits(['update:sort-order'])

function clickedHot() {
    emit('update:sort-order', props.sortOrder === 'hot' ? null : 'hot')
}

function clickedCool() {
    emit('update:sort-order', props.sortOrder === 'cold' ? null : 'cold')
}
</script>

<style scoped>
@reference '@/assets/main.css';

div {
  @apply flex items-center gap-1 rounded-full bg-slate-900/5 p-1;
}

:deep(.p-button) {
  @apply h-9 w-9 rounded-full;
}
</style>
