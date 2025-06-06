import { useAuth } from "../contexts/auth"

export const TitleBar = () => {
  const auth = useAuth()
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
        <span class="text-xl font-bold">MSR Cloud</span>
      </a>
      <a
        class="h-full ml-7 mr-auto pl-2 flex gap-1 justify-center items-center"
        href="/"
      >
        <span class="text-sm">{auth.user()?.name ?? auth.user()?.email ?? " "}</span>
        <span class="font-bold"></span>
      </a>
    </div >
  )
}
