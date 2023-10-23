import {db} from '@/lib/db'
import ProductForm from './components/product-form'

const ProductPage = async ({params}: {params: {productId: string}}) => {
  let product: any
  try {
    product = await db.product.findUnique({
      where: {
        id: params.productId as string,
      },
    })
  } catch {
    product = null
  }

  const categories = await db.category.findMany({})
  const colors = await db.color.findMany({})
  const sizes = await db.size.findMany({})

  return (
    <div className="flex-1 p-16 pt-6">
      <ProductForm
        initialData={product}
        categories={categories || []}
        colors={colors || []}
        sizes={sizes || []}
      />
    </div>
  )
}

export default ProductPage
