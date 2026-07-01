<script setup lang="ts">
import { ref, computed } from 'vue'
import PulseDrawer from '@/components/PulseDrawer/PulseDrawer.vue'
import PulseButton from '@/components/PulseButton/PulseButton.vue'
import ImageGalleryModal from '../dialogs/ImageGalleryModal.vue'

const props = defineProps<{ sectionTitle: string }>()
const emit = defineEmits<{ close: []; select: [image: { src: string; label: string }]; viewPage: [page: string] }>()

interface GalleryImage { label: string; src: string; page: string }

const BASE = 'https://images.unsplash.com/photo-'
const Q = '?w=400&h=400&fit=crop&q=80&auto=format'

const ALL_IMAGES: GalleryImage[] = [
  { label: 'Colourful salad bowl',       page: 'General Nutrition',            src: `${BASE}1546069901-ba9599a7e63c${Q}` },
  { label: 'Fresh mixed vegetables',     page: 'General Nutrition',            src: `${BASE}1512621776951-a57141f2eefd${Q}` },
  { label: 'Healthy meal spread',        page: 'General Nutrition',            src: `${BASE}1490645935967-10de6ba17061${Q}` },
  { label: 'Colourful grain bowls',      page: 'Food Allergies',               src: `${BASE}1498837167922-ddd27525d352${Q}` },
  { label: 'Plate of food',              page: 'Food Allergies',               src: `${BASE}1504674900247-0877df9cc836${Q}` },
  { label: 'Healthy balanced meal',      page: 'Weight Management',            src: `${BASE}1540189549336-e6e99c3679fe${Q}` },
  { label: 'Food on a table',            page: 'Weight Management',            src: `${BASE}1567306226416-28f0efdc88ce${Q}` },
  { label: 'Pizza slice',                page: 'Diet Need',                    src: `${BASE}1565299624946-b28f40a0ae38${Q}` },
  { label: 'Burger and chips',           page: 'Diet Need',                    src: `${BASE}1555939594-58d7cb561ad1${Q}` },
  { label: 'Cup of coffee',              page: 'General Nutrition',            src: `${BASE}1509042239860-f550ce710b93${Q}` },
  { label: 'Water with lemon',           page: 'Dysphagia / Swallowing',       src: `${BASE}1495474472287-4d71bcdd2085${Q}` },
  { label: 'Coffee mug',                 page: 'General Nutrition',            src: `${BASE}1544145945-f90425340c7e${Q}` },
  { label: 'Water bottle',               page: 'Dysphagia / Swallowing',       src: `${BASE}1497534446932-c925b458314e${Q}` },
  { label: 'Cup of tea',                 page: 'Enteral Feeding',              src: `${BASE}1563227812-0ea4c22e6cc8${Q}` },
  { label: 'Iced drinks',                page: 'Enteral Feeding',              src: `${BASE}1571091655789-405eb7a3a3a8${Q}` },
  { label: 'Glass of water',             page: 'Dysphagia / Swallowing',       src: `${BASE}1553361371-9b996a9c3d20${Q}` },
  { label: 'Green tea',                  page: 'General Nutrition',            src: `${BASE}1576092768241-dec231879fc3${Q}` },
  { label: 'Woman in conversation',      page: 'Communication',                src: `${BASE}1573497019940-1c28c88b4f3e${Q}` },
  { label: 'Friends laughing together',  page: 'Communication',                src: `${BASE}1543269865-cbf427effbad${Q}` },
  { label: 'Group of people talking',    page: 'Communication',                src: `${BASE}1529156069898-49953e39b3ac${Q}` },
  { label: 'Person on the phone',        page: 'Communication',                src: `${BASE}1573496359142-b8d87734a5a2${Q}` },
  { label: 'Two people in conversation', page: 'Communication',                src: `${BASE}1531538606174-0f90ff5dce83${Q}` },
  { label: 'Person portrait',            page: 'Communication',                src: `${BASE}1494790108377-be9c29b29330${Q}` },
  { label: 'Carer with elderly person',  page: 'Mobility',                     src: `${BASE}1576765607924-3f7b8410a787${Q}` },
  { label: 'Physiotherapy session',      page: 'Mobility',                     src: `${BASE}1559757175-5700dde675bc${Q}` },
  { label: 'Healthcare support',         page: 'Mobility',                     src: `${BASE}1576091160550-2173dba999ef${Q}` },
  { label: 'Nurse with patient',         page: 'Mobility',                     src: `${BASE}1532938911079-1b06ac7ceec7${Q}` },
  { label: 'Elderly person walking',     page: 'Mobility',                     src: `${BASE}1582750433449-648ed127bb54${Q}` },
  { label: 'Healthcare professional',    page: 'Mobility',                     src: `${BASE}1581056771107-24ca5f033842${Q}` },
]

