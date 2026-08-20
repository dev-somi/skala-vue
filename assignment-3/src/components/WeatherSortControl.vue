<template>
    <div class="inline-flex items-center rounded-lg border bg-muted/50 p-1 gap-1">
        <Button @click="clickedHot" variant="ghost" size="icon"
            :class="sortOrder === 'hot'
                ? 'rounded-md bg-orange-100 text-orange-500'
                : 'rounded-md text-muted-foreground hover:text-orange-500 hover:bg-orange-50'"
            title="가장 더운 순">
            <Flame />
        </Button>
        <Button @click="clickedCool" variant="ghost" size="icon"
            :class="sortOrder === 'cold'
                ? 'rounded-md bg-blue-100 text-blue-500'
                : 'rounded-md text-muted-foreground hover:text-blue-500 hover:bg-blue-50'"
            title="가장 시원한 순">
            <Snowflake />
        </Button>
    </div>
</template>

<script setup>
import { Button } from '@/components/ui/button'
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
