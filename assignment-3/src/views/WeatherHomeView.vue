<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue';
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue';
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue';
import WeatherSortControl from '@/components/exercise/WeatherSortControl.vue';
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import Divider from 'primevue/divider'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()

onMounted(() => {
  weatherStore.fetchAllWeather()
})

const searchQeury = ref('')
const selectedCityInfo = ref(null)
const filteredWeatherList = computed(() =>
  weatherStore.weatherList.filter((city) => city.cityName.includes(searchQeury.value))
)

const averageTemp = computed(() => {
  return (filteredWeatherList.value.reduce((acc, cur) => acc + cur.temperature, 0) / filteredWeatherList.value.length).toFixed(1)
})

const sortOrder = ref(null)
const orderedWeatherList = computed(() => {
  if (sortOrder.value === 'hot') {
    return [...filteredWeatherList.value].sort((a, b) => b.temperature - a.temperature)
  } else if (sortOrder.value === 'cold') {
    return [...filteredWeatherList.value].sort((a, b) => a.temperature - b.temperature)
  } else {
    return filteredWeatherList.value
  }
})

watch(selectedCityInfo, (newValue) => {
  console.log('[watch 감지] 상태 바 문구가 업데이트 되었습니다.')
  console.log(`${newValue?.cityName}이 선택되었습니다.`)
})

function handleClickDetail(city) {
  console.log('[상세보기]', city)
}

watchEffect(() => {
  console.log(`[watchEffect 자동 호출] 현재 검색어 '${searchQeury.value}'에 매칭되는 API 데이터를 필터링하고 있습니다.
  `)
})
</script>

<template>
  <SearchBar class="home-search" :search-query="searchQeury" @update-query="searchQeury = $event" />

  <BaseDashboardCard>
    <div>
      <h2>한국 지역별 날씨 현황</h2>
      <Divider />
      <div class="home-toolbar">
        <h2 v-if="!weatherStore.isLoading">평균 기온: {{ averageTemp }}도</h2>
        <WeatherSortControl :sort-order="sortOrder" @update:sort-order="sortOrder = $event" />
      </div>
      <div>
        <div v-if="weatherStore.isLoading">
          <ProgressSpinner />
        </div>
        <div v-else-if="filteredWeatherList.length > 0" class="weather-grid">
          <WeatherCard v-for="weather in orderedWeatherList" :key="weather.id" :city="weather"
            @select-card="selectedCityInfo = $event" @click-detail="handleClickDetail" />
        </div>
        <Message v-else severity="secondary">'{{ searchQeury }}'와 일치하는 도시가 없습니다.</Message>
      </div>
    </div>
  </BaseDashboardCard>
</template>

<style scoped>
@reference '@/assets/main.css';

h2 {
  @apply text-lg font-bold text-slate-900;
}

.home-search {
  @apply mx-auto mb-2 w-full max-w-xl;
}

:deep(.p-divider) {
  @apply my-4;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  @apply gap-6;
}

.weather-grid+.weather-grid {
  @apply mt-4;
}

.home-toolbar {
  @apply mb-4 flex flex-wrap items-center justify-between gap-3;
}

:deep(.p-progress-spinner) {
  @apply mx-auto flex w-16 justify-self-center;
}

:deep(.p-message) {
  @apply rounded-xl;
}
</style>
