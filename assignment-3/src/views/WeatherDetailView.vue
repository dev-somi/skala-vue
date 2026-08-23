<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import { X } from '@lucide/vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'
import { useWeatherStore } from '@/stores/weather'

const route = useRoute()
const router = useRouter()
const weatherStore = useWeatherStore()

const cityDetail = ref(null)

onMounted(async () => {
  cityDetail.value = await weatherStore.fetchCityDetail(route.params.cityId)
})

function closeOverlay() {
  router.push('/')
}
</script>

<template>
  <div class="detail-overlay" @click.self="closeOverlay">
    <div class="detail-panel">
      <button class="detail-close" title="닫기" @click="closeOverlay">
        <X :size="18" />
      </button>
      <div v-if="weatherStore.isLoading" class="detail-loading">
        <ProgressSpinner stroke-width="4" />
      </div>
      <WeatherCard v-else-if="cityDetail" :city="cityDetail" readonly detailed />
      <Message v-else severity="secondary">'{{ route.params.cityId }}'에 해당하는 도시 정보를 찾을 수 없습니다.</Message>
    </div>
  </div>
</template>

<style scoped>
@reference '@/assets/main.css';

.detail-overlay {
  @apply fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm;
}

.detail-panel {
  @apply relative w-full max-w-lg;
}

.detail-close {
  @apply absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg transition-colors duration-150;
}

.detail-close:hover {
  @apply bg-slate-100;
}

.detail-loading {
  @apply flex w-full items-center justify-center rounded-2xl bg-slate-200;
  min-height: 22rem;
}

.detail-loading :deep(.p-progress-spinner) {
  @apply h-12 w-12;
}
</style>
