<template>
  <div class="weather-card" :class="{ 'weather-card--readonly': readonly, 'weather-card--detailed': detailed }" :style="backgroundStyle" @click="!readonly && showClickedCity()">
    <div class="weather-card__overlay">
      <div class="weather-card__row weather-card__row--top">
        <div class="weather-card__status">
          <component :is="statusIcon" :size="20" />
          <span>{{ city.condition }}</span>
        </div>
        <div class="weather-card__top-right">
          <div v-if="!readonly" class="weather-card__actions">
            <Button text rounded size="small" severity="contrast" title="상세보기" @click.stop="showDetail">
              <template #icon>
                <Maximize2 :size="16" />
              </template>
            </Button>
            <Button text rounded size="small" severity="warn" title="즐겨찾기" @click.stop="favoriteStore.toggleFavorite(city)">
              <template #icon>
                <Star :size="16" :fill="favoriteStore.isFavorite(city.id) ? 'currentColor' : 'none'" />
              </template>
            </Button>
          </div>
          <div class="weather-card__temp">{{ displayTemp }}{{ configStore.unitSymbol }}</div>
        </div>
      </div>

      <div v-if="detailed" class="weather-card__stats">
        <div v-if="displayFeelsLike !== null" class="weather-card__stat">
          <Thermometer :size="16" />
          <span>체감 {{ displayFeelsLike }}{{ configStore.unitSymbol }}</span>
        </div>
        <div v-if="city.humidity !== null" class="weather-card__stat">
          <Droplets :size="16" />
          <span>습도 {{ city.humidity }}%</span>
        </div>
        <div v-if="city.windSpeed !== null" class="weather-card__stat">
          <Wind :size="16" />
          <span>풍속 {{ city.windSpeed }}m/s</span>
        </div>
        <div v-if="city.cloudCover !== null" class="weather-card__stat">
          <Cloud :size="16" />
          <span>구름 {{ city.cloudCover }}%</span>
        </div>
        <div v-if="displayTempMin !== null && displayTempMax !== null" class="weather-card__stat">
          <ArrowUpDown :size="16" />
          <span>{{ displayTempMin }}° / {{ displayTempMax }}°</span>
        </div>
        <div v-if="city.sunrise && city.sunset" class="weather-card__stat">
          <Sunrise :size="16" />
          <span>{{ city.sunrise }} · {{ city.sunset }}</span>
        </div>
      </div>

      <div class="weather-card__row weather-card__row--bottom">
        <div class="weather-card__name">{{ city.cityName }}</div>
        <div class="weather-card__date">
          <span>{{ dateLabel }}</span>
          <span v-if="city.time">{{ city.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { Maximize2, Star, Droplets, Wind, Thermometer, Cloud, ArrowUpDown, Sunrise } from '@lucide/vue'
import { useConfigStore } from '@/stores/configStore'
import { useFavoriteStore } from '@/stores/favorite'
import { getWeatherBackground, getWeatherIcon, getLocalDateLabel } from '@/utils/weatherCondition'

const router = useRouter()
const configStore = useConfigStore()
const favoriteStore = useFavoriteStore()
const toast = useToast()

const props = defineProps({
  city: {
    type: Object,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  detailed: {
    type: Boolean,
    default: false
  }
})

function toDisplayTemp(celsius) {
  if (celsius === null || celsius === undefined) return null
  if (configStore.unit === 'fahrenheit') {
    return Math.round((celsius * 9) / 5 + 32)
  }
  return Math.round(celsius)
}

const displayTemp = computed(() => toDisplayTemp(props.city.temperature))
const displayFeelsLike = computed(() => toDisplayTemp(props.city.feelsLike))
const displayTempMax = computed(() => toDisplayTemp(props.city.tempMax))
const displayTempMin = computed(() => toDisplayTemp(props.city.tempMin))

const statusIcon = computed(() => getWeatherIcon(props.city.condition))
const dateLabel = computed(() => getLocalDateLabel(props.city.date))
const backgroundStyle = computed(() => {
  const backgroundUrl = getWeatherBackground(props.city.condition)
  return backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : {}
})

const emit = defineEmits(['select-card', 'click-detail'])

function showClickedCity() {
  toast.add({
    severity: 'info',
    summary: `${props.city.cityName}가 선택되었습니다`,
    detail: '더 자세한 정보를 보려면 상세보기 아이콘을 클릭하세요',
    life: 3000
  })
  emit('select-card', props.city)
}

function showDetail() {
  router.push({ name: 'weather-detail', params: { cityId: props.city.id } })
  emit('click-detail', props.city)
}
</script>

<style scoped>
@reference '@/assets/main.css';

.weather-card {
  @apply relative w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-600 bg-cover bg-center shadow-[0_10px_30px_-10px_rgba(15,23,42,0.45)] ring-1 ring-white/10 transition-all duration-300 ease-out;
  container-type: inline-size;
  aspect-ratio: 2060 / 940;
}

.weather-card:hover {
  @apply -translate-y-1 shadow-[0_20px_40px_-14px_rgba(15,23,42,0.55)];
}

.weather-card--readonly {
  @apply cursor-default;
}

.weather-card--readonly:hover {
  @apply translate-y-0 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.45)];
}

.weather-card--detailed {
  aspect-ratio: auto;
}

.weather-card__overlay {
  @apply relative flex h-full flex-col justify-between p-5 text-white;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0.5) 100%);
}

.weather-card--detailed .weather-card__overlay {
  @apply h-auto justify-start gap-5 py-6;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.25) 30%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.55) 100%);
}

.weather-card__top-right {
  @apply flex flex-col items-end gap-0.5;
}

.weather-card__actions {
  @apply -mr-2 flex gap-0.5;
}

.weather-card__actions :deep(.p-button) {
  @apply h-8 w-8 bg-black/20 text-white backdrop-blur-sm transition-colors duration-150;
}

.weather-card__actions :deep(.p-button:hover) {
  @apply bg-black/35;
}

.weather-card__actions :deep(.p-button:has(svg[fill='currentColor'])) {
  @apply bg-amber-400 text-amber-950;
}

.weather-card__actions :deep(.p-button:has(svg[fill='currentColor']):hover) {
  @apply bg-amber-300;
}


.weather-card__row {
  @apply flex items-start justify-between;
}

.weather-card__row--bottom {
  @apply items-end gap-2;
}

.weather-card__stats {
  @apply flex flex-wrap gap-2 self-start;
}

.weather-card__stat {
  @apply flex items-center gap-1.5 rounded-full bg-black/20 px-2.5 py-1 text-[0.85rem] font-medium backdrop-blur-sm;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.weather-card--detailed .weather-card__stats {
  @apply grid w-full grid-cols-2 gap-2.5;
}

.weather-card--detailed .weather-card__stat {
  @apply justify-start rounded-xl px-3 py-2.5 text-[0.95rem];
}

.weather-card__status {
  @apply flex items-center gap-1.5 rounded-full bg-black/20 px-2.5 py-1 text-[0.85rem] font-medium backdrop-blur-sm;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.weather-card__temp {
  @apply text-2xl font-semibold;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.weather-card__name {
  @apply min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-bold leading-none;
  font-size: 11cqw;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
}

.weather-card__date {
  @apply flex flex-shrink-0 items-baseline gap-1.5 text-[0.85rem] opacity-90;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.weather-card__date span + span {
  @apply border-l border-white/40 pl-1.5 font-medium tabular-nums;
}
</style>
