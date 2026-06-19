<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import PulseComponent from '../PulseComponent.vue'
import Galleria from 'primevue/galleria'
import PulsePaginator from '@/components/PulsePaginator/PulsePaginator.vue'
import PulseIcon from '@/components/PulseIcon/PulseIcon.vue'
import PulseButton from '../PulseButton/PulseButton.vue'
import type { PulseGalleryProps } from './PulseGallery.types'

const props = withDefaults(defineProps<PulseGalleryProps>(), {
  rowsPerPage: 9,
})

const activeIndex = ref(0)
const displayCustom = ref(false)

const currentPage = ref(0)

const paginatedThumbnails = computed(() => {
  const start = currentPage.value * props.rowsPerPage
  return props.images.slice(start, start + props.rowsPerPage)
})

const openGallery = (index: number) => {
  activeIndex.value = index
  displayCustom.value = true
}

const closeGallery = () => {
  displayCustom.value = false
}

const prevImage = () => {
  if (activeIndex.value > 0) {
    activeIndex.value -= 1
  }
}

const nextImage = () => {
  if (activeIndex.value < props.images.length - 1) {
    activeIndex.value += 1
  }
}

const hasPrev = computed(() => activeIndex.value > 0)
const hasNext = computed(() => activeIndex.value < props.images.length - 1)

const handlePointerDown = (event: PointerEvent) => {
  if (!displayCustom.value) {
    return
  }

  const target = event.target as Node | null
  if (target && target instanceof Element && target.closest('.pulse-gallery-item')) {
    return
  }

  closeGallery()
}

watch(displayCustom, (visible) => {
  if (visible) {
    document.addEventListener('pointerdown', handlePointerDown)
  } else {
    document.removeEventListener('pointerdown', handlePointerDown)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handlePointerDown)
})

defineExpose({ displayCustom, activeIndex, openGallery, closeGallery, prevImage, nextImage, handlePointerDown })
</script>

<template>
  <PulseComponent>
    <div class="pulse-thumbnails-container">
      <div
        v-if="props.title"
        class="pulse-gallery-title"
      >
        {{ props.title }}
      </div>
      <PulsePaginator
        mode="remote"
        :current-page="currentPage"
        :rows="props.rowsPerPage"
        :total="props.images.length"
        @update:current-page="(page) => (currentPage = page)"
      >
        <template #default>
          <div class="pulse-gallery-grid">
            <button
              v-for="(image, index) in paginatedThumbnails"
              :key="index"
              class="pulse-unstyled-button pulse-gallery-thumb"
              :aria-label="image.title"
              @click="openGallery(index + currentPage * props.rowsPerPage)"
            >
              <img
                :src="image.thumbnailImageSrc"
                :alt="image.alt"
              />
            </button>
          </div>
        </template>
      </PulsePaginator>
    </div>

    <Galleria
      v-model:visible="displayCustom"
      v-model:active-index="activeIndex"
      :value="props.images"
      :show-thumbnails="false"
      :show-indicators="false"
      :show-item-navigators="false"
      :full-screen="true"
      :circular="false"
      :show-close-icon="false"
      :pt="{
        root: { style: 'max-width: 65vw; max-height: 70vh;' },
      }"
    >
      <template #item="slotProps">
        <div class="pulse-gallery-item">
          <div class="pulse-gallery-item-header">
            <h2 class="pulse-gallery-images-title">
              {{ slotProps.item.title }}
            </h2>
            <button
              aria-label="Close Gallery"
              class="pulse-unstyled-button pulse-close-btn"
              @click="closeGallery"
            >
              <PulseIcon
                icon="failure"
                size="xxlarge"
              />
            </button>
          </div>
          <div class="pulse-gallery-item-content">
            <div
              v-if="hasPrev"
              class="pulse-nav-btn pulse-left"
            >
              <PulseButton
                label=""
                icon="previous"
                @click.stop="prevImage"
              />
            </div>
            <div
              v-if="hasNext"
              class="pulse-nav-btn pulse-right"
            >
              <PulseButton
                label=""
                icon="next"
                @click.stop="nextImage"
              />
            </div>

            <div class="pulse-gallery-item-img">
              <img
                :src="slotProps.item.itemImageSrc"
                :alt="slotProps.item.alt"
              />
            </div>
            <div class="pulse-gallery-item-text">
              <p class="pulse-gallery-alt">
                {{ slotProps.item.alt }}
              </p>
              <p
                v-if="slotProps.item.caption"
                class="pulse-gallery-caption"
              >
                {{ slotProps.item.caption }}
              </p>
              <p
                v-if="slotProps.item.metadata"
                class="pulse-gallery-metadata"
              >
                {{ slotProps.item.metadata }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </Galleria>
  </PulseComponent>
</template>

<style scoped>
.pulse-thumbnails-container {
  --pulse-gallery-thumbnail-size: 162.67px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.pulse-gallery-title {
  font-family: 'FS Me';
  font-weight: var(--pulse-font-weight-bold);
  font-size: var(--pulse-font-size-regular);
  line-height: 100%;
  letter-spacing: 0;
  vertical-align: middle;
  color: var(--pulse-color-primary-100);
  padding: var(--pulse-space-2xs);
  margin-bottom: var(--pulse-space-s);
}

.pulse-unstyled-button {
  all: unset;
  cursor: pointer;
}

.pulse-gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, var(--pulse-gallery-thumbnail-size));
  justify-content: center;
  gap: var(--pulse-space-2xs);
  padding: var(--pulse-space-2xs);
}

