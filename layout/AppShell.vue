<script setup lang="ts">
import { ref } from 'vue'
import PulseButton from '@/components/PulseButton/PulseButton.vue'
import PulseIcon from '@/components/PulseIcon/PulseIcon.vue'
import PulseTag from '@/components/PulseTag/PulseTag.vue'
import avatarSarah from '../assets/avatar-sarah.png'
import iconPencil from '../assets/icon-pencil.png'

type Section = 'home' | 'gallery' | 'domain' | 'easy-read'

const props = defineProps<{
  activeSection: Section
  galleryCount: number
  easyRead?: boolean
  selectedDomainId?: string
  recommendationsCount?: number
}>()

const emit = defineEmits<{
  navigate: [section: Section]
  'domain-click': [domainId: string]
  'toggle-easy-read': []
  'show-recommendations': []
}>()

const expandedSections = ref(new Set<string>(['care-plan']))

function toggleSection(id: string) {
  if (expandedSections.value.has(id)) expandedSections.value.delete(id)
  else expandedSections.value.add(id)
}

const careDomains = [
  { id: 'behaviour',     label: 'Behaviour' },
  { id: 'cognition',     label: 'Cognition and Mental Capacity' },
  { id: 'communication', label: 'Communication' },
  { id: 'continence',    label: 'Continence' },
  { id: 'cultural',      label: 'Cultural, Religious & Spiritual Identity' },
  { id: 'daily-living',  label: 'Daily Living and Environment' },
  { id: 'education',     label: 'Education & Employment' },
  { id: 'medication',    label: 'Medication & Healthcare' },
  { id: 'mental-health', label: 'Mental Health' },
  { id: 'mobility',      label: 'Mobility & Physical' },
  { id: 'nutrition',     label: 'Nutrition & Hydration' },
  { id: 'personal-care', label: 'Personal Care & Hygiene' },
  { id: 'sensory',       label: 'Sensory' },
  { id: 'sexuality',     label: 'Sexuality & Relationships' },
  { id: 'skin',          label: 'Skin Integrity' },
  { id: 'sleep',         label: 'Sleep & Rest' },
  { id: 'social',        label: 'Social, Community & Recreation' },
  { id: 'ltc',           label: 'Specific Diagnoses & LTCs' },
]

const nutritionNeeds = [
  'General Nutrition',
  'General Nutrition and Hydration',
  'Dysphagia / Swallowing',
  'Food Allergies',
  'Enteral Feeding',
  'Weight Management',
]
const activeNutritionNeed = ref('Food Allergies')

const easyReadItems = [
  { id: 'general-nutrition', label: 'General Nutrition' },
  { id: 'communication',     label: 'Communication' },
  { id: 'mobility',          label: 'Mobility' },
]
const activeEasyReadId = ref('general-nutrition')
</script>

