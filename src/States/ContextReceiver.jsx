import React,{useContext} from 'react'
import { ProContext } from './ContextEx'


export const ContextReceiver = () => {
    const {name,age,city}=useContext(ProContext)
    console.log(useContext(ProContext));
  return (
    <div>   
        <h1>{name}</h1>
        <h1>{age}</h1>
        <h1>{city}</h1>
        
    </div>
  )
}

