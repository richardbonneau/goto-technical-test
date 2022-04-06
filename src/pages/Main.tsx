import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import styled from 'styled-components';
import { generateMockData, StockList, getGeneratedData } from "../utils/mockDataGenerator";

const Container = styled.div`
  display:flex;
`

const Sidebar = styled.div`
  width: 200px;
  height: 100vh;
`

const Body = styled.div`
  width: 100%;
`

function Main() {

  const [allTickers, setAllTickers] = useState<Array<string>>([]);
  const [stocks, setStocks] = useState<StockList>({});

  useEffect(() => {
    const mockData = getGeneratedData();
    setAllTickers(mockData.allTickers);
    setStocks(mockData.stocks);
  }, []);

  return (<>
    <Container>

      <Sidebar>
        {allTickers.map(ticker => {

          return <Link to={`/stock/${ticker}`}>
            <h5>{ticker}</h5>
          </Link>
        })}
      </Sidebar>
      <Body>
        <label>
          Stock Search
          <input />
        </label>
      </Body>


    </Container>

  </>
  );
}

export default Main;
