# assignment-3

도시별 실시간(Mock) 날씨 정보를 검색하고 정렬해서 확인할 수 있는 대시보드입니다. Vue Router를 활용해 홈, 소개, 도시별 상세 페이지를 이동하며 실습하는 과제 프로젝트입니다.

> 이 프로젝트의 소스코드는 저장소 루트가 아닌 `assignment-3` 폴더 안에 있습니다. 아래 실행 명령어들은 모두 `assignment-3` 폴더 안에서 실행해야 합니다.

## 배운 점

- **v-for / v-if / v-bind** — Vue의 디렉티브는 템플릿 안에서만 동작한다는 것을 배웠습니다. v-if와 v-show의 차이, 그리고 어떤 상황에 어떤 것을 써야 하는지도 정리했습니다(이번 과제는 조건이 다소 애매해서 최종 결과물에서는 조건부 렌더링을 제외했습니다). Vue는 선언적 렌더링을 지향하기 때문에 템플릿에서 바인딩만 해두면 스크립트에 값이 정의되어 있는 한 자동으로 반영된다는 점도 인상 깊었습니다. 양방향 바인딩은 단방향 바인딩과 input 이벤트를 합쳐놓은 문법 설탕입니다. 이걸 알고 나서야 사용자 입력을 실시간으로 화면에 반영하는 원리를 이해했습니다. 마지막으로 이벤트의 캡처링·타겟·버블링 흐름, 그리고 이를 modifier(.stop 등)로 간단히 제어하는 법도 배웠습니다.
- **반응형 상태, computed, watch** — ref와 reactive를 왜 구분해서 써야 하는지, reactive를 구조 분해 할당하면 반응성이 끊기는 문제를 직접 겪으며 이해했습니다. 또 ref로 감싼 값은 스크립트에서 .value로 접근해야 한다는 점을 처음엔 자주 놓쳤지만 반복하면서 체화했습니다.
- **컴포넌트 분리, Slot / Props / Emit** — Slot으로 전달된 자식 컴포넌트(SearchBar, WeatherCard)는 화면상으로는 BaseDashboardCard 내부에 위치합니다. 그런데 스크립트적으로는 최상위 부모 컴포넌트의 스코프에서 컴파일·평가된다는 점이 새로웠습니다. 덕분에 부모가 slot 안의 자식과 직접 바인딩·통신할 수 있다는 구조를 이해했고 과제에서 요구한 props/emit 외에도 나만의 이벤트를 추가로 설계해봤습니다.
- **Vue Router** — 라우터의 지연 로딩(lazy loading)과 catch-all route를 적용했고 상세보기 버튼에서 window.alert 대신 router.push를 이용한 Programmatic Navigation으로 전환했습니다. :cityId 같은 동적 경로 매칭도 다뤘습니다. 추가로 "On This Day"와 "Favorite" 탭을 직접 만들어 라우팅에 연결했고 상세 페이지를 모달처럼 보여주고 싶어서 라우트 기반 모달 패턴을 시도해봤습니다.
- **Pinia Store** — configStore에 state(unit) · getter(unitSymbol) · action(toggleUnit)을 정의해서 화씨/섭씨 단위 전환 같은 전역 설정을 스토어로 관리하는 법을 익혔습니다. 메인/상세 화면에서 반복되는 단위 변환 로직은 composable로 뽑아낼 수 있다는 점도 알게 되었습니다(이번 과제 범위 밖이라 실제 적용은 보류).
- **Axios 연동 & UI 라이브러리** — OpenWeatherMap API로 실제 날씨 데이터를 받아오고 날씨 상태에 맞춰 카드 디자인을 매핑하는 기능을 추가했습니다. PrimeVue와 Tailwind를 도입해 UI를 구성했고 세부 디자인은 AI에게 맡겨 실습에 집중했습니다. 오름차순/내림차순, 더운 순/추운 순 정렬 토글도 직접 추가한 기능입니다.
- **빌드 & 배포** — ESLint로 코드 품질을 점검하고 API 키는 환경 변수로 분리해 Git에 올라가지 않도록 관리하는 과정을 경험했습니다.

## 추가한 기능

과제 요구사항 외에 직접 설계해서 추가한 기능들입니다.

- **Favorite 탭** — 도시를 즐겨찾기에 추가/삭제하고 모아서 볼 수 있는 기능
- **On This Day 탭** — 선택한 도시의 "오늘"과 "1년 전 오늘" 날씨를 나란히 비교하는 기능 (Open-Meteo 아카이브 API 연동)
- **라우트 기반 모달 상세 페이지** — /weather/:cityId로 이동해도 배경 화면(홈)이 그대로 보이고 상세 내용이 모달처럼 오버레이되는 패턴
- **정렬 토글** — 온도 기준 오름차순/내림차순(더운 순/추운 순) 정렬
- **화씨/섭씨 단위 전환** — Pinia configStore로 전역 관리

