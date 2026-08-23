<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Select from 'primevue/select'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'
import { cities } from '@/stores/weather'
import { useHistoryStore } from '@/stores/history'
import { useConfigStore } from '@/stores/configStore'
import { celsiusToFahrenheit } from '@/utils/temperature'

const historyStore = useHistoryStore()
const configStore = useConfigStore()

const selectedCity = ref(cities[0])

function loadComparison() {
  historyStore.fetchComparison(selectedCity.value.lat, selectedCity.value.lon, selectedCity.value.name)
}

onMounted(loadComparison)
watch(selectedCity, loadComparison)

const bothLoaded = computed(
  () =>
    !historyStore.isLoadingToday &&
    !historyStore.isLoadingLastYear &&
    historyStore.todayWeather &&
    historyStore.lastYearWeather
)

function displayTemp(rawTemp) {
  if (rawTemp === undefined || rawTemp === null) return rawTemp
  if (configStore.unit === 'fahrenheit') return celsiusToFahrenheit(rawTemp)
  return rawTemp
}

function toCityWeather(id, weather) {
  if (!weather) return null
  return {
    id,
    ...weather,
  }
}

const columns = computed(() => [
  {
    key: 'last-year',
    title: '1년 전 오늘',
    isLoading: historyStore.isLoadingLastYear,
    city: toCityWeather(`${selectedCity.value.id}-last-year`, historyStore.lastYearWeather),
  },
  {
    key: 'today',
    title: '오늘',
    isLoading: historyStore.isLoadingToday,
    city: toCityWeather(selectedCity.value.id, historyStore.todayWeather),
  },
])

const tempDiff = computed(() => {
  if (!bothLoaded.value) return null
  const today = displayTemp(historyStore.todayWeather.temperature)
  const lastYear = displayTemp(historyStore.lastYearWeather.temperature)
  return Math.round((today - lastYear) * 10) / 10
})

const comparisonSentence = computed(() => {
  if (tempDiff.value === null) return ''
  const abs = Math.abs(tempDiff.value)
  if (abs < 0.5) {
    return '오늘은 1년 전과 기온이 비슷해요.'
  } else if (tempDiff.value > 0) {
    return `오늘은 1년 전보다 ${abs}${configStore.unitSymbol} 더워요.`
  } else {
    return `오늘은 1년 전보다 ${abs}${configStore.unitSymbol} 시원해요.`
  }
})

const comparisonSeverity = computed(() => (tempDiff.value > 0 ? 'error' : 'info'))
</script>

<template>
  <BaseDashboardCard>
    <div>
      <h2>작년 오늘 vs 오늘 날씨 비교</h2>
      <Select v-model="selectedCity" :options="cities" option-label="name" placeholder="도시를 선택하세요" />

      <Message v-if="historyStore.error" severity="warn">{{ historyStore.error }}</Message>

      <div class="compare-columns">
        <div v-for="column in columns" :key="column.key" class="compare-column">
          <h3>{{ column.title }}</h3>
          <div v-if="column.isLoading" class="weather-card-skeleton">
            <ProgressSpinner stroke-width="4" />
          </div>
          <Transition name="reveal">
            <WeatherCard v-if="!column.isLoading && column.city" :city="column.city" readonly />
          </Transition>
          <Message v-if="!column.isLoading && !column.city" severity="secondary">
            데이터를 불러올 수 없습니다.
          </Message>
        </div>
      </div>

      <Transition name="reveal">
        <div v-if="bothLoaded" class="compare-sentence">
          <Message :severity="comparisonSeverity">{{ comparisonSentence }}</Message>
        </div>
      </Transition>
    </div>
  </BaseDashboardCard>
</template>

<style scoped>
@reference '@/assets/main.css';

h2 {
  @apply mb-4 text-lg font-bold text-slate-900;
}

h3 {
  @apply mb-2 text-xl font-bold text-slate-800;
}

:deep(.p-select) {
  @apply w-full max-w-xs rounded-full border-slate-200 bg-white/80;
}

:deep(.p-message) {
  @apply mt-4 rounded-xl;
}

.compare-columns {
  @apply mt-5 flex flex-col gap-4 sm:flex-row;
}

.compare-column {
  @apply min-w-0 flex-1 rounded-2xl border border-slate-100 bg-white/70 p-3 shadow-sm;
}

.weather-card-skeleton {
  @apply flex w-full items-center justify-center rounded-2xl bg-slate-200;
  aspect-ratio: 2060 / 940;
}

.weather-card-skeleton :deep(.p-progress-spinner) {
  @apply h-12 w-12;
}

.compare-sentence {
  margin-top: 1rem;
}

.compare-sentence :deep(.p-message) {
  @apply mt-0 rounded-xl;
}

.reveal-enter-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.reveal-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
</style>
