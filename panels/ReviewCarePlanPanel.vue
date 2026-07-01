<script setup lang="ts">
import PulseDrawer from '@/components/PulseDrawer/PulseDrawer.vue'
import PulseButton from '@/components/PulseButton/PulseButton.vue'

const props = defineProps<{ sectionTitle: string; breadcrumb?: string }>()
const emit = defineEmits<{ close: []; navigateBack: [] }>()

interface Carer  { name: string; role: string; initials: string }
interface Interaction { title: string; body: string }
interface RiskData {
  category: string
  title: string
  score: number
  factors: string[]
  likelihood: number
  impact: number
  residualRisk: number
  mitigations: string[]
  mitigationLikelihood: number
  mitigationImpact: number
}
interface SectionData {
  heading: string
  nextReview: string
  identifiedNeed: string
  needSeverity: string
  needScore: number
  plannedOutcomes: string
  howToAchieve: string
  interactions: Interaction[]
  risk: RiskData
  carers: Carer[]
  reviewStartTarget: string
  reviewNotes: string
}

const data: Record<string, SectionData> = {
  'General Nutrition': {
    heading: 'Food Allergies',
    nextReview: '10 Jun—21 Jul 2025',
    identifiedNeed: 'Isabel follows a vegetarian diet, avoiding all meat, poultry, and fish. This choice reflects her personal values and contributes to her overall wellbeing. Her meals must consistently honour this preference while supporting her nutritional needs.',
    needSeverity: 'Sever need',
    needScore: 16,
    plannedOutcomes: 'Isabel will receive balanced, satisfying vegetarian meals that provide adequate protein, iron, and essential vitamins. She should feel respected and confident that her dietary choices are understood and upheld. Caregivers will be equipped to prepare varied, nutritious meals and adjust plans in consultation with healthcare professionals as needed.',
    howToAchieve: 'To meet these outcomes, caregivers will follow a structured meal plan that includes diverse plant-based ingredients such as legumes, tofu, whole grains, and fortified foods. Labels will be checked carefully to avoid hidden animal products, and kitchen practices will prevent cross-contamination. Regular check-ins with Isabel will ensure her preferences are reflected, and dietitians will be consulted to monitor her nutritional status and make adjustments when necessary.',
    interactions: [
      { title: 'Interaction 1', body: 'Daily food preparation will involve thoughtful ingredient selection and clear communication among caregivers, family, and any external providers to ensure consistency.' },
      { title: 'Interaction 2', body: 'Isabel will be encouraged to share her preferences and feedback, fostering a sense of autonomy and enjoyment around mealtimes.' },
    ],
    risk: {
      category: 'Medical Condition risk',
      title: 'Food Allergy Dairy Products',
      score: 16,
      factors: [
        'History of Allergic reactions to milk and dairy based foods',
        'Increased risk of accidental exposure during meal prep or group dining',
        'Potential for sever allergic response if dairy is consumed',
      ],
      likelihood: 4,
      impact: 4,
      residualRisk: 16,
      mitigations: [
        'Maintain strict dietary control and read food labels carefully',
        'Provide dairy-free alternatives for all meals and snacks',
        'Ensure all staff are trained recognise symptoms of an allergic reaction and know how to respond',
      ],
      mitigationLikelihood: 3,
      mitigationImpact: 3,
    },
    carers: [{ name: 'Line Idris', role: 'Carer', initials: 'LI' }],
    reviewStartTarget: '8 May—23 Jul 2025',
    reviewNotes: "If Isabel's dietary needs are not carefully managed, there is a risk of nutritional gaps, particularly in protein, iron, and vitamin B12.",
  },
  'Communication': {
    heading: 'Communication',
    nextReview: '10 Jun—21 Jul 2025',
    identifiedNeed: 'Sarah benefits from clear, simple language and visual cues to aid understanding. Carers should use calm, patient communication styles and avoid jargon.',
    needSeverity: 'Moderate need',
    needScore: 10,
    plannedOutcomes: 'Sarah will be supported to communicate her needs and preferences confidently. Carers will use consistent, person-centred communication strategies to ensure she is heard and understood.',
    howToAchieve: 'Carers will use short sentences, visual aids, and allow time for Sarah to process and respond. Strategies will be reviewed regularly and adapted to her changing needs.',
    interactions: [
      { title: 'Interaction 1', body: 'Use simple words and short sentences. Speak slowly and clearly.' },
    ],
    risk: {
      category: 'Communication risk',
      title: 'Misunderstanding of Instructions',
      score: 8,
      factors: ['Potential for miscommunication in complex care situations'],
      likelihood: 2,
      impact: 4,
      residualRisk: 6,
      mitigations: ['Use visual aids', 'Confirm understanding by asking Sarah to repeat back'],
      mitigationLikelihood: 2,
      mitigationImpact: 3,
    },
    carers: [{ name: 'Line Idris', role: 'Carer', initials: 'LI' }],
    reviewStartTarget: '8 May—23 Jul 2025',
    reviewNotes: 'Review communication strategy quarterly or when care team changes.',
  },
  'Mobility': {
    heading: 'Mobility',
    nextReview: '10 Jun—21 Jul 2025',
    identifiedNeed: 'Sarah needs carer assistance to move between chairs and navigate stairs safely. She uses a grab rail on stairs.',
    needSeverity: 'Sever need',
    needScore: 16,
    plannedOutcomes: 'Sarah will be able to move safely within her home environment with appropriate carer support. Falls will be prevented through consistent use of assistive equipment.',
    howToAchieve: 'Carers will assist with all transfers using a transfer belt. All mobility aids will be checked weekly. Hazards in walkways will be cleared and grab rails inspected monthly.',
    interactions: [
      { title: 'Interaction 1', body: 'Always assist with transfers and ensure the environment is clear of hazards.' },
    ],
    risk: {
      category: 'Mobility risk',
      title: 'Fall risk during transfers',
      score: 12,
      factors: ['Risk of fall when moving between chairs', 'Stairs present elevated risk'],
      likelihood: 3,
      impact: 4,
      residualRisk: 9,
      mitigations: ['Use transfer belt when assisting', 'Ensure grab rails are installed and secure'],
      mitigationLikelihood: 2,
      mitigationImpact: 3,
    },
    carers: [{ name: 'Line Idris', role: 'Carer', initials: 'LI' }],
    reviewStartTarget: '8 May—23 Jul 2025',
    reviewNotes: 'Review mobility plan if any falls occur or functional status changes.',
  },
}

