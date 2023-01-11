import React from 'react'
import "./Head.css"
import logo from "../Accets/logo.svg"
import Canvas from '../Canvas/Canvas'
function Head() {
  return (
    <div className='bg-dark py-4 '>
      <div className="container-fluid">
        <div className="row">
            <div className="col-6 d-flex justify-content-start">
                <img src={logo} className="main_logo" alt="" />
            </div>
            <div className="col-6">
                <Canvas/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Head
