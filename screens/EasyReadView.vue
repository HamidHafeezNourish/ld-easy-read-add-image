<script setup lang="ts">
import { ref } from 'vue'
import EditEasyReadPanel from '../panels/EditEasyReadPanel.vue'
import ReviewCarePlanPanel from '../panels/ReviewCarePlanPanel.vue'

const emit = defineEmits<{ back: []; cardEdited: [title: string] }>()

interface EasyReadCard {
  id: string
  title: string
  nextReview: string
  imageType: 'nutrition' | 'communication' | 'mobility'
  lines: string[]
  customImageSrc?: string
  customImageLabel?: string
}

const cards = ref<EasyReadCard[]>([
  {
    id: 'general-nutrition',
    title: 'General Nutrition',
    nextReview: '10 Jun—21 Jul 2025',
    imageType: 'nutrition',
    lines: ["I like my grapefruit cut in small, even pieces so it’s easy to eat."],
  },
  {
    id: 'communication',
    title: 'Communication',
    nextReview: '10 Jun—21 Jul 2025',
    imageType: 'communication',
    lines: [
      'Please communicate with me clearly, kindly, and with patience.',
      'Do not use big words',
      'Do use your hands',
    ],
  },
  {
    id: 'mobility',
    title: 'Mobility',
    nextReview: '10 Jun—21 Jul 2025',
    imageType: 'mobility',
    lines: ['I need help from my carer getting up and down from chairs and going up stair cases'],
  },
])

const editingCard = ref<EasyReadCard | null>(null)
const reviewingCard = ref<EasyReadCard | null>(null)
const reviewingSectionTitle = ref<string | null>(null)
const highlightedCardId = ref<string | null>(null)
const publishState = ref<'idle' | 'loading' | 'done'>('idle')

function onPublish() {
  publishState.value = 'loading'
  setTimeout(() => { publishState.value = 'done' }, 2200)
  setTimeout(() => { publishState.value = 'idle' }, 4000)
}
</script>

