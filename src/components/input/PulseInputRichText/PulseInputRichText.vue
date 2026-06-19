<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Editor from 'primevue/editor'
import PulseComponent from '../../PulseComponent.vue'
import PulseInputWrapper from '../PulseInputWrapper.vue'
import type { PulseInputRichTextProps, PulseInputRichTextValue } from './PulseInputRichText.types'
import { inputDefaultProps } from '../inputDefaults'

const props = withDefaults(defineProps<PulseInputRichTextProps>(), {
  ...inputDefaultProps,
  editorStyle: 'height: 210px',
})

const model = defineModel<PulseInputRichTextValue>({ default: '' })

type QuillInstance = {
  getFormat: () => Record<string, unknown>
  format: (name: string, value: unknown) => void
  focus: () => void
}

const editorRef = ref<InstanceType<typeof Editor> | null>(null)
const quillInstance = ref<QuillInstance | null>(null)

const handleInput = (newValue: PulseInputRichTextValue) => {
  model.value = newValue
}

const isFocused = ref(false)

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}

const getPlainTextLength = (html?: PulseInputRichTextValue | null): number => {
  if (!html) return 0
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const text = doc.body.textContent || ''
  return text.length
}

const plainTextLength = computed(() => getPlainTextLength(model.value))

const characterLimitExceeded = computed(() => {
  if (!props.maxlength) return false
  return plainTextLength.value > props.maxlength
})

const charactersOver = computed(() => {
  if (!characterLimitExceeded.value) return 0
  return plainTextLength.value - (props.maxlength ?? 0)
})

const hasError = computed(() => characterLimitExceeded.value || hasUnsupportedStyling.value)

const UNSUPPORTED_TAGS = ['font']
const UNSUPPORTED_STYLE_PROPS = ['color', 'background-color', 'background', 'font-size', 'font-family']

const hasUnsupportedStyling = computed(() => {
  if (!props.minimalStyling || !model.value) return false
  const doc = new DOMParser().parseFromString(model.value, 'text/html')

  // Check for unsupported tags
  for (const tag of UNSUPPORTED_TAGS) {
    if (doc.body.querySelector(tag)) return true
  }

  // Walk all elements and check inline styles
  const allElements = doc.body.querySelectorAll('*')
  for (const el of allElements) {
    const htmlEl = el as HTMLElement
    const style = htmlEl.style
    if (!style) continue
    for (const prop of UNSUPPORTED_STYLE_PROPS) {
      if (style.getPropertyValue(prop)) return true
    }
    // Also catch Quill's class-based color/background (e.g. ql-color-red)
    const classList = Array.from(htmlEl.classList)
    if (classList.some((c) => /^ql-(color|bg|background)/.test(c))) return true
  }

  // Check for Quill span attributes that carry color/background
  for (const span of doc.body.querySelectorAll('span[style]')) {
    const s = (span as HTMLElement).getAttribute('style') || ''
    if (/color|background/.test(s)) return true
  }

  return false
})

const unsupportedStylingError = computed(() =>
  hasUnsupportedStyling.value ? 'Unsupported Styling, some styling might be lost on saving.' : undefined,
)

const resolveQuill = () => {
  const fromRef = (editorRef.value as unknown as { getQuill?: () => QuillInstance })?.getQuill?.()
  if (fromRef) return fromRef
  const editorElement = document.getElementById(props.inputId)
  const fromDom = (editorElement?.querySelector('.ql-editor') as unknown as { __quill?: QuillInstance })?.__quill
  return fromDom ?? null
}

const applyList = (listType: 'ordered' | 'bullet') => {
  const quill = resolveQuill()
  if (!quill) return
  const current = quill.getFormat()?.list
  const nextValue = current === listType ? false : listType
  quill.format('list', nextValue)
  quill.focus()
}

onMounted(() => {
  setTimeout(() => {
    const editorElement = document.getElementById(props.inputId)
    if (editorElement) {
      const quillEditor = editorElement.querySelector('.ql-editor')
      if (quillEditor) {
        quillEditor.addEventListener('focus', handleFocus)
        quillEditor.addEventListener('blur', handleBlur)
      }
    }
    quillInstance.value = resolveQuill()
  }, 100)
})

onUnmounted(() => {
  const editorElement = document.getElementById(props.inputId)
  if (editorElement) {
    const quillEditor = editorElement.querySelector('.ql-editor')
    if (quillEditor) {
      quillEditor.removeEventListener('focus', handleFocus)
      quillEditor.removeEventListener('blur', handleBlur)
    }
  }
})
</script>

