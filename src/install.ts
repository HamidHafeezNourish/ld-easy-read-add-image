import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'
import Pulse from './themes/PulseTheme'

export function setupPulse(app: App, options = {}) {
  app.use(PrimeVue, {
    theme: {
      preset: Pulse,
      options: {
        darkModeSelector: false,
      },
    },
    ...options,
  })

  app.use(ConfirmationService)
  app.directive('pulse-tooltip', Tooltip)
}
