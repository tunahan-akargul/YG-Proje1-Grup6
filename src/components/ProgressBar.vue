<script setup lang="ts">
defineProps<{
  percent: number
  label: string
}>()
</script>

<template>
  <div
    class="bar"
    role="progressbar"
    :aria-label="label"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="percent"
  >
    <div class="fill" :style="{ width: `${percent}%` }"></div>
  </div>
</template>

<style scoped>
.bar {
  height: 8px;
  width: 100%;
  overflow: hidden;
  background: var(--color-border);
  border-radius: 999px;
}

.fill {
  height: 100%;
  background: var(--color-accent);
  border-radius: inherit;
  transition: width 0.4s ease;
}
</style>
