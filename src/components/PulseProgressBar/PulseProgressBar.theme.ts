import type { ProgressbarComponentToken } from '@/themes/primePresetTypes'

export const pulseProgressBarTheme: ProgressbarComponentToken = {
  root: {
    background: 'var(--pulse-color-neutral-30)',
    height: '8px',
  },
  value: {
    background: 'var(--pulse-color-general-70)',
  },
}
