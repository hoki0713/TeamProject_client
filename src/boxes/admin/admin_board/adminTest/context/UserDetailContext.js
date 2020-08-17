import React, { useState } from 'react';

const UserDetailContext = React.createContext();

const UserDetailProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return(
    <UserDetailContext.Provider value={{user, setUser}}>
      {children}
    </UserDetailContext.Provider>
  );
};

export { UserDetailContext, UserDetailProvider };