<script setup lang="ts">
import { provide, nextTick } from 'vue'
import { Form, type SubmissionContext } from 'vee-validate'
import type { PulseFormProps } from './PulseForm.types'

provide('pulseFormContext', true)

const props = defineProps<PulseFormProps>()

const emit = defineEmits<{
  submit: [values: Record<string, unknown>, ctx: SubmissionContext]
}>()

const onSubmit = async (values: Record<string, unknown>, ctx: SubmissionContext) => {
  const result = await props.schema.safeParseAsync(values)

  if (!result.success) {
    const errors: Record<string, string> = {}
    result.error.errors.forEach((err: { path: (string | number)[]; message: string }) => {
      const path = err.path.join('.')
      errors[path] = err.message
    })

    Object.keys(errors).forEach((field) => {
      ctx.setFieldError(field, errors[field])
    })

    await nextTick()

    focusElement('pulse-form-errors')

    return
  }

  emit('submit', values, ctx)
}

const focusElement = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.focus()
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<template>
  <Form
    v-slot="form"
    :initial-values="initialValues"
    class="pulse-form"
    @submit="onSubmit"
  >
    <div
      v-if="Object.keys(form.errors).length > 0"
      id="pulse-form-errors"
    >
      <div class="pulse-form-errors-header">
        <span class="pulse-form-errors-title">{{ errorMessageTitle || 'There is a problem' }}</span>
        <span class="pulse-form-errors-subtitle">{{ errorMessageSubtitle || 'Please fix the following errors:' }}</span>
      </div>
      <ul class="pulse-form-errors-list">
        <li
          v-for="(error, field) in form.errors"
          :key="field"
          class="pulse-form-error-item"
          @click="focusElement(String(field))"
        >
          {{ error }}
        </li>
      </ul>
    </div>

    <slot v-bind="form" />
  </Form>
</template>

<style scoped>
.pulse-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

#pulse-form-errors {
  font-family: 'Inter';
  background-color: var(--pulse-color-error-10);
  border: 1px solid var(--pulse-color-error-70);
  display: flex;
  flex-direction: column;
  gap: var(--pulse-space-xs);
  border-radius: var(--pulse-space-xs);
  padding: var(--pulse-space-s);
  margin-bottom: var(--pulse-space-s);
}

.pulse-form-errors-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--pulse-space-xs);
}

.pulse-form-errors-title {
  font-weight: var(--pulse-font-weight-strong);
  font-size: var(--pulse-font-size-regular);
  color: var(--pulse-color-neutral-120);
}

.pulse-form-errors-subtitle {
  font-size: var(--pulse-font-size-caption-regular);
  font-weight: var(--pulse-font-weight-regular);
  color: var(--pulse-color-neutral-120);
}

.pulse-form-errors-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--pulse-space-xs);
}

.pulse-form-errors-list li {
  font-size: var(--pulse-font-size-caption-small);
  font-weight: var(--pulse-font-weight-regular);
  color: var(--pulse-color-error-80);
  text-decoration: underline;
  cursor: pointer;
}

.pulse-form-errors-list li:hover {
  color: var(--pulse-color-error-80);
}
</style>
