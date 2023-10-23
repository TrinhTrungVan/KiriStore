import React from 'react'
import {redirect} from 'next/navigation'
import {Urbanist} from 'next/font/google'

import Footer from '@/components/store/footer'
import Navbar from '@/components/store/navbar'
import {currentUser} from '@/lib/current-user'

const font = Urbanist({subsets: ['latin']})

const SetupLayout = async ({children}: {children: React.ReactNode}) => {
  const user = await currentUser()

  if (user?.isAdmin) {
    redirect('/admin')
  }

  return (
    <div className={font.className}>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default SetupLayout
