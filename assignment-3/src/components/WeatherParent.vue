<script setup>
import { ref, computed, watch, watchEffect } from 'vue';
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue';
import BaseDashboardCard from './BaseDashboardCard.vue';
import WeatherSortControl from './WeatherSortControl.vue';
import { Separator } from '@/components/ui/separator'

const weatherList = ref([
    { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
    { id: 'city_02', name: '수원', temp: 24, status: '비' },
    { id: 'city_03', name: '부산', temp: 26, status: '구름' },
    { id: 'city_04', name: '인천', temp: 27, status: '맑음' },
    { id: 'city_05', name: '대전', temp: 29, status: '흐림' },
    { id: 'city_06', name: '대구', temp: 31, status: '맑음' },
    { id: 'city_07', name: '광주', temp: 25, status: '비' },
    { id: 'city_08', name: '울산', temp: 26, status: '구름' },
    { id: 'city_09', name: '제주', temp: 23, status: '흐림' },
    { id: 'city_10', name: '강릉', temp: 22, status: '맑음' },
    { id: 'city_11', name: '세종', temp: 27, status: '맑음' },
])

const searchQeury = ref('')
const selectedCityInfo = ref(null)
const filteredWeatherList = computed(() =>
    weatherList.value.filter((city) => city.name.includes(searchQeury.value))
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
                <h2 class="text-lg font-semibold text-gray-700">평균 기온: {{ averageTemp }}도</h2>
                <WeatherSortControl :sort-order="sortOrder" @update:sort-order="sortOrder = $event" />
            </div>
            <div class="flex flex-col justify-center gap-4">
                <div v-if="filteredWeatherList.length > 0" class="flex flex-col justify-center gap-4">
                    <WeatherCard v-for="weather in orderedWeatherList" :key="weather.id" :city="weather"
                        @select-card="selectedCityInfo = $event" @click-detail="handleClickDetail" />
                </div>
                <div v-else>
                    <p class="text-gray-500 text-center underline">'{{ searchQeury }}'와 일치하는 도시가 없습니다.</p>
                </div>
            </div>
        </div>
        <p v-if="selectedCityInfo"
            class="mt-4 text-sm text-green-700 bg-green-50 border-green-200 rounded-md ounded-md p-3 px-5 text-center">
            {{ selectedCityInfo?.name }}이 선택되었습니다.
        </p>
        <p v-else class="mt-4 text-sm text-gray-700 bg-gray-50 border-gray-200 rounded-md ounded-md p-3 px-5 text-center">
            카드를 클릭하거나 검색해 보세요.
        </p>
    </BaseDashboardCard>

</template>

<style scoped></style>
