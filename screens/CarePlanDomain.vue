<script setup lang="ts">
import { computed } from 'vue'
import PulseTag from '@/components/PulseTag/PulseTag.vue'

const props = defineProps<{
  domainId: string
  easyRead: boolean
}>()

defineEmits<{ back: [] }>()

interface DomainData {
  id: string
  title: string
  description: string
  iconBg: string
  iconColor: string
  iconLetter: string
  tags: { label: string; colour: string }[]
  startDate: string
  reviewDate: string
  identifiedNeed: string
  needSeverity: string
  needSeverityColour: string
  plannedOutcomes: string
  howToAchieve: string
  interactions: { title: string; body: string }[]
  risks: { title: string; category: string; level: 'High' | 'Medium' | 'Low' }[]
  responsibleCarers: { name: string; role: string }[]
  reviewNotes: string
  easyReadSections: { heading: string; text: string; imageAlt: string; imageSvg: string }[]
}

const domains: Record<string, DomainData> = {
  nutrition: {
    id: 'nutrition',
    title: 'Nutrition & Hydration',
    description: 'Covers nutritional planning, dietary management, hydration needs, and assistance with meal preparation to promote autonomy and health.',
    iconBg: '#fef3c7', iconColor: '#B45309', iconLetter: 'N',
    tags: [{ label: 'Vegetarian', colour: 'primary' }, { label: 'Allergy: Dairy', colour: 'error' }],
    startDate: '12 Jan 2025',
    reviewDate: '12 Jan 2026',
    identifiedNeed: 'Sarah follows a vegetarian diet, avoiding all meat, poultry, and fish. This choice reflects her personal values and contributes to her overall wellbeing. Her meals must consistently honour this preference while supporting her nutritional needs.',
    needSeverity: 'Severe need',
    needSeverityColour: '#b60000',
    plannedOutcomes: 'Sarah will receive balanced, satisfying vegetarian meals that provide adequate protein, iron, and essential vitamins. She should feel respected and confident that her dietary choices are understood and upheld. Caregivers will be equipped to prepare varied, nutritious meals and adjust plans in consultation with healthcare professionals as needed.',
    howToAchieve: 'Follow a structured meal plan that includes diverse plant-based ingredients such as legumes, tofu, whole grains, and fortified foods. Labels will be checked carefully to avoid hidden animal products, and kitchen practices will prevent cross-contamination. Regular check-ins with Sarah will ensure her preferences are reflected, and dietitians will be consulted to monitor her nutritional status.',
    interactions: [
      {
        title: 'Interaction 1',
        body: 'Daily food preparation involves thoughtful ingredient selection and clear communication among caregivers, family, and any external providers to ensure consistency.',
      },
      {
        title: 'Interaction 2',
        body: 'Sarah is encouraged to share her preferences and feedback, fostering a sense of autonomy and enjoyment around mealtimes.',
      },
    ],
    risks: [
      { title: 'Food Allergy — Dairy Products', category: 'Medical Condition risk', level: 'High' },
      { title: 'Nutritional deficiency (B12, Iron)', category: 'Health risk', level: 'Medium' },
    ],
    responsibleCarers: [
      { name: 'Line Idris', role: 'Carer' },
      { name: 'Maya Osei', role: 'Senior Carer' },
    ],
    reviewNotes: "If Sarah's dietary needs are not carefully managed, there is a risk of nutritional gaps, particularly in protein, iron, and vitamin B12.",
    easyReadSections: [
      {
        heading: 'General Nutrition',
        text: 'I like my grapefruit cut in small, even pieces so it\'s easy to eat.',
        imageAlt: 'Grapefruit cut in pieces',
        imageSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
          <rect width="240" height="240" rx="8" fill="#FEF3C7"/>
          <circle cx="120" cy="120" r="90" fill="#FCD34D" stroke="#F59E0B" stroke-width="3"/>
          <circle cx="120" cy="120" r="60" fill="#FDE68A"/>
          <line x1="120" y1="30" x2="120" y2="210" stroke="#F59E0B" stroke-width="2"/>
          <line x1="30" y1="120" x2="210" y2="120" stroke="#F59E0B" stroke-width="2"/>
          <line x1="56" y1="56" x2="184" y2="184" stroke="#F59E0B" stroke-width="2"/>
          <line x1="184" y1="56" x2="56" y2="184" stroke="#F59E0B" stroke-width="2"/>
          <circle cx="120" cy="120" r="8" fill="#F59E0B"/>
        </svg>`,
      },
    ],
  },
  behaviour: {
    id: 'behaviour',
    title: 'Behaviour',
    description: 'Understanding and responding to behavioural patterns with proactive strategies that promote safety, dignity, and emotional regulation.',
    iconBg: '#f8dfe8', iconColor: '#BE185D', iconLetter: 'B',
    tags: [{ label: 'PBS Plan', colour: 'primary' }],
    startDate: '3 Mar 2025',
    reviewDate: '3 Mar 2026',
    identifiedNeed: 'Sarah can become distressed in noisy or unpredictable environments, sometimes expressing this through verbal outbursts or withdrawal. Understanding her triggers and providing consistent, calm responses is essential to her wellbeing.',
    needSeverity: 'Moderate need',
    needSeverityColour: '#c2410c',
    plannedOutcomes: 'Sarah will experience fewer episodes of distress through a structured, predictable daily routine and proactive de-escalation strategies. Carers will be equipped to identify early warning signs and respond calmly and consistently.',
    howToAchieve: 'Maintain a consistent daily schedule and environment. Use visual schedules to support predictability. Ensure all staff are trained in de-escalation techniques and PBS principles. Document any incidents and review patterns regularly with the behaviour support team.',
    interactions: [
      { title: 'Morning routine', body: 'Offer choices during morning routine to give Sarah a sense of control over her day.' },
      { title: 'Calm space', body: 'A designated quiet space is available when Sarah signals she needs time to regulate.' },
    ],
    risks: [
      { title: 'Self-directed distress during transitions', category: 'Behaviour risk', level: 'Medium' },
    ],
    responsibleCarers: [
      { name: 'Line Idris', role: 'Carer' },
    ],
    reviewNotes: 'Review PBS plan quarterly or sooner if incident frequency increases. Ensure consistency across all shifts.',
    easyReadSections: [
      {
        heading: 'When I feel upset',
        text: 'Sometimes loud places make me feel worried. I can ask to go somewhere quiet.',
        imageAlt: 'Person in a calm quiet room',
        imageSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
          <rect width="240" height="240" rx="8" fill="#f8dfe8"/>
          <rect x="40" y="80" width="160" height="120" rx="8" fill="#fbcfe8"/>
          <rect x="60" y="100" width="50" height="60" rx="4" fill="#f472b6"/>
          <rect x="130" y="120" width="50" height="40" rx="4" fill="#ec4899"/>
          <circle cx="120" cy="60" r="28" fill="#f9a8d4"/>
          <rect x="108" y="85" width="24" height="40" rx="4" fill="#f9a8d4"/>
        </svg>`,
      },
    ],
  },
}

