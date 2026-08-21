import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')
  const unitSymbol = computed(() => (unit.value === 'celsius' ? 'C' : 'F'))

  function toggleUnit(unit) {
    if (unit.value === 'celsius') {
      unit.value = 'fahrenheit'
    } else {
      unit.value = 'celsius'
    }
  }

  return { unit, unitSymbol, toggleUnit }
})
