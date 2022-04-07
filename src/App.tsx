import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Stock from "./pages/Stock";
import { generateMockData } from "./utils/mockDataGenerator";
import { useDispatch } from 'react-redux';
import { getData } from './index';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const mockData = generateMockData();
    dispatch(getData(mockData.stocks, mockData.allTickers));
  }, []);

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
