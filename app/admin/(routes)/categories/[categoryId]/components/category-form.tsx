'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import {Category} from '@prisma/client'
import axios from 'axios'
import {Trash} from 'lucide-react'
import {useParams, useRouter} from 'next/navigation'
import {useState} from 'react'
import toast from 'react-hot-toast'
import * as z from 'zod'

import AlertModal from '@/components/modals/alert-modal'
import {Button} from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import {Input} from '@/components/ui/input'
import {Separator} from '@/components/ui/separator'
import {useForm} from 'react-hook-form'

interface CategoryFormProps {
  initialData: Category | null
}

const formSchema = z.object({
  name: z.string().min(1),
})

const CategoryForm = ({initialData}: CategoryFormProps) => {
  const router = useRouter()
  const params = useParams()

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const title = initialData ? 'Edit category' : 'Create category'
  const description = initialData ? 'Edit a category' : 'Add a new category'
  const toastMessge = initialData ? 'Category updated!' : 'Category created!'
  const actionLabel = initialData ? 'Save changes' : 'Create'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      if (initialData) {
        await axios.patch(`/api/categories/${params?.categoryId}`, data)
      } else {
        await axios.post('/api/categories', data)
      }

      router.refresh()
      router.push('/admin/categories')
      toast.success(toastMessge)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/categories/${params?.categoryId}`)

      router.refresh()
      router.push('/admin/categories')
      toast.success('Cateogry deleted!')
    } catch (error) {
      console.log(error)
      toast.error(
        'Make sure you removed all products using this category first.',
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
            className="mt-4 space-y-8 w-full">
            <div className="grid grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Category name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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

export default CategoryForm
