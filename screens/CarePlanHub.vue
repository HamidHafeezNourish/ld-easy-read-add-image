<script setup lang="ts">
import iconNeeds from '../assets/icon-needs.png'
import iconLogs from '../assets/icon-logs.png'
import iconDocs from '../assets/icon-documents.png'
import iconBehaviour from '../assets/icon-behaviour.png'

const emit = defineEmits<{ 'domain-click': [id: string] }>()

const recentlyUpdated = [
  { id: 1, domainId: 'nutrition', title: 'Infection prevention', category: 'Medication and healthcare', body: 'New interaction linked' },
  { id: 2, domainId: 'nutrition', title: 'Weight management', category: 'Nutrition and hydration', body: 'Planned outcome altered' },
  { id: 3, domainId: 'behaviour', title: 'Pressure injury prevention', category: 'Skin integrity', body: 'New need added' },
  { id: 4, domainId: 'nutrition', title: 'Pain monitoring', category: 'Medication and healthcare', body: 'Interaction recorded' },
  { id: 5, domainId: 'behaviour', title: 'Mobility assessment', category: 'Mobility and physical', body: 'Goal updated' },
]

type IconLetter = string

interface StackedItem {
  id: string
  title: string
  description: string
  iconBg: string
  iconColor: string
  iconLetter: IconLetter
  needs: number
  logs: number
  documents: number
}

const sectionItems: StackedItem[] = [
  {
    id: 'archive',
    title: 'Archive',
    description: 'Inactive and completed care plans moved to the Nourish Archive for record-keeping, compliance, and audit purposes.',
    iconBg: '#f8dfe8', iconColor: '#BE185D', iconLetter: 'A',
    needs: 13, logs: 4, documents: 2,
  },
  {
    id: 'recommendations',
    title: 'Recommendations',
    description: 'Review and manage care plan recommendations including suggested additions, modifications, and removals from the system.',
    iconBg: '#faf0eb', iconColor: '#C45C2B', iconLetter: 'R',
    needs: 3, logs: 2, documents: 2,
  },
]

