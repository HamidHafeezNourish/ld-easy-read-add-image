import type { Meta, StoryFn } from '@storybook/vue3-vite'
import { ref } from 'vue'
import MigrationAdmin from './MigrationAdmin.vue'
import type { MigrationService } from './MigrationAdmin.types'

const initialServices: MigrationService[] = [
  { id: '1',  name: 'Amberwood Care – North East',    startDate: '2026-09-17', status: 'scheduled',   active: true  },
  { id: '2',  name: 'Aspen Grove Care – North East',  startDate: '2026-09-17', status: 'scheduled',   active: true  },
  { id: '3',  name: 'Birchwood Manor – North East',   startDate: '2026-09-17', status: 'scheduled',   active: true  },
  { id: '4',  name: 'Cedarview Residence – North East', startDate: '2026-09-17', status: 'scheduled', active: true  },
  { id: '5',  name: 'Daleview Care Home – North East', startDate: null,         status: 'not-set',    active: false },
  { id: '6',  name: 'Foxglove Lodge – North East',    startDate: '2026-09-17', status: 'scheduled',   active: true  },
  { id: '7',  name: 'Gardenia Court – North East',    startDate: '2026-09-17', status: 'in-progress', active: true  },
  { id: '8',  name: 'Elmwood House – North East',     startDate: null,         status: 'not-set',     active: false },
  { id: '9',  name: 'Larchwood Lodge – North East',   startDate: null,         status: 'not-set',     active: false },
  { id: '10', name: 'Hazelwood Haven – North East',   startDate: '2026-09-17', status: 'scheduled',   active: true  },
]

export default {
  title: 'Features/MigrationAdmin',
  component: MigrationAdmin,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MigrationAdmin>

function makeStory(toggleFirst = false, hideToggle = false): StoryFn<typeof MigrationAdmin> {
  return () => ({
    components: { MigrationAdmin },
    setup() {
      const services = ref<MigrationService[]>(
        initialServices.map((s) => ({ ...s })),
      )
      function onUpdateStartDate(id: string, date: string | null) {
        const s = services.value.find((s) => s.id === id)
        if (s) s.startDate = date
      }
      function onUpdateActive(id: string, active: boolean) {
        const s = services.value.find((s) => s.id === id)
        if (s) s.active = active
      }
      function onUpdateStatus(id: string, status: MigrationService['status']) {
        const s = services.value.find((s) => s.id === id)
        if (s) s.status = status
      }
      return { services, toggleFirst, hideToggle, onUpdateStartDate, onUpdateActive, onUpdateStatus }
    },
    template: `
      <MigrationAdmin
        :services="services"
        :total-records="services.length"
        :current-page="1"
        :rows="10"
        :toggle-first="toggleFirst"
        :hide-toggle="hideToggle"
        @update:start-date="onUpdateStartDate"
        @update:active="onUpdateActive"
        @update:status="onUpdateStatus"
      />
    `,
  })
}

export const Default = makeStory(false, false)
export const ToggleLeft = makeStory(true, false)
export const NoToggle = makeStory(false, true)