<template>
  <div class="erv">
    <!-- Main content -->
    <main class="erv__main">

      <!-- Page header -->
      <div class="erv__header">
        <div class="erv__header-left">
          <div class="erv__header-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="#fbcfe8"/>
              <circle cx="14" cy="8" r="2" fill="#f472b6"/>
              <circle cx="14" cy="20" r="2" fill="#f472b6"/>
              <circle cx="8" cy="14" r="2" fill="#f472b6"/>
              <circle cx="20" cy="14" r="2" fill="#f472b6"/>
              <circle cx="10" cy="10" r="1.5" fill="#ec4899"/>
              <circle cx="18" cy="10" r="1.5" fill="#ec4899"/>
              <circle cx="10" cy="18" r="1.5" fill="#ec4899"/>
              <circle cx="18" cy="18" r="1.5" fill="#ec4899"/>
              <circle cx="14" cy="14" r="3" fill="#f9a8d4"/>
            </svg>
          </div>
          <div>
            <h1 class="erv__header-title">Easy Read Care Plan</h1>
            <p class="erv__header-desc">
              <strong>Description</strong> Covers nutritional planning, allergy management, and assistance with meal preparation to promote autonomy and health.
            </p>
          </div>
        </div>
        <button class="erv__publish-btn" :class="{ 'erv__publish-btn--loading': publishState === 'loading', 'erv__publish-btn--done': publishState === 'done' }" @click="onPublish">
          <svg v-if="publishState === 'idle'" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9l-3 1.5.5-3.5L3 4.5l3.5-.5L8 1z" fill="currentColor"/>
          </svg>
          <svg v-else-if="publishState === 'loading'" width="16" height="16" viewBox="0 0 16 16" fill="none" style="animation: erv-spin 0.8s linear infinite;">
            <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-dasharray="20 17" stroke-linecap="round"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ publishState === 'idle' ? 'Publish' : publishState === 'loading' ? 'Generating PDF…' : 'Done!' }}
        </button>
      </div>

      <!-- Cards -->
      <div class="erv__cards">
        <div v-for="card in cards" :key="card.id" class="erv__card" :class="{ 'erv__card--highlighted': highlightedCardId === card.id }">

          <!-- Card header -->
          <div class="erv__card-header">
            <div>
              <h2 class="erv__card-title">{{ card.title }}</h2>
              <p class="erv__card-review">Next review {{ card.nextReview }}</p>
            </div>
            <div class="erv__card-actions">
              <button class="erv__action-btn erv__action-btn--outline" @click="reviewingCard = card; highlightedCardId = card.id">Review Careplan</button>
              <button class="erv__action-btn erv__action-btn--outline" @click="editingCard = card">Edit</button>
              <button class="erv__action-btn erv__action-btn--icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="4" r="1.5" fill="currentColor"/>
                  <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
                  <circle cx="9" cy="14" r="1.5" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Card body -->
          <div class="erv__card-body">
            <!-- Image -->
            <div class="erv__card-image">
              <!-- Custom image from database -->
              <img v-if="card.customImageSrc" :src="card.customImageSrc" :alt="card.customImageLabel" class="erv__card-image-custom" />
              <!-- Nutrition image -->
              <svg v-else-if="card.imageType === 'nutrition' && !card.customImageSrc" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <rect width="200" height="200" fill="#8B6914"/>
                <rect x="0" y="140" width="200" height="60" fill="#7a5c10"/>
                <circle cx="100" cy="100" r="65" fill="#FF6B35" opacity="0.9"/>
                <circle cx="100" cy="100" r="52" fill="#FF8C42"/>
                <circle cx="100" cy="100" r="12" fill="#FFA559"/>
                <line x1="100" y1="35" x2="100" y2="165" stroke="#e05a20" stroke-width="2.5"/>
                <line x1="35" y1="100" x2="165" y2="100" stroke="#e05a20" stroke-width="2.5"/>
                <line x1="54" y1="54" x2="146" y2="146" stroke="#e05a20" stroke-width="2.5"/>
                <line x1="146" y1="54" x2="54" y2="146" stroke="#e05a20" stroke-width="2.5"/>
                <circle cx="70" cy="70" r="10" fill="#FF6B35" opacity="0.7"/>
                <circle cx="130" cy="70" r="10" fill="#FF6B35" opacity="0.7"/>
              </svg>
              <!-- Communication image -->
              <svg v-else-if="!card.customSvg && card.imageType === 'communication'" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <rect width="200" height="200" fill="#6b7280"/>
                <rect x="0" y="120" width="200" height="80" fill="#4b5563"/>
                <circle cx="110" cy="65" r="30" fill="#d1a97a"/>
                <rect x="80" y="95" width="60" height="80" rx="6" fill="#3b82f6" opacity="0.8"/>
                <path d="M110 95 Q140 120 155 110" stroke="#d1a97a" stroke-width="10" stroke-linecap="round" fill="none"/>
                <path d="M110 95 Q80 120 65 115" stroke="#d1a97a" stroke-width="8" stroke-linecap="round" fill="none"/>
              </svg>
              <!-- Mobility image -->
              <svg v-else-if="!card.customSvg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <rect width="200" height="200" fill="#c7d2e0"/>
                <rect x="0" y="155" width="200" height="45" fill="#a8b5c4"/>
                <rect x="30" y="80" width="140" height="80" rx="4" fill="#e8f0fa" opacity="0.5"/>
                <circle cx="70" cy="70" r="14" fill="#d1a97a"/>
                <rect x="56" y="84" width="28" height="50" rx="4" fill="#2b5656"/>
                <path d="M56 110 Q45 130 50 150" stroke="#2b5656" stroke-width="8" stroke-linecap="round" fill="none"/>
                <path d="M84 110 Q95 130 90 150" stroke="#2b5656" stroke-width="8" stroke-linecap="round" fill="none"/>
                <circle cx="140" cy="65" r="12" fill="#c08060"/>
                <rect x="128" y="77" width="24" height="45" rx="4" fill="#6b7280"/>
                <path d="M128 100 Q115 118 120 145" stroke="#6b7280" stroke-width="7" stroke-linecap="round" fill="none"/>
                <path d="M152 100 Q160 115 155 145" stroke="#6b7280" stroke-width="7" stroke-linecap="round" fill="none"/>
                <line x1="110" y1="110" x2="130" y2="100" stroke="#d1a97a" stroke-width="4" stroke-linecap="round"/>
              </svg>
            </div>

            <!-- Text -->
            <div class="erv__card-text">
              <p v-for="line in card.lines" :key="line" class="erv__card-line">{{ line }}</p>
            </div>
          </div>

        </div>
      </div>
    </main>

    <!-- Edit panel -->
    <EditEasyReadPanel
      v-if="editingCard"
      :section-title="editingCard.title"
      :default-text="editingCard.lines.join('\n')"
      @close="editingCard = null"
      @save="(lines, img) => { const t = editingCard!.title; editingCard!.lines = lines; if (img) { editingCard!.customImageSrc = img.src; editingCard!.customImageLabel = img.label } editingCard = null; emit('cardEdited', t) }"
      @view-page="(page) => { reviewingSectionTitle = page }"
    />

    <!-- Review Careplan panel (from card button — no back nav) -->
    <ReviewCarePlanPanel
      v-if="reviewingCard"
      :section-title="reviewingCard.title"
      @close="reviewingCard = null; highlightedCardId = null"
    />

    <!-- Review Careplan panel (from image gallery link — back nav returns to gallery) -->
    <ReviewCarePlanPanel
      v-if="reviewingSectionTitle"
      :section-title="reviewingSectionTitle"
      breadcrumb="Back to image database"
      @close="reviewingSectionTitle = null"
      @navigate-back="reviewingSectionTitle = null"
    />
  </div>