const section = (data as Record<string, SectionData>)[props.sectionTitle] ?? data['General Nutrition']

function scoreColor(score: number): string {
  if (score >= 12) return '#cc5252'
  if (score >= 6)  return '#ebcd4d'
  return '#4caf50'
}
</script>

<template>
  <PulseDrawer
    :visible="true"
    position="right"
    :breadcrumb="props.breadcrumb ?? 'Previous Reviews'"
    :breadcrumb-callback="props.breadcrumb ? () => { emit('navigateBack') } : undefined"
    :title="section.heading"
    @update:visible="(v) => { if (!v) emit('close') }"
  >
    <div class="rcp__body">

      <!-- Metadata: next review + print -->
      <div class="rcp__meta-row">
        <div class="rcp__meta-dates">
          <span class="rcp__meta-label">Next review</span>
          <span class="rcp__meta-value">{{ section.nextReview }}</span>
        </div>
        <PulseButton label="Print" type="secondary" :small="true" />
      </div>

      <!-- ── Identified Need ── -->
      <div class="rcp__block">
        <div class="rcp__divider" />
        <h4 class="rcp__section-title">Identified Need</h4>
        <p class="rcp__body-text">{{ section.identifiedNeed }}</p>
        <div class="rcp__score-row">
          <div class="rcp__score-badge" :style="{ background: scoreColor(section.needScore) }">
            {{ section.needScore }}
          </div>
          <span class="rcp__score-label">{{ section.needSeverity }}</span>
        </div>
      </div>

      <!-- ── Planned Outcomes ── -->
      <div class="rcp__block">
        <div class="rcp__divider" />
        <h4 class="rcp__section-title">Planned Outcomes</h4>
        <p class="rcp__body-text">{{ section.plannedOutcomes }}</p>
        <h5 class="rcp__sub-heading">How to achieve outcomes</h5>
        <p class="rcp__body-text">{{ section.howToAchieve }}</p>
      </div>

      <!-- ── Linked Interactions ── -->
      <div class="rcp__block">
        <div class="rcp__divider" />
        <h4 class="rcp__section-title">Linked Interactions</h4>
        <template v-for="interaction in section.interactions" :key="interaction.title">
          <h5 class="rcp__sub-heading">{{ interaction.title }}</h5>
          <p class="rcp__body-text">{{ interaction.body }}</p>
        </template>
      </div>

      <!-- ── Risk ── -->
      <div class="rcp__block">
        <div class="rcp__divider" />
        <h4 class="rcp__section-title">Risk</h4>
        <h5 class="rcp__sub-heading">{{ section.risk.category }}</h5>
        <p class="rcp__risk-name">{{ section.risk.title }}</p>

        <!-- Risk score card -->
        <div class="rcp__risk-card">
          <div class="rcp__score-row">
            <div class="rcp__score-badge" :style="{ background: scoreColor(section.risk.score) }">
              {{ section.risk.score }}
            </div>
            <span class="rcp__score-label">Risk Score</span>
          </div>
          <div>
            <p class="rcp__risk-factors-title">Risk Factors</p>
            <ul class="rcp__list">
              <li v-for="f in section.risk.factors" :key="f">{{ f }}</li>
            </ul>
          </div>
          <div class="rcp__risk-card-rule" />
          <div class="rcp__likelihood-row">
            <div class="rcp__likelihood-item">
              <div class="rcp__score-badge rcp__score-badge--light-red">{{ section.risk.likelihood }}</div>
              <span class="rcp__likelihood-label">High Likelihood</span>
            </div>
            <div class="rcp__likelihood-item">
              <div class="rcp__score-badge rcp__score-badge--light-red">{{ section.risk.impact }}</div>
              <span class="rcp__likelihood-label">Major Impact</span>
            </div>
          </div>
        </div>

        <!-- Residual risk card -->
        <div class="rcp__risk-card">
          <div class="rcp__score-row">
            <div class="rcp__score-badge rcp__score-badge--amber-thick">{{ section.risk.residualRisk }}</div>
            <span class="rcp__score-label">Residual Risk</span>
          </div>
          <div>
            <p class="rcp__risk-factors-title">Mitigations</p>
            <ul class="rcp__list">
              <li v-for="m in section.risk.mitigations" :key="m">{{ m }}</li>
            </ul>
          </div>
          <div class="rcp__risk-card-rule" />
          <div class="rcp__likelihood-row">
            <div class="rcp__likelihood-item">
              <div class="rcp__score-badge rcp__score-badge--amber-thin">{{ section.risk.mitigationLikelihood }}</div>
              <span class="rcp__likelihood-label">High Likelihood</span>
            </div>
            <div class="rcp__likelihood-item">
              <div class="rcp__score-badge rcp__score-badge--amber-thin">{{ section.risk.mitigationImpact }}</div>
              <span class="rcp__likelihood-label">Major Impact</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Responsible Carers ── -->
      <div class="rcp__block">
        <div class="rcp__divider" />
        <h4 class="rcp__section-title">Responsible carers</h4>
        <div v-for="carer in section.carers" :key="carer.name" class="rcp__carer-row">
          <div class="rcp__carer-avatar rcp__carer-avatar--lg">{{ carer.initials }}</div>
          <div class="rcp__carer-info">
            <p class="rcp__carer-name">{{ carer.name }}</p>
            <p class="rcp__carer-role">{{ carer.role }}</p>
          </div>
        </div>
      </div>

      <!-- ── Review Notes ── -->
      <div class="rcp__block rcp__block--last">
        <div class="rcp__divider" />
        <h4 class="rcp__section-title">Review Notes</h4>
        <div class="rcp__meta-dates rcp__meta-dates--sm">
          <span class="rcp__meta-label">Start—Target:</span>
          <span class="rcp__meta-value">{{ section.reviewStartTarget }}</span>
        </div>
        <p class="rcp__body-text">{{ section.reviewNotes }}</p>
        <div v-for="carer in section.carers" :key="carer.name" class="rcp__carer-row">
          <div class="rcp__carer-avatar rcp__carer-avatar--sm">{{ carer.initials }}</div>
          <div class="rcp__carer-info">
            <p class="rcp__carer-name">{{ carer.name }}</p>
            <p class="rcp__carer-role">{{ carer.role }}</p>
          </div>
        </div>
      </div>

    </div>

    <div class="rcp__footer">
      <PulseButton label="Close" type="secondary" :full-width="true" @click="emit('close')" />
    </div>
  </PulseDrawer>
