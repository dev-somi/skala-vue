<template>
  <Card>
    <template #content>
      <slot></slot>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
</script>

<style scoped>
@reference '@/assets/main.css';

:deep(.p-card) {
  @apply rounded-2xl border border-white/60 bg-white/70 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)] backdrop-blur-xl transition-shadow duration-300;
}

:deep(.p-card:hover) {
  @apply shadow-[0_16px_40px_-14px_rgba(15,23,42,0.3)];
}

:deep(.p-card-body) {
  @apply p-5 sm:p-6;
}

:deep(.p-card-content) {
  @apply p-0;
}
</style>
