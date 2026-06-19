import { TextareaComponentToken } from '@/themes/primePresetTypes'

export const pulseInputTextAreaTheme: TextareaComponentToken = {
  root: {
    color: 'var(--pulse-color-primary-120)',
    filledBackground: 'var(--pulse-color-primary-10)',
    disabledBackground: 'var(--pulse-color-neutral-30)',
  },
  css: () => `
    .p-textarea {
      height: auto;
      padding-inline: var(--p-textarea-padding-x);
      font-weight: 400;
      font-family: 'Inter';
    }
  `,
}
