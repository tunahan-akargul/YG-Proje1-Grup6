<script setup lang="ts">
import { computed } from 'vue'
import weeksData from '@/data/weeks.json'
import tasksData from '@/data/tasks.json'
import type { Task, Week } from '@/types'
import { useStorage } from '@/composables/useStorage'
import WeekRoadmap from '@/components/WeekRoadmap.vue'
import WeekDetail from '@/components/WeekDetail.vue'

const weeks: Week[] = weeksData
const tasks: Task[] = tasksData

// Seçili hafta hatırlanır; sayfa yenilenince aynı hafta açık kalır.
const selectedWeekId = useStorage<number>('selectedWeek', weeks[0]?.id ?? 1)

// Kayıtlı hafta artık veride yoksa (ör. JSON değişti) ilk haftaya düşülür.
const selectedWeek = computed(
  () => weeks.find((week) => week.id === selectedWeekId.value) ?? weeks[0],
)

const selectedWeekTasks = computed(() =>
  tasks.filter((task) => task.weekId === selectedWeek.value?.id),
)
</script>

<template>
  <header class="app-header">
    <div class="container">
      <h1>Ders Deneyimi Panosu</h1>
      <p class="subtitle">Web Teknolojilerine Giriş</p>
    </div>
  </header>

  <main class="container">
    <WeekRoadmap
      :weeks="weeks"
      :tasks="tasks"
      :selected-id="selectedWeek?.id ?? 0"
      @select="selectedWeekId = $event"
    />

    <WeekDetail v-if="selectedWeek" :week="selectedWeek" :tasks="selectedWeekTasks" />
  </main>
</template>

<style scoped>
.app-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-6) 0;
  margin-bottom: var(--space-6);
}

.subtitle {
  margin: var(--space-1) 0 0;
  color: var(--color-text-muted);
}

main {
  padding-bottom: var(--space-8);
}
</style>
