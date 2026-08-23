import { ref } from 'vue'
import { defineStore } from 'pinia'
import { KOREAN_CITY_ALIASES } from '@/utils/cityAlias'
import { getOwmWeather } from '@/api/weatherApi'

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
  { id: 'city_12', name: '청주', lat: 36.6424, lon: 127.489 },
]

export const useWeatherStore = defineStore('weather', () => {
  const isLoading = ref(false)
  const weatherList = ref([]) //(객체를담는)배열

  // 한국 12개 도시는 OpenWeatherMap을 도시명으로 조회 (OWM의 한글 지명 인식이 부실해 영문 별칭으로 치환)
  const fetchKoreanCityWeather = async (city) => {
    const queryName = KOREAN_CITY_ALIASES[city.name] ?? city.name
    const weather = await getOwmWeather(queryName)
    return { ...weather, id: city.id, cityName: city.name }
  }

  // cities 목록 전체를 조회해서 weatherList를 채움
  const fetchAllWeather = async () => {
    isLoading.value = true

    try {
      const results = await Promise.all(cities.map((city) => fetchKoreanCityWeather(city)))
      weatherList.value = results
    } catch (error) {
      console.error('통신 중 에러가 발생했습니다: ', error)
    } finally {
      isLoading.value = false
    }
  }

  // cityId로 좌표를 찾아 해당 도시 하나의 상세 날씨를 조회
  const fetchCityDetail = async (cityId) => {
    const city = cities.find((c) => c.id === cityId)
    if (!city) return null

    isLoading.value = true
    try {
      return await fetchKoreanCityWeather(city)
    } catch (error) {
      console.error('통신 중 에러가 발생했습니다: ', error)
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    weatherList,
    fetchAllWeather,
    fetchCityDetail,
  }
})
