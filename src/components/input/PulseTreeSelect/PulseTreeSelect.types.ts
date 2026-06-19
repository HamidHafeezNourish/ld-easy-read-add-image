import type { TreeNode } from 'primevue/treenode'
import type { PulseInputWrapperProps } from '../PulseInputWrapper.types'

export type PulseTreeSelectValue = string[]

export type PulseTreeSelectSelectionMode = 'single' | 'multiple' | 'checkbox'

export type PulseTreeSelectProps = PulseInputWrapperProps & {
  options: PulseTreeSelectOptions
  selectedValues?: PulseTreeSelectValue
  selectionMode?: PulseTreeSelectSelectionMode
  filter?: boolean
}

export type PulseTreeSelectOption = TreeNode & {
  label: string
}

export type PulseTreeNode = PulseTreeSelectOption

export type PulseTreeSelectOptions = PulseTreeSelectOption[]
