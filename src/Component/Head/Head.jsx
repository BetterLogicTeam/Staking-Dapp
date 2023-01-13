import React from 'react'
import "./Head.css"
import logo from "../Accets/logo.svg"
import Canvas from '../Canvas/Canvas'
function Head({handleClosee,handleShoww,setShoww,showw}) {
  return (
    <div className='bg-dark py-2 '>
      <div className="container-fluid">
        <div className="row">
            <div className="col-6 d-flex justify-content-start">
                {/* <img src={logo} className="main_logo" alt="" /> */}
                <h2 className="head_logo text-white text-start ms-2">Archie Staking</h2>
            </div>
            <div className="col-6 mt-2">
                <Canvas handleClosee={handleClosee} handleShoww={handleShoww} setShoww={setShoww} showw={showw}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Head
