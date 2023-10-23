import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ClerkProvider} from '@clerk/nextjs'

import './globals.css'
import ToastProvider from '@/components/providers/toast-provider'
import ModalProvider from '@/components/providers/modal-provider'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'KiriStore',
  description: 'KiriStore',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
