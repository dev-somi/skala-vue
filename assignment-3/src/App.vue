<script setup>
import { RouterLink } from 'vue-router';
import UnitToggler from '@/components/exercise/UnitToggler.vue'

</script>

<template>
  <div class="flex flex-col items-center gap-4 p-4 max-w-2xl mx-auto">
    <div class="flex items-center justify-center gap-3">
      <nav
        class="flex items-center gap-1 rounded-full border border-gray-200 bg-white/80 p-1.5 shadow-sm backdrop-blur">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/favorites" class="nav-link">Favorites</RouterLink>
      </nav>
      <UnitToggler />
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.nav-link {
  padding: 0.375rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  transition: all 0.15s ease;
}

.nav-link:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.nav-link.router-link-exact-active {
  background-color: #111827;
  color: #ffffff;
}
</style>