</template>

<style scoped>
@keyframes erv-spin {
  to { transform: rotate(360deg); }
}

.erv {
  display: flex;
  height: 100%;
  overflow: hidden;
  background: var(--pulse-color-neutral-20, #f3f4f5);
}

/* Main */
.erv__main {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* Header */
.erv__header {
  background: #fff;
  border-bottom: 1px solid var(--pulse-color-neutral-30);
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-shrink: 0;
}

.erv__header-left {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
}

.erv__header-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.erv__header-title {
  font-family: 'FS Me', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #2b5656;
  margin: 0 0 4px;
}

.erv__header-desc {
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: #6c727e;
  margin: 0;
  line-height: 1.4;
}

.erv__header-desc strong {
  color: #36393f;
  font-weight: 600;
}

.erv__publish-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 22px;
  border-radius: 24px;
  border: none;
  background: var(--pulse-color-primary-100, #2b5656);
  color: #fff;
  font-family: 'FS Me', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s;
  white-space: nowrap;
}

.erv__publish-btn:hover {
  background: var(--pulse-color-primary-120, #1e3e3e);
}

.erv__publish-btn--loading {
  background: #6b9e9e;
  cursor: default;
}

.erv__publish-btn--done {
  background: #166534;
}

/* Cards */
.erv__cards {
  flex: 1;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.erv__card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid var(--pulse-color-neutral-30);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.erv__card--highlighted {
  border-color: var(--pulse-color-primary-100, #2b5656);
  box-shadow: 0 0 0 3px rgba(43, 86, 86, 0.18);
}

/* Card header */
.erv__card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
  border-bottom: 1px solid var(--pulse-color-neutral-20);
  gap: 16px;
}

.erv__card-title {
  font-family: 'FS Me', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #36393f;
  margin: 0 0 2px;
}

.erv__card-review {
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: #6c727e;
  margin: 0;
}

.erv__card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.erv__action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 14px;
  border-radius: 20px;
  font-family: Inter, sans-serif;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.12s;
}

.erv__action-btn--outline {
  border: 1px solid var(--pulse-color-neutral-50);
  background: transparent;
  color: #36393f;
}

.erv__action-btn--outline:hover {
  background: var(--pulse-color-neutral-20);
}

.erv__action-btn--icon {
  border: 1px solid var(--pulse-color-neutral-50);
  background: transparent;
  color: #6c727e;
  padding: 5px 8px;
  border-radius: 6px;
}

.erv__action-btn--icon:hover {
  background: var(--pulse-color-neutral-20);
}

/* Card body */
.erv__card-body {
  display: flex;
  gap: 28px;
  padding: 24px 20px;
  align-items: flex-start;
}

.erv__card-image {
  width: 160px;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: #e5e7eb;
}

.erv__card-image-custom {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.erv__card-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 4px;
}

.erv__card-line {
  font-family: 'FS Me', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #36393f;
  margin: 0;
  line-height: 1.4;
}
</style>
