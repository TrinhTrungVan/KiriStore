import {Product, Category, Size, Color} from '@prisma/client'

export type SafeProduct = Product & {
  category: Category
  size: Size
  color: Color
}

export type CartItem = {
  product: SafeProduct
  quantity: number
}
