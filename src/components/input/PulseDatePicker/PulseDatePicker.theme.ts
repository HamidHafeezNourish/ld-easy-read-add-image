import { DatepickerComponentToken } from '@/themes/primePresetTypes'

export const pulseDatePickerTheme: DatepickerComponentToken = {
  colorScheme: {
    light: {
      today: {
        background: 'var(--pulse-color-primary-100)',
        color: 'var(--pulse-color-neutral-20)',
      },
    },
  },
  date: {
    hoverBackground: 'var(--pulse-color-primary-10)',
    selectedBackground: 'var(--pulse-color-primary-20)',
    hoverColor: 'var(--pulse-color-neutral-120)',
    selectedColor: 'var(--pulse-color-neutral-120)',
  },
  css: () => `
    .p-datepicker-panel {
      font-family: 'Inter';
      font-weight: 400;
    }

    .p-datepicker-header {
      font-size: 12px;
    }

    .p-datepicker-day-view {
      font-size: 14px;
    }
  `,
}
