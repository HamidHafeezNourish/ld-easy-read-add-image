<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import PulseIcon from '../PulseIcon/PulseIcon.vue'
import PulseTag from '../PulseTag/PulseTag.vue'
import type { CarePlanHomeProps, SidebarNavItem } from './CarePlanHome.types'

const props = withDefaults(defineProps<CarePlanHomeProps>(), {
  patientTags: () => [],
  recentlyUpdated: () => [],
  adminItems: () => [],
  careDomains: () => [],
  sidebarQuickLinks: () => [],
  sidebarDomains: () => [],
})

const emit = defineEmits<{
  search: [query: string]
  'domain-click': [domainId: string]
  'admin-item-click': [itemId: string]
  'avatar-change': [dataUrl: string]
  'sidebar-item-click': [itemId: string]
}>()

const searchQuery = ref('')
const activeItemId = ref<string | null>(null)
const expandedItems = reactive(new Set<string>())
const localAvatarUrl = ref(props.patientAvatarUrl)
const isAvatarHovered = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

watch(() => props.patientAvatarUrl, (v) => {
  localAvatarUrl.value = v
})

function onSearch() {
  emit('search', searchQuery.value)
}

function triggerAvatarUpload() {
  fileInputRef.value?.click()
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    const url = e.target?.result as string
    localAvatarUrl.value = url
    emit('avatar-change', url)
  }
  reader.readAsDataURL(file)
  // reset so the same file can be re-selected
  input.value = ''
}

function toggleExpand(id: string) {
  if (expandedItems.has(id)) expandedItems.delete(id)
  else expandedItems.add(id)
}

function onSidebarItemClick(item: SidebarNavItem) {
  if (item.children?.length) {
    toggleExpand(item.id)
  }
  activeItemId.value = item.id
  emit('sidebar-item-click', item.id)
}
</script>

