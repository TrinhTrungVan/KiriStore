'use client'

import {useEffect, useState} from 'react'
import PreviewModal from '../modals/preview-modal'
import SearchModal from '../modals/search-modal'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  return (
    <>
      <PreviewModal />
      <SearchModal />
    </>
  )
}

export default ModalProvider
