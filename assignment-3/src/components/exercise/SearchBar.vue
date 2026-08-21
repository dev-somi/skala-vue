<template>
  <div class="search-bar">
    <IconField class="search-bar__field">
      <InputIcon>
        <Search :size="18" />
      </InputIcon>
      <AutoComplete id="city" aria-label="도시 검색" :model-value="searchQuery" :suggestions="suggestions"
        option-label="label" :loading="isSearching || isSuggesting" placeholder="도시 이름을 입력하세요 (예: 도쿄, 파리)" fluid
        @complete="onComplete"
        @option-select="onOptionSelect" @update:model-value="onInput" />
    </IconField>
    <p v-if="searchQuery" class="search-bar__hint">
      <span class="search-bar__hint-dot" />
      검색 중인 도시: <strong>{{ searchQuery }}</strong>
    </p>
  </div>
</template>

<script setup>
import AutoComplete from 'primevue/autocomplete'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import { Search } from '@lucide/vue'

defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  suggestions: {
    type: Array,
    default: () => []
  },
  isSearching: {
    type: Boolean,
    default: false
  },
  isSuggesting: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update-query', 'complete-query', 'select-city'])

function onInput(value) {
  // 후보 선택 시에는 객체가 들어오므로, 타이핑 중(문자열)일 때만 필터용 이벤트를 emit
  if (typeof value === 'string') {
    emit('update-query', value)
  }
}

function onComplete(event) {
  emit('complete-query', event.query)
}

function onOptionSelect(event) {
  emit('select-city', event.value)
}
</script>

<style scoped>
@reference '@/assets/main.css';

.search-bar {
  @apply flex flex-col items-center gap-2 text-center;
}

.search-bar__field {
  @apply w-full max-w-xl;
}

:deep(.p-autocomplete) {
  @apply w-full;
}

:deep(.p-autocomplete-input) {
  @apply w-full rounded-full border-slate-200 bg-white/80 py-2.5 pl-10 text-[0.95rem] shadow-sm;
}

:deep(.p-autocomplete-input:enabled:hover) {
  @apply border-sky-300;
}

:deep(.p-autocomplete-input:enabled:focus) {
  @apply border-sky-400 shadow-[0_0_0_3px_rgba(56,189,248,0.25)];
}

.search-bar__field :deep(.p-inputicon) {
  @apply left-3.5 text-slate-400;
}

.search-bar__hint {
  @apply flex items-center gap-1.5 text-sm text-sky-700;
}

.search-bar__hint-dot {
  @apply h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500;
}
</style>
