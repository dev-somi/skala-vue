<script setup>
import { useFavoriteStore } from '@/stores/favorite'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'
import Message from 'primevue/message'
import Divider from 'primevue/divider'

const favoriteStore = useFavoriteStore()
</script>

<template>
  <BaseDashboardCard>
    <div>
      <h2>즐겨찾기한 도시</h2>
      <Divider />
      <div v-if="favoriteStore.favoriteCities.length > 0" class="weather-grid">
        <WeatherCard v-for="weather in favoriteStore.favoriteCities" :key="weather.id" :city="weather" />
      </div>
      <Message v-else severity="secondary">즐겨찾기한 도시가 없습니다.</Message>
    </div>
  </BaseDashboardCard>
</template>

<style scoped>
@reference '@/assets/main.css';

h2 {
  @apply text-lg font-bold text-slate-900;
}

:deep(.p-divider) {
  @apply my-4;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  @apply gap-6;
}

:deep(.p-message) {
  @apply rounded-xl;
}
</style>
