<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import { Separator } from '@/components/ui/separator'
import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weather'

const route = useRoute()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()

const cityDetail = ref(null)

onMounted(async () => {
  cityDetail.value = await weatherStore.fetchCityDetail(route.params.cityId)
})

const displayTemp = computed(() => {
  const rawTemp = cityDetail.value?.temp
  if (rawTemp === undefined) return rawTemp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <Separator class="my-2" />

  <BaseDashboardCard>
    <div v-if="weatherStore.isLoading" class="w-full text-center text-gray-500">날씨 불러오는 중...</div>
    <div v-else-if="cityDetail" class="w-full text-center">
      <h2 class="text-xl font-bold text-gray-800 mb-1">{{ cityDetail.name }} 상세 기상관측 정보</h2>
      <p class="text-gray-500 mb-4">도시 코드: {{ cityDetail.id }}</p>
      <div class="grid grid-cols-2 gap-4 text-left">
        <p class="text-gray-700"><span class="font-medium">현재 상태</span> : {{ cityDetail.status }}</p>
        <p class="text-gray-700"><span class="font-medium">기온</span> : {{ displayTemp }}{{ configStore.unitSymbol }}</p>
        <p class="text-gray-700"><span class="font-medium">습도</span> : {{ cityDetail.humidity }}%</p>
        <p class="text-gray-700"><span class="font-medium">풍속</span> : {{ cityDetail.windSpeed }}m/s</p>
      </div>
    </div>
    <div v-else class="w-full text-center">
      <p class="text-gray-500">'{{ route.params.cityId }}'에 해당하는 도시 정보를 찾을 수 없습니다.</p>
    </div>
  </BaseDashboardCard>

  <div class="mt-4 text-center">
    <RouterLink to="/" class="text-sm text-blue-600 hover:underline">메인 대시보드로 돌아가기</RouterLink>
  </div>
</template>

<style scoped></style>
