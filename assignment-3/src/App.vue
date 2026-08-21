<script setup>
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import Toast from 'primevue/toast'
import UnitToggler from '@/components/exercise/UnitToggler.vue'
import WeatherDetailView from '@/views/WeatherDetailView.vue'

const route = useRoute()
const router = useRouter()

// 모달 라우트(weather-detail)로 진입해도 뒤에 있던 페이지가 그대로 보이도록,
// 모달이 아닌 마지막 라우트를 따로 기억해서 배경용 RouterView에 넘겨준다.
const backgroundRoute = ref(route.meta.modal ? router.resolve('/') : route)

watch(route, (to) => {
  if (!to.meta.modal) {
    backgroundRoute.value = to
  }
})
</script>

<template>
  <div>
    <Toast />
    <nav class="navbar">
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/favorites" class="nav-link">Favorites</RouterLink>
        <RouterLink to="/compare" class="nav-link">On This Day</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
      </div>
      <UnitToggler />
    </nav>
    <main class="app-container">
      <RouterView :route="backgroundRoute" />
    </main>
    <Transition name="modal-fade">
      <WeatherDetailView v-if="route.meta.modal" :key="route.params.cityId" />
    </Transition>
  </div>
</template>

<style scoped>
@reference '@/assets/main.css';

.navbar {
  @apply sticky top-0 z-40 mx-auto mt-4 flex w-[92%] max-w-4xl items-center justify-between rounded-full border border-white/60 bg-white/70 px-4 py-2.5 shadow-[0_8px_30px_-14px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:w-[70%];
}

.app-container {
  @apply mx-auto flex w-[92%] max-w-6xl flex-col gap-5 py-8 sm:w-[75%];
}

.nav-links {
  @apply flex items-center gap-1;
}

.nav-link {
  @apply rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-500 no-underline transition-all duration-150;
}

.nav-link:hover {
  @apply bg-slate-900/5 text-slate-900;
}

.nav-link.router-link-exact-active {
  @apply bg-slate-900 text-white shadow-sm;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
