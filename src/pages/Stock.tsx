import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { Stock } from "../utils/mockDataGenerator";
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../index';
import { format } from 'date-fns'
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Container = styled.div`
  table {
    width: 100%;
    text-align: center;
  }
`

function Main() {
  let params = useParams();
  const stocks = useTypedSelector(state => state.stocks);

  const medianCalculator = (arr: Array<number>) => {
    // Pour Dominique et Dylan: Cette fonction n'est pas mon code
    const middle = (arr.length + 1) / 2;
    const sorted = [...arr].sort((a, b) => a - b);
    const isEven = sorted.length % 2 === 0;

    return isEven ? (sorted[middle - 1.5]
      + sorted[middle - 0.5]) / 2 :
      sorted[middle - 1];

  }

  const recommendationAlgorithm = (data: Stock, index: number): string => {
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

  };

  return (<>
    <Container>
      <h2>{params.ticker}</h2>
      <table>
        <tr>
          <th>TimeStamp</th>
          <th>Price</th>
          <th>Social Media Count</th>
          <th>Recommendation</th>
        </tr>
        {params.ticker && stocks[params.ticker].map((data, i) => {
          return <tr>
            <td>{format(data.timestamp, "PPpp")}</td>
            <td>{data.price}</td>
            <td>{data.socialMediaCount}</td>
            <td>{recommendationAlgorithm(data, i)}</td>
          </tr>

        })}
      </table>
    </Container>
  </>
  );
}

export default Main;
