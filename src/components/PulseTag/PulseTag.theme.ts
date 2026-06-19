import { TagComponentToken } from '@/themes/primePresetTypes'

export const pulseTagTheme: TagComponentToken = {
  root: {
    fontSize: 'var(--pulse-font-size-caption-small)',
    fontWeight: '400',
    padding: 'var(--pulse-space-3xs) 4px',
    borderRadius: '4px',
  },
  icon: {
    size: '10.5px',
  },
  css: () => `
    .p-tag {
      width: max-content;
    }
  `,
}
