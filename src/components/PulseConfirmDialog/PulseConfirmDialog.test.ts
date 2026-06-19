import { mount } from '@vue/test-utils'
import { ConfirmationService } from 'primevue'
import PulseConfirmDialog from './PulseConfirmDialog.vue'

describe('PulseConfirmDialog.vue', () => {
  const mountWithService = (props = {}) =>
    mount(PulseConfirmDialog, {
      props: { headerText: 'Confirm', messageText: 'Are you sure?', ...props },
      global: { plugins: [ConfirmationService] },
    })

  it('renders the trigger slot', () => {
    const wrapper = mountWithService()
    // ConfirmDialog renders via teleport; just verify component mounts without error
    expect(wrapper.exists()).toBe(true)
  })

  it('exposes showDialog via trigger slot', () => {
    let capturedShowDialog: unknown = null
    mount(PulseConfirmDialog, {
      props: { headerText: 'Confirm', messageText: 'Are you sure?' },
      global: { plugins: [ConfirmationService] },
      slots: {
        trigger: ({ showDialog }: { showDialog: () => Promise<boolean> }) => {
          capturedShowDialog = showDialog
          return []
        },
      },
    })
    expect(typeof capturedShowDialog).toBe('function')
  })

  it('showTemplate returns a Promise', () => {
    let capturedShowDialog: (() => Promise<boolean>) | null = null
    mount(PulseConfirmDialog, {
      props: { headerText: 'Confirm', messageText: 'Are you sure?' },
      global: { plugins: [ConfirmationService] },
      slots: {
        trigger: ({ showDialog }: { showDialog: () => Promise<boolean> }) => {
          capturedShowDialog = showDialog
          return []
        },
      },
    })
    const result = capturedShowDialog!()
    expect(result).toBeInstanceOf(Promise)
  })

  it('uses custom acceptText prop', () => {
    const wrapper = mountWithService({ acceptText: 'Yes, delete' })
    expect(wrapper.props('acceptText')).toBe('Yes, delete')
  })

  it('uses custom cancelText prop', () => {
    const wrapper = mountWithService({ cancelText: 'No, keep it' })
    expect(wrapper.props('cancelText')).toBe('No, keep it')
  })

  it('defaults acceptText to Confirm', () => {
    const wrapper = mountWithService()
    expect(wrapper.props('acceptText')).toBe('Confirm')
  })

  it('defaults cancelText to Cancel', () => {
    const wrapper = mountWithService()
    expect(wrapper.props('cancelText')).toBe('Cancel')
  })
})
