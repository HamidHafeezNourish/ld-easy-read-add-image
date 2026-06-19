<script setup lang="ts">
import { ref } from 'vue'
import PulseDrawer from '@/components/PulseDrawer/PulseDrawer.vue'
import PulseButton from '@/components/PulseButton/PulseButton.vue'

const props = defineProps<{
  sectionTitle: string
  defaultText: string
}>()

const emit = defineEmits<{
  close: []
  save: [lines: string[]]
}>()

const needName = ref('')
const imageFile = ref<File | null>(null)
const imagePreview = ref<string | null>(null)
const editorRef = ref<HTMLDivElement | null>(null)

function onImageChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0] ?? null
  imageFile.value = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (ev) => { imagePreview.value = ev.target?.result as string }
    reader.readAsDataURL(file)
  } else {
    imagePreview.value = null
  }
}

function removeImage() {
  imageFile.value = null
  imagePreview.value = null
}

function formatBytes(bytes: number) {
  return (bytes / 1024).toFixed(3) + ' KB'
}

function applyFormat(cmd: string) {
  document.execCommand(cmd, false)
  editorRef.value?.focus()
}

function onSave() {
  const text = editorRef.value?.innerText ?? props.defaultText
  emit('save', text.split('\n').filter(l => l.trim()))
}
</script>

<template>
  <PulseDrawer
    :visible="true"
    position="right"
    :title="`Easy Read for ${props.sectionTitle}`"
    @update:visible="(v) => { if (!v) emit('close') }"
  >
    <div class="eerp__body">

      <!-- Need Name -->
      <div class="eerp__section">
        <label class="eerp__label">Need Name</label>
        <input
          v-model="needName"
          type="text"
          class="eerp__text-input"
          placeholder="Type here..."
        />
      </div>

      <!-- Image -->
      <div class="eerp__section">
        <label class="eerp__label">Image</label>

        <div v-if="imagePreview && imageFile" class="eerp__image-row">
          <img :src="imagePreview" class="eerp__thumb" :alt="imageFile.name" />
          <div class="eerp__image-meta">
            <p class="eerp__image-name">{{ imageFile.name }}</p>
            <p class="eerp__image-size">{{ formatBytes(imageFile.size) }}</p>
            <button class="eerp__delete-btn" @click="removeImage">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              Delete
            </button>
          </div>
        </div>

        <label v-else class="eerp__upload-zone">
          <input type="file" accept="image/*" class="eerp__file-input" @change="onImageChange" />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" class="eerp__upload-icon">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span class="eerp__upload-label">Click to upload image</span>
          <span class="eerp__upload-hint">PNG, JPG up to 10MB</span>
        </label>
      </div>

      <!-- Easy Read description -->
      <div class="eerp__section eerp__section--editor">
        <label class="eerp__label-sm">Easy Read description</label>
        <div class="eerp__editor-wrap">
          <div class="eerp__toolbar">
            <select class="eerp__select">
              <option>Small</option><option>Medium</option><option>Large</option>
            </select>
            <select class="eerp__select">
              <option>Sans Serif</option><option>Serif</option>
            </select>
            <div class="eerp__sep" />
            <button class="eerp__fmt" title="Bold" @click="applyFormat('bold')"><b>B</b></button>
            <button class="eerp__fmt eerp__fmt--i" title="Italic" @click="applyFormat('italic')">I</button>
            <button class="eerp__fmt eerp__fmt--u" title="Underline" @click="applyFormat('underline')">U</button>
            <div class="eerp__sep" />
            <button class="eerp__fmt" title="Bullet list" @click="applyFormat('insertUnorderedList')">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><circle cx="2" cy="4" r="1.5"/><rect x="5" y="3" width="10" height="2" rx="1"/><circle cx="2" cy="8" r="1.5"/><rect x="5" y="7" width="10" height="2" rx="1"/><circle cx="2" cy="12" r="1.5"/><rect x="5" y="11" width="10" height="2" rx="1"/></svg>
            </button>
            <button class="eerp__fmt" title="Numbered list" @click="applyFormat('insertOrderedList')">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><rect x="5" y="3" width="10" height="2" rx="1"/><rect x="5" y="7" width="10" height="2" rx="1"/><rect x="5" y="11" width="10" height="2" rx="1"/><text x="0" y="5" font-size="4.5" font-family="sans-serif">1.</text><text x="0" y="9" font-size="4.5" font-family="sans-serif">2.</text><text x="0" y="13" font-size="4.5" font-family="sans-serif">3.</text></svg>
            </button>
          </div>
          <div
            ref="editorRef"
            class="eerp__editor"
            contenteditable="true"
          >{{ props.defaultText }}</div>
        </div>
      </div>

    </div>

    <div class="eerp__footer">
      <PulseButton label="Cancel" type="secondary" :full-width="true" @click="emit('close')" />
      <PulseButton label="Save" type="primary" :full-width="true" @click="onSave" />
    </div>
  </PulseDrawer>
