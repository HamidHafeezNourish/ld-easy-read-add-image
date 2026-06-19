<script setup lang="ts">
import PulseDrawer from '@/components/PulseDrawer/PulseDrawer.vue'
import PulseButton from '@/components/PulseButton/PulseButton.vue'
import PulseTag from '@/components/PulseTag/PulseTag.vue'

const props = defineProps<{
  sectionTitle: string
}>()

const emit = defineEmits<{ close: [] }>()

const data = {
  'General Nutrition': {
    heading: 'General Nutrition',
    description: 'Covers nutritional planning, allergy management, and assistance with meal preparation to promote autonomy and health.',
    tags: ['Nursing', 'Learning and Disabilities'],
    nextReview: '10 Jun—21 Jul 2025',
    identifiedNeed: 'Isabel follows a vegetarian diet, avoiding all meat, poultry, and fish. This choice reflects her personal values and contributes to her overall wellbeing. Her meals must consistently honour this preference while supporting her nutritional needs.',
    needSeverity: 'Sever need',
    needScore: 16,
    interactions: [
      { title: 'Interaction 1', body: 'Daily food preparation will involve thoughtful ingredient selection and clear communication among caregivers, family, and any external providers to ensure consistency.' },
      { title: 'Interaction 2', body: 'Isabel will be encouraged to share her preferences and feedback, fostering a sense of autonomy and enjoyment around mealtimes' },
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
    reviewNotes: "If Isabel's dietary needs are not carefully managed, there is a risk of nutritional gaps, particularly in protein, iron, and vitamin B12.",
    lastReview: '8 May 2025  15:39 by Lina Idris',
  },
  'Communication': {
    heading: 'Communication',
    description: 'Supporting clear and effective communication for Sarah in her daily interactions.',
    tags: ['Nursing', 'Learning and Disabilities'],
    nextReview: '10 Jun—21 Jul 2025',
    identifiedNeed: 'Sarah benefits from clear, simple language and visual cues to aid understanding. Carers should use calm, patient communication styles and avoid jargon.',
    needSeverity: 'Moderate need',
    needScore: 10,
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
    reviewNotes: 'Review communication strategy quarterly or when care team changes.',
    lastReview: '8 May 2025  15:39 by Lina Idris',
  },
  'Mobility': {
    heading: 'Mobility',
    description: 'Supporting Sarah with safe movement and transfers in and around her home.',
    tags: ['Nursing', 'Learning and Disabilities'],
    nextReview: '10 Jun—21 Jul 2025',
    identifiedNeed: 'Sarah needs carer assistance to move between chairs and navigate stairs safely. She uses a grab rail on stairs.',
    needSeverity: 'Sever need',
    needScore: 16,
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
    reviewNotes: 'Review mobility plan if any falls occur or functional status changes.',
    lastReview: '8 May 2025  15:39 by Lina Idris',
  },
}

const section = (data as any)[props.sectionTitle] ?? data['General Nutrition']
</script>

<template>
  <PulseDrawer
    :visible="true"
    position="right"
    :title="props.sectionTitle"
    @update:visible="(v) => { if (!v) emit('close') }"
  >
    <div class="rcp__body">

      <!-- Title block -->
      <div class="rcp__title-block">
        <h2 class="rcp__heading">{{ section.heading }}</h2>
        <p class="rcp__desc">{{ section.description }}</p>
        <div class="rcp__tags">
          <span v-for="tag in section.tags" :key="tag" class="rcp__tag">{{ tag }}</span>
        </div>
        <p class="rcp__review-date">Next review {{ section.nextReview }}</p>
      </div>

      <!-- Identified Need -->
      <div class="rcp__section">
        <h3 class="rcp__section-title">Identified Need</h3>
        <p class="rcp__body-text">{{ section.identifiedNeed }}</p>
        <div class="rcp__badge-row">
          <span class="rcp__score-badge">{{ section.needScore }}</span>
          <span class="rcp__need-label">{{ section.needSeverity }}</span>
        </div>
      </div>

      <!-- Linked Interactions -->
      <div class="rcp__section">
        <h3 class="rcp__section-title">Linked Interactions</h3>
        <div v-for="interaction in section.interactions" :key="interaction.title" class="rcp__interaction">
          <h4 class="rcp__interaction-title">{{ interaction.title }}</h4>
          <p class="rcp__body-text">{{ interaction.body }}</p>
        </div>
      </div>

      <!-- Risk -->
      <div class="rcp__section">
        <h3 class="rcp__section-title">Risk</h3>
        <p class="rcp__risk-category">{{ section.risk.category }}</p>
        <p class="rcp__risk-title">{{ section.risk.title }}</p>

        <div class="rcp__score-row">
          <span class="rcp__score-badge">{{ section.risk.score }}</span>
          <span class="rcp__risk-score-label">Risk Score</span>
        </div>

        <h4 class="rcp__sub-title">Risk Factors</h4>
        <ul class="rcp__list">
          <li v-for="f in section.risk.factors" :key="f">{{ f }}</li>
        </ul>

        <div class="rcp__likelihood-row">
          <div class="rcp__likelihood-item">
            <span class="rcp__score-badge rcp__score-badge--sm">{{ section.risk.likelihood }}</span>
            <span class="rcp__likelihood-label">High Likelihood</span>
          </div>
          <div class="rcp__likelihood-item">
            <span class="rcp__score-badge rcp__score-badge--sm">{{ section.risk.impact }}</span>
            <span class="rcp__likelihood-label">Major Impact</span>
          </div>
        </div>

        <div class="rcp__score-row">
          <span class="rcp__score-badge rcp__score-badge--amber">{{ section.risk.residualRisk }}</span>
          <span class="rcp__risk-score-label">Residual Risk</span>
        </div>

        <h4 class="rcp__sub-title">Mitigations</h4>
        <ul class="rcp__list">
          <li v-for="m in section.risk.mitigations" :key="m">{{ m }}</li>
        </ul>

        <div class="rcp__likelihood-row">
          <div class="rcp__likelihood-item">
            <span class="rcp__score-badge rcp__score-badge--sm rcp__score-badge--green">{{ section.risk.mitigationLikelihood }}</span>
            <span class="rcp__likelihood-label">High Likelihood</span>
          </div>
          <div class="rcp__likelihood-item">
            <span class="rcp__score-badge rcp__score-badge--sm rcp__score-badge--green">{{ section.risk.mitigationImpact }}</span>
            <span class="rcp__likelihood-label">Major Impact</span>
          </div>
        </div>
      </div>

      <!-- Responsible Carers -->
      <div class="rcp__section">
        <h3 class="rcp__section-title">Responsible carers</h3>
        <div v-for="carer in section.carers" :key="carer.name" class="rcp__carer">
          <div class="rcp__carer-avatar">{{ carer.initials }}</div>
          <div>
            <p class="rcp__carer-name">{{ carer.name }}</p>
            <p class="rcp__carer-role">{{ carer.role }}</p>
          </div>
        </div>
      </div>

      <!-- Review Notes -->
      <div class="rcp__section">
        <h3 class="rcp__section-title">Review Notes</h3>
        <p class="rcp__review-meta">Last review {{ section.lastReview }}</p>
        <p class="rcp__body-text">{{ section.reviewNotes }}</p>
      </div>

    </div>

    <div class="rcp__footer">
      <PulseButton label="Close" type="secondary" :full-width="true" @click="emit('close')" />
    </div>
  </PulseDrawer>
</template>

<style scoped>
.rcp__body {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.rcp__title-block {
  padding: 4px 0 20px;
  border-bottom: 1px solid var(--pulse-color-neutral-30);
  margin-bottom: 0;
}

.rcp__heading {
  font-family: 'FS Me', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #36393f;
  margin: 0 0 6px;
}

.rcp__desc {
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: #6c727e;
  margin: 0 0 10px;
  line-height: 1.5;
}

.rcp__tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.rcp__tag {
  font-family: Inter, sans-serif;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 12px;
  background: #dbdbec;
  color: #36393f;
}

.rcp__review-date {
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: #6c727e;
  margin: 0;
}

/* Sections */
.rcp__section {
  padding: 20px 0;
  border-bottom: 1px solid var(--pulse-color-neutral-30);
}

.rcp__section:last-child {
  border-bottom: none;
}

.rcp__section-title {
  font-family: 'FS Me', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #36393f;
  margin: 0 0 12px;
}

.rcp__sub-title {
  font-family: 'FS Me', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #36393f;
  margin: 14px 0 8px;
}

.rcp__body-text {
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #36393f;
  line-height: 1.6;
  margin: 0 0 10px;
}

.rcp__badge-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.rcp__score-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fee2e2;
  color: #b60000;
  font-family: 'FS Me', sans-serif;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

.rcp__score-badge--sm {
  width: 26px;
  height: 26px;
  font-size: 12px;
}

.rcp__score-badge--amber {
  background: #fef3c7;
  color: #92400e;
}

.rcp__score-badge--green {
  background: #dcfce7;
  color: #166534;
}

.rcp__need-label {
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: #36393f;
}

.rcp__risk-category {
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #6c727e;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 4px;
}

.rcp__risk-title {
  font-family: 'FS Me', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #36393f;
  margin: 0 0 12px;
}

.rcp__score-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 0 4px;
}

.rcp__risk-score-label {
  font-family: 'FS Me', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #36393f;
}

.rcp__list {
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: #36393f;
  line-height: 1.6;
  padding-left: 18px;
  margin: 0;
}

.rcp__list li {
  margin-bottom: 4px;
}

.rcp__likelihood-row {
  display: flex;
  gap: 20px;
  margin: 14px 0;
}

.rcp__likelihood-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rcp__likelihood-label {
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: #36393f;
}

/* Carers */
.rcp__carer {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rcp__carer-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--pulse-color-primary-20);
  color: var(--pulse-color-primary-100);
  font-family: 'FS Me', sans-serif;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rcp__carer-name {
  font-family: 'FS Me', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #36393f;
  margin: 0;
}

.rcp__carer-role {
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: #6c727e;
  margin: 0;
}

.rcp__review-meta {
  font-family: Inter, sans-serif;
  font-size: 11px;
  color: #9ca3af;
  margin: 0 0 8px;
}

.rcp__footer {
  padding-top: 16px;
  border-top: 1px solid var(--pulse-color-neutral-40);
  flex-shrink: 0;
}
</style>
