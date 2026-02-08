import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function Protected() {
    const user =useSelector(state=>state.auth.user)
    if(!user)alert("Please login !!!")
  return (
    <div>
        {user ?<Outlet/>:<Navigate to="/"  />}
        
    </div>
  )
}

export default Protected
