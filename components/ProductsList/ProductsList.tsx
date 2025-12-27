"use client"

import React, { useState } from 'react'
import Stripe from 'stripe'
import ProductCard from '../ProductCard/ProductCard'

interface Props {
    products: Stripe.Product[]
}

const ProductsList = ({ products }: Props) => {

    const [searchTerm, setSearchTerm] = useState<string>("")
    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())
        || (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false))

    return (
        <div>
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    required
                    className='w-full max-w-md rounded-md border border-gray-300 px-4 py-2 focus:outline-none'
                />
            </div>

            <ul className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {filteredProducts.map((product) => {
                    return (
                        <li key={product.id}> <ProductCard product={product} /> </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ProductsList
