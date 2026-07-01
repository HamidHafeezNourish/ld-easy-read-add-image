<script setup lang="ts">
import { ref, computed } from 'vue'
import AppShell from './layout/AppShell.vue'
import CarePlanHub from './screens/CarePlanHub.vue'
import CarePlanDomain from './screens/CarePlanDomain.vue'
import EasyReadView from './screens/EasyReadView.vue'
import ImageGalleryContent from './screens/ImageGalleryContent.vue'
import UploadPanel from './panels/UploadPanel.vue'
import EditPanel from './panels/EditPanel.vue'
import EasyReadPanel from './panels/EasyReadPanel.vue'
import PhotoDialog from './dialogs/PhotoDialog.vue'
import RecommendationsPanel from './panels/RecommendationsPanel.vue'
import CarePlanEditPanel from './panels/CarePlanEditPanel.vue'
import ReviewCarePlanPanel from './panels/ReviewCarePlanPanel.vue'

export type GalleryImage = {
  id: string
  src: string
  name: string
  size: number
  blurred: boolean
  date: string
  uploadedBy: string
}

type Section = 'home' | 'gallery' | 'domain' | 'easy-read'

const activeSection = ref<Section>('home')
const selectedDomainId = ref<string>('nutrition')
const easyRead = ref(false)
const easyReadPanelOpen = ref(false)

const editedCardTitles = ref<string[]>([])
const showRecommendations = ref(false)
const editingRecommendationTitle = ref<string | null>(null)
const reviewingRecommendationTitle = ref<string | null>(null)

function onCardEdited(title: string) {
  if (!editedCardTitles.value.includes(title)) editedCardTitles.value.push(title)
}

function onShowRecommendations() {
  showRecommendations.value = true
}

function onEditCard(title: string) {
  showRecommendations.value = false
  editingRecommendationTitle.value = title
}

function onReviewCard(title: string) {
  showRecommendations.value = false
  reviewingRecommendationTitle.value = title
}

function onCarePlanUpdated() {
  const title = editingRecommendationTitle.value
  editingRecommendationTitle.value = null
  reviewingRecommendationTitle.value = title
}

