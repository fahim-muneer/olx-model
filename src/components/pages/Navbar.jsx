import React from 'react'
import logo from '../../assets/symbol.png'
import search from '../../assets/search1.svg'
import arrow from '../../assets/arrow-down.svg'
import searchWt from '../../assets/search.svg'
import addBtn from '../../assets/addButton.png'
import './Navbar.css'
import { useDispatch } from 'react-redux'
import { open } from '../../Redux/ModalSlice'

// import {useAuthState} from 'react-firebase-hooks/auth'
// import { auth } from '../Firebase/Firebase'
function Navbar() {
    const dispatch =useDispatch()
  return (
    <div>
    <nav className="fixed z-50 w-full flex items-center gap-4 p-2 shadow-md bg-slate-100 border-b-4 border-white">

        <img src={logo} alt="" className="w-12" />

        <div className="relative ml-5">
            <img src={search} alt="" className="absolute top-4 left-2 w-5"/>

            <input 
            type="text"
            placeholder="Search city, area, or locality..."
            className="w-[50px] sm:w-[150px] md:w-[250px] lg:w-[270px] 
                        p-3 pl-8 pr-8 border-2 border-black rounded-md 
                        focus:outline-none focus:border-teal-300"
            />

            <img src={arrow} alt="" className="absolute top-4 right-3 w-5 cursor-pointer"/>
        </div>

        <div className="ml-5 mr-2 relative w-full main-search">
            <input placeholder='Find Cars, Mobile Phones, and More...' className='w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300' type="text"/>
            <div style={{ backgroundColor: '#002f34' }} className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12">
                <img src={searchWt} className="w-5 filter invert" alt="" />
            </div>
        </div>
                <div className="mx-1 sm:ml-5 sm:mr-5 relative lang">
                    <p className="font-bold mr-3" >English</p>
                    <img src={arrow} alt="" className='w-5 cursor-pointer' />
                </div>

                 <p onClick={()=>{dispatch(open())}}  className='font-bold underline ml-5 cursor-pointer' style={{color: '#002f34'}}>Login</p>
                <br />
                <p>Sell</p>
        </nav>
    </div>
  )
}

export default Navbar
