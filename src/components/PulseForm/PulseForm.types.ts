import type { ZodObject, ZodRawShape } from 'zod'

export type PulseFormProps = {
  schema: ZodObject<ZodRawShape>
  initialValues?: Record<string, unknown>
  errorMessageTitle?: string
  errorMessageSubtitle?: string
}
