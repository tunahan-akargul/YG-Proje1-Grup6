<script setup lang="ts">
import type { Task, Week } from '@/types'
import WeekCard from './WeekCard.vue'

const props = defineProps<{
  weeks: Week[]
  tasks: Task[]
  selectedId: number
}>()

const emit = defineEmits<{ select: [weekId: number] }>()

function taskCountOf(weekId: number): number {
  return props.tasks.filter((task) => task.weekId === weekId).length
}
</script>

<template>
  <section class="roadmap" aria-labelledby="roadmap-title">
    <h2 id="roadmap-title">Haftalık yol haritası</h2>
    <ol class="roadmap-list">
      <li v-for="week in weeks" :key="week.id">
        <WeekCard
          :week="week"
          :task-count="taskCountOf(week.id)"
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
