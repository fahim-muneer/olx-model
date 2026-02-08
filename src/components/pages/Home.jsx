import React from 'react'
import Login from '../Modal/Login'
import Sell from '../Modal/Sell'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../ErrorBoundary/ErrorFallback'
import Card from '../../Card/Card'

function Home() {
  return (
    <div>
      <Login />
      <Sell />

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Card />
      </ErrorBoundary>
    </div>
  )
}

export default Home
