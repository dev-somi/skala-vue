import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { useWeatherStore } from './weather'

// WeatherCard의 배경/아이콘은 OpenWeatherMap 스타일의 영문 상태값을 기준으로 매칭되므로,
// Open-Meteo의 WMO 코드도 같은 그룹명으로 매핑해 WeatherCard를 그대로 재사용한다.
const WMO_CODE_MAP = {
  0: 'Clear',
  1: 'Clear',
  2: 'Clouds',
  3: 'Clouds',
  45: 'Fog',
  48: 'Fog',
  51: 'Drizzle',
  53: 'Drizzle',
  55: 'Drizzle',
  56: 'Drizzle',
  57: 'Drizzle',
  61: 'Rain',
  63: 'Rain',
  65: 'Rain',
  66: 'Rain',
  67: 'Rain',
  71: 'Snow',
  73: 'Snow',
  75: 'Snow',
  77: 'Snow',
  80: 'Rain',
  81: 'Rain',
  82: 'Rain',
  85: 'Snow',
  86: 'Snow',
  95: 'Thunderstorm',
  96: 'Thunderstorm',
  99: 'Thunderstorm',
}

function mapWeatherCode(code) {
  return WMO_CODE_MAP[code] ?? 'Clouds'
}

// Open-Meteo 아카이브는 시간 정보 없이 날짜만 주므로, WeatherCard의 날짜 라벨(dt+timezone)을
// 그대로 재사용할 수 있도록 해당 날짜 정오(UTC) 기준의 타임스탬프를 만들어준다.
function dateStringToDt(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return Math.floor(Date.UTC(year, month - 1, day, 12) / 1000)
}

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
  const fetchLastYearWeather = async (lat, lon) => {
    const dateStr = getLastYearDateString()
    const URL = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${dateStr}&end_date=${dateStr}&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max&timezone=auto`

    const response = await axios.get(URL)
    const daily = response.data?.daily

    if (!daily?.time?.length) {
      throw new Error('1년 전 날씨 데이터가 존재하지 않습니다.')
    }

    const max = daily.temperature_2m_max[0]
    const min = daily.temperature_2m_min[0]

    return {
      date: daily.time[0],
      dt: dateStringToDt(daily.time[0]),
      timezone: 0,
      temp: Math.round(((max + min) / 2) * 10) / 10,
      tempMax: max,
      tempMin: min,
      status: mapWeatherCode(daily.weathercode[0]),
      windSpeed: daily.windspeed_10m_max[0],
    }
  }

  // 오늘 날씨와 1년 전 오늘 날씨를 각각 독립적으로 병렬 조회 (한쪽 실패가 다른 쪽에 영향 없음)
  const fetchComparison = async (lat, lon) => {
    const weatherStore = useWeatherStore()

    error.value = null
    todayWeather.value = null
    lastYearWeather.value = null
    isLoadingToday.value = true
    isLoadingLastYear.value = true

    const todayPromise = weatherStore
      .handleFetchWeather(lat, lon)
      .then((weather) => {
        todayWeather.value = weather
      })
      .catch((err) => {
        console.error('오늘 날씨 조회 중 에러가 발생했습니다: ', err)
        error.value = '오늘 날씨 정보를 불러오지 못했습니다.'
      })
      .finally(() => {
        isLoadingToday.value = false
      })

    const lastYearPromise = fetchLastYearWeather(lat, lon)
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
    fetchLastYearWeather,
    fetchComparison,
  }
})
