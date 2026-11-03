<script setup lang="ts">
import { computed, nextTick, reactive, ref, useId } from 'vue'
import type { TaskInput, Week } from '@/types'
import { validateTask, type TaskErrors } from '@/composables/useTasks'

const props = defineProps<{
  weeks: Week[]
  /** Düzenlenecek görevin verisi. Verilmezse form "yeni görev" modunda açılır. */
  initial?: TaskInput
  defaultWeekId?: number
}>()

const emit = defineEmits<{
  save: [input: TaskInput]
  cancel: []
}>()

const isEdit = computed(() => props.initial !== undefined)
const id = useId()
const formEl = ref<HTMLFormElement>()
const errors = ref<TaskErrors>({})

const form = reactive({
  title: props.initial?.title ?? '',
  description: props.initial?.description ?? '',
  tag: props.initial?.tag ?? '',
  weekId: props.initial?.weekId ?? props.defaultWeekId ?? props.weeks[0]?.id ?? 1,
  dueDate: props.initial?.dueDate ?? '',
})

async function submit() {
  const input: TaskInput = {
    title: form.title.trim(),
    description: form.description.trim(),
    tag: form.tag.trim(),
    weekId: form.weekId,
    ...(form.dueDate ? { dueDate: form.dueDate } : {}),
  }

  errors.value = validateTask(
    input,
    props.weeks.map((week) => week.id),
  )

  if (Object.keys(errors.value).length > 0) {
    // Hatalı ilk alana odaklan; ekran okuyucu hata mesajını okur.
    await nextTick()
    formEl.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    return
  }

  emit('save', input)
}
</script>

<template>
  <form ref="formEl" class="task-form" novalidate @submit.prevent="submit" @keydown.esc="emit('cancel')">
    <h3>{{ isEdit ? 'Görevi düzenle' : 'Yeni görev ekle' }}</h3>

    <div class="field">
      <label :for="`${id}-title`">Başlık <span aria-hidden="true">*</span></label>
      <input
        :id="`${id}-title`"
        v-model="form.title"
        class="input"
        type="text"
        maxlength="80"
        autocomplete="off"
        :aria-invalid="!!errors.title"
        :aria-describedby="errors.title ? `${id}-title-error` : undefined"
      />
      <p v-if="errors.title" :id="`${id}-title-error`" class="error">{{ errors.title }}</p>
    </div>

    <div class="field">
      <label :for="`${id}-description`">Açıklama</label>
      <textarea
        :id="`${id}-description`"
        v-model="form.description"
        class="input"
        rows="2"
        maxlength="300"
        :aria-invalid="!!errors.description"
        :aria-describedby="errors.description ? `${id}-description-error` : undefined"
      ></textarea>
      <p v-if="errors.description" :id="`${id}-description-error`" class="error">
        {{ errors.description }}
      </p>
    </div>

    <div class="row">
      <div class="field">
        <label :for="`${id}-week`">Hafta</label>
        <select
          :id="`${id}-week`"
          v-model.number="form.weekId"
          class="input"
          :aria-invalid="!!errors.weekId"
          :aria-describedby="errors.weekId ? `${id}-week-error` : undefined"
        >
          <option v-for="week in weeks" :key="week.id" :value="week.id">
            {{ week.id }}. hafta – {{ week.title }}
          </option>
        </select>
        <p v-if="errors.weekId" :id="`${id}-week-error`" class="error">{{ errors.weekId }}</p>
      </div>

      <div class="field">
        <label :for="`${id}-tag`">Etiket</label>
        <input
          :id="`${id}-tag`"
          v-model="form.tag"
          class="input"
          type="text"
          maxlength="20"
          placeholder="ör. Uygulama"
          :aria-invalid="!!errors.tag"
          :aria-describedby="errors.tag ? `${id}-tag-error` : undefined"
        />
        <p v-if="errors.tag" :id="`${id}-tag-error`" class="error">{{ errors.tag }}</p>
      </div>

      <div class="field">
        <label :for="`${id}-due`">Son tarih</label>
        <input
          :id="`${id}-due`"
          v-model="form.dueDate"
          class="input"
          type="date"
          :aria-invalid="!!errors.dueDate"
          :aria-describedby="errors.dueDate ? `${id}-due-error` : undefined"
        />
        <p v-if="errors.dueDate" :id="`${id}-due-error`" class="error">{{ errors.dueDate }}</p>
      </div>
    </div>

    <div class="actions">
      <button type="button" class="btn btn-ghost" @click="emit('cancel')">Vazgeç</button>
      <button type="submit" class="btn btn-primary">{{ isEdit ? 'Kaydet' : 'Ekle' }}</button>
    </div>
  </form>
</template>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--color-surface);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius);
}

.task-form h3 {
  font-size: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
  min-width: 0;
}

.field label {
  font-size: 0.85rem;
  font-weight: 600;
}

.row {
  display: flex;
  gap: var(--space-3);
}

.error {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-danger);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
}

@media (max-width: 600px) {
  .row {
    flex-direction: column;
  }
}
</style>
