import React from 'react'
import Head from './Component/Head/Head'
import "./App.css"
import Total_value from './Component/Total_value/Total_value'
function App() {
 
    const myStyle={
        
         height:'100%',
    
     
     };
  return (
    <div className='back_main'style={myStyle} >
      <div className='back'>
      <Head/>
      <Total_value/>
    </div>
    </div>
  )
}

export default App
