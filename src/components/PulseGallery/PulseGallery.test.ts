import { mount } from '@vue/test-utils'
import PulseGallery from './PulseGallery.vue'
import type { PulseGalleryImage } from './PulseGallery.types'

type GalleryVM = {
  displayCustom: boolean
  activeIndex: number
  openGallery: (index: number) => void
  closeGallery: () => void
  prevImage: () => void
  nextImage: () => void
  handlePointerDown: (event: PointerEvent) => void
  $nextTick: () => Promise<void>
}

const getVM = (wrapper: ReturnType<typeof mount<typeof PulseGallery>>) => wrapper.vm as unknown as GalleryVM

const images: PulseGalleryImage[] = [
  {
    itemImageSrc: '/img/1.jpg',
    thumbnailImageSrc: '/thumb/1.jpg',
    alt: 'Image 1',
    title: 'Photo 1',
  },
  {
    itemImageSrc: '/img/2.jpg',
    thumbnailImageSrc: '/thumb/2.jpg',
    alt: 'Image 2',
    title: 'Photo 2',
  },
  {
    itemImageSrc: '/img/3.jpg',
    thumbnailImageSrc: '/thumb/3.jpg',
    alt: 'Image 3',
    title: 'Photo 3',
  },
]

describe('PulseGallery.vue', () => {
  it('renders the title when provided', () => {
    const wrapper = mount(PulseGallery, { props: { images, title: 'My Gallery' } })
    expect(wrapper.text()).toContain('My Gallery')
  })

  it('renders thumbnails for each image on first page', () => {
    const wrapper = mount(PulseGallery, { props: { images } })
    const thumbnails = wrapper.findAll('img')
    expect(thumbnails.length).toBeGreaterThanOrEqual(images.length)
  })

  it('renders correct number of thumbnails per page (rowsPerPage)', () => {
    const manyImages: PulseGalleryImage[] = Array.from({ length: 12 }, (_, i) => ({
      itemImageSrc: `/img/${i}.jpg`,
      thumbnailImageSrc: `/thumb/${i}.jpg`,
      alt: `Image ${i}`,
      title: `Photo ${i}`,
    }))
    const wrapper = mount(PulseGallery, { props: { images: manyImages, rowsPerPage: 4 } })
    expect(wrapper.findAll('img').length).toBeLessThanOrEqual(4)
  })

  it('renders PulsePaginator when images exceed rowsPerPage', () => {
    const manyImages: PulseGalleryImage[] = Array.from({ length: 12 }, (_, i) => ({
      itemImageSrc: `/img/${i}.jpg`,
      thumbnailImageSrc: `/thumb/${i}.jpg`,
      alt: `Image ${i}`,
      title: `Photo ${i}`,
    }))
    const wrapper = mount(PulseGallery, { props: { images: manyImages, rowsPerPage: 4 } })
    expect(wrapper.findComponent({ name: 'PulsePaginator' }).exists()).toBe(true)
  })

  it('always renders PulsePaginator (pagination is always present)', () => {
    const wrapper = mount(PulseGallery, { props: { images, rowsPerPage: 9 } })
    expect(wrapper.findComponent({ name: 'PulsePaginator' }).exists()).toBe(true)
  })

  it('opens gallery and sets activeIndex when a thumbnail is clicked', async () => {
    const wrapper = mount(PulseGallery, { props: { images } })
    await wrapper.find('button.pulse-gallery-thumb').trigger('click')
    const vm = getVM(wrapper)
    await vm.$nextTick()
    expect(vm.displayCustom).toBe(true)
    expect(vm.activeIndex).toBe(0)
  })

  it('prevImage decrements activeIndex when not at first image', async () => {
    const wrapper = mount(PulseGallery, { props: { images } })
    const vm = getVM(wrapper)
    vm.activeIndex = 2
    vm.prevImage()
    await vm.$nextTick()
    expect(vm.activeIndex).toBe(1)
  })

  it('prevImage does not decrement below 0', async () => {
    const wrapper = mount(PulseGallery, { props: { images } })
    const vm = getVM(wrapper)
    vm.activeIndex = 0
    vm.prevImage()
    await vm.$nextTick()
    expect(vm.activeIndex).toBe(0)
  })

  it('nextImage increments activeIndex when not at last image', async () => {
    const wrapper = mount(PulseGallery, { props: { images } })
    const vm = getVM(wrapper)
    vm.activeIndex = 0
    vm.nextImage()
    await vm.$nextTick()
    expect(vm.activeIndex).toBe(1)
  })

  it('nextImage does not increment past last image', async () => {
    const wrapper = mount(PulseGallery, { props: { images } })
    const vm = getVM(wrapper)
    vm.activeIndex = images.length - 1
    vm.nextImage()
    await vm.$nextTick()
    expect(vm.activeIndex).toBe(images.length - 1)
  })

  it('closeGallery sets displayCustom to false', async () => {
    const wrapper = mount(PulseGallery, { props: { images } })
    const vm = getVM(wrapper)
    vm.displayCustom = true
    vm.closeGallery()
    await vm.$nextTick()
    expect(vm.displayCustom).toBe(false)
  })

  it('handlePointerDown closes gallery when clicking outside gallery item', async () => {
    const wrapper = mount(PulseGallery, { props: { images } })
    const vm = getVM(wrapper)
    vm.displayCustom = true
    const event = new MouseEvent('pointerdown', { bubbles: true }) as unknown as PointerEvent
    Object.defineProperty(event, 'target', { value: document.body })
    vm.handlePointerDown(event)
    await vm.$nextTick()
    expect(vm.displayCustom).toBe(false)
  })

  it('handlePointerDown does not close gallery when displayCustom is false', async () => {
    const wrapper = mount(PulseGallery, { props: { images } })
    const vm = getVM(wrapper)
    vm.displayCustom = false
    const event = new MouseEvent('pointerdown') as unknown as PointerEvent
    Object.defineProperty(event, 'target', { value: document.body })
    vm.handlePointerDown(event)
    await vm.$nextTick()
    expect(vm.displayCustom).toBe(false)
  })
})
