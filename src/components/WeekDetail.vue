<script setup lang="ts">
import type { Week } from '@/types'

defineProps<{
  week: Week
}>()
</script>

<template>
  <section class="week-detail" aria-labelledby="week-detail-title">
    <p class="eyebrow">{{ week.id }}. hafta</p>
    <h2 id="week-detail-title">{{ week.title }}</h2>
    <p class="description">{{ week.description }}</p>

    <h3>Öğrenme hedefleri</h3>
    <ul class="goals">
      <li v-for="goal in week.goals" :key="goal">{{ goal }}</li>
    </ul>
  </section>
</template>

<style scoped>
.week-detail {
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.eyebrow {
  margin: 0 0 var(--space-1);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-primary);
}

.description {
  color: var(--color-text-muted);
}

h3 {
  font-size: 1rem;
  margin-top: var(--space-6);
}

.goals {
  padding-left: var(--space-6);
  margin-bottom: 0;
}

@media (max-width: 600px) {
  .week-detail {
    padding: var(--space-4);
  }
}
</style>
