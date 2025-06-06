import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'

export const getJwtExp = (token: string) => {
  if (token === undefined) return
  const decodedToken = jwtDecode(token)
  if (decodedToken?.exp === undefined) return
  return dayjs.unix(decodedToken.exp)
}

export const getJwtClaims = (token: string) => {
  if (token === undefined) return
  const decodedToken = jwtDecode(token)
  if (decodedToken === undefined) return
  return decodedToken
}
