<script setup>
// TODO: 즐겨찾기한 도시만 모아서 보여주는 뷰
//
// 1) useWeatherStore() 로 store 인스턴스 가져오기
//    import { useWeatherStore } from '@/stores/weather'
//
// 2) store.favoriteCities (computed)를 템플릿에서 그대로 사용
//    - storeToRefs로 꺼내 쓰면 반응성 유지됨 (pinia)
//
// 3) 목록이 비어있을 때(즐겨찾기 없음) 안내 문구 처리
//    v-if="favoriteCities.length > 0" / v-else
</script>

<template>
  <!--
    TODO: 레이아웃은 WeatherHomeView.vue 참고해서 맞추면 됨
    - Separator, BaseDashboardCard로 감싸기
    - WeatherCard.vue를 v-for로 재사용 (favoriteCities 기준으로 순회)
    - WeatherCard에서 별 아이콘 눌러서 즐겨찾기 해제하면
      이 목록에서도 바로 빠지는지 확인해보기 (store 반응성 체크)
  -->
  <div></div>
</template>

<style scoped></style>
