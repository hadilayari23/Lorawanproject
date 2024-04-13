import React, { createContext, useState } from 'react'

const MainContext = createContext();

const ProvideContext = ({ children }) => {

    const [sideBaropen, setSideBaropen] = useState(true);

    const Values = {sideBaropen, setSideBaropen}
  return (
    <MainContext.Provider value={Values} >
      {children}
    </MainContext.Provider>
  )
}

export { ProvideContext, MainContext}