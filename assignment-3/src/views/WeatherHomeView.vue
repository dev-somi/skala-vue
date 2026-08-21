<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue';
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue';
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue';
import WeatherSortControl from '@/components/exercise/WeatherSortControl.vue';
import { Separator } from '@/components/ui/separator'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()

onMounted(() => {
  weatherStore.fetchAllWeather()
})

const searchQeury = ref('')
const selectedCityInfo = ref(null)
const filteredWeatherList = computed(() =>
  weatherStore.weatherList.filter((city) => city.name.includes(searchQeury.value))
)

const averageTemp = computed(() => {
  return (filteredWeatherList.value.reduce((acc, cur) => acc + cur.temp, 0) / filteredWeatherList.value.length).toFixed(1)
})

const sortOrder = ref(null)
const orderedWeatherList = computed(() => {
  if (sortOrder.value === 'hot') {
    return [...filteredWeatherList.value].sort((a, b) => b.temp - a.temp)
  } else if (sortOrder.value === 'cold') {
    return [...filteredWeatherList.value].sort((a, b) => a.temp - b.temp)
  } else {
    return filteredWeatherList.value
  }
})

watch(selectedCityInfo, (newValue) => {
  console.log('[watch 감지] 상태 바 문구가 업데이트 되었습니다.')
  console.log(`${newValue?.name}이 선택되었습니다.`)
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
  <Separator class="my-2" />

  <BaseDashboardCard>
    <SearchBar :search-query="searchQeury" @update-query="searchQeury = $event" />
  </BaseDashboardCard>

  <Separator class="my-2" />

  <BaseDashboardCard>
    <div class="w-full">
      <h2 class="text-lg font-semibold text-gray-700 mb-2 text-center">지역별 날씨 현황</h2>
      <div class="flex items-center justify-between mb-2">
        <h2 v-if="!weatherStore.isLoading" class="text-lg font-semibold text-gray-700">평균 기온: {{ averageTemp }}도</h2>
        <WeatherSortControl :sort-order="sortOrder" @update:sort-order="sortOrder = $event" />
      </div>
      <div class="flex flex-col justify-center gap-4">
        <div v-if="weatherStore.isLoading" class="text-center text-gray-500">날씨 불러오는 중...</div>
        <div v-else-if="filteredWeatherList.length > 0" class="flex flex-col justify-center gap-4">
          <WeatherCard v-for="weather in orderedWeatherList" :key="weather.id" :city="weather"
            @select-card="selectedCityInfo = $event" @click-detail="handleClickDetail" />
        </div>
        <div v-else>
          <p class="text-gray-500 text-center underline">'{{ searchQeury }}'와 일치하는 도시가 없습니다.</p>
        </div>
      </div>
    </div>

  </BaseDashboardCard>

</template>

<style scoped></style>