<template>
  <div class="cph-root">
    <!-- ── Left Sidebar ── -->
    <aside
      v-if="sidebarQuickLinks.length || sidebarDomains.length"
      class="cph-sidebar"
    >
      <!-- Action buttons -->
      <div class="cph-sidebar__actions">
        <button class="cph-sidebar__btn cph-sidebar__btn--text">
          <PulseIcon icon="edit" size="small" />
          <span>Edit</span>
        </button>
        <button class="cph-sidebar__btn cph-sidebar__btn--icon" title="Reload">
          <PulseIcon icon="reload" size="small" />
        </button>
      </div>

      <hr class="cph-sidebar__divider" />

      <!-- Quick links: Recommendations, Archived, Image Gallery -->
      <nav
        v-if="sidebarQuickLinks.length"
        class="cph-sidebar__nav"
      >
        <button
          v-for="item in sidebarQuickLinks"
          :key="item.id"
          class="cph-sidebar__item"
          :class="{ 'cph-sidebar__item--active': activeItemId === item.id }"
          @click="onSidebarItemClick(item)"
        >
          <span class="cph-sidebar__item-label">{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="cph-sidebar__badge"
          >{{ item.badge }}</span>
        </button>
      </nav>

      <hr
        v-if="sidebarQuickLinks.length && sidebarDomains.length"
        class="cph-sidebar__divider"
      />

      <!-- Care domain tree -->
      <nav
        v-if="sidebarDomains.length"
        class="cph-sidebar__nav"
      >
        <template
          v-for="item in sidebarDomains"
          :key="item.id"
        >
          <button
            class="cph-sidebar__item"
            :class="{ 'cph-sidebar__item--active': activeItemId === item.id }"
            @click="onSidebarItemClick(item)"
          >
            <span class="cph-sidebar__item-label">{{ item.label }}</span>
            <span
              v-if="item.badge"
              class="cph-sidebar__badge"
            >{{ item.badge }}</span>
            <PulseIcon
              v-if="item.children?.length"
              :icon="expandedItems.has(item.id) ? 'collapse' : 'expand'"
              size="small"
              class="cph-sidebar__chevron"
            />
          </button>
          <!-- Child items -->
          <template v-if="item.children?.length && expandedItems.has(item.id)">
            <button
              v-for="child in item.children"
              :key="child.id"
              class="cph-sidebar__item cph-sidebar__item--child"
              :class="{ 'cph-sidebar__item--active': activeItemId === child.id }"
              @click.stop="onSidebarItemClick(child)"
            >
              <span class="cph-sidebar__item-label">{{ child.label }}</span>
              <span
                v-if="child.badge"
                class="cph-sidebar__badge"
              >{{ child.badge }}</span>
            </button>
          </template>
        </template>
      </nav>
    </aside>

    <!-- ── Main content ── -->
    <div class="cph">
      <!-- Hidden file input for avatar upload -->
      <input
        ref="fileInputRef"
        type="file"
        accept="image/*"
        class="cph__file-input"
        @change="onFileChange"
      />

      <!-- Patient header -->
      <header class="cph__patient-header">
        <div class="cph__avatar-row">
          <button
            class="cph__avatar-wrap"
            title="Click to upload photo"
            @mouseenter="isAvatarHovered = true"
            @mouseleave="isAvatarHovered = false"
            @click="triggerAvatarUpload"
          >
            <div class="cph__avatar">
              <img
                v-if="localAvatarUrl"
                :src="localAvatarUrl"
                :alt="patientName"
                class="cph__avatar-img"
              />
              <PulseIcon
                v-else
                icon="account"
                colour="primary"
                size="xxxlarge"
              />
            </div>
            <div
              class="cph__avatar-overlay"
              :class="{ 'cph__avatar-overlay--visible': isAvatarHovered }"
            >
              <PulseIcon
                icon="upload"
                size="large"
                class="cph__avatar-upload-icon"
              />
            </div>
          </button>
          <div class="cph__name-group">
            <span class="cph__patient-name">{{ patientName }}</span>
            <span class="cph__patient-age"> ({{ patientAge }})</span>
          </div>
        </div>
        <div
          v-if="patientTags.length"
          class="cph__patient-tags"
        >
          <PulseTag
            v-for="tag in patientTags"
            :key="tag.value"
            :value="tag.value"
            :colour="tag.colour"
            :icon-title="tag.iconTitle"
          />
        </div>
      </header>

      <!-- Search -->
      <section class="cph__search-section">
        <h3 class="cph__section-heading">Search</h3>
        <label class="cph__search-input-wrap">
          <PulseIcon
            icon="search"
            class="cph__search-icon"
          />
          <input
            v-model="searchQuery"
            type="text"
            class="cph__search-input"
            placeholder="Search by care plan, needs, tags"
            @input="onSearch"
          />
        </label>
      </section>

      <!-- Recently Updated -->
      <section class="cph__recently-updated">
        <div class="cph__section-header-row">
          <h3 class="cph__section-heading">Recently Updated</h3>
          <div class="cph__carousel-dots">
            <span class="cph__carousel-dot cph__carousel-dot--active" />
            <span class="cph__carousel-dot" />
            <span class="cph__carousel-dot" />
          </div>
        </div>
        <div class="cph__cards-row">
          <div
            v-for="card in recentlyUpdated"
            :key="card.id"
            class="cph__update-card"
          >
            <p class="cph__card-title">{{ card.title }}</p>
            <p class="cph__card-subtitle">{{ card.category }}</p>
            <p class="cph__card-body">{{ card.description }}</p>
          </div>
        </div>
      </section>

      <!-- Admin -->
      <section
        v-if="adminItems.length"
        class="cph__admin-section"
      >
        <h3 class="cph__section-heading">Section</h3>
        <ul class="cph__list">
          <li
            v-for="item in adminItems"
            :key="item.id"
            class="cph__list-item"
          >
            <button
              class="cph__list-item-btn"
              @click="emit('admin-item-click', item.id)"
            >
              <div
                class="cph__icon-bubble"
                :style="{ background: item.iconBg ?? 'var(--pulse-color-primary-20)' }"
              >
                <img
                  v-if="item.iconUrl"
                  :src="item.iconUrl"
                  :alt="item.title"
                  class="cph__icon-bubble-img"
                />
                <PulseIcon
                  v-else-if="item.icon"
                  :icon="item.icon"
                />
              </div>
              <div class="cph__item-body">
                <p class="cph__item-title">{{ item.title }}</p>
                <p class="cph__item-desc">{{ item.description }}</p>
              </div>
              <div class="cph__item-stats">
                <div
                  v-for="stat in item.stats"
                  :key="stat.label"
                  class="cph__stat"
                >
                  <img
                    v-if="stat.iconUrl"
                    :src="stat.iconUrl"
                    :alt="stat.label"
                    class="cph__stat-icon"
                  />
                  <span class="cph__stat-count">{{ stat.count }}</span>
                  <span class="cph__stat-label">{{ stat.label }}</span>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </section>

      <!-- All Care Domains -->
      <section class="cph__domains-section">
        <h3 class="cph__section-heading">All Care Domains</h3>
        <ul class="cph__list">
          <li
            v-for="domain in careDomains"
            :key="domain.id"
            class="cph__list-item"
          >
            <a
              class="cph__list-item-btn"
              href="#"
              @click.prevent="emit('domain-click', domain.id)"
            >
              <div
                class="cph__icon-bubble"
                :style="{ background: domain.iconBg ?? 'var(--pulse-color-care-delivery-1)' }"
              >
                <img
                  v-if="domain.iconUrl"
                  :src="domain.iconUrl"
                  :alt="domain.title"
                  class="cph__icon-bubble-img"
                />
              </div>
              <div class="cph__item-body">
                <p class="cph__item-title">{{ domain.title }}</p>
                <p class="cph__item-desc cph__item-desc--small">{{ domain.description }}</p>
              </div>
              <div class="cph__item-stats">
                <div
                  v-for="stat in domain.stats"
                  :key="stat.label"
                  class="cph__stat"
                >
                  <img
                    v-if="stat.iconUrl"
                    :src="stat.iconUrl"
                    :alt="stat.label"
                    class="cph__stat-icon"
                  />
                  <span class="cph__stat-count">{{ stat.count }}</span>
                  <span class="cph__stat-label">{{ stat.label }}</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ── Root layout ── */
.cph-root {
  display: flex;
  align-items: flex-start;
  min-height: 100vh;
  background: var(--pulse-color-neutral-20);
}

/* ── Sidebar ── */
.cph-sidebar {
  width: 300px;
  flex-shrink: 0;
  background: var(--pulse-color-neutral-10);
  border-right: 1px solid var(--pulse-color-neutral-40);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  position: sticky;
  top: 0;
  overflow-y: auto;
  max-height: 100vh;
}

.cph-sidebar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px 8px;
}

