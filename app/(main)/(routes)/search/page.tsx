import getCategories from '@/actions/get-categories'
import getColors from '@/actions/get-colors'
import getProducts from '@/actions/get-products'
import getSizes from '@/actions/get-sizes'

import Container from '@/components/store/container'
import Filter from '@/components/store/filter'
import NoResults from '@/components/store/no-results'
import ProductCard from '@/components/store/product/product-card'
import Sort from '@/components/store/sort'

interface ISearchParams {
  name?: string
  categoryId?: string
  colorId?: string
  sizeId?: string
}

const HomePage = async ({searchParams}: {searchParams: ISearchParams}) => {
  const products = await getProducts({...searchParams, isFeatured: true})

  const categories = await getCategories()
  const colors = await getColors()
  const sizes = await getSizes()

  return (
    <Container>
      <div className="flex flex-col gap-y-8 px-4 mt-4 sm:px-6 lg:px-8 mb-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <div className="hidden lg:block">
            <Filter valueKey="categoryId" name="Categories" data={categories} />
            <Filter valueKey="colorId" name="Colors" data={colors} />
            <Filter valueKey="sizeId" name="Sizes" data={sizes} />
            <Sort />
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {products.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map(item => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default HomePage
