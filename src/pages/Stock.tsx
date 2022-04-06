import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link, useParams } from "react-router-dom";
import styled from 'styled-components';
import { generateMockData, StockList, Stock, getGeneratedData } from "../utils/mockDataGenerator";


const Container = styled.div`
  display:flex;
  justify-content: center;
`


function Main() {
  let params = useParams();
  const [allTickers, setAllTickers] = useState<Array<string>>([]);
  const [stocks, setStocks] = useState<StockList>({});

  useEffect(() => {
    const mockData = getGeneratedData();
    setAllTickers(mockData.allTickers);
    setStocks(mockData.stocks);
  }, []);


  return (<>
    <Container>

      <h2>{params.ticker}</h2>
      {params.ticker && stocks[params.ticker].map(data => {
        console.log("data", data)
        return <div>
          {data.price}
        </div>
      })}
    </Container>


  </>
  );
}

export default Main;
