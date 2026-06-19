<script setup lang="ts">
import { computed, useId } from 'vue'
import type { PulseKpiCardProps } from './PulseKpiCard.types'
import PulseComponent from '../PulseComponent.vue'
import PulseStatusTag from '../PulseStatusTag/PulseStatusTag.vue'
import type { IconTitle } from '@/iconRegistry'

const props = withDefaults(defineProps<PulseKpiCardProps>(), {
  deltaDirection: 'up',
})

const titleId = useId()

const valueRowLabel = computed(() => {
  if (props.displayKpiUnits !== false && props.units) {
    return `${props.value} ${props.units}`
  }
  return String(props.value)
})

const deltaRowLabel = computed(() => {
  if (!props.deltaValue) return ''
  return props.deltaExplainer ? `${props.deltaValue} ${props.deltaExplainer}` : props.deltaValue
})

const deltaStatus = computed(() => {
  switch (props.deltaSentiment) {
    case 'positive':
      return 'success'
    case 'negative':
      return 'urgency'
    default:
      return 'general'
  }
})

const deltaIcon = computed<IconTitle | undefined>(() => {
  switch (props.deltaDirection) {
    case 'up':
      return 'arrow up'
    case 'down':
      return 'arrow down'
    default:
      return undefined
  }
})
</script>

<template>
  <PulseComponent>
    <article
      class="pulse-kpi-card"
      :aria-labelledby="titleId"
    >
      <div class="pulse-kpi-card-header">
        <div
          :id="titleId"
          role="heading"
          aria-level="3"
          class="pulse-kpi-card-title pulse-text-caption-strong"
        >
          {{ title }}
        </div>
        <div
          class="pulse-kpi-card-subheader pulse-text-caption-small"
          :class="{ 'pulse-kpi-card--hidden': displaySubheader === false || !subheader }"
          :aria-hidden="displaySubheader === false || !subheader ? true : undefined"
        >
          {{ subheader }}
        </div>
      </div>

      <div
        class="pulse-kpi-card-value-row"
        :aria-label="valueRowLabel"
      >
        <div
          class="pulse-kpi-card-value"
          aria-hidden="true"
        >
          {{ value }}
        </div>
        <div
          v-if="displayKpiUnits !== false && units"
          class="pulse-kpi-card-units pulse-text-caption-small"
          aria-hidden="true"
        >
          {{ units }}
        </div>
      </div>

      <div
        class="pulse-kpi-card-delta-row"
        :class="{ 'pulse-kpi-card--hidden': displayKpiDelta === false || !deltaValue }"
        :aria-label="displayKpiDelta !== false && deltaValue ? deltaRowLabel : undefined"
        :aria-hidden="displayKpiDelta === false || !deltaValue ? true : undefined"
      >
        <template v-if="deltaValue">
          <PulseStatusTag
            class="pulse-kpi-card-delta-value"
            :value="deltaValue"
            :status="deltaStatus"
            :icon="deltaIcon"
            aria-hidden="true"
          />
          <div
            v-if="deltaExplainer"
            class="pulse-kpi-card-explainer pulse-text-caption-small"
            aria-hidden="true"
          >
            {{ deltaExplainer }}
          </div>
        </template>
      </div>
    </article>
  </PulseComponent>
</template>

<style scoped>
.pulse-component {
  display: block;
  width: 100%;
}

.pulse-kpi-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--pulse-space-xs);
  padding: var(--pulse-space-s);
  width: 100%;
  min-width: 200px;
  min-height: 136px;
  background: var(--pulse-color-neutral-10);
  border-radius: 8px;
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.3),
    0 1px 3px 0 rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
}

.pulse-kpi-card-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--pulse-space-3xs);
  width: 100%;
  min-height: 32px;
}

.pulse-kpi-card-title {
  color: var(--pulse-color-neutral-120);
  width: 100%;
}

.pulse-kpi-card-subheader {
  color: var(--pulse-color-neutral-100);
  width: 100%;
}

.pulse-kpi-card-value-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.pulse-kpi-card-value {
  font-family: 'FS Me';
  font-size: var(--pulse-font-size-xxlarge);
  font-weight: var(--pulse-font-weight-bold);
  color: var(--pulse-color-neutral-120);
}

.pulse-kpi-card-units {
  color: var(--pulse-color-neutral-100);
}

.pulse-kpi-card-delta-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pulse-kpi-card-explainer {
  color: var(--pulse-color-neutral-100);
  white-space: nowrap;
}

.pulse-kpi-card--hidden {
  visibility: hidden;
}
</style>
