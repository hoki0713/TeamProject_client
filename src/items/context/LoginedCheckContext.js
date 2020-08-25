import React,{useState} from 'react';

const LoginedCheckContext = React.createContext();

const LoginedCheckProvider = ({children})=>{
    const [loginedCheck,setLoginedCheck]=useState(false);
    return(
        <LoginedCheckContext.Provider value={{loginedCheck,setLoginedCheck}}>
            {children}
        </LoginedCheckContext.Provider>
    )
}

export {LoginedCheckContext,LoginedCheckProvider};