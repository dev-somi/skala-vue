<script setup>
import { ref } from 'vue';
import SearchWeather from '@/components/SearchWeather.vue'
import WeatherCard from './components/WeatherCard.vue';
import { Separator } from '@/components/ui/separator'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])


</script>

<template>
  <div class="flex flex-col items-center gap-4 p-4">
    <h1 class="text-2xl font-bold tracking-tight">과제 1 날씨</h1>

    <Separator class="my-2" />

    <SearchWeather />

    <Separator class="my-2" />

    <div class="w-full">
      <h2 class="text-lg font-semibold text-gray-700 mb-2 text-center">지역별 날씨 현황</h2>
      <div class="flex flex-col justify-center gap-4">
        <WeatherCard v-for="weather in weatherList" :key="weather.id" v-bind="weather" />
      </div>
    </div>

    <p class="text-sm text-gray-500">카드를 클릭하거나 검색해 보세요.</p>
  </div>
</template>

<style scoped></style>
