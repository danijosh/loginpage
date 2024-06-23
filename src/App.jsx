// import React from 'react'
// import ChildProps from './props/ChildProps.jsx'
// import UseStateEx from './States/UseStateEx.jsx';

// function App() {
//   return (
//     <>
//        {/* <ChildProps name="Daniel" age={34}/> */}
//        <UseStateEx/>
//     </>
//   )
// }
// export default App; 
// *-----------------------------

import React from 'react'

import {Routes, Route } from 'react-router-dom'
import Main_page from './CRUD/create/Create'
import Log_in from './CRUD/login/LogIn'
import SignUp from './CRUD/signin/SignUp'
import DashBoard from './CRUD/dashboard/DashBoard'
import SideBar from './CRUD/sidebar/SideBar'
import UpdateTable from './CRUD/updateTable/UpdateTable'
const App = () => {
  
  return (
    
    <Routes>
        <Route path='userdetails' element={<DashBoard/>}/>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Log_in/>}/>
        {/* <Route path="userdetails" element={<UpdateTable/>}/> */}
        <Route index element={<Main_page />} />
        <Route path='sidebar' element={<SideBar/>}/>
    </Routes>

  )
}

export default App

// import { ChildProps } from './props/ChildProps';
// function
//     return (
    
//       <div>
//         <ChildProps/>
//       </div>
      
//     );
//   }
// }

// export default App;