const DEMO_IMAGES: GalleryImage[] = [
  { id: 'd1', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="%232D6A8F"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="sans-serif">Photo 1</text></svg>', name: 'garden-visit.jpg', size: 245000, blurred: false, date: '18 Jun 2026', uploadedBy: 'Karim Bennett' },
  { id: 'd2', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="%235B8A4A"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="sans-serif">Photo 2</text></svg>', name: 'family-day.jpg', size: 198000, blurred: false, date: '17 Jun 2026', uploadedBy: 'Karim Bennett' },
  { id: 'd3', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="%236B5EA8"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="sans-serif">Photo 3</text></svg>', name: 'activity.jpg', size: 312000, blurred: true, date: '15 Jun 2026', uploadedBy: 'Karim Bennett' },
  { id: 'd4', src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="%23C45C2B"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="sans-serif">Photo 4</text></svg>', name: 'meal-time.jpg', size: 178000, blurred: false, date: '14 Jun 2026', uploadedBy: 'Karim Bennett' },
]

const images = ref<GalleryImage[]>(import.meta.env.VITE_DEMO === '1' ? DEMO_IMAGES : [])
const panel = ref<null | 'upload' | 'edit'>(null)
const editingImageId = ref<string | null>(null)
const photoDialogOpen = ref(false)
const activePhotoIndex = ref(0)

const editingImage = computed(() =>
  images.value.find(i => i.id === editingImageId.value) ?? null
)

function onUploaded(newImages: GalleryImage[]) {
  images.value.push(...newImages)
  panel.value = null
}

function openPhotoDialog(index: number) {
  activePhotoIndex.value = index
  photoDialogOpen.value = true
}

function openEditPanel(imageId: string) {
  editingImageId.value = imageId
  photoDialogOpen.value = false
  panel.value = 'edit'
}

function onBlurToggle(imageId: string) {
  const img = images.value.find(i => i.id === imageId)
  if (img) img.blurred = !img.blurred
}

function onDelete(imageId: string) {
  images.value = images.value.filter(i => i.id !== imageId)
  panel.value = null
  photoDialogOpen.value = false
}

const domainTitles: Record<string, string> = {
  nutrition: 'Nutrition & Hydration',
  behaviour: 'Behaviour',
  cognition: 'Cognition',
  communication: 'Communication',
  continence: 'Continence',
  cultural: 'Cultural & Spiritual',
  'daily-living': 'Daily Living',
  education: 'Education & Employment',
  medication: 'Medication',
  'mental-health': 'Mental Health',
  mobility: 'Mobility',
  'personal-care': 'Personal Care',
  sensory: 'Sensory',
  sexuality: 'Sexuality & Relationships',
  skin: 'Skin Integrity',
  sleep: 'Sleep',
  social: 'Social & Leisure',
  ltc: 'Long-term Conditions',
}

const selectedDomainTitle = computed(() => domainTitles[selectedDomainId.value] ?? 'Domain')

function onDomainClick(domainId: string) {
  selectedDomainId.value = domainId
  activeSection.value = 'domain'
}

function onNavigate(section: Section) {
  activeSection.value = section
  if (section === 'home') {
    easyRead.value = false
    easyReadPanelOpen.value = false
  }
}
</script>

<template>
  <AppShell
    :active-section="activeSection"
    :gallery-count="images.length"
    :easy-read="easyRead"
    :selected-domain-id="selectedDomainId"
    :recommendations-count="editedCardTitles.length"
    @navigate="onNavigate"
    @domain-click="onDomainClick"
    @toggle-easy-read="easyReadPanelOpen = true"
    @show-recommendations="onShowRecommendations"
  >
    <CarePlanHub
      v-if="activeSection === 'home'"
      @domain-click="onDomainClick"
    />
    <CarePlanDomain
      v-else-if="activeSection === 'domain'"
      :domain-id="selectedDomainId"
      :easy-read="easyRead"
      @back="activeSection = 'home'"
    />
    <EasyReadView
      v-else-if="activeSection === 'easy-read'"
      @back="activeSection = 'home'"
      @card-edited="onCardEdited"
    />
    <ImageGalleryContent
      v-else
      :images="images"
      @add-image="panel = 'upload'"
      @view-image="openPhotoDialog"
    />
  </AppShell>

  <UploadPanel
    v-if="panel === 'upload'"
    @close="panel = null"
    @uploaded="onUploaded"
  />
  <EditPanel
    v-if="panel === 'edit' && editingImage"
    :image="editingImage"
    @close="panel = null"
    @blur-toggle="onBlurToggle(editingImage!.id)"
    @delete="onDelete(editingImage!.id)"
  />
  <EasyReadPanel
    v-if="easyReadPanelOpen"
    @close="easyReadPanelOpen = false"
    @generate="() => { easyReadPanelOpen = false; activeSection = 'easy-read' }"
  />

  <RecommendationsPanel
    v-if="showRecommendations"
    :edited-titles="editedCardTitles"
    @close="showRecommendations = false"
    @edit-card="onEditCard"
    @review-card="onReviewCard"
  />

  <CarePlanEditPanel
    v-if="editingRecommendationTitle"
    :section-title="editingRecommendationTitle"
    @close="editingRecommendationTitle = null"
    @update="onCarePlanUpdated"
  />

  <ReviewCarePlanPanel
    v-if="reviewingRecommendationTitle"
    :section-title="reviewingRecommendationTitle"
    @close="reviewingRecommendationTitle = null"
  />

  <Teleport to="body">
    <Transition name="fade">
      <PhotoDialog
        v-if="photoDialogOpen && images.length"
        :images="images"
        :active-index="activePhotoIndex"
        @close="photoDialogOpen = false"
        @navigate="activePhotoIndex = $event"
        @edit="openEditPanel"
        @blur-toggle="onBlurToggle"
      />
    </Transition>
  </Teleport>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
