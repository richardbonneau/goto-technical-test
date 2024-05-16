import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { Stock } from "../utils/mockDataGenerator";
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../redux/store';
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom';
import { colors } from '../utils/constants';
import { medianCalculator } from '../utils/medianCalculator';
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Container = styled.div`
  margin: 2rem;
  
  table {
    width: 100%;
    text-align: center;
  }
`

const BackButton = styled.h2`
  text-align: left;
  width: 100%;
  cursor: pointer;
  color: ${colors.lightblue};

  &:hover {
    color: ${colors.white};
  }
`;

const TickerTitle = styled.h1`
  text-align: center;
  width: 100%;
`;

function Main() {
  const navigate = useNavigate();
  const params = useParams();
  const stocks = useTypedSelector(state => state.stocks);
  const stockData = params.ticker && stocks[params.ticker];
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    if (stockData) {
      const newRecommendations = stockData.map((data: Stock, index: number) => {

        // Hold because we don't have enough data to make a decision yet ¯\_(ツ)_/¯
        if (index === 0) return "hold";

        const algoRangeSensitivity = 0.05;

        const allPreviousDataEntriesForThatStock = stocks[data.ticker].filter((_, i) => i < index);
        const pricesArrUntilNow = allPreviousDataEntriesForThatStock.map(d => d.price);
        const mediaCountArrUntilNow = allPreviousDataEntriesForThatStock.map(d => d.socialMediaCount);

        const priceMedian = medianCalculator(pricesArrUntilNow);
        const mediaCountMedian = medianCalculator(mediaCountArrUntilNow);

        const priceWithSensitivity = data.price + data.price * algoRangeSensitivity;
        const mediaCountWithSensitivity = data.socialMediaCount + data.socialMediaCount * algoRangeSensitivity;

        if (data.price < priceMedian && data.socialMediaCount < mediaCountMedian) return "hold";
        else if (priceWithSensitivity < priceMedian && mediaCountWithSensitivity > mediaCountMedian) return "buy";
        else return "sell"
      });

      setRecommendations(newRecommendations);
    }
  }, []);

  return (<>
    <Container>
      <BackButton onClick={() => navigate(-1)}>back</BackButton>
      <TickerTitle>{params.ticker}</TickerTitle>
      <table>
        <tr>
          <th>Date</th>
          <th>Price</th>
          <th>Social Media Count</th>
          <th>Recommendation</th>
        </tr>
        {stockData && stockData.map((data, i) => {
          return <tr key={i}>
            <td>{format(data.timestamp, "PP")}</td>
            <td>{data.price}</td>
            <td>{data.socialMediaCount}</td>
            <td>{recommendations[i]}</td>
          </tr>
        })}
      </table>
    </Container>
  </>
  );
}

export default Main;