</template>

<style scoped>
.eerp__body {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.eerp__section {
  padding: 20px 0;
  border-bottom: 1px solid var(--pulse-color-neutral-30);
}

.eerp__section:last-child {
  border-bottom: none;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.eerp__section--editor {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.eerp__label {
  display: block;
  font-family: 'FS Me', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #36393f;
  margin-bottom: 12px;
}

.eerp__label-sm {
  display: block;
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: #36393f;
  margin-bottom: 10px;
}

.eerp__text-input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border: 1px solid var(--pulse-color-neutral-40);
  border-radius: 6px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #36393f;
  outline: none;
}

.eerp__text-input:focus {
  border-color: var(--pulse-color-primary-100);
}

.eerp__text-input::placeholder {
  color: #9ca3af;
}

/* Image upload */
.eerp__upload-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  border: 2px dashed var(--pulse-color-neutral-40);
  border-radius: 8px;
  padding: 24px;
  cursor: pointer;
  background: #fafafa;
  transition: border-color 0.15s;
}

.eerp__upload-zone:hover {
  border-color: var(--pulse-color-primary-100);
}

.eerp__file-input { display: none; }

.eerp__upload-icon { color: #9ca3af; }

.eerp__upload-label {
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--pulse-color-primary-100);
}

.eerp__upload-hint {
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: #9ca3af;
}

.eerp__image-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.eerp__thumb {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
  border: 1px solid var(--pulse-color-neutral-30);
}

.eerp__image-meta {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.eerp__image-name {
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #36393f;
  margin: 0;
  word-break: break-all;
}

.eerp__image-size {
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: #6c727e;
  margin: 0;
}

.eerp__delete-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  background: #fee2e2;
  color: #b60000;
  border: none;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

/* Editor */
.eerp__editor-wrap {
  border: 1px solid var(--pulse-color-neutral-40);
  border-radius: 6px;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.eerp__toolbar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 5px 8px;
  border-bottom: 1px solid var(--pulse-color-neutral-30);
  background: #f9fafb;
  flex-wrap: wrap;
}

.eerp__select {
  padding: 3px 5px;
  border: 1px solid var(--pulse-color-neutral-30);
  border-radius: 4px;
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: #36393f;
  background: #fff;
  cursor: pointer;
  outline: none;
}

.eerp__sep {
  width: 1px;
  height: 16px;
  background: var(--pulse-color-neutral-30);
  margin: 0 3px;
}

.eerp__fmt {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  border-radius: 3px;
  cursor: pointer;
  color: #36393f;
  font-family: Inter, sans-serif;
  font-size: 13px;
}

.eerp__fmt:hover { background: var(--pulse-color-neutral-20); }
.eerp__fmt--i { font-style: italic; font-family: Georgia, serif; }
.eerp__fmt--u { text-decoration: underline; }

.eerp__editor {
  flex: 1;
  min-height: 160px;
  padding: 12px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #36393f;
  line-height: 1.6;
  outline: none;
  background: #f0f9ff;
  white-space: pre-wrap;
}

.eerp__editor:focus { background: #fff; }

.eerp__footer {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--pulse-color-neutral-40);
  flex-shrink: 0;
}
</style>
