import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { StockList } from "./utils/mockDataGenerator";
import { Provider } from 'react-redux';

enum ActionType {
  RECEIVE_DATA = "RECEIVE_DATA"
}

interface actionReceiveData {
  type: ActionType.RECEIVE_DATA,
  payload: State
}

type Action = actionReceiveData;

interface State {
  stocks: StockList,
  allTickers: Array<string>
}

const initalState: State = {
  stocks: {},
  allTickers: []
}
export const reducer = (state = initalState, action: Action): State => {
  switch (action.type) {
    case 'RECEIVE_DATA':
      return {
        stocks: action.payload.stocks,
        allTickers: action.payload.allTickers
      }
    default: return state;
  }

};

export const getData = (stocks: StockList, allTickers: Array<string>) => {
  return {
    type: ActionType.RECEIVE_DATA,
    payload: { stocks, allTickers }
  }

};

const store = createStore(reducer);

//This RootState is required to use useSelector later on 
export type RootState = ReturnType<typeof reducer>;

store.subscribe(() => {
  console.log('current state', store.getState());
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();






