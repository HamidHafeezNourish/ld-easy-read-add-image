<script setup lang="ts">
import type { GalleryImage } from '../App.vue'
import PulseButton from '@/components/PulseButton/PulseButton.vue'
import PulseCard from '@/components/PulseCard/PulseCard.vue'

defineProps<{
  images: GalleryImage[]
}>()

const emit = defineEmits<{
  'add-image': []
  'view-image': [index: number]
}>()
</script>

<template>
  <div class="ig-content">
    <!-- Header row -->
    <div class="ig-content__header">
      <h1 class="ig-content__title">Image Gallery</h1>
      <PulseButton
        label="Add Image"
        icon="plus"
        @click="emit('add-image')"
      />
    </div>

    <!-- Empty state via PulseCard -->
    <div v-if="!images.length" class="ig-content__empty-wrap">
      <PulseCard
        title="Image Gallery"
        :empty="true"
        empty-title="No Images"
        empty-action="There are currently no images uploaded to this profile"
      >
        <template #empty-state-actions>
          <PulseButton
            label="Add Image"
            icon="plus"
            @click="emit('add-image')"
          />
        </template>
      </PulseCard>
    </div>

    <!-- Photo grid -->
    <div v-else class="ig-content__grid-wrap">
      <p class="ig-content__count">Photo Journey ({{ images.length }})</p>
      <div class="ig-content__grid">
        <button
          v-for="(img, i) in images"
          :key="img.id"
          class="ig-content__tile"
          @click="emit('view-image', i)"
        >
          <img
            :src="img.src"
            :alt="img.name"
            class="ig-content__tile-img"
            :class="{ 'ig-content__tile-img--blurred': img.blurred }"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ig-content {
  flex: 1;
  padding: 24px 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.ig-content__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ig-content__title {
  font-family: 'FS Me', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--pulse-color-neutral-120);
  margin: 0;
}

.ig-content__empty-wrap {
  flex: 1;
}

/* Grid */
.ig-content__grid-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ig-content__count {
  font-family: 'FS Me', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--pulse-color-neutral-100);
  margin: 0;
}

.ig-content__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}

.ig-content__tile {
  aspect-ratio: 1;
  border: none;
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: var(--pulse-color-neutral-40);
  transition: opacity 0.15s;
}

.ig-content__tile:hover {
  opacity: 0.88;
}

.ig-content__tile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ig-content__tile-img--blurred {
  filter: blur(8px);
}
</style>
