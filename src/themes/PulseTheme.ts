import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'
import { PrimePreset } from './primePresetTypes'
import { pulseButtonTheme } from '../components/PulseButton/PulseButton.theme'
import { iftalabelTheme } from '../components/input/iftalable.theme'
import { pulseTagTheme } from '../components/PulseTag/PulseTag.theme'
import { pulseDatePickerTheme } from '../components/input/PulseDatePicker/PulseDatePicker.theme'
import { pulseDrawerTheme } from '../components/PulseDrawer/PulseDrawer.theme'
import { pulsePanelTheme } from '../components/PulsePanel/PulsePanel.theme'
import { pulseProgressBarTheme } from '../components/PulseProgressBar/PulseProgressBar.theme'
import { pulseMenuTheme } from '../components/PulseMenu/PulseMenu.theme'
import { pulseChipTheme } from '../components/PulseChip/PulseChip.theme'
import { pulseTreeSelectTheme } from '@/components/input/PulseTreeSelect/PulseTreeSelect.theme'
import { pulseTreeTheme } from '@/components/input/PulseTreeSelect/PulseTree.theme'
import { pulseTabsTheme } from '@/components/PulseTabs/PulseTabs.theme'
import { pulseInputTextAreaTheme } from '@/components/input/PulseInputTextArea/PulseInputTextArea.theme'
import { pulsePaginatorTheme } from '@/components/PulsePaginator/PulsePaginator.theme'
import { inputtextTheme } from '@/components/input/inputtext.theme'
import { pulseDataTableTheme } from '@/components/PulseDataTable/PulseDataTable.theme'
import { pulseSelectButtonTheme } from '@/components/input/PulseNumberSelectButton/PulseNumberSelectButton.theme'
import { pulseSelectTheme } from '@/components/input/PulseSelect/PulseSelect.theme'
import { pulseCheckboxTheme } from '@/components/input/PulseCheckbox/PulseCheckBox.theme'
import { pulseTooltipTheme } from '@/directives/PulseTooltip/vPulseTooltip.theme'

const presetOverride: PrimePreset = {
  extend: {
    semantic: {
      primary: {
        50: 'var(--pulse-color-primary-20)',
        100: 'var(--pulse-color-primary-30)',
        200: 'var(--pulse-color-primary-40)',
        300: 'var(--pulse-color-primary-50)',
        400: 'var(--pulse-color-primary-60)',
        500: 'var(--pulse-color-primary-70)',
        600: 'var(--pulse-color-primary-80)',
        700: 'var(--pulse-color-primary-90)',
        800: 'var(--pulse-color-primary-100)',
        900: 'var(--pulse-color-primary-110)',
        950: 'var(--pulse-color-primary-120)',
      },
      colorScheme: {
        light: {
          surface: {
            0: 'var(--pulse-color-neutral-10)',
            50: 'var(--pulse-color-neutral-20)',
            100: 'var(--pulse-color-neutral-30)',
            200: 'var(--pulse-color-neutral-40)',
            300: 'var(--pulse-color-neutral-50)',
            400: 'var(--pulse-color-neutral-60)',
            500: 'var(--pulse-color-neutral-70)',
            600: 'var(--pulse-color-neutral-80)',
            700: 'var(--pulse-color-neutral-90)',
            800: 'var(--pulse-color-neutral-100)',
            900: 'var(--pulse-color-neutral-110)',
            950: 'var(--pulse-color-neutral-120)',
          },
          primary: {
            color: 'var(--pulse-color-primary-70)',
            contrastColor: '#ffffff',
            hoverColor: 'var(--pulse-color-primary-50)',
            activeColor: '{zinc.800}',
          },
          highlight: {
            background: '{zinc.950}',
            focusBackground: '{zinc.700}',
            color: '#ffffff',
            focusColor: '#ffffff',
          },
          text: {
            color: 'var(--pulse-color-neutral-120)',
            hoverColor: 'var(--pulse-color-neutral-90)',
            mutedColor: 'var(--pulse-color-neutral-110)',
            hoverMutedColor: 'var(--pulse-color-neutral-100)',
          },
          formField: {
            disabledColor: 'var(--pulse-color-neutral-30)',
            disabledBackground: 'var(--pulse-color-neutral-120)',
            filledBackground: 'var(--pulse-color-primary-10)',
            filledFocusBackground: 'var(--pulse-color-primary-10)',
            filledHoverBackground: 'var(--pulse-color-primary-10)',
            borderColor: 'var(--pulse-color-neutral-60)',
            hoverBorderColor: 'var(--pulse-color-primary-90)',
            focusBorderColor: 'var(--pulse-color-primary-90)',
            invalidBorderColor: 'var(--pulse-color-primary-70)',
            invalidPlaceholderColor: 'var(--pulse-color-neutral-120)',
            placeholderColor: 'var(--pulse-color-neutral-120)',
            iconColor: 'var(--pulse-color-primary-90)',
          },
        },
      },
    },
  },
  components: {
    button: pulseButtonTheme,
    iftalabel: iftalabelTheme,
    tag: pulseTagTheme,
    datepicker: pulseDatePickerTheme,
    drawer: pulseDrawerTheme,
    panel: pulsePanelTheme,
    progressbar: pulseProgressBarTheme,
    menu: pulseMenuTheme,
    chip: pulseChipTheme,
    tabs: pulseTabsTheme,
    textarea: pulseInputTextAreaTheme,
    paginator: pulsePaginatorTheme,
    inputtext: inputtextTheme,
    treeselect: pulseTreeSelectTheme,
    tree: pulseTreeTheme,
    datatable: pulseDataTableTheme,
    selectbutton: pulseSelectButtonTheme,
    select: pulseSelectTheme,
    checkbox: pulseCheckboxTheme,
    tooltip: pulseTooltipTheme,
  },
}

const Pulse = definePreset(Aura, presetOverride)

export default Pulse
