import React from 'react'
import {Tab} from '@headlessui/react'
import Image from 'next/image'
import {cn} from '@/lib/utils'

interface GalleryTabProps {
  image: string
}

const GalleryTab = ({image}: GalleryTabProps) => {
  return (
    <Tab className="relative flex justify-center items-center aspect-square cursor-pointer">
      {({selected}) => (
        <div>
          <span className="absolute w-full h-full aspect-square inset-0 overflow-hidden rounded-md">
            <Image
              fill
              src={image}
              alt=""
              className="object-cover object-center"
            />
          </span>
          <span
            className={cn(
              'absolute inset-0 rounded-md ring-2 ring-offset-2',
              selected ? 'ring-black' : 'ring-transparent',
            )}
          />
        </div>
      )}
    </Tab>
  )
}

export default GalleryTab
