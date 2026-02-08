import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../Redux/CartSlice'

function AddCartButton({item}) {
    const dispatch =useDispatch()
     return (
        <div>
          <button
            onClick={() => dispatch(addToCart(item))}
            className="bg-teal-600 text-white px-3 py-1 rounded w-full"
          >
            Add to Cart
          </button>
        </div>
  )
}

export default AddCartButton
