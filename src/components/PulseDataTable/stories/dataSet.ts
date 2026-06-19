import { faker } from '@faker-js/faker'

import { pulseColours } from '@/types'
import type { PulseColour } from '@/types'

export type DataSetItem = {
  id: number
  name: string
  age: number
  gender: string
  admissionDate: string
  allergies: {
    id: number
    name: string
    colour: PulseColour
  }[]
}

faker.seed(1)

const allergyNames = ['Nuts', 'Latex', 'Penicillin', 'Pollen', 'Dust', 'Shellfish', 'Gluten', 'Soy']
const genders = ['Male', 'Female', 'Non-binary']

let allergyCounter = 1

function generateAllergies(): DataSetItem['allergies'] {
  const count = faker.helpers.weightedArrayElement([
    { value: 0, weight: 5 },
    { value: 1, weight: 3 },
    { value: 2, weight: 2 },
  ])

  return Array.from({ length: count }, () => ({
    id: allergyCounter++,
    name: faker.helpers.arrayElement(allergyNames),
    colour: faker.helpers.arrayElement(pulseColours),
  }))
}

const currentYearStart = new Date(new Date().getFullYear(), 0, 1)
const currentYearEnd = new Date(new Date().getFullYear(), 11, 31)

export const largeDataSet: DataSetItem[] = Array.from({ length: 57 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  age: faker.number.int({ min: 18, max: 65 }),
  gender: faker.helpers.arrayElement(genders),
  admissionDate: faker.date.between({ from: currentYearStart, to: currentYearEnd }).toISOString(),
  allergies: generateAllergies(),
}))

export const smallDataSet = largeDataSet.slice(0, 10)