<template>
  <PulseComponent>
    <PulseInputWrapper
      v-slot="{ value, onBlur, error: submissionError }"
      v-model="model"
      :input-id="inputId"
      :label="label"
      :label-icon="labelIcon"
      :hint="hint"
      :icon="icon"
      :required="required"
      :disabled="disabled"
      :error="unsupportedStylingError ?? error"
      :full-width="fullWidth"
      :size="size"
    >
      <div
        class="pulse-editor-field-wrapper"
        :class="{
          'pulse-has-error': hasError || submissionError,
          'pulse-is-focused': isFocused,
          'pulse-is-disabled': disabled,
        }"
      >
        <Editor
          :id="inputId"
          ref="editorRef"
          :model-value="value"
          :placeholder="placeholder"
          :editor-style="editorStyle"
          :readonly="readonly"
          :disabled="disabled"
          @update:model-value="handleInput"
          @focus="handleFocus"
          @blur="
            () => {
              handleBlur()
              onBlur()
            }
          "
        >
          <template #toolbar>
            <span
              v-if="showFontSize"
              class="ql-formats"
            >
              <select class="ql-size">
                <option value="small">Small</option>
                <option selected>Normal</option>
                <option value="large">Large</option>
                <option value="huge">Huge</option>
              </select>
            </span>
            <span
              v-if="showFontFamily"
              class="ql-formats"
            >
              <select class="ql-font">
                <option selected>Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </span>
            <span class="ql-formats">
              <button class="ql-bold" />
              <button class="ql-italic" />
              <button class="ql-underline" />
              <button
                class="ql-list"
                value="bullet"
                type="button"
                @mousedown.stop.prevent
                @click.stop.prevent="applyList('bullet')"
              />
              <button
                class="ql-list"
                value="ordered"
                type="button"
                @mousedown.stop.prevent
                @click.stop.prevent="applyList('ordered')"
              />
            </span>
          </template>
        </Editor>
      </div>
      <div
        v-if="characterLimitExceeded"
        class="pulse-character-limit-error"
      >
        <span class="pulse-error-icon">!</span>
        <span class="pulse-error-message">Shorten text by {{ charactersOver }} characters</span>
      </div>
      <div
        v-if="maxlength"
        class="pulse-character-count"
      >
        {{ getPlainTextLength(value) }} / {{ maxlength }} characters used
      </div>
    </PulseInputWrapper>
  </PulseComponent>
</template>

<style scoped>
.pulse-editor-field-wrapper {
  border-radius: var(--pulse-space-xs);
  border: 1px solid transparent;
  position: relative;
}

.pulse-editor-field-wrapper.pulse-is-focused {
  outline: 2px solid var(--pulse-color-primary-70);
  outline-offset: 2px;
}

.pulse-editor-field-wrapper.pulse-has-error {
  border-color: var(--pulse-color-error-70);
}

.pulse-editor-field-wrapper.pulse-is-focused.pulse-has-error {
  border-color: var(--pulse-color-error-70);
  outline: 2px solid var(--pulse-color-primary-70);
  outline-offset: 2px;
}

.pulse-character-count {
  color: var(--pulse-color-neutral-100);
  font-size: var(--pulse-font-size-caption-small);
  margin-top: var(--pulse-space-xs);
}

.pulse-character-limit-error {
  display: flex;
  gap: 4px;
  align-items: center;
  margin-top: var(--pulse-space-xs);
  background-color: var(--pulse-color-error-10);
  padding: 4px 8px;
  border-radius: 4px;
}

.pulse-character-limit-error .pulse-error-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background-color: var(--pulse-color-error-70);
  color: var(--pulse-color-neutral-10);
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
}

.pulse-character-limit-error .pulse-error-message {
  color: var(--pulse-color-neutral-120);
  font-size: var(--pulse-font-size-caption-small);
}

:deep(.p-editor-toolbar) {
  background: var(--pulse-color-neutral-10);
  border: 1px solid var(--pulse-color-neutral-30);
  border-bottom: none;
  border-top-left-radius: var(--pulse-space-xs);
  border-top-right-radius: var(--pulse-space-xs);
  padding: 10.5px 14px;
  gap: 14px;
  display: flex;
  align-items: center;
}

.pulse-editor-field-wrapper :deep(.p-editor-toolbar) {
  border: none;
  border-bottom: 1px solid var(--pulse-color-neutral-30);
}

:deep(.p-editor-content) {
  border: 1px solid var(--pulse-color-neutral-30);
  border-top: none;
  border-bottom-left-radius: var(--pulse-space-xs);
  border-bottom-right-radius: var(--pulse-space-xs);
}

.pulse-editor-field-wrapper :deep(.p-editor-content) {
  border: none;
}

:deep(.p-editor-content .ql-editor) {
  background: var(--pulse-color-neutral-10);
  color: var(--pulse-color-neutral-120);
  font-size: var(--pulse-font-size-caption-regular);
  font-weight: var(--pulse-font-weight-regular);
  line-height: 1.5;
  padding: 14px;
}

:deep(.p-editor-content .ql-editor:not(.ql-blank)) {
  background: var(--pulse-color-primary-10);
}

:deep(.p-editor-content .ql-editor.ql-blank::before) {
  color: var(--pulse-color-neutral-90);
  font-style: normal;
  font-size: var(--pulse-font-size-caption-regular);
}

:deep(.p-editor-content .ql-editor ol),
:deep(.p-editor-content .ql-editor ul) {
  margin: 0;
  padding-left: 0;
  list-style-position: inside;
}

