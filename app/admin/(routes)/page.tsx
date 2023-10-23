import {getGraphRevenue} from '@/actions/get-graph-revenue'
import {getProductsInStock} from '@/actions/get-product-in-stock'
import {getSalesCount} from '@/actions/get-sales-count'
import {getTotalRevenue} from '@/actions/get-total-revenue'
import Overview from '@/components/store/overview'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import Heading from '@/components/ui/heading'
import {Separator} from '@/components/ui/separator'
import {formatter} from '@/lib/utils'
import {CreditCard, DollarSign, Package} from 'lucide-react'
import React from 'react'

const DashboardPage = async () => {
  const totalRevenue = await getTotalRevenue()
  const salesCount = await getSalesCount()
  const productsInStock = await getProductsInStock()
  const grapRevenue = await getGraphRevenue()

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Product In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productsInStock}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="mb-8">Overview</CardTitle>
            <CardContent>
              <Overview data={grapRevenue} />
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
