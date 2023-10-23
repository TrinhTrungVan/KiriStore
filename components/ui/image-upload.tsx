import {useEffect, useState} from 'react'

import {cn} from '@/lib/utils'
import {ImagePlus, X} from 'lucide-react'
import {CldUploadWidget} from 'next-cloudinary'
import Image from 'next/image'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  values: string[]
}

const ImageUpload = ({
  values,
  onChange,
  onRemove,
  disabled,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (!isMounted) return null

  return (
    <div
      className={cn(
        'grid mb-4 gap-2 rounded-md h-[160px] border-dashed border-neutral-400 overflow-hidden [&>*:first-child]:col-start-1 [&>*:first-child]:col-end-3 [&>*:first-child]:row-start-1 [&>*:first-child]:row-end-3',
        values.length > 0 &&
          'grid-cols-4 grid-rows-2 border-solid p-2 h-[260px] border',
      )}>
      {values.length > 0 &&
        values.map(url => (
          <div
            key={url}
            className="relative w-full h-full rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2 bg-rose-500 rounded-sm cursor-pointer hover:opacity-80 transition">
              <X className="w-5 h-5 text-white" onClick={() => onRemove(url)} />
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      <CldUploadWidget onUpload={onUpload} uploadPreset="ecommerce">
        {({open}) => {
          if (values.length >= 5) return <></>
          return (
            <button
              className="flex flex-col items-center justify-center border-dashed border border-neutral-400 rounded-md hover:opacity-70 transition"
              type="button"
              disabled={disabled}
              onClick={() => open()}>
              <ImagePlus className="h-5 w-5" />
              <p className="font-medium text-xs">Upload</p>
            </button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
