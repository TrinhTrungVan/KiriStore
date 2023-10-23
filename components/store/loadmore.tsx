'use client'

import React, {useState} from 'react'
import ProductCard from './product/product-card'
import {SafeProduct} from '@/types'
import axios from 'axios'
import {Button} from '../ui/button'

const Loadmore = () => {
  const [items, setItems] = useState<SafeProduct[]>([])
  const [page, setPages] = useState(1)
  const [hasLoadmore, setHasLoadmore] = useState(true)

  const handleClick = async () => {
    const res = await axios.get(`/api/products/?page=${page}`)

    if (res.data.length === 0) {
      setHasLoadmore(false)
      return
    }

    setItems([...items, ...res.data])
    console.log(res.data)
    setPages(value => value + 1)
  }

  return (
    <>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map(item => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
      {hasLoadmore && (
        <div className="w-15 mx-auto mt-4">
          <Button onClick={handleClick} variant="default">
            Loadmore
          </Button>
        </div>
      )}
    </>
  )
}

export default Loadmore
