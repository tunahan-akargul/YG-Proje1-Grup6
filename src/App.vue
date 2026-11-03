<script setup lang="ts">
import { computed, watch } from 'vue'
import weeksData from '@/data/weeks.json'
import type { Week } from '@/types'
import { useStorage } from '@/composables/useStorage'
import { useTasks } from '@/composables/useTasks'
import { useFilters } from '@/composables/useFilters'
import { calculateProgress } from '@/composables/useProgress'
import ProgressSummary from '@/components/ProgressSummary.vue'
import WeekRoadmap from '@/components/WeekRoadmap.vue'
import WeekDetail from '@/components/WeekDetail.vue'
import TaskPanel from '@/components/TaskPanel.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const weeks: Week[] = weeksData
const { tasks, statusOf } = useTasks()
const { filters } = useFilters()

// Seçili hafta hatırlanır; sayfa yenilenince aynı hafta açık kalır.
const selectedWeekId = useStorage<number>('selectedWeek', weeks[0]?.id ?? 1)

// Kayıtlı hafta artık veride yoksa (ör. JSON değişti) ilk haftaya düşülür.
const selectedWeek = computed(
  () => weeks.find((week) => week.id === selectedWeekId.value) ?? weeks[0],
)

const overallProgress = computed(() => calculateProgress(tasks.value, statusOf))

const selectedWeekProgress = computed(() =>
  calculateProgress(
    tasks.value.filter((task) => task.weekId === selectedWeek.value?.id),
    statusOf,
  ),
)

// Karttan hafta seçmek görev listesini de o haftaya süzer.
function selectWeek(weekId: number) {
  selectedWeekId.value = weekId
  filters.value.week = weekId
}

// Görev listesindeki hafta filtresi değişirse soldaki hafta detayı da onu izler.
watch(
  () => filters.value.week,
  (week) => {
    if (week !== 'all') selectedWeekId.value = week
  },
)
</script>

<template>
  <header class="app-header">
    <div class="container header-inner">
      <div>
        <h1>Ders Deneyimi Panosu</h1>
        <p class="subtitle">Web Teknolojilerine Giriş</p>
      </div>
      <ThemeToggle />
    </div>
  </header>

  <main class="container">
    <ProgressSummary :progress="overallProgress" :week-count="weeks.length" />

    <WeekRoadmap
      class="section"
      :weeks="weeks"
      :selected-id="selectedWeek?.id ?? 0"
      @select="selectWeek"
    />

    <div v-if="selectedWeek" class="week-layout section">
      <WeekDetail :week="selectedWeek" :progress="selectedWeekProgress" />
      <TaskPanel :weeks="weeks" :default-week-id="selectedWeek.id" />
    </div>
  </main>
</template>

<style scoped>
.app-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-6) 0;
  margin-bottom: var(--space-6);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.subtitle {
  margin: var(--space-1) 0 0;
  color: var(--color-text-muted);
}

main {
  padding-bottom: var(--space-8);
}

.section {
  margin-top: var(--space-8);
}

/* Masaüstünde hafta detayı solda, görevler sağda; dar ekranda alt alta. */
.week-layout {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  gap: var(--space-6);
  align-items: start;
}

@media (max-width: 900px) {
  .week-layout {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
