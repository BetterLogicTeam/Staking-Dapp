import React, { useState } from 'react'
import Head from './Component/Head/Head'
import "./App.css"
import Total_value from './Component/Total_value/Total_value'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [showw, setShoww] = useState(false);
  const handleClosee = () => setShoww(false);
  const handleShoww = () => setShoww(true);
 
    const myStyle={
         height:'100%',
     };
  return (
    <div className='back_main' style={myStyle} >
      <div className='back'>
      <ToastContainer />
      <Head handleClosee={handleClosee} handleShoww={handleShoww} setShoww={setShoww} showw={showw} />
      <Total_value setShoww={setShoww} />
    </div>
    </div>
  )
}

export default App
