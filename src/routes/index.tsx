import { Router } from '@solidjs/router'
import { MainLayout } from './main-layout'
import { ServicesPage } from './services-page'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: () => 'HEllo',
      },
      {
        path: 'services',
        component: ServicesPage,
      },
      {
        path: '*',
        component: () => (
          <h1 class="p-4">
            <div onClick={() => window.history.back()}>404 Go back</div>
          </h1>
        ),
      },
    ],
  },
]

export const AppRouter = () => {
  return <Router>{routes}</Router>
}
