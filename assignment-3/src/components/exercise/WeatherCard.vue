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
    <Button @click.stop="favoriteStore.toggleFavorite(city.id)" variant="ghost">
      {{ favoriteStore.isFavorite(city.id) ? '★' : '☆' }}
    </Button>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import { useFavoriteStore } from '@/stores/favorite'

const router = useRouter()
const configStore = useConfigStore()
const favoriteStore = useFavoriteStore()

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