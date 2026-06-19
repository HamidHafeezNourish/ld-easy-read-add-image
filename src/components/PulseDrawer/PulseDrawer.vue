<script setup lang="ts">
import { Drawer } from 'primevue'
import PulseComponent from '../PulseComponent.vue'
import { computed } from 'vue'
import PulseIcon from '@/components/PulseIcon/PulseIcon.vue'
import type { PulseDrawerProps } from './PulseDrawer.types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PulseDrawerProps>(), {
  visible: false,
  position: 'right',
  title: '',
  showCloseIcon: true,
})

const visibleProxy = computed({
  get: () => props.visible,
  set: async (next: boolean) => {
    if (!next && props.beforeClose) {
      const ok = await props.beforeClose()
      if (ok) emit('update:visible', false)
    } else {
      emit('update:visible', next)
    }
  },
})

const emit = defineEmits(['update:visible'])
</script>

<template>
  <Drawer
    v-model:visible="visibleProxy"
    :position="props.position"
    :show-close-icon="props.showCloseIcon"
  >
    <template #closeicon>
      <span style="min-width: 27px">
        <PulseIcon
          icon="failure"
          size="xxlarge"
        />
      </span>
    </template>
    <template #header>
      <PulseComponent>
        <div class="pulse-drawer-header-left">
          <div
            v-if="breadcrumb"
            class="pulse-drawer-breadcrumb"
          >
            <PulseIcon
              v-if="breadcrumbCallback"
              icon="previous"
              size="small"
              @click="breadcrumbCallback"
            />
            {{ breadcrumb }}
          </div>
          <slot name="above-title" />
          <h4 class="pulse-drawer-title">
            {{ title }}
          </h4>

          <div class="drawer-sub-title">
            <slot name="sub-title" />
          </div>
        </div>
        <span class="pulse-drawer-header-right" />
      </PulseComponent>
    </template>
    <PulseComponent>
      <slot />
    </PulseComponent>
  </Drawer>
</template>

<style scoped>
.pulse-component {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.pulse-drawer-header-left {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--pulse-space-xs);
}

.pulse-drawer-breadcrumb {
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: var(--pulse-font-size-caption-regular);
  cursor: pointer;
  color: var(--pulse-color-neutral-100);
}

.pulse-drawer-title {
  color: var(--pulse-color-primary-100);
  min-height: 27px;
  display: flex;
  align-items: center;
}

.drawer-sub-title {
  font-size: var(--pulse-font-size-caption-small);
  color: var(--pulse-color-neutral-100);
}
</style>
