// 'use client'

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog'

// interface ModalProps {
//   title: string
//   description: string
//   isOpen: boolean
//   onClose: () => void
//   children?: React.ReactNode
// }

// export const Modal: React.FC<ModalProps> = ({
//   title,
//   description,
//   isOpen,
//   onClose,
//   children,
// }) => {
//   const onChange = (open: boolean) => {
//     if (!open) {
//       onClose()
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//           <DialogDescription>{description}</DialogDescription>
//         </DialogHeader>
//         <div>{children}</div>
//       </DialogContent>
//     </Dialog>
//   )
// }

'use client'

import {Fragment} from 'react'
import {X} from 'lucide-react'
import {Dialog, Transition} from '@headlessui/react'

interface ModalProps {
  title?: string
  description?: string
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({
  title,
  description,
  open,
  onClose,
  children,
}: ModalProps) => {
  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-100" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-xl overflow-hidden rounded-lg text-left align-middle">
                <div className="relative flex flex-col w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <div className="absolute right-4 top-4">
                    <button className="text-neutral-700 hover:opacity-70 transition">
                      <X size={24} onClick={onClose} />
                    </button>
                  </div>
                  <div className="mr-auto">
                    {title && <h3 className="font-semibold">{title}</h3>}
                    {description && <p>{description}</p>}
                  </div>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
