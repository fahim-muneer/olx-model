import React from 'react'
import logo from '../../assets/symbol.png'
import search from '../../assets/search1.svg'
import arrow from '../../assets/arrow-down.svg'
import searchWt from '../../assets/search.svg'
import addBtn from '../../assets/addButton.png'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { open } from '../../Redux/ModalSlice'
import { openSell } from '../../Redux/SellModal'
import { logoutUser } from "../../Redux/AuthSlice"
import { Link } from 'react-router-dom'
import ThemeButton from '../../Button/ThemeButton'

// import {useAuthState} from 'react-firebase-hooks/auth'
// import { auth } from '../Firebase/Firebase'
function Navbar() {
    const dispatch =useDispatch()
    const user=useSelector(state=>state.auth.user)
    console.log("USER FROM REDUX:", user)

  return (
  <div>
    <nav className="
      fixed z-50 w-full flex items-center gap-4 p-2 shadow-md 
      bg-slate-100 dark:bg-[#0f172a]
      border-b-4 border-white dark:border-gray-800
      transition-colors duration-300
    ">

      <img src={logo} alt="" className="w-12" />

      {/* Location Search */}
      <div className="relative ml-5">
        <img src={search} alt="" className="absolute top-4 left-2 w-5"/>

        <input 
          type="text"
          placeholder="Search city, area, or locality..."
          className="
            w-[50px] sm:w-[150px] md:w-[250px] lg:w-[270px]
            p-3 pl-8 pr-8 border-2 rounded-md
            bg-white dark:bg-gray-800
            border-black dark:border-gray-600
            text-black dark:text-white
            focus:outline-none focus:border-teal-300
          "
        />

        <img src={arrow} alt="" className="absolute top-4 right-3 w-5 cursor-pointer"/>
      </div>

      {/* Main Search */}
      <div className="ml-5 mr-2 relative w-full main-search">
        <input 
          placeholder='Find Cars, Mobile Phones, and More...'
          className='
            w-full p-3 border-2 rounded-md
            bg-white dark:bg-gray-800
            border-black dark:border-gray-600
            text-black dark:text-white
            focus:outline-none focus:border-teal-300
          ' 
          type="text"
        />

        <div className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12
                        bg-[#002f34] dark:bg-teal-600">
          <img src={searchWt} className="w-5 filter invert" alt="" />
        </div>
      </div>

      <div className="mx-1 sm:ml-5 sm:mr-5 relative lang">
        <ThemeButton/>
      </div>

      {user ? (
        <div className="flex items-center gap-3">

          <Link to="/profile">
            <span className="
              px-3 py-1 rounded-full shadow-sm font-semibold
              bg-teal-100 dark:bg-teal-700
              text-teal-800 dark:text-white
            ">
              {user.name 
                ? user.name.slice(0,5) + (user.name.length > 5 ? "..." : "") 
                : user.email}
            </span>
          </Link>

          <button 
            onClick={() => dispatch(logoutUser())}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
          >
            Logout
          </button>

        </div>
      ) : (
        <p 
          onClick={() => dispatch(open())}
          className="
            font-bold underline ml-5 cursor-pointer 
            text-teal-800 dark:text-teal-400
            hover:text-teal-600
          "
        >
          Login
        </p>
      )}

      <p 
        onClick={() => dispatch(openSell())} 
        className="font-bold underline ml-5 cursor-pointer text-[#002f34] dark:text-white"
      >
        Sell
      </p>

      <Link 
        to='/cart' 
        className="font-bold underline ml-5 cursor-pointer text-[#002f34] dark:text-white"
      >
        Cart
      </Link>

    </nav>
  </div>
)

}

export default Navbar
