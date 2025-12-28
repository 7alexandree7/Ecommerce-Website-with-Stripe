import ProductDetail from '@/components/ProductDetail/ProductDetail'
import { stripe } from '@/lib/stripe'
import React from 'react'

interface Props {
  params: {
    id: string
  }
}

const ProductId = async ({ params }: Props) => {

  const product = await stripe.products.retrieve(params.id, { expand: ['default_price'] })
  const plainProduct = JSON.parse(JSON.stringify(product))

  return (
    <>
      <ProductDetail product={plainProduct} />
    </>
  )
}

export default ProductId
