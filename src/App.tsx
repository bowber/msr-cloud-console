import { AuthProvider } from './contexts/auth'
import { UIControllerProvider } from './contexts/ui-controller'
import { AppRouter } from './routes'

function App() {
  return (
    <UIControllerProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </UIControllerProvider>
  )
}

export default App
