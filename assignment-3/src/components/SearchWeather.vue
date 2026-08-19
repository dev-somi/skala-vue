<template>
    <div class="w-full max-w-sm space-y-2">
        <Label for="city">도시 검색</Label>
        <Input id="city" v-model="city" placeholder="검색할 도시 입력" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm
         placeholder:text-muted-foreground
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
         disabled:cursor-not-allowed disabled:opacity-50" />
        <p class="text-sm text-muted-foreground">
            검색 중인 도시: <span class="text-foreground font-medium">{{ city }}</span>
        </p>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const city = ref('')
const emit = defineEmits(['update:search'])

watch(city, (newValue) => {
    emit('update:search', newValue)
})

</script>