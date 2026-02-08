import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import Store from './Redux/Store.js'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </Provider>
    
  </StrictMode>,
)
