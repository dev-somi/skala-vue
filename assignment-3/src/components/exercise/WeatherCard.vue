<template>
  <Card @click="showClickedCity"
    class="flex flex-row items-center justify-between p-4 cursor-pointer hover:shadow-md transition-shadow">
    <CardHeader class="p-0 flex-1">
      <CardTitle>{{ city.name }} ({{ city.status }})</CardTitle>
      <CardContent class="p-0">
        <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
        <Badge v-if="city.temp > 25" variant="destructive">🔥 더움</Badge>
        <Badge v-else class="bg-blue-100 text-blue-700 hover:bg-blue-100">❄️ 선선함</Badge>
      </CardContent>
    </CardHeader>
    <Button @click.stop="showDetail">상세보기</Button>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'

// TODO: 즐겨찾기 별 아이콘 버튼 추가
// 1) useWeatherStore()에서 toggleFavorite, isFavorite(또는 favoriteIds) 가져오기
// 2) 템플릿의 Button("상세보기") 옆에 별 버튼 하나 추가
//    - @click.stop 필수! (안 그러면 카드 전체 클릭 이벤트(showClickedCity)까지 같이 터짐)
// 3) isFavorite(props.city.id) 값에 따라 아이콘/색 다르게 표시 (예: ★ / ☆)

const router = useRouter()
const configStore = useConfigStore()

const props = defineProps({
  city: {
    type: Object,
    required: true
  }
})

const displayTemp = computed(() => {
  const rawTemp = props.city.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

const emit = defineEmits(['select-card', 'click-detail'])

function showClickedCity() {
  alert(`${props.city.name}이 선택되었습니다.`)
  emit('select-card', props.city)
}

function showDetail() {
  router.push({ name: 'weather-detail', params: { cityId: props.city.id } })
  emit('click-detail', props.city)
}

</script>