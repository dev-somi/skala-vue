import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useWeatherStore } from './weather'

export const useFavoriteStore = defineStore('favorite', () => {
  const weatherStore = useWeatherStore()
  const favoriteIds = ref([])

  function toggleFavorite(cityId) {
    if (favoriteIds.value.includes(cityId)) {
      favoriteIds.value = favoriteIds.value.filter((id) => id !== cityId)
    } else {
      favoriteIds.value.push(cityId)
    }
  }

  function isFavorite(cityId) {
    return favoriteIds.value.includes(cityId)
  }

  const favoriteCities = computed(() =>
    weatherStore.weatherList.filter((city) => favoriteIds.value.includes(city.id))
  )

  return { favoriteIds, toggleFavorite, isFavorite, favoriteCities }
})
