"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/store/cart-store'
import React from 'react'
import { checkoutAction } from './checkout-action'

const CheckoutPage = () => {

  const { items, removeItem, addItem } = useCartStore()
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  if (totalPrice === 0 || items.length === 0) {
    <div className='container mx-auto px-4 py-8 text-center'>
      <h1 className="text-3xl font-bold mb-4">O carrinho está vazio</h1>
    </div>
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Checkout</h1>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className='text-xl font-bold'>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item, key) => (
              <li className='flex flex-col gap-2 border-b pb-2' key={key}>
                <div className='flex justify-between'>
                  <span className='font-medium'>{item.name}</span>
                  <span className='font-semibold'>R${(item.price * item.quantity / 100).toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={() => removeItem(item.id)} variant={"outline"}> -</Button>
                  <span className='text-lg font-semibold'>{item.quantity}</span>
                  <Button onClick={() => addItem({ ...item, quantity: 1 })}> +</Button>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <h2>Total: R${(totalPrice / 100).toFixed(2)}</h2>
          </div>
        </CardContent>
      </Card>
      <form action={checkoutAction} className="max-w-md mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button className='w-full' variant="default" type="submit">Proceed to Payment</Button>
      </form>
    </div>
  )
}

export default CheckoutPage
