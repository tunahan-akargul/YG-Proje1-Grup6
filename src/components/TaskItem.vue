<script setup lang="ts">
import { useId } from 'vue'
import { STATUS_LABELS, TASK_STATUSES, type Task, type TaskStatus } from '@/types'

defineProps<{
  task: Task
  status: TaskStatus
  weekLabel?: string
}>()

const emit = defineEmits<{
  'update:status': [status: TaskStatus]
  edit: []
  remove: []
}>()

const selectId = useId()

function onStatusChange(event: Event) {
  emit('update:status', (event.target as HTMLSelectElement).value as TaskStatus)
}

function formatDate(date: string): string {
  return new Date(date + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })
}
</script>

<template>
  <article class="task" :class="`status-${status}`">
    <div class="task-body">
      <h3 class="task-title">{{ task.title }}</h3>
      <p v-if="task.description" class="task-description">{{ task.description }}</p>
      <ul class="task-meta">
        <li v-if="weekLabel" class="chip">{{ weekLabel }}</li>
        <li v-if="task.tag" class="chip">{{ task.tag }}</li>
        <li v-if="task.custom" class="chip chip-custom">Kendi görevim</li>
        <li v-if="task.dueDate" class="due">
          Son tarih: <time :datetime="task.dueDate">{{ formatDate(task.dueDate) }}</time>
        </li>
      </ul>
    </div>

    <div class="task-actions">
      <label :for="selectId" class="visually-hidden">Durum: {{ task.title }}</label>
      <select :id="selectId" class="status-select" :value="status" @change="onStatusChange">
        <option v-for="option in TASK_STATUSES" :key="option" :value="option">
          {{ STATUS_LABELS[option] }}
        </option>
      </select>

      <!-- Ders görevleri sabittir; yalnızca öğrencinin kendi eklediği görevler düzenlenir/silinir. -->
      <template v-if="task.custom">
        <button type="button" class="btn btn-ghost btn-sm" @click="emit('edit')">Düzenle</button>
        <button type="button" class="btn btn-ghost btn-sm btn-danger" @click="emit('remove')">Sil</button>
      </template>
    </div>
  </article>
</template>

<style scoped>
.task {
  --status-color: var(--color-todo);
  display: flex;
  gap: var(--space-4);
  justify-content: space-between;
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 5px solid var(--status-color);
  border-radius: var(--radius);
}

.status-in-progress {
  --status-color: var(--color-progress);
}

.status-done {
  --status-color: var(--color-done);
}

.task-title {
  font-size: 1rem;
}

.status-done .task-title {
  text-decoration: line-through;
  color: var(--color-text-muted);
}

.task-description {
  margin: var(--space-1) 0 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.task-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  align-items: center;
  list-style: none;
  margin: var(--space-2) 0 0;
  padding: 0;
  font-size: 0.8rem;
}

.chip {
  padding: 2px var(--space-2);
  border-radius: 999px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
}

.chip-custom {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.due {
  color: var(--color-text-muted);
}

.task-actions {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-2);
  flex-shrink: 0;
}

.status-select {
  padding: 6px 8px;
  border: 2px solid var(--status-color);
  border-radius: 8px;
  background: var(--color-surface);
  font-weight: 600;
  cursor: pointer;
}

/* Telefonda durum seçimi ve düğmeler görevin altına iner. */
@media (max-width: 600px) {
  .task {
    flex-direction: column;
  }

  .task-actions {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .status-select {
    flex: 1;
  }
}
</style>
