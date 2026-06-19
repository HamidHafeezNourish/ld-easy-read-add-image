<script setup lang="ts">
import { computed, ref } from 'vue'
import type { GalleryImage } from '../App.vue'
import PulseIcon from '@/components/PulseIcon/PulseIcon.vue'
import PulseButton from '@/components/PulseButton/PulseButton.vue'
import PulseChip from '@/components/PulseChip/PulseChip.vue'

const props = defineProps<{
  images: GalleryImage[]
  activeIndex: number
}>()

const emit = defineEmits<{
  close: []
  navigate: [index: number]
  edit: [imageId: string]
  'blur-toggle': [imageId: string]
}>()

const current = computed(() => props.images[props.activeIndex])
const showHidden = ref(false)

function prev() {
  if (props.activeIndex > 0) emit('navigate', props.activeIndex - 1)
}

function next() {
  if (props.activeIndex < props.images.length - 1) emit('navigate', props.activeIndex + 1)
}
</script>

<template>
  <!-- Backdrop -->
  <div class="pd-backdrop" @click="emit('close')" />

  <!-- Dialog -->
  <div class="pd">
    <!-- Header -->
    <div class="pd__header">
      <span class="pd__header-title">Photo Gallery</span>
      <PulseButton
        label="Close"
        type="secondary"
        icon="cancel"
        :small="true"
        @click="emit('close')"
      />
    </div>

    <!-- Body -->
    <div class="pd__body">
      <!-- Image side -->
      <div class="pd__image-side">
        <div class="pd__image-wrap">
          <img
            :src="current.src"
            :alt="current.name"
            class="pd__image"
            :class="{ 'pd__image--blurred': current.blurred && !showHidden }"
          />

          <!-- Prev / Next arrows -->
          <button v-if="activeIndex > 0" class="pd__nav pd__nav--prev" @click.stop="prev">
            <PulseIcon icon="previous" size="small" />
          </button>
          <button v-if="activeIndex < images.length - 1" class="pd__nav pd__nav--next" @click.stop="next">
            <PulseIcon icon="next" size="small" />
          </button>

          <!-- Blur toggle chip -->
          <div v-if="current.blurred" class="pd__chip-wrap">
            <PulseChip
              :label="showHidden ? 'Click to hide' : 'Click to unhide'"
              v-model="showHidden"
            />
          </div>
        </div>
      </div>

      <!-- Metadata side -->
      <div class="pd__meta-side">
        <p class="pd__filename">{{ current.name }}</p>
        <p class="pd__meta-row">
          <span class="pd__meta-label">Date:</span>
          {{ current.date }}
          <span class="pd__meta-sep">|</span>
          <span class="pd__meta-label">Uploaded:</span>
          {{ current.uploadedBy }}
        </p>

        <!-- Thumbnail strip -->
        <div class="pd__thumbs">
          <button
            v-for="(img, i) in images"
            :key="img.id"
            class="pd__thumb-btn"
            :class="{ 'pd__thumb-btn--active': i === activeIndex }"
            @click="emit('navigate', i)"
          >
            <img
              :src="img.src"
              :alt="img.name"
              class="pd__thumb-img"
              :class="{ 'pd__thumb-img--blurred': img.blurred }"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="pd__footer">
      <PulseButton
        :label="current.blurred ? 'Remove blur' : 'Blur in gallery'"
        type="secondary"
        @click="emit('blur-toggle', current.id)"
      />
      <PulseButton
        label="Edit Image"
        icon="edit"
        @click="emit('edit', current.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.pd-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 300;
}

.pd {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 660px;
  max-width: 95vw;
  background: #fff;
  border-radius: 10px;
  z-index: 301;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.pd__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--pulse-color-neutral-40);
}

.pd__header-title {
  font-family: 'FS Me', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--pulse-color-neutral-120);
}

.pd__body {
  display: flex;
}

.pd__image-side {
  width: 340px;
  flex-shrink: 0;
  background: var(--pulse-color-neutral-20);
  position: relative;
}

.pd__image-wrap {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.pd__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pd__image--blurred {
  filter: blur(10px);
}

.pd__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s;
}

.pd__nav:hover {
  background: rgba(0, 0, 0, 0.7);
}

.pd__nav--prev { left: 8px; }
.pd__nav--next { right: 8px; }

.pd__chip-wrap {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.pd__meta-side {
  flex: 1;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.pd__filename {
  font-family: 'FS Me', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--pulse-color-neutral-120);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pd__meta-row {
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: var(--pulse-color-neutral-80);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.pd__meta-label {
  color: var(--pulse-color-neutral-100);
  font-weight: 600;
}

.pd__meta-sep {
  color: var(--pulse-color-neutral-50);
}

.pd__thumbs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.pd__thumb-btn {
  width: 46px;
  height: 46px;
  border-radius: 4px;
  overflow: hidden;
  border: 2px solid transparent;
  padding: 0;
  cursor: pointer;
  background: var(--pulse-color-neutral-30);
  transition: border-color 0.12s;
  flex-shrink: 0;
}

.pd__thumb-btn--active {
  border-color: var(--pulse-color-primary-100);
}

.pd__thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pd__thumb-img--blurred {
  filter: blur(4px);
}

.pd__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 16px;
  border-top: 1px solid var(--pulse-color-neutral-40);
}
</style>
