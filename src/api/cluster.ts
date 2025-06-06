import { z } from 'zod'
import { createAuthenticatedApi, errorResponseSchema } from '.'

export type ClusterInfo = z.infer<typeof clusterInfoSchema>
const clusterInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  region: z.string(),
  status: z.union([z.literal('active'), z.literal('inactive')]),
})

export const getClusters = (access_token: string) => {
  return createAuthenticatedApi(access_token)
    .get('/clusters')
    .then((res) => {
      return z.array(clusterInfoSchema).or(errorResponseSchema).parse(res.data)
    })
}
