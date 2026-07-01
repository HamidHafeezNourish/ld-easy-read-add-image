<script setup lang="ts">
import PulseDrawer from '@/components/PulseDrawer/PulseDrawer.vue'
import PulseButton from '@/components/PulseButton/PulseButton.vue'

const props = defineProps<{ editedTitles: string[] }>()
const emit = defineEmits<{ close: []; editCard: [title: string]; reviewCard: [title: string] }>()

interface CardMeta {
  bg: string
  color: string
  letter: string
  identifiedNeed: string
  nextReview: string
}

const META: Record<string, CardMeta> = {
  'General Nutrition': {
    bg: '#fef3c7', color: '#B45309', letter: 'N',
    nextReview: '10 Jun—21 Jul 2025',
    identifiedNeed: 'Isabel follows a vegetarian diet, avoiding all meat, poultry, and fish. Her meals must consistently honour this preference while supporting her nutritional needs.',
  },
  'Communication': {
    bg: '#e6eff5', color: '#2D6A8F', letter: 'C',
    nextReview: '10 Jun—21 Jul 2025',
    identifiedNeed: 'Sarah benefits from clear, simple language and visual cues to aid understanding. Carers should use calm, patient communication styles and avoid jargon.',
  },
  'Mobility': {
    bg: '#edf5e9', color: '#5B8A4A', letter: 'M',
    nextReview: '10 Jun—21 Jul 2025',
    identifiedNeed: 'Sarah needs carer assistance to move between chairs and navigate stairs safely. She uses a grab rail on stairs.',
  },
}

function meta(title: string): CardMeta {
  return META[title] ?? { bg: '#f3f4f5', color: '#6c727e', letter: title[0], nextReview: '—', identifiedNeed: 'Care plan section.' }
}
</script>

<template>
  <PulseDrawer
    :visible="true"
    position="right"
    title="Recommendations"
    @update:visible="(v) => { if (!v) emit('close') }"
  >
    <div class="rp__body">

      <div class="rp__intro">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="rp__intro-icon">
          <circle cx="8" cy="8" r="7" stroke="#f97316" stroke-width="1.5"/>
          <path d="M8 5v3.5M8 10.5v.5" stroke="#f97316" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <p class="rp__intro-text">The following easy read cards have been updated. Review and update the relevant care plan sections to keep them in sync.</p>
      </div>

      <div class="rp__list">
        <div v-for="title in editedTitles" :key="title" class="rp__card">

          <!-- Card header -->
          <div class="rp__card-header">
            <div class="rp__card-icon" :style="{ background: meta(title).bg }">
              <span class="rp__card-letter" :style="{ color: meta(title).color }">{{ meta(title).letter }}</span>
            </div>
            <div class="rp__card-title-wrap">
              <p class="rp__card-title">{{ title }}</p>
              <p class="rp__card-review">Next review {{ meta(title).nextReview }}</p>
            </div>
            <span class="rp__card-badge">Easy Read updated</span>
          </div>

          <!-- Warning notice -->
          <div class="rp__card-notice">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="rp__notice-icon">
              <path d="M8 2L1.5 13.5h13L8 2z" stroke="#d97706" stroke-width="1.4" stroke-linejoin="round"/>
              <path d="M8 6.5v3M8 11v.5" stroke="#d97706" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
            <span class="rp__notice-text">The Easy Read was updated — the original care plan may no longer match.</span>
          </div>

          <!-- Identified need snippet -->
          <p class="rp__card-need">{{ meta(title).identifiedNeed }}</p>

          <!-- Actions -->
          <div class="rp__card-actions">
            <PulseButton label="Review" type="secondary" :small="true" @click="emit('reviewCard', title)" />
            <PulseButton label="Edit" type="primary" :small="true" @click="emit('editCard', title)" />
          </div>
        </div>
      </div>

    </div>

    <div class="rp__footer">
      <PulseButton label="Close" type="secondary" :full-width="true" @click="emit('close')" />
    </div>
  </PulseDrawer>
</template>

<style scoped>
.rp__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.rp__intro {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 8px;
  padding: 12px;
}

.rp__intro-icon { flex-shrink: 0; margin-top: 1px; }

.rp__intro-text {
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: #92400e;
  margin: 0;
  line-height: 1.5;
}

.rp__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rp__card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rp__card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rp__card-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rp__card-letter {
  font-family: 'FS Me', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
}

.rp__card-title-wrap {
  flex: 1;
  min-width: 0;
}

.rp__card-title {
  font-family: 'FS Me', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #2b5656;
  margin: 0 0 2px;
}

.rp__card-review {
  font-family: Inter, sans-serif;
  font-size: 11px;
  color: #6c727e;
  margin: 0;
}

.rp__card-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: 20px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  font-family: Inter, sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #c2410c;
  white-space: nowrap;
  flex-shrink: 0;
}

.rp__card-notice {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  background: #fffbeb;
  border-radius: 6px;
  padding: 8px 10px;
}

.rp__notice-icon { flex-shrink: 0; margin-top: 1px; }

.rp__notice-text {
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: #78350f;
  line-height: 1.5;
}

.rp__card-need {
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: #36393f;
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rp__card-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.rp__footer {
  padding-top: 16px;
  border-top: 1px solid var(--pulse-color-neutral-40);
  flex-shrink: 0;
}
</style>
