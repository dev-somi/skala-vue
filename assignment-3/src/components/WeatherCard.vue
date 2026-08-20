<template>
    <Card @click="showClickedCity"
        class="flex flex-row items-center justify-between p-4 cursor-pointer hover:shadow-md transition-shadow">
        <CardHeader class="p-0 flex-1">
            <CardTitle>{{ city.name }} ({{ city.status }})</CardTitle>
            <CardContent class="p-0">
                <p>현재 기온: {{ city.temp }}도</p>
                <Badge v-if="city.temp > 25" variant="destructive">🔥 더움</Badge>
                <Badge v-else class="bg-blue-100 text-blue-700 hover:bg-blue-100">❄️ 선선함</Badge>
            </CardContent>
        </CardHeader>
        <Button @click.stop="showDetail">상세보기</Button>
    </Card>
</template>

<script setup>
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const props = defineProps({
    city: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['select-card', 'click-detail'])

function showClickedCity() {
    alert(`${props.city.name}이 선택되었습니다.`)
    emit('select-card', props.city)
}

function showDetail() {
    alert(`${props.city.name}의 현재 날씨는 [${props.city.status}] 상태입니다.`)
    emit('click-detail', props.city)
}

</script>