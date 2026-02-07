import React from 'react'

function ErrorFallback({error,resetErrorBoundary}) {
  return (
    <div>
        <h3>something went wrong!!!</h3>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Trye Again</button>
      
    </div>
  )
}

export default ErrorFallback
