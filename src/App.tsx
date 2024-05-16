import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Stock from "./pages/Stock";
import { useFetchData } from './hooks/useFetchData';

function App() {
  useFetchData();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/stock/:ticker" element={<Stock />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