.cph-sidebar__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid var(--pulse-color-neutral-50);
  background: var(--pulse-color-neutral-10);
  cursor: pointer;
  font-family: 'FS Me', sans-serif;
  font-size: var(--pulse-font-size-caption-small);
  font-weight: var(--pulse-font-weight-strong);
  color: var(--pulse-color-neutral-120);
  transition: background 0.15s;
}

.cph-sidebar__btn:hover {
  background: var(--pulse-color-neutral-20);
}

.cph-sidebar__btn--icon {
  padding: 5px 8px;
  margin-left: auto;
}

.cph-sidebar__divider {
  border: none;
  border-top: 1px solid var(--pulse-color-neutral-40);
  margin: 8px 0;
}

.cph-sidebar__nav {
  display: flex;
  flex-direction: column;
}

.cph-sidebar__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
  border-radius: 0;
  transition: background 0.12s;
  font-family: Inter, sans-serif;
  font-size: var(--pulse-font-size-caption-regular);
  font-weight: var(--pulse-font-weight-regular);
  color: var(--pulse-color-neutral-120);
}

.cph-sidebar__item:hover {
  background: var(--pulse-color-neutral-20);
}

.cph-sidebar__item--active {
  background: var(--pulse-color-primary-20);
  color: var(--pulse-color-primary-120);
  font-weight: var(--pulse-font-weight-strong);
}

.cph-sidebar__item--child {
  padding-left: 32px;
  font-size: var(--pulse-font-size-caption-small);
}

.cph-sidebar__item-label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cph-sidebar__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: var(--pulse-color-primary-100);
  color: var(--pulse-color-neutral-10);
  font-family: Inter, sans-serif;
  font-size: 11px;
  font-weight: var(--pulse-font-weight-bold);
  flex-shrink: 0;
}

.cph-sidebar__chevron {
  color: var(--pulse-color-neutral-80);
  flex-shrink: 0;
}

/* ── Main content ── */
.cph {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--pulse-color-neutral-10);
  padding: 32px 32px 32px;
}

/* Hidden file input */
.cph__file-input {
  display: none;
}

/* Patient header */
.cph__patient-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cph__avatar-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cph__avatar-wrap {
  position: relative;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;
}

.cph__avatar {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--pulse-color-primary-120);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cph__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cph__avatar-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.15s;
}

.cph__avatar-overlay--visible {
  opacity: 1;
}

.cph__avatar-upload-icon {
  color: #ffffff;
}

.cph__name-group {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px;
}

.cph__patient-name {
  font-family: 'FS Me', sans-serif;
  font-size: var(--pulse-font-size-xlarge);
  font-weight: var(--pulse-font-weight-bold);
  color: var(--pulse-color-primary-120);
}

