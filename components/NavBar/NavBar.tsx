import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <nav className='stick top-0 z-50 bg-white shadow-md'>
            <div className='container mx-auto flex items-center justify-between px-4 py-4'>
                <Link className='hover:text-blue-600 font-semibold' href="/">My Ecommerce</Link>

                <div className='hidden md:flex space-x-6'>
                    <Link href="/">Home</Link>
                    <Link className='hover:text-blue-600' href="/products">Products</Link>
                    <Link className='hover:text-blue-600' href="/checkout">Checkout</Link>
                </div>

                <div>carrinho</div>
            </div>
        </nav>
    )
}

export default NavBar
