<template>
    <button type="button" class="unit-toggle" :class="{ 'unit-toggle--fahrenheit': isFahrenheit }"
        role="switch" :aria-checked="isFahrenheit" @click="configStore.toggleUnit">
        <span class="unit-toggle__thumb" />
        <span class="unit-toggle__option">°C</span>
        <span class="unit-toggle__option">°F</span>
    </button>
</template>

<script setup>
import { useConfigStore } from '@/stores/configStore';
import { computed } from 'vue';

const configStore = useConfigStore()
const isFahrenheit = computed(() => configStore.unit === 'fahrenheit')
</script>

<style scoped>
@reference '@/assets/main.css';

.unit-toggle {
  @apply relative inline-grid w-24 grid-cols-2 items-center rounded-full bg-slate-900/5 p-1 text-sm font-semibold text-slate-500;
  transition: background-color 0.25s ease;
}

.unit-toggle:hover {
  @apply bg-slate-900/10;
}

.unit-toggle__thumb {
  @apply absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white shadow;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.unit-toggle--fahrenheit .unit-toggle__thumb {
  transform: translateX(100%);
}

.unit-toggle__option {
  @apply relative z-10 text-center transition-colors duration-200;
}

.unit-toggle--fahrenheit .unit-toggle__option:first-child {
  @apply text-slate-400;
}

.unit-toggle:not(.unit-toggle--fahrenheit) .unit-toggle__option:last-child {
  @apply text-slate-400;
}

.unit-toggle--fahrenheit .unit-toggle__option:last-child,
.unit-toggle:not(.unit-toggle--fahrenheit) .unit-toggle__option:first-child {
  @apply text-sky-700;
}
</style>
