import { useAuth } from "../../contexts/auth"
import { Button } from "../share/button"
import { Input } from "../share/input"

export const LoginModal = () => {
  const auth = useAuth()
  return (
    <div class="w-full h-full flex flex-col text-primary-900 items-center justify-center bg-primary-200 fixed top-0 left-0 z-50">
      <div class="w-96 bg-white py-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold mb-4">Welcome!</h1>
        <Input
          type="text"
          placeholder="Username"
          disabled
          class="border border-gray-300 rounded-lg p-2 mb-4 w-3/4"
        />
        <Input
          type="password"
          placeholder="Password"
          disabled
          class="border border-gray-300 rounded-lg p-2 mb-4 w-3/4"
        />
        <Button
          class="bg-primary-500 text-white rounded-lg p-2 w-3/4"
          disabled
        >
          Sign in / Sign up
        </Button>

        <p class="mt-4 font-bold"> Or</p>
        <Button
          class="py-3 w-3/4 mt-4"
          variant="secondary"
          onClick={auth.signInWithGoogle}
        >
          <img
            src="/icons/google.svg"
            alt="Google Logo"
            class="inline-block mr-2 w-8 h-8"
          />
          Sign in with Google
        </Button>
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