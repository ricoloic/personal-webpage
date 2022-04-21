import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const SearchContext = createContext({});

export function SearchProvider({ children }) {
  const [search, setSearch] = useState('');

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) throw new Error('useSearchContext must be place as a descendant of SearchProvider');
  return context;
};
