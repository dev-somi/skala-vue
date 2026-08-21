<script setup>
import { RouterLink } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import { Separator } from '@/components/ui/separator'
</script>

<template>
  <Separator class="my-2" />

  <BaseDashboardCard>
    <div class="w-full text-center">
      <h2 class="text-xl font-bold text-gray-800 mb-2">이 서비스에 대하여</h2>
      <p class="text-gray-600 mb-1">
        도시별 실시간(Mock) 날씨 정보를 검색하고 정렬해서 확인할 수 있는 대시보드입니다.
      </p>
      <p class="text-gray-600">
        Vue Router를 활용해 홈, 소개, 도시별 상세 페이지를 이동하며 실습하는 과제 프로젝트입니다.
      </p>
    </div>
  </BaseDashboardCard>

  <div class="mt-4 text-center">
    <RouterLink to="/" class="text-sm text-blue-600 hover:underline">메인 대시보드로 돌아가기</RouterLink>
  </div>
</template>

<style scoped></style>
