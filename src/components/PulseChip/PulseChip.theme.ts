import { ChipComponentToken } from '@/themes/primePresetTypes'

export const pulseChipTheme: ChipComponentToken = {
  root: {
    borderRadius: '16px',
    paddingX: '8px',
    paddingY: '4px',
    gap: '8px',
    transitionDuration: '0.15s',
  },
  image: {
    width: '16px',
    height: '16px',
  },
  icon: {
    size: 'var(--pulse-font-size-caption-small)',
  },
  removeIcon: {
    size: 'var(--pulse-font-size-caption-small)',
    focusRing: {
      width: '3px',
      style: 'solid',
      color: 'var(--pulse-color-focus-ring)',
      offset: '2px',
      shadow: '0 0 0 2px var(--pulse-color-focus-ring)',
    },
  },
  colorScheme: {
    light: {
      root: {
        background: 'var(--pulse-color-primary-100)',
        color: 'var(--pulse-color-primary-100)',
      },
      icon: {
        color: '#fff',
      },
      removeIcon: {
        color: '#fff',
      },
    },
    dark: {
      root: {
        background: 'var(--pulse-color-primary-100)',
        color: '#fff',
      },
      icon: {
        color: '#fff',
      },
      removeIcon: {
        color: '#fff',
      },
    },
  },
  css: () => `
  .p-chip {
    width: max-content;
  }

  .p-chip-label{
    font-size: var(--pulse-font-size-caption-regular);
  }

  .p-chip-group {
    flex-wrap: wrap;
  }

  /* Base chip styles */
  .pulse-chip-interactive {
    user-select: none;
    cursor: pointer;
    border: 1px solid transparent;
  }

  /* Hover and focus styles - only when not disabled */
  .pulse-chip-interactive:not(.pulse-chip--disabled):hover,
  .pulse-chip-interactive:not(.pulse-chip--disabled):focus-visible {
    --p-chip-color: var(--pulse-color-primary-90);
    border-color: var(--pulse-color-primary-90);
  }

  /* Selected chip style */
  .pulse-chip-interactive:not(.pulse-chip--deselected):not(.pulse-chip--disabled) {
    background-color: var(--pulse-color-primary-100, #2684FF);
    color: #fff;
  }

  /* Deselected chip style */
  .pulse-chip--deselected:not(.pulse-chip--disabled) {
    background-color: var(--pulse-color-neutral-30);
  }

  /* Disabled chip style */
  .pulse-chip--disabled {
    background-color: var(--pulse-color-neutral-30);
    cursor: not-allowed;
    opacity: 0.6;
  }
`,
}
