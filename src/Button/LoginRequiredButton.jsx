import React from 'react'
import { useDispatch } from 'react-redux'
import { open } from '../Redux/ModalSlice'

function LoginRequiredButton() {
    const dispatch=useDispatch()
  return (
        <div>
          <button
            onClick={() => dispatch(open())}
            className="bg-red-500 text-black font-bold px-3 py-1 rounded w-full"
          >
            login Required
          </button>
        </div>
  )
}

export default LoginRequiredButton
