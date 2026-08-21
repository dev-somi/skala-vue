<template>
  <div>
    <label for="city">도시 검색</label>
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText id="city" :model-value="searchQuery" @update:model-value="emit('update-query', $event)"
        placeholder="검색할 도시 입력" />
    </IconField>
    <Tag severity="info" :value="`검색 중인 도시: ${searchQuery}`" />
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Tag from 'primevue/tag'

defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update-query'])
</script>

<style scoped>
@reference '@/assets/main.css';

div {
  @apply flex flex-wrap items-center gap-3;
}

label {
  @apply text-sm font-semibold text-slate-600;
}

:deep(.p-inputtext) {
  @apply rounded-full border-slate-200 bg-white/80 py-2;
}

:deep(.p-inputtext:enabled:focus) {
  @apply border-sky-400 shadow-[0_0_0_3px_rgba(56,189,248,0.25)];
}

:deep(.p-tag) {
  @apply rounded-full bg-sky-50 px-3 py-1 font-medium text-sky-700;
}
</style>
