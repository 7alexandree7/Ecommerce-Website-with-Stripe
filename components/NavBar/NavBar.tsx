"use client"

import { useCartStore } from '@/store/cart-store'
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'

const NavBar = () => {

    const { items } = useCartStore()
    const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0)
    const [moblieMenuOpen, setMenuMoblieOpen] = useState<boolean>(false)

    return (
        <nav className='stick top-0 z-50 bg-white shadow-md'>
            <div className='container mx-auto flex items-center justify-between px-4 py-4'>
                <Link className='hover:text-blue-600 font-semibold' href="/">My Ecommerce</Link>

                <div className='hidden md:flex space-x-6'>
                    <Link href="/">Home</Link>
                    <Link className='hover:text-blue-600' href="/products">Products</Link>
                    <Link className='hover:text-blue-600' href="/checkout">Checkout</Link>
                </div>

                <div className='flex items-center justify-center space-x-4'>
                    <Link className='relative' href={"/checkout"}>
                        <ShoppingCartIcon className='w-6 h-6' />
                        {itemsCount > 0 && (
                            <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center'>
                                {itemsCount}
                            </span>
                        )}
                    </Link>
                    <Button className='md:hidden' onClick={() => setMenuMoblieOpen(!moblieMenuOpen)} variant="ghost">
                        {moblieMenuOpen ? <XMarkIcon className='w-6 h-6' /> : <Bars3Icon className='w-6 h-6' />}
                    </Button>
                </div>
            </div>

            {moblieMenuOpen && (
                <nav className='md:hidden bg-white shadow-md'>
                    <ul className='flex flex-col p-4 space-y-2'>
                        <li> <Link className='hover:text-blue-600' href="/">Home</Link> </li>
                        <li> <Link className='hover:text-blue-600' href="/products">Products</Link> </li>
                        <li> <Link className='hover:text-blue-600' href="/checkout">Checkout</Link> </li>
                    </ul>
                </nav>
            )}
        </nav>
    )
}

export default NavBar
