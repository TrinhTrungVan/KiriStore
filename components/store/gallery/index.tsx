'use client'

import {Tab} from '@headlessui/react'
import GalleryTab from './gallery-tab'
import Image from 'next/image'

interface GalleryProps {
  images: string[]
}

const Gallery = ({images}: GalleryProps) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <Tab.List className="grid grid-cols-5 gap-4 mt-4">
        {images.map(image => (
          <GalleryTab key={image} image={image} />
        ))}
      </Tab.List>
      <Tab.Panels className="aspect-square w-full">
        {images.map(image => (
          <Tab.Panel key={image}>
            <div className="aspect-square relative h-full w-full rounded-lg overflow-hidden">
              <Image
                fill
                src={image}
                alt="Image"
                className="object-cover object-center"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Gallery
