import { PanelComponentToken } from '@/themes/primePresetTypes'

export const pulsePanelTheme: PanelComponentToken = {
  header: {
    padding: 'none',
  },
  content: {
    padding: 'none',
  },
  css: () => `
    .p-panel {
      padding: 12px;
    }
  `,
}
