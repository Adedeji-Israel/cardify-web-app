import { z } from 'zod'

const email = z.string().trim().min(1, 'Email is required').pipe(z.email('Enter a valid email address'))

const password = z
  .string()
  .min(8, 'Use at least 8 characters')
  .regex(/[A-Z]/, 'Include an uppercase letter')
  .regex(/[0-9]/, 'Include a number')

export const signInSchema = z.object({
  identifier: z.string().trim().min(1, 'Enter your email or username'),
  password: z.string().min(1, 'Enter your password'),
  remember: z.boolean().optional(),
})
export type SignInValues = z.infer<typeof signInSchema>

// Create-account is a 4-step flow; each step has its own schema so it can be validated on its own.
export const signUpStep1 = z.object({ email })
export const signUpStep2 = z.object({
  firstName: z.string().trim().min(2, 'First name is required'),
  lastName: z.string().trim().min(2, 'Last name is required'),
})
export const signUpStep3 = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, 'At least 3 characters')
      .max(20, 'At most 20 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Letters, numbers and underscores only'),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s-]{10,15}$/, 'Enter a valid phone number'),
    password,
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })
export const signUpStep4 = z.object({
  referral: z.string().trim().max(20).optional(),
  heardFrom: z.string().min(1, 'Please choose one'),
  terms: z.literal(true, { error: 'You need to accept the terms to continue' }),
})

// Full-form shape, used for typing the form values.
export const signUpSchema = z.object({
  ...signUpStep1.shape,
  ...signUpStep2.shape,
  username: z.string(),
  phone: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  referral: z.string().optional(),
  heardFrom: z.string(),
  terms: z.boolean(),
})
export type SignUpValues = z.infer<typeof signUpSchema>

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Tell us your name'),
  email,
  topic: z.string().min(1, 'Choose a topic'),
  message: z.string().trim().min(10, 'Please write at least 10 characters').max(1000, 'Keep it under 1000 characters'),
})
export type ContactValues = z.infer<typeof contactSchema>
