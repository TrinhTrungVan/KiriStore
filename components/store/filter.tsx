'use client'

import qs from 'query-string'
import {Category, Color, Size} from '@prisma/client'
import {Button} from '../ui/button'
import {useRouter, useSearchParams} from 'next/navigation'
import {cn} from '@/lib/utils'

interface FilterProps {
  data: (Category | Size | Color)[]
  name: string
  valueKey: string
}

const Filter = ({data, name, valueKey}: FilterProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedValue = searchParams.get(valueKey)

  const handleClick = (id: string) => {
    const currentFilter = qs.parse(searchParams.toString())

    const query = {
      ...currentFilter,
      [valueKey]: id,
    }

    if (currentFilter[valueKey] === id) {
      query[valueKey] = null
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
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="mt-2 mb-4" />
      <div className="flex flex-wrap gap-2">
        {data.map(filter => (
          <div key={filter.id} className="flex items-center">
            <Button
              className={cn(
                'rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300 hover:text-white',
                selectedValue === filter.id && 'bg-black text-white',
              )}
              onClick={() => handleClick(filter.id)}>
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter
