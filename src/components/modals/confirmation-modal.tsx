interface ConfirmationModalProps {
  title: string
  description: string
  onConfirm: () => void
  onCancel?: () => void
}
export const ConfirmationModal = ({ title, description, onConfirm, onCancel }: ConfirmationModalProps) => {
  return (
    <div class="w-full h-full flex flex-col text-primary-900 items-center justify-center bg-primary-200 fixed top-0 left-0 z-50">
      <div class="w-1/2 bg-white py-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <h1 class="text-2xl font-bold mb-4">{title}</h1>
        <p>{description}</p>
        <div class="flex gap-4 mt-4">
          <button
            class="bg-primary-500 text-white rounded-lg p-2 w-1/2"
            onClick={onConfirm}>
            Confirm
          </button>
          <button
            class="bg-red-500 text-white rounded-lg p-2 w-1/2"
            onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}