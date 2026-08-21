<template>
  <div>
    <label for="city">도시 검색</label>
    <input id="city" :value="searchQuery" @input="emit('update-query', $event.target.value)"
      placeholder="검색할 도시 입력" />
    <p>
      검색 중인 도시: <span>{{ searchQuery }}</span>
    </p>
  </div>
</template>

<script setup>
defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update-query'])
</script>
