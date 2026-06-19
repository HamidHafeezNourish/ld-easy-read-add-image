<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { animations, SortEventData, tearDown } from '@formkit/drag-and-drop'
import { dragAndDrop } from '@formkit/drag-and-drop/vue'
import PulseComponent from '../PulseComponent.vue'
import PulseButton from '../PulseButton/PulseButton.vue'
import PulseIcon from '../PulseIcon/PulseIcon.vue'
import { Card } from 'primevue'
import type { PulseDragAndDropItem } from '@/components'
import { vPulseTooltip } from '@/directives/PulseTooltip'
import type { PulseDragAndDropProps } from './PulseDragAndDrop.types'

const props = withDefaults(defineProps<PulseDragAndDropProps>(), {
  addLabel: 'Add information field',
  removeLabel: 'Remove',
  removeMethod: () => true,
})

const emit = defineEmits<{
  (e: 'add'): void
}>()

const itemsModel = defineModel<PulseDragAndDropItem[]>('items', { default: () => [] })
const MAX_ITEMS = 9

const gridRef = ref<HTMLElement | undefined>()

dragAndDrop<PulseDragAndDropItem>({
  parent: gridRef,
  values: itemsModel,
  sortable: true,
  dragHandle: '.pulse-drag-and-drop-item-body',
  plugins: [animations()],
  dragPlaceholderClass: 'pulse-drag-and-drop-drag-placeholder',
  synthDragPlaceholderClass: 'pulse-drag-and-drop-drag-placeholder',
  dropZoneClass: 'pulse-drag-and-drop-drop-zone',
  synthDropZoneClass: 'pulse-drag-and-drop-drop-zone',
  threshold: { horizontal: 0.2, vertical: 0.2 },
  onSort: <T,>(data: SortEventData<T>) => {
    // Clear the target value to avoid the drag library persisting a stale drop target after reordering.
    data.state.currentTargetValue = undefined
  },
})

onUnmounted(() => {
  if (gridRef.value) {
    tearDown(gridRef.value)
  }
})

const emptySlotIndexes = computed(() => {
  const startIndex = itemsModel.value.length
  const count = Math.max(0, MAX_ITEMS - startIndex)
  return Array.from({ length: count }, (_, offset) => startIndex + offset)
})

const handleAdd = () => {
  emit('add')
}

const handleRemove = async (item: PulseDragAndDropItem) => {
  if (await props.removeMethod(item)) {
    itemsModel.value = itemsModel.value.filter((i) => i !== item)
  }
}
</script>

<template>
  <PulseComponent>
    <div class="pulse-drag-and-drop">
      <div class="pulse-drag-and-drop-board">
        <div
          ref="gridRef"
          class="pulse-drag-and-drop-items"
        >
          <div
            v-for="(item, index) in itemsModel"
            :key="item.id"
            class="pulse-drag-and-drop-cell pulse-drag-and-drop-item"
          >
            <Card class="pulse-drag-and-drop-item-body">
              <template #content>
                <div class="pulse-drag-and-drop-tile-content">
                  <slot
                    name="item"
                    :item="item"
                    :index="index"
                  />
                  <div class="pulse-drag-and-drop-tile-actions">
                    <span
                      class="pulse-drag-and-drop-drag-indicator"
                      aria-hidden="true"
                    >
                      <PulseIcon
                        icon="dragindicator"
                        size="xlarge"
                      />
                    </span>
                  </div>
                </div>
                <div class="pulse-drag-and-drop-tile-remove">
                  <PulseButton
                    v-pulse-tooltip.top="item.removeDisabledText"
                    :label="props.removeLabel"
                    :disabled="item.removeDisabled"
                    type="secondary"
                    icon="delete"
                    small
                    @pointerdown.stop
                    @click.stop="handleRemove(item)"
                  />
                </div>
              </template>
            </Card>
          </div>
        </div>

        <button
          v-for="index in emptySlotIndexes"
          :key="`empty-${index}`"
          type="button"
          class="pulse-drag-and-drop-cell pulse-drag-and-drop-add"
          :aria-label="`Add item to slot ${index + 1}`"
          @click="handleAdd"
        >
          <span class="pulse-drag-and-drop-add-icon">
            <PulseIcon
              icon="create"
              size="large"
            />
          </span>
          <span class="pulse-drag-and-drop-add-text">{{ props.addLabel }}</span>
        </button>
      </div>
    </div>
  </PulseComponent>
