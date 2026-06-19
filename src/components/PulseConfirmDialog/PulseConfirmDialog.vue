<script setup lang="ts">
import { ConfirmDialog } from 'primevue'
import { useConfirm } from 'primevue/useconfirm'
import PulseButton from '../PulseButton/PulseButton.vue'
import PulseComponent from '../PulseComponent.vue'
import type { PulseConfirmDialogProps } from './PulseConfirmDialog.types'

const props = withDefaults(defineProps<PulseConfirmDialogProps>(), {
  acceptText: 'Confirm',
  cancelText: 'Cancel',
  dialogWidth: '476px',
})

const confirm = useConfirm()
const showTemplate = (): Promise<boolean> => {
  return new Promise((resolve) => {
    confirm.require({
      group: 'templating',
      header: props.headerText,
      message: props.messageText,
      accept: () => resolve(true),
      reject: () => resolve(false),
    })
  })
}
</script>

<template>
  <PulseComponent>
    <ConfirmDialog
      group="templating"
      :style="{ width: props.dialogWidth }"
    >
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="dialog-container">
          <div class="dialog-header">
            <h2>{{ message.header }}</h2>
            <slot name="dialog-header-right" />
          </div>

          <div class="dialog-body">
            <p>{{ message.message }}</p>
          </div>

          <div class="dialog-footer">
            <div><slot name="dialog-footer-left" /></div>
            <div class="dialog-footer-buttons">
              <PulseButton
                type="secondary"
                :label="props.cancelText"
                @click="rejectCallback"
              />
              <PulseButton
                type="primary"
                :label="props.acceptText"
                @click="acceptCallback"
              />
            </div>
          </div>
        </div>
      </template>
    </ConfirmDialog>
    <slot
      name="trigger"
      :show-dialog="showTemplate"
    />
  </PulseComponent>
</template>

<style scoped>
.dialog-container {
  padding: var(--pulse-space-s);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
}

.dialog-header h2 {
  margin: 0;
  font-size: var(--pulse-font-size-large);
  color: var(--pulse-color-primary-100);
}

.dialog-body p {
  white-space: pre-line;
  font-size: var(--pulse-font-size-small);
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--pulse-space-m);
}

.dialog-footer-buttons {
  display: flex;
  gap: var(--pulse-space-xs);
  align-content: flex-end;
}
</style>
