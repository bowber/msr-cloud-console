import { createContext, createEffect, createSignal, onCleanup, ParentComponent, useContext } from "solid-js";
import { exchangeRefreshToken, refreshAccessToken, startSignInWithGoogle } from "../api/auth";
import dayjs from "dayjs";
import { getJwtExp } from "../utils/jwt";
import toast from "solid-toast";

interface AuthContextData {
  isAuthenticated: () => boolean
  signInWithGoogle: () => void
  logout: () => void
  getAccessToken: () => Promise<{ access_token: string }>
}

const AuthContext = createContext<AuthContextData | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error(
      'useAuth must be used within a AuthProvider'
    )
  return context
}

export const AuthProvider: ParentComponent = (props) => {
  const [crsfToken, setCrsfToken] = createSignal<string>()
  const [refreshToken, setRefreshToken] = createSignal<string>()
  const [accessToken, setAccessToken] = createSignal<string>()

  const isAuthenticated = () => {
    return refreshToken() !== undefined
  }

  // Get the access token if it not expired, otherwise get a new one
  const getAccessToken = async () => {
    const accessTokenValue = accessToken()
    const refreshTokenValue = refreshToken()
    // Check if the refresh token is undefined
    if (refreshTokenValue === undefined) throw new Error('Please login')
    // Refresh the access token if it is undefined
    if (accessTokenValue === undefined) return refreshAccessToken(refreshTokenValue)
    // Refresh the access token if it is expired
    const exp = getJwtExp(accessTokenValue)
    if (exp === undefined) return refreshAccessToken(refreshTokenValue)
    // Refresh the access token if it is expired
    const duration = exp.diff(dayjs(), 'millisecond')
    if (duration < 0) return refreshAccessToken(refreshTokenValue)
    // Else return the access token
    return {
      access_token: accessTokenValue,
    }
  }
  // Create a timeout to remove the refresh token after it expires
  createEffect<number | undefined>((lastTimeout) => {
    clearTimeout(lastTimeout)
    const token = refreshToken()
    if (token === undefined) return
    const exp = getJwtExp(token)
    if (exp === undefined) return
    const duration = exp.diff(dayjs(), 'millisecond')
    // Only set the timeout if the token is not expired
    const rmTokenTimeout = setTimeout(() => {
      setRefreshToken(undefined)
      setAccessToken(undefined)
    }, duration)
    return rmTokenTimeout
  })


  const exchangeRefreshTokenInterval = setInterval(() => {
    const token = crsfToken()
    if (token) {
      toast.loading('Waiting for login in another Tab', { id: 'login-loading' })
      exchangeRefreshToken(token).then((res) => {
        setRefreshToken(res.refresh_token)
        setAccessToken(res.access_token)
        toast.dismiss('login-loading')
        toast.success('Login success')
        console.log('Refreshed Token')
        setCrsfToken()
      })
        .catch(() => {
          toast.loading('Waiting for login in another Tab', { id: 'login-loading' })
        })
    }
  }, 3000)

  onCleanup(() => {
    clearInterval(exchangeRefreshTokenInterval)
  })

  const signInWithGoogle = () => {
    startSignInWithGoogle().then(async (res) => {
      console.log(res)
      setCrsfToken(res.csrf_token)
      toast('Redirecting to Google login', { duration: 2000 })
      await new Promise((resolve) => setTimeout(resolve, 500))
      window.open(res.auth_url, 'newwindow',
        'width=300,height=250')
    })
  }
  const logout = () => {
    setRefreshToken(undefined)
    setCrsfToken()
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signInWithGoogle,
        logout,
        getAccessToken
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}