import React from 'react';
import { IndexPage } from './pages/indexPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { KonuPage } from './pages/konuPage';

function App() {

   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<IndexPage />} exact />
            <Route path="/konu/:slug" element={<KonuPage />} exact />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
