import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router"
import App from './App'
import Editor from './Editor'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/editor' index element={<Editor />} />
    </Routes>
  </BrowserRouter>
)
