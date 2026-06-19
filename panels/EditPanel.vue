<script setup lang="ts">
import type { GalleryImage } from '../App.vue'
import PulseDrawer from '@/components/PulseDrawer/PulseDrawer.vue'
import PulseButton from '@/components/PulseButton/PulseButton.vue'

const props = defineProps<{
  image: GalleryImage
}>()

const emit = defineEmits<{
  close: []
  'blur-toggle': []
  delete: []
}>()

function formatSize(bytes: number) {
  return (bytes / 1024).toFixed(0) + ' KB'
}
</script>

<template>
  <PulseDrawer
    :visible="true"
    position="right"
    title="Edit image"
    breadcrumb="Back to Image Gallery"
    :breadcrumb-callback="() => emit('close')"
    @update:visible="(v) => { if (!v) emit('close') }"
  >
    <div class="ep__body">
      <div class="ep__file-row">
        <img
          :src="image.src"
          :alt="image.name"
          class="ep__thumb"
          :class="{ 'ep__thumb--blurred': image.blurred }"
        />
        <div class="ep__file-info">
          <p class="ep__file-name">{{ image.name }}</p>
          <p class="ep__file-size">{{ formatSize(image.size) }}</p>
          <label class="ep__blur-label">
            <input
              :checked="image.blurred"
              type="checkbox"
              class="ep__blur-check"
              @change="emit('blur-toggle')"
            />
            Blur image in gallery
          </label>
        </div>
        <PulseButton
          label="Delete"
          type="secondary"
          icon="delete"
          :small="true"
          @click="emit('delete')"
        />
      </div>
    </div>

    <!-- Footer -->
    <div class="ep__footer">
      <PulseButton
        label="Close"
        type="secondary"
        :full-width="true"
        @click="emit('close')"
      />
    </div>
  </PulseDrawer>
</template>

<style scoped>
.ep__body {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0 0;
}

.ep__file-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--pulse-color-neutral-30);
}

.ep__thumb {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.ep__thumb--blurred {
  filter: blur(6px);
}

.ep__file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.ep__file-name {
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--pulse-color-neutral-120);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ep__file-size {
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: var(--pulse-color-neutral-80);
  margin: 0;
}

.ep__blur-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: var(--pulse-color-neutral-100);
  cursor: pointer;
  margin-top: 4px;
}

.ep__blur-check {
  width: 14px;
  height: 14px;
  cursor: pointer;
  accent-color: var(--pulse-color-primary-100);
}

.ep__footer {
  padding-top: 20px;
  border-top: 1px solid var(--pulse-color-neutral-40);
  margin-top: auto;
}
</style>
