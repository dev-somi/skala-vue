<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import { Separator } from '@/components/ui/separator'
import { useConfigStore } from '@/stores/configStore'

const route = useRoute()
const configStore = useConfigStore()

const mockDetailList = [
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 55, windSpeed: 2.1 },
  { id: 'city_02', name: '수원', temp: 24, status: '비', humidity: 80, windSpeed: 3.4 },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', humidity: 65, windSpeed: 4.2 },
  { id: 'city_04', name: '인천', temp: 27, status: '맑음', humidity: 58, windSpeed: 3.0 },
  { id: 'city_05', name: '대전', temp: 29, status: '흐림', humidity: 60, windSpeed: 1.8 },
  { id: 'city_06', name: '대구', temp: 31, status: '맑음', humidity: 45, windSpeed: 2.5 },
  { id: 'city_07', name: '광주', temp: 25, status: '비', humidity: 78, windSpeed: 3.9 },
  { id: 'city_08', name: '울산', temp: 26, status: '구름', humidity: 62, windSpeed: 3.3 },
  { id: 'city_09', name: '제주', temp: 23, status: '흐림', humidity: 70, windSpeed: 5.1 },
  { id: 'city_10', name: '강릉', temp: 22, status: '맑음', humidity: 50, windSpeed: 2.7 },
  { id: 'city_11', name: '세종', temp: 27, status: '맑음', humidity: 57, windSpeed: 2.2 },
]

const cityDetail = ref(null)

onMounted(() => {
  cityDetail.value = mockDetailList.find((city) => city.id === route.params.cityId) ?? null
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
    <div v-if="cityDetail" class="w-full text-center">
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
