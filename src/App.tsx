import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from 'styled-components';
import Main from "./pages/Main";
import Stock from "./pages/Stock";
import { generateMockData, StockList, getGeneratedData } from "./utils/mockDataGenerator";


function App() {

  const [allTickers, setAllTickers] = useState<Array<string>>([]);
  const [stocks, setStocks] = useState<StockList>({});

  useEffect(() => {
    const mockData = generateMockData();
    setAllTickers(mockData.allTickers);
    setStocks(mockData.stocks);
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
