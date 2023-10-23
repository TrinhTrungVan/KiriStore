'use client'

import Container from '@/components/store/container'
import {Skeleton} from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <Container>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8 md:grid md:grid-cols-5 md:gap-x-8 items-start mt-8">
          <div className="col-start-1 col-end-3 mb-4">
            <Skeleton className="aspect-square rounded-lg" />
          </div>
          <div className="col-start-3 col-end-6 space-y-8">
            <Skeleton className="h-[40px] w-full" />
            <Skeleton className="h-[80px] w-full" />
            <div className="grid grid-cols-2 space-x-4">
              <Skeleton className="h-[40px]" />
              <Skeleton className="h-[40px]" />
            </div>
            <Skeleton className="h-[100px] w-[400px]" />
          </div>
        </div>
        <Skeleton className="h-[40px] w-[400px]" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-lg" />
            ))}
        </div>
      </div>
    </Container>
  )
}

export default Loading
