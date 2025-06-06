import { useAuth } from "../../contexts/auth"
import { Button } from "../share/button"
import { Input, PasswordInput } from "../share/input"

export const LoginModal = () => {
  const auth = useAuth()
  return (
    <div class="w-full h-full flex flex-col text-primary-900 items-center justify-center bg-primary-200 fixed top-0 left-0 z-50">
      <div class="w-96 px-8 bg-white py-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <h1 class="text-2xl font-bold mb-8">Welcome!</h1>
        <Input
          type="text"
          placeholder="Email"
          disabled
        />
        <PasswordInput
          placeholder="Password"
          disabled
          class="my-2"
        />
        <Button
          disabled
          class="mt-4 w-full"
        >
          Sign in / Sign up
        </Button>
        {/* --------------------------- */}
        <p class="mt-4 font-bold"> Or</p>
        {/* --------------------------- */}
        <Button
          class="w-full mt-4"
          variant="secondary"
          onClick={auth.signInWithGoogle}
        >
          <img
            src="/icons/google.svg"
            alt="Google Logo"
            class="inline-block mr-2 w-6 h-6"
          />
          Sign in with Google
        </Button>
        {/* --------------------------- */}
        <div class="flex items-center mt-4">
          <Input
            type="checkbox"
            id="remember-me"
            checked={auth.rememberMe()}
            onChange={() => auth.setRememberMe(!auth.rememberMe())}
            class="mr-2"
          />
          <label for="remember-me">Remember this browser for 30 days</label>
        </div>
      </div>
    </div>
  )
}

const PleaseWait = () => {
  return (
    <div class="w-full h-full flex flex-col text-primary-900 items-center justify-center bg-primary-200 fixed top-0 left-0 z-50">
      <div class="w-1/2 bg-white py-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <h1 class="text-2xl font-bold mb-4">Please wait...</h1>
        <p>Loading...</p>
      </div>
    </div>
  )
}