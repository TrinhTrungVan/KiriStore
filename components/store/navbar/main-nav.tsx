'use client'

import {Button} from '@/components/ui/button'
import {Search} from 'lucide-react'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useState} from 'react'
import qs from 'query-string'
import MobileFilters from '../mobile-filters'

const MainNav = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [searchValue, setSearchValue] = useState('')
  const handleChange = (e: any) => {
    setSearchValue(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const currentFilter = qs.parse(searchParams.toString())

    const query = {
      ...currentFilter,
      name: searchValue,
    }

    const url = qs.stringifyUrl(
      {
        url: `${window.location.href}/search`,
        query,
      },
      {skipNull: true},
    )

    router.push(url)
  }

  if (pathname == '/' || pathname === '/search') {
    return (
      <nav className="flex w-full max-w-[500px] space-x-4 mx-4 md:ml-[60px]">
        <MobileFilters />
        <form
          className="hidden md:flex lg:flex w-full items-center"
          onSubmit={handleSubmit}>
          <div className="flex flex-1 flex-row items-center justify-between overflow-hidden rounded-full p-1 transition border border-neutral-300 hover:border-neutral-500 focus-within:border-neutral-500">
            <input
              className="w-full border-none outline-none px-4 py-2 font-medium"
              type="text"
              placeholder="Enter the name..."
              value={searchValue}
              onChange={handleChange}
            />
            <Button size="icon" className="rounded-full shrink-0">
              <Search size={20} />
            </Button>
          </div>
          <button type="submit"></button>
        </form>
      </nav>
    )
  }

  return null
}

export default MainNav
