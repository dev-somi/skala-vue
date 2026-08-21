<script setup>
import { RouterLink } from 'vue-router';
import UnitToggler from '@/components/exercise/UnitToggler.vue'

</script>

<template>
  <div>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/favorites">Favorites</RouterLink>
      </nav>
      <UnitToggler />
    </div>
    <RouterView />
  </div>
</template>