</template>

<style scoped>
/* ── Scrollable body ── */
.rcp__body {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* ── Top metadata row ── */
.rcp__meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 4px;
}

.rcp__meta-dates {
  display: flex;
  gap: 4px;
  align-items: center;
}

.rcp__meta-dates--sm {
  margin-bottom: 12px;
}

.rcp__meta-label {
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: var(--pulse-color-neutral-100, #6c727e);
  white-space: nowrap;
}

.rcp__meta-value {
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: var(--pulse-color-neutral-100, #6c727e);
  white-space: nowrap;
}

/* ── Section blocks ── */
.rcp__block {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rcp__block--last {
  padding-bottom: 40px;
}

/* ── Divider ── */
.rcp__divider {
  height: 1px;
  background: var(--pulse-color-neutral-30, #f3f4f5);
  flex-shrink: 0;
  margin: 14px 0 0;
}

/* ── Typography ── */
.rcp__section-title {
  font-family: 'FS Me', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--pulse-color-primary-100, #2b5656);
  margin: 0;
  line-height: 1;
}

.rcp__sub-heading {
  font-family: 'FS Me', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--pulse-color-primary-100, #2b5656);
  margin: 0;
  line-height: 1;
}

.rcp__body-text {
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #36393f;
  line-height: 23.8px;
  margin: 0;
}

.rcp__risk-name {
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #36393f;
  line-height: 21.4px;
  margin: 0;
}

.rcp__risk-factors-title {
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #36393f;
  margin: 0 0 8px;
}

.rcp__list {
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #36393f;
  line-height: 21.4px;
  padding-left: 24px;
  margin: 0;
  list-style: disc;
}

.rcp__list li {
  margin-bottom: 2px;
}

/* ── Score row ── */
.rcp__score-row {
  display: flex;
  align-items: center;
  gap: 9px;
  min-height: 60px;
}

.rcp__score-label {
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #36393f;
  line-height: 26.2px;
}

/* ── Score badges — 40px circles ── */
.rcp__score-badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  flex-shrink: 0;
  background: #cc5252; /* default: red */
}

/* Light red fill (likelihood/impact) */
.rcp__score-badge--light-red {
  background: #ffb2b2;
  color: #172f2f;
}

/* Amber thick border (residual risk) */
.rcp__score-badge--amber-thick {
  background: transparent;
  border: 3px solid #ebcd4d;
  color: #172f2f;
}

/* Amber thin border (mitigation likelihood) */
.rcp__score-badge--amber-thin {
  background: transparent;
  border: 1px solid #e6c020;
  color: #172f2f;
}

/* ── Risk cards (bordered boxes) ── */
.rcp__risk-card {
  border: 1px solid #979797;
  border-radius: 9px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.rcp__risk-card-rule {
  height: 1px;
  background: #979797;
  margin: 0 -8px;
}

/* ── Likelihood row ── */
.rcp__likelihood-row {
  display: flex;
  gap: 44px;
  align-items: center;
  padding: 0 30px;
  min-height: 48px;
}

.rcp__likelihood-item {
  display: flex;
  align-items: center;
  gap: 9px;
}

.rcp__likelihood-label {
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #36393f;
  line-height: 21.4px;
}

/* ── Carer rows ── */
.rcp__carer-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 4px 0;
}

.rcp__carer-avatar {
  border-radius: 50%;
  background: var(--pulse-color-primary-20, #e8f0f0);
  color: var(--pulse-color-primary-100, #2b5656);
  font-family: 'FS Me', sans-serif;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rcp__carer-avatar--lg {
  width: 32px;
  height: 32px;
  font-size: 12px;
}

.rcp__carer-avatar--sm {
  width: 24px;
  height: 24px;
  font-size: 10px;
}

.rcp__carer-name {
  font-family: 'FS Me', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--pulse-color-primary-100, #2b5656);
  margin: 0;
  line-height: 1;
}

.rcp__carer-role {
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #51555e;
  margin: 0;
}

/* ── Footer ── */
.rcp__footer {
  padding-top: 16px;
  border-top: 1px solid var(--pulse-color-neutral-40);
  flex-shrink: 0;
}
</style>
