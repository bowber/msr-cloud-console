import clsx from 'clsx'
import { createEffect, ParentComponent } from 'solid-js'
import { Toaster } from 'solid-toast'
import { Sidebar } from '../components/sidebar'
import { TitleBar } from '../components/title-bar'
import { useLocation } from '@solidjs/router'

export const MainLayout: ParentComponent = (props) => {
  const location = useLocation()
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
    </div>
  )
}
