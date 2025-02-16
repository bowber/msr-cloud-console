import { z } from 'zod'

export const BASE_AUTH_URL = z
  .string()
  .parse(import.meta.env.VITE_BASE_AUTH_URL)
