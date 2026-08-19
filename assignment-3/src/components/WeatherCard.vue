<template>
    <Card @click="showClickedCity"
        class="flex flex-row items-center justify-between p-4 cursor-pointer hover:shadow-md transition-shadow">
        <CardHeader class="p-0 flex-1">
            <CardTitle>{{ props.name }} ({{ props.status }})</CardTitle>
            <CardContent class="p-0">
                <p>현재 기온: {{ props.temp }}도</p>
                <Badge v-if="props.temp > 25" variant="destructive">🔥 더움</Badge>
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
    name: { type: String, required: true },
    temp: { type: Number, required: true },
    status: { type: String, required: true },
})

const emit = defineEmits(['select'])

function showClickedCity() {
    alert(`${props.name}이 선택되었습니다.`)
    emit('select', props.name)
}

function showDetail() {
    alert(`${props.name}의 현재 날씨는 [${props.status}] 상태입니다.`)
}

</script>