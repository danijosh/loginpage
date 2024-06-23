// import React,{useState} from 'react'
// import useStateEx from './useStateEx.module.css'
// const UseStateEx = () => {
//     const [count, setCount] = useState(undefined)
//   return (
//     <div  id={useStateEx.box}>
//         <h1>{count}</h1>
//         <button className={useStateEx.btn} onClick={()=>setCount(count+"+")}>increament</button>
//         <button className={useStateEx.btn} onClick={()=>{ return( count==0 ? undefined : setCount(count-1))}}>decreament</button>

//     </div>
//   )
// }

// export default UseStateEx

// App.js

// *------------------------------------------------
// Calculator.js

// import { useState } from 'react';

// function Calculator() {
//   const [input, setInput] = useState('');

//   const handleClick = (value) => {
//     setInput(input + value);
//   };

//   const calculate = () => {
//     try {
//       setInput(eval(input).toString());
//     } catch (error) {
//       setInput('Error');
//     }
//   };

//   const clear = () => {
//     setInput('');
//   };

//   return (
//     <div>
//       <input type="text" value={input} readOnly />
//       <br />
//       <button onClick={() => handleClick('7')}>7</button>
//       <button onClick={() => handleClick('8')}>8</button>
//       <button onClick={() => handleClick('9')}>9</button>
//       <button onClick={() => handleClick('+')}>+</button>
//       <br />
//       <button onClick={() => handleClick('4')}>4</button>
//       <button onClick={() => handleClick('5')}>5</button>
//       <button onClick={() => handleClick('6')}>6</button>
//       <button onClick={() => handleClick('-')}>-</button>
//       <br />
//       <button onClick={() => handleClick('1')}>1</button>
//       <button onClick={() => handleClick('2')}>2</button>
//       <button onClick={() => handleClick('3')}>3</button>
//       <button onClick={() => handleClick('*')}>x</button>
//       <br />
//       <button onClick={() => handleClick('0')}>0</button>
//       <button onClick={() => handleClick('.')}>.</button>
//       <button onClick={() => clear()}>C</button>
//       <button onClick={() => handleClick('/')}>/</button>
//       <br />
//       <button onClick={() => calculate()}>=</button>
//     </div>
//   );
// }










import { useEffect, useState } from "react";

import React from "react";

const UseStateEx = (po) => {
  const [state, setState] = useState("");
  

  useEffect(() => {
    const word = "Daniel, how are you?|";
    for (const [i, j] of Object.entries(word)) {
      // console.log(i, j);
      setTimeout(() => {
        setState((state) => state + j); // Update state after loop
      }, 90 * i);
    }
  }, []);

  console.log(useState());
  return (
    <div>
      <h1>{state}</h1>
    </div>
  );
};

export default UseStateEx;
