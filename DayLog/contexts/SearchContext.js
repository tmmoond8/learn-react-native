import React from 'react';

const SearchContext = React.createContext();

export function SearchContextProvider({children}) {
  const [keyword, setKeyword] = React.useState('');
  return (
    <SearchContext.Provider value={{keyword, setKeyword}}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
export const useSearchContext = () => React.useContext(SearchContext);
