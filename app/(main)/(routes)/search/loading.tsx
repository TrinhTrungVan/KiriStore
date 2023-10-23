'use client'

import Container from '@/components/store/container'
import {Skeleton} from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <Container>
      <div className="flex flex-col gap-y-8 px-4 py-4 sm:px-6 lg:px-8">
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
