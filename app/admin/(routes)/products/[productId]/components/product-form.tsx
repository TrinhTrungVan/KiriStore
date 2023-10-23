'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import {Category, Color, Size} from '@prisma/client'
import axios from 'axios'
import {Trash} from 'lucide-react'
import {useParams, useRouter} from 'next/navigation'
import {useState} from 'react'
import toast from 'react-hot-toast'
import * as z from 'zod'
import {useForm} from 'react-hook-form'

import AlertModal from '@/components/modals/alert-modal'
import {Button} from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import ImageUpload from '@/components/ui/image-upload'
import {Input} from '@/components/ui/input'
import {Separator} from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {Checkbox} from '@/components/ui/checkbox'
import {Product} from '@/types'
import {Textarea} from '@/components/ui/textarea'

interface ProductFormProps {
  initialData: Product | null
  categories: Category[]
  sizes: Size[]
  colors: Color[]
}

const formSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(1),
  images: z.string().array().min(1).max(5),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  inStock: z.coerce.number().min(1),
})

const ProductForm = ({
  initialData,
  categories,
  colors,
  sizes,
}: ProductFormProps) => {
  const router = useRouter()
  const params = useParams()

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const title = initialData ? 'Edit product' : 'Create product'
  const description = initialData ? 'Edit a product' : 'Add a new product'
  const toastMessge = initialData ? 'Product updated!' : 'Product created!'
  const actionLabel = initialData ? 'Save changes' : 'Create'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      images: [],
      price: 0,
      inStock: 0,
      categoryId: '',
      colorId: '',
      sizeId: '',
      isFeatured: false,
      isArchived: false,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      if (initialData) {
        await axios.patch(`/api/products/${params?.productId}`, data)
      } else {
        await axios.post('/api/products', data)
      }

      router.refresh()
      router.push('/admin/products')
      toast.success(toastMessge)
    } catch (error) {
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/products/${params?.productId}`)

      router.refresh()
      router.push('/admin/products')
      toast.success('Product deleted!')
    } catch (error) {
      toast.error(
        'Make sure you removed all categories using this product first.',
      )
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        loading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />
      <div className="flex-col">
        <div className="flex justify-between items-center mb-4">
          <Heading title={title} description={description} />
          {!initialData && (
            <Button
              type="submit"
              disabled={isLoading || !form.formState.isValid}
              onClick={form.handleSubmit(onSubmit)}>
              {actionLabel}
            </Button>
          )}
          {initialData && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setIsOpen(true)}>
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-5 gap-8 mt-4 w-full">
            <div className="col-start-1 col-end-4 space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Product name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <ImageUpload
                        disabled={isLoading}
                        values={field.value}
                        onChange={url =>
                          field.onChange([...field.value, url].slice(0, 5))
                        }
                        onRemove={url =>
                          field.onChange([
                            ...field.value.filter(curr => curr !== url),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizeId"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a size"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map(size => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colorId"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a color"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors.map(color => (
                          <SelectItem key={color.id} value={color.id}>
                            {color.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-start-4 col-end-6 space-y-8">
              <FormField
                control={form.control}
                name="price"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type="number"
                        placeholder="9.99"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inStock"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>In Stock</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type="number"
                        placeholder="10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFeatured"
                render={({field}) => (
                  <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        This product will appear on the home page.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isArchived"
                render={({field}) => (
                  <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>
                        This product will not appear anywhere on the home page.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !form.formState.isValid}>
              {actionLabel}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default ProductForm
