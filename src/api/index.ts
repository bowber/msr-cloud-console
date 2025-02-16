import axios from 'axios'
import { BASE_AUTH_URL } from '../utils/config'
import { z } from 'zod'

export const errorResponseSchema = z
  .object({
    code: z.number(),
    message: z.string(),
  })
  .transform((data) => {
    if (data.message === 'already request cancel') {
      throw new Error('Please wait for the refund to complete')
    }
    if (data.code === 557) {
      throw new Error('Insufficient $COCOMON balance')
    }
    throw new Error(data.message)
  })

export const createAuthApi = () => {
  return axios.create({
    baseURL: BASE_AUTH_URL,
  })
}
