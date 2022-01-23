import React from 'react';
import { IndexPage } from './pages/indexPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

function App() {

   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<IndexPage />} exact />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
