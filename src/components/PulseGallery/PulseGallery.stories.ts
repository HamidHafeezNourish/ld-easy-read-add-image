import PulseGallery from './PulseGallery.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

export default {
  title: 'Components/Media/PulseGallery',
  component: PulseGallery,
  argTypes: {
    images: {
      control: 'object',
      caption: 'Images',
      description: 'Array of image objects with itemImageSrc, thumbnailImageSrc, alt, title, caption, and metadata',
    },
  },
} satisfies Meta<typeof PulseGallery>

const Template: StoryFn<typeof PulseGallery> = (args) => ({
  components: { PulseGallery },
  setup() {
    return { args }
  },
  template: `<PulseGallery v-bind="args" />`,
})

export const Default = Template.bind({})
Default.args = {
  title: 'Sample Pulse Gallery',
  images: [
    {
      itemImageSrc: 'https://picsum.photos/id/1025/1200/800',
      thumbnailImageSrc: 'https://picsum.photos/id/1025/200/200',
      alt: 'Puppy sitting in a field',
      caption: 'Date: 10 Jun 2024(1h 30m) | By: Karim Bennet',
      title: 'Field Pup',
      metadata:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using  making it look like readable English. download.jpeg',
    },
    {
      itemImageSrc: 'https://picsum.photos/id/1018/800/1200',
      thumbnailImageSrc: 'https://picsum.photos/id/1018/200/300',
      alt: 'Mountain lake reflection',
      title: 'Alpine Mirror',
      metadata:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using  making it look like readable English. download.jpeg',
      caption: 'Date: 10 Jun 2024(1h 30m) | By: Karim Bennet',
    },
    {
      itemImageSrc: 'https://picsum.photos/id/1011/1000/750',
      thumbnailImageSrc: 'https://picsum.photos/id/1011/250/188',
      alt: 'Dense forest canopy',
      title: 'Emerald Canopy',
      metadata: 'Captured: 2021-07-18 · Location: Fern Gully',
      caption: 'Date: 10 Jun 2024(1h 30m) | By: Karim Bennet',
    },
    {
      itemImageSrc: 'https://picsum.photos/id/1024/750/1000',
      thumbnailImageSrc: 'https://picsum.photos/id/1024/188/250',
      alt: 'Sheep in a pasture',
      title: 'Pasture Calm',
      metadata: 'Captured: 2020-09-05 · Location: Yorkshire Dales',
      caption: 'Date: 10 Jun 2024(1h 30m) | By: Karim Bennet',
    },
    {
      itemImageSrc: 'https://picsum.photos/id/1059/900/500',
      thumbnailImageSrc: 'https://picsum.photos/id/1059/225/125',
      alt: 'Lighthouse at sunset',
      title: 'Beacon Glow',
      metadata: 'Captured: 2022-05-26 · Location: Point Reyes',
      caption: 'Date: 10 Jun 2024(1h 30m) | By: Karim Bennet',
    },
    {
      itemImageSrc: 'https://picsum.photos/id/1003/1024/512',
      thumbnailImageSrc: 'https://picsum.photos/id/1003/256/128',
      alt: 'Fog rolling over hills',
      title: 'Morning Mist',
      metadata: 'Captured: 2019-03-12 · Location: Big Sur',
      caption: 'Date: 10 Jun 2024(1h 30m) | By: Karim Bennet',
    },
    {
      itemImageSrc: 'https://picsum.photos/id/1005/512/1024',
      thumbnailImageSrc: 'https://picsum.photos/id/1005/128/256',
      alt: 'Bridge across a river',
      title: 'Crossing Point',
      caption: 'Date: 10 Jun 2024(1h 30m) | By: Karim Bennet',
      metadata: 'Captured: 2021-04-22 · Location: Portland',
    },
    {
      itemImageSrc: 'https://picsum.photos/id/1035/700/700',
      thumbnailImageSrc: 'https://picsum.photos/id/1035/175/175',
      alt: 'Snow-capped mountain ridge',
      title: 'Ridge Line',
      caption: 'Date: 10 Jun 2024(1h 30m) | By: Karim Bennet',
      metadata: 'Captured: 2020-12-11 · Location: Banff',
    },
    {
      itemImageSrc: 'https://picsum.photos/id/1043/900/700',
      thumbnailImageSrc: 'https://picsum.photos/id/1043/225/175',
      alt: 'Hot air balloons at sunrise',
      title: 'Balloon Dawn',
      caption: 'Date: 10 Jun 2024(1h 30m) | By: Karim Bennet',
      metadata: 'Captured: 2021-08-30 · Location: Cappadocia',
    },
    {
      itemImageSrc: 'https://picsum.photos/id/1040/1200/500',
      thumbnailImageSrc: 'https://picsum.photos/id/1040/200/100',
      alt: 'Desert highway perspective',
      title: 'Endless Road',
      caption: 'Date: 10 Jun 2024(1h 30m) | By: Karim Bennet',
      metadata: 'Captured: 2019-06-07 · Location: Route 66',
    },
    {
      itemImageSrc: 'https://picsum.photos/id/1033/500/1200',
      thumbnailImageSrc: 'https://picsum.photos/id/1033/125/300',
      alt: 'Rocky coastline waves',
      title: 'Coastal Crash',
      caption: 'Date: 10 Jun 2024(1h 30m) | By: Karim Bennet',
      metadata: 'Captured: 2022-01-19 · Location: Algarve',
    },
    {
      itemImageSrc: 'https://picsum.photos/id/1050/1000/600',
      thumbnailImageSrc: 'https://picsum.photos/id/1050/250/150',
      alt: 'City street at night',
      title: 'Neon Alley',
      caption: 'Date: 10 Jun 2024(1h 30m) | By: Karim Bennet',
      metadata: 'Captured: 2020-04-14 · Location: Shinjuku',
    },
  ],
}
