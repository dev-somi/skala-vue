// TODO: 즐겨찾기 기능을 위한 Pinia 스토어
//
// 지금 WeatherHomeView.vue 안에 있는 weatherList가 로컬 ref라서
// FavoritesView.vue 같은 다른 뷰에서는 접근할 수가 없어.
// 그래서 여러 뷰가 공유해야 하는 상태(날씨 목록 + 즐겨찾기 id 목록)를
// 이 store로 옮겨서 어디서든 꺼내 쓸 수 있게 만드는 게 핵심이야.
//
// 참고: src/stores/counter.js 에 있는 defineStore 사용 예시 그대로 따라가면 됨
// (setup 함수 스타일: () => { ... return {...} })
//
// 1) weatherList
//    - WeatherHomeView.vue에 있던 mock 날씨 배열(ref)을 여기로 옮겨오기
//
// 2) favoriteIds
//    - 즐겨찾기한 도시의 id만 모아두는 상태 (ref([]) 또는 ref(new Set()))
//
// 3) toggleFavorite(cityId) 액션
//    - favoriteIds 안에 cityId가 있으면 제거, 없으면 추가
//
// 4) isFavorite(cityId) 헬퍼 또는 computed
//    - 특정 도시가 즐겨찾기 상태인지 true/false 반환 (WeatherCard에서 별 아이콘 표시용)
//
// 5) favoriteCities computed
//    - weatherList 중에서 favoriteIds에 포함된 도시만 필터링한 배열
//    - FavoritesView.vue에서 그대로 렌더링할 목록
//
// export const useWeatherStore = defineStore('weather', () => { ... })
