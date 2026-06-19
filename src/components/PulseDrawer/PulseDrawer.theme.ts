import { DrawerComponentToken } from '@/themes/primePresetTypes'

export const pulseDrawerTheme: DrawerComponentToken = {
  css: () => `
    .p-drawer {
    }

    .p-drawer-header {
      padding: var(--pulse-space-s);
      align-items: unset;
    }

    .p-drawer-content {
      display: flex;
      padding: 0 16px 16px 16px;
     }

     .p-drawer, .p-drawer-top .p-drawer-content, .p-drawer-bottom .p-drawer-content {
      width: unset;
      height: unset;
     }

    .p-drawer, .p-drawer-right .p-drawer, .p-drawer-left .p-drawer, .p-drawer-left .p-drawer-content, .p-drawer-right .p-drawer-content {
      min-width: 320px;
    }

    .p-drawer, .p-drawer-right .p-drawer, .p-drawer-left .p-drawer {
      width: 540px;
    }

    .p-drawer, .p-drawer-top .p-drawer-content, .p-drawer-bottom .p-drawer-content {
      height: 540px;
    }
  `,
}
