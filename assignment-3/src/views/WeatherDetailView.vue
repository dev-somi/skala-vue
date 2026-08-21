<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Dialog from 'primevue/dialog'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import Tag from 'primevue/tag'
import DataView from 'primevue/dataview'
import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weather'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()

const cityDetail = ref(null)
const visible = ref(true)

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

const detailItems = computed(() => {
  if (!cityDetail.value) return []
  return [
    { label: '현재 상태', value: cityDetail.value.status },
    { label: '기온', value: `${displayTemp.value}${configStore.unitSymbol}` },
    { label: '습도', value: `${cityDetail.value.humidity}%` },
    { label: '풍속', value: `${cityDetail.value.windSpeed}m/s` },
  ]
})

function closeDialog() {
  router.push('/')
}
</script>

<style scoped>
@reference '@/assets/main.css';

p {
  @apply mb-3 text-sm text-slate-500;
}

:deep(.p-dataview-content) {
  @apply flex flex-col gap-2;
}

:deep(.p-tag) {
  @apply w-full justify-start rounded-xl bg-slate-900/5 px-3 py-2 text-sm font-medium text-slate-700;
}

:deep(.p-progress-spinner) {
  @apply mx-auto flex w-16;
}

:deep(.p-message) {
  @apply rounded-xl;
}
</style>

<template>
  <Dialog v-model:visible="visible" modal :header="cityDetail ? `${cityDetail.name} 상세 기상관측 정보` : '상세 정보'"
    @update:visible="closeDialog">
    <div v-if="weatherStore.isLoading">
      <ProgressSpinner />
    </div>
    <div v-else-if="cityDetail">
      <p>도시 코드: {{ cityDetail.id }}</p>
      <DataView :value="detailItems" data-key="label">
        <template #list="{ items }">
          <div v-for="item in items" :key="item.label">
            <Tag severity="secondary" :value="`${item.label} : ${item.value}`" />
          </div>
        </template>
      </DataView>
    </div>
    <Message v-else severity="secondary">'{{ route.params.cityId }}'에 해당하는 도시 정보를 찾을 수 없습니다.</Message>
  </Dialog>
</template>