const PAGE_SIZE = 9

const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(ALL_IMAGES.length / PAGE_SIZE))
const pagedImages = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return ALL_IMAGES.slice(start, start + PAGE_SIZE)
})

// Modal state: index into ALL_IMAGES
const modalIndex = ref<number | null>(null)

function openModal(pagedIndex: number) {
  modalIndex.value = (currentPage.value - 1) * PAGE_SIZE + pagedIndex
}

function onModalSelect(img: GalleryImage) {
  modalIndex.value = null
  emit('select', img)
  emit('close')
}

function onModalViewPage(page: string) {
  modalIndex.value = null
  emit('viewPage', page)
}
</script>

<template>
  <PulseDrawer
    :visible="true"
    position="right"
    title="Image Gallery"
    :breadcrumb="`Easy Read for ${props.sectionTitle}`"
    :breadcrumb-callback="() => emit('close')"
    @update:visible="(v) => { if (!v) emit('close') }"
  >
    <div class="idp__body">

      <div class="idp__divider" />

      <div class="idp__block">
        <h5 class="idp__subtitle">Images ({{ ALL_IMAGES.length }})</h5>

        <div class="idp__grid">
          <button
            v-for="(img, i) in pagedImages"
            :key="i"
            class="idp__tile"
            :title="img.label"
            @click="openModal(i)"
          >
            <img :src="img.src" :alt="img.label" class="idp__tile-img" />
          </button>
        </div>
      </div>

      <div class="idp__pagination">
        <button class="idp__page-btn" :disabled="currentPage === 1" @click="currentPage = 1">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M11 4L7 8l4 4M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button class="idp__page-btn" :disabled="currentPage === 1" @click="currentPage = Math.max(1, currentPage - 1)">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button
          v-for="p in totalPages"
          :key="p"
          class="idp__page-num"
          :class="{ 'idp__page-num--active': currentPage === p }"
          @click="currentPage = p"
        >{{ p }}</button>
        <button class="idp__page-btn" :disabled="currentPage === totalPages" @click="currentPage = Math.min(totalPages, currentPage + 1)">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button class="idp__page-btn" :disabled="currentPage === totalPages" @click="currentPage = totalPages">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5 4l4 4-4 4M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>

    </div>

    <div class="idp__footer">
      <PulseButton label="Close" type="secondary" :full-width="true" @click="emit('close')" />
    </div>
  </PulseDrawer>

  <!-- Image modal -->
  <ImageGalleryModal
    v-if="modalIndex !== null"
    :images="ALL_IMAGES"
    :active-index="modalIndex"
    @close="modalIndex = null"
    @select="onModalSelect"
    @view-page="onModalViewPage"
    @navigate="(i) => { modalIndex = i }"
  />
</template>

<style scoped>
.idp__body {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.idp__divider {
  height: 1px;
  background: var(--pulse-color-neutral-30, #f3f4f5);
  margin: 8px 0;
}

.idp__block {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 0 16px;
}

.idp__subtitle {
  font-family: 'FS Me', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--pulse-color-primary-100, #2b5656);
  margin: 0;
}

.idp__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.idp__tile {
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  border: 2px solid transparent;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: var(--pulse-color-neutral-30, #f3f4f5);
  transition: border-color 0.12s, transform 0.1s;
}

.idp__tile:hover {
  border-color: var(--pulse-color-primary-100, #2b5656);
  transform: scale(1.02);
}

.idp__tile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.idp__pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 0 16px;
}

.idp__page-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: #6c727e;
  transition: background 0.1s;
}

.idp__page-btn:hover:not(:disabled) { background: var(--pulse-color-neutral-20); }
.idp__page-btn:disabled { opacity: 0.35; cursor: default; }

.idp__page-num {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: #36393f;
  transition: background 0.1s;
}

.idp__page-num:hover { background: var(--pulse-color-neutral-20); }
.idp__page-num--active {
  background: var(--pulse-color-primary-100, #2b5656);
  color: #fff;
  font-weight: 600;
}

.idp__footer {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--pulse-color-neutral-40);
  flex-shrink: 0;
}
</style>
