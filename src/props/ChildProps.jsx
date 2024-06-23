import React, { useState } from 'react'
function ChildProps(props){
  
  return (
    // console.log(props)
    
    <div>
    <h1>Im {state},a.k.a {props.ak}</h1>
    <button onClick={sub()}>Submit</button>
    </div>
  )
}
export default ChildProps;