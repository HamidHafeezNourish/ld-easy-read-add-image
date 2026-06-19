import PulseInputRichText from './PulseInputRichText.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'
import { ref } from 'vue'

export default {
  title: 'Components/Input/PulseInputRichText',
  component: PulseInputRichText,
  parameters: {
    docs: {
      description: {
        component:
          'Note: This component includes a temporary list-rendering workaround for a PrimeVue/Quill issue where bullet and ordered lists both render as numbered lists. The workaround overrides list markers in CSS to ensure correct bullets and numbers.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the rich text editor',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    hint: {
      control: 'text',
      description: 'Hint text shown below the label',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the editor is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the editor is read-only',
    },
    editorStyle: {
      control: 'text',
      description: 'Custom CSS style for the editor (e.g., height: 300px)',
    },
    maxlength: {
      control: 'number',
      description: 'Maximum character length with counter',
    },
    error: {
      control: 'text',
      description: 'External error message (submission error)',
    },
    showFontSize: {
      control: 'boolean',
      description: 'Show font size selector in toolbar',
    },
    showFontFamily: {
      control: 'boolean',
      description: 'Show font family selector in toolbar',
    },
    minimalStyling: {
      control: 'boolean',
      description:
        'When enabled, shows an error if the content contains unsupported styling (e.g. text colour, background colour) that may be lost on saving.',
    },
  },
} satisfies Meta<typeof PulseInputRichText>

const Template: StoryFn<typeof PulseInputRichText> = (args) => ({
  components: { PulseInputRichText },
  setup() {
    const value = ref('')
    return { args, value }
  },
  template: '<PulseInputRichText v-bind="args" v-model="value" />',
})

// Empty state
export const Default = Template.bind({})
Default.args = {
  inputId: 'richtext-default',
  label: '{Label}',
  placeholder: 'Enter text here...',
  hint: '{Hint}',
}

// Empty with character limit
export const EmptyWithCharacterLimit = Template.bind({})
EmptyWithCharacterLimit.args = {
  inputId: 'richtext-empty-limit',
  label: 'Describe the experience',
  placeholder: 'Enter text here...',
  hint: 'Go into as much detail as possible',
  maxlength: 300,
}

// With content
export const WithContent: StoryFn<typeof PulseInputRichText> = (args) => ({
  components: { PulseInputRichText },
  setup() {
    const value = ref('This text fills up nearly two lines because it is extremely long and detailed')
    return { args, value }
  },
  template: '<PulseInputRichText v-bind="args" v-model="value" />',
})
WithContent.args = {
  inputId: 'richtext-content',
  label: 'Describe the experience',
  hint: 'Go into as much detail as possible',
}

// With content and character limit
export const WithCharacterLimit: StoryFn<typeof PulseInputRichText> = (args) => ({
  components: { PulseInputRichText },
  setup() {
    const value = ref('This text fills up nearly two lines because it is extremely long and detailed')
    return { args, value }
  },
  template: '<PulseInputRichText v-bind="args" v-model="value" />',
})
WithCharacterLimit.args = {
  inputId: 'richtext-limit-content',
  label: 'Describe the experience',
  hint: 'Go into as much detail as possible',
  maxlength: 300,
}

// Focused state (with styled content)
export const Focused: StoryFn<typeof PulseInputRichText> = (args) => ({
  components: { PulseInputRichText },
  setup() {
    const value = ref(
      '<p>This <strong>text</strong> fills <em>up nearly two lines</em> <u>because it is</u> extremely long and detailed</p>',
    )
    return { args, value }
  },
  template:
    '<div><p style="margin-bottom: 8px; color: #6c727e; font-size: 12px;">Click inside the editor to see the focused state</p><PulseInputRichText v-bind="args" v-model="value" /></div>',
})
Focused.args = {
  inputId: 'richtext-focused',
  label: 'Describe the experience',
  hint: 'Go into as much detail as possible',
  maxlength: 300,
}

// Required field
export const Required = Template.bind({})
Required.args = {
  inputId: 'richtext-required',
  label: 'Message',
  placeholder: 'Enter your message...',
  hint: 'This field is required',
  required: true,
}

// Disabled state
export const Disabled: StoryFn<typeof PulseInputRichText> = (args) => ({
  components: { PulseInputRichText },
  setup() {
    const value = ref('This content cannot be edited')
    return { args, value }
  },
  template: '<PulseInputRichText v-bind="args" v-model="value" />',
})
Disabled.args = {
  inputId: 'richtext-disabled',
  label: 'Disabled Editor',
  hint: 'This editor is disabled',
  disabled: true,
}

// Readonly state
export const Readonly: StoryFn<typeof PulseInputRichText> = (args) => ({
  components: { PulseInputRichText },
  setup() {
    const value = ref(
      '<p>This content is <strong>read-only</strong> and cannot be edited, but you can select and copy it.</p>',
    )
    return { args, value }
  },
  template: '<PulseInputRichText v-bind="args" v-model="value" />',
})
Readonly.args = {
  inputId: 'richtext-readonly',
  label: 'Read-only Editor',
  hint: 'Content is read-only',
  readonly: true,
}

// With rich text formatting
export const WithFormattedContent: StoryFn<typeof PulseInputRichText> = (args) => ({
  components: { PulseInputRichText },
  setup() {
    const value = ref(
      '<p>This is some <strong>bold</strong> and <em>italic</em> text.</p><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul><p>More text here.</p>',
    )
    return { args, value }
  },
  template: '<PulseInputRichText v-bind="args" v-model="value" />',
})
WithFormattedContent.args = {
  inputId: 'richtext-formatted',
  label: 'Edit Content',
  hint: 'Content with rich text formatting',
}

// Custom height
export const CustomHeight = Template.bind({})
CustomHeight.args = {
  inputId: 'richtext-tall',
  label: 'Detailed Notes',
  placeholder: 'Add your notes...',
  editorStyle: 'height: 400px',
}

// Empty with Submission Error
export const EmptyWithSubmissionError: StoryFn<typeof PulseInputRichText> = (args) => ({
  components: { PulseInputRichText },
  setup() {
    const value = ref('')
    return { args, value }
  },
  template: '<PulseInputRichText v-bind="args" v-model="value" />',
})
EmptyWithSubmissionError.args = {
  inputId: 'richtext-empty-submission-error',
  label: 'Description',
  hint: 'Please provide a description',
  error: 'This field is required',
}

// Filled with Submission Error
export const FilledWithSubmissionError: StoryFn<typeof PulseInputRichText> = (args) => ({
  components: { PulseInputRichText },
  setup() {
    const value = ref('<p>This is some sample text that has a validation error.</p>')
    return { args, value }
  },
  template: '<PulseInputRichText v-bind="args" v-model="value" />',
})
FilledWithSubmissionError.args = {
  inputId: 'richtext-filled-submission-error',
  label: 'Content',
  hint: 'Content must meet requirements',
  error: 'Content does not meet the minimum requirements',
}

// Filled with Character Limit Error
export const FilledWithCharacterLimitError: StoryFn<typeof PulseInputRichText> = (args) => ({
  components: { PulseInputRichText },
  setup() {
    const value = ref(
      '<p>This is some sample text that exceeds the maximum character limit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
    )
    return { args, value }
  },
  template: '<PulseInputRichText v-bind="args" v-model="value" />',
})
FilledWithCharacterLimitError.args = {
  inputId: 'richtext-character-error',
  label: 'Short Description',
  hint: 'Keep it brief',
  maxlength: 100,
}

// Filled with Both Errors (Submission + Character Limit)
export const FilledWithBothErrors: StoryFn<typeof PulseInputRichText> = (args) => ({
  components: { PulseInputRichText },
  setup() {
    const value = ref(
      '<p>This content has both a validation error and exceeds the character limit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>',
    )
    return { args, value }
  },
  template: '<PulseInputRichText v-bind="args" v-model="value" />',
})
FilledWithBothErrors.args = {
  inputId: 'richtext-both-errors',
  label: 'Content',
  hint: 'Must be concise and meet requirements',
  error: 'Content does not meet validation requirements',
  maxlength: 120,
}

// With Font Controls
export const WithFontControls = Template.bind({})
WithFontControls.args = {
  inputId: 'richtext-font-controls',
  label: 'Document Content',
  placeholder: 'Enter formatted text here...',
  hint: 'Use the font size and family selectors to customize your text',
  showFontSize: true,
  showFontFamily: true,
}

// Minimal Styling — unsupported styling detected (colour/background in content)
export const MinimalStylingWithUnsupportedContent: StoryFn<typeof PulseInputRichText> = (args) => ({
  components: { PulseInputRichText },
  setup() {
    const value = ref(
      '<p><span style="color: rgb(230, 0, 0);">Red text</span> and <span style="background-color: rgb(255, 255, 0);">highlighted text</span> are not supported.</p>',
    )
    return { args, value }
  },
  template: '<PulseInputRichText v-bind="args" v-model="value" />',
})
MinimalStylingWithUnsupportedContent.args = {
  inputId: 'richtext-minimal-styling-error',
  label: 'Description',
  hint: 'Only bold, italic, underline and lists are supported',
  minimalStyling: true,
}

// Minimal Styling — supported content only (no error)
export const MinimalStylingWithSupportedContent: StoryFn<typeof PulseInputRichText> = (args) => ({
  components: { PulseInputRichText },
  setup() {
    const value = ref(
      '<p>This is <strong>bold</strong>, <em>italic</em>, and <u>underlined</u> text.</p><ul><li>Bullet item</li></ul><ol><li>Numbered item</li></ol>',
    )
    return { args, value }
  },
  template: '<PulseInputRichText v-bind="args" v-model="value" />',
})
MinimalStylingWithSupportedContent.args = {
  inputId: 'richtext-minimal-styling-ok',
  label: 'Description',
  hint: 'Only bold, italic, underline and lists are supported',
  minimalStyling: true,
}
