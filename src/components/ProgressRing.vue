<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    percent: number
    label: string
    size?: number
  }>(),
  { size: 120 },
)

const STROKE = 10
const radius = computed(() => (props.size - STROKE) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
// Halkanın dolmayan kısmı: yüzde arttıkça boşluk azalır.
const dashOffset = computed(() => circumference.value * (1 - props.percent / 100))
</script>

<template>
  <div
    class="ring"
    role="progressbar"
    :aria-label="label"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="percent"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" aria-hidden="true">
      <circle class="track" :cx="size / 2" :cy="size / 2" :r="radius" :stroke-width="STROKE" />
      <!-- %0'da çizilmez; yoksa yuvarlak uç küçük bir nokta bırakır. -->
      <circle
        v-if="percent > 0"
        class="fill"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :stroke-width="STROKE"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <span class="value">%{{ percent }}</span>
  </div>
</template>

<style scoped>
.ring {
  position: relative;
  flex-shrink: 0;
}

svg {
  transform: rotate(-90deg); /* Dolmaya saat 12 yönünden başlasın. */
}

circle {
  fill: none;
}

.track {
  stroke: var(--color-border);
}

.fill {
  stroke: var(--color-done);
  stroke-linecap: round;
  transition: stroke-dashoffset 0.4s ease;
}

.value {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
