<script lang="ts">
// Module-level counter — increments once per instance across the entire app
// lifetime, guaranteeing unique IDs even when many PulseMenu components are
// mounted simultaneously (e.g. one per table row).
let _pulseMenuCount = 0
</script>

<script setup lang="ts">
import Button from 'primevue/button'
import { ref } from 'vue'
import PulseComponent from '../PulseComponent.vue'
import Menu from 'primevue/menu'
import { IconTitle } from '../../iconRegistry'
import PulseIcon from '../PulseIcon/PulseIcon.vue'
import type { PulseMenuProps } from './PulseMenu.types'

defineOptions({ inheritAttrs: false })

const menuId = `pulse-overlay-menu-${++_pulseMenuCount}`

const menu = ref<InstanceType<typeof Menu> | null>(null)

withDefaults(defineProps<PulseMenuProps>(), {
  icon: 'more options',
  ariaLabel: 'More options',
})

const toggle = (event: Event) => {
  menu.value?.toggle(event)
}
</script>

<template>
  <PulseComponent>
    <Button
      type="button"
      variant="text"
      class="menu-button"
      aria-haspopup="true"
      :aria-controls="menuId"
      :aria-label="ariaLabel"
      @click="toggle"
    >
      <template #icon>
        <PulseIcon
          :icon="icon"
          size="xlarge"
        />
      </template>
    </Button>

    <Menu
      id="overlay_menu"
      ref="menu"
      :model="items"
      :popup="true"
    >
      <template #itemicon="{ item }">
        <PulseIcon
          v-if="item.icon"
          :icon="item.icon as IconTitle"
        />
      </template>
    </Menu>
  </PulseComponent>
</template>
