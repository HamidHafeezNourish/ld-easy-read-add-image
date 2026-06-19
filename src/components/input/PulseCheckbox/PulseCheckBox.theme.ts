import { CheckboxComponentToken } from '@/themes/primePresetTypes'

// Figma: Checkbox/Desktop (node-id=7055-30557)
//
// Token references use PrimeVue palette keys defined in src/themes/PulseTheme.ts:
//   Primary palette:  {primary.500}=primary-70  {primary.800}=primary-100
//                     {primary.900}=primary-110  {primary.950}=primary-120
//   Surface palette:  {surface.0}=neutral-10  {surface.300}=neutral-50
//                     {surface.400}=neutral-60  {surface.800}=neutral-100
//
// Error color (var(--pulse-color-error-70)) is NOT in PulseTheme.ts — kept as CSS var.
// Hover/pressed/disabled bg overrides are handled via :deep() CSS in PulseCheckbox.vue.

export const pulseCheckboxTheme: CheckboxComponentToken = {
  root: {
    borderRadius: '4px',
    width: '20px',
    height: '20px',
    // Unselected enabled bg — neutral-10 (#FFFFFF) → {surface.0}
    background: '{surface.0}',
    // Selected enabled bg — primary-100 (#2B5656) → {primary.800}
    checkedBackground: '{primary.800}',
    // Selected hover bg — primary-110 (#214343) → {primary.900}
    checkedHoverBackground: '{primary.900}',
    // Disabled bg — neutral-50 (#DBDDE2) → {surface.300}
    disabledBackground: '{surface.300}',
    // filledBackground: PrimeVue "filled" variant only — neutral-10 → {surface.0}
    filledBackground: '{surface.0}',
    // Borders — neutral-60 (#CFD2D8) → {surface.400}
    borderColor: '{surface.400}',
    hoverBorderColor: '{surface.400}',
    focusBorderColor: '{surface.400}',
    // Checked borders — primary-100 → {primary.800}, primary-110 → {primary.900}
    checkedBorderColor: '{primary.800}',
    checkedHoverBorderColor: '{primary.900}',
    checkedFocusBorderColor: '{primary.800}',
    // Checked disabled border — neutral-50 (#DBDDE2) → {surface.300}
    checkedDisabledBorderColor: '{surface.300}',
    // Error border — error-70 (#F77321) not in PulseTheme.ts palette, keep as CSS var
    invalidBorderColor: 'var(--pulse-color-error-70)',
    shadow: 'none',
    // Focus ring — primary-70 (#66CCCC) → {primary.500}  (Figma: stroke_9BCMBI 2px)
    focusRing: {
      width: '2px',
      style: 'solid',
      color: '{primary.500}',
      offset: '2px',
      shadow: 'none',
    },
    transitionDuration: '0.15s',
    sm: {
      width: '16px',
      height: '16px',
    },
    lg: {
      width: '24px',
      height: '24px',
    },
  },
  icon: {
    size: '12px',
    // Check icon white on all checked enabled/hover states — contrastColor → {surface.0}
    color: '{surface.0}',
    checkedColor: '{surface.0}',
    checkedHoverColor: '{surface.0}',
    // Disabled check icon — neutral-100 (#6C727E) → {surface.800}
    disabledColor: '{surface.800}',
    sm: {
      size: '10px',
    },
    lg: {
      size: '14px',
    },
  },
}
