import { AuthProvider } from './contexts/auth'
import { SharedDataProvider } from './contexts/shared-data'
import { UIControllerProvider } from './contexts/ui-controller'
import { AppRouter } from './routes'

function App() {
  return (
    <UIControllerProvider>
      <AuthProvider>
        <SharedDataProvider>
          <AppRouter />
        </SharedDataProvider>
      </AuthProvider>
    </UIControllerProvider>
  )
}

export default App
