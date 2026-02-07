import React, { useState } from 'react'
import Navbar from './Navbar'
import Login from '../Modal/Login'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../ErrorBoundary/ErrorFallback'

function Home() {

  return (
    <div>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Navbar />
        </ErrorBoundary>


            <Login />

        
      
    </div>
  )
}

export default Home
