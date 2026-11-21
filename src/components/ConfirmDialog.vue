<script setup lang="ts">
import { nextTick, ref, useId, watch } from 'vue'

/*
  Uygulama temasına uyan onay penceresi (window.confirm yerine, issue #3).
  Tarayıcının <dialog> öğesi showModal() ile açılır: arka plan etkisizleşir,
  odak pencerenin içinde kalır ve Escape tuşu pencereyi kapatır.
*/
const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
  }>(),
  { confirmLabel: 'Sil', cancelLabel: 'Vazgeç' },
)

const emit = defineEmits<{ confirm: []; cancel: [] }>()

const dialog = ref<HTMLDialogElement | null>(null)
const cancelButton = ref<HTMLButtonElement | null>(null)
const id = useId()

watch(
  () => props.open,
  async (open) => {
    const el = dialog.value
    if (!el) return
    if (open && !el.open) {
      el.showModal()
      // Silme geri alınamaz; yanlışlıkla Enter'a basılırsa "Vazgeç" çalışsın.
      await nextTick()
      cancelButton.value?.focus()
    } else if (!open && el.open) {
      el.close()
    }
  },
)

// Escape tuşu ya da pencere dışına tıklama "vazgeç" sayılır.
function onCancel(event: Event) {
  event.preventDefault()
  emit('cancel')
}

function onBackdropClick(event: MouseEvent) {
  if (event.target === dialog.value) emit('cancel')
}
</script>

<template>
  <dialog
    ref="dialog"
    class="confirm-dialog"
    :aria-labelledby="`${id}-title`"
    :aria-describedby="`${id}-message`"
    @cancel="onCancel"
    @click="onBackdropClick"
  >
    <div class="content">
      <h2 :id="`${id}-title`">{{ title }}</h2>
      <p :id="`${id}-message`">{{ message }}</p>
      <div class="actions">
        <button ref="cancelButton" type="button" class="btn" @click="emit('cancel')">
          {{ cancelLabel }}
        </button>
        <button type="button" class="btn btn-primary btn-confirm" @click="emit('confirm')">
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
/* dialog.confirm-dialog: üst bileşenin boşluk kuralı ortalamayı bozmasın diye daha özgül. */
dialog.confirm-dialog {
  width: min(420px, calc(100vw - 2 * var(--space-4)));
  margin: auto;
  padding: 0;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: 0 12px 40px rgb(0 0 0 / 0.25);
}

.confirm-dialog::backdrop {
  background: rgb(20 12 6 / 0.55);
}

.content {
  padding: var(--space-6);
}

h2 {
  font-size: 1.1rem;
}

p {
  margin: var(--space-3) 0 var(--space-6);
  color: var(--color-text-muted);
  overflow-wrap: anywhere;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}

.actions .btn {
  min-height: 44px;
  padding-inline: 18px;
}

.btn-confirm {
  background: var(--color-danger);
}

@media (max-width: 400px) {
  .actions {
    flex-direction: column-reverse;
  }
}
</style>
