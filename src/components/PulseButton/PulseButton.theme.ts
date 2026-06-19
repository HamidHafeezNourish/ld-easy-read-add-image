import { ButtonComponentToken } from '@/themes/primePresetTypes'

export const pulseButtonTheme: ButtonComponentToken = {
  root: {
    gap: '8px',
    label: {
      fontWeight: 'var(--pulse-font-weight-regular)',
    },
    iconOnlyWidth: 'fit-content',
  },
  colorScheme: {
    light: {
      root: {
        primary: {
          background: 'var(--pulse-color-primary-110)',
          hoverBackground: 'var(--pulse-color-primary-100)',
          activeBackground: 'var(--pulse-color-primary-100)',
          borderColor: '#ffffff',
          hoverBorderColor: 'var(--pulse-color-primary-80)',
          activeBorderColor: 'var(--pulse-color-primary-80)',
          color: 'var(--pulse-color-neutral-20)',
          hoverColor: 'var(--pulse-color-neutral-20)',
          activeColor: 'var(--pulse-color-neutral-20)',
          focusRing: {
            color: 'var(--pulse-color-primary-50)',
            shadow: '',
          },
        },
        secondary: {
          background: 'var(--pulse-color-primary-10)',
          hoverBackground: 'var(--pulse-color-primary-20)',
          activeBackground: 'var(--pulse-color-primary-20)',
          borderColor: 'var(--pulse-color-primary-100)',
          hoverBorderColor: 'var(--pulse-color-primary-100)',
          activeBorderColor: 'var(--pulse-color-primary-100)',
          color: 'var(--pulse-color-neutral-120)',
          hoverColor: 'var(--pulse-color-neutral-120)',
          activeColor: 'var(--pulse-color-neutral-120)',
          focusRing: {
            color: 'var(--pulse-color-primary-100)',
            shadow: '',
          },
        },
        info: {
          background: 'var(--pulse-color-general-10)',
          hoverBackground: 'var(--pulse-color-general-20)',
          activeBackground: 'var(--pulse-color-general-20)',
          borderColor: 'var(--pulse-color-general-10)',
          hoverBorderColor: 'var(--pulse-color-general-20)',
          activeBorderColor: 'var(--pulse-color-general-70)',
          color: 'var(--pulse-color-neutral-120)',
          hoverColor: 'var(--pulse-color-neutral-120)',
          activeColor: 'var(--pulse-color-neutral-120)',
          focusRing: {
            color: 'var(--pulse-color-general-50)',
            shadow: '',
          },
        },
        success: {
          background: 'var(--pulse-color-success-70)',
          hoverBackground: 'var(--pulse-color-success-20)',
          activeBackground: 'var(--pulse-color-success-20)',
          borderColor: 'var(--pulse-color-success-10)',
          hoverBorderColor: 'var(--pulse-color-success-10)',
          activeBorderColor: 'var(--pulse-color-success-70)',
          color: 'var(--pulse-color-neutral-120)',
          hoverColor: 'var(--pulse-color-neutral-120)',
          activeColor: 'var(--pulse-color-neutral-120)',
          focusRing: {
            color: 'var(--pulse-color-success-70)',
            shadow: '',
          },
        },
        warn: {
          background: 'var(--pulse-color-error-10)',
          hoverBackground: 'var(--pulse-color-error-20)',
          activeBackground: 'var(--pulse-color-error-20)',
          borderColor: 'var(--pulse-color-error-10)',
          hoverBorderColor: 'var(--pulse-color-error-10)',
          activeBorderColor: 'var(--pulse-color-error-70)',
          color: 'var(--pulse-color-neutral-120)',
          hoverColor: 'var(--pulse-color-neutral-120)',
          activeColor: 'var(--pulse-color-neutral-120)',
          focusRing: {
            color: 'var(--pulse-color-error-70)',
            shadow: '',
          },
        },
        help: {
          background: 'var(--pulse-color-attention-10)',
          hoverBackground: 'var(--pulse-color-attention-20)',
          activeBackground: 'var(--pulse-color-attention-20)',
          borderColor: 'var(--pulse-color-attention-70)',
          hoverBorderColor: 'var(--pulse-color-attention-70)',
          activeBorderColor: 'var(--pulse-color-attention-70)',
          color: 'var(--pulse-color-neutral-120)',
          hoverColor: 'var(--pulse-color-neutral-120)',
          activeColor: 'var(--pulse-color-neutral-120)',
          focusRing: {
            color: 'var(--pulse-color-attention-70)',
            shadow: '',
          },
        },
        danger: {
          background: 'var(--pulse-color-urgency-10)',
          hoverBackground: 'var(--pulse-color-urgency-20)',
          activeBackground: 'var(--pulse-color-urgency-20)',
          borderColor: 'var(--pulse-color-urgency-70)',
          hoverBorderColor: 'var(--pulse-color-urgency-70)',
          activeBorderColor: 'var(--pulse-color-urgency-70)',
          color: 'var(--pulse-color-neutral-120)',
          hoverColor: 'var(--pulse-color-neutral-120)',
          activeColor: 'var(--pulse-color-neutral-120)',
          focusRing: {
            color: 'var(--pulse-color-urgency-70)',
            shadow: '',
          },
        },
        contrast: {
          background: 'var(--pulse-color-neutral-120)',
          hoverBackground: 'var(--pulse-color-neutral-110)',
          activeBackground: 'var(--pulse-color-neutral-110)',
          borderColor: 'var(--pulse-color-neutral-120)',
          hoverBorderColor: 'var(--pulse-color-neutral-60)',
          activeBorderColor: 'var(--pulse-color-neutral-60)',
          color: 'var(--pulse-color-neutral-20)',
          hoverColor: 'var(--pulse-color-neutral-10)',
          activeColor: 'var(--pulse-color-neutral-10)',
          focusRing: {
            color: 'var(--pulse-color-neutral-110)',
            shadow: '',
          },
        },
      },
      outlined: {
        primary: {
          hoverBackground: 'var(--p-button-outlined-primary-hover-background)',
          activeBackground: 'var(--p-button-outlined-primary-active-background)',
          borderColor: 'var(--p-button-outlined-primary-border-color)',
          color: 'var(--p-button-outlined-primary-color)',
        },
        secondary: {
          hoverBackground: 'var(--p-button-outlined-secondary-hover-background)',
          activeBackground: 'var(--p-button-outlined-secondary-active-background)',
          borderColor: 'var(--p-button-outlined-secondary-border-color)',
          color: 'var(--p-button-outlined-secondary-color)',
        },
        success: {
          hoverBackground: 'var(--p-button-outlined-success-hover-background)',
          activeBackground: 'var(--p-button-outlined-success-active-background)',
          borderColor: 'var(--p-button-outlined-success-border-color)',
          color: 'var(--p-button-outlined-success-color)',
        },
        info: {
          hoverBackground: 'var(--p-button-outlined-info-hover-background)',
          activeBackground: 'var(--p-button-outlined-info-active-background)',
          borderColor: 'var(--p-button-outlined-info-border-color)',
          color: 'var(--p-button-outlined-info-color)',
        },
        warn: {
          hoverBackground: 'var(--p-button-outlined-warn-hover-background)',
          activeBackground: 'var(--p-button-outlined-warn-active-background)',
          borderColor: 'var(--p-button-outlined-warn-border-color)',
          color: 'var(--p-button-outlined-warn-color)',
        },
        help: {
          hoverBackground: 'var(--p-button-outlined-help-hover-background)',
          activeBackground: 'var(--p-button-outlined-help-active-background)',
          borderColor: 'var(--p-button-outlined-help-border-color)',
          color: 'var(--p-button-outlined-help-color)',
        },
        danger: {
          hoverBackground: 'var(--p-button-outlined-danger-hover-background)',
          activeBackground: 'var(--p-button-outlined-danger-active-background)',
          borderColor: 'var(--p-button-outlined-danger-border-color)',
          color: 'var(--p-button-outlined-danger-color)',
        },
        contrast: {
          hoverBackground: 'var(--p-button-outlined-contrast-hover-background)',
          activeBackground: 'var(--p-button-outlined-contrast-active-background)',
          borderColor: 'var(--p-button-outlined-contrast-border-color)',
          color: 'var(--p-button-outlined-contrast-color)',
        },
        plain: {
          hoverBackground: 'var(--p-button-outlined-plain-hover-background)',
          activeBackground: 'var(--p-button-outlined-plain-active-background)',
          borderColor: 'var(--p-button-outlined-plain-border-color)',
          color: 'var(--p-button-outlined-plain-color)',
        },
      },
      text: {
        primary: {
          hoverBackground: 'var(--p-button-text-primary-hover-background)',
          activeBackground: 'var(--p-button-text-primary-active-background)',
          color: 'var(--p-button-text-primary-color)',
        },
        secondary: {
          hoverBackground: 'var(--p-button-text-secondary-hover-background)',
          activeBackground: 'var(--p-button-text-secondary-active-background)',
          color: 'var(--p-button-text-secondary-color)',
        },
        success: {
          hoverBackground: 'var(--p-button-text-success-hover-background)',
          activeBackground: 'var(--p-button-text-success-active-background)',
          color: 'var(--p-button-text-success-color)',
        },
        info: {
          hoverBackground: 'var(--p-button-text-info-hover-background)',
          activeBackground: 'var(--p-button-text-info-active-background)',
          color: 'var(--p-button-text-info-color)',
        },
        warn: {
          hoverBackground: 'var(--p-button-text-warn-hover-background)',
          activeBackground: 'var(--p-button-text-warn-active-background)',
          color: 'var(--p-button-text-warn-color)',
        },
        help: {
          hoverBackground: 'var(--p-button-text-help-hover-background)',
          activeBackground: 'var(--p-button-text-help-active-background)',
          color: 'var(--p-button-text-help-color)',
        },
        danger: {
          hoverBackground: 'var(--p-button-text-danger-hover-background)',
          activeBackground: 'var(--p-button-text-danger-active-background)',
          color: 'var(--p-button-text-danger-color)',
        },
        contrast: {
          hoverBackground: 'var(--p-button-text-contrast-hover-background)',
          activeBackground: 'var(--p-button-text-contrast-active-background)',
          color: 'var(--p-button-text-contrast-color)',
        },
        plain: {
          hoverBackground: 'var(--p-button-text-plain-hover-background)',
          activeBackground: 'var(--p-button-text-plain-active-background)',
          color: 'var(--p-button-text-plain-color)',
        },
      },
      link: {
        color: '',
        hoverColor: '',
        activeColor: '',
      },
    },
  },
  css: () => `
    .p-button:disabled, .p-button:hover:disabled {
      background: var(--pulse-color-neutral-40);
      color: var(--pulse-color-neutral-90);
      border: 1px solid var(--pulse-color-neutral-90);
    }

    .p-button.p-button-icon-only {
      padding: 0;
      min-width: var(--p-button-icon-only-width);
    }
  `,
}