.cph__patient-age {
  font-family: 'FS Me', sans-serif;
  font-size: var(--pulse-font-size-xlarge);
  font-weight: var(--pulse-font-weight-regular);
  color: var(--pulse-color-primary-120);
}

.cph__patient-tags {
  display: flex;
  gap: 8px;
  padding-left: 84px;
}

/* Section heading */
.cph__section-heading {
  font-family: 'FS Me', sans-serif;
  font-size: var(--pulse-font-size-xlarge);
  font-weight: var(--pulse-font-weight-bold);
  color: var(--pulse-color-neutral-120);
  margin: 0;
}

/* Search */
.cph__search-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cph__search-input-wrap {
  display: flex;
  align-items: center;
  gap: 18px;
  height: 52px;
  padding: 12px 17px;
  border: 1px solid var(--pulse-color-neutral-60);
  border-radius: 3px;
  background: var(--pulse-color-neutral-10);
  overflow: hidden;
  cursor: text;
}

.cph__search-icon {
  flex-shrink: 0;
  font-size: 24px;
  color: var(--pulse-color-neutral-100);
}

.cph__search-input {
  border: none;
  outline: none;
  font-family: Inter, sans-serif;
  font-size: var(--pulse-font-size-caption-small);
  color: var(--pulse-color-neutral-120);
  background: transparent;
  width: 100%;
}

.cph__search-input::placeholder {
  color: var(--pulse-color-neutral-90);
}

/* Recently Updated */
.cph__recently-updated {
  display: flex;
  flex-direction: column;
}

.cph__section-header-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.cph__carousel-dots {
  display: flex;
  gap: 12px;
  align-items: center;
}

.cph__carousel-dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 24px;
  background: var(--pulse-color-neutral-70);
}

.cph__carousel-dot--active {
  width: 24px;
  background: var(--pulse-color-care-delivery-2);
}

.cph__cards-row {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.cph__update-card {
  min-width: 280px;
  width: 280px;
  flex-shrink: 0;
  background: var(--pulse-color-neutral-10);
  border-radius: 12px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cph__card-title {
  font-family: 'FS Me', sans-serif;
  font-size: var(--pulse-font-size-large);
  font-weight: var(--pulse-font-weight-bold);
  color: var(--pulse-color-primary-100);
  margin: 0;
}

.cph__card-subtitle {
  font-family: Inter, sans-serif;
  font-size: var(--pulse-font-size-caption-small);
  font-weight: var(--pulse-font-weight-strong);
  color: var(--pulse-color-primary-90);
  margin: 0;
}

.cph__card-body {
  font-family: Inter, sans-serif;
  font-size: var(--pulse-font-size-small);
  font-weight: var(--pulse-font-weight-regular);
  color: var(--pulse-color-neutral-120);
  margin: 0;
  line-height: 1.35;
}

/* Shared list (Admin + Domains) */
.cph__admin-section,
.cph__domains-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cph__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cph__list-item {
  border-radius: 8px;
  box-shadow:
    0 1px 1.5px rgba(0, 0, 0, 0.1),
    0 1px 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.cph__list-item-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--pulse-color-neutral-10);
  padding: 0 16px;
  min-height: 112px;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  transition: background 0.15s;
}

.cph__list-item-btn:hover {
  background: var(--pulse-color-neutral-20);
}

.cph__icon-bubble {
  width: 50px;
  height: 50px;
  border-radius: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cph__icon-bubble-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.cph__item-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 24px 0;
  min-width: 0;
}

.cph__item-title {
  font-family: 'FS Me', sans-serif;
  font-size: var(--pulse-font-size-large);
  font-weight: var(--pulse-font-weight-bold);
  color: var(--pulse-color-primary-120);
  margin: 0;
}

.cph__item-desc {
  font-family: Inter, sans-serif;
  font-size: var(--pulse-font-size-caption-regular);
  font-weight: var(--pulse-font-weight-regular);
  color: var(--pulse-color-neutral-100);
  margin: 0;
}

.cph__item-desc--small {
  font-size: var(--pulse-font-size-caption-small);
}

.cph__item-stats {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.cph__stat {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  padding: 8px;
}

.cph__stat-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.cph__stat-count {
  font-family: Inter, sans-serif;
  font-size: var(--pulse-font-size-regular);
  font-weight: var(--pulse-font-weight-regular);
  color: var(--pulse-color-neutral-100);
}

.cph__stat-label {
  font-family: Inter, sans-serif;
  font-size: var(--pulse-font-size-regular);
  font-weight: var(--pulse-font-weight-regular);
  color: var(--pulse-color-neutral-100);
  white-space: nowrap;
}
</style>
