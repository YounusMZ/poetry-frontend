import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router";
import App from './App.tsx';
import PoemGrid from './Components/PoemGrid/PoemGrid.tsx';
import Poem from "./Components/Poem/Poem.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<PoemGrid />} />
          <Route path="/results" element={<PoemGrid />} />
          <Route path="/poem" element={<Poem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
