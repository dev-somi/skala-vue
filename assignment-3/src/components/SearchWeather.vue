<template>
    <div class="w-full max-w-sm space-y-2">
        <Label for="city">도시 검색</Label>
        <Input id="city" v-model="city" placeholder="검색할 도시 입력" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm
         placeholder:text-muted-foreground
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
         disabled:cursor-not-allowed disabled:opacity-50" />
        <p class="text-sm text-muted-foreground">
            검색 중인 도시: <span class="text-foreground font-medium">{{ city || '없음' }}</span>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const city = ref('')
</script>