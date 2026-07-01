<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import PulseButton from '@/components/PulseButton/PulseButton.vue'

interface GalleryImage { label: string; src: string; page: string }

const props = defineProps<{
  images: GalleryImage[]
  activeIndex: number
}>()

const emit = defineEmits<{
  close: []
  select: [image: GalleryImage]
  viewPage: [page: string]
  navigate: [index: number]
}>()

const thumbnailsRef = ref<HTMLElement | null>(null)
const current = computed(() => props.images[props.activeIndex])

function prev() {
  if (props.activeIndex > 0) emit('navigate', props.activeIndex - 1)
}

function next() {
  if (props.activeIndex < props.images.length - 1) emit('navigate', props.activeIndex + 1)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'Escape') emit('close')
}

watch(() => props.activeIndex, async () => {
  await nextTick()
  const el = thumbnailsRef.value?.querySelector<HTMLElement>('.igm__thumb--active')
  el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
})
</script>

<template>
  <Teleport to="body">
    <div class="igm__overlay" @click.self="emit('close')" @keydown="onKeydown" tabindex="-1">
      <div class="igm__card">

        <!-- Header -->
        <div class="igm__header">
          <p class="igm__title">Photo Gallery</p>
          <button class="igm__close" @click="emit('close')" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#36393f" stroke-width="1.5"/>
              <path d="M8 8l8 8M16 8l-8 8" stroke="#36393f" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="igm__body">

          <!-- Left: large image + arrows -->
          <div class="igm__image-wrap">
            <img :src="current.src" :alt="current.label" class="igm__main-image" />
            <button class="igm__arrow igm__arrow--prev" :disabled="activeIndex === 0" @click="prev" aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="igm__arrow igm__arrow--next" :disabled="activeIndex === images.length - 1" @click="next" aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <!-- Right: details + thumbnails + CTAs -->
          <div class="igm__details">

            <p class="igm__image-title">{{ current.label }}</p>

            <div class="igm__meta">
              <span class="igm__meta-key">Date:</span>
              <span class="igm__meta-val">10 Jun 2025</span>
              <span class="igm__meta-sep">｜</span>
              <span class="igm__meta-key">By:</span>
              <span class="igm__meta-val">Care Team</span>
            </div>

            <p class="igm__body-text">Select this image to use it in the easy read, or view the original care plan it was sourced from.</p>

            <!-- Thumbnail strip -->
            <div class="igm__thumbs" ref="thumbnailsRef">
              <button
                v-for="(img, i) in images"
                :key="i"
                class="igm__thumb"
                :class="{ 'igm__thumb--active': i === activeIndex }"
                @click="emit('navigate', i)"
              >
                <img :src="img.src" :alt="img.label" class="igm__thumb-img" />
              </button>
            </div>

            <!-- CTAs -->
            <div class="igm__actions">
              <PulseButton
                label="Add to Easy Read"
                type="primary"
                :full-width="true"
                @click="emit('select', current)"
              />
              <PulseButton
                label="View original care plan"
                type="secondary"
                :full-width="true"
                @click="emit('viewPage', current.page)"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.igm__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
}

.igm__card {
  background: #fff;
  border: 1px solid #f3f4f5;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  max-height: calc(100vh - 48px);
  overflow: hidden;
}

/* Header */
.igm__header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.igm__title {
  flex: 1;
  font-family: 'FS Me', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #2b5656;
  margin: 0;
}

.igm__close {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.12s;
}

.igm__close:hover { background: #f3f4f5; }

/* Body: image left + details right */
.igm__body {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  min-height: 0;
}

/* Left image area */
.igm__image-wrap {
  position: relative;
  flex: 1;
  min-width: 0;
  aspect-ratio: 1;
  border-radius: 4px;
  overflow: hidden;
  background: #f9f9fa;
}

.igm__main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 4px;
}

.igm__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #172f2f;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.12s;
  z-index: 1;
}

.igm__arrow:disabled { opacity: 0.35; cursor: default; }
.igm__arrow:not(:disabled):hover { background: #2b5656; }
.igm__arrow--prev { left: 10px; }
.igm__arrow--next { right: 10px; }

/* Right details */
.igm__details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.igm__image-title {
  font-family: 'FS Me', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #2b5656;
  margin: 0;
  line-height: 1.2;
}

.igm__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: #6c727e;
}

.igm__meta-key { font-weight: 500; }
.igm__meta-val { font-weight: 400; }
.igm__meta-sep { color: #6c727e; }

.igm__body-text {
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #36393f;
  line-height: 21.4px;
  margin: 0;
}

/* Thumbnail strip */
.igm__thumbs {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
}

.igm__thumbs::-webkit-scrollbar { display: none; }

.igm__thumb {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 4px;
  border: 2px solid transparent;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: #f9f9fa;
  transition: border-color 0.12s;
}

.igm__thumb:hover { border-color: #6c727e; }
.igm__thumb--active { border-color: #3e7e7e; }

.igm__thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* CTAs */
.igm__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}
</style>
