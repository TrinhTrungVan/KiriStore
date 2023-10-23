'use client'

import {Modal} from '@/components/ui/modal'
import {useSearchModal} from '@/hooks/use-search-modal'
import {Search} from 'lucide-react'
import {useRouter, useSearchParams} from 'next/navigation'
import qs from 'query-string'
import {useEffect, useState} from 'react'
import {Button} from '../ui/button'
import Filter from '../store/filter'
import Sort from '../store/sort'
import axios from 'axios'

const SearchModal = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchModal = useSearchModal()

  const [searchValue, setSearchValue] = useState('')
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])

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
    searchModal.onClose()
  }

  useEffect(() => {
    ;(async () => {
      const res = await axios.get('/api/categories')
      setCategories(res.data)
    })()
    ;(async () => {
      const res = await axios.get('/api/sizes')
      setSizes(res.data)
    })()
    ;(async () => {
      const res = await axios.get('/api/colors')
      setColors(res.data)
    })()
  }, [])

  return (
    <Modal open={searchModal.isOpen} onClose={searchModal.onClose}>
      <div className="flex w-full flex-row items-center justify-between overflow-hidden rounded-full p-1 mb-4 transition border border-neutral-300 hover:border-neutral-500 focus-within:border-neutral-500">
        <input
          className="w-full border-none outline-none px-4 py-2 font-medium"
          type="text"
          placeholder="Enter the name..."
          value={searchValue}
          onChange={handleChange}
        />
        <Button
          onClick={handleSubmit}
          size="icon"
          className="rounded-full shrink-0">
          <Search size={20} />
        </Button>
      </div>
      <div>
        <Filter valueKey="categoryId" name="Categories" data={categories} />
        <Filter valueKey="colorId" name="Colors" data={colors} />
        <Filter valueKey="sizeId" name="Sizes" data={sizes} />
        <Sort />
      </div>
    </Modal>
  )
}

export default SearchModal
