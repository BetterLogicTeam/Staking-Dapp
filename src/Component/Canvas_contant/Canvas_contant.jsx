import React, {useState} from 'react'
import"./Canvas_contant.css"
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import mata from "../Accets/wallet.svg"
import mata1 from "../Accets/wallet-wc.svg"
import mata2 from "../Accets/close.svg"
import { MdKeyboardArrowLeft } from 'react-icons/md';
function Canvas_contant({ name, ...props }) {
    const [showw, setShoww] = useState(false);

    const handleClosee = () => setShoww(false);
    const handleShoww = () => setShoww(true);
  return (
    <div>
      <Button variant="" onClick={handleShoww} className=" text-light end_canvas ">
      0xeda...1c9e <MdKeyboardArrowLeft className='icon_canvas'/>
      </Button>
      <Offcanvas show={showw} onHide={handleClosee} {...props} className="h-100 canvas_back">
        <Offcanvas.Header >
          <Offcanvas.Title className='text-start text-white '>Connect Wallet</Offcanvas.Title>
        </Offcanvas.Header>
        
        <Offcanvas.Body>
        <div>
            <p className='small_Status'>Status</p>
        </div>
        <div>
            <p className='dis_small px-1'>DISCONNECTED</p>
        </div>
        <button className='btn btn-lg w-100 mata_mask '><span className='float-start'><img src={mata} width="25" alt="" /> MataMask</span> <span  className='px-1 mt-1 float-end popular_text'>  POPULAR</span> </button>
        <button className='btn btn-lg w-100 mata_mask mt-3 '><span className='float-start'><img src={mata1} width="25" alt="" /> Wallet Connect</span> </button>


<div>
<div>
            <p className='small_Status'>Status</p>
            <div  className='px-1 mt-1 fs-5 float-start popular_text'>  CONNECTED</div> <br/>
            <div>
            <p className='text-white fs-6 mt-3'>Address</p>
            </div>
        </div>
        <div>
          <p className='text-white'>
          0xeda34d1ed8ca3df37e666a5d2729f54f8c
          </p>
        </div>
        
        <div>
          <p className='text-white'>
          Connected Chain
          </p>
        </div>
        <div>
          <p className='text-white'>
          Binance Smart Chain Mainnet
          </p>
        </div>
        <button className='btn btn-lg w-100 mata_mask mt-3 text-start ps-3 '>Disconnect </button>
</div>

        </Offcanvas.Body>
        <div className='d-flex justify-content-evenly px-3 my-2'>
            <button className='btn   fw-bold btn-lg mata_mask w-100 ' onClick={handleClosee} > <img src={mata2} width="25" alt="" /> Close</button>
        </div>
      </Offcanvas>
    </div>
  )
}

export default Canvas_contant
