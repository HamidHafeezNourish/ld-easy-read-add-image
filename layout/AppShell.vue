<script setup lang="ts">
import { ref } from 'vue'
import PulseIcon from '@/components/PulseIcon/PulseIcon.vue'
import PulseButton from '@/components/PulseButton/PulseButton.vue'
import PulseTag from '@/components/PulseTag/PulseTag.vue'
import avatarSarah from '../assets/avatar-sarah.png'
import iconPencil from '../assets/icon-pencil.png'

type Section = 'home' | 'gallery' | 'domain'

const props = defineProps<{
  activeSection: Section
  galleryCount: number
  easyRead?: boolean
  selectedDomainId?: string
}>()

const emit = defineEmits<{
  navigate: [section: Section]
  'domain-click': [domainId: string]
  'toggle-easy-read': []
}>()

const expandedSections = ref(new Set<string>(['care-plan-section']))

function toggleSection(id: string) {
  if (expandedSections.value.has(id)) expandedSections.value.delete(id)
  else expandedSections.value.add(id)
}

const careDomains = [
  { id: 'behaviour', label: 'Behaviour' },
  { id: 'cognition', label: 'Cognition and Mental Capacity' },
  { id: 'communication', label: 'Communication' },
  { id: 'continence', label: 'Continence' },
  { id: 'cultural', label: 'Cultural, Religious & Spiritual Identity' },
  { id: 'daily-living', label: 'Daily Living and Environment' },
  { id: 'education', label: 'Education & Employment' },
  { id: 'medication', label: 'Medication & Healthcare' },
  { id: 'mental-health', label: 'Mental Health' },
  { id: 'mobility', label: 'Mobility & Physical' },
  { id: 'nutrition', label: 'Nutrition & Hydration' },
  { id: 'personal-care', label: 'Personal Care & Hygiene' },
  { id: 'sensory', label: 'Sensory' },
  { id: 'sexuality', label: 'Sexuality & Relationships' },
  { id: 'skin', label: 'Skin Integrity' },
  { id: 'sleep', label: 'Sleep & Rest' },
  { id: 'social', label: 'Social, Community & Recreation' },
  { id: 'ltc', label: 'Specific Diagnoses & LTCs' },
]
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
        <!-- Top actions -->
        <div class="shell__sidebar-actions">
          <button class="shell__add-btn">
            <PulseIcon icon="plus" size="small" />
            Add
          </button>
          <button class="shell__icon-btn" title="Edit">
            <img :src="iconPencil" alt="Edit" class="shell__pencil-icon" />
          </button>
        </div>

        <hr class="shell__divider" />

        <!-- Quick links -->
        <div class="shell__sidenav">
          <button class="shell__nav-item">
            <span class="shell__nav-label">Recommendations</span>
            <span class="shell__badge--red">3</span>
          </button>
          <button class="shell__nav-item">
            <span class="shell__nav-label">Archived</span>
          </button>
        </div>

        <hr class="shell__divider" />

        <!-- Bookmarks -->
        <div class="shell__sidenav">
          <button class="shell__nav-item shell__nav-item--section" @click="toggleSection('bookmarks')">
            <span class="shell__caret" :class="{ 'shell__caret--open': expandedSections.has('bookmarks') }">›</span>
            <span class="shell__nav-label shell__nav-label--bold">Bookmarks</span>
          </button>

          <!-- Care Plan Section (active/highlighted) -->
          <button class="shell__nav-item shell__nav-item--section shell__nav-item--active-section" @click="toggleSection('care-plan-section')">
            <span class="shell__caret shell__caret--open">›</span>
            <PulseIcon icon="document" size="small" class="shell__nav-section-icon" />
            <span class="shell__nav-label shell__nav-label--bold">Care plan Section</span>
          </button>

          <!-- Domain items -->
          <template v-if="expandedSections.has('care-plan-section')">
            <button
              v-for="domain in careDomains"
              :key="domain.id"
              class="shell__nav-item shell__nav-item--child"
              :class="{ 'shell__nav-item--active': selectedDomainId === domain.id && activeSection === 'domain' }"
              @click="emit('domain-click', domain.id)"
            >
              <span class="shell__caret shell__caret--sm">›</span>
              <PulseIcon icon="document" size="small" class="shell__nav-child-icon" />
              <span class="shell__nav-label">{{ domain.label }}</span>
            </button>
          </template>

          <!-- Consent Forms -->
          <button class="shell__nav-item shell__nav-item--section" @click="toggleSection('consent')">
            <span class="shell__caret shell__caret--open">›</span>
            <PulseIcon icon="document" size="small" class="shell__nav-section-icon" />
            <span class="shell__nav-label shell__nav-label--bold">Consent Forms</span>
          </button>
          <template v-if="expandedSections.has('consent')">
            <button class="shell__nav-item shell__nav-item--child shell__nav-item--dot">
              <span class="shell__dot">•</span>
              <span class="shell__nav-label">Risk Assessments</span>
            </button>
            <button class="shell__nav-item shell__nav-item--child shell__nav-item--dot">
              <span class="shell__dot">•</span>
              <span class="shell__nav-label">Referral documentation</span>
            </button>
            <button class="shell__nav-item shell__nav-item--child shell__nav-item--dot">
              <span class="shell__dot">•</span>
              <span class="shell__nav-label">Patient education materials</span>
            </button>
          </template>

          <!-- Insurance Information -->
          <button class="shell__nav-item shell__nav-item--section">
            <span class="shell__caret">›</span>
            <PulseIcon icon="connect" size="small" class="shell__nav-section-icon" />
            <span class="shell__nav-label shell__nav-label--bold">Insurance Information</span>
          </button>

          <!-- Support group -->
          <button class="shell__nav-item shell__nav-item--section" @click="toggleSection('support')">
            <span class="shell__caret" :class="{ 'shell__caret--open': expandedSections.has('support') }">›</span>
            <PulseIcon icon="connect" size="small" class="shell__nav-section-icon" />
            <span class="shell__nav-label shell__nav-label--bold">Support group</span>
          </button>
          <template v-if="expandedSections.has('support')">
            <button class="shell__nav-item shell__nav-item--child shell__nav-item--dot">
              <span class="shell__dot">•</span>
              <span class="shell__nav-label">Clinical trials information</span>
            </button>
          </template>

          <!-- Personal interactions -->
          <button class="shell__nav-item shell__nav-item--section">
            <span class="shell__caret">›</span>
            <PulseIcon icon="account" size="small" class="shell__nav-section-icon" />
            <span class="shell__nav-label shell__nav-label--bold">Personal interactions</span>
          </button>

          <!-- Image Gallery -->
          <hr class="shell__divider shell__divider--sm" />
          <button
            class="shell__nav-item"
            :class="{ 'shell__nav-item--active': activeSection === 'gallery' }"
            @click="emit('navigate', 'gallery')"
          >
            <PulseIcon icon="document" size="small" class="shell__nav-section-icon" />
            <span class="shell__nav-label">Image Gallery</span>
            <span class="shell__count">{{ galleryCount }}</span>
          </button>

          <!-- Back to hub -->
          <div v-if="activeSection !== 'home'" class="shell__back-wrap">
            <PulseButton
              label="Back to Care Plan Hub"
              type="secondary"
              icon="previous"
              :small="true"
              :full-width="true"
              @click="emit('navigate', 'home')"
            />
          </div>
        </div>
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
          <button
            class="shell__easy-read-btn"
            @click="emit('toggle-easy-read')"
          >
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

