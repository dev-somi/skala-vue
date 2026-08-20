<template>
    <div class="dashboard-card">
        <slot></slot>
    </div>
</template>

<script setup>
</script>

<style scoped>
.dashboard-card {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    padding: 20px;
    margin-bottom: 16px;
}
</style>