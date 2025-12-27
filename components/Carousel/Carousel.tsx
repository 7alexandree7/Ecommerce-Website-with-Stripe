"use client"

import React, { useEffect, useState } from "react"
import Stripe from "stripe"
import Image from "next/image"
import { Card, CardContent, CardTitle } from "../ui/card"

interface Props {
  products: Stripe.Product[]
}

const Carousel = ({ products }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!products.length) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [products.length])

  if (!products.length) return null

  const currentProduct = products[currentIndex]
  const price = currentProduct.default_price as Stripe.Price | null

  return (
    <Card className="flex flex-col sm:flex-row items-center justify-around gap-4 p-4 rounded-xl shadow-md border border-gray-300">

      {/* IMAGEM */}
      {currentProduct.images?.[0] && (
        <div className="relative w-full sm:w-80 h-64 sm:h-80 shrink-0">
          <Image
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            fill
            priority
            className="object-contain rounded-md"
          />
        </div>
      )}

      {/* TEXTO */}
      <CardContent className="flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {currentProduct.name}
        </CardTitle>

        {price?.unit_amount && (
          <p className="text-lg sm:text-xl text-gray-700">
            R$ {(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default Carousel
