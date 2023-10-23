'use client'

import React from 'react'
import {Button} from '../ui/button'
import {Search} from 'lucide-react'
import {useSearchModal} from '@/hooks/use-search-modal'

const MobileFilters = () => {
  const searchModal = useSearchModal()

  return (
    <div className="flex md:hidden lg:hidden flex-row items-center ml-auto">
      <Button className="rounded-full" onClick={searchModal.onOpen}>
        <p className="font-semibold mr-2">Search</p>
        <Search />
      </Button>
    </div>
  )
}

export default MobileFilters