## 트러블슈팅

- **조건부 렌더링 기준이 애매했던 문제** — 온도 기준으로 "더움/선선함" 라벨을 나누는 조건부 렌더링 요구사항이 실제 서비스 로직 안에서는 기준이 애매하게 느껴져 최종 결과물에서는 해당 조건부 렌더링을 제외하기로 결정했습니다.
- **상세 페이지를 모달처럼 만들고 싶었던 문제** — 라우터로 /weather/:cityId 같은 상세 페이지로 이동하면 완전히 새로운 페이지로 넘어가는 느낌이 강했습니다. 이 상세 페이지를 모달처럼 보여주고 싶었는데, id를 라우트 파라미터로 넘기는 구조라 일반적인 props/emit 방식만으로는 구현이 어려웠습니다. 그래서 "라우트 기반 모달(route-based modal)" 패턴을 적용해 해결했습니다.
- **라우트 기반 모달, 구체적으로 어떻게 구현했나** — 핵심은 세 가지입니다. ① 라우트 정의(router/index.js)에서 /weather/:cityId 라우트에 `meta: { modal: true }` 플래그를 추가해 이 라우트가 "모달로 열려야 하는 라우트"임을 표시했습니다. ② App.vue에서 현재 라우트가 모달일 때도 뒤쪽 페이지가 그대로 보이도록 모달이 아닌 마지막 라우트를 backgroundRoute라는 별도 상태로 기억해두고 watch(route)로 계속 갱신합니다. 이 backgroundRoute를 `<RouterView :route="backgroundRoute" />`에 명시적으로 넘겨주면, 실제 URL은 /weather/123이어도 RouterView는 계속 배경 페이지(예: 홈)를 렌더링합니다. ③ WeatherDetailView는 라우터가 아니라 App.vue에서 route.meta.modal이 true일 때 `<Transition>`으로 감싸서 조건부 렌더링하는 오버레이 컴포넌트로 만들고 route.params.cityId를 직접 읽어 데이터를 불러오도록 했습니다. 이렇게 하면 URL은 상세 페이지를 정확히 가리키면서(새로고침·공유 가능) 화면은 모달처럼 배경 위에 뜨는 효과를 동시에 얻을 수 있었습니다. 닫기는 router.push("/")로 처리했는데, 이 부분은 router.back()으로 바꾸면 브라우저 히스토리를 더 자연스럽게 복원할 수 있어 다음 개선 포인트로 남겨두었습니다.
- **서로 다른 두 API의 응답 스키마 문제** — "1년 전 오늘과 오늘 날씨 비교" 기능을 추가하면서 과거 날씨 데이터를 제공하는 무료 API인 Open-Meteo를 함께 쓰게 되었습니다. 문제는 기존에 쓰던 OpenWeatherMap과 Open-Meteo의 응답 필드 구조가 서로 달라서 store에서 axios 호출과 데이터 가공을 한 번에 처리하던 기존 구조로는 관심사가 뒤섞여 버렸습니다.
- **Frontend에 Model 계층을 둘지 고민** — 두 API의 차이를 정리하기 위해 api 폴더(axios로 각 API의 raw 데이터 요청), model 폴더(스프링의 엔티티처럼 데이터 타입을 정의하는 Weather.js), store 폴더(실제 화면에서 쓰는 상태)로 3계층 분리를 시도했습니다. 그런데 프론트엔드에서는 별도의 model 계층을 두는 경우가 흔치 않다는 것을 리서치하며 알게 되어 결국 api 폴더에서 데이터를 정규화하고 store에서 바로 사용하는 방식으로 정리했습니다.
- **WeatherCard와 WeatherDetailCard, 모델을 나눠야 할까** — 완전히 다른 데이터라면 모델을 분리하는 게 맞지만 공통되는 데이터가 많다면 하나의 모델로 정의하고 그 안에서 optional 필드로 다루는 편이 낫다는 결론을 내렸습니다.
- **"On This Day"에서 오늘 날씨만 안 불러와지는 문제** — "1년 전 오늘"은 정상 표시되는데 "오늘" 날씨만 안 불러와지는 문제가 있었습니다. 원인을 추적해보니 "오늘" 날씨 조회에 쓰던 Open-Meteo forecast API(무료 티어, IP당 일일 요청 한도)가 한도를 초과해 "Daily API request limit exceeded" 에러를 반환하고 있었습니다. 반면 "1년 전 오늘"에 쓰는 Open-Meteo 아카이브 API는 별도 한도라 영향이 없었던 것입니다. API 키 기반이라 요청 한도가 더 넉넉하고 메인 화면에서 이미 검증된 OpenWeatherMap으로 "오늘" 날씨 조회를 교체해 해결했습니다.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
