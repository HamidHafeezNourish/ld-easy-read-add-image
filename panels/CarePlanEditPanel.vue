<script setup lang="ts">
import { ref } from 'vue'
import PulseDrawer from '@/components/PulseDrawer/PulseDrawer.vue'
import PulseButton from '@/components/PulseButton/PulseButton.vue'

const props = defineProps<{ sectionTitle: string }>()
const emit = defineEmits<{ close: []; update: [] }>()

interface SectionData {
  identifiedNeedName: string
  identifiedNeed: string
  levelOfNeed: string
  plannedOutcomes: string
  interactions: string[]
  risks: Array<{ label: string; riskScore: number; mitigationScore: number }>
  carers: string[]
}

const SECTION_DATA: Record<string, SectionData> = {
  'General Nutrition': {
    identifiedNeedName: 'Vegetarian Diet Management',
    identifiedNeed: 'Isabel follows a vegetarian diet, avoiding all meat, poultry, and fish. This choice reflects her personal values and contributes to her overall wellbeing. Her meals must consistently honour this preference while supporting her nutritional needs.',
    levelOfNeed: 'Visit the local school to familiarise with the environment',
    plannedOutcomes: 'Isabel will receive balanced, satisfying vegetarian meals that provide adequate protein, iron, and essential vitamins. She should feel respected and confident that her dietary choices are understood and upheld.',
    interactions: ['Interaction 1', 'Interaction 2'],
    risks: [
      { label: 'Food Allergy dairy products', riskScore: 20, mitigationScore: 12 },
      { label: 'Food Allergy dairy products', riskScore: 20, mitigationScore: 12 },
      { label: 'Food Allergy dairy products', riskScore: 20, mitigationScore: 12 },
    ],
    carers: ['Line Idris', 'Rafi Ali'],
  },
  'Communication': {
    identifiedNeedName: 'Communication Support Plan',
    identifiedNeed: 'Sarah benefits from clear, simple language and visual cues to aid understanding. Carers should use calm, patient communication styles and avoid jargon.',
    levelOfNeed: 'Moderate level of support required',
    plannedOutcomes: 'Sarah will be supported to communicate her needs and preferences confidently. Carers will use consistent, person-centred communication strategies to ensure she is heard and understood.',
    interactions: ['Interaction 1'],
    risks: [
      { label: 'Misunderstanding of Instructions', riskScore: 8, mitigationScore: 6 },
    ],
    carers: ['Line Idris'],
  },
  'Mobility': {
    identifiedNeedName: 'Mobility Assistance Plan',
    identifiedNeed: 'Sarah needs carer assistance to move between chairs and navigate stairs safely. She uses a grab rail on stairs.',
    levelOfNeed: 'High level of support required',
    plannedOutcomes: 'Sarah will be able to move safely within her home environment with appropriate carer support. Falls will be prevented through consistent use of assistive equipment.',
    interactions: ['Interaction 1'],
    risks: [
      { label: 'Fall risk during transfers', riskScore: 12, mitigationScore: 9 },
      { label: 'Stair navigation hazard', riskScore: 10, mitigationScore: 6 },
    ],
    carers: ['Line Idris', 'Rafi Ali'],
  },
}

function section(): SectionData {
  return SECTION_DATA[props.sectionTitle] ?? {
    identifiedNeedName: 'Need Name',
    identifiedNeed: 'Describe the identified need for this care plan section.',
    levelOfNeed: '',
    plannedOutcomes: 'Describe the planned outcomes.',
    interactions: ['Interaction 1'],
    risks: [{ label: 'Risk item', riskScore: 8, mitigationScore: 4 }],
    carers: ['Carer'],
  }
}

const reviewNotes = ref('')
const setReviewDate = ref(true)
const timelineOption = ref<'no-warning' | 'warning' | 'red-warning'>('no-warning')
</script>

