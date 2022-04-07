import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../index';
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Container = styled.div`
  display:flex;
`

const Sidebar = styled.div`
  width: 200px;
  height: 100%;
  background: #d9d9d9;
  padding-left: 10px;
`

const Body = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 25px;
`

const SearchSuggestionContainer = styled.ul`
`
const SearchSuggestion = styled.li`

`

function Main() {
  const allTickers = useTypedSelector(state => state.allTickers);

  const [searchText, setSearchText] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<Array<string>>([]);

  const onTypeInSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newlyTypedText:string = e.target.value;
    setSearchText(newlyTypedText);
    
    if(newlyTypedText.length > 0) {
      const newListOfSuggestions:Array<string> = allTickers.filter(ticker=>{
        return ticker.toLowerCase().includes(newlyTypedText.toLowerCase());
      });
      setSearchSuggestions(newListOfSuggestions);
    } else setSearchSuggestions([]);

  }

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
          <input value={searchText} onChange={onTypeInSearchInput} />
          <SearchSuggestionContainer>
            {searchSuggestions.map(ticker => {
              return <Link to={`/stock/${ticker}`}>
                <SearchSuggestion>
                  {ticker}
                </SearchSuggestion>
              </Link>
            })}
          </SearchSuggestionContainer>
        </label>
      </Body>
    </Container>

  </>
  );
}

export default Main;
