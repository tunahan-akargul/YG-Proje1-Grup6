<script setup lang="ts">
import { computed, ref } from 'vue'
import { TASK_STATUSES, type Task, type TaskInput, type Week } from '@/types'
import { toTaskInput, useTasks } from '@/composables/useTasks'
import { filterTasks, useFilters, type StatusFilter } from '@/composables/useFilters'
import FilterBar from './FilterBar.vue'
import TaskItem from './TaskItem.vue'
import TaskForm from './TaskForm.vue'

const props = defineProps<{
  weeks: Week[]
  /** Yeni görev formunda önceden seçili gelecek hafta. */
  defaultWeekId: number
}>()

const { tasks, statusOf, setStatus, addTask, updateTask, removeTask } = useTasks()
const { filters, search, resetFilters } = useFilters()

// Durum filtresi uygulanmadan önceki liste: sayaçlar bunun üzerinden hesaplanır.
const tasksInScope = computed(() =>
  filterTasks(tasks.value, statusOf, { status: 'all', week: filters.value.week, search: search.value }),
)

const visibleTasks = computed(() =>
  filterTasks(tasksInScope.value, statusOf, { status: filters.value.status, week: 'all', search: '' }),
)

const counts = computed(() => {
  const result = { all: tasksInScope.value.length } as Record<StatusFilter, number>
  for (const status of TASK_STATUSES) {
    result[status] = tasksInScope.value.filter((task) => statusOf(task.id) === status).length
  }
  return result
})

const isFiltering = computed(() => filters.value.status !== 'all' || search.value.trim() !== '')
const showWeekLabel = computed(() => filters.value.week === 'all')

function weekLabel(weekId: number): string {
  return `${weekId}. hafta`
}

const isAdding = ref(false)
const editingId = ref<string | null>(null)

function onAdd(input: TaskInput) {
  addTask(input)
  isAdding.value = false
}

function onUpdate(taskId: string, input: TaskInput) {
  updateTask(taskId, input)
  editingId.value = null
}

function onRemove(task: Task) {
  if (window.confirm(`"${task.title}" görevi silinsin mi?`)) removeTask(task.id)
}
</script>

<template>
  <section class="task-panel" aria-labelledby="task-panel-title">
    <div class="panel-header">
      <h2 id="task-panel-title">Görevler</h2>
      <button v-if="!isAdding" type="button" class="btn btn-primary" @click="isAdding = true">
        + Görev ekle
      </button>
    </div>

    <TaskForm
      v-if="isAdding"
      :weeks="weeks"
      :default-week-id="props.defaultWeekId"
      @save="onAdd"
      @cancel="isAdding = false"
    />

    <FilterBar :weeks="weeks" :counts="counts" />

    <!-- aria-live: liste değişince ekran okuyucu yeni sonucu duyurur. -->
    <p class="result-count" aria-live="polite">{{ visibleTasks.length }} görev gösteriliyor</p>

    <ul v-if="visibleTasks.length > 0" class="task-list">
      <li v-for="task in visibleTasks" :key="task.id">
        <TaskForm
          v-if="editingId === task.id"
          :weeks="weeks"
          :initial="toTaskInput(task)"
          @save="onUpdate(task.id, $event)"
          @cancel="editingId = null"
        />
        <TaskItem
          v-else
          :task="task"
          :status="statusOf(task.id)"
          :week-label="showWeekLabel ? weekLabel(task.weekId) : undefined"
          @update:status="setStatus(task.id, $event)"
          @edit="editingId = task.id"
          @remove="onRemove(task)"
        />
      </li>
    </ul>

    <div v-else class="empty">
      <template v-if="isFiltering">
        <p>Seçtiğin filtreye veya aramaya uyan görev yok.</p>
        <button type="button" class="btn" @click="resetFilters">Filtreleri temizle</button>
      </template>
      <p v-else>Bu hafta için henüz görev yok. “Görev ekle” ile kendi görevini ekleyebilirsin.</p>
    </div>
  </section>
</template>

<style scoped>
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.panel-header h2 {
  font-size: 1.1rem;
}

.task-panel > * + * {
  margin-top: var(--space-4);
}

.result-count {
  margin-bottom: 0;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.task-panel > .result-count {
  margin-top: var(--space-3);
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  list-style: none;
  padding: 0;
  margin-bottom: 0;
}

.task-panel > .task-list {
  margin-top: var(--space-2);
}

.empty {
  padding: var(--space-6);
  text-align: center;
  color: var(--color-text-muted);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius);
}

.empty p {
  margin: 0 0 var(--space-3);
}

.empty p:last-child {
  margin-bottom: 0;
}
</style>
