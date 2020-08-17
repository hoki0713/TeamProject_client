import React, { useState } from "react";

const StoreSearchContext = React.createContext();

const StoreSearchProvider = ({ children }) => {
  const [store, setStore] = useState({});
  return (
    <StoreSearchContext.Provider value={{ store, setStore }}>
      {children}
    </StoreSearchContext.Provider>
  );
};

export { StoreSearchContext, StoreSearchProvider };
