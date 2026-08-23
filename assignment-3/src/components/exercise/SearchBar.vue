<template>
  <div class="search-bar">
    <IconField class="search-bar__field">
      <InputIcon>
        <Search :size="18" />
      </InputIcon>
      <InputText id="city" aria-label="도시 검색" :model-value="searchQuery" placeholder="도시 이름을 입력하세요 (예: 서울, 부산)" fluid
        @update:model-value="emit('update-query', $event)" />
    </IconField>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import { Search } from '@lucide/vue'

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

.search-bar {
  @apply flex flex-col items-center gap-2 text-center;
}

.search-bar__field {
  @apply w-full max-w-xl;
}

:deep(.p-inputtext) {
  @apply w-full rounded-full border-slate-200 bg-white/80 py-2.5 pl-10 text-[0.95rem] shadow-sm;
}

:deep(.p-inputtext:enabled:hover) {
  @apply border-sky-300;
}

:deep(.p-inputtext:enabled:focus) {
  @apply border-sky-400 shadow-[0_0_0_3px_rgba(56,189,248,0.25)];
}

.search-bar__field :deep(.p-inputicon) {
  @apply left-3.5 text-slate-400;
}
</style>
