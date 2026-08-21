import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useWeatherStore } from './weather'

export const useFavoriteStore = defineStore('favorite', () => {
  const weatherStore = useWeatherStore()
  const favoriteIds = ref([])
  // 검색으로 찾은 도시는 weatherList에 없으므로, 즐겨찾기 시점의 날씨 데이터를 따로 캐시해둠
  const favoriteCityCache = ref({})

  function toggleFavorite(city) {
    const cityId = typeof city === 'string' ? city : city.id

    if (favoriteIds.value.includes(cityId)) {
      favoriteIds.value = favoriteIds.value.filter((id) => id !== cityId)
      delete favoriteCityCache.value[cityId]
    } else {
      favoriteIds.value.push(cityId)
      if (typeof city === 'object' && city) {
        favoriteCityCache.value[cityId] = city
      }
    }
  }

  function isFavorite(cityId) {
    return favoriteIds.value.includes(cityId)
  }

  const favoriteCities = computed(() =>
    favoriteIds.value.map(
      (id) => weatherStore.weatherList.find((city) => city.id === id) ?? favoriteCityCache.value[id]
    ).filter(Boolean)
  )

  return { favoriteIds, toggleFavorite, isFavorite, favoriteCities }
})
