import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

export const cities = [
  { id: 'city_01', name: '서울', lat: 37.5665, lon: 126.978 },
  { id: 'city_02', name: '수원', lat: 37.2636, lon: 127.0286 },
  { id: 'city_03', name: '부산', lat: 35.1796, lon: 129.0756 },
  { id: 'city_04', name: '인천', lat: 37.4563, lon: 126.7052 },
  { id: 'city_05', name: '대전', lat: 36.3504, lon: 127.3845 },
  { id: 'city_06', name: '대구', lat: 35.8714, lon: 128.6014 },
  { id: 'city_07', name: '광주', lat: 35.1595, lon: 126.8526 },
  { id: 'city_08', name: '울산', lat: 35.5384, lon: 129.3114 },
  { id: 'city_09', name: '제주', lat: 33.4996, lon: 126.5312 },
  { id: 'city_10', name: '강릉', lat: 37.7519, lon: 128.8761 },
  { id: 'city_11', name: '세종', lat: 36.4801, lon: 127.289 },
]

export const useWeatherStore = defineStore('weather', () => {
  const isLoading = ref(false)
  const weatherList = ref([]) //(객체를담는)배열

  const isSearching = ref(false)
  const searchedCity = ref(null)
  const searchError = ref(null)
  const geocodedCities = ref({}) // id -> { id, name, lat, lon }, 검색으로 찾은 도시 캐시

  const isSuggesting = ref(false)
  const searchSuggestions = ref([])

  // 좌표(lat, lon) 하나로 도시 하나의 날씨를 조회해서 필요한 필드만 정리해 반환
  const handleFetchWeather = async (lat, lon) => {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    const response = await axios.get(URL)

    console.log('Axios 통신 응답 전체 객체: ', response)
    console.log('백엔드가 준 핵심 날씨 데이터(JSON): ', response.data)

    return {
      name: response.data.name,
      temp: response.data.main.temp,
      status: response.data.weather[0].main,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      dt: response.data.dt,
      timezone: response.data.timezone,
    }
  }

  // cities 목록 전체를 조회해서 weatherList를 채움
  const fetchAllWeather = async () => {
    isLoading.value = true

    try {
      const results = await Promise.all(
        cities.map(async (city) => {
          const weather = await handleFetchWeather(city.lat, city.lon)
          return { id: city.id, name: city.name, ...weather }
        })
      )
      weatherList.value = results
    } catch (error) {
      console.error('통신 중 에러가 발생했습니다: ', error)
    } finally {
      isLoading.value = false
    }
  }

  // cityId로 좌표를 찾아 해당 도시 하나의 상세 날씨를 조회
  const fetchCityDetail = async (cityId) => {
    const city = cities.find((c) => c.id === cityId) || geocodedCities.value[cityId]
    if (!city) return null

    isLoading.value = true
    try {
      const weather = await handleFetchWeather(city.lat, city.lon)
      return { id: city.id, name: city.name, ...weather }
    } catch (error) {
      console.error('통신 중 에러가 발생했습니다: ', error)
      return null
    } finally {
      isLoading.value = false
    }
  }

  // 입력한 글자로 지오코딩(Open-Meteo) 후보 도시 목록을 조회 (자동완성용)
  const fetchCitySuggestions = async (query) => {
    const name = query?.trim()
    if (!name) {
      searchSuggestions.value = []
      return
    }

    isSuggesting.value = true
    try {
      const geoResponse = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
        params: { name, count: 8, language: 'ko' },
      })

      searchSuggestions.value = (geoResponse.data?.results ?? []).map((result) => {
        const region = result.admin1 ? `${result.admin1}, ` : ''
        const country = result.country ?? result.country_code ?? ''
        return {
          label: `${result.name} (${region}${country})`,
          name: result.name,
          lat: result.latitude,
          lon: result.longitude,
        }
      })
    } catch (error) {
      console.error('통신 중 에러가 발생했습니다: ', error)
      searchSuggestions.value = []
    } finally {
      isSuggesting.value = false
    }
  }

  // 자동완성 후보 중 선택한 도시의 위경도로 실시간 날씨를 조회
  const selectSearchedCity = async (suggestion) => {
    if (!suggestion) return

    isSearching.value = true
    searchError.value = null
    searchedCity.value = null

    try {
      const id = `geo_${suggestion.lat}_${suggestion.lon}`
      geocodedCities.value[id] = { id, name: suggestion.name, lat: suggestion.lat, lon: suggestion.lon }

      const weather = await handleFetchWeather(suggestion.lat, suggestion.lon)
      searchedCity.value = { id, name: suggestion.name, ...weather }
    } catch (error) {
      console.error('통신 중 에러가 발생했습니다: ', error)
      searchError.value = '날씨 정보를 불러오는 중 오류가 발생했습니다.'
    } finally {
      isSearching.value = false
    }
  }

  return {
    isLoading,
    weatherList,
    handleFetchWeather,
    fetchAllWeather,
    fetchCityDetail,
    isSearching,
    searchedCity,
    searchError,
    isSuggesting,
    searchSuggestions,
    fetchCitySuggestions,
    selectSearchedCity,
  }
})
