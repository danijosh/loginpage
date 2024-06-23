// import { useState } from "react";

// const Tws=()=>{
// const [state,setState]=useState(0)




// // *----------------------------------------
//   return (
//     <div>
//       <div>{state}</div>
//       <button onClick={()=>setState(state+1)}>+</button>
//       <button onClick={()=>setState(state-1)}>-</button>
//       <button onClick={()=>setState(state+5)}>+5</button>
//     </div>
//   );
// }

// export default Tws;


import React, { useState } from 'react';

const Tws = () => {
  const [state, setState] = useState(0);

  // Increment state directly
  const incrementDirectly = () => {
    setState(state + 10); // Incrementing state directly
  };

  // Increment state using prevState
  const incrementWithPrevState = () => {
    setState((prevState) => prevState + 10); // Incrementing using prevState
  };

  return (
    <div>
      <div>{state}</div>
      <button onClick={() => setState(state + 1)}>+</button> {/* Increment by 1 */}
      <button onClick={() => setState(state - 1)}>-</button> {/* Decrement by 1 */}
      <button onClick={() => setState(state + 5)}>+5</button> {/* Increment by 5 */}
      <button onClick={incrementDirectly}>+10 (Direct)</button> {/* Increment by 10 directly */}
      <button onClick={incrementWithPrevState}>+10 (PrevState)</button> {/* Increment by 10 using prevState */}
    </div>
  );
};

export default Tws;
