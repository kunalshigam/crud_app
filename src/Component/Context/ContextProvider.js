import React, { createContext } from 'react'
import { useState } from 'react'


export const addData = createContext('')
// export const updatDataValue = createContext('')
export const UpDateData=createContext('')
export const delData=createContext('')

const ContextProvider = ({ children }) => {

  const [uData, setUData] = useState('')
  // const [updateData, setUpdateData] = useState('')
  const [upData, setUpData] = useState('')
  const [deleteData, setDeleteData] = useState('')
  return (
    <addData.Provider value={{ uData, setUData }}>
      {/* <updatDataValue.Provider value={{updateData, setUpdateData}}> */}
        <UpDateData.Provider value={{ upData, setUpData }}>
          <delData.Provider value={{deleteData, setDeleteData}}>
        {children}
        </delData.Provider>
        </UpDateData.Provider>
      {/* </updatDataValue.Provider> */}
    </addData.Provider>
  )
}

export default ContextProvider