<template>
  <div class="shell">
    <!-- ── Top bar ── -->
    <header class="shell__topbar">
      <span class="shell__logo">nourish</span>
      <span class="shell__topbar-title">Care Plan</span>
      <nav class="shell__topnav">
        <button class="shell__tab"><PulseIcon icon="account" size="small" />Profile</button>
        <button class="shell__tab"><PulseIcon icon="connect" size="small" />Circle of Care</button>
        <button class="shell__tab"><PulseIcon icon="document" size="small" />Assessments</button>
        <button class="shell__tab"><PulseIcon icon="clock" size="small" />Timeline</button>
        <button class="shell__tab shell__tab--active"><PulseIcon icon="document" size="small" />Care Plan</button>
        <button class="shell__tab"><PulseIcon icon="alert" size="small" />Warnings</button>
        <button class="shell__tab"><PulseIcon icon="target" size="small" />Goals</button>
      </nav>
      <div class="shell__topbar-avatar">SJ</div>
    </header>

    <div class="shell__body">
      <!-- ── Icon rail ── -->
      <div class="shell__rail">
        <button class="shell__rail-btn"><PulseIcon icon="hamburger" size="small" /></button>
        <div class="shell__rail-sep" />
        <div class="shell__rail-initials">NCS</div>
        <button class="shell__rail-btn"><PulseIcon icon="account" size="small" /></button>
        <button class="shell__rail-btn"><PulseIcon icon="connect" size="small" /></button>
        <button class="shell__rail-btn"><PulseIcon icon="document" size="small" /></button>
        <button class="shell__rail-btn"><PulseIcon icon="clock" size="small" /></button>
        <button class="shell__rail-btn shell__rail-btn--active"><PulseIcon icon="document" size="small" /></button>
        <button class="shell__rail-btn"><PulseIcon icon="alert" size="small" /></button>
        <button class="shell__rail-btn"><PulseIcon icon="target" size="small" /></button>
        <div class="shell__rail-spacer" />
        <button class="shell__rail-btn shell__rail-btn--avatar"><PulseIcon icon="account" size="small" /></button>
      </div>

      <!-- ── Text sidebar ── -->
      <aside class="shell__sidebar">

        <!-- Top actions: differs by section -->
        <template v-if="activeSection === 'domain'">
          <!-- Domain page: Back to Care Plan Hub button, right-aligned -->
          <div class="shell__sidebar-actions shell__sidebar-actions--end">
            <PulseButton
              label="Back to Care Plan Hub"
              type="secondary"
              icon="previous"
              :small="true"
              @click="emit('navigate', 'home')"
            />
          </div>
        </template>
        <template v-else-if="activeSection === 'easy-read'">
          <!-- Easy Read page: Back to Care Plan button, right-aligned -->
          <div class="shell__sidebar-actions shell__sidebar-actions--end">
            <PulseButton
              label="Back to Care Plan"
              type="secondary"
              icon="previous"
              :small="true"
              @click="emit('navigate', 'home')"
            />
          </div>
        </template>
        <template v-else>
          <!-- Hub page: Add Item + pencil icon -->
          <div class="shell__sidebar-actions">
            <button class="shell__add-btn">Add Item</button>
            <button class="shell__icon-btn" title="Edit">
              <img :src="iconPencil" alt="Edit" class="shell__pencil-icon" />
            </button>
          </div>
        </template>

        <hr class="shell__divider" />

        <!-- ── Easy Read mode ── -->
        <template v-if="activeSection === 'easy-read'">

          <!-- Recommendations at the top — only when easy reads have been edited -->
          <template v-if="props.recommendationsCount && props.recommendationsCount > 0">
            <nav class="shell__sidenav">
              <button class="shell__nav-item" @click="emit('show-recommendations')">
                <span class="shell__nav-label">Recommendations</span>
                <span class="shell__badge--orange">{{ props.recommendationsCount }}</span>
              </button>
            </nav>
            <hr class="shell__divider" />
          </template>

          <!-- Easy read page items -->
          <nav class="shell__sidenav">
            <button
              v-for="item in easyReadItems"
              :key="item.id"
              class="shell__nav-item"
              :class="{ 'shell__nav-item--active': activeEasyReadId === item.id }"
              @click="activeEasyReadId = item.id"
            >
              <span class="shell__dot"></span>
              <span class="shell__nav-label">{{ item.label }}</span>
            </button>
          </nav>
        </template>

        <!-- ── Normal (care plan) mode ── -->
        <template v-else>

          <!-- Quick links: only on hub page -->
          <template v-if="activeSection === 'home'">
            <nav class="shell__sidenav">
              <button class="shell__nav-item" @click="emit('show-recommendations')">
                <span class="shell__nav-label">Recommendations</span>
                <span v-if="props.recommendationsCount && props.recommendationsCount > 0" class="shell__badge--orange">{{ props.recommendationsCount }}</span>
              </button>
              <button class="shell__nav-item">
                <span class="shell__nav-label">Archived</span>
              </button>
            </nav>

            <hr class="shell__divider" />
          </template>

          <!-- Care Plan tree -->
          <nav class="shell__sidenav">
            <!-- Level 0: Care Plan -->
            <button class="shell__nav-item" @click="toggleSection('care-plan')">
              <svg
                class="shell__caret"
                :class="{ 'shell__caret--open': expandedSections.has('care-plan') }"
                width="16" height="16" viewBox="0 0 16 16" fill="none"
              >
                <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="shell__nav-label">Care Plan</span>
            </button>

            <template v-if="expandedSections.has('care-plan')">
              <template v-for="domain in careDomains" :key="domain.id">
                <!-- Level 1: Domain -->
                <button
                  class="shell__nav-item shell__nav-item--l1"
                  :class="{
                    'shell__nav-item--active':
                      selectedDomainId === domain.id &&
                      activeSection === 'domain' &&
                      !(domain.id === 'nutrition' && activeSection === 'domain')
                  }"
                  @click="emit('domain-click', domain.id)"
                >
                  <svg
                    class="shell__caret"
                    :class="{
                      'shell__caret--open':
                        domain.id === 'nutrition' &&
                        selectedDomainId === 'nutrition' &&
                        activeSection === 'domain'
                    }"
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                  >
                    <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span class="shell__nav-label">{{ domain.label }}</span>
                </button>

                <!-- Level 2: Nutrition sub-items -->
                <template
                  v-if="domain.id === 'nutrition' && selectedDomainId === 'nutrition' && activeSection === 'domain'"
                >
                  <button
                    v-for="need in nutritionNeeds"
                    :key="need"
                    class="shell__nav-item shell__nav-item--l2"
                    :class="{ 'shell__nav-item--active': activeNutritionNeed === need }"
                    @click.stop="activeNutritionNeed = need"
                  >
                    <svg class="shell__caret shell__caret--sm" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="shell__nav-label">{{ need }}</span>
                  </button>
                </template>
              </template>
            </template>

            <hr class="shell__divider shell__divider--sm" />

            <!-- Image Gallery -->
            <button
              class="shell__nav-item"
              :class="{ 'shell__nav-item--active': activeSection === 'gallery' }"
              @click="emit('navigate', 'gallery')"
            >
              <svg class="shell__caret" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="shell__nav-label">Image Gallery</span>
              <span v-if="galleryCount" class="shell__count">{{ galleryCount }}</span>
            </button>
          </nav>

        </template>

      </aside>

      <!-- ── Main area ── -->
      <main class="shell__main">
        <!-- Patient header -->
        <div class="shell__patient">
          <div class="shell__patient-avatar-wrap">
            <img :src="avatarSarah" alt="Sarah Joy" class="shell__patient-avatar-img" />
          </div>
          <div class="shell__patient-info">
            <div class="shell__patient-name-row">
              <span class="shell__patient-name">Sarah Joy</span>
              <span class="shell__patient-age">(22 Years old)</span>
            </div>
            <div class="shell__patient-tags-row">
              <PulseTag value="Nursing" colour="lapis" />
            </div>
          </div>
          <button class="shell__easy-read-btn" @click="emit('toggle-easy-read')">
            <PulseIcon icon="target" size="small" />
            Easy Read
          </button>
        </div>

        <!-- Page content -->
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* ── Shell root ── */
.shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  font-family: Inter, 'FS Me', sans-serif;
}

