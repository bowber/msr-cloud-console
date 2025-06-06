import { z } from 'zod'
import { createAuthApi, errorResponseSchema } from '.'

export const exchangeRefreshToken = (csrf_token: string) => {
  return createAuthApi()
    .get('/auth/retrieve-token', {
      params: {
        state: csrf_token,
      },
    })
    .then((res) => {
      return z
        .object({
          refresh_token: z.string(),
          access_token: z.string(),
        })
        .or(errorResponseSchema)
        .parse(res.data)
    })
}

export const refreshAccessToken = (refresh_token: string) => {
  return createAuthApi()
    .post('/auth/refresh-token', {
      refresh_token,
    })
    .then((res) => {
      return z
        .object({
          access_token: z.string(),
        })
        .or(errorResponseSchema)
        .parse(res.data)
    })
}

export const startSignInWithGoogle = async (params: {
  rememberMe: boolean
}) => {
  return createAuthApi()
    .get('auth/google/login', {
      params,
    })
    .then((res) => {
      return z
        .object({
          auth_url: z.string(),
          csrf_token: z.string(),
        })
        .or(errorResponseSchema)
        .parse(res.data)
    })
}
