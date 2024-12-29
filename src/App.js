import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './component/Header/Header';
import Speechtotext from './component/Speechtotext/Speechtotext';
import Translate from './component/Translate/Translate';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Speechtotext />} />
        <Route path='/translate' element={<Translate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
