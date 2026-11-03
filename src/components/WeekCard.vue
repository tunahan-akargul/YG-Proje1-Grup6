<script setup lang="ts">
import type { Week } from '@/types'

defineProps<{
  week: Week
  taskCount: number
  selected: boolean
}>()

const emit = defineEmits<{ select: [weekId: number] }>()
</script>

<template>
  <!-- Kartın tamamı bir düğme: fareyle tıklanır, klavyede Tab ile gelinip Enter/Boşluk ile seçilir. -->
  <button
    type="button"
    class="week-card"
    :class="{ 'is-selected': selected }"
    :aria-pressed="selected"
    @click="emit('select', week.id)"
  >
    <span class="week-number">{{ week.id }}. hafta</span>
    <span class="week-title">{{ week.title }}</span>
    <span class="week-meta">{{ week.goals.length }} hedef · {{ taskCount }} görev</span>
  </button>
</template>

<style scoped>
.week-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  width: 100%;
  height: 100%;
  padding: var(--space-4);
  text-align: left;
  font: inherit;
  color: var(--color-text);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: border-color 0.15s, transform 0.15s;
}

.week-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.week-card.is-selected {
  border-color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 10%, var(--color-surface));
}

.week-number {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-primary);
}

.week-title {
  font-weight: 600;
}

.week-meta {
  margin-top: auto;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
</style>
