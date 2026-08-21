<script setup>
import { useFavoriteStore } from '@/stores/favorite'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'

const favoriteStore = useFavoriteStore()
</script>

<template>
  <BaseDashboardCard>
    <div>
      <h2>즐겨찾기한 도시</h2>
      <div v-if="favoriteStore.favoriteCities.length > 0">
        <WeatherCard v-for="weather in favoriteStore.favoriteCities" :key="weather.id" :city="weather" />
      </div>
      <div v-else>
        <p>즐겨찾기한 도시가 없습니다.</p>
      </div>
    </div>
  </BaseDashboardCard>
</template>