/* ── Top bar ── */
.shell__topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 48px;
  padding: 0 16px;
  background: var(--pulse-color-primary-100);
  flex-shrink: 0;
  overflow: hidden;
}

.shell__logo {
  font-family: 'FS Me', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
}

.shell__topbar-title {
  font-family: 'FS Me', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
}

.shell__topnav {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
}

.shell__tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-family: Inter, sans-serif;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.12s;
}

.shell__tab:hover { background: rgba(255, 255, 255, 0.12); }

.shell__tab--active {
  color: #fff;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.15);
}

.shell__topbar-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

/* ── Body ── */
.shell__body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* ── Icon rail ── */
.shell__rail {
  width: 40px;
  flex-shrink: 0;
  background: var(--pulse-color-neutral-10);
  border-right: 1px solid var(--pulse-color-neutral-40);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  gap: 2px;
  overflow-y: auto;
}

.shell__rail-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pulse-color-neutral-80);
  transition: background 0.12s;
}

.shell__rail-btn:hover { background: var(--pulse-color-neutral-20); }

.shell__rail-btn--active {
  background: var(--pulse-color-primary-20);
  color: var(--pulse-color-primary-100);
}

.shell__rail-btn--avatar {
  border-radius: 50%;
  background: var(--pulse-color-primary-20);
  color: var(--pulse-color-primary-100);
}

.shell__rail-sep {
  width: 24px;
  height: 1px;
  background: var(--pulse-color-neutral-40);
  margin: 4px 0;
}

.shell__rail-initials {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--pulse-color-primary-100);
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px 0;
}