const careDomains: StackedItem[] = [
  {
    id: 'behaviour',
    title: 'Behaviour',
    description: 'Understanding and responding to behavioural patterns with proactive strategies that promote safety, dignity, and emotional regulation in order to better provide substantial support.',
    iconBg: '#f8dfe8', iconColor: '#BE185D', iconLetter: 'B',
    needs: 13, logs: 4, documents: 2,
  },
  {
    id: 'cognition',
    title: 'Cognition and Mental Capacity',
    description: 'Covers cognitive status, memory, decision-making, and access to therapeutic resources to support psychological resilience.',
    iconBg: '#f0eef9', iconColor: '#6B5EA8', iconLetter: 'C',
    needs: 5, logs: 2, documents: 1,
  },
  {
    id: 'communication',
    title: 'Communication',
    description: 'Provides guidance on communication strategies, assistive technology, and coping strategies to promote effective interaction.',
    iconBg: '#e6eff5', iconColor: '#2D6A8F', iconLetter: 'C',
    needs: 3, logs: 1, documents: 2,
  },
  {
    id: 'continence',
    title: 'Continence',
    description: 'Documents continence management plans, equipment needs, and support strategies to maintain dignity and comfort.',
    iconBg: '#fef9c3', iconColor: '#92400E', iconLetter: 'C',
    needs: 2, logs: 3, documents: 1,
  },
  {
    id: 'cultural',
    title: 'Cultural, Religious & Spiritual Identity',
    description: 'Documents cultural beliefs, religious practices, dietary requirements, and spiritual needs that inform and direct daily care.',
    iconBg: '#faf0eb', iconColor: '#C45C2B', iconLetter: 'C',
    needs: 0, logs: 1, documents: 3,
  },
  {
    id: 'daily-living',
    title: 'Daily Living and Environment',
    description: 'Supports the ability to complete daily tasks and maintain independence, wellbeing, and safety in everyday environments.',
    iconBg: '#e6f4f1', iconColor: '#1B7A6E', iconLetter: 'D',
    needs: 7, logs: 5, documents: 4,
  },
  {
    id: 'education',
    title: 'Education & Employment',
    description: 'Supports goals and opportunities through tailored education, employment activities, social welfare, and accommodation support.',
    iconBg: '#f5ebf9', iconColor: '#8B4A9E', iconLetter: 'E',
    needs: 1, logs: 0, documents: 2,
  },
  {
    id: 'medication',
    title: 'Medication & Healthcare',
    description: 'Manages prescribed medications, therapeutic interventions, and healthcare appointments to maintain optimal health outcomes.',
    iconBg: '#e6eff5', iconColor: '#2D6A8F', iconLetter: 'M',
    needs: 5, logs: 3, documents: 8,
  },
  {
    id: 'mental-health',
    title: 'Mental Health',
    description: 'Monitors emotional wellbeing, mood patterns, and therapeutic support plans to promote psychological resilience.',
    iconBg: '#f0eef9', iconColor: '#6B5EA8', iconLetter: 'M',
    needs: 2, logs: 1, documents: 3,
  },
  {
    id: 'mobility',
    title: 'Mobility & Physical',
    description: 'Documents physical capabilities, mobility aids, physiotherapy requirements, and fall prevention strategies.',
    iconBg: '#edf5e9', iconColor: '#5B8A4A', iconLetter: 'M',
    needs: 4, logs: 2, documents: 6,
  },
  {
    id: 'nutrition',
    title: 'Nutrition & Hydration',
    description: 'Covers nutritional planning, dietary management, hydration needs, and assistance with meal preparation to promote wellbeing.',
    iconBg: '#fef3c7', iconColor: '#B45309', iconLetter: 'N',
    needs: 6, logs: 4, documents: 3,
  },
  {
    id: 'personal-care',
    title: 'Personal Care & Hygiene',
    description: 'Addresses personal hygiene routines, grooming preferences, and support strategies that maintain dignity and self-esteem.',
    iconBg: '#fce7f3', iconColor: '#BE185D', iconLetter: 'P',
    needs: 3, logs: 2, documents: 2,
  },
  {
    id: 'sensory',
    title: 'Sensory',
    description: 'Documents sensory sensitivities, processing differences, and environmental adjustments to support comfort and regulation.',
    iconBg: '#fff7ed', iconColor: '#C2410C', iconLetter: 'S',
    needs: 2, logs: 1, documents: 1,
  },
  {
    id: 'sexuality',
    title: 'Sexuality & Relationships',
    description: 'Supports healthy relationships, personal identity, and appropriate guidance in a person-centred and dignified manner.',
    iconBg: '#f5f3ff', iconColor: '#7C3AED', iconLetter: 'S',
    needs: 1, logs: 0, documents: 2,
  },
  {
    id: 'skin',
    title: 'Skin Integrity',
    description: 'Monitors skin condition, pressure injury prevention strategies, wound care plans, and repositioning requirements.',
    iconBg: '#fff1f2', iconColor: '#BE123C', iconLetter: 'S',
    needs: 3, logs: 5, documents: 4,
  },
  {
    id: 'sleep',
    title: 'Sleep & Rest',
    description: 'Documents sleep patterns, rest routines, and support strategies to promote restorative sleep and daily functioning.',
    iconBg: '#eef2ff', iconColor: '#3730A3', iconLetter: 'S',
    needs: 2, logs: 1, documents: 1,
  },
  {
    id: 'social',
    title: 'Social, Community & Recreation',
    description: 'Supports social engagement, community participation, recreational activities, and meaningful connections with others.',
    iconBg: '#ecfdf5', iconColor: '#065F46', iconLetter: 'S',
    needs: 4, logs: 3, documents: 2,
  },
  {
    id: 'ltc',
    title: 'Specific Diagnoses & LTCs',
    description: 'Documents specific diagnoses, long-term conditions, clinical protocols, and specialist care requirements.',
    iconBg: '#fef2f2', iconColor: '#B91C1C', iconLetter: 'S',
    needs: 8, logs: 6, documents: 5,
  },
]
</script>

