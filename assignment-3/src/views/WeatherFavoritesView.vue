<script setup>
import { useFavoriteStore } from '@/stores/favorite'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'
import { Separator } from '@/components/ui/separator'

const favoriteStore = useFavoriteStore()
</script>

<template>
  <Separator class="my-2" />

  <BaseDashboardCard>
    <div class="w-full">
      <h2 class="text-lg font-semibold text-gray-700 mb-2 text-center">즐겨찾기한 도시</h2>
      <div v-if="favoriteStore.favoriteCities.length > 0" class="flex flex-col justify-center gap-4">
        <WeatherCard v-for="weather in favoriteStore.favoriteCities" :key="weather.id" :city="weather" />
      </div>
      <div v-else>
        <p class="text-gray-500 text-center underline">즐겨찾기한 도시가 없습니다.</p>
      </div>
    </div>
  </BaseDashboardCard>
</template>

<style scoped></style>