function getDomain(id: string): DomainData {
  return domains[id] ?? domains['nutrition']
}

const domain = computed(() => getDomain(props.domainId))

const riskLevelColour: Record<string, { bg: string; text: string }> = {
  High: { bg: '#fee2e2', text: '#b60000' },
  Medium: { bg: '#fef3c7', text: '#92400e' },
  Low: { bg: '#dcfce7', text: '#166534' },
}
</script>

<template>
  <div class="cpd">
    <!-- Domain panel header -->
    <div class="cpd__header-panel">
      <div class="cpd__header-row">
        <div class="cpd__icon-bubble" :style="{ background: domain.iconBg }">
          <span class="cpd__icon-letter" :style="{ color: domain.iconColor }">{{ domain.iconLetter }}</span>
        </div>
        <div class="cpd__header-meta">
          <div class="cpd__title-row">
            <h2 class="cpd__title">{{ domain.title }}</h2>
            <div class="cpd__header-actions">
              <button class="cpd__action-btn cpd__action-btn--outline">Edit</button>
              <button class="cpd__action-btn cpd__action-btn--primary">+ Add need</button>
            </div>
          </div>
          <p class="cpd__description">{{ domain.description }}</p>
          <div class="cpd__tags-row">
            <PulseTag
              v-for="tag in domain.tags"
              :key="tag.label"
              :value="tag.label"
              :colour="tag.colour as any"
            />
            <span class="cpd__meta-date">
              <span class="cpd__meta-label">Start:</span> {{ domain.startDate }}
            </span>
            <span class="cpd__meta-date">
              <span class="cpd__meta-label">Review:</span> {{ domain.reviewDate }}
            </span>
          </div>
        </div>
      </div>
      <label class="cpd__emergency-row">
        <span>Include in Emergency Admission pack</span>
        <span class="cpd__toggle" />
      </label>
    </div>

    <!-- Scrollable content -->
    <div class="cpd__content">

      <!-- Identified Need -->
      <section class="cpd__section">
        <div class="cpd__divider-label">Identified Need</div>
        <p class="cpd__body-text">{{ domain.identifiedNeed }}</p>
        <div class="cpd__severity-row">
          <span
            class="cpd__severity-badge"
            :style="{ background: domain.needSeverityColour + '22', color: domain.needSeverityColour, borderColor: domain.needSeverityColour + '44' }"
          >{{ domain.needSeverity }}</span>
        </div>
      </section>

      <!-- Planned Outcomes -->
      <section class="cpd__section">
        <div class="cpd__divider-label">Planned Outcomes</div>
        <p class="cpd__body-text">{{ domain.plannedOutcomes }}</p>
        <h4 class="cpd__sub-heading">How to achieve outcomes</h4>
        <p class="cpd__body-text">{{ domain.howToAchieve }}</p>
      </section>

      <!-- Linked Interactions -->
      <section class="cpd__section">
        <div class="cpd__divider-label">Linked Interactions</div>
        <div
          v-for="interaction in domain.interactions"
          :key="interaction.title"
          class="cpd__interaction"
        >
          <h4 class="cpd__sub-heading">{{ interaction.title }}</h4>
          <p class="cpd__body-text">{{ interaction.body }}</p>
        </div>
      </section>

      <!-- Risk -->
      <section class="cpd__section">
        <div class="cpd__divider-label">Risk</div>
        <div class="cpd__risk-grid">
          <div
            v-for="risk in domain.risks"
            :key="risk.title"
            class="cpd__risk-card"
          >
            <p class="cpd__risk-category">{{ risk.category }}</p>
            <p class="cpd__risk-title">{{ risk.title }}</p>
            <span
              class="cpd__risk-level"
              :style="{ background: riskLevelColour[risk.level].bg, color: riskLevelColour[risk.level].text }"
            >{{ risk.level }} risk</span>
          </div>
        </div>
      </section>

      <!-- Responsible Carers -->
      <section class="cpd__section">
        <div class="cpd__divider-label">Responsible carers</div>
        <div class="cpd__carers-row">
          <div
            v-for="carer in domain.responsibleCarers"
            :key="carer.name"
            class="cpd__carer-card"
          >
            <div class="cpd__carer-avatar">{{ carer.name.split(' ').map(n => n[0]).join('') }}</div>
            <div>
              <p class="cpd__carer-name">{{ carer.name }}</p>
              <p class="cpd__carer-role">{{ carer.role }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Review Notes -->
      <section class="cpd__section">
        <div class="cpd__divider-label">Review Notes</div>
        <p class="cpd__body-text">{{ domain.reviewNotes }}</p>
      </section>

      <!-- Easy Read sections (only shown when easyRead is on) -->
      <Transition name="easy-read">
        <div v-if="easyRead" class="cpd__easy-read-sections">
          <div
            v-for="section in domain.easyReadSections"
            :key="section.heading"
            class="cpd__easy-read-section"
          >
            <h3 class="cpd__easy-read-heading">{{ section.heading }}</h3>
            <div class="cpd__easy-read-body">
              <div class="cpd__easy-read-image" v-html="section.imageSvg" />
              <p class="cpd__easy-read-text">{{ section.text }}</p>
            </div>
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<style scoped>
.cpd {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: var(--pulse-color-neutral-20, #f3f4f5);
}

/* Header panel */
.cpd__header-panel {
  background: #fff;
  border-bottom: 1px solid var(--pulse-color-neutral-30);
  padding: 20px 32px 16px;
  flex-shrink: 0;
}

.cpd__header-row {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 12px;
}

.cpd__icon-bubble {
  width: 64px;
  height: 64px;
  border-radius: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

.cpd__icon-letter {
  font-family: 'FS Me', sans-serif;
  font-size: 24px;
  font-weight: 700;
}

.cpd__header-meta {
  flex: 1;
  min-width: 0;
}

.cpd__title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.cpd__title {
  font-family: 'FS Me', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #2b5656;
  margin: 0;
}

.cpd__header-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.cpd__action-btn {
  padding: 6px 16px;
  border-radius: 6px;
  font-family: Inter, sans-serif;
  font-size: 13px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.12s;
}

.cpd__action-btn--outline {
  border: 1px solid var(--pulse-color-neutral-50);
  background: transparent;
  color: var(--pulse-color-neutral-120);
}

.cpd__action-btn--outline:hover {
  background: var(--pulse-color-neutral-20);
}

.cpd__action-btn--primary {
  border: none;
  background: var(--pulse-color-primary-100);
  color: #fff;
}

.cpd__action-btn--primary:hover {
  background: var(--pulse-color-primary-120);
}

.cpd__description {
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: #6c727e;
  margin: 0 0 10px;
  line-height: 1.5;
}

.cpd__tags-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.cpd__meta-date {
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: #6c727e;
}

.cpd__meta-label {
  font-weight: 600;
  color: #36393f;
}

.cpd__emergency-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: #36393f;
  margin-top: 10px;
  cursor: pointer;
}

.cpd__toggle {
  display: inline-block;
  width: 35px;
  height: 21px;
  border-radius: 11px;
  background: var(--pulse-color-neutral-50);
  position: relative;
  flex-shrink: 0;
}

.cpd__toggle::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #fff;
  transition: left 0.15s;
}

/* Content area */
.cpd__content {
  flex: 1;
  padding: 24px 32px 48px;
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 1100px;
}

.cpd__section {
  padding: 28px 0;
  border-bottom: 1px solid var(--pulse-color-neutral-30);
}

.cpd__section:last-of-type {
  border-bottom: none;
}

.cpd__divider-label {
  font-family: 'FS Me', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #36393f;
  margin-bottom: 16px;
}

.cpd__body-text {
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #36393f;
  line-height: 1.6;
  margin: 0 0 12px;
}

.cpd__sub-heading {
  font-family: 'FS Me', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #36393f;
  margin: 16px 0 8px;
}

.cpd__severity-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.cpd__severity-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 600;
}