<template>
  <div class="hub">

    <!-- ── Search ── -->
    <div class="hub__section hub__section--search">
      <p class="hub__section-label">Search</p>
      <div class="hub__search-bar">
        <svg class="hub__search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <input
          type="text"
          class="hub__search-input"
          placeholder="Search by care plan, needs, tags"
        />
      </div>
    </div>

    <!-- ── Recently Updated ── -->
    <div class="hub__section">
      <div class="hub__section-header">
        <p class="hub__section-label">Recently Updated</p>
        <div class="hub__carousel-dots">
          <span class="hub__dot hub__dot--active" />
          <span class="hub__dot" />
          <span class="hub__dot" />
        </div>
      </div>
      <div class="hub__carousel">
        <div
          v-for="item in recentlyUpdated"
          :key="item.id"
          class="hub__update-card"
          @click="emit('domain-click', item.domainId)"
        >
          <p class="hub__card-title">{{ item.title }}</p>
          <p class="hub__card-category">{{ item.category }}</p>
          <p class="hub__card-body">{{ item.body }}</p>
        </div>
      </div>
    </div>

    <!-- ── Section ── -->
    <div class="hub__section">
      <p class="hub__section-label">Section</p>
      <div class="hub__stacked-list">
        <div
          v-for="item in sectionItems"
          :key="item.id"
          class="hub__stacked-card"
          @click="emit('domain-click', item.id)"
        >
          <div class="hub__stacked-icon" :style="{ background: item.iconBg }">
            <span class="hub__stacked-letter" :style="{ color: item.iconColor }">{{ item.iconLetter }}</span>
          </div>
          <div class="hub__stacked-body">
            <p class="hub__stacked-title">{{ item.title }}</p>
            <p class="hub__stacked-desc">{{ item.description }}</p>
            <div class="hub__stacked-tags">
              <span class="hub__stat-tag hub__stat-tag--needs">
                <img :src="iconNeeds" alt="" class="hub__tag-icon" />
                Needs {{ item.needs }}
              </span>
              <span class="hub__stat-tag hub__stat-tag--logs">
                <img :src="iconLogs" alt="" class="hub__tag-icon" />
                Logs {{ item.logs }}
              </span>
              <span class="hub__stat-tag hub__stat-tag--docs">
                <img :src="iconDocs" alt="" class="hub__tag-icon" />
                Documents {{ item.documents }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── All Care Domains ── -->
    <div class="hub__section hub__section--last">
      <p class="hub__section-label">All Care Domains</p>
      <div class="hub__stacked-list">
        <div
          v-for="domain in careDomains"
          :key="domain.id"
          class="hub__stacked-card hub__stacked-card--domain"
          @click="emit('domain-click', domain.id)"
        >
          <div class="hub__stacked-icon" :style="{ background: domain.iconBg }">
            <img
              v-if="domain.id === 'behaviour'"
              :src="iconBehaviour"
              alt=""
              class="hub__domain-icon-img"
            />
            <span
              v-else
              class="hub__stacked-letter"
              :style="{ color: domain.iconColor }"
            >{{ domain.iconLetter }}</span>
          </div>
          <div class="hub__stacked-body">
            <p class="hub__stacked-title">{{ domain.title }}</p>
            <p class="hub__stacked-desc">{{ domain.description }}</p>
            <div class="hub__stacked-tags">
              <span class="hub__stat-tag hub__stat-tag--needs">
                <img :src="iconNeeds" alt="" class="hub__tag-icon" />
                Needs {{ domain.needs }}
              </span>
              <span class="hub__stat-tag hub__stat-tag--logs">
                <img :src="iconLogs" alt="" class="hub__tag-icon" />
                Logs {{ domain.logs }}
              </span>
              <span class="hub__stat-tag hub__stat-tag--docs">
                <img :src="iconDocs" alt="" class="hub__tag-icon" />
                Documents {{ domain.documents }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.hub {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  background: var(--pulse-color-neutral-20, #f3f4f5);
}

/* Sections */
.hub__section {
  padding: 20px 32px;
  background: var(--pulse-color-neutral-10);
  border-bottom: 1px solid var(--pulse-color-neutral-30);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hub__section--search {
  padding-bottom: 20px;
}

.hub__section--last {
  border-bottom: none;
}

.hub__section-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.hub__section-label {
  font-family: 'FS Me', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--pulse-color-neutral-120, #36393f);
  margin: 0;
}

/* Carousel dots */
.hub__carousel-dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.hub__dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background: var(--pulse-color-neutral-60, #9ca3af);
}

.hub__dot--active {
  width: 24px;
  background: var(--pulse-color-care-delivery-2, #dd5f8b);
}

/* Search */
.hub__search-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 52px;
  padding: 12px 17px;
  border: 1px solid var(--pulse-color-neutral-50, #d1d5db);
  border-radius: 4px;
  background: #fff;
}

.hub__search-icon {
  flex-shrink: 0;
  color: var(--pulse-color-neutral-80, #6b7280);
}

.hub__search-input {
  border: none;
  outline: none;
  flex: 1;
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: var(--pulse-color-neutral-120, #36393f);
  background: transparent;
}

.hub__search-input::placeholder {
  color: var(--pulse-color-neutral-70, #9ca3af);
}

/* Recently Updated carousel */
.hub__carousel {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
}

.hub__carousel::-webkit-scrollbar {
  height: 4px;
}

.hub__carousel::-webkit-scrollbar-thumb {
  background: var(--pulse-color-neutral-50);
  border-radius: 2px;
}

.hub__update-card {
  flex-shrink: 0;
  width: 280px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  transition: box-shadow 0.15s;
}

.hub__update-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08);
}

.hub__card-title {
  font-family: 'FS Me', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #2b5656;
  margin: 0;
  line-height: 1.2;
}

.hub__card-category {
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #3e7e7e;
  margin: 0;
}

.hub__card-body {
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #36393f;
  margin: 0;
  line-height: 1.35;
  margin-top: 2px;
}

/* Stacked list (Section + All Care Domains) */
.hub__stacked-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hub__stacked-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border: 1px solid #f3f4f5;
  border-radius: 5px;
  padding: 12px 21px;
  min-height: 112px;
  cursor: pointer;
  transition: background 0.12s, box-shadow 0.12s;
}

.hub__stacked-card:hover {
  background: var(--pulse-color-neutral-10);
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.hub__stacked-card--domain {
  /* same as base */
}

/* Icon bubble */
.hub__stacked-icon {
  width: 48px;
  height: 48px;
  border-radius: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hub__domain-icon-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.hub__stacked-letter {
  font-family: 'FS Me', sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
}

/* Stacked body */
.hub__stacked-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.hub__stacked-title {
  font-family: 'FS Me', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #2b5656;
  margin: 0;
  line-height: 1.2;
}

.hub__stacked-desc {
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #6c727e;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hub__stacked-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
}

/* Stat tags */
.hub__stat-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3.5px 7px;
  border-radius: 4px;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #36393f;
  white-space: nowrap;
}

.hub__stat-tag--needs {
  background: #f7e7ea;
}

.hub__stat-tag--logs {
  background: #dbdbec;
}

.hub__stat-tag--docs {
  background: #ecd9e9;
}

.hub__tag-icon {
  width: 10.5px;
  height: 10.5px;
  object-fit: contain;
  flex-shrink: 0;
}
</style>
