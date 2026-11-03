<script setup lang="ts">
import { computed } from 'vue'
import type { Progress } from '@/composables/useProgress'
import ProgressRing from './ProgressRing.vue'

const props = defineProps<{
  progress: Progress
  weekCount: number
}>()

const message = computed(() => {
  const { percent, total } = props.progress
  if (total === 0) return 'Henüz görev yok.'
  if (percent === 0) return 'Başlamak için bir hafta seç ve ilk görevini tamamla.'
  if (percent === 100) return 'Tebrikler! Bütün görevleri tamamladın.'
  if (percent >= 50) return 'Yarıyı geçtin, böyle devam!'
  return 'İyi başlangıç, adım adım ilerliyorsun.'
})
</script>

<template>
  <section class="summary" aria-labelledby="summary-title">
    <ProgressRing :percent="progress.percent" label="Genel ilerleme" />
    <div class="text">
      <h2 id="summary-title">Genel ilerleme</h2>
      <p class="message">{{ message }}</p>
      <dl class="stats">
        <div>
          <dt>Tamamlanan</dt>
          <dd>{{ progress.done }} / {{ progress.total }}</dd>
        </div>
        <div>
          <dt>Devam eden</dt>
          <dd>{{ progress.inProgress }}</dd>
        </div>
        <div>
          <dt>Hafta</dt>
          <dd>{{ weekCount }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.summary {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-6);
  background: linear-gradient(120deg, var(--color-surface-warm), var(--color-surface) 70%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.summary h2 {
  font-size: 1.1rem;
}

.message {
  margin: var(--space-1) 0 var(--space-4);
  color: var(--color-text-muted);
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
  margin: 0;
}

.stats dt {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.stats dd {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

@media (max-width: 600px) {
  .summary {
    flex-direction: column;
    text-align: center;
    padding: var(--space-4);
  }

  .stats {
    justify-content: center;
  }
}
</style>
