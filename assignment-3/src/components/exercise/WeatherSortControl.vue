<template>
    <div>
        <button @click="clickedHot" title="가장 더운 순">
            <Flame />
        </button>
        <button @click="clickedCool" title="가장 시원한 순">
            <Snowflake />
        </button>
    </div>
</template>

<script setup>
import { Flame, Snowflake } from '@lucide/vue'

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
