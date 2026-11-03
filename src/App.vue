<script setup lang="ts">
import weeksData from '@/data/weeks.json'
import tasksData from '@/data/tasks.json'
import type { Task, Week } from '@/types'

const weeks: Week[] = weeksData
const tasks: Task[] = tasksData
</script>

<template>
  <header class="app-header">
    <div class="container">
      <h1>Ders Deneyimi Panosu</h1>
      <p class="subtitle">Web Teknolojilerine Giriş</p>
    </div>
  </header>

  <main class="container">
    <!-- Geçici: veri doğru yükleniyor mu diye kontrol. Yerini yol haritası bileşeni alacak. -->
    <p>{{ weeks.length }} hafta, {{ tasks.length }} görev yüklendi.</p>
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
</style>
