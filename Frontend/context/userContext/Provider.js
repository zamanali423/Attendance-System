import React, { useState } from 'react'
import { userContext } from './userContext';

const Provider = ({children}) => {
    const [loginData, setloginData] = useState({})
  return (
    <userContext.Provider value={{loginData,setloginData}}>
      {children}
    </userContext.Provider>
  )
}

export default Provider
