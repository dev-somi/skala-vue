import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getOwmWeather, getOpenMeteoHistoricalWeather } from '@/api/weatherApi'
import { KOREAN_CITY_ALIASES } from '@/utils/cityAlias'

function getLastYearDateString() {
  const now = new Date()
  const targetYear = now.getFullYear() - 1
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${targetYear}-${month}-${day}`
}

export const useHistoryStore = defineStore('history', () => {
  const isLoadingToday = ref(false)
  const isLoadingLastYear = ref(false)
  const todayWeather = ref(null)
  const lastYearWeather = ref(null)
  const error = ref(null)

  // 정확히 1년 전 같은 날짜(월/일)의 날씨를 Open-Meteo 아카이브 API로 조회 (API 키 불필요)
  const fetchLastYearWeather = (lat, lon, cityName) => {
    return getOpenMeteoHistoricalWeather(lat, lon, getLastYearDateString(), cityName)
  }

  // 오늘 날씨와 1년 전 오늘 날씨를 각각 독립적으로 병렬 조회 (한쪽 실패가 다른 쪽에 영향 없음)
  const fetchComparison = async (lat, lon, cityName) => {
    error.value = null
    todayWeather.value = null
    lastYearWeather.value = null
    isLoadingToday.value = true
    isLoadingLastYear.value = true

    const todayPromise = getOwmWeather(KOREAN_CITY_ALIASES[cityName] ?? cityName)
      .then((weather) => {
        todayWeather.value = { ...weather, cityName }
      })
      .catch((err) => {
        console.error('오늘 날씨 조회 중 에러가 발생했습니다: ', err)
        error.value = '오늘 날씨 정보를 불러오지 못했습니다.'
      })
      .finally(() => {
        isLoadingToday.value = false
      })

    const lastYearPromise = fetchLastYearWeather(lat, lon, cityName)
      .then((weather) => {
        lastYearWeather.value = weather
      })
      .catch((err) => {
        console.error('작년 오늘 날씨 조회 중 에러가 발생했습니다: ', err)
        error.value = '작년 오늘의 날씨 정보를 불러오지 못했습니다.'
      })
      .finally(() => {
        isLoadingLastYear.value = false
      })

    await Promise.all([todayPromise, lastYearPromise])
  }

  return {
    isLoadingToday,
    isLoadingLastYear,
    todayWeather,
    lastYearWeather,
    error,
    fetchComparison,
  }
})
