<script setup lang="ts">
import type { Week } from '@/types'
import { useTasks } from '@/composables/useTasks'
import { calculateProgress } from '@/composables/useProgress'
import WeekCard from './WeekCard.vue'

defineProps<{
  weeks: Week[]
  selectedId: number
}>()

const emit = defineEmits<{ select: [weekId: number] }>()

const { tasks, statusOf } = useTasks()

function progressOf(weekId: number) {
  return calculateProgress(
    tasks.value.filter((task) => task.weekId === weekId),
    statusOf,
  )
}
</script>

<template>
  <section class="roadmap" aria-labelledby="roadmap-title">
    <h2 id="roadmap-title">Haftalık yol haritası</h2>
    <ol class="roadmap-list">
      <li v-for="week in weeks" :key="week.id">
        <WeekCard
          :week="week"
          :progress="progressOf(week.id)"
          :selected="week.id === selectedId"
          @select="emit('select', $event)"
        />
      </li>
    </ol>
  </section>
</template>

<style scoped>
.roadmap h2 {
  font-size: 1.1rem;
  margin-bottom: var(--space-3);
}

/* Ekran daraldıkça kart sayısı kendiliğinden azalır: telefonda 1, masaüstünde 4'e kadar. */
.roadmap-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-3);
}
</style>
