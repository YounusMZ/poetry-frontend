import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router"
import App from './App.tsx'
import FrontPage from './Components/FrontPage/FrontPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<App />} >
          <Route index element={<FrontPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
