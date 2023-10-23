import React from 'react'
import {redirect} from 'next/navigation'

import Navbar from '@/components/admin/navbar'
import {currentUser} from '@/lib/current-user'
import {redirectToSignIn} from '@clerk/nextjs'

const AdminLayout = async ({children}: {children: React.ReactNode}) => {
  const user = await currentUser()

  if (!user) {
    redirectToSignIn()
  }

  if (!user?.isAdmin) {
    redirect('/')
  }

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-10 hidden h-full w-[240px] flex-col md:flex ">
        <Navbar />
      </div>
      <main className="h-full md:pl-[240px]">{children}</main>
    </div>
  )
}

export default AdminLayout
