<script setup>
import { RouterLink } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
</script>

<template>
  <BaseDashboardCard>
    <div>
      <h2>이 서비스에 대하여</h2>
      <p>
        도시별 실시간(Mock) 날씨 정보를 검색하고 정렬해서 확인할 수 있는 대시보드입니다.
      </p>
      <p>
        Vue Router를 활용해 홈, 소개, 도시별 상세 페이지를 이동하며 실습하는 과제 프로젝트입니다.
      </p>
    </div>
  </BaseDashboardCard>

  <div>
    <RouterLink to="/">메인 대시보드로 돌아가기</RouterLink>
  </div>
</template>
