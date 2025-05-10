import { BaseButton } from './share/base-button'
import toast from 'solid-toast'

export const TitleBar = () => {
  return (
    <div
      data-tauri-drag-region
      class="w-full h-10 flex justify-end bg-primary-500"
    >
      <a class="h-full aspect-square pl-2" href="/">
        <img src="/logo.svg" alt="logo" class="h-full" />
      </a>
      <a
        class="h-full ml-7 pl-2 flex gap-1 justify-center items-center"
        href="/"
      >
        <span class="text-xl font-bold">Cluster 001</span>
      </a>
      <a
        class="h-full ml-7 mr-auto pl-2 flex gap-1 justify-center items-center"
        href="/"
      >
        <span class="text-sm">Cluster IP:</span>
        <span class="font-bold">192.168.1.1</span>
      </a>
      <BaseButton
        onClick={() => toast('Coming soon 🚧')}
        class="h-[90%] my-auto rounded-full border-2 border-black flex justify-center items-center aspect-square mr-12"
      >
        •ᴗ•
      </BaseButton>
    </div>
  )
}