:deep(.p-editor-content .ql-editor li[data-list='ordered']) {
  list-style-type: decimal;
}

:deep(.p-editor-content .ql-editor li[data-list='bullet']) {
  list-style-type: disc;
}

:deep(.p-editor-content .ql-editor li[data-list='ordered']::before),
:deep(.p-editor-content .ql-editor li[data-list='bullet']::before) {
  content: '' !important;
  display: none !important;
}

.pulse-editor-field-wrapper.pulse-is-focused :deep(.p-editor-content .ql-editor) {
  background: var(--pulse-color-primary-10);
}

:deep(.p-editor-content:focus-within .ql-editor) {
  outline: none;
}

.pulse-editor-field-wrapper.pulse-is-disabled :deep(.p-editor-toolbar) {
  background: var(--pulse-color-neutral-30);
  opacity: 0.6;
  pointer-events: none;
}

.pulse-editor-field-wrapper.pulse-is-disabled :deep(.p-editor-content .ql-editor) {
  background: var(--pulse-color-neutral-30);
  color: var(--pulse-color-neutral-90);
  cursor: not-allowed;
  pointer-events: none;
}

.pulse-editor-field-wrapper.pulse-is-disabled :deep(.p-editor-content) {
  border-color: var(--pulse-color-neutral-30);
}

:deep(.p-editor-container.p-disabled .p-editor-toolbar) {
  background: var(--pulse-color-neutral-30);
  opacity: 0.6;
  pointer-events: none;
}

:deep(.p-editor-container.p-disabled .p-editor-content .ql-editor) {
  background: var(--pulse-color-neutral-30);
  color: var(--pulse-color-neutral-90);
  cursor: not-allowed;
  pointer-events: none;
}

:deep(.p-editor-container.p-disabled .p-editor-content) {
  border-color: var(--pulse-color-neutral-30);
}

:deep(.p-editor-content .ql-editor[contenteditable='false']) {
  background: var(--pulse-color-neutral-20);
  cursor: default;
}

:deep(.ql-toolbar .ql-picker-label) {
  color: var(--pulse-color-neutral-110);
  font-size: var(--pulse-font-size-caption-regular);
  font-weight: var(--pulse-font-weight-regular);
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

:deep(.ql-toolbar .ql-picker-options) {
  background: var(--pulse-color-neutral-10);
  border: 1px solid var(--pulse-color-neutral-30);
  border-radius: var(--pulse-space-xs);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 4px 0;
}

:deep(.ql-toolbar .ql-picker-item) {
  color: var(--pulse-color-neutral-110);
  padding: 6px 12px;
}

:deep(.ql-toolbar .ql-picker-item:hover) {
  background: var(--pulse-color-neutral-30);
  color: var(--pulse-color-neutral-120);
}

:deep(.ql-toolbar .ql-picker-item.ql-selected) {
  color: var(--pulse-color-primary-70);
}

:deep(.ql-toolbar button) {
  width: 24px !important;
  height: 24px !important;
  padding: 0 !important;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.15s ease;
}

:deep(.ql-toolbar button svg) {
  width: 24px;
  height: 24px;
}

:deep(.ql-toolbar .ql-stroke) {
  stroke: var(--pulse-color-neutral-110);
  transition: stroke 0.15s ease;
}

:deep(.ql-toolbar .ql-fill) {
  fill: var(--pulse-color-neutral-110);
  transition: fill 0.15s ease;
}

:deep(.ql-toolbar button:hover) {
  background: var(--pulse-color-primary-100) !important;
}

:deep(.ql-toolbar button:hover .ql-stroke) {
  stroke: var(--pulse-color-neutral-10) !important;
  stroke-width: 1.5px !important;
}

:deep(.ql-toolbar button:hover .ql-fill) {
  fill: var(--pulse-color-neutral-10) !important;
}

:deep(.ql-toolbar button:hover svg) {
  color: var(--pulse-color-neutral-10) !important;
}

:deep(.ql-toolbar button.ql-active) {
  background: var(--pulse-color-primary-110) !important;
}

:deep(.ql-toolbar button.ql-active .ql-stroke) {
  stroke: var(--pulse-color-neutral-10) !important;
  stroke-width: 1.5px !important;
}

:deep(.ql-toolbar button.ql-active .ql-fill) {
  fill: var(--pulse-color-neutral-10) !important;
}

:deep(.ql-toolbar button.ql-active svg) {
  color: var(--pulse-color-neutral-10) !important;
}

:deep(.ql-toolbar .ql-formats) {
  margin-right: 0;
  display: flex;
  gap: 14px;
  align-items: center;
}

:deep(.ql-toolbar .ql-formats:not(:last-child)) {
  margin-right: 14px;
}

:deep(.ql-toolbar .ql-picker-label::after) {
  margin-left: 4px;
}

:deep(.ql-toolbar .ql-picker.ql-expanded .ql-picker-label) {
  color: var(--pulse-color-primary-70);
}
</style>
