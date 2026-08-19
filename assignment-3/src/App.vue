<script setup>
import { ref, computed, watch, watchEffect } from 'vue';
import SearchWeather from '@/components/SearchWeather.vue'
import WeatherCard from './components/WeatherCard.vue';
import { Separator } from '@/components/ui/separator'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const searchQeury = ref('')
const selectedCityInfo = ref(null)
const filteredWeatherList = computed(() =>
  weatherList.value.filter((city) => city.name.includes(searchQeury.value))
)

watch(selectedCityInfo, (newValue) => {
  console.log('[watch 감지] 상태 바 문구가 업데이트 되었습니다.')
  console.log(`${newValue}이 선택되었습니다.`)
})

watchEffect(() => {
  console.log(`[watchEffect 자동 호출] 현재 검색어 '${searchQeury.value}'에 매칭되는 API 데이터를 필터링하고 있습니다.  
  `)
})


</script>

<template>
  <div class="flex flex-col items-center gap-4 p-4 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold tracking-tight">과제 - 날씨</h1>

    <Separator class="my-2" />

    <SearchWeather @update:search="searchQeury = $event" />

    <Separator class="my-2" />

    <div class="w-full">
      <h2 class="text-lg font-semibold text-gray-700 mb-2 text-center">지역별 날씨 현황</h2>
      <div class="flex flex-col justify-center gap-4">
        <div v-if="filteredWeatherList.length > 0" class="flex flex-col justify-center gap-4">
          <WeatherCard v-for="weather in filteredWeatherList" :key="weather.id" v-bind="weather"
            @select="selectedCityInfo = $event" />
        </div>
        <div v-else>
          <p class="text-gray-500 text-center underline">'{{ searchQeury }}'와 일치하는 도시가 없습니다.</p>
        </div>
      </div>
    </div>
    <p v-if="selectedCityInfo"
      class="text-sm text-green-700 bg-green-50 border-green-200 rounded-md ounded-md p-3 px-5 text-center">
      {{ selectedCityInfo }}이 선택되었습니다.
    </p>
    <p v-else class="text-sm text-gray-700 bg-gray-50 border-gray-200 rounded-md ounded-md p-3 px-5 text-center">
      카드를 클릭하거나 검색해 보세요.
    </p>
  </div>
</template>

<style scoped></style>
