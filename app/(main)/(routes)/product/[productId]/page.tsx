import React from 'react'
import getProduct from '@/actions/get-product'
import getProducts from '@/actions/get-products'
import Container from '@/components/store/container'
import Gallery from '@/components/store/gallery'
import ProductList from '@/components/store/product/product-list'
import ProductATC from '@/components/store/product/product-atc'

interface ProductPageProps {
  params: {
    productId: string
  }
}

const ProductPage = async ({params}: ProductPageProps) => {
  const product = await getProduct(params.productId)
  const suggestedProducts = await getProducts({categoryId: product?.categoryId})

  return (
    <div>
      <Container>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8 md:grid md:grid-cols-5 md:gap-x-8 items-start mt-8">
            <div className="col-start-1 col-end-3 mb-4">
              <Gallery images={product?.images || []} />
            </div>
            <div className="col-start-3 col-end-6">
              <h3 className="font-bold text-2xl">{product?.name}</h3>
              <h3 className="text-neutral-600 font-medium mb-4">
                {product?.category.name}
              </h3>
              <hr />
              <p className="font-medium text-neutral-600 lg:my-8 my-4 line-clamp-5">
                {product?.description}
              </p>
              <div className="grid grid-cols-2">
                <h3 className="font-bold">
                  Size:
                  <span className="font-normal ml-2">
                    {product?.size.value}
                  </span>
                </h3>
                <h3 className="flex flex-row font-bold">
                  Color:
                  <div
                    className="h-6 w-6 rounded-full border border-black ml-2"
                    style={{backgroundColor: product?.color.value}}
                  />
                </h3>
              </div>
              <ProductATC data={product} />
            </div>
          </div>
          <hr className="px-4 sm:px-6 lg:px-8" />
          <h3 className="font-bold text-2xl">Related Products</h3>
          <ProductList items={suggestedProducts} />
        </div>
      </Container>
    </div>
  )
}

export default ProductPage
