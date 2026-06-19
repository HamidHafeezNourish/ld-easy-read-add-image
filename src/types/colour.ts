export const pulseColours = [
  'primary',
  'pink-clay',
  'lapis',
  'lavender',
  'olive',
  'mulberry',
  'ice',
  'jade',
  'cont-improv',
] as const

export const pulseStatusColours = [
  'urgency',
  'error',
  'attention',
  'info',
  'general',
  'success',
  'neutral',
  'cont-improv',
] as const

export type PulseColour = (typeof pulseColours)[number]
export type PulseStatusColour = (typeof pulseStatusColours)[number]

export type PulseStatus = Exclude<PulseStatusColour, 'neutral'> | 'greyed'

export function isPulseStatusColour(value: string): value is PulseStatusColour {
  return (pulseStatusColours as readonly string[]).includes(value)
}

export function getMainColourVar(colour: PulseColour | PulseStatusColour) {
  let colourNumber
  if (isPulseStatusColour(colour)) {
    colourNumber = colour === 'neutral' ? '100' : '70'
  } else {
    colourNumber = '6'
  }
  return `var(--pulse-color-${colour}-${colourNumber})`
}
