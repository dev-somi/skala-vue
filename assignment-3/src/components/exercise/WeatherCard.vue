<template>
  <div @click="showClickedCity">
    <div>
      <h3>{{ city.name }} ({{ city.status }})</h3>
      <div>
        <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
        <span v-if="city.temp > 25">🔥 더움</span>
        <span v-else>❄️ 선선함</span>
      </div>
    </div>
    <button @click.stop="showDetail">상세보기</button>
    <button @click.stop="favoriteStore.toggleFavorite(city.id)">
      {{ favoriteStore.isFavorite(city.id) ? '★' : '☆' }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import { useFavoriteStore } from '@/stores/favorite'

const router = useRouter()
const configStore = useConfigStore()
const favoriteStore = useFavoriteStore()

const props = defineProps({
  city: {
    type: Object,
    required: true
  }
})

const displayTemp = computed(() => {
  const rawTemp = props.city.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

const emit = defineEmits(['select-card', 'click-detail'])

function showClickedCity() {
  alert(`${props.city.name}이 선택되었습니다.`)
  emit('select-card', props.city)
}

function showDetail() {
  router.push({ name: 'weather-detail', params: { cityId: props.city.id } })
  emit('click-detail', props.city)
}
</script>
