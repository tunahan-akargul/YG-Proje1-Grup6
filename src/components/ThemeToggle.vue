<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
const isDark = computed(() => theme.value === 'dark')
</script>

<template>
  <button
    type="button"
    class="btn theme-toggle"
    :aria-label="isDark ? 'Aydınlık temaya geç' : 'Karanlık temaya geç'"
    @click="toggleTheme"
  >
    <!-- Ay simgesi (aydınlık temadayken) -->
    <svg v-if="!isDark" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="currentColor" />
    </svg>
    <!-- Güneş simgesi (karanlık temadayken) -->
    <svg v-else viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </g>
    </svg>
    <span class="label">{{ isDark ? 'Aydınlık' : 'Karanlık' }}</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  flex-shrink: 0;
}

/* Çok dar ekranda yalnızca simge kalır; erişilebilir ad aria-label'dan gelir. */
@media (max-width: 400px) {
  .label {
    display: none;
  }
}
</style>