<template>
  <PulseDrawer
    :visible="true"
    position="right"
    :title="`${props.sectionTitle} Care Plan`"
    @update:visible="(v) => { if (!v) emit('close') }"
  >
    <div class="cpep__body">

      <!-- ── Identified Need ── -->
      <p class="cpep__section-title">Identified Need</p>

      <div class="cpep__field">
        <label class="cpep__label">Create a name</label>
        <div class="cpep__input-wrap">
          <input type="text" class="cpep__input" :value="section().identifiedNeedName" readonly />
        </div>
      </div>

      <div class="cpep__field">
        <label class="cpep__label">Identified Needs</label>
        <textarea class="cpep__textarea cpep__textarea--filled" :value="section().identifiedNeed" readonly />
      </div>

      <div class="cpep__field">
        <label class="cpep__label">Level of Need</label>
        <div class="cpep__select-wrap">
          <div class="cpep__select-inner">
            <span class="cpep__select-value">{{ section().levelOfNeed }}</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="cpep__chevron">
              <path d="M4 6l4 4 4-4" stroke="#6c727e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="cpep__divider" />

      <!-- ── Planned Outcomes ── -->
      <p class="cpep__section-title">Planned Outcomes</p>

      <div class="cpep__field">
        <label class="cpep__label">Planned outcomes</label>
        <textarea class="cpep__textarea cpep__textarea--filled" :value="section().plannedOutcomes" readonly />
      </div>

      <div class="cpep__divider" />

      <!-- ── Linked Interactions ── -->
      <div class="cpep__section-row">
        <p class="cpep__section-title">Linked Interactions</p>
        <button class="cpep__add-btn">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          Add interaction
        </button>
      </div>

      <div class="cpep__item-list">
        <div v-for="(item, i) in section().interactions" :key="i" class="cpep__item-row">
          <span class="cpep__item-label">{{ item }}</span>
          <button class="cpep__delete-btn">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M6 4V2.5h4V4M5 4v8h6V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Delete
          </button>
        </div>
      </div>

      <div class="cpep__divider" />

      <!-- ── Risks ── -->
      <div class="cpep__section-row">
        <p class="cpep__section-title">Risks</p>
        <button class="cpep__add-btn">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          Add Risk
        </button>
      </div>

      <div class="cpep__item-list">
        <div v-for="(risk, i) in section().risks" :key="i" class="cpep__risk-row">
          <div class="cpep__risk-tags">
            <span class="cpep__risk-tag cpep__risk-tag--pink">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 2L1.5 13.5h13L8 2z" stroke="#b91c1c" stroke-width="1.4" stroke-linejoin="round"/><path d="M8 6v3M8 11v.5" stroke="#b91c1c" stroke-width="1.4" stroke-linecap="round"/></svg>
              Risk {{ risk.riskScore }}
            </span>
            <span class="cpep__risk-tag cpep__risk-tag--lavender">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 2a6 6 0 100 12A6 6 0 008 2zM8 5v4M8 11v.5" stroke="#7c3aed" stroke-width="1.4" stroke-linecap="round"/></svg>
              Mitigation {{ risk.mitigationScore }}
            </span>
          </div>
          <div class="cpep__risk-actions">
            <button class="cpep__edit-btn">Edit</button>
            <button class="cpep__delete-btn">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M6 4V2.5h4V4M5 4v8h6V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Delete
            </button>
          </div>
          <span class="cpep__risk-label">{{ risk.label }}</span>
        </div>
      </div>

      <div class="cpep__divider" />

      <!-- ── Responsible Carers ── -->
      <p class="cpep__section-title">Responsible Carers</p>

      <div class="cpep__field">
        <label class="cpep__label">Responsible Carers</label>
        <div class="cpep__chips-wrap">
          <div class="cpep__chips">
            <span v-for="carer in section().carers" :key="carer" class="cpep__chip">
              {{ carer }}
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#2b5656" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
          </div>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="cpep__chips-chevron"><path d="M4 6l4 4 4-4" stroke="#6c727e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>

      <div class="cpep__divider" />

      <!-- ── Review Notes ── -->
      <p class="cpep__section-title">Review Notes</p>

      <div class="cpep__date-row">
        <div class="cpep__field cpep__field--half">
          <label class="cpep__label">Next Review Due</label>
          <div class="cpep__date-input">
            <span class="cpep__date-value">1 Jan 2026</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="cpep__date-icon"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#6c727e" stroke-width="1.5"/><path d="M3 9h18M8 2v4M16 2v4" stroke="#6c727e" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
        </div>
        <div class="cpep__field cpep__field--half">
          <label class="cpep__label">Time of review</label>
          <div class="cpep__date-input">
            <span class="cpep__date-value">11:00:15</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="cpep__date-icon"><circle cx="12" cy="12" r="9" stroke="#6c727e" stroke-width="1.5"/><path d="M12 7v5l3 3" stroke="#6c727e" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
        </div>
      </div>

      <div class="cpep__field">
        <label class="cpep__label">Review notes <span class="cpep__required">*</span></label>
        <textarea v-model="reviewNotes" class="cpep__textarea" placeholder="Add review notes..." />
      </div>

      <div class="cpep__field">
        <label class="cpep__label">Assign Carer</label>
        <div class="cpep__chips-wrap">
          <div class="cpep__chips">
            <span v-for="carer in section().carers" :key="carer" class="cpep__chip">
              {{ carer }}
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#2b5656" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
          </div>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="cpep__chips-chevron"><path d="M4 6l4 4 4-4" stroke="#6c727e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>

      <div class="cpep__divider" />

      <!-- ── Review Date Toggle ── -->
      <div class="cpep__toggle-row">
        <div class="cpep__toggle-text">
          <p class="cpep__toggle-label">Set review date</p>
          <p class="cpep__toggle-hint">Disabling the review date means it will not appear in the care plan review or on your timeline.</p>
        </div>
        <button
          class="cpep__toggle"
          :class="{ 'cpep__toggle--on': setReviewDate }"
          @click="setReviewDate = !setReviewDate"
        >
          <span class="cpep__toggle-handle" />
        </button>
      </div>

      <div v-if="setReviewDate" class="cpep__field">
        <label class="cpep__label">Next Review Due</label>
        <div class="cpep__date-input" style="width: 216px;">
          <span class="cpep__date-value">—</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="cpep__date-icon"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#6c727e" stroke-width="1.5"/><path d="M3 9h18M8 2v4M16 2v4" stroke="#6c727e" stroke-width="1.5" stroke-linecap="round"/></svg>
        </div>
      </div>

      <div class="cpep__divider" />

      <!-- ── Timeline Behaviour ── -->
      <p class="cpep__timeline-heading">Timeline behaviour</p>

      <div class="cpep__timeline-list">
        <label class="cpep__timeline-item">
          <input type="radio" class="cpep__radio" :checked="timelineOption === 'no-warning'" @change="timelineOption = 'no-warning'" />
          <span class="cpep__timeline-label">Close With No Warning</span>
          <div class="cpep__timeline-icon cpep__timeline-icon--grey">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#fff" stroke-width="1.5"/><path d="M7 12l4 4 6-6" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </label>

        <label class="cpep__timeline-item">
          <input type="radio" class="cpep__radio" :checked="timelineOption === 'warning'" @change="timelineOption = 'warning'" />
          <span class="cpep__timeline-label">Close With Warning on the Timeline</span>
          <div class="cpep__timeline-icon cpep__timeline-icon--grey">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3L2 21h20L12 3z" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4M12 17v.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
        </label>

        <label class="cpep__timeline-item">
          <input type="radio" class="cpep__radio" :checked="timelineOption === 'red-warning'" @change="timelineOption = 'red-warning'" />
          <span class="cpep__timeline-label">Close with Red Warning on Timeline</span>
          <div class="cpep__timeline-icon cpep__timeline-icon--grey">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3L2 21h20L12 3z" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4M12 17v.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
        </label>
      </div>

    </div>

    <!-- Footer -->
    <div class="cpep__footer">
      <PulseButton label="Cancel" type="secondary" :full-width="true" @click="emit('close')" />
      <PulseButton label="Update" type="primary" :full-width="true" @click="emit('update')" />
    </div>
  </PulseDrawer>
