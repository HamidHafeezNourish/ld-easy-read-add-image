import { config } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

const app = createApp({})
app.use(PrimeVue)

config.global.plugins = [PrimeVue]

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
