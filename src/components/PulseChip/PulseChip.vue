<script setup lang="ts">
import { watch } from 'vue'
import Chip from 'primevue/chip'

import PulseComponent from '../PulseComponent.vue'
import PulseIcon from '../PulseIcon/PulseIcon.vue'
import type { PulseChipProps } from './PulseChip.types'

const props = withDefaults(defineProps<PulseChipProps>(), {
  modelValue: true,
})

const emit = defineEmits(['update:modelValue'])

function toggleSelected() {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}

// Auto-deselect when disabled
watch(
  () => props.disabled,
  (newDisabled) => {
    if (newDisabled && props.modelValue) {
      emit('update:modelValue', false)
    }
  },
)
</script>

<template>
  <PulseComponent>
    <Chip
      :label="label"
      :removable="!disabled"
      :class="{
        'pulse-chip-interactive': true,
        'pulse-chip--deselected': !modelValue,
        'pulse-chip--disabled': disabled,
      }"
      role="button"
      @click="toggleSelected"
    >
      <template #removeicon>
        <PulseIcon
          :icon="modelValue ? 'success' : 'failure'"
          size="small"
        />
      </template>
    </Chip>
  </PulseComponent>
</template>
