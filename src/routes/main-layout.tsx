import clsx from 'clsx'
import { createEffect, ParentComponent, Show } from 'solid-js'
import { Toaster } from 'solid-toast'
import { Sidebar } from '../components/sidebar'
import { TitleBar } from '../components/title-bar'
import { useLocation } from '@solidjs/router'
import { useAuth } from '../contexts/auth'
import { LoginModal } from '../components/modals/login-modal'
import { useUIController } from '../contexts/ui-controller'
import { ConfirmationModal } from '../components/modals/confirmation-modal'

export const MainLayout: ParentComponent = (props) => {
  const location = useLocation()
  const auth = useAuth()
  const ui = useUIController()
  createEffect(() => {
    console.debug('Current location: ', location)
  })
  return (
    <div class={clsx('w-full h-svh overflow-hidden bg-primary-100')}>
      <TitleBar />
      <div class="relative h-[fill-available] flex">
        <Sidebar />
        {props.children}
        {/* Drawers */}
      </div>
      <Toaster containerClassName="mt-7" position="top-center" />
      {/* Modals */}
      <Show when={auth.isAuthenticated() === false}>
        <LoginModal />
      </Show>
      <Show when={ui.confirmModalData()}>
        {(data) => <ConfirmationModal
          title={data().title}
          description={data().message}
          onConfirm={data().onConfirm}>
        </ConfirmationModal>}
      </Show>
    </div>
  )
}
