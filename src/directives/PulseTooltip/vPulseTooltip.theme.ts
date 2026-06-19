import { TooltipComponentToken } from '@/themes/primePresetTypes'

export const pulseTooltipTheme: TooltipComponentToken = {
  root: {
    padding: 'var(--pulse-space-xs)',
    maxWidth: '250px',
  },
  colorScheme: {
    light: {
      root: {
        background: 'var(--pulse-color-primary-120)',
        color: '#ffffff',
      },
    },
    dark: {
      root: {
        background: 'var(--pulse-color-primary-120)',
        color: '#ffffff',
      },
    },
  },
  css: () => `
    .p-tooltip-text {
      font-size: var(--pulse-font-size-caption-regular);
      text-wrap: pretty;
      text-align: center;
    }
  `,
}
