import {UserButton, auth} from '@clerk/nextjs'
import Link from 'next/link'
import {redirect} from 'next/navigation'

import MainNav from './main-nav'
import {currentUser} from '@/lib/current-user'
import Image from 'next/image'

const Navbar = async () => {
  const {userId} = auth()
  const user = await currentUser()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="flex h-full w-full flex-col justify-between border-b p-4 bg-[#DADADA]">
      <div className="space-y-4">
        <Link href="/admin" className="flex flex-row items-center">
          <Image
            alt="Logo"
            width="68"
            height="32"
            src="/images/logo.svg"
            priority={true}
          />
          <h3 className="font-bold text-xl bg-gradient-to-r from-[#00BFFF] to-[#5459FF] bg-clip-text text-transparent">
            KiriStore
          </h3>
        </Link>
        <MainNav />
      </div>
      <div className="flex flex-row items-center">
        <UserButton afterSignOutUrl="/" />
        <h3 className="font-medium ml-4">{user?.name}</h3>
      </div>
    </div>
  )
}

export default Navbar
