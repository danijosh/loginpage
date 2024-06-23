// import React,{useState} from 'react'

import { createContext } from 'react'
import {ContextReceiver} from './ContextReceiver'

export const ProContext=createContext()

const ContextEx = () => {
    // const [user,userState]=useState("Sam")
  return (
    <div>
        {/* <h1>{user}</h1> */}
        <ProContext.Provider  value={{name:"Daniel",age:20,city:"Chennai"}}>
            <ContextReceiver/>
        </ProContext.Provider>
    </div>
  )
}

export default ContextEx