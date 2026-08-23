import axios from 'axios'

/**
 * 앱 전역에서 사용하는 공통 날씨 데이터 형태.
 * Open-Meteo/OpenWeatherMap 응답을 이 형태로 변환해서 store에 전달한다.
 *
 * @typedef {Object} Weather
 * @property {string} cityName
 * @property {string} condition - Clear/Clouds/Fog/Drizzle/Rain/Snow/Thunderstorm
 * @property {number} temperature
 * @property {string} date - YYYY-MM-DD
 * @property {string|null} time - HH:mm
 * @property {number|null} feelsLike
 * @property {number|null} tempMax
 * @property {number|null} tempMin
 * @property {number|null} humidity
 * @property {number|null} windSpeed
 * @property {number|null} cloudCover
 * @property {string|null} sunrise - HH:mm
 * @property {string|null} sunset - HH:mm
 */

// WeatherCard의 배경/아이콘은 OpenWeatherMap 스타일의 영문 상태값을 기준으로 매칭되므로,
// Open-Meteo의 WMO 코드도 같은 그룹명으로 매핑해 공통 컴포넌트를 그대로 재사용한다.
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
  80: 'Rain',
  81: 'Rain',
  82: 'Rain',
  71: 'Snow',
  73: 'Snow',
  75: 'Snow',
  77: 'Snow',
  85: 'Snow',
  86: 'Snow',
  95: 'Thunderstorm',
  96: 'Thunderstorm',
  99: 'Thunderstorm',
}

export function mapWmoCodeToCondition(code) {
  return WMO_CODE_MAP[code] ?? 'Clouds'
}

function unixToDateString(unixSeconds, timezoneOffsetSeconds = 0) {
  if (unixSeconds === undefined || unixSeconds === null) return null
  return new Date((unixSeconds + timezoneOffsetSeconds) * 1000).toISOString().slice(0, 10)
}

function unixToTimeString(unixSeconds, timezoneOffsetSeconds = 0) {
  if (unixSeconds === undefined || unixSeconds === null) return null
  return new Date((unixSeconds + timezoneOffsetSeconds) * 1000).toISOString().slice(11, 16)
}

/**
 * OpenWeatherMap 현재 날씨를 조회해서 공통 Weather 형태로 변환한다.
 * @param {string} city - 조회할 도시명 (영문 권장)
 * @returns {Promise<Weather>}
 */
export async function getOwmWeather(city) {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY
  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: { q: city, appid: API_KEY, units: 'metric' },
  })

  return {
    cityName: data.name,
    condition: data.weather[0].main,
    temperature: data.main.temp,
    date: unixToDateString(data.dt, data.timezone),
    time: unixToTimeString(data.dt, data.timezone),
    feelsLike: data.main.feels_like ?? null,
    tempMax: data.main.temp_max ?? null,
    tempMin: data.main.temp_min ?? null,
    humidity: data.main.humidity ?? null,
    windSpeed: data.wind?.speed ?? null,
    cloudCover: data.clouds?.all ?? null,
    sunrise: unixToTimeString(data.sys?.sunrise, data.timezone),
    sunset: unixToTimeString(data.sys?.sunset, data.timezone),
  }
}

/**
 * Open-Meteo 현재/일별 예보를 조회해서 공통 Weather 형태로 변환한다.
 * Open-Meteo 응답에는 도시명이 없으므로 호출자가 직접 전달한다.
 * @param {number} lat
 * @param {number} lon
 * @param {string} cityName
 * @returns {Promise<Weather>}
 */
export async function getOpenMeteoWeather(lat, lon, cityName) {
  const { data } = await axios.get('https://api.open-meteo.com/v1/forecast', {
    params: {
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,cloud_cover',
      daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset',
      timezone: 'auto',
    },
  })

  const current = data.current
  const daily = data.daily

  return {
    cityName,
    condition: mapWmoCodeToCondition(current.weather_code),
    temperature: current.temperature_2m,
    date: current.time?.slice(0, 10) ?? null,
    time: current.time?.slice(11, 16) ?? null,
    feelsLike: current.apparent_temperature ?? null,
    tempMax: daily?.temperature_2m_max?.[0] ?? null,
    tempMin: daily?.temperature_2m_min?.[0] ?? null,
    humidity: current.relative_humidity_2m ?? null,
    windSpeed: current.wind_speed_10m ?? null,
    cloudCover: current.cloud_cover ?? null,
    sunrise: daily?.sunrise?.[0]?.slice(11, 16) ?? null,
    sunset: daily?.sunset?.[0]?.slice(11, 16) ?? null,
  }
}

/**
 * Open-Meteo 아카이브에서 특정 날짜의 날씨를 조회해서 공통 Weather 형태로 변환한다.
 * 과거 날짜는 시간별 관측치 없이 일별 최고/최저만 제공되므로, 평균으로 대표 기온을 계산한다.
 * @param {number} lat
 * @param {number} lon
 * @param {string} dateStr - YYYY-MM-DD
 * @param {string} cityName
 * @returns {Promise<Weather>}
 */
export async function getOpenMeteoHistoricalWeather(lat, lon, dateStr, cityName) {
  const { data } = await axios.get('https://archive-api.open-meteo.com/v1/archive', {
    params: {
      latitude: lat,
      longitude: lon,
      start_date: dateStr,
      end_date: dateStr,
      daily: 'temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max',
      timezone: 'auto',
    },
  })

  const daily = data?.daily
  if (!daily?.time?.length) {
    throw new Error(`${dateStr}의 날씨 데이터가 존재하지 않습니다.`)
  }

  const max = daily.temperature_2m_max[0]
  const min = daily.temperature_2m_min[0]

  return {
    cityName,
    condition: mapWmoCodeToCondition(daily.weathercode[0]),
    temperature: Math.round(((max + min) / 2) * 10) / 10,
    date: daily.time[0],
    time: null,
    feelsLike: null,
    tempMax: max,
    tempMin: min,
    humidity: null,
    windSpeed: daily.windspeed_10m_max[0],
    cloudCover: null,
    sunrise: null,
    sunset: null,
  }
}
