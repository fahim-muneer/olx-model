import { Navbar } from 'flowbite-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Login from '../components/Modal/Login'
import { useSelector } from 'react-redux'

function Details() {
  const { id } = useParams()

  const product = useSelector(state =>
    state.item.items.find(item => item.id === id)

  )
  console.log("ALL ITEMS:", useSelector(state => state.item.items))
  console.log("ID FROM URL:", id)

  if (!product) {
    return <p className="text-center mt-10">Loading product...</p>
  }

  return (
    <div className="relative">
      <Navbar />
      <Login />
        <Link 
          to="/" 
          className="absolute top-4 right-4 z-50 text-2xl font-bold bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-200"
        >
          ✕
        </Link>

      
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 p-10 px-5 sm:px-15 md:px-30 lg:px-40">
      
        <div className="border-2 w-full rounded-lg flex justify-center overflow-hidden h-96">
        
          <img
            className="object-cover"
            src={product.imageUrl|| 'https://via.placeholder.com/150'}
            alt={product.title}
          />
        </div>

        <div className="flex flex-col relative w-full">

          <p className="text-2xl font-bold">₹ {product.price}</p>
          <p className="text-base">{product.category}</p>
          <p className="text-xl font-bold">{product.title}</p>

          <p className="break-words">
            {product.description}
          </p>

          <div className="mt-auto flex justify-between">
            <p className="font-bold">Seller: {product.userName}</p>
            <p className="text-sm">{product.createdAt}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Details
