import { TreeselectComponentToken } from '@/themes/primePresetTypes'

export const pulseTreeSelectTheme: TreeselectComponentToken = {
  root: {
    disabledBackground: 'var(--pulse-color-neutral-40)',
    disabledColor: 'var(--pulse-color-neutral-90)',
    filledFocusBackground: 'var(--pulse-color-neutral-90)',
  },
  css: () => `
    .p-treeselect:not(.p-disabled) {
      border-color: var(--pulse-color-primary-50);
    }

    .p-tree-node-selectable:hover {
      font-weight: 500;
    }

    .p-treeselect-label {
      color: var(--pulse-color-neutral-120);
      border-radius: 8px;
    }

    .p-treeselect-label:(.p-disabled) {
      border-color: var(--pulse-color-neutral-40);
    }

    .p-inputwrapper-filled:not(.p-disabled) .p-treeselect-dropdown,
    .p-inputwrapper-filled:not(.p-disabled) .p-treeselect-label {
      background: var(--pulse-color-primary-10);
    }
    .p-virtualscroller-loader-mask {
      color: var(--pulse-color-neutral-120);
    }
  `,
}
