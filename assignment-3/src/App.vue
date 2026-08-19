<script setup>
import { ref } from 'vue';
import SearchWeather from '@/components/SearchWeather.vue'
import WeatherCard from './components/WeatherCard.vue';

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

</script>

<template>
  <div>과제 1 날씨</div>
  <SearchWeather />
  <div>지역별 날씨 현황
    <WeatherCard v-for="weather in weatherList" :key="weather.id" v-bind="weather" />
  </div>
  <div>카드를 클릭하거나 검색해 보세요.</div>
</template>

<style scoped></style>
