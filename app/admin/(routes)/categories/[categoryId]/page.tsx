import {db} from '@/lib/db'
import CategoryForm from './components/category-form'

const CategoryPage = async ({params}: {params: {categoryId: string}}) => {
  let category
  try {
    category = await db.category.findUnique({
      where: {
        id: params.categoryId as string,
      },
    })
  } catch {
    category = null
  }

  return (
    <div className="flex-1 p-8 pt-6">
      <CategoryForm initialData={category} />
    </div>
  )
}

export default CategoryPage
