<script setup lang="ts">
import type { Week } from '@/types'
import type { Progress } from '@/composables/useProgress'
import ProgressBar from './ProgressBar.vue'

defineProps<{
  week: Week
  progress: Progress
  selected: boolean
}>()

const emit = defineEmits<{ select: [weekId: number] }>()
</script>

<template>
  <!-- Kartın tamamı bir düğme: fareyle tıklanır, klavyede Tab ile gelinip Enter/Boşluk ile seçilir. -->
  <button
    type="button"
    class="week-card"
    :class="{ 'is-selected': selected, 'is-complete': progress.total > 0 && progress.percent === 100 }"
    :aria-pressed="selected"
    @click="emit('select', week.id)"
  >
    <span class="week-number">
      {{ week.id }}. hafta
      <span v-if="progress.total > 0 && progress.percent === 100" class="badge">✓ Tamamlandı</span>
    </span>
    <span class="week-title">{{ week.title }}</span>
    <span class="week-meta">{{ progress.done }} / {{ progress.total }} görev · %{{ progress.percent }}</span>
    <ProgressBar :percent="progress.percent" :label="`${week.id}. hafta ilerlemesi`" />
  </button>
</template>

<style scoped>
.week-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
  height: 100%;
  padding: var(--space-4);
  text-align: left;
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
  display: flex;
  justify-content: space-between;
  gap: var(--space-2);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-primary);
}

.badge {
  text-transform: none;
  letter-spacing: 0;
  color: var(--color-done);
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
