import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generateMockData } from '../utils/mockDataGenerator';
import { createReceiveDataAction } from '../redux/store';

export const useFetchData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const mockData = generateMockData();
    dispatch(createReceiveDataAction(mockData.stocks, mockData.allTickers));
  }, [dispatch]);
};