'use client'

import qs from 'query-string'
import {Button} from '../ui/button'
import {useRouter, useSearchParams} from 'next/navigation'
import {cn} from '@/lib/utils'

const sortBtns = [
  {
    label: 'Latest',
    value: 'createdAtDesc',
  },
  {
    label: 'Oldest',
    value: 'createdAtAsc',
  },
  {
    label: 'Price: Low to High',
    value: 'priceAsc',
  },
  {
    label: 'Price: High to Low',
    value: 'priceDesc',
  },
]

const Sort = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedValue = searchParams.get('sortBy')

  const handleClick = (sortValue: string) => {
    const currentFilter = qs.parse(searchParams.toString())

    const query: any = {
      ...currentFilter,
      sortBy: sortValue,
    }

    if (currentFilter.sortBy === sortValue) {
      query.sortBy = null
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {skipNull: true},
    )

    router.push(url)
  }

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold">Sort by</h3>
      <hr className="mt-2 mb-4" />
      <div className="flex flex-wrap gap-2">
        {sortBtns.map(item => (
          <div key={item.value} className="flex items-center">
            <Button
              className={cn(
                'rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300 hover:text-white',
                selectedValue === item.value && 'bg-black text-white',
              )}
              onClick={() => handleClick(item.value)}>
              {item.label}
            </Button>
          </div>
        ))}
      </div>
      <button
        onClick={() => router.push('/search')}
        className="flex w-full items-center justify-center mt-8 px-6 py-3 font-medium text-white bg-black rounded-3xl hover:opacity-80 transition">
        Clear all filters
      </button>
    </div>
  )
}

export default Sort