/* Interactions */
.cpd__interaction {
  margin-bottom: 12px;
}

/* Risk */
.cpd__risk-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.cpd__risk-card {
  background: #fff;
  border: 1px solid var(--pulse-color-neutral-30);
  border-radius: 8px;
  padding: 16px 20px;
  min-width: 260px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cpd__risk-category {
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #6c727e;
  margin: 0;
}

.cpd__risk-title {
  font-family: 'FS Me', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #36393f;
  margin: 0;
}

.cpd__risk-level {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 600;
  align-self: flex-start;
  margin-top: 4px;
}

/* Carers */
.cpd__carers-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.cpd__carer-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 1px solid var(--pulse-color-neutral-30);
  border-radius: 8px;
  padding: 12px 16px;
}

.cpd__carer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--pulse-color-primary-20);
  color: var(--pulse-color-primary-100);
  font-family: 'FS Me', sans-serif;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cpd__carer-name {
  font-family: 'FS Me', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #36393f;
  margin: 0;
}

.cpd__carer-role {
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: #6c727e;
  margin: 0;
}

/* Easy Read */
.cpd__easy-read-sections {
  padding-top: 8px;
}

.cpd__easy-read-section {
  padding: 24px 0;
  border-top: 1px solid var(--pulse-color-neutral-30);
}

.cpd__easy-read-heading {
  font-family: 'FS Me', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #2b5656;
  margin: 0 0 20px;
}

.cpd__easy-read-body {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.cpd__easy-read-image {
  flex-shrink: 0;
  width: 240px;
  height: 240px;
  border-radius: 8px;
  overflow: hidden;
}

.cpd__easy-read-text {
  font-family: 'FS Me', sans-serif;
  font-size: 22px;
  font-weight: 400;
  color: #36393f;
  line-height: 1.5;
  margin: 0;
  padding-top: 8px;
}

/* Easy Read transition */
.easy-read-enter-active,
.easy-read-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.easy-read-enter-from,
.easy-read-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
