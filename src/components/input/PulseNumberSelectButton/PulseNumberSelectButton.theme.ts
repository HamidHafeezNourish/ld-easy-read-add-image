import { SelectbuttonComponentToken } from '@/themes/primePresetTypes'

export const pulseSelectButtonTheme: SelectbuttonComponentToken = {
  css: () => `
    :root {
      --pulse-selectbutton-size: 40px;
      --pulse-selectbutton-gap: 8px;
    }

    .p-selectbutton {
      font-family: 'Inter';
      display: flex;
      flex-direction: row;
      gap: 5px;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
    }

    .p-selectbutton .p-togglebutton {
      color: var(--pulse-color-primary-100);
      font-size: var(--pulse-font-size-caption-regular);
      font-weight: var(--pulse-font-weight-regular);
      border-radius: 50%;
      padding: 0;
      flex: 0 0 auto;
      background: var(--pulse-color-neutral-30);
      border: 1px solid var(--pulse-color-neutral-30);
      width: var(--pulse-selectbutton-size);
      height: var(--pulse-selectbutton-size);
      min-width: unset;
      box-sizing: border-box;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .p-togglebutton .p-togglebutton-content {
      padding: 0;
      width: 100%;
      height: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .p-selectbutton .p-togglebutton:focus,
    .p-selectbutton .p-togglebutton:hover,
    .p-selectbutton .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
      color: var(--pulse-color-primary-100);
      border: 1px solid var(--pulse-color-primary-100);
      transition: none;
    }

    .p-togglebutton.p-togglebutton-checked,
    .p-togglebutton-checked .p-togglebutton-content {
      background: var(--pulse-color-primary-100);
      color: var(--pulse-color-neutral-10);
      border: 1px solid var(--pulse-color-primary-100);
    }

    .p-selectbutton .p-togglebutton:first-child{
      border-start-start-radius: 50%;
      border-end-start-radius: 50%;
    }
    .p-selectbutton .p-togglebutton:last-child{
      border-start-end-radius: 50%;
      border-end-end-radius: 50%;
    }

    @media (max-width: 580px) {
      .p-selectbutton {
        max-width: calc((var(--pulse-selectbutton-size) * 5) + (var(--pulse-selectbutton-gap) * 4));
      }
    }
  `,
}
