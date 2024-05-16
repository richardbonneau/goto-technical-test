import React, { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../redux/store';
import { colors } from '../utils/constants';
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Container = styled.div`
  display:flex;
`

const Sidebar = styled.div`
  width: 8rem;
  height: 100%;
  background: ${colors.grey};
  padding-left: 10px;

  a {
    color: ${colors.lightblue};

    &:hover {
      color: ${colors.white};
    }
  }
`

const Body = styled.div`
  width: 100%;
  padding-top: 25px;
  background: ${colors.dark};
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
}
`

const StyledInput = styled.input`
  margin-top: 0.3rem;
  padding: 0.3rem;
  border: none;
  color: ${colors.dark};
  background-color: ${colors.light};

  &:focus {
    border-color: ${colors.white};
    border: 1px solid ${colors.lightblue};
    outline: none;
  }
`;

const SearchSuggestion = styled.li`
list-style-type: none;
`

function Main() {
  const allTickers = useTypedSelector(state => state.allTickers);

  const [searchText, setSearchText] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<Array<string>>([]);

  const onTypeInSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newlyTypedText: string = e.target.value;
    setSearchText(newlyTypedText);

    if (newlyTypedText.length > 0) {
      const newListOfSuggestions: Array<string> = allTickers.filter(ticker => {
        return ticker.toLowerCase().includes(newlyTypedText.toLowerCase());
      });
      setSearchSuggestions(newListOfSuggestions);
    } else setSearchSuggestions([]);
  }, [allTickers]);

  return (<>
    <Container>
      <Sidebar>
        {allTickers.map((ticker, index) => {
          return <Link key={index} to={`/stock/${ticker}`}>
            <h5>{ticker}</h5>
          </Link>
        })}
      </Sidebar>
      <Body>
        <label htmlFor="stockSearch">
          Stock Search
        </label>
        <StyledInput id="stockSearch" value={searchText} onChange={onTypeInSearchInput} />
        <ul>
          {searchSuggestions.map((ticker, index) => {
            return <Link key={index} to={`/stock/${ticker}`}>
              <SearchSuggestion>
                {ticker}
              </SearchSuggestion>
            </Link>
          })}
        </ul>

      </Body>
    </Container>
  </>
  );
}

export default Main;
