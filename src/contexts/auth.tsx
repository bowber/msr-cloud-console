import { createContext, createSignal, onCleanup, ParentComponent, useContext } from "solid-js";
import { exchangeRefreshToken, startSignInWithGoogle } from "../api/auth";
import { redirect } from "@solidjs/router";

interface AuthContextData {
  isAuthenticated: () => boolean
  signInWithGoogle: () => void
  logout: () => void
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
  const isAuthenticated = () => {
    return false
  }

  const getRefreshTokenInterval = setInterval(() => {
    const token = crsfToken()
    if (token) {
      exchangeRefreshToken(token).then((res) => {
        console.log(res)
      }).then(() => {
        console.log('Refreshed Token')
        setCrsfToken()
      })
    }
  })

  onCleanup(() => {
    clearInterval(getRefreshTokenInterval)
  })

  const signInWithGoogle = () => {
    startSignInWithGoogle().then((res) => {
      setCrsfToken(res.csrf_token)
      redirect(res.auth_url)
    })
  }
  const logout = () => {
    setCrsfToken()
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signInWithGoogle,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}