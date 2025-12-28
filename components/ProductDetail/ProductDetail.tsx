"use client"

import Image from 'next/image';
import React from 'react'
import Stripe from 'stripe'
import { Button } from '../ui/button';
import { useCartStore } from '@/store/cart-store';

interface Props {
  product: Stripe.Product
}

const ProductDetail = ({ product }: Props) => {

  const {items, addItem, removeItem} = useCartStore();
  const price = product.default_price as Stripe.Price | null;

  const cartItem = items.find((item) => item.id === product.id)
  const quantity: number = cartItem ? cartItem.quantity : 0

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price?.unit_amount as number,
      imageUrl: product.images && product.images[0] ? product.images[0] : null,
      quantity: 1
    })
  }

  return (
    <div className='container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 sm:gap-16 md:gap-32 items-center justify-center min-h-[calc(100vh-120px)] overflow-hidden'>
      {product.images && product.images[0] && (
        <div className='relative h-100 w-full md:w-1/2 rounded-lg overflow-hidden'>
          <Image
            src={product.images[0]}
            alt={product.name}
            layout='fill'
            objectFit='contain'
            className='group:hover:opacity-90 transition-opacity duratio-300 ease-in-out rounded-t-lg'
          />
        </div>
      )}

      <div className='md:w-1/2'>
        <h1 className='text-3xl font-bold mb-4'>{product.name.toUpperCase()}</h1>
        {product.description && <p className='text-gray-700 mb-4'>{product.description.toLocaleLowerCase()}</p>}
        {price && price.unit_amount !== null && <p className='text-lg font-semibold text-gray-900'> ${price.unit_amount / 100} </p>}

        <div className='flex items-center space-x-4'>
          <Button onClick={() => removeItem(product.id)} variant={"outline"}> -</Button>
          <span className='text-lg font-semibold'>{quantity}</span>
          <Button onClick={onAddItem}> +</Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
