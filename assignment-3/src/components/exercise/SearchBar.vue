<template>
  <div>
    <label for="city">도시 검색</label>
    <AutoComplete id="city" :model-value="searchQuery" :suggestions="suggestions" option-label="label"
      :loading="isSearching || isSuggesting" placeholder="도시 이름을 입력하세요 (예: 도쿄, 파리)" @complete="onComplete"
      @option-select="onOptionSelect" @update:model-value="onInput" />
    <Tag severity="info" :value="`검색 중인 도시: ${searchQuery}`" />
  </div>
</template>

<script setup>
import AutoComplete from 'primevue/autocomplete'
import Tag from 'primevue/tag'

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

div {
  @apply flex flex-wrap items-center gap-3;
}

label {
  @apply text-sm font-semibold text-slate-600;
}

:deep(.p-autocomplete-input) {
  @apply rounded-full border-slate-200 bg-white/80 py-2;
}

:deep(.p-autocomplete-input:enabled:focus) {
  @apply border-sky-400 shadow-[0_0_0_3px_rgba(56,189,248,0.25)];
}

:deep(.p-tag) {
  @apply rounded-full bg-sky-50 px-3 py-1 font-medium text-sky-700;
}
</style>
