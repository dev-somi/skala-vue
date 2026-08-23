import { Sun, Cloud, CloudLightning, CloudDrizzle, CloudRain, CloudSnow, CloudFog, Haze, Wind, Tornado } from '@lucide/vue'

const backgroundModules = import.meta.glob('@/assets/weather/*.webp', { eager: true, import: 'default' })

const backgroundsByGroup = Object.fromEntries(
  Object.entries(backgroundModules).map(([path, url]) => {
    const group = path.match(/weather_card_(.+)\.webp$/)[1]
    return [group, url]
  })
)

const iconsByGroup = {
  clear: Sun,
  clouds: Cloud,
  thunderstorm: CloudLightning,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  snow: CloudSnow,
  mist: CloudFog,
  fog: CloudFog,
  haze: Haze,
  smoke: Wind,
  dust: Wind,
  sand: Wind,
  ash: CloudFog,
  squall: Wind,
  tornado: Tornado,
}

export function getWeatherBackground(status) {
  if (!status) return null
  return backgroundsByGroup[status.toLowerCase()] ?? null
}

export function getWeatherIcon(status) {
  if (!status) return Cloud
  return iconsByGroup[status.toLowerCase()] ?? Cloud
}

export function getLocalDateLabel(date) {
  if (!date) return ''
  const [year, month, day] = date.split('-').map(Number)
  return `${year}년 ${month}월 ${day}일`
}