.shell__rail-spacer { flex: 1; }

/* ── Sidebar ── */
.shell__sidebar {
  width: 300px;
  flex-shrink: 0;
  background: var(--pulse-color-neutral-10);
  border-right: 1px solid var(--pulse-color-neutral-40);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 0 24px;
}

.shell__sidebar-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  gap: 8px;
  height: 51px;
  flex-shrink: 0;
}

.shell__sidebar-actions--end {
  justify-content: flex-end;
}

/* "Add Item" primary pill button */
.shell__add-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 18px;
  border-radius: 20px;
  border: none;
  background: var(--pulse-color-primary-100);
  color: #fff;
  font-family: 'FS Me', sans-serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.12s;
}

.shell__add-btn:hover { background: var(--pulse-color-primary-120); }

/* Icon-only button */
.shell__icon-btn {
  width: 32px;
  height: 32px;
  border: 1px solid var(--pulse-color-neutral-50);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.12s;
  flex-shrink: 0;
}

.shell__icon-btn:hover { background: var(--pulse-color-neutral-20); }

.shell__pencil-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.shell__divider {
  border: none;
  border-top: 1px solid var(--pulse-color-neutral-30, #f3f4f5);
  margin: 14px 16px;
}


.shell__sidenav {
  display: flex;
  flex-direction: column;
  gap: 17px;
  padding: 0 16px;
}

/* Nav items — 16px Inter matching Figma */
.shell__nav-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #36393f;
  text-align: left;
  width: 100%;
  line-height: 21.4px;
  transition: background 0.1s;
  border-radius: 2px;
}

.shell__nav-item:hover { background: var(--pulse-color-neutral-20); }

/* Active: Figma #f0fafa bg, darker text */
.shell__nav-item--active {
  background: #f0fafa;
  color: #172f2f;
}

.shell__nav-item--active .shell__dot {
  background: #2b5656;
}

/* Level 1: care domain items (20px indent) */
.shell__nav-item--l1 { padding-left: 20px; }

/* Level 2: need items (34px indent) */
.shell__nav-item--l2 { padding-left: 34px; }

.shell__nav-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

/* Caret SVG — right-pointing, rotates 90° when open */
.shell__caret {
  flex-shrink: 0;
  color: #6c727e;
  transition: transform 0.15s;
  transform: rotate(0deg);
}

.shell__caret--open { transform: rotate(90deg); }

.shell__caret--sm {
  width: 12px;
  height: 12px;
  opacity: 0.65;
}

.shell__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6c727e;
  flex-shrink: 0;
  margin: 0 5px;
}

/* Orange badge — Figma: #f97316 */
.shell__badge--orange {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 17.5px;
  height: 17.5px;
  padding: 0 4px;
  border-radius: 10.5px;
  background: #f97316;
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 8.75px;
  font-weight: 700;
  flex-shrink: 0;
  margin-left: auto;
}

.shell__count {
  font-size: 12px;
  color: var(--pulse-color-neutral-80);
  margin-left: auto;
  flex-shrink: 0;
}


/* ── Main ── */
.shell__main {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: var(--pulse-color-neutral-20, #f3f4f5);
}

/* Patient header */
.shell__patient {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 32px 16px;
  background: var(--pulse-color-neutral-10);
  border-bottom: 1px solid var(--pulse-color-neutral-30);
  flex-shrink: 0;
  box-shadow: 0 4px 3px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.1);
}

.shell__patient-avatar-wrap {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--pulse-color-primary-120);
}

.shell__patient-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shell__patient-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.shell__patient-name-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.shell__patient-name {
  font-family: 'FS Me', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--pulse-color-primary-120, #172b34);
  line-height: 1.2;
}

.shell__patient-age {
  font-family: 'FS Me', sans-serif;
  font-size: 24px;
  font-weight: 400;
  color: var(--pulse-color-primary-120, #172b34);
}

.shell__patient-tags-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.shell__easy-read-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 20px;
  border: 1.5px solid var(--pulse-color-neutral-50);
  background: transparent;
  color: var(--pulse-color-neutral-120);
  font-family: Inter, sans-serif;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.12s;
  flex-shrink: 0;
}

.shell__easy-read-btn:hover { background: var(--pulse-color-neutral-20); }
</style>