</template>

<style scoped>
.cpep__body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.cpep__section-title {
  font-family: 'FS Me', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #2b5656;
  margin: 0;
}

.cpep__section-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cpep__divider {
  height: 1px;
  background: #f3f4f5;
  margin: 4px 0;
}

.cpep__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cpep__field--half {
  flex: 1;
}

.cpep__date-row {
  display: flex;
  gap: 16px;
}

.cpep__label {
  font-family: 'FS Me', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #172b34;
}

.cpep__required { color: #cc5252; }

.cpep__input-wrap {
  border: 1px solid #cfd2d8;
  border-radius: 8px;
  overflow: hidden;
}

.cpep__input {
  width: 100%;
  box-sizing: border-box;
  padding: 18px 10px 8px;
  border: none;
  background: #fff;
  font-family: Inter, sans-serif;
  font-size: 16px;
  color: #36393f;
  outline: none;
}

.cpep__textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 120px;
  padding: 9px 13px;
  border: 1px solid #cfd2d8;
  border-radius: 8px;
  font-family: Inter, sans-serif;
  font-size: 16px;
  color: #36393f;
  line-height: 1.5;
  resize: vertical;
  outline: none;
  background: #fff;
}

.cpep__textarea--filled {
  background: #f0fafa;
  resize: none;
}

