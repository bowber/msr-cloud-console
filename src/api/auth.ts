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
        })
        .or(errorResponseSchema)
        .parse(res.data)
    })
}

export const startSignInWithGoogle = async () => {
  return createAuthApi()
    .get('auth/google/login')
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
