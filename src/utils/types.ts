export type EmailType = {
  to: string
  subject: string
  text?: string
  html: string
  templateId?: string
  dynamicTemplateData?: Record<string, unknown>
  sendAt?: number
}

export type Authenticated = {
  id: string
  email: string
  type: 'user' | 'admin'
}

export type JWTPayloadType = {
  jti: string
  aud?: string | null
  secret?: string
  expiresIn?: string
}

export type IPaginationArgs = {
  skip: number
  perPage: number
}
