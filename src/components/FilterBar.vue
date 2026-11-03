<script setup lang="ts">
import { useId } from 'vue'
import { STATUS_LABELS, TASK_STATUSES, type Week } from '@/types'
import { useFilters, type StatusFilter } from '@/composables/useFilters'

defineProps<{
  weeks: Week[]
  /** Her durum seçeneğinin yanında gösterilecek görev sayısı. */
  counts: Record<StatusFilter, number>
}>()

const { filters, search } = useFilters()
const id = useId()

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Tümü' },
  ...TASK_STATUSES.map((status) => ({ value: status, label: STATUS_LABELS[status] })),
]
</script>

<template>
  <div class="filter-bar">
    <div class="row">
      <div class="field search">
        <label :for="`${id}-search`">Görev ara</label>
        <input
          :id="`${id}-search`"
          v-model="search"
          class="input"
          type="search"
          placeholder="Başlık, açıklama veya etiket…"
          autocomplete="off"
        />
      </div>

      <div class="field">
        <label :for="`${id}-week`">Hafta</label>
        <select :id="`${id}-week`" v-model="filters.week" class="input">
          <option value="all">Tüm haftalar</option>
          <option v-for="week in weeks" :key="week.id" :value="week.id">{{ week.id }}. hafta</option>
        </select>
      </div>
    </div>

    <!-- Radyo düğmeleri: klavyede ok tuşlarıyla seçenekler arasında gezilir. -->
    <fieldset class="status-filter">
      <legend class="visually-hidden">Duruma göre filtrele</legend>
      <label v-for="option in statusOptions" :key="option.value" class="status-option">
        <input v-model="filters.status" type="radio" :name="`${id}-status`" :value="option.value" />
        <span>{{ option.label }} <span class="count">{{ counts[option.value] }}</span></span>
      </label>
    </fieldset>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.row {
  display: flex;
  gap: var(--space-3);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.field.search {
  flex: 1;
}

.field label {
  font-size: 0.85rem;
  font-weight: 600;
}

.status-filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  border: 0;
}

.status-option input {
  position: absolute;
  opacity: 0;
}

.status-option span {
  display: inline-block;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface);
  cursor: pointer;
}

.status-option .count {
  padding: 0 0 0 var(--space-1);
  border: 0;
  background: none;
  color: var(--color-text-muted);
}

.status-option input:checked + span {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-primary-text);
}

.status-option input:checked + span .count {
  color: inherit;
}

.status-option input:focus-visible + span {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

@media (max-width: 600px) {
  .row {
    flex-direction: column;
  }
}
</style>
