<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Select from 'primevue/select'
import Message from 'primevue/message'
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
  historyStore.fetchComparison(selectedCity.value.lat, selectedCity.value.lon)
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

const lastYearCity = computed(() => {
  const weather = historyStore.lastYearWeather
  if (!weather) return null
  return {
    id: `${selectedCity.value.id}-last-year`,
    name: selectedCity.value.name,
    temp: weather.temp,
    status: weather.status,
    dt: weather.dt,
    timezone: weather.timezone,
  }
})

const todayCity = computed(() => {
  const weather = historyStore.todayWeather
  if (!weather) return null
  return {
    id: selectedCity.value.id,
    name: selectedCity.value.name,
    temp: weather.temp,
    status: weather.status,
    dt: weather.dt,
    timezone: weather.timezone,
  }
})

const tempDiff = computed(() => {
  if (!bothLoaded.value) return null
  const today = displayTemp(historyStore.todayWeather.temp)
  const lastYear = displayTemp(historyStore.lastYearWeather.temp)
  return Math.round((today - lastYear) * 10) / 10
})

const comparisonSentence = computed(() => {
  if (tempDiff.value === null) return ''
  const abs = Math.abs(tempDiff.value)
  if (abs < 0.5) {
    return '1년 전 오늘과 지금은 기온이 비슷했어요.'
  } else if (tempDiff.value > 0) {
    return `1년 전 오늘은 지금보다 ${abs}${configStore.unitSymbol} 추웠어요.`
  } else {
    return `1년 전 오늘은 지금보다 ${abs}${configStore.unitSymbol} 더웠어요.`
  }
})
</script>

<template>
  <BaseDashboardCard>
    <div>
      <h2>작년 오늘 vs 오늘 날씨 비교</h2>
      <Select v-model="selectedCity" :options="cities" option-label="name" placeholder="도시를 선택하세요" />

      <Message v-if="historyStore.error" severity="warn">{{ historyStore.error }}</Message>

      <div class="compare-columns">
        <div class="compare-column">
          <h3>{{ selectedCity.name }} · 1년 전 오늘</h3>
          <div v-if="historyStore.isLoadingLastYear" class="weather-card-skeleton" />
          <Transition name="reveal">
            <div v-if="!historyStore.isLoadingLastYear && lastYearCity">
              <WeatherCard :city="lastYearCity" readonly />
              <p class="compare-detail">
                최고 {{ displayTemp(historyStore.lastYearWeather.tempMax) }}{{ configStore.unitSymbol }}
                / 최저 {{ displayTemp(historyStore.lastYearWeather.tempMin) }}{{ configStore.unitSymbol }}
              </p>
              <p class="compare-detail">풍속 {{ historyStore.lastYearWeather.windSpeed }}m/s</p>
            </div>
          </Transition>
          <Message v-if="!historyStore.isLoadingLastYear && !lastYearCity" severity="secondary">
            데이터를 불러올 수 없습니다.
          </Message>
        </div>

        <div class="compare-column">
          <h3>{{ selectedCity.name }} · 오늘</h3>
          <div v-if="historyStore.isLoadingToday" class="weather-card-skeleton" />
          <Transition name="reveal">
            <div v-if="!historyStore.isLoadingToday && todayCity">
              <WeatherCard :city="todayCity" readonly />
              <p class="compare-detail">습도 {{ historyStore.todayWeather.humidity }}%</p>
              <p class="compare-detail">풍속 {{ historyStore.todayWeather.windSpeed }}m/s</p>
            </div>
          </Transition>
          <Message v-if="!historyStore.isLoadingToday && !todayCity" severity="secondary">
            데이터를 불러올 수 없습니다.
          </Message>
        </div>
      </div>

      <Transition name="reveal">
        <div v-if="bothLoaded" class="compare-sentence">
          <Message severity="info">{{ comparisonSentence }}</Message>
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
  @apply mb-3 text-base font-semibold text-slate-800;
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
  @apply min-w-0 flex-1 rounded-2xl border border-slate-100 bg-white/70 p-4 shadow-sm;
}

.compare-detail {
  @apply mb-1.5 mt-2 text-sm text-slate-600;
}

.weather-card-skeleton {
  @apply w-full animate-pulse rounded-2xl bg-slate-200;
  aspect-ratio: 2060 / 940;
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