.pulse-gallery-thumb {
  height: var(--pulse-gallery-thumbnail-size);
  width: var(--pulse-gallery-thumbnail-size);
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  transition: transform 0.25s ease;
}

.pulse-gallery-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.pulse-gallery-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--pulse-space-s);
  background-color: var(--pulse-color-neutral-10);
  color: var(--pulse-color-neutral-70);
}

.pulse-gallery-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--pulse-space-s);
  width: 100%;
  flex-shrink: 0;
  margin-bottom: var(--pulse-space-s);
}

.pulse-gallery-item-content {
  display: flex;
  flex-direction: row;
  gap: var(--pulse-space-s);
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  align-items: flex-start;
}

.pulse-gallery-item-img {
  flex: 0 0 calc(50% - var(--pulse-space-s) / 2);
  max-width: calc(50% - var(--pulse-space-s) / 2);
  min-width: 0;
  height: 565px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--pulse-color-neutral-20);
  border-radius: 8px;
  overflow: hidden;
}

.pulse-gallery-item-img img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
  object-fit: contain;
}

.pulse-gallery-item-text {
  flex: 0 0 calc(50% - var(--pulse-space-s) / 2);
  max-width: calc(50% - var(--pulse-space-s) / 2);
  min-width: 0;
  height: 100%;
  display: flex;
  gap: var(--pulse-space-2xs);
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  overflow-wrap: break-word;
  word-wrap: break-word;
  padding-right: var(--pulse-space-xs);
}

.pulse-gallery-caption {
  font-size: var(--pulse-font-size-caption-regular);
  color: var(--pulse-color-neutral-100);
}

.pulse-gallery-images-title {
  font-family: 'FS Me';
  font-size: var(--pulse-font-size-xlarge);
  font-weight: var(--pulse-font-weight-bold);
  color: var(--pulse-color-primary-100);
  margin: 0;
}

.pulse-close-btn {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  padding: var(--pulse-space-2xs);
  color: var(--pulse-color-primary-110);
}

.pulse-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  --pulse-gallery-arrow-size: 36px;
  --pulse-gallery-icon-size: calc(var(--pulse-gallery-arrow-size) * 0.75);
  z-index: 10;
}

.pulse-nav-btn.pulse-left {
  left: var(--pulse-space-l);
}

.pulse-nav-btn.pulse-right {
  right: var(--pulse-space-l);
}

.pulse-gallery-metadata {
  text-align: left;
  font-size: var(--pulse-font-size-small);
  color: var(--pulse-color-neutral-120);
}

.pulse-gallery-alt {
  text-align: left;
  font-size: var(--pulse-font-size-xlarge);
  color: var(--pulse-color-primary-100);
  margin: var(--pulse-space-xs) 0 0;
  font-weight: var(--pulse-font-weight-bold);
}

.pulse-nav-btn :deep(.p-button) {
  border: none;
  border-radius: var(--pulse-space-3xl);
  background-color: var(--pulse-color-primary-120);
  width: var(--pulse-gallery-arrow-size);
  height: var(--pulse-gallery-arrow-size);
  min-width: var(--pulse-gallery-arrow-size);
  max-width: var(--pulse-gallery-arrow-size);
  aspect-ratio: 1 / 1;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
}

.pulse-nav-btn :deep(.pulse-icon) {
  font-size: var(--pulse-gallery-icon-size);
}

.pulse-nav-btn :deep(.p-button:hover),
.pulse-nav-btn :deep(.p-button:focus),
.pulse-nav-btn :deep(.p-button:active) {
  border: none;
  background-color: var(--pulse-color-primary-120);
  box-shadow: none;
}

/* Mobile responsive layout */
@media (max-width: 1092px) {
  .pulse-gallery-item {
    width: 95vw;
    height: 90vh;
    max-height: 90vh;
    overflow: auto;
  }

  .pulse-gallery-item-content {
    flex-direction: column;
    flex: none;
    height: auto;
    min-height: min-content;
  }

  .pulse-gallery-item-img {
    flex: 0 0 auto;
    max-width: 100%;
    width: 100%;
    height: auto;
    min-height: 300px;
    max-height: 60vh;
  }

  .pulse-gallery-item-text {
    flex: 0 0 auto;
    max-width: 100%;
    width: 100%;
    padding-right: 0;
  }

  .pulse-nav-btn.pulse-left {
    left: var(--pulse-space-xs);
  }

  .pulse-nav-btn.pulse-right {
    right: var(--pulse-space-xs);
  }
}
</style>

<style>
.p-galleria-close-button {
  display: none !important;
}
</style>
