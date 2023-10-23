'use client'

import {cn} from '@/lib/utils'
import {Home, LayoutList, Ruler, Palette, Tag, Package} from 'lucide-react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

const MainNav = () => {
  const pathname = usePathname()

  const routes = [
    {
      href: '/admin',
      label: 'Dashboard',
      active: pathname === '/admin',
      icon: Home,
    },
    {
      href: '/admin/orders',
      label: 'Orders',
      active: pathname.startsWith('/admin/orders'),
      icon: Package,
    },
    {
      href: '/admin/products',
      label: 'Products',
      active: pathname.startsWith('/admin/products'),
      icon: Tag,
    },
    {
      href: '/admin/categories',
      label: 'Categories',
      active: pathname.startsWith('/admin/categories'),
      icon: LayoutList,
    },
    {
      href: '/admin/sizes',
      label: 'Sizes',
      active: pathname.startsWith('/admin/sizes'),
      icon: Ruler,
    },
    {
      href: '/admin/colors',
      label: 'Colors',
      active: pathname.startsWith('/admin/colors'),
      icon: Palette,
    },
  ]
  return (
    <nav className="flex flex-col">
      {routes.map(route => {
        const Icon = route.icon
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'flex flex-row items-center text-md font-medium transition rounded-md hover:bg-neutral-200 py-2 pl-2',
              route.active
                ? 'text-black bg-white hover:bg-white'
                : 'text-neutral-500',
            )}>
            <Icon className="h-5 w-5 mr-2" />
            {route.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default MainNav
