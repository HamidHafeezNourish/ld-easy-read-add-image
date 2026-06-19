import { SelectComponentToken } from '@/themes/primePresetTypes'

export const pulseSelectTheme: SelectComponentToken = {
  root: {
    disabledBackground: 'var(--pulse-color-neutral-40)',
    disabledColor: 'var(--pulse-color-neutral-90)',
    filledFocusBackground: 'var(--pulse-color-neutral-90)',
  },
  option: {
    focusBackground: 'var(--pulse-color-primary-10)',
    selectedBackground: 'var(--pulse-color-primary-20)',
    selectedFocusBackground: 'var(--pulse-color-primary-20)',
    focusColor: 'var(--pulse-color-neutral-120)',
    selectedColor: 'var(--pulse-color-neutral-120)',
    selectedFocusColor: 'var(--pulse-color-neutral-120)',
  },
  css: () => `
    .p-select:not(.p-disabled) {
      border-color: var(--pulse-color-primary-50);
    }

    .p--node-selectable:hover {
      font-weight: 500;
    }

    .p-select-label {
      color: var(--pulse-color-neutral-120);
      border-radius: 8px;
      display: flex;
      align-items: center;
    }

    .p-select-label.p-disabled {
      border-color: var(--pulse-color-neutral-40);
    }

    .p-select.p-inputwrapper-filled:not(.p-disabled),
    .p-inputwrapper-filled:not(.p-disabled) .p-select-dropdown,
    .p-inputwrapper-filled:not(.p-disabled) .p-select-label {
      background: var(--pulse-color-primary-10);
    }

    .p-virtualscroller-loader-mask {
      color: var(--pulse-color-neutral-120);
    }

    .pulse-select-overlay .p-select-option {
      white-space: normal;
      word-break: break-word;
      line-height: 1.4;
    }
  `,
}
