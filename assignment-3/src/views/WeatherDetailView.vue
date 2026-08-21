<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
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
  <BaseDashboardCard>
    <div v-if="weatherStore.isLoading">날씨 불러오는 중...</div>
    <div v-else-if="cityDetail">
      <h2>{{ cityDetail.name }} 상세 기상관측 정보</h2>
      <p>도시 코드: {{ cityDetail.id }}</p>
      <div>
        <p><span>현재 상태</span> : {{ cityDetail.status }}</p>
        <p><span>기온</span> : {{ displayTemp }}{{ configStore.unitSymbol }}</p>
        <p><span>습도</span> : {{ cityDetail.humidity }}%</p>
        <p><span>풍속</span> : {{ cityDetail.windSpeed }}m/s</p>
      </div>
    </div>
    <div v-else>
      <p>'{{ route.params.cityId }}'에 해당하는 도시 정보를 찾을 수 없습니다.</p>
    </div>
  </BaseDashboardCard>

  <div>
    <RouterLink to="/">메인 대시보드로 돌아가기</RouterLink>
  </div>
</template>
