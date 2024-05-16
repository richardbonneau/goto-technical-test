import { createStore } from 'redux';
import { StockList } from "../utils/mockDataGenerator";

enum ActionType {
  RECEIVE_DATA = "RECEIVE_DATA"
}

interface ReceiveDataAction {
  type: ActionType.RECEIVE_DATA,
  payload: State
}

type Action = ReceiveDataAction;

interface State {
  stocks: StockList,
  allTickers: Array<string>
}

const initialState: State = {
  stocks: {},
  allTickers: []
}

export const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.RECEIVE_DATA:
      return {
        stocks: action.payload.stocks,
        allTickers: action.payload.allTickers
      }
    default: return state;
  }
};

export const createReceiveDataAction = (stocks: StockList, allTickers: Array<string>): ReceiveDataAction => {
  return {
    type: ActionType.RECEIVE_DATA,
    payload: { stocks, allTickers }
  }
};

const store = createStore(reducer);

export type RootState = ReturnType<typeof reducer>;

store.subscribe(() => {
  // I would get rid of this in production of course
  console.log('current state', store.getState());
});

export default store;