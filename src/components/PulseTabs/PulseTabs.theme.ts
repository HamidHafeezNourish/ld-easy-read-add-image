import { TabsComponentToken } from '@/themes/primePresetTypes'

export const pulseTabsTheme: TabsComponentToken = {
  activeBar: {
    height: '2px',
    background: 'var(--pulse-color-primary-80)',
    bottom: '-2px',
  },
  tab: {
    borderWidth: '0',
    hoverBackground: 'transparent',
    activeBackground: 'transparent',
    background: 'transparent',
  },
  tablist: {
    borderWidth: '0 0 2px 0',
    borderColor: 'var(--pulse-color-primary-30)',
  },
  css: () => `
    .p-tab {
      border-radius: 4px 4px 0 0;
    }

    .p-tab:hover,
    .p-tab:focus,
    .p-tab:active,
    .p-tab:focus:not(:hover) {
      background: transparent;
      box-shadow-none;
    }
  `,
}
