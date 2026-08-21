<script setup>
import { RouterLink } from 'vue-router';
import UnitToggler from '@/components/exercise/UnitToggler.vue'
</script>

<template>
  <div>
    <nav class="navbar">
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/favorites" class="nav-link">Favorites</RouterLink>
        <RouterLink to="/compare" class="nav-link">작년 오늘</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
      </div>
      <UnitToggler />
    </nav>
    <main class="app-container">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
@reference '@/assets/main.css';

.navbar {
  @apply sticky top-0 z-40 mx-auto mt-4 flex w-[92%] max-w-4xl items-center justify-between rounded-full border border-white/60 bg-white/70 px-4 py-2.5 shadow-[0_8px_30px_-14px_rgba(15, 23, 42, 0.35)] backdrop-blur-xl sm:w-[70%];
}

.app-container {
  @apply mx-auto flex w-[92%] max-w-4xl flex-col gap-5 py-8 sm:w-[70%];
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
</style>
