import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import appStore from './redux/appStore.js'
import {Provider} from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <BrowserRouter>
  <Toaster/>
    <App />
  </BrowserRouter>
  </Provider>
)
