import axios from 'axios'
import { BASE_AUTH_URL, BASE_MAIN_API_URL } from '../utils/config'
import { z } from 'zod'

export const errorResponseSchema = z
  .object({
    code: z.number(),
    message: z.string(),
  })
  .transform((data) => {
    // Transform any error response into a standard Error object here
    // Example:
    // if (data.message === 'already request cancel') {
    //   throw new Error('Please wait for the refund to complete')
    // }
    throw new Error(data.message)
  })

export const createAuthApi = () => {
  return axios.create({
    baseURL: BASE_AUTH_URL,
  })
}

export const createAuthenticatedApi = (access_token: string) => {
  return axios.create({
    baseURL: BASE_MAIN_API_URL,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
