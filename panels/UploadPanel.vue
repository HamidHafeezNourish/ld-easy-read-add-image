<script setup lang="ts">
import { ref } from 'vue'
import type { GalleryImage } from '../App.vue'
import PulseDrawer from '@/components/PulseDrawer/PulseDrawer.vue'
import PulseButton from '@/components/PulseButton/PulseButton.vue'
import PulseIcon from '@/components/PulseIcon/PulseIcon.vue'

const emit = defineEmits<{
  close: []
  uploaded: [images: GalleryImage[]]
}>()

type StagedFile = {
  id: string
  src: string
  name: string
  size: number
  blurred: boolean
}

const staged = ref<StagedFile[]>([])
const isDragOver = ref(false)

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files) processFiles(input.files)
  input.value = ''
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  isDragOver.value = false
  if (e.dataTransfer?.files) processFiles(e.dataTransfer.files)
}

function processFiles(files: FileList) {
  Array.from(files).forEach((file) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      staged.value.push({
        id: crypto.randomUUID(),
        src: ev.target!.result as string,
        name: file.name,
        size: file.size,
        blurred: false,
      })
    }
    reader.readAsDataURL(file)
  })
}

function removeStaged(id: string) {
  staged.value = staged.value.filter(f => f.id !== id)
}

function formatSize(bytes: number): string {
  return (bytes / 1024).toFixed(0) + ' KB'
}

function upload() {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  const images: GalleryImage[] = staged.value.map(f => ({
    id: f.id,
    src: f.src,
    name: f.name,
    size: f.size,
    blurred: f.blurred,
    date: dateStr,
    uploadedBy: 'Karim Bennett',
  }))
  emit('uploaded', images)
}
</script>

<template>
  <PulseDrawer
    :visible="true"
    position="right"
    title="Upload image"
    breadcrumb="Back to Image Gallery"
    :breadcrumb-callback="() => emit('close')"
    @update:visible="(v) => { if (!v) emit('close') }"
  >
    <div class="up__body">

      <!-- Drop zone -->
      <div
        v-if="!staged.length"
        class="up__dropzone"
        :class="{ 'up__dropzone--over': isDragOver }"
        @dragover.prevent="isDragOver = true"
        @dragleave="isDragOver = false"
        @drop="onDrop"
      >
        <PulseIcon icon="upload" size="xxxlarge" class="up__dz-icon" />
        <p class="up__dz-text">{{ isDragOver ? 'Release to add' : 'Drag images here' }}</p>
        <p class="up__dz-or">or</p>

        <!-- Invisible file input overlaid on the Browse button -->
        <div class="up__trigger-wrap">
          <PulseButton label="Browse files" type="secondary" />
          <input
            type="file"
            accept="image/*"
            multiple
            class="up__input-overlay"
            @change="onFileChange"
          />
        </div>
      </div>

      <!-- Staged file list -->
      <template v-else>
        <ul class="up__file-list">
          <li
            v-for="file in staged"
            :key="file.id"
            class="up__file-row"
          >
            <img :src="file.src" :alt="file.name" class="up__thumb" />
            <div class="up__file-info">
              <p class="up__file-name">{{ file.name }}</p>
              <p class="up__file-size">{{ formatSize(file.size) }}</p>
              <label class="up__blur-label">
                <input v-model="file.blurred" type="checkbox" class="up__blur-check" />
                Blur image in gallery
              </label>
            </div>
            <PulseButton
              label="Delete"
              type="secondary"
              icon="delete"
              :small="true"
              @click="removeStaged(file.id)"
            />
          </li>
        </ul>

        <!-- Add more — same overlay trick -->
        <div class="up__trigger-wrap up__trigger-wrap--small">
          <PulseButton label="Add more images" type="secondary" icon="plus" :small="true" />
          <input
            type="file"
            accept="image/*"
            multiple
            class="up__input-overlay"
            @change="onFileChange"
          />
        </div>
      </template>
    </div>

    <!-- Footer -->
    <div class="up__footer">
      <PulseButton
        label="Close"
        type="secondary"
        :full-width="true"
        @click="emit('close')"
      />

      <!-- "Choose image" when nothing staged: overlay input on the button -->
      <div v-if="!staged.length" class="up__trigger-wrap up__trigger-wrap--full">
        <PulseButton label="Choose image" icon="upload" :full-width="true" />
        <input
          type="file"
          accept="image/*"
          multiple
          class="up__input-overlay"
          @change="onFileChange"
        />
      </div>

      <!-- "Upload image" when files are staged: normal button -->
      <PulseButton
        v-else
        label="Upload image"
        icon="upload"
        :full-width="true"
        @click="upload"
      />
    </div>
  </PulseDrawer>
</template>

<style scoped>
.up__body {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0 0;
}

/* Overlay wrapper — the invisible input sits on top of the button */
.up__trigger-wrap {
  position: relative;
  display: inline-block;
}

.up__trigger-wrap--small {
  margin-top: 12px;
}

.up__trigger-wrap--full {
  flex: 1;
}

.up__input-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  font-size: 0;
}

/* Drop zone */
.up__dropzone {
  border: 2px dashed var(--pulse-color-neutral-60);
  border-radius: 10px;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  transition: border-color 0.2s, background 0.2s;
}

.up__dropzone--over {
  border-color: var(--pulse-color-primary-80);
  background: var(--pulse-color-primary-20);
}

.up__dz-icon {
  color: var(--pulse-color-primary-80);
  opacity: 0.6;
}

.up__dz-text {
  font-family: 'FS Me', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--pulse-color-neutral-100);
  margin: 0;
}

.up__dz-or {
  font-size: 13px;
  color: var(--pulse-color-neutral-70);
  margin: 0;
}

/* File list */
.up__file-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.up__file-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--pulse-color-neutral-30);
}

.up__thumb {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.up__file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.up__file-name {
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--pulse-color-neutral-120);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.up__file-size {
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: var(--pulse-color-neutral-80);
  margin: 0;
}

.up__blur-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: var(--pulse-color-neutral-100);
  cursor: pointer;
  margin-top: 4px;
}

.up__blur-check {
  width: 14px;
  height: 14px;
  cursor: pointer;
  accent-color: var(--pulse-color-primary-100);
}

/* Footer */
.up__footer {
  display: flex;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid var(--pulse-color-neutral-40);
  margin-top: auto;
}
</style>
