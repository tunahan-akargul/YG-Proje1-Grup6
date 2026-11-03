<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Task, TaskInput, Week } from '@/types'
import { toTaskInput, useTasks } from '@/composables/useTasks'
import TaskItem from './TaskItem.vue'
import TaskForm from './TaskForm.vue'

const props = defineProps<{
  weeks: Week[]
  weekId: number
}>()

const { tasks, statusOf, setStatus, addTask, updateTask, removeTask } = useTasks()

const visibleTasks = computed(() => tasks.value.filter((task) => task.weekId === props.weekId))

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
      :default-week-id="weekId"
      @save="onAdd"
      @cancel="isAdding = false"
    />

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
          @update:status="setStatus(task.id, $event)"
          @edit="editingId = task.id"
          @remove="onRemove(task)"
        />
      </li>
    </ul>
    <p v-else class="empty">Bu hafta için görev yok.</p>
  </section>
</template>

<style scoped>
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.panel-header h2 {
  font-size: 1.1rem;
}

.task-panel > * + * {
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

.empty {
  padding: var(--space-6);
  text-align: center;
  color: var(--color-text-muted);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius);
}
</style>
