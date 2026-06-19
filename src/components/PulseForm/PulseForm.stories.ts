import PulseForm from './PulseForm.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'
import PulseInputText from '../input/PulseInputText/PulseInputText.vue'
import PulseInputTextArea from '../input/PulseInputTextArea/PulseInputTextArea.vue'
import PulseSelect from '../input/PulseSelect/PulseSelect.vue'
import PulseDatePicker from '../input/PulseDatePicker/PulseDatePicker.vue'
import PulseNumberSelectButton from '../input/PulseNumberSelectButton/PulseNumberSelectButton.vue'
import PulseCompositeCheckbox from '../input/PulseCompositeCheckbox/PulseCompositeCheckbox.vue'
import PulseButton from '../PulseButton/PulseButton.vue'
import { z } from 'zod'

export default {
  title: 'Components/PulseForm',
  component: PulseForm,
} as Meta<typeof PulseForm>

const Template: StoryFn<typeof PulseForm> = (args) => ({
  components: {
    PulseForm,
    PulseInputText,
    PulseInputTextArea,
    PulseSelect,
    PulseDatePicker,
    PulseNumberSelectButton,
    PulseCompositeCheckbox,
    PulseButton,
  },
  setup() {
    const schema = z
      .object({
        name: z
          .string({ required_error: 'Name is required' })
          .max(10, { message: 'Name must be less than 10 characters' }),
        email: z.string({ required_error: 'Email is required' }).email({ message: 'Enter a valid Email' }),
        bio: z.string({ required_error: 'Bio is required' }).min(10, { message: 'Bio must be at least 10 characters' }),
        country: z.string({ required_error: 'Country is required' }),
        birthdate: z.date({ required_error: 'Birth date is required' }),
        rating: z.number({ required_error: 'Rating is required' }).min(1, { message: 'Please select a rating' }),
        preferences: z
          .array(
            z.object({
              id: z.number(),
              label: z.string(),
              checked: z.boolean(),
              inputValue: z.string().optional(),
            }),
          )
          .refine((items) => items.some((item) => item.checked), {
            message: 'Please select at least one option',
          }),
        pwsConsent: z.string().optional(),
        representativeConsent: z.string().optional(),
      })
      .refine(
        (data) => {
          if (data.preferences[0]?.checked) {
            return (data['pwsConsent'] || '').trim().length > 0
          }
          return true
        },
        {
          message: 'This field is required',
          path: ['pwsConsent'],
        },
      )
      .refine(
        (data) => {
          if (data.preferences[1]?.checked) {
            return (data['representativeConsent'] || '').trim().length > 0
          }
          return true
        },
        {
          message: 'This field is required',
          path: ['representativeConsent'],
        },
      )

    const countryOptions = [
      { label: 'Australia', value: 'AU' },
      { label: 'United States', value: 'US' },
      { label: 'United Kingdom', value: 'UK' },
      { label: 'Canada', value: 'CA' },
    ]

    const initialValues = {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'This is a sample bio with more than 10 characters.',
      country: 'AU',
      birthdate: new Date('1990-01-01'),
      rating: 4,
      preferences: [
        { id: 1, label: 'Jess Thorley', checked: false, inputValue: '', inputId: 'pwsConsent' },
        {
          id: 2,
          label: 'Representative',
          checked: false,
          inputValue: '',
          inputId: 'representativeConsent',
        },
      ],
      pwsConsent: '',
      representativeConsent: '',
    }

    const onSubmit = (values: unknown) => {
      alert('Form submitted with: ' + JSON.stringify(values, null, 2))
    }

    return { args, schema, countryOptions, initialValues, onSubmit }
  },
  template: `
    <PulseForm :schema="schema" :initialValues="initialValues" @submit="onSubmit">
      <PulseInputText
        inputId="name"
        label="Name"
        placeholder="Enter your name"
        :maxlength="10"
        hint="Maximum 10 characters"
      />
      <PulseInputText
        inputId="email"
        label="Email"
        placeholder="Enter your email"
        hint="We'll never share your email"
      />
      <PulseInputTextArea
        inputId="bio"
        label="Bio"
        placeholder="Tell us about yourself"
        :rows="4"
        :maxlength="200"
        hint="Minimum 10 characters required"
      />
      <PulseSelect
        inputId="country"
        label="Country"
        :options="countryOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Select your country"
        hint="Select the country you currently reside in"
      />
      <PulseDatePicker
        inputId="birthdate"
        label="Birth Date"
        hint="Must be 18 years or older"
        :fullWidth="true"
      />
      <PulseNumberSelectButton
        inputId="rating"
        label="How would you rate our service?"
        :scale="5"
        hint="1 = Poor, 5 = Excellent"
      />
      <PulseCompositeCheckbox
        inputId="preferences"
        header="Who is agreeing to this goal?"
        hint="At least one person must be selected"
        checkboxHint="Type the full name to sign consent"
        :required="true"
      />
      <PulseButton
        label="Submit"
        htmlType="submit"
      />
    </PulseForm>
  `,
})

export const Default: StoryFn<typeof PulseForm> = Template.bind({})
Default.args = {}