</template>

<style scoped>
.pulse-drag-and-drop {
  display: flex;
  flex-direction: column;
  gap: var(--pulse-space-s);
  --pulse-drag-and-drop-cell-min-height: 120px;
  --pulse-drag-and-drop-columns: 3;
  --pulse-drag-and-drop-board-height: 442px;
  --pulse-drag-and-drop-border-radius: 8px;
  --pulse-drag-and-drop-border-width: 1px;
  --pulse-drag-and-drop-outline-width: 2px;
}

@media (max-width: 1100px) {
  .pulse-drag-and-drop {
    --pulse-drag-and-drop-columns: 2;
    --pulse-drag-and-drop-board-height: auto;
  }
}

@media (max-width: 800px) {
  .pulse-drag-and-drop {
    --pulse-drag-and-drop-columns: 1;
  }
}

.pulse-drag-and-drop-board {
  display: grid;
  grid-template-columns: repeat(var(--pulse-drag-and-drop-columns), minmax(0, 1fr));
  grid-auto-rows: minmax(var(--pulse-drag-and-drop-cell-min-height), auto);
  gap: var(--pulse-space-m);
  height: var(--pulse-drag-and-drop-board-height);
  background: var(--pulse-color-neutral-20);
  overflow: hidden;
}

.pulse-drag-and-drop-items {
  display: contents;
}

.pulse-drag-and-drop-cell {
  min-height: var(--pulse-drag-and-drop-cell-min-height);
  box-sizing: border-box;
}

.pulse-drag-and-drop-item {
  height: 100%;
}

.pulse-drag-and-drop-drag-placeholder {
  visibility: hidden;
}

.pulse-drag-and-drop-drop-zone .pulse-drag-and-drop-item-body {
  box-shadow: inset 0 0 0 var(--pulse-drag-and-drop-outline-width) var(--pulse-color-primary-80);
}

.pulse-drag-and-drop-item-body {
  min-height: var(--pulse-drag-and-drop-cell-min-height);
  display: flex;
  width: 100%;
  height: 100%;
  cursor: grab;
}

.pulse-drag-and-drop-item-body :deep(.p-card-body) {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.pulse-drag-and-drop-item-body :deep(.p-card-content) {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
}

.pulse-drag-and-drop-item-body > * {
  width: 100%;
}

.pulse-drag-and-drop-item:active {
  cursor: grabbing;
}

.pulse-drag-and-drop-item-body:active {
  cursor: grabbing;
}

.pulse-drag-and-drop-tile-actions {
  display: inline-flex;
  align-items: flex-start;
  gap: var(--pulse-space-2xs);
  flex-shrink: 0;
}

.pulse-drag-and-drop-drag-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.pulse-drag-and-drop-tile-remove {
  margin-top: auto;
  padding-top: var(--pulse-space-s);
}

.pulse-drag-and-drop-tile-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--pulse-space-xs);
}

.pulse-drag-and-drop-tile-content > :first-child {
  flex: 1 1 auto;
}

.pulse-drag-and-drop-add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--pulse-space-2xs);
  border-radius: var(--pulse-drag-and-drop-border-radius);
  border: var(--pulse-drag-and-drop-border-width) solid var(--pulse-color-neutral-60);
  border-style: dashed;
  color: var(--pulse-color-primary-120);
  cursor: pointer;
  font-size: var(--pulse-font-size-regular);
  background: var(--pulse-color-neutral-30);
  padding: var(--pulse-space-xs);
  min-height: var(--pulse-drag-and-drop-cell-min-height);
  width: 100%;
  height: 100%;
}

.pulse-drag-and-drop-add:hover {
  border-color: var(--pulse-color-neutral-110);
}

.pulse-drag-and-drop-add-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--pulse-color-primary-120);
}

.pulse-drag-and-drop-add-text {
  font-weight: var(--pulse-font-weight-regular);
}
</style>