.cpep__select-wrap {
  border: 1px solid #a3e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(18,18,23,0.05);
}

.cpep__select-inner {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  gap: 8px;
  background: #fff;
}

.cpep__select-value {
  flex: 1;
  font-family: Inter, sans-serif;
  font-size: 15px;
  color: #36393f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cpep__chevron { flex-shrink: 0; }

/* Interactions + add button */
.cpep__add-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border: 1px solid #2b5656;
  border-radius: 20px;
  background: transparent;
  color: #2b5656;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.12s;
}

.cpep__add-btn:hover { background: #e8f5f5; }

.cpep__item-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cpep__item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #dbdde2;
  border-radius: 8px;
  padding: 10px 12px;
}

.cpep__item-label {
  font-family: Inter, sans-serif;
  font-size: 16px;
  color: #2b5656;
  flex: 1;
}

.cpep__delete-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border: none;
  border-radius: 20px;
  background: #fee2e2;
  color: #b60000;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  flex-shrink: 0;
}

.cpep__edit-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border: none;
  border-radius: 20px;
  background: #e8f5f5;
  color: #2b5656;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  flex-shrink: 0;
}

/* Risks */
.cpep__risk-row {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  gap: 6px;
  background: #fff;
  border: 1px solid #f3f4f5;
  border-radius: 8px;
  padding: 8px 12px;
}

.cpep__risk-tags {
  display: flex;
  gap: 4px;
  align-items: center;
  grid-column: 1;
}

.cpep__risk-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  grid-column: 2;
  grid-row: 1;
}

.cpep__risk-label {
  font-family: Inter, sans-serif;
  font-size: 16px;
  color: #2b5656;
  grid-column: 1 / -1;
}

.cpep__risk-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  border-radius: 4px;
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: #36393f;
}

.cpep__risk-tag--pink { background: #f7e7ea; }
.cpep__risk-tag--lavender { background: #e5ddf3; }

/* Chips / multiselect */
.cpep__chips-wrap {
  display: flex;
  align-items: center;
  border: 1px solid #f3f4f5;
  border-radius: 8px;
  padding: 8px 10px 8px 12px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(18,18,23,0.05);
  min-height: 48px;
}

.cpep__chips {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.cpep__chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px;
  border-radius: 16px;
  background: #f3f4f5;
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #2b5656;
}

.cpep__chips-chevron { flex-shrink: 0; }

/* Date inputs */
.cpep__date-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdde2;
  border-radius: 8px;
  padding: 10px 12px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(18,18,23,0.05);
}

.cpep__date-value {
  font-family: Inter, sans-serif;
  font-size: 18px;
  color: #36393f;
}

.cpep__date-icon { flex-shrink: 0; }

/* Toggle switch */
.cpep__toggle-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.cpep__toggle-text { flex: 1; }

.cpep__toggle-label {
  font-family: Inter, sans-serif;
  font-size: 16px;
  color: #36393f;
  margin: 0 0 4px;
}

.cpep__toggle-hint {
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: #36393f;
  margin: 0;
  line-height: 1.4;
}

.cpep__toggle {
  width: 35px;
  height: 21px;
  border-radius: 28px;
  border: none;
  background: #cfd2d8;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 3px;
  flex-shrink: 0;
  transition: background 0.15s;
}

.cpep__toggle--on {
  background: #3e7e7e;
  justify-content: flex-end;
}

.cpep__toggle-handle {
  width: 14px;
  height: 14px;
  border-radius: 8px;
  background: #fff;
  display: block;
}

/* Timeline */
.cpep__timeline-heading {
  font-family: 'FS Me', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #172b34;
  margin: 0;
}

.cpep__timeline-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cpep__timeline-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 1px solid #f3f4f5;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
}

.cpep__radio {
  width: 14px;
  height: 14px;
  border: 1px solid #cfd2d8;
  border-radius: 50%;
  appearance: none;
  flex-shrink: 0;
  cursor: pointer;
}

.cpep__radio:checked {
  border-color: #2b5656;
  background: #2b5656;
  box-shadow: inset 0 0 0 3px #fff;
}

.cpep__timeline-label {
  flex: 1;
  font-family: Inter, sans-serif;
  font-size: 16px;
  color: #36393f;
  line-height: 21.4px;
}

.cpep__timeline-icon {
  width: 44px;
  height: 44px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cpep__timeline-icon--grey { background: #cfd2d8; }

/* Footer */
.cpep__footer {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--pulse-color-neutral-40);
  flex-shrink: 0;
}
</style>