.shell__tab:hover {
  background: rgba(255, 255, 255, 0.12);
}

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

/* ── Body (3 cols) ── */
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

.shell__rail-btn:hover {
  background: var(--pulse-color-neutral-20);
}

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

.shell__rail-spacer {
  flex: 1;
}

/* ── Sidebar ── */
.shell__sidebar {
  width: 280px;
  flex-shrink: 0;
  background: var(--pulse-color-neutral-10);
  border-right: 1px solid var(--pulse-color-neutral-40);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 24px;
}

.shell__sidebar-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px 8px;
  gap: 8px;
}

.shell__add-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  border: none;
  background: var(--pulse-color-primary-100);
  color: #fff;
  font-family: 'FS Me', sans-serif;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.12s;
}

.shell__add-btn:hover {
  background: var(--pulse-color-primary-120);
}

.shell__icon-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background 0.12s;
}

.shell__icon-btn:hover {
  background: var(--pulse-color-neutral-20);
}

.shell__pencil-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.shell__divider {
  border: none;
  border-top: 1px solid var(--pulse-color-neutral-40);
  margin: 4px 0;
}

.shell__divider--sm {
  margin: 8px 10px;
}

.shell__sidenav {
  display: flex;
  flex-direction: column;
  padding: 2px 0;
}

.shell__back-wrap {
  padding: 8px 10px;
}

.shell__nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: var(--pulse-color-neutral-120);
  text-align: left;
  width: 100%;
  transition: background 0.1s;
  min-height: 24px;
}

.shell__nav-item:hover {
  background: var(--pulse-color-neutral-20);
}

.shell__nav-item--active {
  background: var(--pulse-color-primary-20);
  color: var(--pulse-color-primary-120);
  font-weight: 600;
}

.shell__nav-item--active-section {
  background: var(--pulse-color-primary-30, #d1f0f0);
  color: #36393f;
  font-weight: 700;
}

.shell__nav-item--section {
  font-size: 12px;
}

.shell__nav-item--child {
  padding-left: 24px;
  font-size: 12px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  color: #000;
}

.shell__nav-item--dot {
  padding-left: 28px;
}

.shell__nav-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.shell__nav-label--bold {
  font-family: 'FS Me', sans-serif;
  font-weight: 700;
  color: #36393f;
}

.shell__nav-section-icon {
  flex-shrink: 0;
  font-size: 16px;
  color: var(--pulse-color-neutral-80);
}

.shell__nav-child-icon {
  flex-shrink: 0;
  font-size: 14px;
  color: var(--pulse-color-neutral-70);
}

.shell__caret {
  flex-shrink: 0;
  width: 16px;
  font-size: 14px;
  color: var(--pulse-color-neutral-80);
  display: flex;
  align-items: center;
  transition: transform 0.15s;
  transform: rotate(0deg);
}

.shell__caret--open {
  transform: rotate(90deg);
}

.shell__caret--sm {
  font-size: 12px;
}

.shell__dot {
  flex-shrink: 0;
  width: 14px;
  font-size: 14px;
  color: var(--pulse-color-neutral-80);
  line-height: 1;
}

.shell__badge--red {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 10px;
  background: #b60000;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
  margin-left: auto;
}

.shell__count {
  font-size: 11px;
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

.shell__easy-read-btn:hover {
  background: var(--pulse-color-neutral-20);
}
</style>
